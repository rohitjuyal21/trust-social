"use client";
import React from "react";

export default function useMouseMove() {
  React.useEffect(() => {
    function mouseMoveEvent(e: MouseEvent) {
      const scale = window.visualViewport?.scale;

      // Disable the cursor effect if the user has zoomed in on the page
      if (scale === 1) {
        const body = document.body;
        const targetX = e.clientX; // X position of the cursor
        const targetY = e.clientY; // Y position of the cursor

        // Set CSS variables `--x` and `--y` on the body, these will be used to position elements
        body.style.setProperty("--x", `${targetX}px`);
        body.style.setProperty("--y", `${targetY}px`);
      }
    }

    // Attach the event listener for mouse movement
    document.addEventListener("mousemove", mouseMoveEvent);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", mouseMoveEvent);
    };
  }, []);
}
