import { Elysia } from "elysia";
/**
 * Standardizes API responses into a consistent format.
 * { success: true, data: T, message: string }
 *
 * This acts as a global safety net. For perfect type safety in the frontend,
 * routes should explicitly return successResponse(data) from @/shared/utils/api-handler.
 */
export declare const responseStandardizer: Elysia<"", {
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
    response: {
        200: {
            success: boolean;
            data: unknown;
            message: string;
        };
    };
}, {}, {
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
