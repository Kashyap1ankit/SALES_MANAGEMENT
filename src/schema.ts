import { z } from "zod";

export const schema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, { message: "Must be 3 character long" })
      .max(8, { message: "Cannot longer than 8 characters" })
      .trim()
      .toLowerCase(),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, { message: "Must be 3 character long" })
      .max(8, { message: "Cannot longer than 8 characters" }),
  })
  .required();
