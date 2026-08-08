"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

type CommentTier = "hero" | "support" | "atmosphere";

type CommentCardConfig = {
  id: string;
  source: string;
  tier: CommentTier;
  alt: string;
  x: number;
  y: number;
  width: number;
  aspect: number;
  imageWidth: number;
  imageTop: number;
  imageLeft?: number;
  rotation: number;
  depth: number;
  opacity: number;
  parallax: number;
  zIndex: number;
};

const image = (name: string) => `/Fodo Pictures/comments/${name}.png`;

// One manually art-directed reaction field. Each crop is unique and every visual
// decision can be tuned here without changing the interaction component.
const comments: CommentCardConfig[] = [
  { id: "craft", source: image("0611"), tier: "hero", alt: "Yo love the craft that went into this! Beautiful interactions and sounds", x: 7, y: 86, width: 520, aspect: .3185, imageWidth: 109.17, imageTop: -145.93, rotation: -.35, depth: 3, opacity: 1, parallax: 6, zIndex: 44 },
  { id: "delightful", source: image("0617"), tier: "atmosphere", alt: "Delightful!", x: 67, y: 24, width: 146, aspect: .398, imageWidth: 172.37, imageTop: -551.47, rotation: 1.1, depth: 1, opacity: .66, parallax: 19, zIndex: 7 },
  { id: "magic", source: image("0619"), tier: "atmosphere", alt: "Magic", x: 81, y: 126, width: 157, aspect: .38, imageWidth: 158.89, imageTop: -585.82, rotation: -.8, depth: 1, opacity: .7, parallax: 17, zIndex: 9 },
  { id: "looks-amazing", source: image("0612"), tier: "support", alt: "Looks amazing! Can't wait to try it", x: 55, y: 184, width: 310, aspect: .2941, imageWidth: 133.37, imageTop: -190, rotation: .35, depth: 2, opacity: .94, parallax: 11, zIndex: 26 },
  { id: "beautiful-work", source: image("0611"), tier: "support", alt: "Beautiful work", x: 31, y: 268, width: 255, aspect: .411, imageWidth: 178.1, imageTop: -423.47, rotation: -.7, depth: 2, opacity: .9, parallax: 13, zIndex: 23 },
  { id: "great-job", source: image("0632"), tier: "atmosphere", alt: "Great job my friend", x: 76, y: 292, width: 170, aspect: .56, imageWidth: 181.38, imageTop: -306.04, rotation: 1.2, depth: 1, opacity: .62, parallax: 21, zIndex: 8 },
  { id: "smooth", source: image("0613"), tier: "atmosphere", alt: "Smooth", x: 12, y: 346, width: 170, aspect: .392, imageWidth: 163.75, imageTop: -396.11, rotation: -.95, depth: 1, opacity: .72, parallax: 18, zIndex: 11 },

  { id: "polished", source: image("0614"), tier: "hero", alt: "Looks really polished. The micro animations make the camera feel much more tactile.", x: 49, y: 388, width: 535, aspect: .295, imageWidth: 99.92, imageTop: -106.32, rotation: .28, depth: 3, opacity: 1, parallax: 5, zIndex: 45 },
  { id: "so-satisfying", source: image("0611"), tier: "support", alt: "So satisfying", x: 5, y: 470, width: 275, aspect: .447, imageWidth: 178.1, imageTop: -285.42, rotation: .8, depth: 2, opacity: .9, parallax: 13, zIndex: 25 },
  { id: "amazing", source: image("0616"), tier: "atmosphere", alt: "Amazing", x: 30, y: 422, width: 147, aspect: .386, imageWidth: 163.75, imageTop: -574.42, rotation: -1.1, depth: 1, opacity: .64, parallax: 20, zIndex: 10 },
  { id: "perfect", source: image("0618"), tier: "atmosphere", alt: "Perfect", x: 74, y: 564, width: 168, aspect: .381, imageWidth: 161.51, imageTop: -546.11, rotation: .75, depth: 1, opacity: .68, parallax: 18, zIndex: 12 },
  { id: "more-apps", source: image("0613"), tier: "support", alt: "More apps should rely on this approach", x: 38, y: 596, width: 290, aspect: .392, imageWidth: 163.75, imageTop: -502.81, rotation: -.35, depth: 2, opacity: .91, parallax: 12, zIndex: 28 },
  { id: "looks-clean", source: image("0626"), tier: "support", alt: "Looks clean", x: 77, y: 652, width: 245, aspect: .397, imageWidth: 158.89, imageTop: -311.42, rotation: .55, depth: 2, opacity: .86, parallax: 13, zIndex: 21 },
  { id: "skeuomorphism", source: image("0611"), tier: "atmosphere", alt: "Skeuomorphism!", x: 17, y: 626, width: 146, aspect: .411, imageWidth: 178.1, imageTop: -533.84, rotation: -1.25, depth: 1, opacity: .61, parallax: 22, zIndex: 6 },

  { id: "sound", source: image("0613"), tier: "hero", alt: "So good I'll increase my phone's volume every time I use it.", x: 10, y: 728, width: 500, aspect: .315, imageWidth: 108.56, imageTop: -140.35, rotation: -.25, depth: 3, opacity: 1, parallax: 7, zIndex: 46 },
  { id: "app-name-please", source: image("0620"), tier: "support", alt: "App name please", x: 56, y: 740, width: 275, aspect: .353, imageWidth: 158.89, imageTop: -216.03, rotation: .55, depth: 2, opacity: .94, parallax: 12, zIndex: 31 },
  { id: "interested", source: image("0627"), tier: "support", alt: "Interested! When is it available?", x: 72, y: 832, width: 295, aspect: .445, imageWidth: 144.13, imageTop: -99.45, rotation: -.45, depth: 2, opacity: .9, parallax: 10, zIndex: 30 },
  { id: "whoa", source: image("0617"), tier: "atmosphere", alt: "Whoa", x: 4, y: 880, width: 155, aspect: .397, imageWidth: 172.37, imageTop: -343.91, rotation: 1.2, depth: 1, opacity: .66, parallax: 20, zIndex: 8 },
  { id: "need-this", source: image("0618"), tier: "support", alt: "I need this", x: 30, y: 904, width: 244, aspect: .381, imageWidth: 161.51, imageTop: -347.33, rotation: .35, depth: 2, opacity: .88, parallax: 14, zIndex: 24 },
  { id: "stunning", source: image("0628"), tier: "support", alt: "Which iPhone is this, looks stunning", x: 56, y: 970, width: 300, aspect: .436, imageWidth: 174.93, imageTop: -579.59, rotation: -.2, depth: 2, opacity: .92, parallax: 11, zIndex: 29 },
  { id: "yes", source: image("0624"), tier: "atmosphere", alt: "Oh yes I like that", x: 84, y: 1026, width: 148, aspect: .382, imageWidth: 164.21, imageTop: -372.99, rotation: .8, depth: 1, opacity: .62, parallax: 20, zIndex: 7 },

  { id: "clean-interface", source: image("0620"), tier: "hero", alt: "That's a clean interface, love it", x: 50, y: 1080, width: 510, aspect: .317, imageWidth: 151.93, imageTop: -483.94, imageLeft: -1.83, rotation: .22, depth: 3, opacity: 1, parallax: 6, zIndex: 47 },
  { id: "cant-wait", source: image("0613"), tier: "support", alt: "Can't wait, that's hot", x: 8, y: 1050, width: 270, aspect: .392, imageWidth: 178.64, imageTop: -290.37, rotation: -.55, depth: 2, opacity: .86, parallax: 14, zIndex: 22 },
  { id: "ready-test", source: image("0626"), tier: "support", alt: "Ready to test if needed", x: 22, y: 1178, width: 295, aspect: .396, imageWidth: 158.89, imageTop: -123.13, rotation: .45, depth: 2, opacity: .9, parallax: 12, zIndex: 27 },
  { id: "extremely-yes", source: image("0633"), tier: "atmosphere", alt: "Extremely yes", x: 81, y: 1215, width: 167, aspect: .572, imageWidth: 185.38, imageTop: -396.15, rotation: -.9, depth: 1, opacity: .65, parallax: 19, zIndex: 9 },
  { id: "available-store", source: image("0613"), tier: "atmosphere", alt: "Is it available in App Store?", x: 5, y: 1272, width: 188, aspect: .392, imageWidth: 116.5, imageTop: -603.75, rotation: 1.05, depth: 1, opacity: .68, parallax: 18, zIndex: 12 },
  { id: "app-name", source: image("0616"), tier: "atmosphere", alt: "App name", x: 73, y: 1308, width: 160, aspect: .386, imageWidth: 166.06, imageTop: -168.61, rotation: -.65, depth: 1, opacity: .72, parallax: 17, zIndex: 14 },
  { id: "aesthetics", source: image("0625"), tier: "support", alt: "The most interesting design for aesthetics", x: 41, y: 1316, width: 275, aspect: .41, imageWidth: 163.3, imageTop: -561.44, rotation: .3, depth: 2, opacity: .87, parallax: 13, zIndex: 25 },

  { id: "physical-control", source: image("0628"), tier: "support", alt: "A well-designed interface replicating physical interaction", x: 58, y: 1438, width: 285, aspect: .436, imageWidth: 174.93, imageTop: -579.59, rotation: -.3, depth: 2, opacity: .84, parallax: 14, zIndex: 20 },
  { id: "clean-short", source: image("0626"), tier: "atmosphere", alt: "Looks clean", x: 14, y: 1432, width: 160, aspect: .397, imageWidth: 158.89, imageTop: -311.42, rotation: .9, depth: 1, opacity: .64, parallax: 20, zIndex: 8 },
  { id: "delightful-short", source: image("0615"), tier: "atmosphere", alt: "Delightful", x: 38, y: 1485, width: 142, aspect: .387, imageWidth: 161.95, imageTop: -205.67, rotation: -1.05, depth: 1, opacity: .61, parallax: 21, zIndex: 6 },
  { id: "beautiful", source: image("0614"), tier: "atmosphere", alt: "Beautiful", x: 78, y: 1547, width: 154, aspect: .402, imageWidth: 174.41, imageTop: -598.45, rotation: .75, depth: 1, opacity: .66, parallax: 18, zIndex: 10 },
  { id: "polaroid", source: image("0613"), tier: "atmosphere", alt: "Cooking", x: 22, y: 1563, width: 175, aspect: .457, imageWidth: 191.4, imageTop: -712.37, rotation: -.65, depth: 1, opacity: .58, parallax: 22, zIndex: 5 },
  { id: "amazing-short", source: image("0617"), tier: "atmosphere", alt: "Looks amazing", x: 48, y: 1596, width: 158, aspect: .397, imageWidth: 172.37, imageTop: -141.91, rotation: .9, depth: 1, opacity: .64, parallax: 19, zIndex: 8 },
  { id: "interest", source: image("0627"), tier: "atmosphere", alt: "Let me know when it is out", x: 64, y: 1650, width: 190, aspect: .37, imageWidth: 112.93, imageTop: -376.71, rotation: -.45, depth: 1, opacity: .62, parallax: 20, zIndex: 7 },
  { id: "clean-interface-small", source: image("0620"), tier: "atmosphere", alt: "Gimme", x: 28, y: 1688, width: 145, aspect: .445, imageWidth: 179.18, imageTop: -585.97, imageLeft: -2.16, rotation: .6, depth: 1, opacity: .57, parallax: 23, zIndex: 4 },
  { id: "design-interest", source: image("0624"), tier: "atmosphere", alt: "Definitely a yes", x: 73, y: 1724, width: 160, aspect: .382, imageWidth: 164.21, imageTop: -372.99, rotation: -.8, depth: 1, opacity: .55, parallax: 22, zIndex: 5 },
];

function referenceLeft(card: CommentCardConfig) {
  return 12.8 * card.x;
}

function CommentCard({ card, index, activeIndex, progress, onActiveChange }: { card: CommentCardConfig; index: number; activeIndex: number | null; progress: MotionValue<number>; onActiveChange: (index: number | null) => void }) {
  const reduceMotion = useReducedMotion();
  const active = activeIndex === index;
  const activeCard = activeIndex === null ? null : comments[activeIndex];
  const centerX = referenceLeft(card) + card.width / 2;
  const centerY = card.y + card.width * card.aspect / 2;
  const activeCenterX = activeCard ? referenceLeft(activeCard) + activeCard.width / 2 : 0;
  const activeCenterY = activeCard ? activeCard.y + activeCard.width * activeCard.aspect / 2 : 0;
  const dx = centerX - activeCenterX;
  const dy = centerY - activeCenterY;
  const distance = activeCard ? Math.hypot(dx, dy) : Number.POSITIVE_INFINITY;
  const influenceRadius = activeCard?.tier === "hero" ? 370 : 300;
  const push = activeCard && !active && distance < influenceRadius ? (1 - distance / influenceRadius) * (card.tier === "atmosphere" ? 18 : 13) : 0;
  const pushX = distance > 0 && Number.isFinite(distance) ? dx / distance * push : 0;
  const pushY = distance > 0 && Number.isFinite(distance) ? dy / distance * push : 0;
  const nearbyDim = activeCard && !active && distance < influenceRadius ? 1 - (1 - distance / influenceRadius) * .2 : 1;
  const interactive = card.tier !== "atmosphere";
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 270, damping: 29, mass: .72 });
  const rotateY = useSpring(tiltY, { stiffness: 270, damping: 29, mass: .72 });
  const settleOffset = card.depth === 3 ? 16 : card.depth === 2 ? 11 : 7;
  const scrollY = useTransform(progress, [0, .44, 1], reduceMotion ? [0, 0, 0] : [settleOffset, 0, -card.parallax]);
  const scrollRotate = useTransform(progress, [0, .44, 1], reduceMotion ? [card.rotation, card.rotation, card.rotation] : [card.rotation + (card.rotation < 0 ? -1.2 : 1.2), card.rotation, card.rotation]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!active || reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - rect.left) / rect.width - .5) * 4);
    tiltX.set(((event.clientY - rect.top) / rect.height - .5) * -3.2);
  };

  const variables = {
    "--comment-x": `${card.x}%`,
    "--comment-width": `${card.width}px`,
    "--comment-opacity": card.opacity,
    "--card-image-width": `${card.imageWidth}%`,
    "--card-image-top": `${card.imageTop}%`,
    "--card-image-left": `${card.imageLeft ?? 0}%`,
  } as CSSProperties;

  return (
    <div className="fodo-comment-position" data-tier={card.tier} style={{ ...variables, top: card.y, width: card.width, height: card.width * card.aspect, zIndex: active ? 1000 : card.zIndex }}>
      <motion.div className="fodo-comment-scroll" style={{ y: scrollY, rotateZ: scrollRotate }}>
        <div
          className="fodo-comment-hitbox"
          onPointerEnter={interactive ? () => onActiveChange(index) : undefined}
          onPointerMove={interactive ? handlePointerMove : undefined}
          onPointerLeave={interactive ? () => { tiltX.set(0); tiltY.set(0); onActiveChange(null); } : undefined}
        >
          <motion.div
            className="fodo-comment-displace"
            animate={{ x: reduceMotion ? 0 : pushX, y: reduceMotion ? 0 : pushY, opacity: reduceMotion ? card.opacity : card.opacity * nearbyDim }}
            transition={{ type: "spring", stiffness: 285, damping: 28, mass: .78 }}
          >
            <motion.div
              className="fodo-comment-card"
              data-active={active ? "true" : "false"}
              animate={{ scale: active ? (card.tier === "hero" ? 1.055 : 1.075) : 1, z: active ? (card.tier === "hero" ? 38 : 54) : card.depth * 6 }}
              transition={{ type: "spring", stiffness: 260, damping: 26, mass: .76 }}
              style={{ rotateX, rotateY }}
            >
              <img src={card.source} alt={card.alt} loading={card.tier === "hero" ? "eager" : "lazy"} decoding="async" draggable={false} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function FodoCommentWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: wallRef, offset: ["start end", "end start"] });

  return (
    <section className="fodo-comment-section" aria-label="Community reactions to Fodo">
      <div ref={wallRef} className="fodo-comment-wall" onPointerLeave={() => setActiveIndex(null)}>
        {comments.map((card, index) => <CommentCard key={card.id} card={card} index={index} activeIndex={activeIndex} progress={scrollYProgress} onActiveChange={setActiveIndex} />)}
      </div>
    </section>
  );
}
