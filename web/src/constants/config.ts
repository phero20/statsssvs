import { Type as t } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const configSchema = t.Object({
  apiUrl: t.String({ default: "http://localhost:3000" }),
});

const rawConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
};

if (!Value.Check(configSchema, rawConfig)) {
  const errors = [...Value.Errors(configSchema, rawConfig)];
  console.error("❌ Invalid environment configuration:", errors);
  throw new Error("Invalid environment configuration");
}

export const config = Object.freeze(Value.Cast(configSchema, rawConfig));
