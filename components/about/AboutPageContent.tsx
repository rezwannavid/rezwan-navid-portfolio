"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { ContactCTA, EditorialArrow } from "@/components/home/ContactCTA";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { Magnetic } from "@/components/motion/Magnetic";
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
  "I didn’t know any design tools, so my first actual interfaces were built in Microsoft PowerPoint. Boxes, gradients, buttons, transitions—whatever I could use to get an idea out of my head and onto a screen.",
  "What stayed with me wasn’t the tool. It was the feeling of taking something imaginary, giving it structure, and making another person able to see what I was thinking.",
  "Eventually I learned the proper tools. Then UX. Then product strategy. Then systems, code and AI. But in a strange way, I’m still doing the same thing I was doing in those notebooks: trying to understand how something should work, then finding the clearest way to make it real.",
];

const principles = [
  {
    title: "understand people at a deeper level",
    description: "The best product decisions come from understanding behavior, context, motivation, and what people actually need, not just what they say they want.",
    image: "/about/powerpoint-memory.png",
    color: "linear-gradient(77deg, #29b8ec 4%, #0824f8 100%)",
    angle: -1.5,
  },
  {
    title: "fast decisions beat slow perfection.",
    description: "Momentum creates clarity. Make the smallest meaningful decision, learn from reality, and keep the product moving.",
    image: "/home-design/human-flowers.png?v=2",
    color: "linear-gradient(92deg, #e7553f 0%, #bb2b52 100%)",
    angle: 1.4,
  },
  {
    title: "great products live between people and possibility.",
    description: "Useful products balance what people understand today with what technology can make possible tomorrow.",
    image: "/home-design/human-clouds.png?v=2",
    color: "linear-gradient(87deg, #4a72d8 0%, #8662db 100%)",
    angle: -1.2,
  },
  {
    title: "good business follows great products.",
    description: "Durable growth is usually the consequence of solving a real problem clearly, repeatedly, and with care.",
    image: "/home-design/human-sky.png?v=2",
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
  const smoothX = useSpring(pointerX, { stiffness: 220, damping: 28, mass: .75 });
  const smoothY = useSpring(pointerY, { stiffness: 220, damping: 28, mass: .75 });
  const rotateX = useTransform(smoothY, [-1, 1], [2.2, -2.2]);
  const rotateY = useTransform(smoothX, [-1, 1], [-2.2, 2.2]);
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - .5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - .5) * 2);
  };
  const reset = () => { pointerX.set(0); pointerY.set(0); };

  return (
    <motion.button className="about-child-flip" type="button" data-flipped={flipped} data-cursor="Flip" aria-label="Flip childhood photo" aria-pressed={flipped} initial={reduceMotion ? false : { opacity: 0, x: 34, y: 28, scale: .88, rotate: 3 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .82, delay: .15, ease: motionEase.editorial }} onClick={() => setFlipped((value) => !value)} onPointerMove={move} onPointerLeave={reset}>
      <motion.span className="about-child-tilt" style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}>
        <motion.span className="about-child-flipper" animate={reduceMotion ? { opacity: 1 } : { rotateY: flipped ? 180 : 0 }} transition={{ duration: .58, ease: motionEase.editorial }}>
          <span className="about-child-face about-child-front"><Image unoptimized src="/about/childhood-photo.png" alt="Mir Rezwan Navid as a child" width={473} height={1024} /></span>
          <span className="about-child-face about-child-back"><Image unoptimized src="/home-design/human-clouds.png?v=2" alt="Placeholder artwork on the back of the childhood photo" width={1028} height={640} /></span>
        </motion.span>
      </motion.span>
    </motion.button>
  );
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
      <div className="about-principles home-shell">
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

  return <section className="about-hero" data-intro-phase={phase} aria-labelledby="about-title"><div className="about-intro-curtain" aria-hidden="true" /><div className="about-shell about-hero-stage"><motion.h1 id="about-title" className="about-hero-title" data-phase={phase} layout transition={{ layout: { duration: reduceMotion ? .35 : .82, ease: motionEase.editorial } }}><span className="about-title-line">{titleWords.slice(0, 3).map((word, index) => <motion.span className="about-title-word" key={word} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: wordTiming[index].y, filter: `blur(${wordTiming[index].blur}px)`, scale: wordTiming[index].scale, letterSpacing: ".015em" }} animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, letterSpacing: "-.02em" }} transition={reduceMotion ? { duration: .2, delay: index * .05 } : { duration: wordTiming[index].duration, delay: wordTiming[index].delay, ease: motionEase.editorial }} style={{ transformOrigin: "center bottom" }}>{word}{index < 2 ? "\u00a0" : ""}</motion.span>)}</span><span className="about-title-line">{titleWords.slice(3).map((word, lineIndex) => { const index = lineIndex + 3; return <motion.span className="about-title-word" key={word} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: wordTiming[index].y, filter: `blur(${wordTiming[index].blur}px)`, scale: wordTiming[index].scale, letterSpacing: ".015em" }} animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, letterSpacing: "-.02em" }} transition={reduceMotion ? { duration: .2, delay: index * .05 } : { duration: wordTiming[index].duration, delay: wordTiming[index].delay, ease: motionEase.editorial }} style={{ transformOrigin: "center bottom" }}>{word}{lineIndex === 0 ? "\u00a0" : ""}</motion.span>; })}</span></motion.h1>{phase !== "assembling" && <motion.div className="about-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .35, delay: reduceMotion ? 0 : .28, ease: motionEase.editorial }}><h2><AnimatedLines text="I design and build products where strategy, systems, and human behavior meet." delay={reduceMotion ? 0 : .08} /></h2><div className="about-copy">{introParagraphs.map((paragraph, index) => <p key={paragraph}><AnimatedLines text={paragraph} delay={(reduceMotion ? 0 : .16) + index * .08} /></p>)}</div></motion.div>}</div></section>;
}

function ChildhoodStory() {
  return <section className="about-childhood" aria-labelledby="about-childhood-title"><div className="about-shell about-childhood-stage"><h2 id="about-childhood-title"><AnimatedLines text="My first interface was built in Microsoft PowerPoint." /></h2><ParallaxMedia className="about-memory-parallax" distance={22} xDistance={-10} rotateDistance={1.1} velocityResponse><motion.div className="about-memory-image" initial={{ opacity: .15, x: -28, y: 32, scale: .88, rotate: -3 }} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .84, ease: motionEase.editorial }}><Image unoptimized src="/about/powerpoint-memory.png" alt="Abstract artwork representing an early PowerPoint interface experiment" width={1028} height={984} /></motion.div></ParallaxMedia><ParallaxMedia className="about-child-parallax" distance={-18} xDistance={9} rotateDistance={-1} velocityResponse><FlipPhoto /></ParallaxMedia><div className="about-childhood-copy about-copy">{childhoodParagraphs.map((paragraph, index) => <p key={paragraph}><AnimatedLines text={paragraph} delay={index * .06} /></p>)}</div></div></section>;
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
  return <motion.nav className="editorial-links about-links" aria-label="About page links" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .72, ease: motionEase.editorial }}><Link href="/work" data-cursor="Open"><Magnetic strength={3}><span>my work</span></Magnetic><EditorialArrow magnetic /></Link><a href="https://medium.com/@rezwannavidalvee" target="_blank" rel="noreferrer" data-cursor="Open"><Magnetic strength={3}><span>opinion</span></Magnetic><EditorialArrow magnetic /></a></motion.nav>;
}

export function AboutPageContent() {
  return <div className="home-page about-page"><main><AboutHero /><ChildhoodStory /><HowIThink /><OutsideWork /><AboutLinks /><ContactCTA variant="portfolio" /></main><SiteFooter /></div>;
}
