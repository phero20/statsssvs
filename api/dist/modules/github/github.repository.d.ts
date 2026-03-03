import { GithubGraphqlResponse } from "@/modules/github/github.types";
/**
 * Repository Layer
 * Responsibility: Data retrieval strategy (External API, Cache, DB)
 */
export declare const getUserStats: (username: string) => Promise<GithubGraphqlResponse>;
