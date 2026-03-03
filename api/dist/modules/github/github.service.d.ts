import { UserStatsResponse } from "@/modules/github/github.types";
/**
 * Service Layer
 * Responsibility: Business logic, data transformation, and orchestration.
 */
export declare const fetchDetailedUserStats: (username: string) => Promise<UserStatsResponse>;
