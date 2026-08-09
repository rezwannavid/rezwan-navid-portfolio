"use client";

import { Glass, type GlassOptics } from "@samasante/liquid-glass";
import { useId, type ReactNode } from "react";
import { useNavbarRefractionVisual, useNavbarSourceRefraction } from "@/components/layout/NavbarRefractionSource";

export const navbarGlassOptics: Partial<GlassOptics> = {
  strength: .012,
  scaleX: .006,
  scaleY: .012,
  depth: .18,
  curvature: .035,
  dispersion: .012,
  bend: .16,
  bendWidth: .075,
  frost: 1,
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

export function GlassNavbarSurface({ children, className }: { children: ReactNode; className: string }) {
  const surfaceId = `navbar-glass-${useId().replace(/:/g, "")}`;
  const needsSource = useNavbarSourceRefraction();
  const refract = useNavbarRefractionVisual(surfaceId, needsSource);

  return (
    <Glass
      id={surfaceId}
      className={`${className} glass-navbar-surface`}
      optics={navbarGlassOptics}
      refract={needsSource ? refract : undefined}
      behind="#040404"
      live={needsSource}
      style={{ display: "block" }}
    >
      {children}
    </Glass>
  );
}
