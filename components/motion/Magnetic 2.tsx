"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { physicalSpring } from "@/lib/motion";

export function Magnetic({ children, className = "", strength = 4 }: { children: ReactNode; className?: string; strength?: number }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, physicalSpring);
  const smoothY = useSpring(y, physicalSpring);

  const move = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength * 2);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength * 2);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.span className={`magnetic ${className}`.trim()} style={{ x: smoothX, y: smoothY }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
