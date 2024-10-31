import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters"),
});

export const signUpSchema = object({
  username: string({ required_error: "Username is required" }).min(
    1,
    "Name is required."
  ),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required.")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters"),
});
