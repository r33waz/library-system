import { Transform } from "class-transformer";

/**
 * Custom decorator to convert empty strings to undefined.
 */
export function RemoveEmptyString() {
  return Transform(({ value }) => (value === "" ? undefined : value));
}
