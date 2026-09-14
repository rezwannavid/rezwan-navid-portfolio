"use client";

import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { WorkHeader } from "@/components/work/WorkHeader";
import { WorkProjectCard } from "@/components/work/WorkProjectCard";
import { WorkProjectIndex } from "@/components/work/WorkProjectIndex";
import { workProjects, type WorkCategory } from "@/lib/workProjects";

export function WorkArchive() {
  const [selected, setSelected] = useState<WorkCategory>("all");
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(0);
  const archiveRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const sheetProgress = useMotionValue(0);
  const collapsedRef = useRef(false);
  const visibleProjects = useMemo(() => selected === "all" ? workProjects : workProjects.filter((project) => project.categories.includes(selected)), [selected]);

  useMotionValueEvent(sheetProgress, "change", (value) => {
    const node = archiveRef.current;
    if (!node) return;
    const progress = Math.min(1, Math.max(0, value));
    node.style.setProperty("--sheet-progress", progress.toFixed(4));
    node.style.setProperty("--mobile-header-height", `${136 - progress * 66}px`);
    node.style.setProperty("--mobile-title-size", `${36 - progress * 8}px`);
    const nextCollapsed = progress > .55;
    if (nextCollapsed !== collapsedRef.current) {
      collapsedRef.current = nextCollapsed;
      setCollapsed(nextCollapsed);
    }
  });

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (query.matches) return;
      setCollapsed(window.scrollY > 42);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    query.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", schedule);
      query.removeEventListener("change", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const node = archiveRef.current;
    if (!node) return;
    const query = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dragging = false;
    let captured = false;
    let startY = 0;
    let lastY = 0;
    let lastTime = 0;
    let velocity = 0;
    let startProgress = 0;
    let pointerDragging = false;
    let pointerStartY = 0;
    let pointerLastY = 0;
    let pointerLastTime = 0;
    let pointerVelocity = 0;
    let pointerStartProgress = 0;
    let animation: { stop: () => void } | null = null;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const settle = (target: number, initialVelocity = 0) => {
      animation?.stop();
      if (reducedMotion.matches) {
        sheetProgress.set(target);
        return;
      }
      animation = animate(sheetProgress, target, {
        type: "spring",
        stiffness: 430,
        damping: 38,
        mass: .82,
        velocity: initialVelocity,
      });
    };

    const onScroll = () => {
      if (!query.matches || dragging) return;
      sheetProgress.set(clamp(window.scrollY / 66));
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!query.matches || event.touches.length !== 1) return;
      const target = event.target as HTMLElement;
      if (target.closest("a, button, select, input, textarea")) return;
      animation?.stop();
      dragging = true;
      captured = false;
      startY = lastY = event.touches[0].clientY;
      lastTime = performance.now();
      velocity = 0;
      startProgress = sheetProgress.get();
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!dragging || event.touches.length !== 1) return;
      const y = event.touches[0].clientY;
      const deltaY = y - startY;
      const now = performance.now();
      const elapsed = Math.max(8, now - lastTime);
      velocity = (lastY - y) / elapsed / 66;
      lastY = y;
      lastTime = now;

      if (!captured) {
        if (Math.abs(deltaY) < 6) return;
        const pullingUp = deltaY < 0 && startProgress < .995;
        const pullingDown = deltaY > 0 && window.scrollY <= 1 && startProgress > .005;
        if (!pullingUp && !pullingDown) {
          dragging = false;
          return;
        }
        captured = true;
        node.dataset.dragging = "true";
      }

      event.preventDefault();
      sheetProgress.set(clamp(startProgress - deltaY / 66));
    };

    const onTouchEnd = () => {
      if (!dragging) return;
      dragging = false;
      delete node.dataset.dragging;
      if (!captured) return;
      const projected = sheetProgress.get() + velocity * 10;
      const target = projected >= .5 ? 1 : 0;
      settle(target, velocity);
      captured = false;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!query.matches || event.pointerType !== "mouse" || event.button !== 0 || window.scrollY > 1) return;
      const target = event.target as HTMLElement;
      if (target.closest("a, button, select, input, textarea")) return;
      animation?.stop();
      pointerDragging = true;
      pointerStartY = pointerLastY = event.clientY;
      pointerLastTime = performance.now();
      pointerVelocity = 0;
      pointerStartProgress = sheetProgress.get();
      node.dataset.dragging = "true";
      event.preventDefault();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerDragging) return;
      const now = performance.now();
      const elapsed = Math.max(8, now - pointerLastTime);
      pointerVelocity = (pointerLastY - event.clientY) / elapsed / 66;
      pointerLastY = event.clientY;
      pointerLastTime = now;
      sheetProgress.set(clamp(pointerStartProgress - (event.clientY - pointerStartY) / 66));
      event.preventDefault();
    };

    const onPointerUp = () => {
      if (!pointerDragging) return;
      pointerDragging = false;
      delete node.dataset.dragging;
      const projected = sheetProgress.get() + pointerVelocity * 10;
      settle(projected >= .5 ? 1 : 0, pointerVelocity);
    };

    const onModeChange = () => {
      animation?.stop();
      if (query.matches) {
        sheetProgress.set(clamp(window.scrollY / 66));
      } else {
        sheetProgress.set(0);
        delete node.dataset.dragging;
      }
    };

    onModeChange();
    window.addEventListener("scroll", onScroll, { passive: true });
    query.addEventListener("change", onModeChange);
    node.addEventListener("touchstart", onTouchStart, { passive: true });
    node.addEventListener("touchmove", onTouchMove, { passive: false });
    node.addEventListener("touchend", onTouchEnd, { passive: true });
    node.addEventListener("touchcancel", onTouchEnd, { passive: true });
    node.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      animation?.stop();
      window.removeEventListener("scroll", onScroll);
      query.removeEventListener("change", onModeChange);
      node.removeEventListener("touchstart", onTouchStart);
      node.removeEventListener("touchmove", onTouchMove);
      node.removeEventListener("touchend", onTouchEnd);
      node.removeEventListener("touchcancel", onTouchEnd);
      node.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [sheetProgress]);

  useEffect(() => {
    const cards = Array.from(listRef.current?.querySelectorAll<HTMLElement>(".work-project-card") ?? []);
    if (!cards.length) return;
    setActive(0);
    const observer = new IntersectionObserver((entries) => {
      const candidate = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!candidate) return;
      setActive(cards.indexOf(candidate.target as HTMLElement));
    }, { rootMargin: "-27% 0px -48%", threshold: [0, .25, .5, .75] });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [visibleProjects]);

  useEffect(() => {
    const cards = Array.from(listRef.current?.querySelectorAll<HTMLElement>(".work-project-card") ?? []);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.visible = "true";
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7%" });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [visibleProjects]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(listRef.current?.querySelectorAll<HTMLElement>(".work-card-compress") ?? []);
    let frame = 0;
    const update = () => {
      frame = 0;
      const edge = window.innerWidth < 768 ? 128 : 155;
      cards.forEach((card) => {
        const top = card.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, (edge - top) / 180));
        card.style.setProperty("--compress", progress.toFixed(3));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [visibleProjects]);

  return (
    <section ref={archiveRef} className="work-archive" aria-label="Selected work">
      <WorkHeader collapsed={collapsed} selected={selected} onSelect={setSelected} />
      <div className="container work-list-shell">
        <WorkProjectIndex count={visibleProjects.length} active={active} />
        <div ref={listRef} className="work-project-list" key={selected} aria-live="polite">
          {visibleProjects.map((project, index) => <WorkProjectCard project={project} index={index} key={project.slug} />)}
          {!visibleProjects.length && <p className="work-empty">No projects in this category yet.</p>}
        </div>
      </div>
    </section>
  );
}
