import { Elysia } from "elysia";
import { fetchDetailedLeetcodeStats } from "@/modules/leetcode/leetcode.service";
import { LeetcodeParamsSchema } from "@/modules/leetcode/leetcode.schema";
import { successResponse } from "@/shared/utils/api-handler";
import { cache } from "@/shared/middlewares/cache";
import { CACHE_TTL } from "@/shared/lib/redis";

export const leetcode = (app: Elysia) =>
  app.use(cache({ ttl: CACHE_TTL.LONG })).get(
    "/full-stats/:username",
    async ({ params: { username } }) => {
      const stats = await fetchDetailedLeetcodeStats(username);
      return successResponse(stats);
    },
    {
      params: LeetcodeParamsSchema,
    },
  );
