import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { User } from "./models/user";
import dbConnect from "./lib/dbConnect";
import bcryptjs from "bcryptjs";

const publicRoutes = ["/", "/sign-in", "/sign-up"];
const authRoutes = ["/sign-in", "/sign-up"];

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials) {
        try {
          await dbConnect();

          const parsedCredentials = signInSchema.safeParse(credentials);
          if (!parsedCredentials.success) {
            return null;
          }

          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            return null;
          }

          if (!user.password) {
            console.log("User has no password - OAuth provider account");
            return null;
          }

          const isPasswordValid = await bcryptjs.compare(
            credentials?.password as string,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
            image: user.profileImage,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (publicRoutes.includes(pathname)) {
        if (authRoutes.includes(pathname) && isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL("/sign-in", nextUrl));
      }

      return isLoggedIn;
    },

    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;
