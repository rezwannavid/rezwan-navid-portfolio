"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransitionLayer() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const previousPath = useRef(pathname);
  const [transitionPath, setTransitionPath] = useState<string | null>(null);

  useEffect(() => {
    if (pathname === previousPath.current) return;
    previousPath.current = pathname;
    setTransitionPath(pathname);
  }, [pathname]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence mode="sync">
      {transitionPath && <motion.div
        key={transitionPath}
        className="route-transition-layer"
        aria-hidden="true"
        initial={{ scaleX: 1, opacity: .42 }}
        animate={{ scaleX: 0, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .62, ease: [.16, 1, .3, 1] }}
        onAnimationComplete={() => setTransitionPath(null)}
      />}
    </AnimatePresence>
  );
}
