"use client";

import { useEffect } from "react";

export function useIframeResizer() {
  useEffect(() => {
    // Dynamically load iFrame Resizer script
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if ((window as any).iFrameResize) {
        (window as any).iFrameResize(
          {
            log: false,
            checkOrigin: false,
            heightCalculationMethod: "documentElementOffset",
          },
          "#testimonial-iframe"
        );
      }
    };

    // Cleanup script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);
}
