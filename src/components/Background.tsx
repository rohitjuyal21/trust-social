"use client";

import useMouseMove from "@/hooks/useCursorMove";
import type { ReactNode } from "react";

export default function Background({ children }: { children: ReactNode }) {
  // --x and --y will be updated based on mouse position
  useMouseMove();
  return (
    <>
      <div className="-z-50 fixed top-0 left-0">
        <div className="sticky top-0 left-0 h-screen w-screen overflow-hidden">
          <div className="absolute inset-0 z-[-1] bg-muted-foreground/20" />
          <div className="h-56 w-56 absolute rounded-full opacity-20 top-[--y] left-[--x] bg-gradient-radial from-0% from-foreground to-90% to-transparent blur-md -translate-x-1/2 -translate-y-1/2 z-[-1]" />
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern
                id="dotted-pattern"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="blue" />
              </pattern>
              <mask id="dots-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="hsl(var(--background))"
              mask="url(#dots-mask)"
            />
          </svg>
        </div>
      </div>

      {children}
    </>
  );
}
