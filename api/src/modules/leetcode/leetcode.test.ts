import { describe, it, expect } from "bun:test";
import { formatAcceptanceRate } from "@/modules/leetcode/leetcode.utils";
import { DifficultyStats } from "@/modules/leetcode/leetcode.types";

describe("LeetCode Utils", () => {
  describe("formatAcceptanceRate", () => {
    it("should calculate acceptance rate correctly", () => {
      const mockStats: DifficultyStats[] = [
        { difficulty: "All", count: 50, submissions: 100 },
        { difficulty: "Easy", count: 25, submissions: 25 },
        { difficulty: "Hard", count: 0, submissions: 10 },
      ];

      const result = formatAcceptanceRate(mockStats);
      expect(result[0].acceptanceRate).toBe(50);
      expect(result[1].acceptanceRate).toBe(100);
      expect(result[2].acceptanceRate).toBe(0);
    });

    it("should handle zero submissions without throwing", () => {
      const mockStats: DifficultyStats[] = [
        { difficulty: "Medium", count: 0, submissions: 0 },
      ];

      const result = formatAcceptanceRate(mockStats);
      expect(result[0].acceptanceRate).toBe(0);
    });
  });
});
