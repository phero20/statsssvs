import { githubClient } from "@/modules/github/github.client";
import { GET_USER_STATS_QUERY } from "@/modules/github/github.queries";
import { GithubGraphqlResponse } from "@/modules/github/github.types";

/**
 * Repository Layer
 * Responsibility: Data retrieval strategy (External API, Cache, DB)
 */
export const getUserStats = async (
  username: string,
): Promise<GithubGraphqlResponse> => {
  // In the future, we could check a Local DB here before hitting the API
  return await githubClient.graphql<GithubGraphqlResponse>(
    GET_USER_STATS_QUERY,
    { login: username },
  );
};
