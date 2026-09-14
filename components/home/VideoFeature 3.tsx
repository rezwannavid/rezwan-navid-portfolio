"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/motion/Magnetic";
import { motionEase } from "@/lib/motion";

export function VideoFeature() {
  const [requested, setRequested] = useState(false);
  const reduceMotion = useReducedMotion();

  const homepageVideoVisible = false;
  if (!homepageVideoVisible) return null;

  return (
    <motion.div
      className="home-video-frame"
      data-cursor="Play"
      initial={reduceMotion ? false : { clipPath: "inset(7% 0 30% 0 round 10px)", y: 18 }}
      whileInView={reduceMotion ? undefined : { clipPath: "inset(0% 0 0% 0 round 10px)", y: 0 }}
      viewport={{ once: true, amount: .16 }}
      transition={{ duration: .82, ease: motionEase.editorial }}
    >
      <motion.img initial={reduceMotion ? false : { scale: 1.03 }} whileInView={reduceMotion ? undefined : { scale: 1 }} viewport={{ once: true, amount: .16 }} transition={{ duration: .9, ease: motionEase.editorial }} src="/home-design/video-poster.png?v=2" alt="Product-thinking talk video poster" width="3740" height="2016" loading="lazy" />
      <Magnetic className="home-video-play-magnetic" strength={5}>
        <button className="home-video-play" type="button" aria-pressed={requested} onClick={() => setRequested(true)}>
          <span className="home-play-glyph" aria-hidden="true" />
          <span>{requested ? "Film coming soon" : "Play"}</span>
        </button>
      </Magnetic>
    </motion.div>
  );
}
