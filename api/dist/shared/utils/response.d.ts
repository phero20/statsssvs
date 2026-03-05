import { TSchema } from "elysia";
/**
 * Standard API Response Structure for TypeBox validation
 */
export declare const ApiResponseSchema: <T extends TSchema>(dataSchema: T) => import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TBoolean;
    data: T;
    message: import("@sinclair/typebox").TString;
}>;
/**
 * TypeScript interface for the same structure
 */
export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message: string;
};
