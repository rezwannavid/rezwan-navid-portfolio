"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

type Card = {
  source: string;
  left: string;
  top: number;
  width: number;
  height: number;
  imageWidth: number;
  imageTop: number;
  imageLeft?: number;
  depth: number;
};

const image = (name: string) => `/Fodo Pictures/comments/${name}.png`;

function resolveLeft(value: string) {
  if (!value.startsWith("calc")) return Number.parseFloat(value);
  const match = value.match(/calc\(([\d.]+)%\s*([+-])\s*([\d.]+)px\)/);
  if (!match) return 450;
  const percent = Number(match[1]);
  const offset = Number(match[3]) * (match[2] === "-" ? -1 : 1);
  return 900 * percent / 100 + offset;
}

// Exact deterministic crops and placement from the selected Figma comment-wall node (923:30756).
const cards: Card[] = [
  { source: image("0614"), left: "calc(37.5% + 39.18px)", top: 0, width: 93.56, height: 37.65, imageWidth: 174.41, imageTop: -598.45, depth: 1 },
  { source: image("0617"), left: "calc(37.5% + 145.33px)", top: 0, width: 95.49, height: 37.97, imageWidth: 172.37, imageTop: -551.47, depth: 2 },
  { source: image("0611"), left: "calc(12.5% + 124.95px)", top: 47.65, width: 250.57, height: 79.81, imageWidth: 109.17, imageTop: -145.93, depth: 5 },
  { source: image("0612"), left: "calc(37.5% + 66.35px)", top: 48.4, width: 169.98, height: 49.99, imageWidth: 133.37, imageTop: -190, depth: 3 },
  { source: image("0617"), left: "calc(50% + 83.83px)", top: 43.31, width: 147.81, height: 58.78, imageWidth: 172.37, imageTop: -343.91, depth: 4 },
  { source: image("0615"), left: "calc(37.5% + 151.27px)", top: 107.85, width: 82.37, height: 31.91, imageWidth: 161.95, imageTop: -205.67, depth: 2 },
  { source: image("0614"), left: "calc(50% + 96.57px)", top: 112.94, width: 265.3, height: 78.24, imageWidth: 99.92, imageTop: -106.32, depth: 5 },
  { source: image("0619"), left: "calc(37.5% + 37.48px)", top: 127.38, width: 103.19, height: 39.22, imageWidth: 158.89, imageTop: -585.82, depth: 3 },
  { source: image("0616"), left: "calc(12.5% + 118.86px)", top: 140.11, width: 99.12, height: 38.25, imageWidth: 166.06, imageTop: -168.61, depth: 3 },
  { source: image("0620"), left: "calc(25% + 72.65px)", top: 140.11, width: 91.86, height: 41.04, imageWidth: 179.18, imageTop: -585.97, imageLeft: -2.16, depth: 2 },
  { source: image("0613"), left: "calc(25% + 166.91px)", top: 180.88, width: 251.68, height: 79.26, imageWidth: 108.56, imageTop: -140.35, depth: 5 },
  { source: image("0611"), left: "calc(25% + 57.37px)", top: 197.01, width: 83.91, height: 34.48, imageWidth: 178.1, imageTop: -423.47, depth: 2 },
  { source: image("0618"), left: "calc(50% + 118.65px)", top: 203.8, width: 101.91, height: 38.81, imageWidth: 161.51, imageTop: -148.2, depth: 3 },
  { source: image("0627"), left: "calc(62.5% + 78.38px)", top: 205.5, width: 155.85, height: 41.8, imageWidth: 112.93, imageTop: -376.71, depth: 4 },
  { source: image("0620"), left: "188px", top: 212.29, width: 180.88, height: 57.34, imageWidth: 151.93, imageTop: -483.94, imageLeft: -1.83, depth: 4 },
  { source: image("0611"), left: "calc(25% + 63.31px)", top: 249.66, width: 92.42, height: 41.32, imageWidth: 178.1, imageTop: -285.42, depth: 3 },
  { source: image("0618"), left: "calc(50% + 121.2px)", top: 259.85, width: 101.91, height: 39.09, imageWidth: 161.51, imageTop: -546.11, depth: 3 },
  { source: image("0632"), left: "calc(75% - 38.31px)", top: 261.55, width: 90.74, height: 50.82, imageWidth: 181.38, imageTop: -306.04, depth: 4 },
  { source: image("0620"), left: "calc(37.5% + 89.28px)", top: 267.49, width: 151.04, height: 53.33, imageWidth: 158.89, imageTop: -216.03, depth: 4 },
  { source: image("0611"), left: "calc(25% + 168.61px)", top: 275.98, width: 69.56, height: 28.58, imageWidth: 178.1, imageTop: -533.84, depth: 2 },
  { source: image("0616"), left: "calc(12.5% + 83.2px)", top: 290.42, width: 100.73, height: 38.34, imageWidth: 163.75, imageTop: -574.42, depth: 3 },
  { source: image("0618"), left: "calc(62.5% + 9.6px)", top: 311.65, width: 101.91, height: 38.81, imageWidth: 161.51, imageTop: -347.33, depth: 3 },
  { source: image("0613"), left: "calc(12.5% + 198.69px)", top: 327.78, width: 166.16, height: 65.08, imageWidth: 163.75, imageTop: -396.11, depth: 5 },
  { source: image("0633"), left: "calc(12.5% + 98.48px)", top: 340.52, width: 94.94, height: 54.34, imageWidth: 185.38, imageTop: -396.15, depth: 4 },
  { source: image("0626"), left: "calc(75% - 28.97px)", top: 337.12, width: 103.58, height: 41.04, imageWidth: 158.89, imageTop: -311.42, depth: 3 },
  { source: image("0627"), left: "calc(37.5% + 69.75px)", top: 336.27, width: 141.96, height: 63.17, imageWidth: 144.13, imageTop: -99.45, depth: 5 },
  { source: image("0633"), left: "calc(50% + 64.3px)", top: 333.73, width: 88.79, height: 50.82, imageWidth: 185.38, imageTop: -396.15, depth: 3 },
  { source: image("0620"), left: "calc(62.5% + 72.44px)", top: 389.77, width: 169.15, height: 53.62, imageWidth: 151.93, imageTop: -483.94, imageLeft: -1.83, depth: 4 },
  { source: image("0627"), left: "calc(50% + 76.19px)", top: 397.42, width: 145.74, height: 39.09, imageWidth: 112.93, imageTop: -376.71, depth: 3 },
  { source: image("0613"), left: "calc(25% + 72.65px)", top: 406.76, width: 119.65, height: 46.86, imageWidth: 163.75, imageTop: -502.81, depth: 3 },
  { source: image("0625"), left: "calc(37.5% + 39.53px)", top: 414.75, width: 83.64, height: 34.29, imageWidth: 163.3, imageTop: -561.44, depth: 2 },
  { source: image("0624"), left: "calc(37.5% + 131.74px)", top: 417.8, width: 92.5, height: 35.3, imageWidth: 164.21, imageTop: -372.99, depth: 3 },
  { source: image("0632"), left: "calc(50% + 82.98px)", top: 451.76, width: 97.03, height: 54.34, imageWidth: 181.38, imageTop: -306.04, depth: 4 },
  { source: image("0613"), left: "calc(25% + 99.83px)", top: 461.95, width: 92.14, height: 39.37, imageWidth: 178.64, imageTop: -290.37, depth: 3 },
  { source: image("0628"), left: "calc(62.5% + 31.68px)", top: 461.95, width: 94.09, height: 41.04, imageWidth: 174.93, imageTop: -579.59, depth: 3 },
  { source: image("0624"), left: "calc(75% - 20.48px)", top: 462.8, width: 86.5, height: 33.01, imageWidth: 164.21, imageTop: -372.99, depth: 2 },
  { source: image("0613"), left: "calc(37.5% + 52.77px)", top: 474.69, width: 141.28, height: 39.37, imageWidth: 116.5, imageTop: -603.75, depth: 4 },
  { source: image("0619"), left: "calc(12.5% + 130.75px)", top: 478.94, width: 110.77, height: 42.1, imageWidth: 158.89, imageTop: -585.82, depth: 3 },
  { source: image("0618"), left: "calc(75% - 38.31px)", top: 515.45, width: 108.97, height: 41.5, imageWidth: 161.51, imageTop: -347.33, depth: 4 },
  { source: image("0613"), left: "calc(25% + 57.37px)", top: 518.85, width: 122.54, height: 56.1, imageWidth: 191.4, imageTop: -712.37, depth: 4 },
  { source: image("0614"), left: "calc(37.5% + 67.2px)", top: 608.86, width: 100.91, height: 40.6, imageWidth: 174.41, imageTop: -598.45, depth: 3 },
  { source: image("0617"), left: "calc(50% + 38.83px)", top: 631.79, width: 102.11, height: 40.6, imageWidth: 172.37, imageTop: -343.91, depth: 4 },
  { source: image("0612"), left: "calc(62.5% - 10.78px)", top: 629.24, width: 181.76, height: 53.46, imageWidth: 133.37, imageTop: -190, depth: 5 },
  { source: image("0611"), left: "calc(12.5% + 134.15px)", top: 657.26, width: 267.94, height: 85.35, imageWidth: 109.17, imageTop: -145.93, depth: 6 },
  { source: image("0617"), left: "calc(75% + 10.94px)", top: 682.74, width: 102.11, height: 40.6, imageWidth: 172.37, imageTop: -141.91, depth: 3 },
  { source: image("0620"), left: "calc(50% + 48.17px)", top: 691.23, width: 161.51, height: 57.03, imageWidth: 158.89, imageTop: -216.03, depth: 5 },
  { source: image("0618"), left: "calc(62.5% + 48.66px)", top: 705.67, width: 108.97, height: 41.8, imageWidth: 161.51, imageTop: -546.11, depth: 4 },
  { source: image("0613"), left: "calc(12.5% + 129.05px)", top: 753.22, width: 98.53, height: 42.1, imageWidth: 178.64, imageTop: -290.37, depth: 3 },
  { source: image("0611"), left: "calc(25% + 87.09px)", top: 754.92, width: 98.82, height: 44.19, imageWidth: 178.1, imageTop: -285.42, depth: 3 },
  { source: image("0617"), left: "calc(37.5% + 45.12px)", top: 758.32, width: 102.11, height: 40.6, imageWidth: 172.37, imageTop: -551.47, depth: 3 },
  { source: image("0626"), left: "calc(75% - 13.68px)", top: 764.26, width: 110.77, height: 43.89, imageWidth: 158.89, imageTop: -311.42, depth: 4 },
  { source: image("0614"), left: "calc(50% + 6.56px)", top: 766.81, width: 283.7, height: 83.67, imageWidth: 99.92, imageTop: -106.32, depth: 6 },
  { source: image("0613"), left: "calc(12.5% + 112.07px)", top: 822, width: 151.07, height: 42.1, imageWidth: 116.5, imageTop: -603.75, depth: 4 },
  { source: image("0615"), left: "calc(37.5% + 76.54px)", top: 830.5, width: 88.09, height: 34.12, imageWidth: 161.95, imageTop: -205.67, depth: 3 },
  { source: image("0611"), left: "calc(25% + 127px)", top: 835.59, width: 74.39, height: 30.56, imageWidth: 178.1, imageTop: -533.84, depth: 2 },
  { source: image("0620"), left: "calc(62.5% + 56.3px)", top: 867.86, width: 98.23, height: 43.89, imageWidth: 179.18, imageTop: -585.97, imageLeft: -2.16, depth: 3 },
  { source: image("0627"), left: "calc(50% + 86.38px)", top: 870.41, width: 122.11, height: 54.34, imageWidth: 144.13, imageTop: -99.45, depth: 4 },
  { source: image("0613"), left: "calc(12.5% + 163.02px)", top: 874.65, width: 131.04, height: 59.99, imageWidth: 191.4, imageTop: -712.37, depth: 5 },
  { source: image("0625"), left: "calc(25% + 156.72px)", top: 883.15, width: 89.44, height: 36.67, imageWidth: 163.3, imageTop: -561.44, depth: 3 },
  { source: image("0626"), left: "calc(37.5% + 113.06px)", top: 889.94, width: 110.77, height: 43.89, imageWidth: 158.89, imageTop: -123.13, depth: 4 },
  { source: image("0628"), left: "calc(25% + 165.21px)", top: 935.79, width: 100.62, height: 43.89, imageWidth: 174.93, imageTop: -579.59, depth: 3 },
];

function CommentCard({ card, index, activeIndex, progress, onActiveChange }: { card: Card; index: number; activeIndex: number | null; progress: MotionValue<number>; onActiveChange: (index: number | null) => void }) {
  const reduceMotion = useReducedMotion();
  const centerX = resolveLeft(card.left) + card.width / 2;
  const centerY = card.top + card.height / 2;
  const active = activeIndex === index;
  const activeCard = activeIndex === null ? null : cards[activeIndex];
  const dx = activeCard ? centerX - (resolveLeft(activeCard.left) + activeCard.width / 2) : 0;
  const dy = activeCard ? centerY - (activeCard.top + activeCard.height / 2) : 0;
  const distance = Math.hypot(dx, dy);
  const push = activeCard && !active && distance < 190 ? (1 - distance / 190) * 13 : 0;
  const pushX = distance ? (dx / distance) * push : 0;
  const pushY = distance ? (dy / distance) * push : 0;
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 320, damping: 30, mass: .65 });
  const rotateY = useSpring(tiltY, { stiffness: 320, damping: 30, mass: .65 });
  const scrollY = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [(card.depth - 3) * -5, (card.depth - 3) * 8]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!active || reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - rect.left) / rect.width - .5) * 4);
    tiltX.set(((event.clientY - rect.top) / rect.height - .5) * -4);
  };

  return (
    <motion.div className="fodo-comment-scroll" style={{ left: card.left, top: card.top, width: card.width, height: card.height, y: scrollY, zIndex: active ? 100 : card.depth }}>
      <motion.div
        className="fodo-comment-card"
        animate={{ x: reduceMotion ? 0 : pushX, y: reduceMotion ? 0 : pushY, scale: active ? 1.075 : 1 }}
        transition={{ type: "spring", stiffness: 310, damping: 27, mass: .72 }}
        style={{ rotateX, rotateY }}
        onPointerEnter={() => onActiveChange(index)}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => { tiltX.set(0); tiltY.set(0); onActiveChange(null); }}
      >
        <img
          src={card.source}
          alt=""
          loading="eager"
          decoding="async"
          draggable={false}
          style={{ "--card-image-width": `${card.imageWidth}%`, "--card-image-top": `${card.imageTop}%`, "--card-image-left": `${card.imageLeft ?? 0}%` } as CSSProperties}
        />
      </motion.div>
    </motion.div>
  );
}

export function FodoCommentWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: wallRef, offset: ["start end", "end start"] });
  return (
    <section className="fodo-comment-section" aria-label="Community reactions to Fodo">
      <div ref={wallRef} className="fodo-comment-wall" onPointerLeave={() => setActiveIndex(null)}>
        {cards.map((card, index) => (
          <CommentCard key={`${card.source}-${index}`} card={card} index={index} activeIndex={activeIndex} progress={scrollYProgress} onActiveChange={setActiveIndex} />
        ))}
      </div>
    </section>
  );
}
