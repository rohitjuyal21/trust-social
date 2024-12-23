import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "../Reveal";

export default function ReadyToGetStart() {
  return (
    <Reveal>
      <div className="md:p-6 p-4 py-10 md:py-14 rounded-lg border shadow-md backdrop-blur-[2px] flex flex-col items-center gap-4">
        <h4 className="text-3xl md:text-4xl font-bold text-center">
          Ready to Get Started
        </h4>
        <p className="text-muted-foreground text-center max-w-md md:max-w-xl text-base md:text-lg">
          Join thousands of businesses using TrustSocial to build trust and
          showcase their success stories.
        </p>
        <Button size={"lg"} className="group" asChild>
          <Link href={"/dashboard"}>
            Start collecting testimonials
            <ArrowRight className="size-5 group-hover:translate-x-1 transition duration-300" />
          </Link>
        </Button>
      </div>
    </Reveal>
  );
}
