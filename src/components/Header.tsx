"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import Logo from "./svg/Logo";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.4 }}
      className="p-4 md:px-6 md:py-4  border sticky left-0 w-full h-[72px] z-10 max-w-screen-xl backdrop-blur-lg top-3 rounded-lg"
    >
      <div className="flex items-center justify-between">
        <Link
          href={"/"}
          className="font-oswald text-2xl font-bold flex items-center gap-0.5"
          title="Trust Social"
        >
          <Logo className="h-9 w-9" />
          <h4>TrustSocial</h4>
        </Link>

        <div className="flex gap-2 items-center">
          {/* <ThemeToggle /> */}
          {user ? (
            <ProfileMenu />
          ) : (
            <>
              {" "}
              <Button variant="outline" className="rounded-full" asChild>
                <Link href={"sign-in"}>Sign In</Link>
              </Button>
              <Button className="rounded-full" asChild>
                <Link href={"sign-up"}>Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
