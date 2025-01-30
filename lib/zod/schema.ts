import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Enter valid email" })
    .email({ message: "Enter valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type signInErrorType = z.inferFlattenedErrors<typeof signInSchema>;
