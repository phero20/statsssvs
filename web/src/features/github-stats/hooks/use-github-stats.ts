import { useQuery } from "@tanstack/react-query";
import { githubService } from "@/features/github-stats/services/github.service";

export const useGithubStats = (username: string) => {
  return useQuery({
    queryKey: ["github-stats", username],
    queryFn: ({ signal }) => githubService.fetchFullStats(username, signal),
    enabled: !!username,
  });
};
