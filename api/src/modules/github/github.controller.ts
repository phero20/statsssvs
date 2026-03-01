import { Elysia } from "elysia";
import { fetchDetailedUserStats } from "@/modules/github/github.service";
import { GithubParamsSchema } from "@/modules/github/github.schema";
import { successResponse } from "@/shared/utils/api-handler";
import { cache } from "@/shared/middlewares/cache";
import { CACHE_TTL } from "@/shared/lib/redis";

export const github = (app: Elysia) =>
  app.use(cache({ ttl: CACHE_TTL.LONG })).get(
    "/full-stats/:username",
    async ({ params: { username } }) => {
      const stats = await fetchDetailedUserStats(username);
      return successResponse(stats);
    },
    {
      params: GithubParamsSchema,
    },
  );
