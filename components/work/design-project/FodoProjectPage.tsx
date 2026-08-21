"use client";

import { motion, useReducedMotion } from "motion/react";
import { WorkRail } from "@/components/home/WorkRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { FodoCommentWall } from "@/components/work/design-project/FodoCommentWall";
import { CaseStudyShell, NextProject, ProjectVisual } from "@/components/work/design-project/DesignProjectPrimitives";
import { motionEase } from "@/lib/motion";
import { getProject } from "@/lib/projectRegistry";

const media = (name: string) => `/Fodo Pictures/${name}`;

function Meta({ label, children, delay = 0, className = "" }: { label?: string; children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className={`fodo-meta-field ${className}`.trim()} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .58, delay: .28 + delay, ease: motionEase.editorial }}>
      {label ? <span>{label}</span> : null}<strong>{children}</strong>
    </motion.div>
  );
}

function GifVisual({ name, alt, className, delay }: { name: string; alt: string; className: string; delay: number }) {
  return <ProjectVisual className={className} src={media(name)} alt={alt} width={1558} height={2160} distance={10} delay={delay} />;
}

export function FodoProjectPage() {
  const project = getProject("fodo");
  if (!project || !project.platform || !project.focus || !project.productType || !project.waitlist || !project.madeWith) return null;
  return (
    <div className="home-page design-project-page fodo-project-page">
      <main>
        <CaseStudyShell as="section" className="fodo-intro" aria-labelledby="fodo-title">
          <h1 id="fodo-title"><AnimatedWords text={project.title} mode="load" delay={.17} stagger={.055} /></h1>
          <div className="fodo-meta-row">
            <Meta className="fodo-meta-year" label="Year" delay={.05}>{project.year}</Meta>
            <Meta className="fodo-meta-waitlist" delay={.13}>{project.waitlist}</Meta>
            <Meta className="fodo-meta-type" label="Type" delay={.17}>{project.productType}</Meta>
            <Meta className="fodo-meta-platform" label="Platform" delay={.2}>{project.platform}</Meta>
            <Meta className="fodo-meta-made" label="How it was made" delay={.13}>{project.madeWith.join(", ")}</Meta>
            <Meta className="fodo-meta-focus" label="Focus" delay={.22}>{project.focus.join(", ")}</Meta>
          </div>
        </CaseStudyShell>

        <CaseStudyShell className="fodo-composition">
          <ProjectVisual className="fodo-hero" src={project.hero} alt={project.thumbnailAlt} width={3305} height={2424} distance={18} delay={.05} priority projectId={project.id} />

          <div className="fodo-statement">
            <p><AnimatedLines text="Fodo explores what happens when digital photography feels physical again." delay={.08} /></p>
            <p><AnimatedLines text="Tactile controls, skeuomorphic interactions, sound, and deliberate friction turn a familiar camera interface into something more expressive, playful, and personal." delay={.12} /></p>
          </div>

          <div className="fodo-gif-grid fodo-gif-grid-all">
            <GifVisual name="Temp.gif" alt="Fodo temperature control interaction in motion" className="fodo-gif" delay={.03} />
            <GifVisual name="Flash.gif" alt="Fodo flash interaction in motion" className="fodo-gif" delay={.1} />
            <GifVisual name="Cam.gif" alt="Fodo tactile camera controls in motion" className="fodo-gif" delay={.07} />
            <GifVisual name="Round.gif" alt="Fodo camera dial interaction in motion" className="fodo-gif" delay={.14} />
          </div>
        </CaseStudyShell>

        <FodoCommentWall />

        <NextProject currentSlug={project.slug} />
        <WorkRail shell="case-study" className="design-project-work-rail" />
      </main>
      <SiteFooter />
    </div>
  );
}
