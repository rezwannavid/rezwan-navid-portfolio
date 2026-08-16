"use client";

import { WorkRail } from "@/components/home/WorkRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import {
  CaseStudyShell,
  NextProject,
  ProjectIntro,
  ProjectVisual,
} from "@/components/work/design-project/DesignProjectPrimitives";
import { getProject } from "@/lib/projectRegistry";

const media = (name: string, extension = "png") => `/Drivers App Pictures/${name}.${extension}`;

function DriversCopy({ children, className }: { children: string; className: string }) {
  return (
    <p className={`drivers-copy ${className}`}>
      <AnimatedLines text={children} />
    </p>
  );
}

function AnimatedPhoneVisual({
  className,
  animation,
  alt,
  distance,
  delay,
}: {
  className: string;
  animation: "Blue Onboarding" | "PIN Entry";
  alt: string;
  distance: number;
  delay: number;
}) {
  return (
    <figure className={`design-project-visual drivers-layered-phone ${className}`}>
      <ParallaxMedia className="design-project-visual-depth" distance={distance} velocityResponse reveal revealDelay={delay} revealOffset={30}>
        <div className="drivers-layered-stage">
          <img className="drivers-device-frame" src={media("Driver Device Frame")} alt="" aria-hidden="true" draggable={false} />
          <img className="drivers-animated-screen" src={media(animation, "gif")} alt={alt} loading="lazy" draggable={false} />
        </div>
      </ParallaxMedia>
    </figure>
  );
}

function AnimatedGreenVisual() {
  return (
    <figure className="design-project-visual drivers-green-detail">
      <ParallaxMedia className="design-project-visual-depth" distance={8} velocityResponse reveal revealDelay={.06} revealOffset={30}>
        <div className="drivers-layered-stage">
          <img className="drivers-green-animation" src={media("Green Detail", "gif")} alt="Animated green close-up detail of the RC Drivers experience" loading="lazy" draggable={false} />
        </div>
      </ParallaxMedia>
    </figure>
  );
}

export function DriversAppProjectPage() {
  const project = getProject("drivers-app");
  if (!project) return null;

  return (
    <div className="home-page design-project-page drivers-project-page">
      <main>
        <ProjectIntro
          title="Drivers App"
          description="RC Drivers is the companion app for RideCentric drivers, providing trip details, navigation, and ride management in a streamlined interface designed for use on the move."
          metadata={{
            role: "Product Manager - Experience",
            year: "2026",
            timeline: "6 months",
            responsibilities: "Product Vision, Product Strategy, Discovery, Prioritization, UX Leadership, Stakeholder Alignment, Delivery",
            team: <><span>PM </span>01, <span>Engineers </span>07, <span>QA </span>02, <span>Designer </span>03</>,
          }}
        />

        <CaseStudyShell className="drivers-composition">
          <ProjectVisual
            className="drivers-hero"
            src={media("Drivers Hero")}
            alt="RC Drivers app displayed on a phone beside architectural panels"
            width={1079}
            height={584}
            distance={18}
            delay={.05}
            priority
            projectId={project.id}
            native
          />

          <DriversCopy className="drivers-opening">RC Drivers gives professional drivers a clear view of each journey, from pickup to final drop-off. The experience was designed around one principle: surface what matters now, and keep everything else out of the way</DriversCopy>

          <div className="drivers-blue-pair">
            <ProjectVisual native className="drivers-before-pickup" src={media("Before Pickup")} alt="Driver pickup screen showing the passenger and meeting point" width={456} height={602} distance={9} delay={.03} />
            <ProjectVisual native className="drivers-trip-progress" src={media("Trip In Progress")} alt="Driver trip-in-progress screen showing the route and ride actions" width={456} height={602} distance={-9} delay={.08} />
          </div>

          <DriversCopy className="drivers-journey-copy">A driver’s priorities change throughout a ride. Before pickup, the focus is the passenger and meeting point. Once they’re onboard, it becomes the route, stops, timing, and destination. Instead of showing everything at once, the interface changes with the journey</DriversCopy>

          <div className="drivers-attention-stage">
            <AnimatedPhoneVisual className="drivers-blue-phone" animation="Blue Onboarding" alt="Animated blue RC Drivers onboarding screen" distance={10} delay={.03} />
            <AnimatedPhoneVisual className="drivers-pin-entry" animation="PIN Entry" alt="Animated restricted driver information protected by a six-digit code" distance={-8} delay={.07} />
            <DriversCopy className="drivers-attention-copy">Large actions, restrained information, and strong visual hierarchy were deliberate choices. Drivers often interact with the product between moments of movement, so important decisions needed to be recognizable without demanding prolonged attention</DriversCopy>
            <DriversCopy className="drivers-details-copy">Notes and additional ride details remain accessible without competing with the primary task. Progressive disclosure keeps the main experience focused while giving drivers the context they need when a situation calls for it.</DriversCopy>
            <AnimatedGreenVisual />
          </div>

          <div className="drivers-final-media">
            <ProjectVisual native className="drivers-ride-complete" src={media("Ride Complete")} alt="Ride completion and driver note screens" width={457} height={477} distance={8} delay={.03} />
            <ProjectVisual native className="drivers-home-screen" src={media("Home Screen")} alt="RC Driver app icon on an iPhone home screen" width={457} height={477} distance={-8} delay={.08} />
          </div>
        </CaseStudyShell>

        <NextProject currentSlug={project.slug} />
        <WorkRail shell="case-study" className="design-project-work-rail" />
      </main>
      <SiteFooter />
    </div>
  );
}
