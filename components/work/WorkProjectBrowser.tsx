"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { TiltLink } from "@/components/motion/TiltLink";
import { motionEase } from "@/lib/motion";
import { workProjects, type WorkProject } from "@/lib/workProjects";

function DynamicValue({ value, className = "" }: { value: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <span className={`work-browser-value ${className}`.trim()}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={value}
          initial={reduceMotion ? false : { y: 7, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: -5, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : .19, ease: motionEase.snappy }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ProjectMeta({ project }: { project: WorkProject }) {
  return (
    <header className="work-browser-meta">
      <h1>Work</h1>
      <DynamicValue className="work-browser-title" value={project.title} />
      <DynamicValue className="work-browser-description" value={project.shortDescription} />
      <DynamicValue className="work-browser-role" value={project.role} />
      <DynamicValue className="work-browser-year" value={project.year} />
    </header>
  );
}

function ProjectRail({ activeIndex, displayIndex, setHoverIndex, setFocusIndex }: {
  activeIndex: number;
  displayIndex: number;
  setHoverIndex: (index: number | null) => void;
  setFocusIndex: (index: number | null) => void;
}) {
  return (
    <nav className="work-browser-rail" aria-label="Work projects">
      {workProjects.map((project, index) => (
        <Link
          className="work-browser-pill"
          data-active={index === activeIndex}
          data-preview={index === displayIndex && index !== activeIndex}
          href={project.href}
          key={project.slug}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          onFocus={() => setFocusIndex(index)}
          onBlur={() => setFocusIndex(null)}
          aria-current={index === activeIndex ? "step" : undefined}
        >
          <span>{project.pillLabel ?? project.title}</span>
          {project.locked && <img src="/home-design/work-lock.svg" alt="Full study restricted" width="10" height="10" />}
        </Link>
      ))}
    </nav>
  );
}

function ProjectCover({ project }: { project: WorkProject }) {
  const reduceMotion = useReducedMotion();
  return (
    <TiltLink className="work-browser-cover" href={project.href} projectId={project.id} ariaLabel={`${project.locked ? "Preview" : "View"} ${project.title}`} cursorLabel={project.locked ? "Preview" : "View"} maxRotate={3.4} maxTranslate={3}>
      <span className="work-browser-cover-mask">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            className="work-browser-cover-frame"
            key={project.slug}
            initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0 round 5px)", scale: 1.015, y: 7 }}
            animate={{ clipPath: "inset(0% 0 0 0 round 5px)", scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { clipPath: "inset(0 0 100% 0 round 5px)", scale: .985, y: -4 }}
            transition={{ duration: reduceMotion ? 0 : .34, ease: motionEase.editorial }}
          >
            <img src={project.resolvedWorkCover} alt={project.thumbnailAlt} draggable={false} />
            {project.locked && <span className="work-browser-lock">full study locked <img src="/home-design/work-lock.svg" alt="" width="10" height="10" /></span>}
          </motion.span>
        </AnimatePresence>
      </span>
    </TiltLink>
  );
}

function MobileProjects() {
  return (
    <section className="work-browser-mobile" aria-labelledby="mobile-work-title">
      <h1 id="mobile-work-title">Work</h1>
      <div className="work-browser-mobile-list">
        {workProjects.map((project) => (
          <article key={project.slug}>
            <div className="work-browser-mobile-meta"><h2>{project.title}</h2><span>{project.year}</span><p>{project.shortDescription}</p></div>
            <TiltLink className="work-browser-mobile-cover" href={project.href} projectId={project.id} ariaLabel={`${project.locked ? "Preview" : "View"} ${project.title}`} cursorLabel={project.locked ? "Preview" : "View"} maxRotate={2.4} maxTranslate={2}>
              <img src={project.resolvedWorkCover} alt={project.thumbnailAlt} loading="lazy" />
            </TiltLink>
          </article>
        ))}
      </div>
    </section>
  );
}

export function WorkProjectBrowser() {
  const runwayRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const displayIndex = focusIndex ?? hoverIndex ?? activeIndex;
  const displayedProject = workProjects[displayIndex];

  useEffect(() => {
    const nearby = [displayIndex - 1, displayIndex, displayIndex + 1]
      .map((index) => workProjects[index]?.resolvedWorkCover)
      .filter((src): src is string => Boolean(src));
    nearby.forEach((src) => { const image = new window.Image(); image.src = src; });
  }, [displayIndex]);

  useEffect(() => {
    const preload = () => workProjects.forEach(({ resolvedWorkCover }) => { const image = new window.Image(); image.src = resolvedWorkCover; });
    const idle = window.requestIdleCallback?.(preload, { timeout: 1200 });
    if (!idle) preload();
    return () => { if (idle) window.cancelIdleCallback?.(idle); };
  }, []);

  useEffect(() => {
    const node = runwayRef.current;
    if (!node) return;
    let frame = 0;
    let settleTimer = 0;

    const metrics = () => {
      const start = node.offsetTop;
      const range = Math.max(1, node.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / range));
      return { start, range, progress };
    };
    const update = () => {
      frame = 0;
      if (window.matchMedia("(max-width: 767px)").matches) return;
      const { progress } = metrics();
      const rawIndex = progress * (workProjects.length - 1);
      const next = Math.round(rawIndex);
      if (next !== activeRef.current && Math.abs(rawIndex - activeRef.current) > .54) {
        activeRef.current = next;
        setActiveIndex(next);
      }
    };
    const settle = () => {
      if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;
      const { start, range, progress } = metrics();
      if (progress <= 0 || progress >= 1) return;
      const nearest = Math.round(progress * (workProjects.length - 1)) / (workProjects.length - 1);
      const target = start + nearest * range;
      const distance = Math.abs(target - window.scrollY);
      if (distance > 3 && distance < 72) window.scrollTo({ top: target, behavior: "smooth" });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 180);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(settleTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <section ref={runwayRef} className="work-browser-runway" style={{ "--work-runway-height": `${100 + (workProjects.length - 1) * 65}svh` } as CSSProperties} aria-label="Selected work browser">
        <div className="work-browser-sticky">
          <div className="work-browser-stage">
            <ProjectMeta project={displayedProject} />
            <div className="work-browser-presentation">
              <ProjectRail activeIndex={activeIndex} displayIndex={displayIndex} setHoverIndex={setHoverIndex} setFocusIndex={setFocusIndex} />
              <div className="work-browser-canvas"><ProjectCover project={displayedProject} /></div>
            </div>
          </div>
        </div>
        <div className="work-browser-steps" aria-hidden="true">{workProjects.map((project) => <span key={project.slug} />)}</div>
      </section>
      <MobileProjects />
    </>
  );
}
