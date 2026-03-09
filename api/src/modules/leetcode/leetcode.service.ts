import { getUserStats } from "@/modules/leetcode/leetcode.repository";
import { formatAcceptanceRate } from "@/modules/leetcode/leetcode.utils";
import { LeetcodeStatsResponse } from "@/modules/leetcode/leetcode.types";
import { NotFoundError } from "@/shared/utils/errors";

export const fetchDetailedLeetcodeStats = async (
  username: string,
): Promise<LeetcodeStatsResponse> => {
  const data = await getUserStats(username);

  if (!data?.profile || data.profile.name === undefined) {
    throw new NotFoundError(`User ${username} not found on LeetCode`);
  }

  const { profile, solved, contest, badges, language, calendar } = data;

  const acSubmissionNum = [
    {
      difficulty: "All",
      count: solved.solvedProblem,
      submissions: Math.max(
        solved.solvedProblem,
        solved.totalSubmissionNum?.find((d: any) => d.difficulty === "All")
          ?.submissions || 0,
      ),
    },
    {
      difficulty: "Easy",
      count: solved.easySolved,
      submissions: Math.max(
        solved.easySolved,
        solved.totalSubmissionNum?.find((d: any) => d.difficulty === "Easy")
          ?.submissions || 0,
      ),
    },
    {
      difficulty: "Medium",
      count: solved.mediumSolved,
      submissions: Math.max(
        solved.mediumSolved,
        solved.totalSubmissionNum?.find((d: any) => d.difficulty === "Medium")
          ?.submissions || 0,
      ),
    },
    {
      difficulty: "Hard",
      count: solved.hardSolved,
      submissions: Math.max(
        solved.hardSolved,
        solved.totalSubmissionNum?.find((d: any) => d.difficulty === "Hard")
          ?.submissions || 0,
      ),
    },
  ];

  let parsedCalendar: Record<string, number> = {};
  if (calendar?.submissionCalendar) {
    try {
      parsedCalendar =
        typeof calendar.submissionCalendar === "string"
          ? JSON.parse(calendar.submissionCalendar)
          : calendar.submissionCalendar;
    } catch (e) {
      console.error("Failed to parse LeetCode calendar data:", e);
    }
  }

  return {
    profile: {
      username: profile.username || username,
      realName: profile.name,
      userAvatar: profile.avatar,
      ranking: profile.ranking,
      reputation: profile.reputation,
      starRating: 0,
      githubUrl: profile.gitHub,
      twitterUrl: profile.twitter,
      linkedinUrl: profile.linkedIN,
    },
    contest: contest?.contestAttend
      ? {
          attendedContestsCount: contest.contestAttend,
          rating: contest.contestRating,
          globalRanking: contest.contestGlobalRanking,
          topPercentage: contest.contestTopPercentage,
        }
      : null,
    submitStats: formatAcceptanceRate(acSubmissionNum as any),
    questionsTotal: [
      { difficulty: "All", count: 3860 },
      { difficulty: "Easy", count: 929 },
      { difficulty: "Medium", count: 2019 },
      { difficulty: "Hard", count: 912 },
    ] as any,
    languages: language?.languageProblemCount || [],
    badges:
      badges?.badges?.map((b: any) => ({
        name: b.displayName,
        icon: b.icon,
      })) || [],
    calendar: {
      activeYears: calendar?.activeYears || [],
      streak: calendar?.streak || 0,
      totalActiveDays: calendar?.totalActiveDays || 0,
      submissionCalendar: parsedCalendar,
    },
  };
};
