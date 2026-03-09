import { getUserStats } from "@/modules/github/github.repository";
import {
  aggregateRepoStats,
  calculateStreaks,
} from "@/modules/github/github.utils";
import { UserStatsResponse } from "@/modules/github/github.types";
import { NotFoundError } from "@/shared/utils/errors";

export const fetchDetailedUserStats = async (
  username: string,
): Promise<UserStatsResponse> => {
  const data = await getUserStats(username);

  if (!data?.user) {
    throw new NotFoundError(`User ${username} not found on GitHub`);
  }

  const { user } = data;
  const calendar = user?.contributionsCollection?.contributionCalendar;

  return {
    profile: {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      followers: user.followers?.totalCount ?? 0,
    },
    repoStats: aggregateRepoStats(
      user.repositories?.nodes ?? [],
      user.repositories?.totalCount ?? 0,
    ),
    streaks: calculateStreaks(calendar),
    contributions: calendar,
  };
};
