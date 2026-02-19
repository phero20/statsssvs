import { IGitHubRepository } from "./github.repository";
import { aggregateRepoStats, calculateStreaks } from "./github.utils";
import { UserStatsResponse } from "./github.types";

/**
 * Service Layer
 * Responsibility: Business logic, data transformation, and orchestration.
 */
export class GitHubService {
  constructor(private readonly repository: IGitHubRepository) {}

  async fetchDetailedUserStats(username: string): Promise<UserStatsResponse> {
    // 1. Get raw data from repository
    const data = await this.repository.getUserStats(username);

    // 2. Transform raw data into business-relevant format
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
