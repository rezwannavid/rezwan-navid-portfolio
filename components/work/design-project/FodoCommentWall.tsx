"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

type CommentTier = "hero" | "support" | "atmosphere";

const sourceSizes = {
  "IMG_0611 1.png": [1003, 320], "IMG_0611 2.png": [370, 166], "IMG_0611 3.png": [336, 138], "IMG_0611 4.png": [279, 115],
  "IMG_0611 5.png": [1072, 342], "IMG_0611 6.png": [396, 177], "IMG_0611 7.png": [396, 163], "IMG_0611 8.png": [298, 123],
  "IMG_0612 1.png": [680, 200], "IMG_0612 2.png": [728, 214],
  "IMG_0613 1.png": [1007, 318], "IMG_0613 2.png": [369, 158], "IMG_0613 3.png": [665, 261], "IMG_0613 4.png": [479, 188],
  "IMG_0613 5.png": [566, 158], "IMG_0613 6.png": [492, 216], "IMG_0613 7.png": [1077, 339], "IMG_0613 8.png": [395, 169],
  "IMG_0613 9.png": [608, 232], "IMG_0613 10.png": [430, 169], "IMG_0613 11.png": [605, 169], "IMG_0613 12.png": [524, 228],
  "IMG_0614 1.png": [1062, 313], "IMG_0614 3.png": [375, 151], "IMG_0614 4.png": [1135, 335], "IMG_0614 5.png": [404, 163],
  "IMG_0615 1.png": [330, 128], "IMG_0615 2.png": [353, 137],
  "IMG_0616 1.png": [397, 153], "IMG_0616 3.png": [403, 154], "IMG_0616 4.png": [424, 164], "IMG_0616 5.png": [430, 164],
  "IMG_0617 1.png": [409, 163], "IMG_0617 2.png": [592, 236], "IMG_0617 3.png": [382, 152], "IMG_0617 5.png": [409, 163], "IMG_0617 6.png": [409, 163],
  "IMG_0618 1.png": [408, 156], "IMG_0618 2.png": [408, 156], "IMG_0618 3.png": [408, 157], "IMG_0618 4.png": [436, 168],
  "IMG_0618 5.png": [436, 166], "IMG_0618 6.png": [436, 166],
  "IMG_0619 1.png": [413, 157], "IMG_0619 2.png": [444, 169],
  "IMG_0620 1.png": [605, 214], "IMG_0620 2.png": [677, 215], "IMG_0620 3.png": [368, 165], "IMG_0620 4.png": [393, 176],
  "IMG_0620 5.png": [647, 229], "IMG_0620 6.png": [724, 230],
  "IMG_0624 1.png": [347, 133], "IMG_0624 2.png": [370, 142],
  "IMG_0625 2.png": [332, 124], "IMG_0625 3.png": [358, 147],
  "IMG_0626 1.png": [415, 165], "IMG_0626 2.png": [415, 165], "IMG_0626 3.png": [444, 168], "IMG_0626 4.png": [444, 176],
  "IMG_0627 1.png": [568, 253], "IMG_0627 2.png": [583, 157], "IMG_0627 3.png": [489, 218], "IMG_0627 4.png": [624, 168],
  "IMG_0628 1.png": [377, 165], "IMG_0628 2.png": [403, 176],
  "IMG_0632 1.png": [363, 204], "IMG_0632 2.png": [389, 218], "IMG_0633 1.png": [356, 204], "IMG_0633 2.png": [380, 218],
} as const;

type AssetName = keyof typeof sourceSizes;

type CommentCardConfig = {
  file: AssetName;
  tier: CommentTier;
  alt: string;
  x: number;
  y: number;
  width: number;
  rotation: number;
  depth: number;
  opacity: number;
  parallax: number;
  zIndex: number;
};

const asset = (file: AssetName) => `/Fodo Pictures/comments/${encodeURIComponent(file)}`;
const reaction = (file: AssetName, tier: CommentTier, x: number, y: number, width: number, rotation: number, zIndex: number, alt = "A reaction to Fodo"): CommentCardConfig => ({
  file, tier, alt, x, y, width, rotation, zIndex,
  depth: tier === "hero" ? 3 : tier === "support" ? 2 : 1,
  opacity: tier === "hero" ? 1 : tier === "support" ? .96 : .84,
  parallax: tier === "hero" ? 4 : tier === "support" ? 7 : 10,
});

// Four interlocking micro-clusters, manually tuned against the desktop canvas.
// Every current PNG in public/Fodo Pictures/comments appears exactly once.
const comments: CommentCardConfig[] = [
  reaction("IMG_0611 1.png", "hero", 8, 58, 350, -.12, 54, "Yo love the craft that went into this! Beautiful interactions and sounds"),
  reaction("IMG_0611 2.png", "support", 4, 205, 178, .18, 31, "So satisfying"),
  reaction("IMG_0611 3.png", "support", 22, 188, 185, -.2, 33, "Beautiful work"),
  reaction("IMG_0611 4.png", "atmosphere", 34, 124, 108, 0, 11),
  reaction("IMG_0611 5.png", "atmosphere", 29, 36, 150, .16, 16),
  reaction("IMG_0611 6.png", "atmosphere", 18, 10, 120, -.26, 13),
  reaction("IMG_0611 7.png", "atmosphere", 40, 4, 116, .2, 12),
  reaction("IMG_0611 8.png", "atmosphere", 42, 82, 102, 0, 17),

  reaction("IMG_0612 1.png", "hero", 57, 42, 310, .12, 52, "Looks amazing! Can't wait to try it"),
  reaction("IMG_0612 2.png", "support", 70, 156, 208, -.15, 35),
  reaction("IMG_0614 1.png", "hero", 47, 186, 365, .1, 55, "Looks really polished. The micro animations make the camera feel much more tactile."),
  reaction("IMG_0614 3.png", "atmosphere", 87, 116, 118, -.2, 15),
  reaction("IMG_0614 4.png", "support", 76, 274, 218, .14, 38),
  reaction("IMG_0614 5.png", "atmosphere", 38, 292, 118, -.18, 18),

  reaction("IMG_0613 1.png", "hero", 10, 340, 345, -.1, 56, "So good I'll increase my phone's volume every time I use it."),
  reaction("IMG_0613 2.png", "atmosphere", 36, 246, 148, .2, 20),
  reaction("IMG_0613 3.png", "atmosphere", 86, 232, 145, -.22, 15),
  reaction("IMG_0613 4.png", "support", 63, 302, 205, .12, 36, "More apps should rely on this approach"),
  reaction("IMG_0613 5.png", "atmosphere", 43, 352, 144, 0, 22),
  reaction("IMG_0613 6.png", "atmosphere", 80, 350, 135, .24, 13),
  reaction("IMG_0613 7.png", "atmosphere", 2, 274, 154, .18, 14),
  reaction("IMG_0613 8.png", "atmosphere", 5, 438, 116, -.2, 18),
  reaction("IMG_0613 9.png", "atmosphere", 27, 426, 148, .1, 21),
  reaction("IMG_0613 10.png", "atmosphere", 43, 418, 124, -.18, 19),
  reaction("IMG_0613 11.png", "atmosphere", 60, 402, 145, .14, 22),
  reaction("IMG_0613 12.png", "atmosphere", 78, 416, 136, -.1, 17),

  reaction("IMG_0615 1.png", "atmosphere", 2, 482, 112, .2, 13),
  reaction("IMG_0615 2.png", "atmosphere", 19, 480, 116, -.16, 18),
  reaction("IMG_0616 1.png", "atmosphere", 34, 466, 124, 0, 15),
  reaction("IMG_0616 3.png", "atmosphere", 84, 460, 122, .2, 14),
  reaction("IMG_0616 4.png", "atmosphere", 70, 468, 128, -.18, 19),
  reaction("IMG_0616 5.png", "atmosphere", 50, 472, 130, .12, 20),

  reaction("IMG_0620 6.png", "hero", 51, 500, 340, .08, 58, "That's a clean interface, love it"),
  reaction("IMG_0627 1.png", "support", 25, 538, 220, -.12, 40, "Interested! When is it available?"),
  reaction("IMG_0628 1.png", "support", 72, 370, 200, .14, 39, "Which iPhone is this, looks stunning"),
  reaction("IMG_0628 2.png", "atmosphere", 88, 382, 120, -.2, 16),

  reaction("IMG_0617 1.png", "atmosphere", 3, 568, 122, .18, 13),
  reaction("IMG_0617 2.png", "support", 18, 560, 188, -.14, 34),
  reaction("IMG_0617 3.png", "atmosphere", 35, 550, 118, .12, 17),
  reaction("IMG_0617 5.png", "atmosphere", 75, 548, 124, -.16, 21),
  reaction("IMG_0617 6.png", "atmosphere", 86, 574, 118, .14, 14),
  reaction("IMG_0618 1.png", "atmosphere", 2, 640, 124, -.14, 12),
  reaction("IMG_0618 2.png", "support", 17, 626, 180, .12, 37, "I need this"),
  reaction("IMG_0618 3.png", "atmosphere", 35, 630, 122, -.16, 19),
  reaction("IMG_0618 4.png", "atmosphere", 49, 620, 130, .12, 23),
  reaction("IMG_0618 5.png", "atmosphere", 67, 626, 130, -.14, 22),
  reaction("IMG_0618 6.png", "atmosphere", 82, 648, 126, .16, 15),

  reaction("IMG_0619 1.png", "atmosphere", 7, 704, 126, -.2, 14),
  reaction("IMG_0619 2.png", "atmosphere", 27, 692, 134, .14, 20),
  reaction("IMG_0620 1.png", "support", 39, 680, 205, -.1, 36, "App name please"),
  reaction("IMG_0620 2.png", "atmosphere", 59, 696, 175, .14, 24),
  reaction("IMG_0620 3.png", "atmosphere", 85, 706, 116, -.16, 15),
  reaction("IMG_0620 4.png", "atmosphere", 2, 762, 120, .12, 13),
  reaction("IMG_0620 5.png", "support", 18, 748, 205, -.12, 35),
  reaction("IMG_0624 1.png", "atmosphere", 72, 756, 116, .16, 17),
  reaction("IMG_0624 2.png", "atmosphere", 85, 784, 118, -.12, 14),

  reaction("IMG_0625 2.png", "atmosphere", 5, 812, 112, -.16, 12),
  reaction("IMG_0625 3.png", "atmosphere", 20, 820, 118, .14, 18),
  reaction("IMG_0626 1.png", "atmosphere", 34, 810, 126, -.12, 20),
  reaction("IMG_0626 2.png", "atmosphere", 48, 798, 126, .12, 21),
  reaction("IMG_0626 3.png", "atmosphere", 61, 786, 136, -.1, 23),
  reaction("IMG_0626 4.png", "support", 75, 826, 192, .1, 34, "Ready to test if needed"),
  reaction("IMG_0627 2.png", "atmosphere", 41, 742, 150, -.12, 25),
  reaction("IMG_0627 3.png", "atmosphere", 57, 568, 158, .12, 28),
  reaction("IMG_0627 4.png", "support", 36, 850, 210, -.1, 33, "Let me know when it is out"),

  reaction("IMG_0632 1.png", "atmosphere", 3, 872, 118, .14, 11),
  reaction("IMG_0632 2.png", "atmosphere", 23, 866, 125, -.12, 16),
  reaction("IMG_0633 1.png", "atmosphere", 62, 878, 118, .12, 15),
  reaction("IMG_0633 2.png", "atmosphere", 82, 868, 126, -.14, 12),
];

function referenceLeft(card: CommentCardConfig) {
  return 14.4 * card.x;
}

function commentHeight(card: CommentCardConfig) {
  const [width, height] = sourceSizes[card.file];
  return card.width * height / width;
}

function CommentCard({ card, index, activeIndex, progress, onActiveChange }: { card: CommentCardConfig; index: number; activeIndex: number | null; progress: MotionValue<number>; onActiveChange: (index: number | null) => void }) {
  const reduceMotion = useReducedMotion();
  const active = activeIndex === index;
  const activeCard = activeIndex === null ? null : comments[activeIndex];
  const height = commentHeight(card);
  const centerX = referenceLeft(card) + card.width / 2;
  const centerY = card.y + height / 2;
  const dx = activeCard ? centerX - (referenceLeft(activeCard) + activeCard.width / 2) : 0;
  const dy = activeCard ? centerY - (activeCard.y + commentHeight(activeCard) / 2) : 0;
  const distance = activeCard ? Math.hypot(dx, dy) : Number.POSITIVE_INFINITY;
  const radius = activeCard?.tier === "hero" ? 250 : 220;
  const push = activeCard && !active && distance < radius ? (1 - distance / radius) * (card.tier === "atmosphere" ? 8 : 6) : 0;
  const pushX = distance > 0 && Number.isFinite(distance) ? dx / distance * push : 0;
  const pushY = distance > 0 && Number.isFinite(distance) ? dy / distance * push : 0;
  const nearbyDim = activeCard && !active && distance < radius ? 1 - (1 - distance / radius) * .12 : 1;
  const interactive = card.tier !== "atmosphere";
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 290, damping: 31, mass: .7 });
  const rotateY = useSpring(tiltY, { stiffness: 290, damping: 31, mass: .7 });
  const scrollY = useTransform(progress, [0, .46, 1], reduceMotion ? [0, 0, 0] : [card.depth * 3, 0, -card.parallax]);
  const scrollRotate = useTransform(progress, [0, .46, 1], reduceMotion ? [card.rotation, card.rotation, card.rotation] : [card.rotation + (card.rotation < 0 ? -.35 : .35), card.rotation, card.rotation]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!active || reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - rect.left) / rect.width - .5) * 2.6);
    tiltX.set(((event.clientY - rect.top) / rect.height - .5) * -2.1);
  };

  const [sourceWidth, sourceHeight] = sourceSizes[card.file];
  const variables = { "--comment-x": `${card.x}%`, "--comment-width": `${card.width}px` } as CSSProperties;

  return (
    <div className="fodo-comment-position" data-tier={card.tier} style={{ ...variables, top: card.y, width: card.width, height, zIndex: active ? 1000 : card.zIndex }}>
      <motion.div className="fodo-comment-scroll" style={{ y: scrollY, rotateZ: scrollRotate }}>
        <div className="fodo-comment-hitbox" onPointerEnter={interactive ? () => onActiveChange(index) : undefined} onPointerMove={interactive ? handlePointerMove : undefined} onPointerLeave={interactive ? () => { tiltX.set(0); tiltY.set(0); onActiveChange(null); } : undefined}>
          <motion.div className="fodo-comment-displace" animate={{ x: reduceMotion ? 0 : pushX, y: reduceMotion ? 0 : pushY, opacity: reduceMotion ? card.opacity : card.opacity * nearbyDim }} transition={{ type: "spring", stiffness: 315, damping: 30, mass: .72 }}>
            <motion.div className="fodo-comment-card" data-active={active ? "true" : "false"} animate={{ scale: active ? (card.tier === "hero" ? 1.03 : 1.05) : 1, z: active ? (card.tier === "hero" ? 26 : 36) : card.depth * 4 }} transition={{ type: "spring", stiffness: 290, damping: 28, mass: .72 }} style={{ rotateX, rotateY }}>
              <img src={asset(card.file)} alt={card.alt} width={sourceWidth} height={sourceHeight} loading="lazy" decoding="async" draggable={false} />
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
        {comments.map((card, index) => <CommentCard key={card.file} card={card} index={index} activeIndex={activeIndex} progress={scrollYProgress} onActiveChange={setActiveIndex} />)}
      </div>
    </section>
  );
}
