import { Elysia } from "elysia";
import { fetchDetailedCodeforcesStats } from "@/modules/codeforces/codeforces.service";
import { CodeforcesParamsSchema } from "@/modules/codeforces/codeforces.schema";
import { successResponse } from "@/shared/utils/api-handler";
import { cache } from "@/shared/middlewares/cache";
import { CACHE_TTL } from "@/shared/lib/redis";

export const codeforces = (app: Elysia) =>
  app.use(cache({ ttl: CACHE_TTL.LONG })).get(
    "/full-stats/:username",
    async ({ params: { username } }) => {
      const stats = await fetchDetailedCodeforcesStats(username);
      return successResponse(stats);
    },
    {
      params: CodeforcesParamsSchema,
    },
  );
