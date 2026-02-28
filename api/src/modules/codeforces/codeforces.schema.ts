import { t } from "elysia";

export const CodeforcesParamsSchema = t.Object({
  username: t.String({
    minLength: 1,
    description: "Codeforces handle",
    error: "Codeforces handle is required",
  }),
});
