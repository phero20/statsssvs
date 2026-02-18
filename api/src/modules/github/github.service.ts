import { IGitHubClient } from "./github.client";
import { GET_USER_STATS_QUERY } from "./github.queries";
import { aggregateRepoStats, calculateStreaks } from "./github.utils";
import { GithubGraphqlResponse, UserStatsResponse } from "./github.types";

export class GitHubService {
  constructor(private readonly client: IGitHubClient) {}

  async fetchDetailedUserStats(username: string): Promise<UserStatsResponse> {
    const data = await this.client.graphql<GithubGraphqlResponse>(
      GET_USER_STATS_QUERY,
      { login: username },
    );

    const { user } = data;
    const calendar = user.contributionsCollection.contributionCalendar;

    return {
      profile: {
        login: user.login,
        name: user.name,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        followers: user.followers.totalCount,
        following: user.following.totalCount,
      },
      repoStats: aggregateRepoStats(
        user.repositories.nodes,
        user.repositories.totalCount,
      ),
      streaks: calculateStreaks(calendar),
      contributions: calendar,
    };
  }
}
