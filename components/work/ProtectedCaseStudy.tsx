"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ContactCTA, EditorialArrow } from "@/components/home/ContactCTA";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { Magnetic } from "@/components/motion/Magnetic";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { TiltLink } from "@/components/motion/TiltLink";
import { ProtectedProjectGate } from "@/components/work/ProtectedProjectGate";
import { motionEase } from "@/lib/motion";

export type ProtectedCaseStudyData = {
  slug: string;
  title: string;
  role: string;
  year: string;
  timeline: string;
  responsibilities: string;
  team: Array<{ label: string; value: string }>;
  statement: string;
  previewImages: Array<{
    src: string;
    alt: string;
    objectPosition?: string;
    depth?: number;
  }>;
};

function MetadataField({ label, value, delay = 0 }: { label: string; value: string; delay?: number }) {
  return <div className="protected-meta-field"><motion.dt initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48, delay, ease: motionEase.editorial }}>{label}</motion.dt><dd><AnimatedLines text={value} delay={delay + .06} /></dd></div>;
}

export function ProtectedCaseStudy({ data }: { data: ProtectedCaseStudyData }) {
  const [hero, ...teasers] = data.previewImages;

  return (
    <main className="protected-case-main">
      <section className="protected-case-preview" aria-labelledby="protected-case-title">
        <div className="protected-case-shell protected-case-header">
          <h1 id="protected-case-title"><AnimatedWords text={data.title} mode="load" delay={.1} /></h1>
          <dl className="protected-meta-left">
            <MetadataField label="Role" value={data.role} delay={.18} />
            <div className="protected-meta-pair"><MetadataField label="Year" value={data.year} delay={.28} /><MetadataField label="Timeline" value={data.timeline} delay={.34} /></div>
          </dl>
          <dl className="protected-meta-right">
            <MetadataField label="Responsibilities" value={data.responsibilities} delay={.22} />
            <div className="protected-team"><motion.dt initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48, delay: .4, ease: motionEase.editorial }}>Team</motion.dt><dd>{data.team.map(({ label, value }, index) => <motion.span key={label} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .42, delay: .47 + index * .04, ease: motionEase.editorial }}><i>{label} </i>{value}{index < data.team.length - 1 ? ", " : ""}</motion.span>)}</dd></div>
          </dl>
          <p className="protected-statement"><AnimatedLines text={data.statement} delay={.4} /></p>
        </div>

        <motion.div className="protected-preview-hero protected-case-shell" data-project-transition-hero={data.slug} initial={{ opacity: 0, y: 24, scale: .985, clipPath: "inset(5% 0 7% 0 round 6px)" }} animate={{ opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0% 0 round 6px)" }} transition={{ duration: .88, delay: .58, ease: motionEase.editorial }}>
          <TiltLink href="#protected-access" className="protected-preview-link" ariaLabel="Go to password access for the full case study" cursorLabel="Unlock" maxRotate={2.4} maxTranslate={2}>
            <span className="protected-preview-mask"><img src={hero.src} alt={hero.alt} style={{ objectPosition: hero.objectPosition ?? "center" }} /></span>
          </TiltLink>
        </motion.div>

        {teasers.length > 0 && <div className="protected-teasers protected-case-shell">{teasers.map((image, index) => <ParallaxMedia key={image.src} className="protected-teaser" distance={image.depth ?? 10 + index * 4} reveal revealDelay={index * .08}><img src={image.src} alt={image.alt} style={{ objectPosition: image.objectPosition ?? "center" }} /></ParallaxMedia>)}</div>}
      </section>

      <ProtectedProjectGate slug={data.slug} />

      <motion.div className="protected-see-work protected-case-shell" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .58, ease: motionEase.editorial }}>
        <Link href="/work" data-cursor="Open"><Magnetic strength={3}><span>see other work</span><EditorialArrow magnetic /></Magnetic></Link>
      </motion.div>

      <ContactCTA variant="portfolio" />
    </main>
  );
}
