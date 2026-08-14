"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type PointerEvent } from "react";
import { EditorialArrow } from "@/components/home/ContactCTA";
import { VideoFeature } from "@/components/home/VideoFeature";
import { EditorialLinks } from "@/components/home/EditorialLinks";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { ProjectLink } from "@/components/motion/ProjectTransition";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { motionEase, physicalSpring } from "@/lib/motion";
import { featuredProjects, type ResolvedProject } from "@/lib/projectRegistry";
import { useHomeIntroCard } from "@/components/home/HomeIntro";

type GestureState = {
  active: boolean;
  dragging: boolean;
  rejected: boolean;
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
};

function useTactileMotion(maxX: number, maxY: number, maxTilt: number) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const smoothX = useSpring(x, physicalSpring);
  const smoothY = useSpring(y, physicalSpring);
  const smoothRotateX = useSpring(rotateX, physicalSpring);
  const smoothRotateY = useSpring(rotateY, physicalSpring);
  const smoothScale = useSpring(scale, { stiffness: 390, damping: 31, mass: .58 });
  const gesture = useRef<GestureState>({ active: false, dragging: false, rejected: false, pointerId: -1, startX: 0, startY: 0, lastX: 0, lastY: 0 });

  const reset = () => {
    gesture.current.active = false;
    gesture.current.dragging = false;
    gesture.current.rejected = false;
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width - .5) * 2;
    const normalizedY = ((event.clientY - rect.top) / rect.height - .5) * 2;
    gesture.current = { active: true, dragging: false, rejected: false, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, lastY: event.clientY };
    rotateX.set(-normalizedY * maxTilt);
    rotateY.set(normalizedX * maxTilt);
    scale.set(.986);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const current = gesture.current;
    if (!current.active || current.rejected || current.pointerId !== event.pointerId) return;
    const dx = event.clientX - current.startX;
    const dy = event.clientY - current.startY;
    const distance = Math.hypot(dx, dy);
    if (!current.dragging && distance > 7) {
      if (Math.abs(dy) > Math.abs(dx) * 1.15) {
        current.rejected = true;
        reset();
        return;
      }
      current.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (current.dragging) {
      x.set(Math.max(-maxX, Math.min(maxX, dx * .34)));
      y.set(Math.max(-maxY, Math.min(maxY, dy * .24)));
      current.lastX = event.clientX;
      current.lastY = event.clientY;
    }
  };

  const onPointerEnd = (event: PointerEvent<HTMLElement>) => {
    const current = gesture.current;
    if (!current.active || current.pointerId !== event.pointerId) return;
    if (current.dragging) {
      x.set(Math.max(-maxX, Math.min(maxX, x.get() * 1.12)));
      y.set(Math.max(-maxY, Math.min(maxY, y.get() * 1.08)));
      requestAnimationFrame(reset);
    } else {
      reset();
    }
  };

  return {
    reduceMotion,
    x: smoothX,
    y: smoothY,
    rotateX: smoothRotateX,
    rotateY: smoothRotateY,
    scale: smoothScale,
    handlers: { onPointerDown, onPointerMove, onPointerUp: onPointerEnd, onPointerCancel: reset, onPointerLeave: (event: PointerEvent<HTMLElement>) => { if (event.pointerType === "mouse") reset(); } },
  };
}

function MobileIdentityCard() {
  const tactile = useTactileMotion(13, 8, 2.8);
  const registerIntroCard = useHomeIntroCard();
  return (
    <motion.div
      ref={registerIntroCard}
      className="mobile-identity-entry home-intro-card-entry"
      initial={false}
    >
      <motion.article
        className="mobile-identity-card"
        aria-label="Mir Rezwan Navid profile"
        style={{ x: tactile.x, y: tactile.y, rotateX: tactile.rotateX, rotateY: tactile.rotateY, scale: tactile.scale }}
        {...tactile.handlers}
      >
        <span className="mobile-identity-index">04/08</span>
        <p className="mobile-identity-role"><strong>design engineer /</strong><br /><em>product thinker</em></p>
        <div className="mobile-identity-photo"><Image unoptimized src="/home-design/profile-card-portrait.png?v=1" alt="Portrait of Mir Rezwan Navid" fill priority sizes="172px" /></div>
        <p className="mobile-identity-name"><span>Mir</span><br />Rezwan<br /><em>Navid</em></p>
        <p className="mobile-identity-description">Designing products that solve complex problems through research, systems thinking, and thoughtful execution</p>
      </motion.article>
    </motion.div>
  );
}

function MobileHero() {
  return (
    <section className="mobile-home-hero" aria-labelledby="mobile-home-title">
      <h1 id="mobile-home-title">
        <span>Product Brain,</span>
        <em>Design Heart</em>
      </h1>
      <MobileIdentityCard />
    </section>
  );
}

const collage = [
  { src: "/home-design/human-flowers.png?v=2", alt: "Flowers and ground textures", className: "is-flowers", y: 14, x: -4, rotate: 1.1, delay: 0 },
  { src: "/home-design/human-sky.png?v=2", alt: "Distant tree beneath a warm sky", className: "is-sky", y: -17, x: 5, rotate: -.8, delay: .08 },
  { src: "/home-design/human-clouds.png?v=2", alt: "Soft clouds over a green landscape", className: "is-clouds", y: 21, x: 2, rotate: .45, delay: .15 },
  { src: "/home-design/human-tree.png?v=2", alt: "A tree canopy viewed from below", className: "is-tree", y: -12, x: -3, rotate: -.65, delay: .22 },
];

function FloatingCollageCard({ item }: { item: (typeof collage)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const tactile = useTactileMotion(17, 12, 1.6);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxX = useTransform(scrollYProgress, [0, 1], [-item.x, item.x]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [item.y, -item.y]);
  const parallaxRotate = useTransform(scrollYProgress, [0, 1], [-item.rotate, item.rotate]);
  const composedX = useTransform(() => (tactile.reduceMotion ? 0 : parallaxX.get()) + tactile.x.get());
  const composedY = useTransform(() => (tactile.reduceMotion ? 0 : parallaxY.get()) + tactile.y.get());
  const composedRotate = useTransform(() => (tactile.reduceMotion ? 0 : parallaxRotate.get()));

  return (
    <motion.div
      ref={ref}
      className={`mobile-human-card ${item.className}`}
      style={{ x: composedX, y: composedY, rotate: composedRotate, rotateX: tactile.rotateX, rotateY: tactile.rotateY, scale: tactile.scale }}
      initial={tactile.reduceMotion ? false : { opacity: 0, scale: .955, clipPath: "inset(10% 0 16% 0 round 11px)" }}
      whileInView={tactile.reduceMotion ? undefined : { opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0 round 11px)" }}
      viewport={{ once: true, amount: .22 }}
      transition={{ duration: .72, delay: item.delay, ease: motionEase.editorial }}
      {...tactile.handlers}
    ><Image unoptimized src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 298px, 1px" /></motion.div>
  );
}

function CurvedCopy({ className, src, alt, width, height, distance, rotate }: { className: string; src: string; alt: string; width: number; height: number; distance: number; rotate: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);
  return (
    <motion.div
      ref={ref}
      className={`mobile-human-copy ${className}`}
      style={{ y: reduceMotion ? 0 : y, rotate: reduceMotion ? 0 : r }}
    >
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </motion.div>
  );
}

function MobileHumanSection() {
  return (
    <section className="mobile-human" aria-label="Product is deeply about human understanding">
      <div className="mobile-human-canvas">
        <CurvedCopy className="is-first" src="/home-design/Product is deeply about.png" alt="Product is deeply about" width={1293} height={304} distance={9} rotate={.5} />
        {collage.map((item) => <FloatingCollageCard key={item.className} item={item} />)}
        <CurvedCopy className="is-second" src="/home-design/human undrestanding.png" alt="human understanding" width={1220} height={270} distance={-7} rotate={-.4} />
      </div>
    </section>
  );
}

function MobileProjectCard({ project, index }: { project: ResolvedProject; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const frameInset = useTransform(scrollYProgress, [0, .5, 1], index === 1
    ? ["inset(8% .6% 6% round 9px)", "inset(0% 0% 0% round 9px)", "inset(5% .4% 4% round 9px)"]
    : index === 2
      ? ["inset(6% .8% 9% round 9px)", "inset(0% 0% 0% round 9px)", "inset(4% .4% 6% round 9px)"]
      : ["inset(7% .8% 8% round 9px)", "inset(0% 0% 0% round 9px)", "inset(4% .4% 5% round 9px)"]);
  const frameScale = useTransform(scrollYProgress, [0, .5, 1], index === 0 ? [.96, 1, .98] : index === 1 ? [.968, 1, .984] : [.964, 1, .982]);
  const imageScale = useTransform(scrollYProgress, [0, .5, 1], index === 1 ? [1.14, 1.035, 1.09] : index === 2 ? [1.13, 1.025, 1.08] : [1.15, 1.04, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, .5, 1], index === 2 ? [36, 0, -46] : index === 1 ? [50, -2, -38] : [42, 0, -34]);
  return (
    <motion.article ref={ref} className="mobile-featured-project" initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .72, delay: index * .04, ease: motionEase.editorial }}>
      <motion.div className="mobile-featured-motion-frame" style={{ clipPath: reduceMotion ? "inset(0% round 9px)" : frameInset, scale: reduceMotion ? 1 : frameScale }}>
        <ProjectLink className={`mobile-featured-link is-${project.id}`} href={project.href} projectId={project.id} aria-label={`View ${project.title}, ${project.year}`}>
          <motion.div className="mobile-featured-image-depth" style={{ scale: reduceMotion ? 1 : imageScale, y: reduceMotion ? 0 : imageY }}>
            <ProjectMedia project={project} context="homepage" priority={index === 0} />
          </motion.div>
        </ProjectLink>
      </motion.div>
    </motion.article>
  );
}

function MobileFeaturedWork() {
  return (
    <section className="mobile-featured" aria-labelledby="mobile-featured-title">
      <h2 id="mobile-featured-title"><AnimatedWords text="featured work" stagger={.11} /></h2>
      <div className="mobile-featured-list">{featuredProjects.map((project, index) => <MobileProjectCard key={project.id} project={project} index={index} />)}</div>
      <Link className="mobile-see-work" href="/work"><span>see all work</span><EditorialArrow /></Link>
    </section>
  );
}

const awards = ["Creative Mapper of the Year", "Winner of EWU Analytics", "Gold in UniV", "2nd in BrandAid"];

function AwardsMarquee() {
  return <div className="mobile-awards" aria-label="Awards and recognition"><div className="mobile-awards-track">{[...awards, ...awards].map((award, index) => <span className="mobile-award" key={`${award}-${index}`} aria-hidden={index >= awards.length}><img src="/home-design/experience-award.svg" alt="" width="20" height="20" loading="lazy" />{award}</span>)}</div></div>;
}

function MobileExperience() {
  const frame = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-9, 9]);
  const imageScale = useTransform(scrollYProgress, [0, .5, 1], [1.025, 1, 1.018]);
  return (
    <section ref={frame} className="mobile-experience" aria-labelledby="mobile-experience-title">
      <div className="mobile-experience-frame">
        <motion.div className="mobile-experience-depth" initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(18% 0 24% 0 round 4px)" }} whileInView={reduceMotion ? undefined : { opacity: 1, clipPath: "inset(0% 0 0% 0 round 4px)" }} viewport={{ once: true, amount: .1 }} transition={{ duration: .9, delay: .42, ease: motionEase.editorial }} style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : imageScale }}><Image unoptimized src="/home-design/Speaker Contianer.png" alt="Mir Rezwan Navid speaking at a technology event" fill sizes="(max-width: 767px) 100vw, 1px" /></motion.div>
        <h2 id="mobile-experience-title"><AnimatedWords text="7+ years building" stagger={.075} /><AnimatedWords text="products across" delay={.11} stagger={.075} /><AnimatedWords text="industries" delay={.22} /></h2>
      </div>
      <AwardsMarquee />
    </section>
  );
}

const thinkingLines = [
  ["Product", "thinking"],
  ["is", "the", "culture", "of"],
  ["21st-century"],
  ["technology."],
];

function ProductThinkingTitle() {
  const reduceMotion = useReducedMotion();
  let wordIndex = 0;
  return (
    <motion.h2 className="mobile-thinking-title" initial={reduceMotion ? false : "hidden"} whileInView={reduceMotion ? undefined : "visible"} viewport={{ once: true, amount: .3 }} aria-label="Product thinking is the culture of 21st-century technology.">
      {thinkingLines.map((line) => <span className="mobile-thinking-line" aria-hidden="true" key={line.join("-")}>{line.map((word) => {
        const index = wordIndex++;
        const culture = word === "culture";
        return <span className="mobile-thinking-word-mask" key={word}><motion.span className={culture ? "is-culture" : ""} variants={{ hidden: { y: "108%", opacity: 0 }, visible: { y: 0, opacity: 1, color: culture ? "#e7e7e7" : undefined, transition: { duration: .76, delay: index * .075 + (culture ? .08 : 0), ease: motionEase.editorial } } }}>{word}</motion.span>{culture && <motion.i variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: .52, delay: index * .075 + .42, ease: motionEase.editorial } } }} />}</span>;
      })}</span>)}
    </motion.h2>
  );
}

function MobilePhilosophy() {
  return (
    <section className="mobile-philosophy" aria-labelledby="mobile-philosophy-title">
      <div id="mobile-philosophy-title"><ProductThinkingTitle /></div>
      <VideoFeature />
      <EditorialLinks ariaLabel="More about Mir Rezwan Navid" items={[{ href: "/about", label: "about me" }, { href: "/opinion", label: "opinions" }]} />
    </section>
  );
}

function MobileContact() {
  return (
    <section className="mobile-contact" aria-labelledby="mobile-contact-title">
      <h2 id="mobile-contact-title"><AnimatedWords text="let’s build" /><AnimatedWords text="something worth" delay={.1} /><AnimatedWords text="building" delay={.2} /></h2>
      <motion.a href="mailto:hello@rezwannavid.me" whileTap={{ scale: .97, x: 3 }}><span>email me</span><EditorialArrow /></motion.a>
    </section>
  );
}

export function MobileHomepage() {
  return <div className="mobile-homepage"><MobileHero /><MobileHumanSection /><MobileFeaturedWork /><MobileExperience /><MobilePhilosophy /><MobileContact /></div>;
}
