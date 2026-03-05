import { useQuery } from "@tanstack/react-query";
import { GithubService } from "@/services/github.service";

export const useGithubStats = (username: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["github", username],
    queryFn: () => GithubService.fetchFullStats(username),
    // If 'enabled' is passed, strictly use it. Otherwise, fallback to checking if username exists.
    enabled: enabled !== undefined ? enabled : !!username,
  });
};
