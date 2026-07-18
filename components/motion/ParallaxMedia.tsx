"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

export function ParallaxMedia({ children, className = "", distance = 16 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(rawY, { stiffness: 150, damping: 28, mass: .8 });

  return <motion.div ref={ref} className={className} style={{ y: reduceMotion ? 0 : y }}>{children}</motion.div>;
}
