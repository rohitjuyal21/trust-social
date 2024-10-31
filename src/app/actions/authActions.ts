"use server";

import { signIn, signOut } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import { signUpSchema } from "@/lib/zod";
import { User } from "@/models/user";
import { AuthError } from "next-auth";
import bcryptjs from "bcryptjs";

export async function handleCredentialsSignIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}

export async function handleGoogleSignin() {
  await signIn("google", { redirectTo: "/" });
}

export async function handleSignOut() {
  await signOut();
}

export async function handleCredentialsSignUp({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  await dbConnect();
  try {
    const parsedCredentials = signUpSchema.safeParse({
      username,
      email,
      password,
    });
    if (!parsedCredentials.success) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
