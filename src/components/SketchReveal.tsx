"use client";
import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface SketchRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  once?: boolean;
}

export default function SketchReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: SketchRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-8% 0px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 32 : 0,
    x: direction === "left" ? -32 : direction === "right" ? 32 : 0,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
}
