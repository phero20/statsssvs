import { Elysia } from "elysia";

export const responseStandardizer = new Elysia().onAfterHandle(
  ({ response, set }) => {
    // If it's already a standard response or an error format, skip
    if (
      response &&
      typeof response === "object" &&
      ("success" in response || "error" in response)
    ) {
      return response;
    }

    // Standardize the response
    return {
      success: true,
      data: response,
      message: "Operation successful",
    };
  },
);
