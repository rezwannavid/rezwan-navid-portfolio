"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { WorkRail } from "@/components/home/WorkRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { RevealMedia } from "@/components/motion/RevealMedia";
import { NextProject, ProjectVisual } from "@/components/work/design-project/DesignProjectPrimitives";
import { motionEase } from "@/lib/motion";
import { getProject } from "@/lib/projectRegistry";

const media = (name: string) => `/Ruckus Games Pictures/${name}`;

function Meta({ label, children, className = "", delay = 0 }: { label?: string; children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`ruckus-meta-field ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: .58, delay: .28 + delay, ease: motionEase.editorial }}
    >
      {label ? <span>{label}</span> : null}
      <strong>{children}</strong>
    </motion.div>
  );
}

function EditorialText({ children, className }: { children: string; className: string }) {
  return <p className={`ruckus-editorial-text ${className}`}><AnimatedLines text={children} /></p>;
}

function PhoneGif({ group }: { group: 1 | 2 }) {
  return (
    <RevealMedia className={`ruckus-phone-gif ruckus-phone-gif-${group}`} delay={.04}>
      <div className="ruckus-phone-stage">
        <img
          className="ruckus-phone-frame"
          src={media(`phone-frame-group-${group}.png`)}
          alt=""
          width={1317}
          height={2716}
          aria-hidden="true"
        />
        {/* A plain img preserves the original GIF animation without image optimization. */}
        <img
          className="ruckus-phone-animation"
          src={media(`phone-animation-group-${group}.gif`)}
          alt={group === 1 ? "Animated word prompt reveal inside the Ruckus phone interface" : "Animated game progress reveal inside the Ruckus phone interface"}
          width={group === 1 ? 394 : 786}
          height={group === 1 ? 848 : 1696}
        />
      </div>
    </RevealMedia>
  );
}

function SquareGif({ index }: { index: 1 | 2 | 3 }) {
  return (
    <RevealMedia className={`ruckus-square-gif ruckus-square-gif-${index}`} delay={.05 + index * .03}>
      <img
        src={media(`interaction-animation-${index}.gif`)}
        alt={`Ruckus game micro-interaction ${index} in motion`}
        width={index === 1 ? 1462 : index === 2 ? 1358 : 1444}
        height={index === 1 ? 1462 : index === 2 ? 1358 : 1444}
      />
    </RevealMedia>
  );
}

export function RuckusGamesProjectPage() {
  const project = getProject("ruckus-games");
  if (!project?.nextProjectId) return null;

  return (
    <div className="home-page design-project-page ruckus-project-page">
      <main>
        <section className="ruckus-intro" aria-labelledby="ruckus-title">
          <h1 id="ruckus-title"><AnimatedWords text={project.title} mode="load" delay={.17} stagger={.055} /></h1>
          <div className="ruckus-meta-row">
            <Meta className="ruckus-meta-year" label="Year" delay={.05}>{project.year}</Meta>
            <Meta className="ruckus-meta-timeline" label="Timeline" delay={.09}>3 weeks</Meta>
            <Meta className="ruckus-meta-status" delay={.13}>v1 Shipped</Meta>
            <Meta className="ruckus-meta-type" label="Type" delay={.17}>Product Exploration with AI</Meta>
            <Meta className="ruckus-meta-made" label="How it was made" delay={.13}>Claude, Cursor, Vercel, Figma, Railway, v0</Meta>
          </div>
        </section>

        <div className="ruckus-composition">
          <ProjectVisual className="ruckus-hero" src={media("EventFlow 01.png")} alt={project.thumbnailAlt} width={4447} height={2625} distance={18} delay={.05} priority projectId={project.id} />

          <p className="ruckus-opening"><AnimatedLines text="A free multiplayer party-game platform that makes game nights effortless. Players can instantly join from their phones, no app download required, and enjoy fast, social experiences designed to bring friends together." delay={.08} /></p>

          <div className="ruckus-brand-grid">
            <ProjectVisual className="ruckus-brand-party" src={media("Frame 1000004843.png")} alt="Friends playing together with the message party starts here" width={1564} height={1552} distance={8} delay={.03} />
            <ProjectVisual className="ruckus-brand-mark" src={media("Frame 1000004842.png")} alt="Ruckus Games coral identity card" width={1564} height={1552} distance={-8} delay={.07} />
            <ProjectVisual className="ruckus-room" src={media("Frame 1000004835.png")} alt="Ruckus Games room interface on an orange phone" width={2100} height={3128} distance={10} delay={.09} />
          </div>

          <EditorialText className="ruckus-ai-statement">Rather than using AI to generate ideas, I built the product vision first and used AI to execute it faster. Design systems, product documentation, and structured context allowed tools like Codex and Claude Code to translate intent into production-ready features.</EditorialText>

          <ProjectVisual className="ruckus-journey" src={media("Frame 1000004838.png")} alt="Four Ruckus screens showing the complete Wavelength game journey" width={4320} height={2460} distance={10} delay={.04} />

          <EditorialText className="ruckus-micro-statement">Micro interactions were a big part to make it feel like a game worth playing around with</EditorialText>

          <div className="ruckus-interaction-grid">
            <PhoneGif group={1} />
            <SquareGif index={3} />
            <SquareGif index={1} />
            <SquareGif index={2} />
          </div>

          <EditorialText className="ruckus-pacing-statement">Interactions controlled the game’s pacing and made each moment of progress feel rewarding.</EditorialText>

          <PhoneGif group={2} />

          <EditorialText className="ruckus-feedback-statement">Player feedback revealed just how critical visual cues are to shaping the overall experience</EditorialText>

          <div className="ruckus-feedback-grid">
            <ProjectVisual className="ruckus-feedback-v1" src={media("Frame 1000004836.png")} alt="First version of the Ruckus voting screen" width={1832} height={3056} distance={8} delay={.03} />
            <ProjectVisual className="ruckus-feedback-v2" src={media("Frame 1000004837.png")} alt="Second version of the Ruckus voting screen with stronger visual cues" width={1836} height={3056} distance={-8} delay={.09} />
          </div>
        </div>

        <NextProject projectId={project.nextProjectId} />
        <WorkRail className="design-project-work-rail" />
      </main>
      <SiteFooter />
    </div>
  );
}
