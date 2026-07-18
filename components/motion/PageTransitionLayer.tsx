"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export function PageTransitionLayer() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={pathname}
        className="route-transition-layer"
        aria-hidden="true"
        initial={{ scaleX: 1, opacity: .42 }}
        animate={{ scaleX: 0, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .62, ease: [.16, 1, .3, 1] }}
      />
    </AnimatePresence>
  );
}
