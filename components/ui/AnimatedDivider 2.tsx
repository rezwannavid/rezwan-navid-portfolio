"use client";

import { useReveal } from "@/components/motion/useReveal";

export function AnimatedDivider({ className = "" }: { className?: string }) {
  const { ref, visible } = useReveal("0px 0px -5%");

  return <div ref={ref} className={`animated-divider ${className}`} data-visible={visible} aria-hidden="true" />;
}
