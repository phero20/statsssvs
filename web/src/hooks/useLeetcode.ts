import { useQuery } from "@tanstack/react-query";
import { LeetcodeService } from "@/services/leetcode.service";

export const useLeetcodeStats = (username: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["leetcode", username],
    queryFn: () => LeetcodeService.fetchFullStats(username),
    enabled: enabled !== undefined ? enabled : !!username,
  });
};
