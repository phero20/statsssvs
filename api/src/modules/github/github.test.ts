import { describe, it, expect } from "bun:test";
import { calculateStreaks, aggregateRepoStats } from "./github.utils";
import { ContributionCalendar, GithubRepo } from "./github.types";

describe("GitHub Utils", () => {
  describe("calculateStreaks", () => {
    it("should calculate correct streaks for a given calendar", () => {
      const mockCalendar: ContributionCalendar = {
        totalContributions: 10,
        weeks: [
          {
            contributionDays: [
              { date: "2024-01-01", contributionCount: 1 },
              { date: "2024-01-02", contributionCount: 2 },
              { date: "2024-01-03", contributionCount: 0 },
              { date: "2024-01-04", contributionCount: 1 },
              { date: "2024-01-05", contributionCount: 3 },
            ],
          },
        ],
      };

      const result = calculateStreaks(mockCalendar);
      expect(result.longestStreak).toBe(2);
    });

    it("should return zero streaks for empty calendar", () => {
      const mockCalendar: ContributionCalendar = {
        totalContributions: 0,
        weeks: [],
      };

      const result = calculateStreaks(mockCalendar);
      expect(result.currentStreak).toBe(0);
      expect(result.longestStreak).toBe(0);
    });
  });

  describe("aggregateRepoStats", () => {
    it("should aggregate stars correctly", () => {
      const mockRepos: any[] = [
        { stargazers_count: 10 },
        { stargazers_count: 5 },
        { stargazers_count: 20 },
      ];

      const result = aggregateRepoStats(mockRepos as GithubRepo[]);
      expect(result.totalStars).toBe(35);
      expect(result.highestStars).toBe(20);
      expect(result.totalRepos).toBe(3);
    });

    it("should handle empty repo list", () => {
      const result = aggregateRepoStats([]);
      expect(result.totalStars).toBe(0);
      expect(result.highestStars).toBe(0);
      expect(result.totalRepos).toBe(0);
    });
  });
});
