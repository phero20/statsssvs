import { t } from "elysia";

export const GithubParamsSchema = t.Object({
  username: t.String({
    minLength: 1,
    error: "Username is required",
  }),
});
