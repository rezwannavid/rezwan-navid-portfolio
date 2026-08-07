"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

export function TiltLink({ href, className = "", ariaLabel, cursorLabel = "View", maxRotate = 6.4, maxTranslate = 5, children }: { href: string; className?: string; ariaLabel: string; cursorLabel?: string; maxRotate?: number; maxTranslate?: number; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const translateX = useMotionValue(0);
  const translateY = useMotionValue(0);
  const spring = { stiffness: 280, damping: 28, mass: .72 };
  const smoothRotateX = useSpring(rotateX, spring);
  const smoothRotateY = useSpring(rotateY, spring);
  const smoothX = useSpring(translateX, spring);
  const smoothY = useSpring(translateY, spring);

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    rotateX.set(y * -maxRotate);
    rotateY.set(x * maxRotate);
    translateX.set(x * maxTranslate);
    translateY.set(y * maxTranslate);
    event.currentTarget.style.setProperty("--pointer-x", `${(x + .5) * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${(y + .5) * 100}%`);
    event.currentTarget.style.setProperty("--media-x", `${x * -7}px`);
    event.currentTarget.style.setProperty("--media-y", `${y * -7}px`);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    translateX.set(0);
    translateY.set(0);
    if (ref.current) {
      ref.current.style.setProperty("--media-x", "0px");
      ref.current.style.setProperty("--media-y", "0px");
    }
  };

  return (
    <Link ref={ref} data-cursor={cursorLabel} className={`interactive-tilt ${className}`.trim()} href={href} aria-label={ariaLabel} onPointerMove={move} onPointerLeave={reset} onBlur={reset}>
      <motion.span
        className="interactive-tilt-inner"
        style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, x: smoothX, y: smoothY }}
        whileTap={reduceMotion ? undefined : { scale: .985 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}
