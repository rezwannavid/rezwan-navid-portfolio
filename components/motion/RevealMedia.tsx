"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { motionDuration, motionEase } from "@/lib/motion";

export function RevealMedia({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`reveal-media ${className}`.trim()}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.16 }}
    >
      <motion.div
        className="reveal-media-mask"
        variants={{
          hidden: { clipPath: "inset(10% 0 90% 0 round 4px)", y: 26 },
          visible: { clipPath: "inset(0% 0 0% 0 round 4px)", y: 0, transition: { duration: motionDuration.cinematic, delay, ease: motionEase.editorial } },
        }}
      >
        <motion.div
          className="reveal-media-inner"
          variants={{
            hidden: { scale: 1.035 },
            visible: { scale: 1, transition: { duration: motionDuration.cinematic, delay, ease: motionEase.editorial } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
