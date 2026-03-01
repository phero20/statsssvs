import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { helmet } from "elysia-helmet";
import { routes } from "@/modules";
import { errorMiddleware } from "@/shared/middlewares/error";
import { logger } from "@/shared/middlewares/logger";
import { responseStandardizer } from "@/shared/middlewares/response";
import { rateLimiter } from "@/shared/middlewares/rate-limit";
import { getConfig } from "@/shared/configs/config";

// Setup the base app with middleware
const app = new Elysia()
  .use(errorMiddleware)
  .use(logger)
  .use(rateLimiter)
  .use(swagger())
  .use(responseStandardizer)
  .use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
          ],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https://fastly.jsdelivr.net"],
          connectSrc: ["'self'"],
        },
      },
    }),
  )
  .use(
    cors({
      origin:
        getConfig("nodeEnv") === "production"
          ? ["https://localhost:3000"]
          : true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    }),
  )
  .use(routes);

// Export type from exactly the routes plugin for clear frontend types
const typeApp = new Elysia().use(routes);
export type App = typeof typeApp;

app.listen({
  port: getConfig("port"),
  hostname: "0.0.0.0",
});

console.log(
  `🚀 Elysia is running at ${app.server?.hostname}:${app.server?.port} (${getConfig("nodeEnv")} mode)`,
);
