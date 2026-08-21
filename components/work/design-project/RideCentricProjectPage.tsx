"use client";

import Link from "next/link";
import { Children, isValidElement, useLayoutEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { RevealMedia } from "@/components/motion/RevealMedia";
import { WorkRail } from "@/components/home/WorkRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NextProject } from "@/components/work/design-project/DesignProjectPrimitives";

const DESIGN_WIDTH = 1280;
const CAPTURE_CHROME_HEIGHT = 52;
const DESIGN_HEIGHT = 15473 - CAPTURE_CHROME_HEIGHT;

function textLines(children: ReactNode) {
  const lines: ReactNode[][] = [[]];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === "br") lines.push([]);
    else lines[lines.length - 1].push(child);
  });
  return lines;
}

function EstablishedTextMotion({ children, byLine }: { children: ReactNode; byLine: boolean }) {
  const lines = textLines(children);

  if (byLine) {
    return <>{lines.map((line, index) => (
      <span className="rcx-text-line" key={index}>
        <AnimatedLines
          className="rcx-line-reveal"
          delay={index * .12}
          text={line.map((part) => typeof part === "string" || typeof part === "number" ? String(part) : "").join("")}
        />
      </span>
    ))}</>;
  }

  return <>{lines.map((line, lineIndex) => (
    <AnimatedWords
      className="rcx-text-line rcx-word-reveal"
      key={lineIndex}
      text={line.map((part) => typeof part === "string" || typeof part === "number" ? String(part) : "").join("")}
      stagger={.045}
    />
  ))}</>;
}

function Positioned({
  children,
  className = "",
  x,
  y,
  width,
  style,
}: {
  children: ReactNode;
  className?: string;
  x: number;
  y: number;
  width?: number;
  style?: CSSProperties;
}) {
  const byLine = /rcx-(?:meta|body|label|contributions|contribution-label|next-label|footer-credit)/.test(className);
  const exactY = y >= 567 && y < 13400 ? y + 26 : y;
  return (
    <div
      className={`rcx-positioned ${className}`.trim()}
      style={{ left: x, top: exactY, width, ...style }}
    ><EstablishedTextMotion byLine={byLine}>{children}</EstablishedTextMotion></div>
  );
}

function GreenBlock({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return (
    <div className="rcx-green-shell" style={{ left: x, top: y + 26, width, height }}>
      <ParallaxMedia className="rcx-green" distance={14} velocityResponse reveal revealOffset={30}>
        <span className="rcx-green-fill" />
      </ParallaxMedia>
    </div>
  );
}

function ResponsiveGreen({ className = "" }: { className?: string }) {
  return (
    <div className={`rcxr-green ${className}`.trim()}>
      <ParallaxMedia className="rcxr-green-depth" distance={10} velocityResponse reveal revealOffset={30}>
        <span />
      </ParallaxMedia>
    </div>
  );
}

function ResponsiveLabel({ children }: { children: string }) {
  return <p className="rcxr-label"><AnimatedLines text={children} /></p>;
}

function ResponsiveHeading({ children, className = "" }: { children: string; className?: string }) {
  return <h2 className={`rcxr-heading ${className}`.trim()}><AnimatedWords text={children} /></h2>;
}

function ResponsiveBody({ children, className = "" }: { children: string; className?: string }) {
  return <p className={`rcxr-body ${className}`.trim()}><AnimatedLines text={children} /></p>;
}

function ResponsiveRideCentric() {
  return (
    <div className="rcx-responsive-page">
      <main className="rcxr-main">
        <section className="rcxr-shell rcxr-hero" aria-labelledby="rcxr-title">
          <div className="rcxr-hero-primary">
            <h1 id="rcxr-title"><AnimatedWords text="RideCentric+" mode="load" delay={.12} /></h1>
            <div className="rcxr-meta-core">
              <div><span>Role</span><strong>Product Manager</strong></div>
              <div><span>Year</span><strong>2025</strong></div>
              <div><span>Timeline</span><strong>4 months</strong></div>
            </div>
            <p className="rcxr-intro"><AnimatedLines text="Designing an enterprise mobility platform for corporate travel, events, and transportation operations." /></p>
          </div>
          <div className="rcxr-meta-side">
            <div><span>Responsibilities</span><strong>Product Vision, Product Strategy, Discovery, Prioritization, UX Leadership, Stakeholder Alignment, Delivery</strong></div>
            <div><span>Team</span><strong>PM 01, Engineers 07,<br />QA 02, Designer 03</strong></div>
          </div>
          <div className="rcxr-hero-media"><ParallaxMedia className="rcxr-media-depth" distance={16} velocityResponse reveal revealDelay={.06} revealOffset={30}><img src="/ridecentric-exact/ridecentric-plus-hero-hd.png" alt="RideCentric+ dashboard shown in a desktop display mockup" /></ParallaxMedia></div>
        </section>

        <section className="rcxr-shell rcxr-opening">
          <ResponsiveHeading className="rcxr-opening-heading">Moving one person is a ride problem. Moving 100 people is an operations problem.</ResponsiveHeading>
          <ResponsiveBody className="rcxr-lead">RideCentric+ gives organizations one place to coordinate complex transportation across passengers, schedules, events, teams and fulfilment partners.</ResponsiveBody>
          <ResponsiveBody>RideCentric had spent years managing premium transportation through a network of operations teams, affiliates and drivers. RideCentric+ was the next step: turning that operational capability into a customer-facing enterprise platform without disrupting the system already moving people every day.</ResponsiveBody>
        </section>

        <section className="rcxr-shell rcxr-problem">
          <ResponsiveLabel>Problem</ResponsiveLabel>
          <ResponsiveHeading>Imagine coordinating 100 people moving from different places, to different places, at different times.</ResponsiveHeading>
          <ResponsiveBody className="rcxr-lead">The complexity isn’t booking individual rides. It’s keeping every passenger, schedule and fulfilment partner coordinated as plans change.</ResponsiveBody>
          <ResponsiveGreen className="rcxr-visual-wide rcxr-problem-visual" />
          <ResponsiveBody className="rcxr-problem-body">Consumer ride-hailing is optimized around an individual requesting a ride. Enterprise transportation works differently, the booker may never enter the vehicle, passengers may never create accounts, companies may pay centrally, rides can be scheduled weeks ahead, and operations or affiliates may coordinate fulfillment. Once dozens of journeys belong to the same organization or event, managing transportation one ride at a time stops working.</ResponsiveBody>
          <div className="rcxr-positioning">
            <div><ResponsiveLabel>Positioning</ResponsiveLabel><ResponsiveHeading>We weren’t building a better uber or lyft</ResponsiveHeading></div>
            <ResponsiveGreen className="rcxr-positioning-visual" />
            <ResponsiveHeading className="rcxr-callout">Built for a problem ride-hailing was never designed to solve.</ResponsiveHeading>
            <ResponsiveBody>RideCentric+ was positioned around coordinated enterprise transportation: modern enough to give customers the visibility and usability they expected, but structured around organizations, events, passengers, financial oversight and managed fulfilment. The opportunity wasn’t to make enterprise transportation behave like consumer ride-hailing; it was to bring consumer-grade clarity to a fundamentally different operating model.</ResponsiveBody>
          </div>
        </section>

        <section className="rcxr-shell rcxr-research">
          <div><ResponsiveLabel>Research &amp; Strategy</ResponsiveLabel><ResponsiveHeading>We found problems everywhere. The harder question was where to start.</ResponsiveHeading></div>
          <ResponsiveGreen className="rcxr-visual-wide" />
          <ResponsiveBody className="rcxr-lead">Bookers, passengers, drivers, affiliates and operations all experienced different failures in the same transportation system.</ResponsiveBody>
        </section>

        <section className="rcxr-decisions">
          <div className="rcxr-shell"><ResponsiveHeading className="rcxr-chapter-title">Product Decisions</ResponsiveHeading></div>
          <div className="rcxr-shell rcxr-decision-one">
            <ResponsiveHeading>Fix the source of coordination first.</ResponsiveHeading>
            <ResponsiveGreen />
            <ResponsiveBody>Instead of redesigning every side of the platform at once, we prioritized the booker, the point where much of the transportation structure originates.</ResponsiveBody>
            <ResponsiveBody className="rcxr-lead">Better inputs create better operations downstream.</ResponsiveBody>
          </div>
          <div className="rcxr-shell rcxr-decision-two">
            <ResponsiveGreen />
            <ResponsiveHeading className="rcxr-visibility">Visibility before automation</ResponsiveHeading>
            <ResponsiveBody>The obvious modernization path was self-service booking. Research showed that replacing the existing workflow immediately would remove operational knowledge before the product had learned enough to replace it.</ResponsiveBody>
          </div>
          <div className="rcxr-shell"><ResponsiveHeading className="rcxr-statement">Introduce value before asking people to change behaviour.</ResponsiveHeading></div>
        </section>

        <section className="rcxr-shell rcxr-roadmap">
          <div><ResponsiveLabel>Roadmap</ResponsiveLabel><ResponsiveHeading>Build today’s product without designing ourselves out of tomorrow’s.</ResponsiveHeading></div>
          <ResponsiveGreen />
          <ResponsiveBody className="rcxr-lead">We used the Three Horizons framework to separate immediate customer value from platform foundations and longer-term automation.</ResponsiveBody>
        </section>

        <section className="rcxr-architecture">
          <div className="rcxr-shell rcxr-architecture-intro"><ResponsiveLabel>Product Architecture</ResponsiveLabel><ResponsiveHeading>A ride was the unit of execution. The event became the unit of coordination.</ResponsiveHeading></div>
          <div className="rcxr-shell"><ResponsiveGreen className="rcxr-architecture-main" /></div>
          <div className="rcxr-shell rcxr-architecture-split">
            <ResponsiveHeading>Some interface problems couldn’t be solved in the interface.</ResponsiveHeading>
            <ResponsiveGreen />
            <ResponsiveBody className="rcxr-lead">Enterprise customers needed teams, permissions and different levels of access. The existing organizational model wasn’t structured to support them.</ResponsiveBody>
          </div>
        </section>

        <section className="rcxr-shell rcxr-delivery">
          <ResponsiveLabel>Delivery Strategy</ResponsiveLabel>
          <ResponsiveHeading>Rebuild the foundation without stopping the operation.</ResponsiveHeading>
          <ResponsiveBody className="rcxr-lead">RideCentric+ was being introduced into a live transportation business. A cleaner architecture wasn’t worth destabilizing the system customers already depended on.</ResponsiveBody>
          <ResponsiveBody>Rather than forcing an immediate migration, the legacy portal and RideCentric+ operated in parallel over shared operational infrastructure while customers progressively moved into the new model. This increased implementation complexity in the short term, but reduced migration risk and protected continuity while the new enterprise architecture was proven in production.</ResponsiveBody>
        </section>

        <section className="rcxr-shell rcxr-design-system">
          <ResponsiveLabel>Design System</ResponsiveLabel>
          <ResponsiveGreen className="rcxr-design-main" />
          <div className="rcxr-design-secondary"><ResponsiveGreen /><ResponsiveBody className="rcxr-lead">As the product expanded across rides, events, passengers, teams, permissions and finance, consistency became an operational requirement, not simply a visual one.</ResponsiveBody></div>
        </section>

        <section className="rcxr-shell rcxr-platform">
          <ResponsiveLabel>Platform Thinking</ResponsiveLabel>
          <ResponsiveHeading>The same transportation state had to serve people doing fundamentally different jobs.</ResponsiveHeading>
          <ResponsiveBody className="rcxr-lead">RideCentric+ was being introduced into a live transportation business. A cleaner architecture wasn’t worth destabilizing the system customers already depended on.</ResponsiveBody>
          <ResponsiveGreen />
          <ResponsiveBody>A booker needs to understand the operation, a passenger needs confidence about their journey, and a driver needs the next actionable instruction. We kept the underlying ride state consistent while designing each experience around the information and decisions relevant to that user, allowing the wider platform to share a system without forcing everyone into the same interface.</ResponsiveBody>
        </section>

        <section className="rcxr-shell rcxr-outcome">
          <ResponsiveLabel>Outcome</ResponsiveLabel>
          <ResponsiveHeading>From ride visibility to enterprise control.</ResponsiveHeading>
          <ResponsiveBody className="rcxr-lead">RideCentric+ shipped a stronger enterprise layer around the transportation operation while establishing the structure needed for the platform to continue evolving.</ResponsiveBody>
          <ResponsiveBody>Customers gained greater visibility into events, passengers and rides; organizations gained stronger team and role structures; and the product moved from a flat reservation model toward coordinated transportation management. Just as importantly, the underlying architecture created a clearer path toward deeper self-service, automation and connected driver and affiliate experiences.</ResponsiveBody>
        </section>

        <section className="rcxr-reflection">
          <div className="rcxr-shell"><ResponsiveHeading className="rcxr-reflection-title">Reflection</ResponsiveHeading></div>
          <div className="rcxr-shell rcxr-reflection-content">
            <ResponsiveGreen />
            <div className="rcxr-reflection-copy">
              <ResponsiveHeading className="rcxr-role-heading">The most ambitious solution isn’t always the right next solution.</ResponsiveHeading>
              <ResponsiveBody className="rcxr-lead">RideCentric+ changed how I think about modernization in operational products: progress can come from exposing value before replacing behaviour.</ResponsiveBody>
              <ResponsiveBody>The existing workflow contained years of operational knowledge that the software had not yet captured. Rather than treating that behaviour as legacy friction to eliminate, we used it as information. By strengthening the structure underneath the product, increasing customer visibility and sequencing automation behind what we learned, we could move the platform forward without pretending the complexity didn’t exist.</ResponsiveBody>
              <div className="rcxr-role"><ResponsiveLabel>My Role</ResponsiveLabel><ResponsiveHeading className="rcxr-role-heading">Product to Design</ResponsiveHeading><ResponsiveBody>My role spanned product management, product strategy and design leadership. I contributed to customer and stakeholder research, roadmap prioritization, the demand-side strategy, enterprise architecture decisions, events and role-based access, rollout planning and future automation strategy. Alongside that work, I helped lead the product experience, from information architecture and flows to interface design, interaction patterns and the broader design system.</ResponsiveBody></div>
              <div className="rcxr-contributions"><ResponsiveLabel>Contributions</ResponsiveLabel><ResponsiveBody className="rcxr-contribution-list">{"Research & synthesis\nProduct strategy\nThree Horizons roadmap\nPrioritization\nEnterprise architecture\nInformation architecture\nUX/UI\nInteraction design\nDesign system\nPrototyping\nCross-functional product leadership"}</ResponsiveBody></div>
            </div>
          </div>
        </section>

        <NextProject currentSlug="ridecentric" />
        <WorkRail shell="case-study" className="design-project-work-rail" />
      </main>
      <SiteFooter />
    </div>
  );
}

export function RideCentricProjectPage() {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const update = () => setScale(window.innerWidth < 1200 ? window.innerWidth / DESIGN_WIDTH : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
    <main className="rcx-page" style={{ height: DESIGN_HEIGHT * scale }}>
      <article className="rcx-canvas" style={{ transform: `translateX(-50%) scale(${scale})` }}>
        <div className="rcx-content">

        <Positioned className="rcx-title" x={234} y={182} width={317}>RideCentric+</Positioned>
        <Positioned className="rcx-meta-label" x={238} y={255} width={29}>Role</Positioned>
        <Positioned className="rcx-meta-value" x={238} y={275} width={113}>Product Manager</Positioned>
        <Positioned className="rcx-meta-label" x={239} y={322} width={29}>Year</Positioned>
        <Positioned className="rcx-meta-value" x={239} y={342} width={35}>2025</Positioned>
        <Positioned className="rcx-meta-label" x={338} y={322} width={55}>Timeline</Positioned>
        <Positioned className="rcx-meta-value" x={338} y={342} width={61}>4 months</Positioned>
        <Positioned className="rcx-intro" x={238} y={421} width={474}>Designing an enterprise mobility<br />platform for corporate travel, events,<br />and transportation operations.</Positioned>
        <Positioned className="rcx-meta-label" x={829} y={277} width={101}>Responsibilities</Positioned>
        <Positioned className="rcx-meta-value" x={829} y={304} width={229}>Product Vision, Product Strategy,<br />Discovery, Prioritization, UX<br />Leadership, Stakeholder Alignment,<br />Delivery</Positioned>
        <Positioned className="rcx-meta-label" x={829} y={447} width={36}>Team</Positioned>
        <Positioned className="rcx-meta-value" x={829} y={470} width={157}>PM 01, Engineers 07,<br />QA 02, Designer 03</Positioned>

        <div className="rcx-hero-image"><ParallaxMedia className="rcx-media-parallax" distance={18} velocityResponse reveal revealDelay={.08} revealOffset={30}><img src="/ridecentric-exact/ridecentric-plus-hero-hd.png" alt="RideCentric+ dashboard shown in a desktop display mockup" /></ParallaxMedia></div>

        <Positioned className="rcx-opening-title" x={239} y={1149} width={532}>Moving one person is a ride problem.<br />Moving 100 people is an operations<br />problem.</Positioned>
        <Positioned className="rcx-subhead rcx-subhead-large" x={236} y={1296} width={506}>RideCentric+ gives organizations one place to coordinate<br />complex transportation across passengers, schedules,<br />events, teams and fulfilment partners.</Positioned>
        <Positioned className="rcx-body rcx-body-medium rcx-line-23" x={236} y={1416} width={506}>RideCentric had spent years managing premium transportation through a network<br />of operations teams, affiliates and drivers. RideCentric+ was the next step: turning<br />that operational capability into a customer-facing enterprise platform without<br />disrupting the system already moving people every day</Positioned>

        <Positioned className="rcx-label" x={239} y={1588} width={60}>Problem</Positioned>
        <Positioned className="rcx-serif rcx-heading rcx-heading-regular" x={238} y={1620} width={532}>Imagine coordinating 100 people moving<br />from different places, to different places,<br />at different times.</Positioned>
        <Positioned className="rcx-subhead" x={236} y={1769} width={506}>The complexity isn’t booking individual rides. It’s keeping every<br />passenger, schedule and fulfilment partner coordinated as plans<br />change.</Positioned>
        <GreenBlock x={100} y={1883} width={1080} height={448} />
        <Positioned className="rcx-body rcx-body-medium" x={236} y={2357} width={399}>Consumer ride-hailing is optimized around an individual<br />requesting a ride. Enterprise transportation works differently, the<br />booker may never enter the vehicle, passengers may never<br />create accounts, companies may pay centrally, rides can be<br />scheduled weeks ahead, and operations or affiliates may<br />coordinate fulfillment. Once dozens of journeys belong to the<br />same organization or event, managing transportation one ride at<br />a time stops working.</Positioned>
        <Positioned className="rcx-label" x={238} y={2605} width={79}>Positioning</Positioned>
        <Positioned className="rcx-serif rcx-heading rcx-heading-regular" x={236} y={2634} width={532}>We weren’t building a better uber or lyft</Positioned>
        <GreenBlock x={236} y={2691} width={862} height={444} />
        <Positioned className="rcx-serif rcx-callout" x={241} y={3157} width={394}>Built for a problem<br />ride-hailing was<br />never designed to<br />solve.</Positioned>
        <Positioned className="rcx-body rcx-body-medium" x={728} y={3165} width={370}>RideCentric+ was positioned around coordinated enterprise<br />transportation: modern enough to give customers the<br />visibility and usability they expected, but structured around<br />organizations, events, passengers, financial oversight and<br />managed fulfilment. The opportunity wasn’t to make<br />enterprise transportation behave like consumer ride-hailing;<br />it was to bring consumer-grade clarity to a fundamentally<br />different operating model.</Positioned>

        <Positioned className="rcx-label" x={241} y={3536} width={145}>Research &amp; Strategy</Positioned>
        <Positioned className="rcx-serif rcx-heading rcx-heading-regular" x={240} y={3568} width={532}>We found problems everywhere. The<br />harder question was where to start.</Positioned>
        <GreenBlock x={100} y={3664} width={1080} height={444} />
        <Positioned className="rcx-subhead" x={238} y={4134} width={397}>Bookers, passengers, drivers, affiliates and<br />operations all experienced different failures in the<br />same transportation system.</Positioned>

        <Positioned className="rcx-serif rcx-chapter" x={175} y={4445} width={931}>Product Decisions</Positioned>
        <Positioned className="rcx-serif rcx-heading rcx-fix-heading" x={243} y={4689} width={266}>Fix the source of<br />coordination first.</Positioned>
        <GreenBlock x={557} y={4689} width={572} height={409} />
        <Positioned className="rcx-body rcx-muted rcx-body-medium rcx-line-24" x={243} y={5017} width={266}>Instead of redesigning every side of the<br />platform at once, we prioritized the booker,<br />the point where much of the transportation<br />structure originates</Positioned>
        <Positioned className="rcx-subhead rcx-line-25" x={790} y={5147} width={192}>Better inputs create<br />better operations<br />downstream.</Positioned>
        <GreenBlock x={100} y={5146} width={671} height={409} />
        <Positioned className="rcx-serif rcx-decision-title" x={788} y={5486} width={266}>Visibility before<br />automation</Positioned>
        <Positioned className="rcx-body rcx-muted" x={243} y={5573} width={336}>The obvious modernization path was self-service<br />booking. Research showed that replacing the existing<br />workflow immediately would remove operational<br />knowledge before the product had learned enough to<br />replace it.</Positioned>
        <Positioned className="rcx-serif rcx-large-statement" x={101} y={5784} width={1079}>Introduce value before asking people to<br />change behaviour.</Positioned>

        <Positioned className="rcx-label" x={239} y={6052} width={69}>Roadmap</Positioned>
        <Positioned className="rcx-serif rcx-heading rcx-heading-regular" x={238} y={6084} width={532}>Build today’s product without designing<br />ourselves out of tomorrow’s.</Positioned>
        <GreenBlock x={239} y={6195} width={862} height={377} />
        <Positioned className="rcx-subhead rcx-line-25" x={718} y={6610} width={383}>We used the Three Horizons framework to<br />separate immediate customer value from<br />platform foundations and longer-term<br />automation.</Positioned>

        <Positioned className="rcx-label rcx-centered" x={566} y={6898} width={149}>Product Architecture</Positioned>
        <Positioned className="rcx-serif rcx-architecture-title" x={310} y={6924} width={660}>A ride was the unit of execution. The event<br />became the unit of coordination.</Positioned>
        <GreenBlock x={103} y={7039} width={1077} height={604} />
        <Positioned className="rcx-serif rcx-heading" x={103} y={7674} width={333}>Some interface problems<br />couldn’t be solved in the<br />interface.</Positioned>
        <GreenBlock x={456} y={7657} width={724} height={525} />
        <Positioned className="rcx-subhead rcx-line-25" x={456} y={8206} width={333}>Enterprise customers needed teams,<br />permissions and different levels of<br />access. The existing organizational model<br />wasn’t structured to support them.</Positioned>

        <Positioned className="rcx-label" x={240} y={8609} width={122}>Delivery Strategy</Positioned>
        <Positioned className="rcx-serif rcx-heading" x={239} y={8641} width={532}>Rebuild the foundation without stopping<br />the operation.</Positioned>
        <Positioned className="rcx-subhead" x={239} y={8746} width={506}>RideCentric+ was being introduced into a live transportation<br />business. A cleaner architecture wasn’t worth destabilizing the<br />system customers already depended on.</Positioned>
        <Positioned className="rcx-body rcx-line-23" x={239} y={8871} width={399}>Rather than forcing an immediate migration, the legacy portal and<br />RideCentric+ operated in parallel over shared operational<br />infrastructure while customers progressively moved into the new<br />model. This increased implementation complexity in the short<br />term, but reduced migration risk and protected continuity while<br />the new enterprise architecture was proven in production.</Positioned>
        <Positioned className="rcx-label" x={240} y={9084} width={106}>Design System</Positioned>
        <GreenBlock x={100} y={9126} width={1080} height={604} />
        <GreenBlock x={100} y={9744} width={739} height={464} />
        <Positioned className="rcx-subhead" x={872} y={10077} width={308}>As the product expanded across rides,<br />events, passengers, teams,<br />permissions and finance, consistency<br />became an operational requirement,<br />not simply a visual one.</Positioned>

        <Positioned className="rcx-label" x={240} y={10368} width={125}>Platform Thinking</Positioned>
        <Positioned className="rcx-serif rcx-heading" x={239} y={10400} width={532}>The same transportation state had to serve<br />people doing fundamentally different jobs.</Positioned>
        <Positioned className="rcx-subhead" x={239} y={10505} width={506}>RideCentric+ was being introduced into a live transportation<br />business. A cleaner architecture wasn’t worth destabilizing the<br />system customers already depended on.</Positioned>
        <GreenBlock x={240} y={10615} width={804} height={299} />
        <Positioned className="rcx-body" x={239} y={10944} width={399}>A booker needs to understand the operation, a passenger needs<br />confidence about their journey, and a driver needs the next<br />actionable instruction. We kept the underlying ride state<br />consistent while designing each experience around the<br />information and decisions relevant to that user, allowing the wider<br />platform to share a system without forcing everyone into the same<br />interface.</Positioned>

        <Positioned className="rcx-label" x={240} y={11188} width={67}>Outcome</Positioned>
        <Positioned className="rcx-serif rcx-heading" x={239} y={11222} width={532}>From ride visibility to enterprise control.</Positioned>
        <Positioned className="rcx-subhead" x={239} y={11287} width={506}>RideCentric+ shipped a stronger enterprise layer around the<br />transportation operation while establishing the structure<br />needed for the platform to continue evolving.</Positioned>
        <Positioned className="rcx-body" x={239} y={11395} width={399}>Customers gained greater visibility into events, passengers and<br />rides; organizations gained stronger team and role structures; and<br />the product moved from a flat reservation model toward<br />coordinated transportation management. Just as importantly, the<br />underlying architecture created a clearer path toward deeper self-<br />service, automation and connected driver and affiliate<br />experiences.</Positioned>

        <Positioned className="rcx-serif rcx-reflection-title" x={161.621} y={11673} width={950.857}>Reflection</Positioned>
        <GreenBlock x={395.207} y={11749.682} width={482.507} height={450.654} />
        <Positioned className="rcx-role-heading" x={395.207} y={12227} width={370.433}>The most ambitious solution isn’t<br />always the right next solution.</Positioned>
        <Positioned className="rcx-body rcx-medium rcx-line-21" x={395} y={12321} width={399}>RideCentric+ changed how I think about modernization in<br />operational products: progress can come from exposing value<br />before replacing behaviour.</Positioned>
        <Positioned className="rcx-body rcx-muted rcx-opacity-70" x={395} y={12408} width={399}>The existing workflow contained years of operational knowledge<br />that the software had not yet captured. Rather than treating that<br />behaviour as legacy friction to eliminate, we used it as information.<br />By strengthening the structure underneath the product, increasing<br />customer visibility and sequencing automation behind what we<br />learned, we could move the platform forward without pretending<br />the complexity didn’t exist.</Positioned>
        <Positioned className="rcx-label rcx-role-label" x={395.207} y={12623} width={67}>My Role</Positioned>
        <Positioned className="rcx-role-heading" x={395} y={12670.008} width={370.433}>Product to Design</Positioned>
        <Positioned className="rcx-body" x={395} y={12720} width={375.152}>My role spanned product management, product strategy and<br />design leadership.<br /><br />I contributed to customer and stakeholder research, roadmap<br />prioritization, the demand-side strategy, enterprise<br />architecture decisions, events and role-based access, rollout<br />planning and future automation strategy.<br /><br />Alongside that work, I helped lead the product experience,<br />from information architecture and flows to interface design,<br />interaction patterns and the broader design system.</Positioned>
        <Positioned className="rcx-contribution-label" x={395.207} y={13042} width={375.152}>Contributions</Positioned>
        <Positioned className="rcx-contributions" x={395.207} y={13075.035} width={263}>Research &amp; synthesis<br />Product strategy<br />Three Horizons roadmap<br />Prioritization<br />Enterprise architecture<br />Information architecture<br />UX/UI<br />Interaction design<br />Design system<br />Prototyping<br />Cross-functional product leadership</Positioned>

        <Positioned className="rcx-serif rcx-next-title" x={507} y={13573} width={267}>next project</Positioned>
        <div className="rcx-next-image"><ParallaxMedia className="rcx-media-parallax" distance={16} velocityResponse reveal revealOffset={30}><Link className="rcx-next-image-link" href="/work/ridecentric"><img src="/ridecentric-exact/ridecentric-plus-hero-hd.png" alt="RideCentric+" /></Link></ParallaxMedia></div>
        <Positioned className="rcx-next-label rcx-centered" x={597} y={14087} width={86}>RideCentric+</Positioned>

        <RevealMedia className="rcx-work-strip"><Link className="rcx-work-strip-link" href="/work">
          <span className="rcx-work-thumb rcx-work-blue"><img src="/ridecentric-exact/raw-9.png" alt="" /></span>
          <span className="rcx-work-thumb rcx-work-mint"><img src="/ridecentric-exact/raw-11.png" alt="" /></span>
          <span className="rcx-work-thumb rcx-work-coral"><img src="/ridecentric-exact/raw-12.png" alt="" /></span>
          <span className="rcx-work-text">see all work</span><span className="rcx-work-arrow">→</span>
        </Link></RevealMedia>

        <Positioned className="rcx-serif rcx-contact-title" x={100} y={14619} width={443}>let’s build something<br />worth building</Positioned>
        <a className="rcx-contact-link" href="mailto:hello@rezwannavid.me"><span>email me</span><span>→</span></a>
        <div className="rcx-footer-art"><ParallaxMedia className="rcx-media-parallax" distance={14} velocityResponse reveal revealOffset={30}>
          <img className="rcx-footer-landscape" src="/ridecentric-exact/raw-1.png" alt="A solitary tree beneath a blue landscape" />
          <img className="rcx-footer-title" src="/home-design/create-with-impact.png" alt="Create with Impact" />
          <img className="rcx-footer-logo" src="/RNLogo.svg" alt="" />
        </ParallaxMedia></div>
        <Positioned className="rcx-footer-credit rcx-centered" x={531} y={15427} width={218}>made with coffee and droopy eyes</Positioned>
        </div>
      </article>
    </main>
    <ResponsiveRideCentric />
    </>
  );
}
