import Redis from "ioredis";
import { getConfig } from "@/shared/configs/config";

/**
 * Singleton Redis client instance.
 * ioredis automatically handles reconnection and command queuing.
 */
export const redis = new Redis(getConfig("redisUrl"), {
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on("connect", () => {
  console.log("📡 Redis: Connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

// Helper to calculate TTL (optional but useful)
export const CACHE_TTL = {
  SHORT: 60 * 5, // 5 minutes
  MEDIUM: 60 * 60, // 1 hour
  LONG: 60 * 60 * 24, // 24 hours
};
