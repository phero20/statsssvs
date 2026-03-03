import { CodeforcesUserResponse } from "@/modules/codeforces/codeforces.types";
/**
 * Repository Layer
 * Responsibility: Fetch raw data from the Codeforces REST API
 */
export declare const getUserStats: (username: string) => Promise<CodeforcesUserResponse>;
