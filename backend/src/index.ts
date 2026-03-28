import Fastify from "fastify";
import dotenv from "dotenv";
import { initDb } from "./lib/db.js";
import chatRoutes from "./routes/chat.js";
import adminRoutes from "./routes/admin.js";
import { startMonadSync } from "./services/monad-mock.js";
import { BatcherService } from "./services/batcher.js";
import { MonadListener } from "./services/monad-listener.js";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

// Register routes
fastify.register(chatRoutes);
fastify.register(adminRoutes);

// Health check
fastify.get("/health", async (request, reply) => {
  return { status: "active", uptime: process.uptime() };
});

const start = async () => {
  try {
    // 1. Initialize DB
    await initDb();
    
    // 2. Start Mock Monad Sync (Phase 1/2)
    await startMonadSync();

    // 3. Start Phase 3 Services: Batcher & Monad Listener
    const batchInterval = Number(process.env.MONAD_SYNC_INTERVAL_MS) || 300000;
    BatcherService.start(batchInterval);

    const listener = new MonadListener();
    await listener.startListening();

    // 4. Listen
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: "0.0.0.0" });
    
    console.log(`🚀 AntiGravity API Bridge is live on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
