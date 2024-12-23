import { socialLinks } from "@/config/socialLinks";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="p-4 md:px-6 md:py-4  border sticky left-0 w-full h-[72px] z-10 max-w-screen-xl backdrop-blur-lg top-3 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium">Made by Rohit Juyal</h2>
        <div className="flex gap-2">
          {socialLinks.map((item, index) => (
            <Button variant="outline" size="icon" key={index} asChild>
              <Link href={item.link} target="_blank">
                <item.icon className="size-5" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
