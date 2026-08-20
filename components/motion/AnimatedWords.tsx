"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { motionEase } from "@/lib/motion";

type AnimatedWordsProps = {
  text: string;
  as?: "span" | "em";
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: "load" | "view";
};

export function AnimatedWords({
  text,
  as = "span",
  className = "",
  delay = 0,
  stagger = 0.07,
  mode = "view",
}: AnimatedWordsProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = as === "em" ? motion.em : motion.span;
  const words = text.split(" ");
  const reveal = reduceMotion ? undefined : "visible";

  return (
    <MotionTag
      className={`animated-words ${className}`.trim()}
      initial={reduceMotion ? false : "hidden"}
      animate={mode === "load" ? reveal : undefined}
      whileInView={mode === "view" ? reveal : undefined}
      viewport={{ once: true, amount: 0.18 }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="animated-word-mask" aria-hidden="true">
            <motion.span
              className="animated-word"
              variants={{
                hidden: { y: "108%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: .76, delay: delay + index * stagger, ease: motionEase.editorial },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
