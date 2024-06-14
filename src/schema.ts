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

export const salesSchema = z.object({
  customer_id: z.string().min(1, { message: "Customer Id is required" }),
  price: z.string().min(1, { message: "Cannot be less than 1" }),
  quantity: z.string().min(1, { message: "Cannot be less than 1" }),
  date: z.string().min(1, { message: "Cannot be emptied" }),
  paid: z.string().optional(),
  invoice_no: z.string().optional(),
  invoice_date: z.string().optional(),
  product: z
    .string({ message: "Cannot be emptied" })
    .min(1, { message: "Cannot be emptied" }),
});
