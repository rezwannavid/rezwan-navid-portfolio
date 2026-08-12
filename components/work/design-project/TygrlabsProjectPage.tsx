"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WorkRail } from "@/components/home/WorkRail";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { CaseStudyShell, NextProject, ProjectVisual } from "@/components/work/design-project/DesignProjectPrimitives";
import { motionEase } from "@/lib/motion";
import { getProject } from "@/lib/projectRegistry";

const media = (name: string) => `/Tygrlabs Pictures/${name}`;

function Meta({ label, children, className = "", delay = 0 }: { label: string; children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`tygr-meta ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: .58, delay: .28 + delay, ease: motionEase.editorial }}
    >
      <span>{label}</span>
      <strong>{children}</strong>
    </motion.div>
  );
}

function EditorialCopy({ children, className = "" }: { children: string | string[]; className?: string }) {
  if (Array.isArray(children)) {
    return <div className={`tygr-copy ${className}`.trim()}>{children.map((paragraph) => <p key={paragraph}><AnimatedLines text={paragraph} /></p>)}</div>;
  }
  return <p className={`tygr-copy ${className}`.trim()}><AnimatedLines text={children} /></p>;
}

export function TygrlabsProjectPage() {
  const project = getProject("tygrlabs");
  if (!project || !project.timeline || !project.productType) return null;

  return (
    <div className="home-page design-project-page tygr-project-page">
      <main>
        <CaseStudyShell as="section" className="tygr-intro" aria-labelledby="tygr-title">
          <h1 id="tygr-title"><AnimatedWords text={project.title} mode="load" delay={.17} stagger={.055} /></h1>
          <div className="tygr-meta-row">
            <Meta label="Year" className="tygr-meta-year" delay={.05}>{project.year}</Meta>
            <Meta label="Timeline" className="tygr-meta-timeline" delay={.1}>{project.timeline}</Meta>
            <Meta label="Type" className="tygr-meta-type" delay={.15}>{project.productType}</Meta>
            <Meta label="My role" className="tygr-meta-role" delay={.2}>{project.role}</Meta>
          </div>
        </CaseStudyShell>

        <CaseStudyShell className="tygr-opening-shell">
          <ProjectVisual
            className="tygr-opening-hero"
            src={media("opening-hero.png")}
            alt="TygrLabs identity mark over a red, green, yellow, and warm neutral gradient"
            width={2224}
            height={874}
            distance={18}
            delay={.05}
            priority
            projectId={project.id}
          />
        </CaseStudyShell>

        <CaseStudyShell className="tygr-composition">
          <EditorialCopy className="tygr-opening-copy">{[
            "A new identity for a product studio working across design, technology, and emerging ideas.",
            "The system was built to give Tygrlabs a stronger point of view, bold enough to be recognizable, but flexible enough to live across products, digital experiences, and everything the studio creates next.",
          ]}</EditorialCopy>

          <section className="tygr-existing-row" aria-labelledby="tygr-existing-title">
            <ProjectVisual className="tygr-existing-visual" src={media("existing-brand.png")} alt="The existing RC Tech brand mark" width={905} height={626} distance={10} delay={.04} />
            <div className="tygr-existing-copy">
              <h2 id="tygr-existing-title">Existing Brand</h2>
              <EditorialCopy>Tygrlabs had evolved far beyond its original identity. As the studio expanded its capabilities, the brand needed to reflect a broader and more ambitious practice rather than a single discipline. The goal wasn’t to simply redesign the logo. It was to create a visual language capable of growing with the studio.</EditorialCopy>
            </div>
          </section>

          <div className="tygr-identity-grid">
            <ProjectVisual src={media("identity-tygr.png")} alt="TygrLabs identity application with team photography and tygr wordmark" width={598} height={914} distance={12} delay={.02} />
            <ProjectVisual src={media("identity-gradient.png")} alt="TygrLabs red and green atmospheric gradient" width={600} height={914} distance={-10} delay={.07} />
            <ProjectVisual src={media("identity-blood.png")} alt="TygrLabs identity application with blood wordmark and team photography" width={598} height={914} distance={11} delay={.12} />
          </div>

          <EditorialCopy className="tygr-identity-copy">The identity lives between structure and experimentation. A restrained typographic foundation creates consistency, while expressive imagery, saturated color, and unexpected compositions give the brand its energy. The result feels deliberate without becoming overly polished or predictable.</EditorialCopy>

          <ProjectVisual className="tygr-full-visual tygr-construction" src={media("construction-grid.png")} alt="Geometric construction grid for the TygrLabs identity mark" width={1844} height={932} distance={10} delay={.04} />
          <ProjectVisual className="tygr-full-visual tygr-palette" src={media("logo-grid.gif")} alt="Animated TygrLabs palette of warm neutral, yellow, black, and red" width={1834} height={932} distance={8} delay={.04} native />

          <EditorialCopy className="tygr-centered-copy tygr-mark-copy">The mark was constructed around simple geometric relationships, creating a recognizable form that can be repeated, cropped, scaled, and reinterpreted. Instead of treating the logo as a static signature, the geometry became part of the broader visual language.</EditorialCopy>

          <ProjectVisual className="tygr-full-visual tygr-typography" src={media("rc-tech.gif")} alt="Animated oversized TygrLabs typographic specimen" width={1844} height={912} distance={8} delay={.03} native />
          <EditorialCopy className="tygr-centered-copy tygr-type-copy">{[
            "The typographic system moves between quiet, functional information and oversized editorial expression.",
            "Large type becomes an image in itself, while smaller typography keeps product, business, and technical communication clear and structured.",
          ]}</EditorialCopy>

          <div className="tygr-color-grid">
            <ProjectVisual src={media("hero-gradient.gif")} alt="Animated TygrLabs color study with red, green, and yellow" width={740} height={1168} distance={10} delay={.02} native />
            <ProjectVisual src={media("identity-collage.gif")} alt="Animated TygrLabs neutral color study" width={1082} height={1168} distance={-8} delay={.08} native />
          </div>
          <EditorialCopy className="tygr-centered-copy tygr-palette-copy">A compact palette keeps the identity immediate and recognizable. Warm neutrals establish the foundation, while yellow, red, and black create contrast and give the system its characteristic energy.</EditorialCopy>

          <ProjectVisual className="tygr-full-visual tygr-digital" src={media("digital-application.png")} alt="TygrLabs website displayed on an iPad over an atmospheric yellow and green field" width={1844} height={1014} distance={13} delay={.03} />
          <EditorialCopy className="tygr-centered-copy tygr-digital-copy">{[
            "The digital identity extends the same principles into interaction. Typography shifts in scale, gradients become atmospheric spaces, and graphic elements respond through movement.",
            "Motion isn’t added as decoration. It gives the identity another dimension and makes the brand feel alive on screen.",
          ]}</EditorialCopy>

          <ProjectVisual className="tygr-website" src={media("website.png")} alt="TygrLabs website interface featuring the be a tygr message" width={1220} height={793} distance={8} delay={.04} />
          <ProjectVisual className="tygr-full-visual tygr-graphic" src={media("graphic-system.gif")} alt="Animated TygrLabs graphic system with a responsive black circle on a red grid" width={2830} height={2160} distance={8} delay={.03} native />

          <EditorialCopy className="tygr-centered-copy tygr-physical-copy">The system was intentionally created to work beyond digital interfaces. Strong typography, simple geometry, and high-contrast color translate naturally into printed matter, merchandise, environmental graphics, and physical objects.</EditorialCopy>

          <div className="tygr-physical-grid">
            <ProjectVisual className="tygr-poster" src={media("poster-crop.png")} alt="TygrLabs geometric poster in a minimalist office" width={1178} height={902} distance={12} delay={.03} />
            <ProjectVisual className="tygr-card" src={media("business-card-crop.png")} alt="TygrLabs patterned business card held over a pinstripe suit" width={640} height={902} distance={-10} delay={.09} />
          </div>

          <div className="tygr-final-copy">
            <EditorialCopy>The final system gives Tygrlabs a recognizable foundation without locking the brand into a single visual style.</EditorialCopy>
            <EditorialCopy>It can be precise or expressive, quiet or loud, digital or physical—while still feeling like the same brand.</EditorialCopy>
            <EditorialCopy>One system. Many expressions.</EditorialCopy>
          </div>

          <ProjectVisual className="tygr-full-visual tygr-locations" src={media("locations.png")} alt="TygrLabs graphic system for Dallas, Dhaka, and Kathmandu" width={1844} height={952} distance={10} delay={.03} />
        </CaseStudyShell>

        <NextProject currentSlug={project.slug} />
        <WorkRail shell="case-study" className="design-project-work-rail" />
      </main>
      <SiteFooter />
    </div>
  );
}
