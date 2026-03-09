import { githubClient } from "@/modules/github/github.client";
import { GET_USER_STATS_QUERY } from "@/modules/github/github.queries";
import { GithubGraphqlResponse } from "@/modules/github/github.types";

export const getUserStats = async (
  username: string,
): Promise<GithubGraphqlResponse> => {
  return await githubClient.graphql<GithubGraphqlResponse>(
    GET_USER_STATS_QUERY,
    { login: username },
  );
};
