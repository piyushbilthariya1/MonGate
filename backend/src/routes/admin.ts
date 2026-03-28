import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { GuardianService } from "../services/guardian.js";

/**
 * Admin Routes: Internal monitoring and management endpoints.
 */
export default async function adminRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  
  // Basic Admin Key Auth (In production, replace with Web3 or OAuth)
  fastify.addHook("preHandler", async (request, reply) => {
    const adminKey = request.headers["x-admin-key"];
    if (adminKey !== process.env.ADMIN_API_KEY) {
      return reply.status(403).send({ error: "Forbidden: Admin access only" });
    }
  });

  /**
   * GET /v1/admin/health
   * Returns real-time platform statistics.
   */
  fastify.get("/v1/admin/health", async (request, reply) => {
    try {
      const stats = await GuardianService.getHealthStats();
      
      return {
        timestamp: new Date().toISOString(),
        status: stats.active > 0 ? "healthy" : "degraded",
        metrics: {
          staker_keys: {
            active: stats.active,
            cool_down: stats.cooldown,
            blacklisted: stats.blacklisted,
            inactive: stats.inactive
          },
          avg_proxy_latency_ms: "84ms", // Mock latency for Phase 4
          system_load: process.loadavg()[0],
          uptime_seconds: process.uptime()
        }
      };
    } catch (error: any) {
      return reply.status(500).send({ error: "Health Check Failed", message: error.message });
    }
  });
}
