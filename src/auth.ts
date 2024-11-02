import NextAuth from "next-auth";
import authConfig from "./auth.config";
import client from "./lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
