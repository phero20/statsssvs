import { codeforcesClient } from "@/modules/codeforces/codeforces.client";
import { CodeforcesUserResponse } from "@/modules/codeforces/codeforces.types";

/**
 * Repository Layer
 * Responsibility: Fetch raw data from the Codeforces REST API
 */
export const getUserStats = async (
  username: string,
): Promise<CodeforcesUserResponse> => {
  return await codeforcesClient.get<CodeforcesUserResponse>("user.info", {
    handles: username,
  });
};
