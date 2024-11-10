import { array, boolean, object, string } from "zod";

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

export const collectionSchema = object({
  collectionName: string().min(1, "Collection name is required"),
  collectionLogo: string().min(1, "Collection logo is required"),
  headerTitle: string().min(1, "Header title is required"),
  customMessage: string().min(1, "Custom message is required"),
  questions: array(string()).min(1, "At least one question is required"),
  collectStarRatings: boolean(),
  customButtonColor: string().optional(),
  thankYouPage: object({
    thankYouPageTitle: string().optional(),
    thankYouPageMessage: string().optional(),
    thankYouPageImage: string().optional(),
  }),
});
