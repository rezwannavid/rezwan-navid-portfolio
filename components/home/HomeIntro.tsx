"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useRef, type ReactNode } from "react";

const HOME_INTRO_SESSION_KEY = "rezwan-home-intro-v2";
const HomeIntroCardContext = createContext<(node: HTMLElement | null) => void>(() => undefined);

export function useHomeIntroCard() {
  return useContext(HomeIntroCardContext);
}

export function HomeIntroProvider({ children }: { children: ReactNode }) {
  const cards = useRef(new Set<HTMLElement>());
  const registerCard = useCallback((node: HTMLElement | null) => {
    if (node) cards.current.add(node);
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bootedBeforeHydration = html.dataset.homeIntro === "boot";
    let seen = false;

    try {
      seen = sessionStorage.getItem(HOME_INTRO_SESSION_KEY) === "1";
    } catch {
      seen = true;
    }

    if (reducedMotion || (!bootedBeforeHydration && seen)) {
      html.dataset.homeIntro = "complete";
      delete html.dataset.homeIntroPhase;
      return;
    }

    try {
      sessionStorage.setItem(HOME_INTRO_SESSION_KEY, "1");
    } catch {
      html.dataset.homeIntro = "complete";
      delete html.dataset.homeIntroPhase;
      return;
    }

    const card = [...cards.current].find((candidate) => {
      const rect = candidate.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && getComputedStyle(candidate).display !== "none";
    });

    if (!card) {
      html.dataset.homeIntro = "complete";
      delete html.dataset.homeIntroPhase;
      return;
    }

    let moveTimer = 0;
    let completeTimer = 0;
    let intentTimer = 0;
    let movement: Animation | null = null;
    let moving = false;
    let finished = false;
    const startedAt = performance.now();
    const inertElements = [...document.querySelectorAll<HTMLElement>(
      ".global-navbar, .mobile-navigation, .home-hero-copy, .mobile-home-hero h1",
    )];

    const setInert = (value: boolean) => {
      inertElements.forEach((element) => { element.inert = value; });
    };

    const centerCard = () => {
      if (moving || finished) return;
      card.style.transform = "none";
      const rect = card.getBoundingClientRect();
      const viewport = window.visualViewport;
      const viewportCenterX = viewport ? viewport.offsetLeft + viewport.width / 2 : window.innerWidth / 2;
      const viewportCenterY = viewport ? viewport.offsetTop + viewport.height / 2 : window.innerHeight / 2;
      const x = viewportCenterX - (rect.left + rect.width / 2);
      const y = viewportCenterY - (rect.top + rect.height / 2);
      card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const releaseScroll = () => {
      document.removeEventListener("wheel", onScrollIntent);
      document.removeEventListener("touchmove", onScrollIntent);
      document.removeEventListener("keydown", onKeyIntent);
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      moving = false;
      window.clearTimeout(moveTimer);
      window.clearTimeout(completeTimer);
      window.clearTimeout(intentTimer);
      movement?.cancel();
      movement = null;
      card.style.transform = "";
      card.style.willChange = "";
      setInert(false);
      releaseScroll();
      window.removeEventListener("resize", centerCard);
      window.visualViewport?.removeEventListener("resize", centerCard);
      html.dataset.homeIntro = "complete";
      delete html.dataset.homeIntroPhase;
    };

    const abort = () => {
      if (finished) return;
      window.clearTimeout(moveTimer);
      window.clearTimeout(completeTimer);
      window.clearTimeout(intentTimer);
      movement?.cancel();
      movement = null;
      card.style.transform = "";
      card.style.willChange = "";
      setInert(false);
      releaseScroll();
      window.removeEventListener("resize", centerCard);
      window.visualViewport?.removeEventListener("resize", centerCard);
      html.dataset.homeIntro = "boot";
      delete html.dataset.homeIntroPhase;
      window.setTimeout(() => {
        if ((location.pathname !== "/" || !document.querySelector(".home-page")) && html.dataset.homeIntro === "boot") {
          html.dataset.homeIntro = "complete";
        }
      });
    };

    const beginMove = () => {
      if (moving || finished) return;
      moving = true;
      window.clearTimeout(moveTimer);
      window.clearTimeout(intentTimer);
      releaseScroll();
      setInert(false);
      html.dataset.homeIntroPhase = "moving";
      const startTransform = card.style.transform;
      movement = card.animate(
        [{ transform: startTransform }, { transform: "translate3d(0, 0, 0)" }],
        { duration: 950, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "forwards" },
      );
      completeTimer = window.setTimeout(finish, 980);
    };

    function onScrollIntent(event: Event) {
      event.preventDefault();
      if (moving || finished || intentTimer) return;
      const wait = Math.max(0, 320 - (performance.now() - startedAt));
      intentTimer = window.setTimeout(beginMove, wait);
    }

    function onKeyIntent(event: KeyboardEvent) {
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
      onScrollIntent(event);
    }

    card.style.willChange = "transform";
    centerCard();
    setInert(true);
    html.dataset.homeIntro = "running";
    html.dataset.homeIntroPhase = "revealing";

    document.addEventListener("wheel", onScrollIntent, { passive: false });
    document.addEventListener("touchmove", onScrollIntent, { passive: false });
    document.addEventListener("keydown", onKeyIntent);
    window.addEventListener("resize", centerCard, { passive: true });
    window.visualViewport?.addEventListener("resize", centerCard, { passive: true });
    moveTimer = window.setTimeout(beginMove, 1120);

    return abort;
  }, []);

  return <HomeIntroCardContext.Provider value={registerCard}>{children}</HomeIntroCardContext.Provider>;
}
