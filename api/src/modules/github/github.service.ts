import { getUserStats } from "@/modules/github/github.repository";
import {
  aggregateRepoStats,
  calculateStreaks,
} from "@/modules/github/github.utils";
import { UserStatsResponse } from "@/modules/github/github.types";
import { NotFoundError } from "@/shared/utils/errors";

/**
 * Service Layer
 * Responsibility: Business logic, data transformation, and orchestration.
 */
export const fetchDetailedUserStats = async (
  username: string,
): Promise<UserStatsResponse> => {
  // 1. Get raw data from repository
  const data = await getUserStats(username);

  // If user doesn't exist, GitHub GraphQL might throw an error instead of returning null
  // but it's safe to check if user is null just in case
  if (!data?.user) {
    throw new NotFoundError(`User ${username} not found on GitHub`);
  }

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
};
