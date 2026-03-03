import { ContributionCalendar, RepoStats } from "@/modules/github/github.types";
export declare const calculateStreaks: (calendar: ContributionCalendar) => {
    currentStreak: number;
    longestStreak: number;
};
export declare const aggregateRepoStats: (nodes: {
    stargazerCount: number;
}[], totalCount: number) => RepoStats;
