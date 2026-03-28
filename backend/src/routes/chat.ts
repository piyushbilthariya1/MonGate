import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { authMiddleware } from "../middleware/auth.js";
import { mapOpenAiToGemini, mapGeminiChunkToOpenAi } from "../lib/mappers.js";
import { deductCredits } from "../lib/redis.js";
import { KeyVault } from "../services/key-vault.js";
import { TokenRateLimiter } from "../lib/rate-limiter.js";
import { GuardianService } from "../services/guardian.js";

export default async function chatRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  
  // Apply Auth Middleware to all chat routes
  fastify.addHook("preHandler", authMiddleware);

  fastify.post("/v1/chat/completions", async (request, reply) => {
    const body: any = request.body;
    const user: any = (request as any).user;
    const MAX_RETRIES = 3;
    const DEFAULT_TPM_LIMIT = 100000;

    // 1. Check Token-based Rate Limit (Sliding Window)
    const isUnderLimit = await TokenRateLimiter.checkLimit(user.id, 100, DEFAULT_TPM_LIMIT);
    if (!isUnderLimit) {
      return reply.status(429).send({ error: "Rate Limit Exceeded", message: `Quota: ${DEFAULT_TPM_LIMIT} TPM.` });
    }

    let retryCount = 0;
    let lastError: any = null;

    while (retryCount < MAX_RETRIES) {
      const stakerKey = await KeyVault.getActiveKey("google_gemini");
      
      if (!stakerKey) {
        return reply.status(503).send({ error: "Service Unavailable", message: "No active staker keys available." });
      }

      try {
        const genAI = new GoogleGenerativeAI(stakerKey.decryptedKey);
        const model = genAI.getGenerativeModel({ model: body.model || "gemini-1.5-flash" });
        const geminiParams = mapOpenAiToGemini(body);

        if (body.stream) {
          reply.raw.setHeader("Content-Type", "text/event-stream");
          reply.raw.setHeader("Connection", "keep-alive");

          const result = await model.generateContentStream(geminiParams);
          let tokenCount = 0;

          try {
            for await (const chunk of result.stream) {
              const mappedChunk = mapGeminiChunkToOpenAi(chunk, body.model);
              reply.raw.write(`data: ${JSON.stringify(mappedChunk)}\n\n`);
              tokenCount += 10;
            }

            await TokenRateLimiter.recordUsage(user.id, tokenCount);
            await deductCredits(user.id, tokenCount);

            reply.raw.write("data: [DONE]\n\n");
            reply.raw.end();
            return reply;
          } catch (streamError: any) {
            throw streamError;
          }
        } else {
          const result = await model.generateContent(geminiParams);
          const responseText = result.response.text();
          const tokensUsed = 100;

          await TokenRateLimiter.recordUsage(user.id, tokensUsed);
          await deductCredits(user.id, tokensUsed);

          return {
            id: `chatcmpl-${Math.random().toString(36).slice(2)}`,
            choices: [{ index: 0, message: { role: "assistant", content: responseText }, finish_reason: "stop" }],
          };
        }
      } catch (error: any) {
        lastError = error;
        const status = error.status || 0;

        if (status === 401 || status === 403) {
          // Record failure in Guardian for blacklisting logic
          await GuardianService.reportFailure(stakerKey.id);
          await KeyVault.markAsInactive(stakerKey.id);
        } else if (status === 429) {
          await KeyVault.setCooldown(stakerKey.id, 300);
        } else {
          break;
        }

        retryCount++;
      }
    }

    return reply.status(lastError?.status || 500).send({
      error: "AntiGravity Proxy Error",
      attempts: retryCount
    });
  });
}
