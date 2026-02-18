import { Elysia, ValidationError } from "elysia";
import { getConfig } from "../configs/config";

export const errorMiddleware = new Elysia().onError(({ code, error, set }) => {
  // Determine status code
  let status = 500;

  if (code === "NOT_FOUND") status = 404;
  if (code === "VALIDATION") status = 400;
  if (code === "PARSE") status = 400;

  // Log error for development
  if (getConfig("nodeEnv") !== "production") {
    console.error(`[Error] ${code}:`, error);
  }

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  switch (code) {
    case "NOT_FOUND":
      set.status = 404;
      return {
        status: 404,
        error: "Not Found",
        message,
      };
    case "VALIDATION":
      set.status = 400;
      return {
        status: 400,
        error: "Validation Error",
        message,
        errors: error instanceof ValidationError ? error.all : undefined,
      };
    default:
      // Set the status on the response
      set.status = typeof code === "number" ? code : status;

      return {
        status: set.status,
        error: code || "UNKNOWN_ERROR",
        message,
      };
  }
});
