import { Elysia, ValidationError } from "elysia";
import { getConfig } from "../configs/config";
import { AppError } from "../utils/errors";

export const errorMiddleware = new Elysia().onError(({ code, error, set }) => {
  // Determine status code
  let status = 500;
  let errorType = code as string;

  if (error instanceof AppError) {
    status = error.statusCode;
    errorType = error.code;
  } else {
    if (code === "NOT_FOUND") status = 404;
    if (code === "VALIDATION") status = 400;
    if (code === "PARSE") status = 400;
  }

  // Log error for development
  if (getConfig("nodeEnv") !== "production") {
    console.error(`[Error] ${errorType} (${status}):`, error);
  }

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  set.status = status;

  return {
    success: false,
    error: {
      type: errorType,
      message,
      ...(error instanceof ValidationError ? { details: error.all } : {}),
    },
  };
});
