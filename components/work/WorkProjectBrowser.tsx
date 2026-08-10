"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const savedScrollRef = useRef(0);
  const bodyStylesRef = useRef<Partial<CSSStyleDeclaration> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [compact, setCompact] = useState(false);
  const [allWorkOpen, setAllWorkOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const activeProject = workProjects[activeIndex] ?? workProjects[0];
  const stickyHeading = allWorkOpen ? "All Work" : activeProject.title;

  const releaseScroll = useCallback((restorePosition = true) => {
    const saved = bodyStylesRef.current;
    if (!saved) return;
    const body = document.body;
    const html = document.documentElement;
    body.style.position = saved.position ?? "";
    body.style.top = saved.top ?? "";
    body.style.left = saved.left ?? "";
    body.style.right = saved.right ?? "";
    body.style.width = saved.width ?? "";
    body.style.overflow = saved.overflow ?? "";
    html.style.overflow = saved.overflowY ?? "";
    html.style.overscrollBehavior = saved.overscrollBehavior ?? "";
    bodyStylesRef.current = null;
    if (restorePosition) {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, savedScrollRef.current);
      requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior; });
    }
  }, []);

  const openAllWork = useCallback(() => {
    savedScrollRef.current = window.scrollY;
    const body = document.body;
    bodyStylesRef.current = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      overflowY: document.documentElement.style.overflow,
      overscrollBehavior: document.documentElement.style.overscrollBehavior,
    };
    body.style.position = "fixed";
    body.style.top = `-${savedScrollRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    setAllWorkOpen(true);
  }, []);

  const toggleAllWork = useCallback(() => {
    if (allWorkOpen) {
      setAllWorkOpen(false);
      releaseScroll(true);
    } else {
      openAllWork();
    }
  }, [allWorkOpen, openAllWork, releaseScroll]);

  useEffect(() => () => releaseScroll(false), [releaseScroll]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let pollTimer = 0;
    let lastScroll = Number.NaN;
    let activationLine = 174;
    let firstProjectTop = 0;
    let projectStep = 1;
    let rootBottom = 0;
    let projectCount = 0;
    let delayedMeasure = 0;

    const measure = () => {
      const isMobile = window.matchMedia("(max-width: 767px), (max-height: 500px) and (orientation: landscape)").matches;
      if (!isMobile) return;
      const nav = document.querySelector<HTMLElement>(".mobile-nav-closed");
      const safeTop = Math.max(0, (nav?.getBoundingClientRect().top ?? 10) - 10);
      activationLine = safeTop + 174;
      const projects = Array.from(root.querySelectorAll<HTMLElement>("[data-mobile-project-index]"));
      if (!projects.length) return;
      const scroll = window.scrollY;
      const firstRect = projects[0].getBoundingClientRect();
      const secondRect = projects[1]?.getBoundingClientRect();
      firstProjectTop = firstRect.top + scroll;
      projectStep = secondRect ? secondRect.top - firstRect.top : firstRect.height + 8;
      rootBottom = root.getBoundingClientRect().bottom + scroll;
      projectCount = projects.length;
      lastScroll = Number.NaN;
    };

    const update = () => {
      const scroll = window.scrollY;
      if (scroll !== lastScroll && projectCount) {
        lastScroll = scroll;
        const crossedDistance = scroll + activationLine - firstProjectTop;
        const nextCompact = crossedDistance >= 0;
        const nextIndex = Math.max(0, Math.min(projectCount - 1, Math.floor(Math.max(0, crossedDistance) / projectStep)));
        const nextVisible = scroll + activationLine < rootBottom;
        setCompact((current) => current === nextCompact ? current : nextCompact);
        setActiveIndex((current) => current === nextIndex ? current : nextIndex);
        setHeaderVisible((current) => current === nextVisible ? current : nextVisible);
      }
    };

    const resize = () => {
      measure();
      update();
      if (projectCount && !pollTimer) pollTimer = window.setInterval(update, 50);
    };
    resize();
    delayedMeasure = window.setTimeout(resize, 180);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", resize);
      window.clearInterval(pollTimer);
      window.clearTimeout(delayedMeasure);
    };
  }, []);

  useEffect(() => {
    if (!allWorkOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setAllWorkOpen(false);
      releaseScroll(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [allWorkOpen, releaseScroll]);

  return (
    <section ref={rootRef} className="work-browser-mobile" aria-labelledby="mobile-work-title" data-compact={compact} data-menu-open={allWorkOpen}>
      <div
        className="mobile-work-heading"
        data-visible={headerVisible || allWorkOpen}
      >
        <motion.h1
          className="mobile-work-origin-title"
          id="mobile-work-title"
          initial={false}
          animate={{ y: compact || allWorkOpen ? 0 : 71, scale: compact || allWorkOpen ? .375 : 1, opacity: compact || allWorkOpen ? 0 : 1 }}
          transition={{ duration: reduceMotion ? 0 : .3, ease: motionEase.editorial }}
        >
          Work
        </motion.h1>
        <div className="mobile-work-active-title" data-visible={compact || allWorkOpen} aria-live="polite">
          <AnimatePresence mode="sync" initial={false}>
            <motion.span
              key={stickyHeading}
              data-long={stickyHeading.length > 20}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: reduceMotion ? 0 : .28, ease: motionEase.editorial }}
            >
              {stickyHeading}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="mobile-work-foreground-mask"
        initial={false}
        animate={{ opacity: compact && !allWorkOpen && headerVisible ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : .2, ease: motionEase.editorial }}
      >
        <img src="/work-mobile-header-mask.svg" alt="" />
      </motion.div>

      <motion.button
        className="mobile-work-index-toggle"
        type="button"
        aria-label={allWorkOpen ? "Close all work" : "Open all work"}
        aria-expanded={allWorkOpen}
        aria-controls="mobile-all-work-index"
        data-visible={(compact && headerVisible) || allWorkOpen}
        onClick={toggleAllWork}
        whileTap={reduceMotion ? undefined : { opacity: .72 }}
      >
        <motion.span aria-hidden="true" animate={{ rotate: allWorkOpen ? 180 : 0 }} transition={{ duration: reduceMotion ? 0 : .22, ease: motionEase.editorial }} />
      </motion.button>

      <div className="work-browser-mobile-list" aria-label="Selected work">
        {workProjects.map((project, index) => (
          <Link
            className="mobile-work-project"
            data-mobile-project-index={index}
            href={project.href}
            key={project.slug}
            aria-label={`${project.locked ? "Preview" : "View"} ${project.title}`}
          >
            <img
              src={project.resolvedFeaturedThumbnail}
              alt={project.thumbnailAlt}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              draggable={false}
            />
          </Link>
        ))}
      </div>

      <AnimatePresence>
        {allWorkOpen && (
          <motion.div
            className="mobile-all-work"
            id="mobile-all-work-index"
            role="dialog"
            aria-modal="true"
            aria-label="All work"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : .2, ease: motionEase.editorial }}
          >
            <nav className="mobile-all-work-list" aria-label="All projects">
              {workProjects.map((project, index) => (
                <motion.div
                  className="mobile-all-work-row"
                  key={project.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : .2, delay: reduceMotion ? 0 : index * .025, ease: motionEase.editorial }}
                >
                  <Link href={project.href} onClick={() => releaseScroll(true)}>{project.pillLabel ?? project.title}</Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
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
