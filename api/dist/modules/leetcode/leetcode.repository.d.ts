import { LeetcodeGraphqlResponse } from "@/modules/leetcode/leetcode.types";
/**
 * Repository Layer
 * Responsibility: Data retrieval strategy (External API, Cache, DB)
 */
export declare const getUserStats: (username: string) => Promise<LeetcodeGraphqlResponse>;
