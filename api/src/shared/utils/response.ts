import { t, TSchema } from "elysia";

/**
 * Standard API Response Structure for TypeBox validation
 */
export const ApiResponseSchema = <T extends TSchema>(dataSchema: T) =>
  t.Object({
    success: t.Boolean(),
    data: dataSchema,
    message: t.String(),
  });

/**
 * TypeScript interface for the same structure
 */
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};
