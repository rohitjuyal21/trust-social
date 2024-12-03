import { array, number, object, string } from "zod";

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
  questions: array(string().min(1, "Question cannot be empty")).min(
    1,
    "At least one question is required"
  ),
  customButtonColor: string().optional(),
  thankYouPage: object({
    thankYouPageTitle: string().optional(),
    thankYouPageMessage: string().optional(),
    thankYouPageImage: string().optional(),
  }),
});

export const testimonialSchema = object({
  rating: number().min(1, "Rating is required"),
  testimonial: string().min(1, "Testimonial is required"),
  attachments: array(string()).optional(),
  authorName: string().min(1, "Author name is required"),
  authorEmail: string().min(1, "Author email is required"),
  authorPhoto: string().optional(),
});

export const tweetSchema = object({
  tweet: string().min(1, "Add a tweet link first"),
});
