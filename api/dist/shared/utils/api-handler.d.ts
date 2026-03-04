import { ApiResponse } from "@/shared/utils/response";
/**
 * Explicitly wraps data in the standard API format.
 * This is the best way to ensure Eden Treaty sees the correct types
 * without complex middleware type magic.
 */
export declare function successResponse<T>(data: T, message?: string): ApiResponse<T>;
