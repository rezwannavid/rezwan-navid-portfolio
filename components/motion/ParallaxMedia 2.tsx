"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { useRef, type ReactNode } from "react";

type ParallaxMediaProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  xDistance?: number;
  rotateDistance?: number;
  velocityResponse?: boolean;
  reveal?: boolean;
  revealDelay?: number;
  revealOffset?: number;
};

export function ParallaxMedia({
  children,
  className = "",
  distance = 16,
  xDistance = 0,
  rotateDistance = 0,
  velocityResponse = false,
  reveal = false,
  revealDelay = 0,
  revealOffset = 14,
}: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const rawX = useTransform(scrollYProgress, [0, 1], [-xDistance, xDistance]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [-rotateDistance, rotateDistance]);
  const y = useSpring(rawY, { stiffness: 150, damping: 28, mass: .8 });
  const x = useSpring(rawX, { stiffness: 150, damping: 28, mass: .8 });
  const rotate = useSpring(rawRotate, { stiffness: 150, damping: 28, mass: .8 });
  const scrollVelocity = useVelocity(scrollY);
  const velocityNudge = useSpring(useTransform(scrollVelocity, [-2200, 2200], [-3, 3]), { stiffness: 220, damping: 32, mass: .65 });
  const composedY = useTransform(() => y.get() + (velocityResponse ? velocityNudge.get() : 0));

  return (
    <motion.div ref={ref} className={className} style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : composedY, rotate: reduceMotion ? 0 : rotate }}>
      {reveal ? (
        <motion.div
          className="parallax-entry"
          initial={reduceMotion ? false : { opacity: .18, y: revealOffset, scale: .97, clipPath: "inset(12% 0 18% 0 round 12px)" }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0% 0 round 12px)" }}
          viewport={{ once: true, amount: .32 }}
          transition={{ duration: .72, delay: revealDelay, ease: [.22, 1, .36, 1] }}
        >
          {children}
        </motion.div>
      ) : children}
    </motion.div>
  );
}
