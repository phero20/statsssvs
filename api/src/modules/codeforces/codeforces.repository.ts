import { codeforcesClient } from "@/modules/codeforces/codeforces.client";
import { CodeforcesUserResponse } from "@/modules/codeforces/codeforces.types";

export const getUserStats = async (
  username: string,
): Promise<CodeforcesUserResponse> => {
  return await codeforcesClient.get<CodeforcesUserResponse>("user.info", {
    handles: username,
  });
};
