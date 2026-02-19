import { Elysia } from "elysia";

/**
 * Standardizes API responses into a consistent format.
 * { success: true, data: T, message: string }
 *
 * This acts as a global safety net. For perfect type safety in the frontend,
 * routes should explicitly return successResponse(data) from @/shared/utils/api-handler.
 */
export const responseStandardizer = new Elysia({
  name: "response-standardizer",
}).onAfterHandle({ as: "global" }, ({ response, set }) => {
  // If it's already a standard response or an error format, skip
  if (
    response &&
    typeof response === "object" &&
    ("success" in response || "error" in response)
  ) {
    return response;
  }

  // Fallback standardization
  return {
    success: true,
    data: response,
    message: "Operation successful",
  };
});
