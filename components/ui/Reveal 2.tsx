"use client";

import { type CSSProperties, type ReactNode } from "react";
import { useReveal } from "@/components/motion/useReveal";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();

  return <div ref={ref} className={`reveal ${className}`} data-visible={visible} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}
