import { getUserStats } from "@/modules/leetcode/leetcode.repository";
import { formatAcceptanceRate } from "@/modules/leetcode/leetcode.utils";
import { LeetcodeStatsResponse } from "@/modules/leetcode/leetcode.types";
import { NotFoundError } from "@/shared/utils/errors";

/**
 * Service Layer
 * Responsibility: Business logic, data transformation, and orchestration.
 */
export const fetchDetailedLeetcodeStats = async (
  username: string,
): Promise<LeetcodeStatsResponse> => {
  const data = await getUserStats(username);

  // Leetcode returns matchedUser as null if the username does not exist
  if (!data?.matchedUser) {
    throw new NotFoundError(`User ${username} not found on LeetCode`);
  }

  const { matchedUser, userContestRanking, allQuestionsCount } = data;

  return {
    profile: {
      username: matchedUser.username,
      realName: matchedUser.profile.realName,
      userAvatar: matchedUser.profile.userAvatar,
      ranking: matchedUser.profile.ranking,
      reputation: matchedUser.profile.reputation,
      starRating: matchedUser.profile.starRating,
      githubUrl: matchedUser.githubUrl,
      twitterUrl: matchedUser.twitterUrl,
      linkedinUrl: matchedUser.linkedinUrl,
    },
    contest: userContestRanking,
    submitStats: formatAcceptanceRate(
      matchedUser.submitStats.acSubmissionNum as any,
    ),
    questionsTotal: allQuestionsCount as any,
    languages: matchedUser.languageProblemCount,
    badges: matchedUser.badges.map((b) => ({ name: b.name, icon: b.icon })),
  };
};
