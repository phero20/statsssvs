import { useGithubStats } from "./useGithub";
import { useLeetcodeStats } from "./useLeetcode";
import { useCodeforcesStats } from "./useCodeforces";

export function usePlatformStats(
  storeKey: string | undefined,
  username: string,
) {
  const github = useGithubStats(username, false);
  const leetcode = useLeetcodeStats(username, false);
  const codeforces = useCodeforcesStats(username, false);

  switch (storeKey) {
    case "githubUser":
      return github;
    case "leetcodeUser":
      return leetcode;
    case "codeforcesUser":
      return codeforces;
    default:
      return {
        data: null,
        isFetching: false,
        isError: false,
        isSuccess: false,
        refetch: async () => ({ data: null }),
      };
  }
}
