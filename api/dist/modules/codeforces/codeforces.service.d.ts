import { CodeforcesStatsResponse } from "@/modules/codeforces/codeforces.types";
/**
 * Service Layer
 * Responsibility: Business logic, data transformation, and orchestration
 */
export declare const fetchDetailedCodeforcesStats: (username: string) => Promise<CodeforcesStatsResponse>;
