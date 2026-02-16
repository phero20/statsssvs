import { Elysia } from "elysia";
import { redis, CACHE_TTL } from "../lib/redis";
import { getConfig } from "../configs/config";

/**
 * Elysia Cache Middleware
 * Uses Redis to cache successful JSON responses based on URL path and query.
 */
export const cache = (options: { ttl?: number } = {}) => {
  const ttl = options.ttl || CACHE_TTL.MEDIUM;

  return new Elysia({ name: "cache-middleware" })
    .onBeforeHandle({ as: "global" }, async ({ request, set }) => {
      const url = new URL(request.url);
      const cacheKey = `cache:${url.pathname}${url.search}`;

      try {
        const cachedResponse = await redis.get(cacheKey);

        if (cachedResponse) {
          set.headers["x-cache"] = "HIT";
          return JSON.parse(cachedResponse);
        }
      } catch (error) {
        // Silently fail cache check to avoid blocking the request
        if (getConfig("nodeEnv") !== "production") {
          console.error(`[Cache] ❌ Get Error:`, error);
        }
      }
    })
    .onAfterHandle({ as: "global" }, async ({ request, response, set }) => {
      // Don't cache if it was a hit, or if the request failed
      if (set.headers["x-cache"] === "HIT" || set.status !== 200) return;

      // Only cache successful JSON objects
      if (!response || typeof response !== "object") return;

      const url = new URL(request.url);
      const cacheKey = `cache:${url.pathname}${url.search}`;

      try {
        await redis.set(cacheKey, JSON.stringify(response), "EX", ttl);
        set.headers["x-cache"] = "MISS";
      } catch (error) {
        if (getConfig("nodeEnv") !== "production") {
          console.error(`[Cache] ❌ Store Error:`, error);
        }
      }
    });
};
