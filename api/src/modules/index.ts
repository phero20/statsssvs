import { Elysia } from "elysia";
import { github } from "@/modules/github";
import { cache } from "@/shared/middlewares/cache";
import { CACHE_TTL } from "@/shared/lib/redis";

/**
 * Centralized route definitions for better Eden Treaty type inference.
 * We use nested groups to ensure that the frontend client can correctly
 * resolve the path segments as properties (e.g., api.v1.github).
 */
export const routes = (app: Elysia) =>
  app
    .get("/health", () => ({ status: "ok", uptime: process.uptime() }))
    .group("/api", (app) =>
      app.group("/v1", (app) =>
        app
          .use(cache({ ttl: CACHE_TTL.SHORT }))
          .group("/github", (app) => app.use(github)),
      ),
    );
