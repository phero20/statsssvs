import { useQuery } from "@tanstack/react-query";
import { CodeforcesService } from "@/services/codeforces.service";

export const useCodeforcesStats = (username: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["codeforces", username],
    queryFn: () => CodeforcesService.fetchFullStats(username),
    enabled: enabled !== undefined ? enabled : !!username,
  });
};
