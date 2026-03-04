import { Static } from "elysia";
declare const configSchema: import("@sinclair/typebox").TObject<{
    port: import("@sinclair/typebox").TNumber;
    nodeEnv: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"development">, import("@sinclair/typebox").TLiteral<"production">, import("@sinclair/typebox").TLiteral<"test">]>;
    githubApiUrl: import("@sinclair/typebox").TString;
    githubGraphqlUrl: import("@sinclair/typebox").TString;
    githubToken: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    redisUrl: import("@sinclair/typebox").TString;
    leetcodeGraphqlUrl: import("@sinclair/typebox").TString;
    codeforcesApiUrl: import("@sinclair/typebox").TString;
}>;
type Config = Static<typeof configSchema>;
export declare const getConfig: <K extends keyof Config>(key: K) => Config[K];
export {};
