import { t } from "elysia";

export const LeetcodeParamsSchema = t.Object({
  username: t.String({
    minLength: 1,
    error: "Username is required",
  }),
});
