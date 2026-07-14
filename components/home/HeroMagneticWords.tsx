"use client";

import { useEffect, useRef } from "react";

const words = [
  { label: "Product", className: "product", radius: 156, x: 9, y: 8, rotate: 2.3, scale: 0.024, stiffness: 106, damping: 18.5 },
  { label: "Brain", className: "brain", radius: 150, x: 9, y: 9, rotate: 2.1, scale: 0.021, stiffness: 116, damping: 20 },
  { label: "Design", className: "design", radius: 160, x: 10, y: 9, rotate: 2.8, scale: 0.022, stiffness: 122, damping: 19 },
  { label: "Heart", className: "heart", radius: 152, x: 9, y: 10, rotate: 2.2, scale: 0.028, stiffness: 112, damping: 18.8 },
] as const;

type MotionState = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  brightness: number;
  vx: number;
  vy: number;
  vr: number;
  vs: number;
  vb: number;
  targetX: number;
  targetY: number;
  targetRotation: number;
  targetScale: number;
  targetBrightness: number;
};

const initialState = (): MotionState => ({
  x: 0, y: 0, rotation: 0, scale: 1, brightness: 1,
  vx: 0, vy: 0, vr: 0, vs: 0, vb: 0,
  targetX: 0, targetY: 0, targetRotation: 0, targetScale: 1, targetBrightness: 1,
});

export function HeroMagneticWords() {
  const roots = useRef<(HTMLSpanElement | null)[]>([]);
  const movers = useRef<(HTMLSpanElement | null)[]>([]);
  const states = useRef(words.map(initialState));

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let lastTime = performance.now();
    let running = false;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.032);
      lastTime = time;
      let active = false;

      states.current.forEach((state, index) => {
        const config = words[index];
        const mover = movers.current[index];
        if (!mover) return;

        const spring = (value: number, velocity: number, target: number) => {
          const acceleration = (target - value) * config.stiffness;
          const nextVelocity = (velocity + acceleration * dt) * Math.exp(-config.damping * dt);
          return [value + nextVelocity * dt, nextVelocity] as const;
        };

        [state.x, state.vx] = spring(state.x, state.vx, state.targetX);
        [state.y, state.vy] = spring(state.y, state.vy, state.targetY);
        [state.rotation, state.vr] = spring(state.rotation, state.vr, state.targetRotation);
        [state.scale, state.vs] = spring(state.scale, state.vs, state.targetScale);
        [state.brightness, state.vb] = spring(state.brightness, state.vb, state.targetBrightness);

        mover.style.transform = `translate3d(${state.x.toFixed(3)}px, ${state.y.toFixed(3)}px, 0) rotate(calc(var(--rest-rotate) + ${state.rotation.toFixed(3)}deg)) scale(${state.scale.toFixed(4)})`;
        mover.style.filter = `brightness(${state.brightness.toFixed(4)})`;

        active ||= Math.abs(state.targetX - state.x) > 0.01 || Math.abs(state.targetY - state.y) > 0.01 ||
          Math.abs(state.targetRotation - state.rotation) > 0.005 || Math.abs(state.targetScale - state.scale) > 0.0001 ||
          Math.abs(state.vx) > 0.01 || Math.abs(state.vy) > 0.01 || Math.abs(state.vr) > 0.005;
      });

      if (active) frame = requestAnimationFrame(render);
      else running = false;
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      frame = requestAnimationFrame(render);
    };

    const resetTargets = () => {
      states.current.forEach((state) => {
        state.targetX = 0;
        state.targetY = 0;
        state.targetRotation = 0;
        state.targetScale = 1;
        state.targetBrightness = 1;
      });
      start();
    };

    const onPointerMove = (event: PointerEvent) => {
      roots.current.forEach((root, index) => {
        if (!root) return;
        const config = words[index];
        const state = states.current[index];
        const rect = root.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);
        const proximity = Math.max(0, 1 - distance / config.radius);
        const influence = proximity * proximity * (3 - 2 * proximity);
        const directionX = distance ? dx / distance : 0;
        const directionY = distance ? dy / distance : 0;

        state.targetX = directionX * config.x * influence;
        state.targetY = directionY * config.y * influence;
        state.targetRotation = directionX * config.rotate * influence;
        state.targetScale = 1 + config.scale * influence;
        state.targetBrightness = 1 + 0.045 * influence;
      });
      start();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetTargets);
    window.addEventListener("blur", resetTargets);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", resetTargets);
      window.removeEventListener("blur", resetTargets);
    };
  }, []);

  return words.map((word, index) => (
    <span
      className={`orbit-word ${word.className}`}
      key={word.label}
      ref={(node) => { roots.current[index] = node; }}
    >
      <span className="magnetic-word-inner" ref={(node) => { movers.current[index] = node; }}>{word.label}</span>
    </span>
  ));
}
