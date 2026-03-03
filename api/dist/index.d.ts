import { Elysia } from "elysia";
declare const typeApp: Elysia<"", {
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
                                200: import("./shared/utils/response").ApiResponse<import("./modules/github/github.types").UserStatsResponse>;
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
                                200: import("./shared/utils/response").ApiResponse<import("./modules/leetcode/leetcode.types").LeetcodeStatsResponse>;
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
                                200: import("./shared/utils/response").ApiResponse<import("./modules/codeforces/codeforces.types").CodeforcesStatsResponse>;
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
export type App = typeof typeApp;
export {};
