"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes, ReactNode } from "react";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { ProjectLink } from "@/components/motion/ProjectTransition";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { motionEase } from "@/lib/motion";
import { getNextPublishedProject, getProject, type ProjectId } from "@/lib/projectRegistry";

export type DesignProjectMetadata = {
  role: string;
  year: string;
  timeline: string;
  responsibilities: string;
  team: ReactNode;
};

type CaseStudyShellProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section";
};

export function CaseStudyShell({ as: Tag = "div", className = "", children, ...props }: CaseStudyShellProps) {
  return <Tag className="case-study-shell" {...props}><div className={className}>{children}</div></Tag>;
}

function MetadataField({ label, children, className = "", delay = 0 }: { label: string; children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`design-project-meta-field ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: .58, delay: .28 + delay, ease: motionEase.editorial }}
    >
      <span className="design-project-meta-label">{label}</span>
      <span className="design-project-meta-value">{children}</span>
    </motion.div>
  );
}

export function ProjectIntro({ title, description, metadata }: { title: string; description: string; metadata: DesignProjectMetadata }) {
  return (
    <CaseStudyShell as="section" className="design-project-intro" aria-labelledby="design-project-title">
      <h1 id="design-project-title"><AnimatedWords text={title} mode="load" delay={.17} stagger={.055} /></h1>
      <div className="design-project-meta-left">
        <MetadataField label="Role" delay={.05}>{metadata.role}</MetadataField>
        <div className="design-project-meta-pair">
          <MetadataField label="Year" delay={.11}>{metadata.year}</MetadataField>
          <MetadataField label="Timeline" delay={.15}>{metadata.timeline}</MetadataField>
        </div>
      </div>
      <div className="design-project-meta-right">
        <MetadataField label="Responsibilities" delay={.09}>{metadata.responsibilities}</MetadataField>
        <MetadataField label="Team" delay={.17}>{metadata.team}</MetadataField>
      </div>
      <p className="design-project-description"><AnimatedLines text={description} delay={.24} /></p>
    </CaseStudyShell>
  );
}

export function ProjectVisual({
  src,
  alt,
  width,
  height,
  className = "",
  distance = 14,
  xDistance = 0,
  delay = 0,
  priority = false,
  projectId,
  native = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  distance?: number;
  xDistance?: number;
  delay?: number;
  priority?: boolean;
  projectId?: ProjectId;
  native?: boolean;
}) {
  const transitionProject = projectId ? getProject(projectId) : null;
  return (
    <figure className={`design-project-visual ${className}`.trim()} data-project-transition-hero={transitionProject?.slug}>
      <ParallaxMedia className="design-project-visual-depth" distance={distance} xDistance={xDistance} velocityResponse reveal revealDelay={delay} revealOffset={30}>
        {native ? (
          <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} />
        ) : (
          <Image unoptimized priority={priority} src={src} alt={alt} width={width} height={height} sizes="(min-width: 1000px) 920px, calc(100vw - 40px)" />
        )}
      </ParallaxMedia>
    </figure>
  );
}

export function ProjectCaption({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.p className={`design-project-caption ${className}`.trim()} initial={reduceMotion ? false : { opacity: 0, y: 8 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .62, delay, ease: motionEase.editorial }}>
      {children}
    </motion.p>
  );
}

export function ProjectStatement({ text }: { text: string }) {
  return <p className="design-project-statement"><AnimatedLines text={text} /></p>;
}

export function NextProject({ currentSlug }: { currentSlug: string }) {
  const project = getNextPublishedProject(currentSlug);
  if (!project) return null;
  return (
    <section className="design-project-next" aria-labelledby="next-project-title">
      <h2 id="next-project-title"><AnimatedWords text="next project" /></h2>
      <motion.div initial={{ opacity: 0, y: 20, clipPath: "inset(12% 0 20% 0 round 8px)" }} whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0 round 8px)" }} viewport={{ once: true, amount: .2 }} transition={{ duration: .78, ease: motionEase.editorial }}>
        <ProjectLink className="design-project-next-link" href={project.href} projectId={project.id} data-cursor="View">
          <ProjectMedia project={project} context="small" />
          <span>{project.title}</span>
        </ProjectLink>
      </motion.div>
    </section>
  );
}
