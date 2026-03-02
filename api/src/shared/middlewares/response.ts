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
}).onAfterHandle({ as: "global" }, ({ response, request }) => {
  const url = new URL(request.url);

  // Skip modifying swagger UI and OpenAPI JSON routes
  if (url.pathname.startsWith("/swagger")) return;

  // Skip if it's already a native Response object (e.g. HTML, files)
  if (response instanceof Response) return;

  // If it's already a standard response or an error format, skip by returning undefined
  // Returning undefined tells Elysia to keep the original response as-is.
  if (
    response &&
    typeof response === "object" &&
    ("success" in response || "error" in response)
  ) {
    return;
  }

  // Fallback standardization for raw object/string returns
  return {
    success: true,
    data: response,
    message: "Operation successful",
  };
});
