"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/components/motion/useReveal";

export function LineReveal({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: ReactNode[];
  className?: string;
  as?: "span" | "div";
}) {
  const { ref, visible } = useReveal<HTMLSpanElement>();

  return (
    <Tag ref={ref as never} className={`line-reveal ${className}`} data-visible={visible}>
      {children.map((child, index) => (
        <span className="line-reveal-item" style={{ "--line-index": index } as CSSProperties} key={index}>{child}</span>
      ))}
    </Tag>
  );
}
