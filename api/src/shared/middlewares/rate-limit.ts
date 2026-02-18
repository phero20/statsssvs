import { Elysia } from "elysia";

// Simple in-memory rate limiter for demonstration
const cache = new Map<string, { count: number; start: number }>();

export const rateLimiter = new Elysia().onBeforeHandle(({ request, set }) => {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const max = 60; // 60 requests per minute

  const record = cache.get(ip);

  if (!record) {
    cache.set(ip, { count: 1, start: now });
    return;
  }

  if (now - record.start > windowMs) {
    record.count = 1;
    record.start = now;
    return;
  }

  record.count++;

  if (record.count > max) {
    set.status = 429;
    return {
      status: 429,
      error: "Too Many Requests",
      message: "Rate limit exceeded. Please try again later.",
    };
  }
});
