import { db } from "../lib/db.js";
import { redis, redisKeys } from "../lib/redis.js";
import { decrypt } from "../lib/encryption.js";

export interface StakerKey {
  id: string;
  provider: string;
  decryptedKey: string;
}

/**
 * KeyVault: Manages the collection and selection of staker API keys.
 */
export class KeyVault {
  /**
   * Fetches a random active key for the specified provider.
   * Excludes keys currently in a cool-down period.
   */
  static async getActiveKey(provider: string): Promise<StakerKey | null> {
    const query = `
      SELECT id, provider, encrypted_key 
      FROM staked_keys 
      WHERE provider = $1 AND status = 'active'
      ORDER BY RANDOM() 
      LIMIT 10
    `;

    const res = await db.query(query, [provider]);
    
    if (res.rows.length === 0) return null;

    // Filter out keys that are in cool-down (429 errors)
    for (const row of res.rows) {
      const lockKey = `antigravity:cooldown:${row.id}`;
      const isInCooldown = await redis.get(lockKey);
      
      if (!isInCooldown) {
        return {
          id: row.id,
          provider: row.provider,
          decryptedKey: decrypt(row.encrypted_key),
        };
      }
    }

    return null;
  }

  /**
   * Marks a key as inactive (Permanent failure like 401)
   */
  static async markAsInactive(keyId: string) {
    await db.query("UPDATE staked_keys SET status = 'inactive' WHERE id = $1", [keyId]);
    console.log(`🚫 Key ${keyId} marked as INACTIVE (401 Unauthorized).`);
  }

  /**
   * Sets a cool-down period for a key (Temporary failure like 429)
   */
  static async setCooldown(keyId: string, seconds: number = 300) {
    const lockKey = `antigravity:cooldown:${keyId}`;
    await redis.setex(lockKey, seconds, "true");
    console.log(`⏳ Key ${keyId} entered cool-down for ${seconds}s (429 Rate Limit).`);
  }
}
