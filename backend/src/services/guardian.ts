import { redis } from "../lib/redis.js";
import { db } from "../lib/db.js";

/**
 * AntiGravity Guardian: Monitors staker key health and enforces blacklisting.
 */
export class GuardianService {
  private static FAILURE_THRESHOLD = 3;
  private static WINDOW_SECONDS = 3600; // 1 Hour

  /**
   * Tracks a fatal failure (401/403) for a staker key.
   * If the threshold is reached within the hour, the key is blacklisted.
   */
  static async reportFailure(keyId: string) {
    const redisKey = `antigravity:guardian:failures:${keyId}`;
    
    // Increment failure count
    const failureCount = await redis.incr(redisKey);
    
    if (failureCount === 1) {
      // Set expiration on the first failure
      await redis.expire(redisKey, this.WINDOW_SECONDS);
    }

    console.warn(`🛡️ [GUARDIAN] Key ${keyId} failure count: ${failureCount}/${this.FAILURE_THRESHOLD}`);

    if (failureCount >= this.FAILURE_THRESHOLD) {
      await this.blacklistKey(keyId);
    }
  }

  /**
   * Permanently blacklists a key in the database.
   */
  private static async blacklistKey(keyId: string) {
    const query = "UPDATE staked_keys SET status = 'blacklisted' WHERE id = $1";
    await db.query(query, [keyId]);
    
    // Clear Redis failure counter
    await redis.del(`antigravity:guardian:failures:${keyId}`);

    console.error(`🚨 [GUARDIAN] Key ${keyId} has been BLACKLISTED due to repeated failures.`);
    
    // In a real system, you'd trigger an alert/notification here
  }

  /**
   * Stats for the Admin Dashboard
   */
  static async getHealthStats() {
    const res = await db.query(`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'active') as active_count,
        COUNT(*) FILTER (WHERE status = 'blacklisted') as blacklisted_count,
        COUNT(*) FILTER (WHERE status = 'inactive') as inactive_count
      FROM staked_keys
    `);

    // Get number of keys in cool-down from Redis
    const keys = await redis.keys("antigravity:cooldown:*");
    
    return {
      active: parseInt(res.rows[0].active_count),
      blacklisted: parseInt(res.rows[0].blacklisted_count),
      inactive: parseInt(res.rows[0].inactive_count),
      cooldown: keys.length
    };
  }
}
