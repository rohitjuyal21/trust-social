"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="h-[400px] flex items-center justify-center w-full px-4">
      <div className="flex flex-col items-center max-w-4xl">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
        >
          <div className="flex items-center justify-center flex-col">
            <div className="inline-flex gap-2 justify-center items-center mb-4 bg-muted rounded-full px-4 py-1.5 text-sm font-medium border shadow-inner">
              <Sparkles className="text-amber-400 size-4" /> 100% Free Forever
            </div>
            <h1 className="text-5xl font-bold text-center max-w-3xl">
              Share your success through customer voices
            </h1>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.4,
            delay: 0.1,
          }}
        >
          <p className="text-muted-foreground text-xl text-center my-6">
            A platform to collect and showcase authentic testimonials. Build
            trust, share success stories, and grow your business.
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.4,
            delay: 0.2,
          }}
        >
          <Button size={"lg"} className="group" asChild>
            <Link href={"/dashboard"}>
              Get Started
              <ArrowRight className="size-5 group-hover:translate-x-1 transition duration-300" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
