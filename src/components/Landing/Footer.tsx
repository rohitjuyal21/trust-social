import { socialLinks } from "@/config/socialLinks";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Reveal from "../Reveal";

export default function Footer() {
  return (
    <Reveal>
      <div className="p-4 md:px-6 md:py-4  border sticky left-0 w-full z-10 max-w-screen-xl backdrop-blur-lg top-3 rounded-lg">
        <div className="flex sm:flex-row flex-col gap-4 justify-between items-center">
          <h2 className="text-sm font-medium">❤️ Made by Rohit Juyal</h2>
          <div className="flex gap-2">
            {socialLinks.map((item, index) => (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 "
                key={index}
                asChild
              >
                <Link href={item.link} target="_blank">
                  <item.icon className="size-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
