import { DifficultyStats } from "@/modules/leetcode/leetcode.types";
export declare const formatAcceptanceRate: (stats: DifficultyStats[]) => {
    acceptanceRate: number;
    difficulty: import("@/modules/leetcode/leetcode.types").Difficulty;
    count: number;
    submissions: number;
}[];
