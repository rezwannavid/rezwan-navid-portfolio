"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

const anchorEase = (progress: number) => 1 - Math.pow(1 - progress, 4);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lockObserver: MutationObserver | null = null;

    const destroy = () => {
      lockObserver?.disconnect();
      lockObserver = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const create = () => {
      destroy();
      if (!desktop.matches || reducedMotion.matches) return;

      const lenis = new Lenis({
        autoRaf: true,
        autoResize: true,
        lerp: .14,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        overscroll: true,
        respectReducedMotion: true,
        stopInertiaOnNavigate: true,
        anchors: { offset: -88, duration: .7, easing: anchorEase },
      });
      lenisRef.current = lenis;

      const syncPageLock = () => {
        const html = document.documentElement.style;
        const body = document.body.style;
        const locked = html.overflow === "hidden" || html.overflow === "clip" || html.overflowY === "hidden" || html.overflowY === "clip" || body.overflow === "hidden" || body.overflow === "clip" || body.overflowY === "hidden" || body.overflowY === "clip";
        if (locked) lenis.stop();
        else if (lenis.isStopped) {
          lenis.start();
          lenis.resize();
          lenis.scrollTo(window.scrollY, { immediate: true, force: true });
        }
      };

      lockObserver = new MutationObserver(syncPageLock);
      lockObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
      lockObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });
      syncPageLock();
    };

    create();
    desktop.addEventListener("change", create);
    reducedMotion.addEventListener("change", create);

    return () => {
      desktop.removeEventListener("change", create);
      reducedMotion.removeEventListener("change", create);
      destroy();
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const lenis = lenisRef.current;
      if (!lenis) return;
      lenis.resize();
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return children;
}
