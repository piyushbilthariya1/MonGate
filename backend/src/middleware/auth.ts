import { FastifyRequest, FastifyReply } from "fastify";
import { redis, redisKeys } from "../lib/redis.js";
import { db } from "../lib/db.js";
import crypto from "crypto";

export interface AuthenticatedRequest extends FastifyRequest {
  user: {
    id: string;
    wallet: string;
    balance: number;
  };
}

/**
 * AntiGravity Auth Middleware
 * Validates Master Key and checks for active credits in Redis
 */
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.status(401).send({ error: "Unauthorized: Missing Master Key" });
  }

  const masterKey = authHeader.split(" ")[1];
  const keyHash = crypto.createHash("sha256").update(masterKey).digest("hex");

  // 1. Try to get user data from Redis cache
  let userData = await redis.get(redisKeys.masterKey(keyHash));
  let user;

  if (userData) {
    user = JSON.parse(userData);
  } else {
    // 2. Fallback to Database
    const res = await db.query(
      "SELECT id, wallet_address FROM users WHERE master_key_hash = $1",
      [keyHash]
    );

    if (res.rows.length === 0) {
      return reply.status(401).send({ error: "Unauthorized: Invalid Master Key" });
    }

    user = {
      id: res.rows[0].id,
      wallet: res.rows[0].wallet_address,
    };

    // Cache key mapping in Redis for 10 minutes
    await redis.setex(redisKeys.masterKey(keyHash), 600, JSON.stringify(user));
  }

  // 3. Check Credit Balance in Redis
  const balanceStr = await redis.get(redisKeys.userCredits(user.id));
  const balance = balanceStr ? Number(balanceStr) : 0;

  if (balance <= 0) {
    return reply.status(402).send({
      error: "Insufficient Balance",
      message: "Please deposit $MON on Monad to continue using AntiGravity API.",
    });
  }

  // Attach user data to request
  (request as any).user = { ...user, balance };
}
