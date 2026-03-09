import { leetcodeClient } from "@/modules/leetcode/leetcode.client";
import {
  AlfaProfileResponse,
  AlfaContestResponse,
  AlfaBadgesResponse,
  AlfaSolvedResponse,
  AlfaLanguageResponse,
  AlfaCalendarResponse,
} from "@/modules/leetcode/leetcode.types";

/**
 * Repository Layer
 * Responsibility: Fetch raw data from the external API
 */
export const getUserStats = async (username: string) => {
  const [profile, solved, contest, badges, language, calendar] =
    await Promise.all([
      leetcodeClient.get<AlfaProfileResponse>(`/${username}`),
      leetcodeClient.get<AlfaSolvedResponse>(`/${username}/solved`),
      leetcodeClient.get<AlfaContestResponse>(`/${username}/contest`),
      leetcodeClient.get<AlfaBadgesResponse>(`/${username}/badges`),
      leetcodeClient.get<AlfaLanguageResponse>(`/${username}/language`),
      leetcodeClient.get<AlfaCalendarResponse>(
        `/${username}/calendar?year=${new Date().getFullYear()}`,
      ),
    ]);

  return { profile, solved, contest, badges, language, calendar };
};
