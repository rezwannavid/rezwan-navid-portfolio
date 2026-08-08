"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ComponentProps,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { getProject, type ProjectId, type ResolvedProject } from "@/lib/projectRegistry";

type PendingTransition = {
  project: ResolvedProject;
  targetPath: string;
  sourceImage: HTMLImageElement;
  overlay: HTMLDivElement;
  backdrop: HTMLDivElement;
  navigationTimer: number;
  timeout: number;
};

type TransitionContextValue = {
  begin: (event: ReactMouseEvent<HTMLAnchorElement>, link: HTMLAnchorElement, project: ResolvedProject) => void;
};

const ProjectTransitionContext = createContext<TransitionContextValue | null>(null);
const transitionEase = "cubic-bezier(.16, 1, .3, 1)";

function isModifiedNavigation(event: ReactMouseEvent<HTMLAnchorElement>) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function getProjectImage(root: Element) {
  return root.querySelector("img:not([data-project-transition-ignore])") as HTMLImageElement | null;
}

function getAssetPath(value: string) {
  try {
    const url = new URL(value, window.location.href);
    const optimizedSource = url.pathname.startsWith("/_next/image") ? url.searchParams.get("url") : null;
    return decodeURIComponent(new URL(optimizedSource ?? url.href, window.location.href).pathname);
  } catch {
    return value.split("?")[0];
  }
}

function getRadius(link: HTMLElement, image: HTMLImageElement) {
  let node: HTMLElement | null = image;
  while (node) {
    const radius = getComputedStyle(node).borderRadius;
    if (radius && radius !== "0px") return radius;
    if (node === link) break;
    node = node.parentElement;
  }
  return "0px";
}

function intersectRects(a: DOMRect, b: DOMRect) {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  const right = Math.min(a.right, b.right);
  const bottom = Math.min(a.bottom, b.bottom);
  return new DOMRect(left, top, Math.max(0, right - left), Math.max(0, bottom - top));
}

function getVisibleImageRect(link: HTMLElement, image: HTMLImageElement) {
  let rect = image.getBoundingClientRect();
  let node: HTMLElement | null = image.parentElement;
  while (node) {
    const style = getComputedStyle(node);
    const clips = style.overflow === "hidden" || style.overflow === "clip" || style.overflowX === "hidden" || style.overflowY === "hidden" || style.clipPath !== "none";
    if (clips) rect = intersectRects(rect, node.getBoundingClientRect());
    if (node === link) break;
    node = node.parentElement;
  }
  return rect;
}

function makeVisual(source: HTMLElement, image: HTMLImageElement) {
  const rect = getVisibleImageRect(source, image);
  if (rect.width < 2 || rect.height < 2 || !image.currentSrc && !image.src) return null;
  const imageStyle = getComputedStyle(image);
  const overlay = document.createElement("div");
  const travellingImage = document.createElement("img");
  overlay.className = "project-transition-visual";
  overlay.setAttribute("aria-hidden", "true");
  Object.assign(overlay.style, {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    borderRadius: getRadius(source, image),
  });
  travellingImage.src = image.currentSrc || image.src;
  travellingImage.alt = "";
  travellingImage.decoding = "async";
  travellingImage.draggable = false;
  travellingImage.style.objectFit = imageStyle.objectFit || "cover";
  travellingImage.style.objectPosition = imageStyle.objectPosition || "50% 50%";
  overlay.appendChild(travellingImage);

  const backdrop = document.createElement("div");
  backdrop.className = "project-transition-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  document.body.append(backdrop, overlay);
  image.dataset.projectTransitionSourceHidden = "true";
  return { overlay, backdrop };
}

function waitForElement(selector: string, timeout = 1500): Promise<HTMLElement | null> {
  const started = performance.now();
  return new Promise((resolve) => {
    const inspect = () => {
      const element = document.querySelector(selector) as HTMLElement | null;
      if (element && element.getBoundingClientRect().width > 2) return resolve(element);
      if (performance.now() - started >= timeout) return resolve(null);
      requestAnimationFrame(inspect);
    };
    requestAnimationFrame(inspect);
  });
}

export function ProjectTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pendingRef = useRef<PendingTransition | null>(null);
  const lockRef = useRef<{ htmlOverflow: string; bodyOverflow: string; bodyPaddingRight: string } | null>(null);

  const lockScroll = useCallback(() => {
    if (lockRef.current) return;
    const scrollbar = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    lockRef.current = {
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
      bodyPaddingRight: document.body.style.paddingRight,
    };
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`;
  }, []);

  const unlockScroll = useCallback(() => {
    const previous = lockRef.current;
    if (!previous) return;
    document.documentElement.style.overflow = previous.htmlOverflow;
    document.body.style.overflow = previous.bodyOverflow;
    document.body.style.paddingRight = previous.bodyPaddingRight;
    lockRef.current = null;
  }, []);

  const cleanup = useCallback((showTarget?: HTMLElement | null) => {
    const pending = pendingRef.current;
    if (!pending) return;
    window.clearTimeout(pending.timeout);
    window.clearTimeout(pending.navigationTimer);
    if (showTarget) delete showTarget.dataset.projectTransitionTargetHidden;
    delete pending.sourceImage.dataset.projectTransitionSourceHidden;
    pending.overlay.remove();
    pending.backdrop.remove();
    pendingRef.current = null;
    delete document.documentElement.dataset.projectTransitionActive;
    delete document.documentElement.dataset.projectTransitionArriving;
    unlockScroll();
  }, [unlockScroll]);

  const finishAt = useCallback(async (target: HTMLElement) => {
    const pending = pendingRef.current;
    if (!pending) return;
    const targetImage = getProjectImage(target);
    if (!targetImage) return cleanup();
    target.dataset.projectTransitionTargetHidden = "true";
    const destination = target.getBoundingClientRect();
    const origin = pending.overlay.getBoundingClientRect();
    const targetStyle = getComputedStyle(targetImage);
    const distance = Math.hypot(destination.left - origin.left, destination.top - origin.top);
    const duration = Math.min(960, Math.max(720, 720 + distance * .12));
    const fromRadius = pending.overlay.style.borderRadius;
    const toRadius = getRadius(target, targetImage);
    pending.overlay.querySelector("img")!.style.objectFit = targetStyle.objectFit || "cover";

    pending.backdrop.animate([{ opacity: .14 }, { opacity: .08, offset: .45 }, { opacity: 0 }], { duration: duration * .78, easing: transitionEase, fill: "forwards" });
    const travel = pending.overlay.animate([
      { left: `${origin.left}px`, top: `${origin.top}px`, width: `${origin.width}px`, height: `${origin.height}px`, borderRadius: fromRadius, transform: "translate3d(0,0,0) scale(1.006)" },
      { left: `${destination.left}px`, top: `${destination.top}px`, width: `${destination.width}px`, height: `${destination.height}px`, borderRadius: toRadius, transform: "translate3d(0,0,0) scale(1)" },
    ], { duration, easing: transitionEase, fill: "forwards" });
    try { await travel.finished; } catch { return cleanup(target); }
    delete target.dataset.projectTransitionTargetHidden;
    const handoff = pending.overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, easing: "ease-out", fill: "forwards" });
    try { await handoff.finished; } finally { cleanup(target); }
  }, [cleanup]);

  const begin = useCallback((event: ReactMouseEvent<HTMLAnchorElement>, link: HTMLAnchorElement, project: ResolvedProject) => {
    if (event.defaultPrevented || isModifiedNavigation(event) || pendingRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const image = getProjectImage(link);
    if (!image || !image.complete || image.naturalWidth === 0) return;
    if (getAssetPath(image.currentSrc || image.src) !== getAssetPath(project.hero)) return;
    const visual = makeVisual(link, image);
    if (!visual) return;
    event.preventDefault();

    document.documentElement.dataset.projectTransitionActive = "true";
    document.documentElement.dataset.projectTransitionArriving = project.slug;
    lockScroll();
    visual.backdrop.animate([{ opacity: 0 }, { opacity: .14 }], { duration: 180, easing: transitionEase, fill: "forwards" });
    visual.overlay.animate([{ transform: "translate3d(0,0,0) scale(1)" }, { transform: "translate3d(0,-2px,0) scale(1.006)" }], { duration: 190, easing: transitionEase, fill: "forwards" });
    const targetPath = new URL(project.href, window.location.href).pathname;
    const timeout = window.setTimeout(() => cleanup(), 2200);
    const navigationTimer = window.setTimeout(() => router.push(project.href, { scroll: false }), 70);
    pendingRef.current = { project, targetPath, sourceImage: image, overlay: visual.overlay, backdrop: visual.backdrop, navigationTimer, timeout };
  }, [cleanup, lockScroll, router]);

  useEffect(() => {
    const pending = pendingRef.current;
    if (!pending) return;
    if (pathname === pending.targetPath) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      void waitForElement(`[data-project-transition-hero="${pending.project.slug}"]`).then((target) => target ? finishAt(target) : cleanup());
    } else {
      cleanup();
    }
  }, [cleanup, finishAt, pathname]);

  useEffect(() => () => cleanup(), [cleanup]);

  const value = useMemo(() => ({ begin }), [begin]);
  return <ProjectTransitionContext.Provider value={value}>{children}</ProjectTransitionContext.Provider>;
}

type ProjectLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  projectId: ProjectId;
  href?: string;
};

export const ProjectLink = forwardRef<HTMLAnchorElement, ProjectLinkProps>(function ProjectLink({ projectId, href, onClick, children, ...props }, ref) {
  const context = useContext(ProjectTransitionContext);
  const project = getProject(projectId);
  if (!project) return null;
  return (
    <Link
      {...props}
      ref={ref}
      href={href ?? project.href}
      data-project-transition-source={project.transitionId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context?.begin(event, event.currentTarget, project);
      }}
    >
      {children}
    </Link>
  );
});
