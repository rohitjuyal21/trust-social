"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: string;
}

export default function Reveal({ children, width = "100%" }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    }
  }, [isInView, mainControl]);

  return (
    <div ref={ref} style={{ position: "relative", width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControl}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
