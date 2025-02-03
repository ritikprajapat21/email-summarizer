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

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Enter valid email" })
    .email({ message: "Enter valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be less than 100 characters long" }),
});

export type signUpErrorType = z.inferFlattenedErrors<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Enter valid email" })
    .email({ message: "Enter valid email" }),
});

export type forgotPasswordErrorType = z.inferFlattenedErrors<
  typeof forgotPasswordSchema
>;
