import { LeetcodeStatsResponse } from "@/modules/leetcode/leetcode.types";
/**
 * Service Layer
 * Responsibility: Business logic, data transformation, and orchestration.
 */
export declare const fetchDetailedLeetcodeStats: (username: string) => Promise<LeetcodeStatsResponse>;
