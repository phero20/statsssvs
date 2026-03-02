import { Elysia } from "elysia";
import { redis, CACHE_TTL } from "@/shared/lib/redis";

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
        // Silently fail on read error
      }
    })
    .onAfterHandle({ as: "global" }, async ({ request, response, set }) => {
      if (set.headers["x-cache"] === "HIT" || set.status !== 200) return;
      if (!response || typeof response !== "object") return;

      const url = new URL(request.url);
      const cacheKey = `cache:${url.pathname}${url.search}`;

      try {
        await redis.set(cacheKey, JSON.stringify(response), "EX", ttl);
        set.headers["x-cache"] = "MISS";
      } catch (error) {
        // Silently fail on write error
      }
    });
};
