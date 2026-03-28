import { redis, redisKeys } from "../lib/redis.js";
import { db } from "../lib/db.js";
import crypto from "crypto";
import { encrypt } from "../lib/encryption.js";

/**
 * Mock Service: Synchronizes credit balance from the Monad Blockchain.
 * In this initial phase, it ensures a test user exists and maintains credits.
 */
export async function startMonadSync() {
  console.log("🔄 Starting Mock Monad Balance Sync service...");

  // 1. Initial Seed (Test User)
  const testMasterKey = "antigravity-test-key-123";
  const keyHash = crypto.createHash("sha256").update(testMasterKey).digest("hex");
  const testWallet = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

  try {
    const userRes = await db.query(
      `INSERT INTO users (wallet_address, master_key_hash) 
       VALUES ($1, $2) 
       ON CONFLICT (wallet_address) DO UPDATE SET master_key_hash = $2 
       RETURNING id`,
      [testWallet, keyHash]
    );

    const userId = userRes.rows[0].id;

    // 2. Seed Mock Staker Keys (Encrypted)
    // In a real scenario, User 2 (Staker) would upload these via /v1/vault/stake
    const mockGeminiKey = process.env.GOOGLE_AI_API_KEY || "mock-gemini-key-placeholder";
    const encryptedKey = encrypt(mockGeminiKey);

    await db.query(
      `INSERT INTO staked_keys (owner_id, provider, encrypted_key, status)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT DO NOTHING`,
      [userId, "google_gemini", encryptedKey, "active"]
    );

    console.log("🔑 [MOCK] Seeded 1 encrypted Staker Key for 'google_gemini'.");

    // 3. Mock Periodic Credit Update (Every 30 seconds for test)
    setInterval(async () => {
      const mockCredits = 1000000;
      await redis.set(redisKeys.userCredits(userId), mockCredits);
      console.log(`📡 [MOCK] Sync from Monad: User ${userId} updated to ${mockCredits} credits.`);
    }, 30000);

    console.log("✅ Mock sync initialized. \n-----------------------------\nUse Master Key: 'antigravity-test-key-123'\n-----------------------------");

  } catch (error) {
    console.error("❌ Failed to initialize Mock Monad Sync:", error);
  }
}
