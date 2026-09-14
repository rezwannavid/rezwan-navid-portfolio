"use client";

import { Glass, type GlassOptics } from "@samasante/liquid-glass";
import { useSyncExternalStore, type ReactNode } from "react";

export const navbarGlassOptics: Partial<GlassOptics> = {
  strength: .039,
  scaleX: .030,
  scaleY: .060,
  depth: .50,
  curvature: .010,
  dispersion: .016,
  bend: .50,
  bendWidth: .09,
  frost: 1.2,
  saturate: 1.04,
  brightness: -.015,
  sheen: .10,
  sheenWidth: 1.25,
  sheenFalloff: 2.2,
  sheenAngle: 225,
  glow: .015,
  glowSpread: .45,
  glowFalloff: 1.2,
  specular: .35,
};

const frostedNavbarOptics: Partial<GlassOptics> = {
  ...navbarGlassOptics,
  frost: 28,
  saturate: 1.15,
  brightness: .015,
};

type NavigatorWithUAData = Navigator & { userAgentData?: unknown };

const subscribeToBrowserEngine = () => () => {};
const serverFrostedFallback = () => false;

function getFrostedFallback() {
  const ua = navigator.userAgent;
  const hasUAData = (navigator as NavigatorWithUAData).userAgentData != null;
  const isBlink = hasUAData || (/\b(?:Chrome|Chromium|Edg)\//.test(ua)
    && !/\b(?:CriOS|EdgiOS|FxiOS|OPiOS)\b/.test(ua)
    && !/iPhone|iPad|iPod/.test(ua));
  return !isBlink;
}

function useFrostedFallback() {
  return useSyncExternalStore(subscribeToBrowserEngine, getFrostedFallback, serverFrostedFallback);
}

export function GlassNavbarSurface({ children, className }: { children: ReactNode; className: string }) {
  const frosted = useFrostedFallback();

  return (
    <Glass
      className={`${className} glass-navbar-surface`}
      data-navbar-glass-mode={frosted ? "frosted" : "liquid"}
      optics={frosted ? frostedNavbarOptics : navbarGlassOptics}
      style={{ display: "block" }}
    >
      {children}
    </Glass>
  );
}
