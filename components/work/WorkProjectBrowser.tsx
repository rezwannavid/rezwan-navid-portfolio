"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ProjectLink } from "@/components/motion/ProjectTransition";
import { TiltLink } from "@/components/motion/TiltLink";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { motionEase } from "@/lib/motion";
import { workProjects, type WorkProject } from "@/lib/workProjects";

const LOOP_COPIES = 3;
const DESKTOP_STEP_SVH = 65;
const immediateScrollEvent = "portfolio:immediate-scroll";
const mobileWorkQuery = "(max-width: 767px), (max-height: 500px) and (orientation: landscape)";

const mobileIndexMediaVariants = {
  hidden: { opacity: 0, y: 14, scale: .975 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: .38, delay: Math.min(index, 3) * .045, ease: motionEase.editorial },
  }),
};

const mobileIndexTitleVariants = {
  hidden: { opacity: 0, y: 7 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: .28, delay: .07 + Math.min(index, 3) * .045, ease: motionEase.editorial },
  }),
};

const modulo = (value: number, length: number) => ((value % length) + length) % length;

function GridIcon() {
  return (
    <svg className="work-grid-icon" viewBox="0 0 18 18" aria-hidden="true">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.35" />
      <rect x="11" y="1.5" width="5.5" height="5.5" rx="1.35" />
      <rect x="1.5" y="11" width="5.5" height="5.5" rx="1.35" />
      <rect x="11" y="11" width="5.5" height="5.5" rx="1.35" />
    </svg>
  );
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
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const allWorkRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [compact, setCompact] = useState(false);
  const [allWorkOpen, setAllWorkOpen] = useState(false);
  const activeProject = workProjects[activeIndex] ?? workProjects[0];
  const stickyHeading = allWorkOpen ? "All work" : activeProject.title;

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

    const update = () => {
      frame = 0;
      if (!window.matchMedia(mobileWorkQuery).matches || !workProjects.length) return;
      const nav = document.querySelector<HTMLElement>(".mobile-nav-closed");
      const safeTop = Math.max(0, (nav?.getBoundingClientRect().top ?? 10) - 10);
      const activationLine = safeTop + 174;
      const cards = cardRefs.current.filter((card): card is HTMLAnchorElement => Boolean(card));
      let nextIndex = 0;
      cards.forEach((card, index) => {
        if (card.getBoundingClientRect().top <= activationLine) nextIndex = index;
      });
      const nextCompact = root.getBoundingClientRect().top < safeTop - 24;
      setActiveIndex((current) => current === nextIndex ? current : nextIndex);
      setCompact((current) => current === nextCompact ? current : nextCompact);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => onScroll();

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const beginProjectNavigation = useCallback(() => {
    setAllWorkOpen(false);
    releaseScroll(false);
  }, [releaseScroll]);

  useEffect(() => {
    if (!allWorkOpen) return;
    const focusFrame = requestAnimationFrame(() => {
      allWorkRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus({ preventScroll: true });
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setAllWorkOpen(false);
        releaseScroll(true);
        return;
      }
      if (event.key !== "Tab" || !allWorkRef.current) return;
      const links = [...allWorkRef.current.querySelectorAll<HTMLAnchorElement>("a[href]")];
      if (!links.length) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
    };
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
        <motion.span aria-hidden="true" animate={{ scale: allWorkOpen ? .88 : 1, rotate: allWorkOpen ? 90 : 0 }} transition={{ duration: reduceMotion ? 0 : .22, ease: motionEase.editorial }}><GridIcon /></motion.span>
      </motion.button>

      <div className="work-browser-mobile-list" aria-label="Selected work">
        {workProjects.map((project, index) => (
          <Link
            ref={(node) => { cardRefs.current[index] = node; }}
            className="mobile-work-project"
            data-mobile-project-index={index}
            href={project.href}
            key={project.slug}
            aria-label={`${project.locked ? "Preview" : "View"} ${project.title}`}
          >
            {isMobile && !allWorkOpen ? <ProjectMedia project={project} context="work" priority={index === 0} /> : null}
          </Link>
        ))}
      </div>

      <AnimatePresence>
        {allWorkOpen && (
          <motion.div
            ref={allWorkRef}
            className="mobile-all-work"
            id="mobile-all-work-index"
            role="dialog"
            aria-modal="true"
            aria-label="All work"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -7, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? .1 : .46, ease: motionEase.editorial }}
          >
            <nav
              className="mobile-all-work-grid"
              aria-label="All projects"
              data-lenis-prevent
              data-lenis-prevent-touch
              data-lenis-prevent-wheel
              onTouchMove={(event) => event.stopPropagation()}
              onWheel={(event) => event.stopPropagation()}
            >
              {workProjects.map((project, index) => (
                <motion.article
                  className="mobile-all-work-card"
                  key={project.slug}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: .12 }}
                >
                  <ProjectLink
                    className="mobile-all-work-link"
                    href={project.href}
                    projectId={project.id}
                    onClick={beginProjectNavigation}
                    aria-label={`${project.locked ? "Preview" : "View"} ${project.title}`}
                  >
                    <motion.span
                      className="mobile-all-work-press"
                      whileTap={reduceMotion ? undefined : { scale: .975 }}
                      transition={{ duration: .14, ease: motionEase.snappy }}
                    >
                      <motion.span className="mobile-all-work-media" custom={index} variants={reduceMotion ? undefined : mobileIndexMediaVariants}>
                        {isMobile ? <ProjectMedia project={project} context="work" priority={index < 2} /> : null}
                      </motion.span>
                      <motion.span className="mobile-all-work-title" custom={index} variants={reduceMotion ? undefined : mobileIndexTitleVariants}>
                        {project.title}
                      </motion.span>
                    </motion.span>
                  </ProjectLink>
                </motion.article>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function WorkProjectBrowser() {
  const reduceMotion = useReducedMotion();
  const isMobile = useMobileWorkMode();
  const runwayRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [desktopGridOpen, setDesktopGridOpen] = useState(false);
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
              <div className="work-browser-presentation-nav">
                <button className="desktop-work-grid-toggle" type="button" aria-label={desktopGridOpen ? "Close project grid" : "Open project grid"} aria-expanded={desktopGridOpen} aria-controls="desktop-all-work-index" onClick={() => setDesktopGridOpen((open) => !open)}>
                  <motion.span animate={{ scale: desktopGridOpen ? .9 : 1, rotate: desktopGridOpen ? 90 : 0 }} transition={{ duration: reduceMotion ? 0 : .24, ease: motionEase.editorial }}><GridIcon /></motion.span>
                </button>
                <ProjectRail activeIndex={activeIndex} displayIndex={displayIndex} setHoverIndex={setHoverIndex} setFocusIndex={setFocusIndex} />
              </div>
              <div className="work-browser-canvas">{isMobile === false ? <ProjectCover project={displayedProject} /> : null}</div>
            </div>
            <AnimatePresence>
              {desktopGridOpen && isMobile === false && (
                <motion.div className="desktop-all-work" id="desktop-all-work-index" role="dialog" aria-label="All work" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, clipPath: "inset(0 0 100% 0)" }} transition={{ duration: reduceMotion ? .1 : .42, ease: motionEase.editorial }}>
                  <nav className="desktop-all-work-grid" aria-label="All projects" data-lenis-prevent data-lenis-prevent-wheel onWheel={(event) => event.stopPropagation()}>
                    {workProjects.map((project, index) => (
                      <motion.article className="desktop-all-work-card" key={project.slug} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .32, delay: Math.min(index, 8) * .025, ease: motionEase.editorial }}>
                        <ProjectLink className="desktop-all-work-link" href={project.href} projectId={project.id} aria-label={`${project.locked ? "Preview" : "View"} ${project.title}`}>
                          <span className="desktop-all-work-media"><ProjectMedia project={project} context="work" priority={index < 4} /></span>
                          <span className="desktop-all-work-title">{project.title}</span>
                        </ProjectLink>
                      </motion.article>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="work-browser-steps" aria-hidden="true">{Array.from({ length: workProjects.length * LOOP_COPIES }, (_, index) => <span key={index} />)}</div>
      </section>
      <MobileProjects />
    </>
  );
}
