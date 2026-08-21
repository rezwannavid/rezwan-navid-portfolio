"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { ContactCTA } from "@/components/home/ContactCTA";
import { EditorialLinks } from "@/components/home/EditorialLinks";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { motionEase } from "@/lib/motion";

const introParagraphs = [
  "My work spans product direction, experience design, and design engineering, usually in spaces where the problem is still ambiguous and the path forward isn’t obvious.",
  "I care about understanding people deeply, making good product decisions early, and carrying ideas far enough that they become real, useful things.",
  "I’ve worked across mobility, education, AI, operations, and consumer products, moving between strategy, interface, systems, and implementation as the problem demands.",
];

const childhoodParagraphs = [
  "I grew up in Dhaka, and I’ve been designing interfaces long before I knew that “product design” was a job.",
  "Around fourth grade I saw an iPhone for the first time and became obsessed with the idea that anyone could make the things living inside that screen. I started sketching my own apps in school notebooks, imagining what the icons would look like, what happened after you tapped something, and how I would design them differently.",
  "I didn’t know any design tools, so my first actual interfaces were built in Microsoft PowerPoint. Boxes, gradients, buttons, transitions, whatever I could use to get an idea out of my head and onto a screen.",
  "What stayed with me wasn’t the tool. It was the feeling of taking something imaginary, giving it structure, and making another person able to see what I was thinking.",
  "Eventually I learned the proper tools. Then UX. Then product strategy. Then systems, code and AI. But in a strange way, I’m still doing the same thing I was doing in those notebooks: trying to understand how something should work, then finding the clearest way to make it real.",
];

const principles = [
  {
    title: "understand people at a deeper level",
    description: "The best product decisions come from understanding behavior, context, motivation, and what people actually need, not just what they say they want.",
    image: "/about/principle-01.png",
    color: "linear-gradient(77deg, #29b8ec 4%, #0824f8 100%)",
    angle: -1.5,
  },
  {
    title: "fast decisions beat slow perfection.",
    description: "Momentum creates clarity. Make the smallest meaningful decision, learn from reality, and keep the product moving.",
    image: "/about/principle-02.png",
    color: "linear-gradient(92deg, #e7553f 0%, #bb2b52 100%)",
    angle: 1.4,
  },
  {
    title: "great products live between people and possibility.",
    description: "Useful products balance what people understand today with what technology can make possible tomorrow.",
    image: "/about/principle-03.png",
    color: "linear-gradient(87deg, #4a72d8 0%, #8662db 100%)",
    angle: -1.2,
  },
  {
    title: "good business follows great products.",
    description: "Durable growth is usually the consequence of solving a real problem clearly, repeatedly, and with care.",
    image: "/about/principle-04.png",
    color: "linear-gradient(88deg, #b99147 0%, #5f784b 100%)",
    angle: 1.2,
  },
] as const;

const careerHistory = [
  "founder @mir.stdio",
  "product manager @tygrlabs",
  "lead product designer @rc tech",
  "product exec @10MS",
  "snr. product designer @needin",
  "product designer @heavygari",
];

function SectionLabel({ children }: { children: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.h2 className="about-section-label" initial={reduceMotion ? false : { opacity: 0, y: 8, letterSpacing: ".025em" }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, letterSpacing: "-.02em" }} viewport={{ once: true, amount: .7 }} transition={{ duration: .64, ease: motionEase.editorial }}>{children}</motion.h2>;
}

function FlipPhoto() {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const touchOffsetX = useMotionValue(0);
  const touchOffsetY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 220, damping: 28, mass: .75 });
  const smoothY = useSpring(pointerY, { stiffness: 220, damping: 28, mass: .75 });
  const smoothTouchX = useSpring(touchOffsetX, { stiffness: 220, damping: 28, mass: .75 });
  const smoothTouchY = useSpring(touchOffsetY, { stiffness: 220, damping: 28, mass: .75 });
  const rotateX = useTransform(smoothY, [-1, 1], [2.2, -2.2]);
  const rotateY = useTransform(smoothX, [-1, 1], [-2.2, 2.2]);
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const resistance = event.pointerType === "mouse" ? 1 : .55;
    const nextX = ((event.clientX - rect.left) / rect.width - .5) * 2 * resistance;
    const nextY = ((event.clientY - rect.top) / rect.height - .5) * 2 * resistance;
    pointerX.set(nextX);
    pointerY.set(nextY);
    if (event.pointerType !== "mouse") {
      touchOffsetX.set(nextX * 3);
      touchOffsetY.set(nextY * 2);
    }
  };
  const reset = () => { pointerX.set(0); pointerY.set(0); touchOffsetX.set(0); touchOffsetY.set(0); };

  return (
    <motion.button className="about-child-flip" type="button" data-flipped={flipped} data-cursor="Flip" aria-label="Flip childhood photo" aria-pressed={flipped} initial={reduceMotion ? false : { opacity: 0, x: 34, y: 28, scale: .88, rotate: 3 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .82, delay: .15, ease: motionEase.editorial }} onClick={() => setFlipped((value) => !value)} onPointerMove={move} onPointerLeave={reset} onPointerUp={reset} onPointerCancel={reset}>
      <motion.span className="about-child-tilt" style={{ x: reduceMotion ? 0 : smoothTouchX, y: reduceMotion ? 0 : smoothTouchY, rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}>
        <motion.span className="about-child-flipper" animate={reduceMotion ? { opacity: 1 } : { rotateY: flipped ? 180 : 0 }} transition={{ duration: .58, ease: motionEase.editorial }}>
          <span className="about-child-face about-child-front"><Image unoptimized src="/about/childhood-photo.png" alt="Mir Rezwan Navid as a child" width={473} height={1024} /></span>
          <span className="about-child-face about-child-back"><Image unoptimized src="/home-design/human-clouds.png?v=2" alt="Placeholder artwork on the back of the childhood photo" width={1028} height={640} /></span>
        </motion.span>
      </motion.span>
    </motion.button>
  );
}

function MemoryPhoto() {
  const reduceMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, { stiffness: 220, damping: 28, mass: .75 });
  const y = useSpring(offsetY, { stiffness: 220, damping: 28, mass: .75 });
  const reset = () => { offsetX.set(0); offsetY.set(0); };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    offsetX.set(((event.clientX - rect.left) / rect.width - .5) * 4);
    offsetY.set(((event.clientY - rect.top) / rect.height - .5) * 3);
  };
  return <motion.div className="about-memory-image" initial={reduceMotion ? false : { opacity: .15, x: -28, y: 32, scale: .88, rotate: -3 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .84, ease: motionEase.editorial }} onPointerMove={move} onPointerLeave={reset} onPointerUp={reset} onPointerCancel={reset}><motion.span className="about-memory-tactile" style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}><Image unoptimized src="/about/childhood-companion.png" alt="Abstract cloud and water artwork" width={736} height={1182} /></motion.span></motion.div>;
}

function PrincipleImage({ src, angle }: { src: string; angle: number }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 260, damping: 30, mass: .7 });
  const y = useSpring(pointerY, { stiffness: 260, damping: 30, mass: .7 });
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - .5) * 10);
    pointerY.set(((event.clientY - rect.top) / rect.height - .5) * 8);
  };
  const reset = () => { pointerX.set(0); pointerY.set(0); };
  return <motion.div className="about-principle-image" initial={reduceMotion ? { opacity: 1 } : { opacity: .2, scale: .78, y: 28, rotate: angle * 3 }} animate={{ opacity: 1, scale: 1, y: 0, rotate: angle }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: .86, y: -12, rotate: angle * -2 }} transition={{ duration: .44, ease: motionEase.editorial }} style={{ x: reduceMotion ? 0 : x, translateY: reduceMotion ? 0 : y }} onPointerMove={move} onPointerLeave={reset}><Image unoptimized src={src} alt="" width={1028} height={984} /></motion.div>;
}

function MobilePrincipleWords({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();
  return <span className="about-mobile-principle-words" aria-label={text}>{text.split(" ").map((word, index) => <span className="about-mobile-word-mask" aria-hidden="true" key={`${word}-${index}`}><motion.span initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={reduceMotion ? undefined : { opacity: 0, y: -6, filter: "blur(4px)" }} transition={{ duration: reduceMotion ? .01 : .28, delay: reduceMotion ? 0 : index * .018, ease: motionEase.editorial }}>{word}</motion.span>{index < text.split(" ").length - 1 ? <span>&nbsp;</span> : null}</span>)}</span>;
}

function MobilePrinciples() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: runwayRef, offset: ["start start", "end end"] });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const normalized = Math.min(1, Math.max(0, latest));
    setProgress((current) => Math.abs(current - normalized) < .001 ? current : normalized);
  });

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px), (max-height: 500px) and (orientation: landscape)");
    const preload = () => {
      if (!mobile.matches) return;
      principles.forEach((principle) => {
        const image = new window.Image();
        image.src = principle.image;
      });
    };
    preload();
    mobile.addEventListener("change", preload);
    return () => mobile.removeEventListener("change", preload);
  }, []);

  const segment = progress * principles.length;
  const activeIndex = progress === 1 ? principles.length - 1 : Math.min(principles.length - 1, Math.floor(segment));
  const localProgress = progress === 1 ? 1 : segment - Math.floor(segment);
  const active = principles[activeIndex];
  const nextIndex = activeIndex < principles.length - 1 ? activeIndex + 1 : null;
  const progressFills = principles.map((_, index) => Math.min(1, Math.max(0, segment - index)));

  return (
    <div ref={runwayRef} className="about-mobile-principles-runway">
      <div className="about-mobile-principles-sticky">
        <div className="about-mobile-principle-visual" aria-hidden="true">
          <MobilePrincipleVisual key={`current-${activeIndex}`} image={active.image} role="current" transitionProgress={localProgress} final={nextIndex === null} reduceMotion={Boolean(reduceMotion)} />
          {nextIndex !== null && <MobilePrincipleVisual key={`next-${nextIndex}`} image={principles[nextIndex].image} role="next" transitionProgress={localProgress} final={false} reduceMotion={Boolean(reduceMotion)} />}
          <div className="about-mobile-principle-shade" />
        </div>
        <div className="about-mobile-principle-copy">
          <AnimatePresence initial={false} mode="sync">
            <motion.h3 key={active.title} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? .01 : .12 }}><MobilePrincipleWords text={active.title} /></motion.h3>
          </AnimatePresence>
          <AnimatePresence initial={false} mode="sync">
            <motion.p key={active.description} initial={reduceMotion ? false : { opacity: 0, y: 6, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={reduceMotion ? undefined : { opacity: 0, y: -4, filter: "blur(3px)" }} transition={{ duration: reduceMotion ? .01 : .25, ease: motionEase.editorial }}>{active.description}</motion.p>
          </AnimatePresence>
        </div>
        <div className="about-mobile-principle-progress" aria-label={`Principle ${activeIndex + 1} of ${principles.length}`} data-progress={progress.toFixed(3)}>
          {principles.map((principle, index) => <span className="about-mobile-progress-track" key={principle.title}><span className="about-mobile-progress-fill" style={{ transform: `scaleX(${progressFills[index]})` }} /></span>)}
        </div>
      </div>
    </div>
  );
}

function MobilePrincipleVisual({ image, role, transitionProgress, final, reduceMotion }: { image: string; role: "current" | "next"; transitionProgress: number; final: boolean; reduceMotion: boolean }) {
  const incoming = role === "next";
  const progress = final ? 0 : transitionProgress;
  const y = reduceMotion ? 0 : incoming ? (1 - progress) * 42 : progress * -28;
  const scale = reduceMotion ? 1 : incoming ? 1.055 - progress * .055 : 1 - progress * .025;
  const clipPath = reduceMotion || !incoming ? "inset(0% 0 0% 0)" : `inset(${(1 - progress) * 100}% 0 0% 0)`;
  return <div className={`about-mobile-principle-layer is-${role}`} style={{ zIndex: incoming ? 2 : 1, opacity: incoming ? 1 : 1 - progress * .16, transform: `translate3d(0, ${y}px, 0) scale(${scale})`, clipPath }}><Image unoptimized src={image} alt="" fill sizes="100vw" priority={image === principles[0].image} /></div>;
}

function HowIThink() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [scrollActiveIndex, setScrollActiveIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const displayIndex = hoverIndex ?? focusIndex ?? scrollActiveIndex;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const sectionRect = section.getBoundingClientRect();
      if (sectionRect.top > innerHeight * .78 || sectionRect.bottom < innerHeight * .24) {
        setScrollActiveIndex(-1);
        return;
      }
      const activationY = innerHeight * .48;
      let next = 0;
      let distance = Number.POSITIVE_INFINITY;
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const currentDistance = Math.abs(rect.top + rect.height / 2 - activationY);
        if (currentDistance < distance) { distance = currentDistance; next = index; }
      });
      setScrollActiveIndex((current) => current === next ? current : next);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <section ref={sectionRef} className="about-thinking" aria-labelledby="about-thinking-title">
      <SectionLabel>How I Think</SectionLabel>
      <div className="about-principles about-principles-desktop home-shell">
        {principles.map((principle, index) => {
          const active = displayIndex === index;
          return (
            <motion.button ref={(node) => { rowRefs.current[index] = node; }} type="button" className="about-principle-row" data-active={active} aria-pressed={active} key={principle.title} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)} onFocus={() => setFocusIndex(index)} onBlur={() => setFocusIndex(null)}>
              <motion.span className="about-principle-bg" animate={{ opacity: active ? 1 : 0 }} transition={{ duration: .3, ease: motionEase.snappy }} style={{ background: principle.color }} />
              <AnimatePresence mode="popLayout">{active && <PrincipleImage key={`${principle.title}-image`} src={principle.image} angle={principle.angle} />}</AnimatePresence>
              <span className="about-principle-title">{principle.title}</span>
              <AnimatePresence mode="wait">{active && <motion.span className="about-principle-description" key={`${principle.title}-description`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .34, delay: .1, ease: motionEase.editorial }}>{principle.description}</motion.span>}</AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      <MobilePrinciples />
    </section>
  );
}

function AboutHero() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"assembling" | "landing" | "complete">("assembling");
  const titleWords = ["Hi,", "I’m", "Mir", "Rezwan", "Navid"];
  const wordTiming = [
    { delay: .08, duration: .64, y: 82, blur: 20, scale: .92 },
    { delay: .46, duration: .36, y: 62, blur: 16, scale: .93 },
    { delay: .68, duration: .36, y: 60, blur: 16, scale: .93 },
    { delay: .95, duration: .4, y: 66, blur: 17, scale: .92 },
    { delay: 1.18, duration: .4, y: 62, blur: 16, scale: .93 },
  ];

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${(parseFloat(getComputedStyle(body).paddingRight) || 0) + scrollbarWidth}px`;

    const landingTimer = window.setTimeout(() => setPhase("landing"), reduceMotion ? 360 : 2050);
    const completeTimer = window.setTimeout(() => {
      setPhase("complete");
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPadding;
    }, reduceMotion ? 760 : 2900);

    return () => {
      window.clearTimeout(landingTimer);
      window.clearTimeout(completeTimer);
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPadding;
    };
  }, [reduceMotion]);

  return <section className="about-hero" data-intro-phase={phase} aria-labelledby="about-title"><div className="about-intro-curtain" aria-hidden="true" /><div className="about-shell about-hero-stage"><motion.h1 id="about-title" className="about-hero-title" data-phase={phase} layout transition={{ layout: { duration: reduceMotion ? .35 : .82, ease: motionEase.editorial } }}><span className="about-title-line">{titleWords.slice(0, 3).map((word, index) => <motion.span className="about-title-word" key={word} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: wordTiming[index].y, filter: `blur(${wordTiming[index].blur}px)`, scale: wordTiming[index].scale, letterSpacing: ".015em" }} animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, letterSpacing: "-.02em" }} transition={reduceMotion ? { duration: .2, delay: index * .05 } : { duration: wordTiming[index].duration, delay: wordTiming[index].delay, ease: motionEase.editorial }} style={{ transformOrigin: "center bottom" }}>{word}{index < 2 ? "\u00a0" : ""}</motion.span>)}</span><span className="about-title-line">{titleWords.slice(3).map((word, lineIndex) => { const index = lineIndex + 3; return <motion.span className="about-title-word" key={word} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: wordTiming[index].y, filter: `blur(${wordTiming[index].blur}px)`, scale: wordTiming[index].scale, letterSpacing: ".015em" }} animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, letterSpacing: "-.02em" }} transition={reduceMotion ? { duration: .2, delay: index * .05 } : { duration: wordTiming[index].duration, delay: wordTiming[index].delay, ease: motionEase.editorial }} style={{ transformOrigin: "center bottom" }}>{word}{lineIndex === 0 ? "\u00a0" : ""}</motion.span>; })}</span></motion.h1>{(phase === "landing" || phase === "complete") && <motion.div className="about-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .35, delay: reduceMotion ? 0 : .28, ease: motionEase.editorial }}><h2><AnimatedLines text="I design and build products where strategy, systems, and human behavior meet." delay={reduceMotion ? 0 : .08} /></h2><div className="about-copy">{introParagraphs.map((paragraph, index) => <p key={paragraph}><AnimatedLines text={paragraph} delay={(reduceMotion ? 0 : .16) + index * .08} /></p>)}</div></motion.div>}</div></section>;
}

function ChildhoodStory() {
  return <section className="about-childhood" aria-labelledby="about-childhood-title"><div className="about-shell about-childhood-stage"><h2 id="about-childhood-title"><AnimatedLines text="My first interface was built in Microsoft PowerPoint." /></h2><ParallaxMedia className="about-memory-parallax" distance={22} xDistance={-10} rotateDistance={1.1} velocityResponse><MemoryPhoto /></ParallaxMedia><ParallaxMedia className="about-child-parallax" distance={-18} xDistance={9} rotateDistance={-1} velocityResponse><FlipPhoto /></ParallaxMedia><div className="about-childhood-copy about-copy">{childhoodParagraphs.map((paragraph, index) => <p key={paragraph}><AnimatedLines text={paragraph} delay={index * .06} /></p>)}</div></div></section>;
}

function OutsideWork() {
  const outsideParagraphs = [
    "I travel, photograph, make music and spend an unreasonable amount of time noticing small details.",
    "Those things probably influence my work more than any design framework does. They force me to observe people, environments, rhythm, culture and the things we normally stop paying attention to.",
    "And that, more than anything, is what I try to bring into the products I build.",
  ];
  return <section className="about-outside" aria-labelledby="about-outside-title"><SectionLabel>Outside Work</SectionLabel><div className="about-outside-copy about-copy">{outsideParagraphs.map((paragraph, index) => <p key={paragraph}><AnimatedLines text={paragraph} delay={index * .07} /></p>)}</div><motion.ul className="about-career" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }}>{careerHistory.map((role, index) => <motion.li key={role} variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0, transition: { duration: .5, delay: index * .07, ease: motionEase.editorial } } }}><span>{role}</span></motion.li>)}</motion.ul></section>;
}

function AboutLinks() {
  return <EditorialLinks className="about-links" ariaLabel="About page links" items={[{ href: "/work", label: "my work" }]} />;
}

export function AboutPageContent() {
  return <div className="home-page about-page"><main><AboutHero /><ChildhoodStory /><HowIThink /><OutsideWork /><AboutLinks /><ContactCTA variant="portfolio" /></main><SiteFooter /></div>;
}
