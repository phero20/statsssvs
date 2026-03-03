import { Elysia } from "elysia";
/**
 * Centralized route definitions for better Eden Treaty type inference.
 * We use nested groups to ensure that the frontend client can correctly
 * resolve the path segments as properties (e.g., api.v1.github).
 */
export declare const routes: (app: Elysia) => Elysia<"", {
    decorator: {};
    store: {};
    derive: {};
    resolve: {};
}, {
    typebox: {};
    error: {};
}, {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
}, {
    health: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    status: string;
                    uptime: number;
                };
            };
        };
    };
} & {
    api: {
        v1: {};
    };
} & {
    api: {
        v1: {
            github: {
                "full-stats": {
                    ":username": {
                        get: {
                            body: unknown;
                            params: {
                                username: string;
                            };
                            query: unknown;
                            headers: unknown;
                            response: {
                                200: import("../shared/utils/response").ApiResponse<import("./github/github.types").UserStatsResponse>;
                                422: {
                                    type: "validation";
                                    on: string;
                                    summary?: string;
                                    message?: string;
                                    found?: unknown;
                                    property?: string;
                                    expected?: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    api: {
        v1: {
            leetcode: {
                "full-stats": {
                    ":username": {
                        get: {
                            body: unknown;
                            params: {
                                username: string;
                            };
                            query: unknown;
                            headers: unknown;
                            response: {
                                200: import("../shared/utils/response").ApiResponse<import("./leetcode/leetcode.types").LeetcodeStatsResponse>;
                                422: {
                                    type: "validation";
                                    on: string;
                                    summary?: string;
                                    message?: string;
                                    found?: unknown;
                                    property?: string;
                                    expected?: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    api: {
        v1: {
            codeforces: {
                "full-stats": {
                    ":username": {
                        get: {
                            body: unknown;
                            params: {
                                username: string;
                            };
                            query: unknown;
                            headers: unknown;
                            response: {
                                200: import("../shared/utils/response").ApiResponse<import("./codeforces/codeforces.types").CodeforcesStatsResponse>;
                                422: {
                                    type: "validation";
                                    on: string;
                                    summary?: string;
                                    message?: string;
                                    found?: unknown;
                                    property?: string;
                                    expected?: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
}>;
