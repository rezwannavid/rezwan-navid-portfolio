"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, type CSSProperties, type KeyboardEvent, type PointerEvent, type WheelEvent } from "react";
import type { PhotographyItem } from "@/lib/photographyGallery";
import { motionEase } from "@/lib/motion";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
export function PhotographyGallery({ items }: { items: PhotographyItem[] }) {
  const viewportRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Array<HTMLDivElement | null>>([]);
  const target = useRef(0);
  const current = useRef(0);
  const maximum = useRef(0);
  const previous = useRef(0);
  const galleryVelocity = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTarget = useRef(0);
  const lastDragX = useRef(0);
  const dragVelocity = useRef(0);
  const snapTimer = useRef<number | null>(null);
  const animationFrame = useRef<number | null>(null);
  const railX = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const rail = railRef.current;
    if (!viewport || !rail) return;
    maximum.current = Math.max(0, rail.scrollWidth - viewport.clientWidth);
    target.current = clamp(target.current, 0, maximum.current);
    current.current = clamp(current.current, 0, maximum.current);
  }, []);

  const softlySnap = useCallback(() => {
    if (dragging.current || reduceMotion) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const candidates = frameRefs.current.filter(Boolean).map((frame) => clamp((frame as HTMLDivElement).offsetLeft + (frame as HTMLDivElement).offsetWidth / 2 - viewport.clientWidth / 2, 0, maximum.current));
    if (!candidates.length) return;
    const nearest = candidates.reduce((best, value) => Math.abs(value - target.current) < Math.abs(best - target.current) ? value : best);
    const distance = nearest - target.current;
    if (Math.abs(distance) < 230) target.current = clamp(target.current + distance * .42, 0, maximum.current);
  }, [reduceMotion]);

  const scheduleSnap = useCallback((delay = 170) => {
    if (snapTimer.current) window.clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(softlySnap, delay);
  }, [softlySnap]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (railRef.current) observer.observe(railRef.current);

    const tick = () => {
      const difference = target.current - current.current;
      current.current = reduceMotion ? target.current : current.current + difference * .105;
      if (Math.abs(difference) < .02) current.current = target.current;
      railX.set(-current.current);
      const velocity = current.current - previous.current;
      previous.current = current.current;
      galleryVelocity.current = velocity;
      railRef.current?.style.setProperty("--photography-scroll-lean", `${clamp(velocity * .065, -1.6, 1.6)}deg`);
      animationFrame.current = requestAnimationFrame(tick);
    };
    animationFrame.current = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      if (snapTimer.current) window.clearTimeout(snapTimer.current);
    };
  }, [measure, railX, reduceMotion]);

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!delta) return;
    const next = clamp(target.current + delta * .82, 0, maximum.current);
    if (next !== target.current || delta < 0 && target.current > 0 || delta > 0 && target.current < maximum.current) event.preventDefault();
    target.current = next;
    scheduleSnap(190);
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging.current = true;
    dragStartX.current = event.clientX;
    lastDragX.current = event.clientX;
    dragStartTarget.current = target.current;
    dragVelocity.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!dragging.current) return;
    const delta = event.clientX - dragStartX.current;
    dragVelocity.current = event.clientX - lastDragX.current;
    lastDragX.current = event.clientX;
    target.current = clamp(dragStartTarget.current - delta, 0, maximum.current);
  };

  const endDrag = (event: PointerEvent<HTMLElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    event.currentTarget.dataset.dragging = "false";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!reduceMotion) target.current = clamp(target.current - dragVelocity.current * 8, 0, maximum.current);
    scheduleSnap(240);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    if (event.key === "Home") target.current = 0;
    else if (event.key === "End") target.current = maximum.current;
    else target.current = clamp(target.current + (event.key === "ArrowRight" ? 280 : -280), 0, maximum.current);
    scheduleSnap(160);
  };

  return (
    <main className="photography-page" data-node-id="924:30758">
      <h1 className="sr-only">Photography by Mir Rezwan Navid</h1>
      <div className="photography-title">
        <img src="/photography-design/world-through-my-lens.png" alt="World through my lens" width="1280" height="1280" />
      </div>

      <section
        ref={viewportRef}
        className="photography-viewport"
        aria-label="Photography gallery"
        tabIndex={0}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        <motion.div ref={railRef} className="photography-rail" style={{ x: railX }} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .14, ease: motionEase.editorial }}>
          {items.map((item, index) => <PhotoFrame key={item.filename} item={item} priority={index < 3} frameRef={(node) => { frameRefs.current[index] = node; }} reduceMotion={Boolean(reduceMotion)} getGalleryVelocity={() => galleryVelocity.current} />)}
          <div className="photography-end-space" aria-hidden="true" />
        </motion.div>
      </section>
    </main>
  );
}

function PhotoFrame({ item, priority, frameRef, reduceMotion, getGalleryVelocity }: { item: PhotographyItem; priority: boolean; frameRef: (node: HTMLDivElement | null) => void; reduceMotion: boolean; getGalleryVelocity: () => number }) {
  const aspectRatio = item.width / item.height;
  const imageHeight = Math.round(item.displayWidth / aspectRatio);
  const rotateX = useMotionValue(item.baseRotateX);
  const rotateY = useMotionValue(item.baseRotateY);
  const lift = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 150, damping: 24, mass: 1.12 });
  const smoothY = useSpring(rotateY, { stiffness: 150, damping: 24, mass: 1.12 });
  const smoothLift = useSpring(lift, { stiffness: 165, damping: 25, mass: 1.05 });
  const reflectionX = useTransform(smoothY, [-18, 18], ["96%", "4%"]);
  const reflectionOpacity = useTransform(smoothX, [-14, 14], [.1, .28]);
  const edgeHighlightX = useTransform(smoothY, [-18, 18], ["10%", "90%"]);
  const edgeHighlightOpacity = useTransform(smoothX, [-14, 14], [.18, .42]);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    const interactionStrength = clamp(1 - Math.abs(getGalleryVelocity()) / 24, .46, 1);
    rotateY.set(item.baseRotateY + x * 28 * interactionStrength);
    rotateX.set(item.baseRotateX - y * 22 * interactionStrength);
    lift.set(34);
  };

  const reset = () => {
    rotateX.set(item.baseRotateX);
    rotateY.set(item.baseRotateY);
    lift.set(0);
  };

  const dimensions = { "--photo-width": `${item.displayWidth}px`, "--photo-height": `${imageHeight}px`, "--frame-y": `${item.yOffset}px`, "--frame-z": `${item.baseRotateZ}deg` } as CSSProperties;

  return (
    <div ref={frameRef} className="photography-frame-hitbox" style={dimensions} onPointerMove={move} onPointerLeave={reset}>
      <div className="photography-frame-position">
        <motion.article className="photography-frame-object" style={{ rotateX: smoothX, rotateY: smoothY, z: smoothLift }} aria-label={`${item.alt}. ${item.date}, ${item.camera}.`}>
          <span className="photography-frame-back" aria-hidden="true" />
          <span className="photography-frame-side photography-frame-side-left" aria-hidden="true" />
          <span className="photography-frame-side photography-frame-side-right" aria-hidden="true" />
          <span className="photography-frame-side photography-frame-side-top" aria-hidden="true" />
          <span className="photography-frame-side photography-frame-side-bottom" aria-hidden="true" />
          <div className="photography-frame-face">
            <div className="photography-photo-recess">
              <Image src={item.src} alt={item.alt} fill sizes={`${item.displayWidth}px`} quality={92} priority={priority} draggable={false} />
              <span className="photography-inner-shadow" aria-hidden="true" />
              <motion.span className="photography-glass" aria-hidden="true" style={{ backgroundPositionX: reflectionX, opacity: reflectionOpacity }} />
            </div>
            <div className="photography-frame-meta"><time>{item.date}</time><span>{item.camera}</span></div>
            <motion.span className="photography-frame-highlight" aria-hidden="true" style={{ backgroundPositionX: edgeHighlightX, opacity: edgeHighlightOpacity }} />
          </div>
        </motion.article>
      </div>
    </div>
  );
}
