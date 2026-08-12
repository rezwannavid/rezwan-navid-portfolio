"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { WorkRail } from "@/components/home/WorkRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { RevealMedia } from "@/components/motion/RevealMedia";
import { CaseStudyShell, NextProject, ProjectVisual } from "@/components/work/design-project/DesignProjectPrimitives";
import { motionEase } from "@/lib/motion";
import { getProject } from "@/lib/projectRegistry";

const media = (name: string, extension = "png") => `/GMI Companion Pictures/${name}.${extension}`;

function Meta({ label, children, className, delay }: { label: string; children: ReactNode; className: string; delay: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`gmi-meta ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: .58, delay: .28 + delay, ease: motionEase.editorial }}
    >
      <span>{label}</span>
      <strong>{children}</strong>
    </motion.div>
  );
}

function EditorialCopy({ children, className }: { children: string; className: string }) {
  return <p className={`gmi-copy ${className}`}><AnimatedLines text={children} /></p>;
}

function AnimatedComposition({
  className,
  base,
  animation,
  alt,
  width,
  height,
  delay,
}: {
  className: string;
  base: string;
  animation: string;
  alt: string;
  width: number;
  height: number;
  delay: number;
}) {
  return (
    <RevealMedia className={`gmi-animated-composition ${className}`} delay={delay}>
      <div className="gmi-animation-stage">
        <img className="gmi-animation-base" src={media(base)} alt="" aria-hidden="true" draggable={false} />
        <img className="gmi-animation-screen" src={media(animation, "gif")} alt={alt} width={width} height={height} loading="lazy" draggable={false} />
      </div>
    </RevealMedia>
  );
}

export function GmiCompanionProjectPage() {
  const project = getProject("gmi-companion");
  if (!project) return null;

  return (
    <div className="home-page design-project-page gmi-project-page">
      <main>
        <CaseStudyShell as="section" className="gmi-intro" aria-labelledby="gmi-title">
          <h1 id="gmi-title"><AnimatedWords text="GMI Companion" mode="load" delay={.17} stagger={.055} /></h1>
          <Meta className="gmi-meta-year" label="Year" delay={.05}>2026</Meta>
          <Meta className="gmi-meta-company" label="Platform" delay={.09}>Web, Mobile</Meta>
          <Meta className="gmi-meta-skills" label="Role" delay={.13}>Design Direction, Interface Design, Brand &amp; Motion</Meta>
          <p className="gmi-intro-copy"><AnimatedLines delay={.22} text="GMI Companion brings guidance, resources, organizational context, and AI-powered support into one connected experience for mission-driven organizations." /></p>
        </CaseStudyShell>

        <CaseStudyShell className="gmi-composition">
          <ProjectVisual native className="gmi-hero" src={media("Hero")} alt="GMI Companion identity across a red and blue motion gradient" width={2158} height={1080} distance={18} delay={.05} priority projectId={project.id} />

          <EditorialCopy className="gmi-motion-copy">Motion is treated as part of the product language rather than decoration. Light, color, transitions, and the Companion spark create a recognizable rhythm while communicating moments of listening, thinking, transition, and response.</EditorialCopy>

          <div className="gmi-motion-grid">
            <AnimatedComposition className="gmi-motion-01" base="Motion 01" animation="New" alt="Companion spark listening animation" width={786} height={1704} delay={.03} />
            <AnimatedComposition className="gmi-motion-02" base="Motion 02" animation="Motion 02" alt="Companion conversation transition animation" width={786} height={1704} delay={.07} />
            <AnimatedComposition className="gmi-motion-03" base="Motion 03" animation="Motion 03" alt="Companion organizational story animation" width={786} height={1704} delay={.11} />
          </div>

          <EditorialCopy className="gmi-transitions-copy">Transitions are designed as part of the interface itself, using responsive light, pacing, and moments of stillness to make each state feel connected and intentional.</EditorialCopy>

          <ProjectVisual native className="gmi-tablet" src={media("Tablet")} alt="GMI Companion organizational guidance interface on an iPad" width={2150} height={1228} distance={12} delay={.04} />

          <EditorialCopy className="gmi-organization-copy">Complex organizational information is distilled into clear moments of progress, recommendations, and impact. Reduced visual density creates space for reflection when understanding matters more than information volume.</EditorialCopy>

          <AnimatedComposition className="gmi-impact" base="Impact Score" animation="Impact Score" alt="Animated GMI Companion impact score experience" width={786} height={1704} delay={.04} />

          <blockquote className="gmi-quote">“Intelligence should feel native to the experience, not become the experience”</blockquote>

          <div className="gmi-resource-row">
            <ProjectVisual native className="gmi-resources" src={media("Resources")} alt="GMI Companion resource discovery interface" width={1186} height={1260} distance={8} delay={.04} />
            <EditorialCopy className="gmi-resources-copy">Companion extends beyond AI assistance into the wider GMI ecosystem. Resources, organizational knowledge, and guidance are surfaced around what each organization is trying to accomplish.</EditorialCopy>
          </div>

          <ProjectVisual native className="gmi-palette" src={media("Palette")} alt="GMI visual system palette featuring Obsidian, Mission Red, and Horizon Blue" width={2154} height={1034} distance={8} delay={.04} />

          <div className="gmi-identity-row">
            <EditorialCopy className="gmi-identity-copy">The visual system balances institutional credibility with a more expressive digital character. Typography, contrast, scale, restrained surfaces, and moments of bold expression work together to create an experience that feels distinctly GMI while giving Companion an identity of its own.</EditorialCopy>
            <ProjectVisual native className="gmi-identity" src={media("Identity")} alt="GMI Companion identity construction and brand lockups" width={1186} height={1260} distance={-8} delay={.06} />
          </div>
        </CaseStudyShell>

        <NextProject currentSlug={project.slug} />
        <WorkRail shell="case-study" className="design-project-work-rail" />
      </main>
      <SiteFooter />
    </div>
  );
}
