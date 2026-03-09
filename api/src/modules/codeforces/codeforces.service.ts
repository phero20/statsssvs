import { getUserStats } from "@/modules/codeforces/codeforces.repository";
import { CodeforcesStatsResponse } from "@/modules/codeforces/codeforces.types";
import { NotFoundError, ExternalAPIError } from "@/shared/utils/errors";

export const fetchDetailedCodeforcesStats = async (
  username: string,
): Promise<CodeforcesStatsResponse> => {
  const data = await getUserStats(username);

  if (data.status === "FAILED") {
    if (data.comment && data.comment.includes("not found")) {
      throw new NotFoundError(`User ${username} not found on Codeforces`);
    }
    throw new ExternalAPIError(
      data.comment || "Failed to fetch Codeforces stats",
    );
  }

  if (!data.result || data.result.length === 0) {
    throw new NotFoundError(`User ${username} data is empty`);
  }

  const user = data.result[0];

  return {
    handle: user.handle,
    rating: user.rating || 0,
    rank: user.rank || "Unrated",
    maxRating: user.maxRating || 0,
    maxRank: user.maxRank || "Unrated",
    contribution: user.contribution || 0,
    titlePhoto: user.titlePhoto,
  };
};
