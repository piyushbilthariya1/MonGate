import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
export const redis = new Redis(redisUrl);

// Key prefixing for AntiGravity
const PREFIX = "antigravity:";

export const redisKeys = {
  userCredits: (userId: string) => `${PREFIX}credits:${userId}`,
  masterKey: (key: string) => `${PREFIX}key:${key}`,
  stakerHealth: (stakerId: string) => `${PREFIX}health:${stakerId}`,
};

/**
 * Optimized check and decrement for user credits
 * Returns the new balance or null if insufficient
 */
export async function deductCredits(userId: string, amount: number): Promise<number | null> {
  const key = redisKeys.userCredits(userId);
  
  // Lua script for atomic check-and-decrement
  const script = `
    local current = redis.call("GET", KEYS[1])
    if not current or tonumber(current) < tonumber(ARGV[1]) then
      return -1
    end
    return redis.call("DECRBY", KEYS[1], ARGV[1])
  `;

  const result = await redis.eval(script, 1, key, amount);
  const newBalance = Number(result);

  return newBalance >= 0 ? newBalance : null;
}

export async function getCredits(userId: string): Promise<number> {
  const balance = await redis.get(redisKeys.userCredits(userId));
  return balance ? Number(balance) : 0;
}
