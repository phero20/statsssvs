import { ApiResponse } from "./response";

/**
 * Explicitly wraps data in the standard API format.
 * This is the best way to ensure Eden Treaty sees the correct types
 * without complex middleware type magic.
 */
export function successResponse<T>(
  data: T,
  message: string = "Operation successful",
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}
