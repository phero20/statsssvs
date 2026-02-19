import { t, Static } from "elysia";
import { Value } from "@sinclair/typebox/value";

const configSchema = t.Object({
  port: t.Number({ default: 3000 }),
  nodeEnv: t.Union(
    [t.Literal("development"), t.Literal("production"), t.Literal("test")],
    { default: "development" },
  ),
  githubApiUrl: t.String({ default: "https://api.github.com" }),
  githubGraphqlUrl: t.String({ default: "https://api.github.com/graphql" }),
  githubToken: t.Optional(t.String()),
  redisUrl: t.String({ default: "redis://localhost:6379" }),
});

type Config = Static<typeof configSchema>;

const rawConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  githubApiUrl: process.env.GITHUB_API_URL || "https://api.github.com",
  githubGraphqlUrl:
    process.env.GITHUB_GRAPHQL_URL || "https://api.github.com/graphql",
  githubToken: process.env.GITHUB_TOKEN,
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
};

// Validate environment variables on startup
if (!Value.Check(configSchema, rawConfig)) {
  const errors = [...Value.Errors(configSchema, rawConfig)];
  console.error("❌ Invalid environment configuration:");
  errors.forEach((err) => {
    console.error(`  - ${err.path}: ${err.message} (received: ${err.value})`);
  });
  process.exit(1);
}

const _config = Object.freeze(Value.Cast(configSchema, rawConfig)) as Config;

export const getConfig = <K extends keyof Config>(key: K): Config[K] => {
  return _config[key];
};
