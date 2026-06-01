import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required."),
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });
