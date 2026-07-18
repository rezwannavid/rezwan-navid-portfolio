"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WorkHeader } from "@/components/work/WorkHeader";
import { WorkProjectCard } from "@/components/work/WorkProjectCard";
import { WorkProjectIndex } from "@/components/work/WorkProjectIndex";
import { workProjects, type WorkCategory } from "@/lib/workProjects";

export function WorkArchive() {
  const [selected, setSelected] = useState<WorkCategory>("all");
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const visibleProjects = useMemo(() => selected === "all" ? workProjects : workProjects.filter((project) => project.categories.includes(selected)), [selected]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      setCollapsed(query.matches || window.scrollY > 42);
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
    <section className="work-archive" aria-label="Selected work">
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
