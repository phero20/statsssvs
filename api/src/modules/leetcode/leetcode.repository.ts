import { leetcodeClient } from "@/modules/leetcode/leetcode.client";
import { GET_LEETCODE_USER_STATS_QUERY } from "@/modules/leetcode/leetcode.queries";
import { LeetcodeGraphqlResponse } from "@/modules/leetcode/leetcode.types";

/**
 * Repository Layer
 * Responsibility: Data retrieval strategy (External API, Cache, DB)
 */
export const getUserStats = async (
  username: string,
): Promise<LeetcodeGraphqlResponse> => {
  return await leetcodeClient.graphql<LeetcodeGraphqlResponse>(
    GET_LEETCODE_USER_STATS_QUERY,
    { username },
  );
};
