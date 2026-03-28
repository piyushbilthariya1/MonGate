import { redis } from "./redis.js";

/**
 * TokenRateLimiter: Precision sliding-window rate limiting for token consumption.
 */
export class TokenRateLimiter {
  private static WINDOW_SECONDS = 60;

  /**
   * Checks if a user has sufficient token quota remaining.
   * Uses Redis ZSET to track timestamps of token consumption.
   */
  static async checkLimit(userId: string, requestedTokens: number, limit: number): Promise<boolean> {
    const key = `antigravity:ratelimit:tokens:${userId}`;
    const now = Date.now();
    const windowStart = now - this.WINDOW_SECONDS * 1000;

    // 1. Remove expired entries (older than 60s)
    await redis.zremrangebyscore(key, 0, windowStart);

    // 2. Calculate current total in the window
    // Each entry's "score" is its timestamp, and "member" contains the token count
    const entries = await redis.zrange(key, 0, -1, "WITHSCORES");
    let currentTokens = 0;

    // Entries are [tokenCount_timestamp, timestamp, ...]
    for (let i = 0; i < entries.length; i += 2) {
      const member = entries[i];
      const tokensInEntry = parseInt(member.split("_")[0]);
      currentTokens += tokensInEntry;
    }

    // 3. Check if new request fits
    if (currentTokens + requestedTokens > limit) {
      return false;
    }

    return true;
  }

  /**
   * Records token consumption in the sliding window.
   */
  static async recordUsage(userId: string, tokens: number) {
    const key = `antigravity:ratelimit:tokens:${userId}`;
    const now = Date.now();
    
    // Add new usage entry (tokenCount_timestamp to ensure uniqueness)
    await redis.zadd(key, now, `${tokens}_${now}_${Math.random().toString(36).slice(2)}`);
    
    // Set expiry on the set to clean up inactive users
    await redis.expire(key, this.WINDOW_SECONDS + 10);
  }
}
