"use client";

import { WorkRail } from "@/components/home/WorkRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import {
  CaseStudyShell,
  NextProject,
  ProjectIntro,
  ProjectVisual,
} from "@/components/work/design-project/DesignProjectPrimitives";
import { getProject } from "@/lib/projectRegistry";

const media = (name: string) => `/HeavyGari Pictures/${name}.png`;

function HeavyGariCopy({ children, className }: { children: string; className: string }) {
  return <p className={`heavygari-copy ${className}`}><AnimatedLines text={children} /></p>;
}

export function HeavyGariProjectPage() {
  const project = getProject("heavygari");
  if (!project) return null;

  return (
    <div className="home-page design-project-page heavygari-project-page">
      <main>
        <ProjectIntro
          title={project.title}
          description="HeavyGari made booking a truck for moving goods, shifting homes, or transporting larger loads feel as straightforward as booking a ride."
          metadata={{
            role: project.role,
            year: project.year,
            timeline: project.timeline ?? "",
            responsibilities: "Product Design, Brand Design",
            team: <><span>PM </span>01, <span>Engineers </span>03, <span>QA </span>01, <span>Designer </span>01</>,
          }}
        />

        <CaseStudyShell className="heavygari-composition">
          <ProjectVisual native priority projectId={project.id} className="heavygari-hero" src={media("Hero")} alt="HeavyGari truck crossing an open landscape" width={3237} height={1752} distance={18} delay={.05} />

          <HeavyGariCopy className="heavygari-opening">Moving needs can vary significantly, from sending a few goods across the city to relocating an entire home. The booking experience starts with the job rather than asking people to understand truck types or logistics terminology.</HeavyGariCopy>

          <div className="heavygari-first-pair">
            <ProjectVisual native src={media("Introduction")} alt="HeavyGari introduction screen in a phone mockup" width={1368} height={1806} className="heavygari-introduction" distance={9} delay={.03} />
            <ProjectVisual native src={media("Home")} alt="HeavyGari home and booking entry screen in a phone mockup" width={1368} height={1806} className="heavygari-home" distance={-9} delay={.08} />
          </div>

          <HeavyGariCopy className="heavygari-journey">Every move starts differently, but the questions are simple: what needs to move, from where, and to where? The experience was built around those decisions first, introducing vehicles and logistics only when they became relevant.</HeavyGariCopy>

          <div className="heavygari-editorial-stage">
            <ProjectVisual native src={media("Vehicle Selection")} alt="HeavyGari vehicle and service selection screen" width={1368} height={1806} className="heavygari-vehicle" distance={10} delay={.03} />
            <ProjectVisual native src={media("Statement")} alt="Truck, anywhere, truck where needed" width={1368} height={936} className="heavygari-statement-card" distance={-6} delay={.06} />
            <HeavyGariCopy className="heavygari-selection-copy">Instead of expecting people to understand truck sizes and capacities, HeavyGari helps them choose based on what they’re actually moving, from a few boxes to an entire home.</HeavyGariCopy>
            <HeavyGariCopy className="heavygari-vehicle-copy">Vehicle choices communicate what they can carry, how much they cost, and what they’re best suited for, making an unfamiliar decision easier to make with confidence.</HeavyGariCopy>
            <ProjectVisual native src={media("Booking Management")} alt="HeavyGari order and booking management screen" width={1368} height={1806} className="heavygari-booking-management" distance={-8} delay={.08} />
            <HeavyGariCopy className="heavygari-booking-copy">Know what’s happening. Active and scheduled bookings bring the journey into one place, route, vehicle, driver, timing and status, so the next step is always clear.</HeavyGariCopy>
            <ProjectVisual native src={media("Booking Details")} alt="HeavyGari booking details screen" width={1368} height={1806} className="heavygari-booking-details" distance={8} delay={.04} />
            <ProjectVisual native src={media("Tracking")} alt="HeavyGari booking progression and tracking screen" width={1368} height={1479} className="heavygari-tracking" distance={-8} delay={.08} />
          </div>

          <HeavyGariCopy className="heavygari-closing">HeavyGari explored how a fragmented, traditionally offline service could become a simple digital experience, removing the complexity between needing something moved and getting it there.</HeavyGariCopy>
        </CaseStudyShell>

        <NextProject currentSlug={project.slug} />
        <WorkRail shell="case-study" className="design-project-work-rail" />
      </main>
      <SiteFooter />
    </div>
  );
}
