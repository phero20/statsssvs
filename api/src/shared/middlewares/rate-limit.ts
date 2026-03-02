import { Elysia } from "elysia";
import { redis } from "@/shared/lib/redis";
import { AppError } from "@/shared/utils/errors";

export const rateLimiter = new Elysia().onBeforeHandle(async ({ request }) => {
  // Use CF-Connecting-IP if behind Cloudflare, else fallback to standard headers or anonymous
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    "anonymous";

  const windowSeconds = 60; // 1 minute window
  const maxRequests = 60; // 60 requests per minute limit
  const key = `ratelimit:${ip}`;

  try {
    // Increment the counter for this IP
    const currentCount = await redis.incr(key);

    // If this is the very first request in the window, set the expiration
    if (currentCount === 1) {
      await redis.expire(key, windowSeconds);
    }

    if (currentCount > maxRequests) {
      throw new AppError(
        "Too many requests. Please try again later.",
        429,
        "RATE_LIMIT_EXCEEDED",
      );
    }
  } catch (err: any) {
    if (err instanceof AppError) throw err;

    // If Redis itself fails, we fail open (allow the request) to prevent a Redis outage from taking down the API entirely.
    console.error("Redis Rate Limiter Error:", err);
  }
});
