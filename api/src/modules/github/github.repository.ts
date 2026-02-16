import { IGitHubClient } from "./github.client";
import { GET_USER_STATS_QUERY } from "./github.queries";
import { GithubGraphqlResponse } from "./github.types";

/**
 * Repository Layer
 * Responsibility: Data retrieval strategy (External API, Cache, DB)
 */
export interface IGitHubRepository {
  getUserStats(username: string): Promise<GithubGraphqlResponse>;
}

export class GitHubRepository implements IGitHubRepository {
  constructor(private readonly client: IGitHubClient) {}

  /**
   * Fetches raw user stats from GitHub.
   * Note: Pure data retrieval. No transformation logic here.
   */
  async getUserStats(username: string): Promise<GithubGraphqlResponse> {
    // In the future, we could check a Local DB here before hitting the API
    return await this.client.graphql<GithubGraphqlResponse>(
      GET_USER_STATS_QUERY,
      { login: username },
    );
  }
}
