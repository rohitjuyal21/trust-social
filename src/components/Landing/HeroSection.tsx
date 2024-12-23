import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import LeftArrow from "../svg/LeftArrow";
import Reveal from "../Reveal";

const HeroSection = () => {
  return (
    <Reveal>
      <div className="h-[400px] my-10 md:my-16 lg:my-20 flex items-center justify-center w-full">
        <div className="flex flex-col items-center max-w-4xl">
          <div className="flex items-center justify-center flex-col">
            <div className="inline-flex gap-2 justify-center items-center mb-4 bg-muted rounded-full px-4 py-1.5 text-sm font-medium border shadow-inner">
              <Sparkles className="text-amber-400 size-4" /> 100% Free Forever
            </div>
            <h1 className="text-4xl font-bold text-center md:text-6xl bg-gradient-to-tl from-0% from-muted to-40% to-foreground bg-clip-text text-transparent">
              Share your success through customer voices
            </h1>
          </div>

          <p className="text-muted-foreground text-lg md:text-xl text-center my-6 md:max-w-xl max-w-md">
            A platform to collect and showcase authentic testimonials. Build
            trust, share success stories, and grow your business.
          </p>

          <div className="relative">
            <Button size={"lg"} className="group" asChild>
              <Link href={"/dashboard"}>
                Get Started
                <ArrowRight className="size-5 group-hover:translate-x-1 transition duration-300" />
              </Link>
            </Button>
            <div className="absolute top-0 -right-16">
              <p className="mb-0,5 text-muted-foreground text-sm">
                It&apos;s free!
              </p>
              <div className="w-7">
                <LeftArrow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default HeroSection;
