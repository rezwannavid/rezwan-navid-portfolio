"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { motionEase } from "@/lib/motion";

type AnimatedLinesProps = {
  text: string;
  className?: string;
  emphasis?: string;
  delay?: number;
};

export function AnimatedLines({ text, className = "", emphasis, delay = 0 }: AnimatedLinesProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const words = text.split(" ");
  const [lineIndexes, setLineIndexes] = useState(() => words.map(() => 0));

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

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
      setLineIndexes((current) => current.every((value, index) => value === next[index]) ? current : next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.span
      ref={rootRef}
      className={`animated-lines ${className}`.trim()}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.15 }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          ref={(node) => { wordRefs.current[index] = node; }}
          className="animated-line-word-mask"
          aria-hidden="true"
          key={`${word}-${index}`}
        >
          <motion.span
            className={`animated-line-word${word.replace(/[.,]/g, "") === emphasis ? " is-emphasis" : ""}`}
            variants={{
              hidden: { y: "105%", opacity: 0.08, letterSpacing: "0.012em" },
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
          {index < words.length - 1 ? <span aria-hidden="true">&nbsp;</span> : null}
        </span>
      ))}
    </motion.span>
  );
}
