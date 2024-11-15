"use client";
import Link from "next/link";

import { motion } from "framer-motion";
import ThemeToggle from "./Theme/ThemeToggle";

import Logo from "./svg/Logo";

export default function VisitorHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.4 }}
      className="p-4 border-b fixed left-0 w-full bg-background top-0 h-[72px]"
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
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
