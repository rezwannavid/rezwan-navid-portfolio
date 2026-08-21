"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { motionEase } from "@/lib/motion";

type AnimatedLinesProps = {
  text: string;
  className?: string;
  emphasis?: string;
  delay?: number;
  breakableSpacing?: boolean;
};

export function AnimatedLines({ text, className = "", emphasis, delay = 0, breakableSpacing = false }: AnimatedLinesProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const words = text.split(" ");
  const [lineIndexes, setLineIndexes] = useState(() => words.map(() => 0));

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;

    const measure = () => {
      const tops: number[] = [];
      const next = wordRefs.current.map((word) => {
        const top = word?.offsetTop ?? 0;
        let line = tops.findIndex((value) => Math.abs(value - top) < 2);
        if (line === -1) {
          tops.push(top);
          line = tops.length - 1;
        }
        return line;
      });
      if (!cancelled) {
        setLineIndexes((current) => current.every((value, index) => value === next[index]) ? current : next);
      }
    };

    const measureAfterFontsLoad = async () => {
      await document.fonts?.ready;
      if (!cancelled) measure();
    };

    measure();
    void measureAfterFontsLoad();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    document.fonts?.addEventListener("loadingdone", measure);

    return () => {
      cancelled = true;
      observer.disconnect();
      document.fonts?.removeEventListener("loadingdone", measure);
    };
  }, []);

  return <>
    <span className="sr-only">{text}</span>
    <motion.span
      ref={rootRef}
      className={`animated-lines ${className}`.trim()}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.15 }}
      aria-hidden="true"
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            ref={(node) => { wordRefs.current[index] = node; }}
            className="animated-line-word-mask"
            aria-hidden="true"
          >
            <motion.span
              className={`animated-line-word${word.replace(/[.,]/g, "") === emphasis ? " is-emphasis" : ""}`}
              variants={{
                hidden: { y: "105%", opacity: 0, letterSpacing: "0.012em" },
                visible: {
                  y: "0%",
                  opacity: 1,
                  letterSpacing: "-0.02em",
                  transition: { duration: .8, delay: delay + lineIndexes[index] * .12, ease: motionEase.editorial },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? (breakableSpacing ? " " : <span aria-hidden="true">&nbsp;</span>) : null}
        </span>
      ))}
    </motion.span>
  </>;
}
