import { DifficultyStats } from "@/modules/leetcode/leetcode.types";

export const formatAcceptanceRate = (stats: DifficultyStats[]) => {
  return stats.map((stat) => {
    let acceptanceRate = 0;
    if (stat.submissions > 0) {
      acceptanceRate = Number(
        ((stat.count / stat.submissions) * 100).toFixed(2),
      );
    }
    return {
      ...stat,
      acceptanceRate,
    };
  });
};
