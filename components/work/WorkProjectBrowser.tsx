"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import { TiltLink } from "@/components/motion/TiltLink";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { motionEase } from "@/lib/motion";
import { workProjects, type WorkProject } from "@/lib/workProjects";

const LOOP_COPIES = 3;
const DESKTOP_STEP_SVH = 65;
const MOBILE_CARD_GAP = 8;
const immediateScrollEvent = "portfolio:immediate-scroll";
const mobileWorkQuery = "(max-width: 767px), (max-height: 500px) and (orientation: landscape)";

const modulo = (value: number, length: number) => ((value % length) + length) % length;

function nearestOccurrence(logicalIndex: number, anchor: number, length: number) {
  return logicalIndex + Math.round((anchor - logicalIndex) / length) * length;
}

function scrollImmediately(top: number) {
  const event = new CustomEvent(immediateScrollEvent, { cancelable: true, detail: { top } });
  if (window.dispatchEvent(event)) {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, top);
    requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior; });
  }
}

function useMobileWorkMode() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useLayoutEffect(() => {
    const query = window.matchMedia(mobileWorkQuery);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isMobile;
}

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
            <ProjectMedia project={project} context="work" priority />
            {project.locked && <span className="work-browser-lock">full study locked <img src="/home-design/work-lock.svg" alt="" width="10" height="10" /></span>}
          </motion.span>
        </AnimatePresence>
      </span>
    </TiltLink>
  );
}

function MobileProjects() {
  const reduceMotion = useReducedMotion();
  const isMobile = useMobileWorkMode();
  const rootRef = useRef<HTMLElement>(null);
  const savedScrollRef = useRef(0);
  const bodyStylesRef = useRef<Partial<CSSStyleDeclaration> | null>(null);
  const initializedRef = useRef(false);
  const enteredLoopRef = useRef(false);
  const metricsRef = useRef({ rootStart: 0, trackOrigin: 0, step: 531, cycle: 531 * workProjects.length, activationLine: 174, virtual: workProjects.length });
  const [activeIndex, setActiveIndex] = useState(0);
  const [compact, setCompact] = useState(false);
  const [allWorkOpen, setAllWorkOpen] = useState(false);
  const [loopLayout, setLoopLayout] = useState({ leading: 242, step: 531, anchor: workProjects.length });
  const activeProject = workProjects[activeIndex] ?? workProjects[0];
  const stickyHeading = allWorkOpen ? "All Work" : activeProject.title;
  const loopPositions = useMemo(() => workProjects.map((_, index) => nearestOccurrence(index, loopLayout.anchor, workProjects.length)), [loopLayout.anchor]);

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
      scrollImmediately(savedScrollRef.current);
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

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    let delayedMeasure = 0;

    const measure = (preservePosition: boolean) => {
      const isMobile = window.matchMedia("(max-width: 767px), (max-height: 500px) and (orientation: landscape)").matches;
      if (!isMobile) return;
      const list = root.querySelector<HTMLElement>(".work-browser-mobile-list");
      const spacers = root.querySelectorAll<HTMLElement>(".mobile-work-loop-spacer");
      if (!list || spacers.length < 2 || !workProjects.length) return;
      const nav = document.querySelector<HTMLElement>(".mobile-nav-closed");
      const safeTop = Math.max(0, (nav?.getBoundingClientRect().top ?? 10) - 10);
      const scroll = window.scrollY;
      const previous = metricsRef.current;
      const previousVirtual = (scroll + previous.activationLine - previous.trackOrigin) / previous.step;
      const listRect = list.getBoundingClientRect();
      const firstRect = spacers[0].getBoundingClientRect();
      const secondRect = spacers[1].getBoundingClientRect();
      const leading = firstRect.top - listRect.top;
      const step = Math.max(1, secondRect.top - firstRect.top || firstRect.height + MOBILE_CARD_GAP);
      const rootStart = root.getBoundingClientRect().top + scroll;
      const activationLine = safeTop + 174;
      const trackOrigin = rootStart + leading;
      const cycle = step * workProjects.length;
      const initialTop = rootStart + cycle;
      const virtual = initializedRef.current && preservePosition ? previousVirtual : workProjects.length;

      metricsRef.current = { rootStart, trackOrigin, step, cycle, activationLine, virtual };
      setLoopLayout({ leading, step, anchor: Math.round(virtual) });

      if (!initializedRef.current) {
        initializedRef.current = true;
        scrollImmediately(initialTop);
      } else if (preservePosition) {
        scrollImmediately(trackOrigin + virtual * step - activationLine);
      }
    };

    const update = () => {
      frame = 0;
      if (!initializedRef.current || !workProjects.length) return;
      const metrics = metricsRef.current;
      const scroll = window.scrollY;
      let virtual = (scroll + metrics.activationLine - metrics.trackOrigin) / metrics.step;
      let normalizedTop: number | null = null;

      if (virtual < workProjects.length * .35) {
        virtual += workProjects.length;
        normalizedTop = scroll + metrics.cycle;
      } else if (virtual > workProjects.length * 2.65) {
        virtual -= workProjects.length;
        normalizedTop = scroll - metrics.cycle;
      }

      const anchor = Math.round(virtual);
      const logicalIndex = modulo(Math.floor(virtual), workProjects.length);
      if (!enteredLoopRef.current && (virtual >= workProjects.length || virtual <= workProjects.length - .25)) enteredLoopRef.current = true;
      const nextCompact = enteredLoopRef.current;
      metrics.virtual = virtual;

      if (normalizedTop !== null) {
        flushSync(() => {
          setLoopLayout((current) => current.anchor === anchor ? current : { ...current, anchor });
          setActiveIndex((current) => current === logicalIndex ? current : logicalIndex);
          setCompact((current) => current === nextCompact ? current : nextCompact);
        });
        scrollImmediately(normalizedTop);
        return;
      }

      setLoopLayout((current) => current.anchor === anchor ? current : { ...current, anchor });
      setActiveIndex((current) => current === logicalIndex ? current : logicalIndex);
      setCompact((current) => current === nextCompact ? current : nextCompact);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => measure(true);

    measure(false);
    delayedMeasure = window.setTimeout(() => measure(true), 180);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(delayedMeasure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const selectProject = useCallback((index: number) => {
    const metrics = metricsRef.current;
    const occurrence = nearestOccurrence(index, metrics.virtual, workProjects.length);
    const target = metrics.trackOrigin + occurrence * metrics.step - metrics.activationLine + 1;
    enteredLoopRef.current = true;
    setAllWorkOpen(false);
    releaseScroll(false);
    scrollImmediately(target);
  }, [releaseScroll]);

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
      <div className="mobile-work-heading" data-visible="true">
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
        animate={{ opacity: compact && !allWorkOpen ? 1 : 0 }}
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
        data-visible={compact || allWorkOpen}
        onClick={toggleAllWork}
        whileTap={reduceMotion ? undefined : { opacity: .72 }}
      >
        <motion.span aria-hidden="true" animate={{ rotate: allWorkOpen ? 180 : 0 }} transition={{ duration: reduceMotion ? 0 : .22, ease: motionEase.editorial }} />
      </motion.button>

      <div className="work-browser-mobile-list" aria-label="Selected work">
        <div className="mobile-work-loop-spacers" aria-hidden="true">
          {Array.from({ length: workProjects.length * LOOP_COPIES }, (_, index) => <span className="mobile-work-loop-spacer" key={index} />)}
        </div>
        {workProjects.map((project, index) => (
          <Link
            className="mobile-work-project"
            data-mobile-project-index={index}
            data-loop-position={loopPositions[index]}
            href={project.href}
            key={project.slug}
            aria-label={`${project.locked ? "Preview" : "View"} ${project.title}`}
            style={{ top: loopLayout.leading + loopPositions[index] * loopLayout.step }}
          >
            {isMobile ? <ProjectMedia project={project} context="work" priority={index === 0} /> : null}
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
                  <button type="button" onClick={() => selectProject(index)}>{project.pillLabel ?? project.title}</button>
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
  const isMobile = useMobileWorkMode();
  const runwayRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const displayIndex = focusIndex ?? hoverIndex ?? activeIndex;
  const displayedProject = workProjects[displayIndex];

  useLayoutEffect(() => {
    const node = runwayRef.current;
    if (!node || !workProjects.length) return;
    let frame = 0;
    let settleTimer = 0;

    const metrics = () => {
      const start = node.offsetTop;
      const range = Math.max(1, node.offsetHeight - window.innerHeight);
      const step = range / (workProjects.length * LOOP_COPIES);
      const cycle = step * workProjects.length;
      const virtual = (window.scrollY - start) / step;
      return { start, range, step, cycle, virtual };
    };
    const update = () => {
      frame = 0;
      if (window.matchMedia(mobileWorkQuery).matches) return;
      const { cycle, virtual } = metrics();
      let normalizedVirtual = virtual;
      let normalizedTop: number | null = null;
      if (virtual < workProjects.length * .35) {
        normalizedVirtual += workProjects.length;
        normalizedTop = window.scrollY + cycle;
      } else if (virtual > workProjects.length * 2.65) {
        normalizedVirtual -= workProjects.length;
        normalizedTop = window.scrollY - cycle;
      }
      const next = modulo(Math.round(normalizedVirtual), workProjects.length);
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActiveIndex(next);
      }
      if (normalizedTop !== null) scrollImmediately(normalizedTop);
    };
    const settle = () => {
      if (window.matchMedia(`${mobileWorkQuery}, (prefers-reduced-motion: reduce)`).matches) return;
      const { start, step, virtual } = metrics();
      const target = start + Math.round(virtual) * step;
      const distance = Math.abs(target - window.scrollY);
      if (distance > 3 && distance < 72) window.scrollTo({ top: target, behavior: "smooth" });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 180);
    };

    if (!window.matchMedia(mobileWorkQuery).matches) {
      const { start, cycle } = metrics();
      scrollImmediately(start + cycle);
      update();
    }
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
      <section ref={runwayRef} className="work-browser-runway" style={{ "--work-runway-height": `${100 + workProjects.length * LOOP_COPIES * DESKTOP_STEP_SVH}svh` } as CSSProperties} aria-label="Selected work browser">
        <div className="work-browser-sticky">
          <div className="work-browser-stage">
            <ProjectMeta project={displayedProject} />
            <div className="work-browser-presentation">
              <ProjectRail activeIndex={activeIndex} displayIndex={displayIndex} setHoverIndex={setHoverIndex} setFocusIndex={setFocusIndex} />
              <div className="work-browser-canvas">{isMobile === false ? <ProjectCover project={displayedProject} /> : null}</div>
            </div>
          </div>
        </div>
        <div className="work-browser-steps" aria-hidden="true">{Array.from({ length: workProjects.length * LOOP_COPIES }, (_, index) => <span key={index} />)}</div>
      </section>
      <MobileProjects />
    </>
  );
}
