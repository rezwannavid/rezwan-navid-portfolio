"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { WorkRail } from "@/components/home/WorkRail";
import {
  CaseStudyShell,
  NextProject,
  ProjectCaption,
  ProjectIntro,
  ProjectStatement,
  ProjectVisual,
} from "@/components/work/design-project/DesignProjectPrimitives";
import { getProject } from "@/lib/projectRegistry";

const picture = (name: string) => `/Eventflow Pictures/${name}.png`;

export function EventFlowProjectPage() {
  const project = getProject("eventflow");
  if (!project) return null;
  return (
    <div className="home-page design-project-page eventflow-project-page">
      <main>
        <ProjectIntro
          title="Eventflow for FIFA World Cup"
          description="EventFlow is a event-aware transportation planning extension for the FIFA World Cup. It helps fans coordinate pickup locations, optimize arrival times, and plan post-match journeys around live events, not just destinations."
          metadata={{
            role: project.role,
            year: project.year,
            timeline: "6 months",
            responsibilities: "Product Vision, Product Strategy, Discovery, Prioritization, UX Leadership, Stakeholder Alignment, Delivery",
            team: <><span>PM </span>01, <span>Engineers </span>07, <span>QA </span>02, <span>Designer </span>03</>,
          }}
        />

        <CaseStudyShell className="eventflow-composition">
          <ProjectVisual className="eventflow-visual-01" src={project.hero} alt={project.thumbnailAlt} width={4316} height={2336} distance={20} delay={.06} priority projectId={project.id} />

          <div className="eventflow-editorial-grid">
            <ProjectVisual className="eventflow-visual-02" src={picture("EventFlow 02")} alt="EventFlow for FIFA World Cup identity" width={1369} height={1344} distance={12} xDistance={-2} delay={.04} />
            <ProjectVisual className="eventflow-visual-04" src={picture("EventFlow 04")} alt="Choose Match interface for selecting a World Cup fixture" width={1371} height={1343} distance={-14} xDistance={2} delay={.12} />
            <ProjectVisual className="eventflow-visual-03" src={picture("EventFlow 03")} alt="Select Venue interface for choosing a World Cup stadium" width={1369} height={1345} distance={15} xDistance={-2} delay={.05} />
            <ProjectCaption className="eventflow-caption-match" delay={.12}>Users already know which match they’re attending, so the journey begins with selecting the venue.</ProjectCaption>
            <ProjectVisual className="eventflow-visual-05" src={picture("EventFlow 05")} alt="Map route between the stadium and pickup location" width={1369} height={1347} distance={-12} xDistance={2} delay={.11} />
            <ProjectCaption className="eventflow-caption-venue" delay={.12}>Users confirm where they’re traveling before deciding when, creating a simpler planning flow.</ProjectCaption>
          </div>

          <ProjectVisual className="eventflow-visual-06" src={picture("EventFewwelow 06")} alt="EventFlow schedule builder on a mobile device" width={2765} height={2445} distance={10} delay={.04} />
          <ProjectStatement text="Fans already know the game. EventFlow handles everything around it, venue, pickup, timing, and the ride itself, as one connected plan." />
          <div className="eventflow-final-grid">
            <ProjectVisual className="eventflow-visual-07" src={picture("EventFlow 07")} alt="EventFlow itinerary confirmation shown on a mobile device" width={2760} height={1806} distance={18} delay={.04} />
            <ProjectVisual className="eventflow-visual-08" src={picture("EvewewentFlow 8")} alt="EventFlow vehicle selection interface" width={1368} height={1806} distance={-14} delay={.1} />
          </div>
        </CaseStudyShell>

        <NextProject currentSlug={project.slug} />
        <WorkRail shell="case-study" className="design-project-work-rail" />
      </main>
      <SiteFooter />
    </div>
  );
}
