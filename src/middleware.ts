import NextAuth from "next-auth";
import authConfig from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  runtime: "nodejs",
  unstable_allowDynamic: [
    // allows a single file
    "/lib/dbConnect.ts",
    // use a glob to allow anything in the function-bind 3rd party module
    "/node_modules/mongoose/dist/**",
  ],
};
