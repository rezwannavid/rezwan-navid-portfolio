"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";

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

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;

    try {
      seen = sessionStorage.getItem(HOME_INTRO_SESSION_KEY) === "1";
    } catch {
      seen = true;
    }

    if (reducedMotion || seen) return;

    try {
      sessionStorage.setItem(HOME_INTRO_SESSION_KEY, "1");
    } catch {
      return;
    }

    const card = [...cards.current].find((candidate) => {
      const rect = candidate.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && getComputedStyle(candidate).display !== "none";
    });

    if (!card) return;

    const animation = card.animate(
      [
        { opacity: .82, transform: "translate3d(0, 12px, 0) scale(.99)" },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
      ],
      { duration: 850, easing: "cubic-bezier(.22, 1, .36, 1)" },
    );

    return () => animation.cancel();
  }, []);

  return <HomeIntroCardContext.Provider value={registerCard}>{children}</HomeIntroCardContext.Provider>;
}
