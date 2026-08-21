"use client";

import Link from "next/link";
import { Children, isValidElement, useLayoutEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { WorkRail } from "@/components/home/WorkRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NextProject } from "@/components/work/design-project/DesignProjectPrimitives";

const DESIGN_WIDTH = 1280;
const DESIGN_HEIGHT = 13718 - 52;

function textLines(children: ReactNode) {
  const lines: ReactNode[][] = [[]];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === "br") lines.push([]);
    else lines[lines.length - 1].push(child);
  });
  return lines;
}

function plainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return plainText(node.props.children);
  return "";
}

function PositionedTextMotion({ children, className, y }: { children: ReactNode; className: string; y: number }) {
  const lines = textLines(children);
  const byLine = /needin-(?:meta|intro|label|subhead|body|role-label|contribution)/.test(className);
  const load = y < 600;

  return <>{lines.map((line, index) => {
    const text = plainText(line);
    return <span className="needin-motion-line" key={`${text}-${index}`}>
      {byLine
        ? <AnimatedLines text={text} delay={(load ? .14 : 0) + index * .1} />
        : <AnimatedWords text={text} mode={load ? "load" : "view"} delay={(load ? .12 : 0) + index * .08} stagger={.055} />}
    </span>;
  })}</>;
}

function Positioned({ children, className = "", x, y, width, style }: {
  children: ReactNode;
  className?: string;
  x: number;
  y: number;
  width?: number;
  style?: CSSProperties;
}) {
  return <div className={`needin-positioned ${className}`.trim()} style={{ left: x, top: y, width, ...style }}><PositionedTextMotion className={className} y={y}>{children}</PositionedTextMotion></div>;
}

function AnimatedMediaLayer({ src, className }: { src: string; className: string }) {
  if (src.endsWith(".mp4")) {
    return <video className={`needin-animated-layer ${className}`.trim()} autoPlay loop muted playsInline preload="metadata" aria-hidden="true"><source src={src} type="video/mp4" /></video>;
  }

  return <img className={`needin-animated-layer ${className}`.trim()} src={src} alt="" aria-hidden="true" />;
}

const PHONE_ANIMATION_CLASSES = new Set([
  "needin-anim-finding",
  "needin-anim-subscribe",
  "needin-anim-adjust",
  "needin-anim-fulfillment",
  "needin-anim-weekly",
]);

function PhoneFrameLayer({ animationClass }: { animationClass: string }) {
  if (!PHONE_ANIMATION_CLASSES.has(animationClass)) return null;
  return <img className={`needin-phone-frame-layer ${animationClass}-frame`} src="/needin-exact/iphone-13-pro-frame.png" alt="" aria-hidden="true" />;
}

function MediaBlock({ src, alt, x, y, width, height, className = "", animatedSrc, animationClass = "" }: {
  src: string;
  alt: string;
  x: number;
  y: number;
  width: number;
  height: number;
  className?: string;
  animatedSrc?: string;
  animationClass?: string;
}) {
  return <div className={`needin-media ${className}`.trim()} style={{ left: x, top: y, width, height }}>
    <ParallaxMedia className="needin-media-depth" distance={0} xDistance={0} rotateDistance={0} reveal revealOffset={34}>
      <img src={src} alt={alt} />
      {animatedSrc ? <><AnimatedMediaLayer src={animatedSrc} className={animationClass} /><PhoneFrameLayer animationClass={animationClass} /></> : null}
    </ParallaxMedia>
  </div>;
}

function ReflectionCard({ responsive = false }: { responsive?: boolean }) {
  return <div className={responsive ? "needin-r-reflection-card" : "needin-reflection-card"}>
    <ParallaxMedia className="needin-reflection-depth" distance={0} xDistance={0} rotateDistance={0} reveal revealOffset={38}>
      <span />
    </ParallaxMedia>
  </div>;
}

function DesktopNeedin() {
  return (
    <main className="needin-page" style={{ height: DESIGN_HEIGHT }}>
      <article className="needin-canvas">
        <div className="needin-content">
          <Positioned className="needin-title" x={234} y={182}>Needin</Positioned>
          <Positioned className="needin-meta-label" x={238} y={280}>Role</Positioned>
          <Positioned className="needin-meta-value" x={238} y={300}>Product &amp; Design</Positioned>
          <Positioned className="needin-meta-label" x={239} y={347}>Year</Positioned>
          <Positioned className="needin-meta-value" x={239} y={367}>2021</Positioned>
          <Positioned className="needin-meta-label" x={338} y={347}>Timeline</Positioned>
          <Positioned className="needin-meta-value" x={338} y={367}>4 months</Positioned>
          <Positioned className="needin-intro" x={234} y={466} width={537}>Needin connects people with home cooks through flexible meal subscriptions, bringing familiar food, healthier everyday meals, and cuisines from other cultures into a predictable routine.</Positioned>
          <Positioned className="needin-meta-label" x={829} y={277}>Responsibilities</Positioned>
          <Positioned className="needin-meta-value" x={829} y={304} width={229}>Product Vision, Product Strategy, Discovery, Prioritization, UX Leadership, Stakeholder Alignment, Delivery</Positioned>
          <Positioned className="needin-meta-label" x={829} y={466}>Team</Positioned>
          <Positioned className="needin-meta-value" x={829} y={489} width={157}><span>Engineers </span>03, <span>Designer </span>02</Positioned>

          <ParallaxMedia className="needin-hero" distance={0} xDistance={0} rotateDistance={0} reveal revealOffset={34}><img src="/needin-exact/brand-hero.png" alt="Needin identity with the line feel like home, right at home" /></ParallaxMedia>

          <Positioned className="needin-label" x={239} y={1283}>Problem</Positioned>
          <Positioned className="needin-heading needin-light" x={238} y={1315} width={532}>Home cooks don’t operate like restaurants.</Positioned>
          <Positioned className="needin-subhead" x={236} y={1384} width={506}>On-demand ordering gives customers flexibility, but gives a home cook very little certainty about what they need to prepare tomorrow.</Positioned>
          <Positioned className="needin-body" x={238} y={1490} width={506}>A restaurant can continuously respond to incoming orders. A home cook works with limited ingredients, kitchen capacity and preparation time. For the model to work, cooks needed to know what they were making, how many portions were committed, and when those meals were expected before cooking began.</Positioned>
          <Positioned className="needin-subhead" x={236} y={1628} width={506}>The customer wants choice.</Positioned>
          <Positioned className="needin-subhead" x={236} y={1661} width={506}>The cook needs predictability.</Positioned>
          <MediaBlock src="/needin-exact/problem-research.png" alt="Two home cooks representing cultural variety and home cooking" x={236} y={1733} width={818} height={346} />

          <Positioned className="needin-label" x={239} y={2125}>Research &amp; Strategy</Positioned>
          <Positioned className="needin-heading" x={238} y={2163} width={614}>The answer wasn’t one meal plan. It was a subscription made of smaller commitments</Positioned>
          <MediaBlock src="/needin-exact/research-food.gif" alt="A rotating selection of meals representing variety across the week" x={236} y={2275} width={815} height={380} />
          <Positioned className="needin-body" x={236} y={2685} width={272}>Research and questionnaires pointed toward flexibility: people wanted different cooks, cuisines and meals without committing their entire week to one provider.</Positioned>
          <Positioned className="needin-body" x={569} y={2686} width={396}>That changed the product model. Instead of subscribing to Needin itself or choosing a rigid weekly package, customers could subscribe to specific meals from specific cooks at the days and timings those cooks could reliably provide them. One person could get weekday lunches from one cook, dinner from another, or several meals from the same cook.</Positioned>
          <Positioned className="needin-subhead" x={236} y={2858} width={300}>What we heard</Positioned>
          <Positioned className="needin-body needin-evidence-lines" x={236} y={2891} width={420}>People wanted variety across the week.<br />Committing to one cook felt restrictive.<br />Cooks needed commitments before buying ingredients.</Positioned>
          <Positioned className="needin-strategy-callout" x={767} y={2904} width={270}>Subscription needed to happen at the meal + schedule level</Positioned>

          <Positioned className="needin-label needin-centered" x={571} y={3145} width={140}>Product Decisions</Positioned>
          <MediaBlock src="/needin-exact/meal-card.png" animatedSrc="/needin-exact/meal-card.gif" animationClass="needin-anim-meal" alt="A recurring Chicken Tinga meal card with schedule and subscription details" x={369} y={3184} width={542} height={380} />
          <Positioned className="needin-decision" x={355} y={3703} width={260}>Flexibility for customers had to become certainty for cooks.</Positioned>
          <Positioned className="needin-subhead" x={355} y={3892} width={327}>Every subscription choice needed to resolve into a clear production plan before the cook entered the kitchen.</Positioned>
          <Positioned className="needin-body" x={355} y={4015} width={295}>Cooks define what they can make, which days they can make it, available meal windows and how many portions they can support. Customers subscribe within those constraints. As subscriptions accumulate, Needin can turn individual choices into a predictable schedule of committed portions for each cook.</Positioned>
          <Positioned className="needin-framework-label" x={355} y={4254} width={210}>Decision I drove</Positioned>
          <Positioned className="needin-framework-label" x={628} y={4254} width={210}>System consequence</Positioned>
          <Positioned className="needin-framework-label" x={901} y={4254} width={210}>What this unlocked</Positioned>
          <Positioned className="needin-body" x={356} y={4287} width={232}>Move from platform-level subscription to meal-level recurring commitments.</Positioned>
          <Positioned className="needin-body" x={628} y={4287} width={232}>Every subscription had to resolve into a meal, quantity, date and delivery window.</Positioned>
          <Positioned className="needin-body" x={901} y={4287} width={232}>The same underlying model could power both the customer plan and the cook’s production schedule.</Positioned>

          <Positioned className="needin-chapter" x={96} y={4477} width={469}>The Product</Positioned>
          <MediaBlock src="/needin-exact/finding-meal.png" animatedSrc="/needin-exact/finding-meal.gif" animationClass="needin-anim-finding" alt="Needin flow for finding a meal" x={96} y={4680} width={539} height={975} />
          <MediaBlock src="/needin-exact/customer-plan.png" alt="A recurring meal plan with price, schedule and delivery details" x={645} y={4680} width={535} height={476} />
          <Positioned className="needin-callout" x={659} y={5258} width={325}>Build your week around the food you actually want.</Positioned>
          <MediaBlock src="/needin-exact/subscribe-flow.png" animatedSrc="/needin-exact/meal-choosing-flow.mp4" animationClass="needin-anim-subscribe" alt="Needin flow for subscribing to a cook’s meal plan" x={645} y={5386} width={535} height={806} />
          <Positioned className="needin-body" x={239} y={5839} width={325}>Customers can mix cooks, meals and schedules while Needin keeps the resulting subscription understandable as one weekly plan.</Positioned>
          <MediaBlock src="/needin-exact/adjust-plan.png" animatedSrc="/needin-exact/adjust-plan.gif" animationClass="needin-anim-adjust" alt="Needin flow for adjusting a weekly meal plan" x={239} y={6220} width={815} height={732} />
          <MediaBlock src="/needin-exact/cook-notification.gif" alt="Needin notification prompting a customer to choose Wednesday’s meal" x={96} y={6970} width={487} height={339} />
          <MediaBlock src="/needin-exact/brand-tile.png" alt="Needin brand image with the line feel like home, right at home" x={594} y={6970} width={460} height={339} />

          <Positioned className="needin-heading needin-other-statement" x={236} y={7425} width={300}>choice on one side.<br />certainty on the other.</Positioned>
          <MediaBlock src="/needin-exact/brand-people.png" alt="Home cook Rosa Martínez with earnings, subscribers and rating details" x={96} y={7590} width={535} height={476} />
          <Positioned className="needin-decision needin-schedule" x={654} y={7590} width={448}>The same subscription becomes a plan for the customer and a production schedule for the cook.</Positioned>
          <MediaBlock src="/needin-exact/fulfillment.png" animatedSrc="/needin-exact/fulfillment.gif" animationClass="needin-anim-fulfillment" alt="Cook fulfillment screen turning subscriptions into meal preparation quantities" x={641} y={7770} width={539} height={794} />
          <Positioned className="needin-body" x={236} y={8124} width={325}>The product only works when changes on either side remain understandable before they become operational problems.</Positioned>
          <MediaBlock src="/needin-exact/weekly-schedule.png" animatedSrc="/needin-exact/weekly-schedule.gif" animationClass="needin-anim-weekly" alt="Cook weekly schedule showing locked capacity and committed portions" x={96} y={8296} width={535} height={482} />
          <Positioned className="needin-media-caption needin-centered" x={96} y={8802} width={535}>Flow: Managing Schedule</Positioned>

          <Positioned className="needin-label" x={237} y={8896}>Brand &amp; System</Positioned>
          <Positioned className="needin-heading needin-light needin-opsz-72" x={237} y={8926} width={405}>A marketplace built around people should feel human</Positioned>
          <MediaBlock src="/needin-exact/design-foundations.png" alt="Needin design foundations showing color, typography, spacing and corner-radius tokens" x={96} y={9079} width={535} height={510} />
          <MediaBlock src="/needin-exact/meal-components.png" alt="Needin meal cards and schedule components" x={642} y={9079} width={460} height={273} />
          <Positioned className="needin-body" x={692} y={9406} width={382}>The visual and interaction system balanced food discovery with the practical language of recurring meals, schedules, cooks and subscription states. Reusable patterns kept planning predictable across the product while the brand, imagery and motion preserved the personality of the people and food behind it.</Positioned>
          <MediaBlock src="/needin-exact/button-system.png" alt="Needin button variants, states and component anatomy" x={237} y={9601} width={465} height={482} />
          <MediaBlock src="/needin-exact/interface-components.png" alt="Needin interface tags, schedules, offers and meal-plan components" x={712} y={9601} width={465} height={482} />

          <Positioned className="needin-beta-title" x={237} y={10149} width={360}>What we learned from beta</Positioned>
          <Positioned className="needin-beta-copy" x={237} y={10191} width={380}>Customers could understand the meal-level subscription model.<br />People could build a weekly plan across different meals, cooks and time slots.<br />Cook-defined availability and capacity could coexist with meaningful customer choice.<br />The same subscription structure could translate customer selections into an actionable schedule for cooks.<br />The core experience was understandable enough to move from concept into early product use.</Positioned>
          <Positioned className="needin-beta-title" x={702} y={10149} width={360}>What we couldn’t know yet</Positioned>
          <Positioned className="needin-body needin-beta-limit" x={702} y={10191} width={360}>The beta was too early to establish the long-term economics and behavior of the marketplace. Retention, subscription frequency, cook utilization, supply-demand balance and unit economics would have required sustained usage at a larger scale.</Positioned>

          <Positioned className="needin-reflection-title needin-centered" x={165} y={10659} width={951}>Reflection</Positioned>
          <ReflectionCard />
          <Positioned className="needin-role-heading" x={398} y={11289} width={371}>The subscription wasn’t the business model sitting behind the product. It was the product.</Positioned>
          <Positioned className="needin-subhead" x={398} y={11410} width={399}>The key design problem was finding a structure that could make flexible choice and predictable home cooking coexist.</Positioned>
          <Positioned className="needin-body" x={398} y={11471} width={399}>Needin reinforced that marketplace experiences cannot be designed from only one side. Giving customers unlimited flexibility would make the cooks work harder; optimizing entirely for cooks would make the service too rigid to be useful. The product became stronger when those constraints were treated as one connected system rather than separate interfaces.</Positioned>
          <Positioned className="needin-role-label" x={398} y={11689}>My Role</Positioned>
          <Positioned className="needin-role-heading needin-role-name" x={398} y={11732} width={371}>Experience, Brand &amp; Strategy</Positioned>
          <Positioned className="needin-body" x={398} y={11783} width={399}>My role spanned product strategy, marketplace thinking and end-to-end product design.</Positioned>
          <Positioned className="needin-body" x={398} y={11849} width={399}>I helped shape how Needin worked as a two-sided service, translating customer needs, cook constraints and business goals into the subscription model, service structure and core product experience.</Positioned>
          <Positioned className="needin-body" x={398} y={11959} width={399}>I led the experience from information architecture and key user flows through interaction and interface design, while working through the operational rules behind scheduling, meal selection, cook availability and recurring service.</Positioned>
          <Positioned className="needin-contribution-title" x={398} y={12108}>Contributions</Positioned>
          <Positioned className="needin-contributions" x={398} y={12140} width={194}>Customer &amp; cook research<br />Marketplace strategy<br />Subscription model<br />Service design<br />Product prioritization<br />Information architecture<br />User flows<br />UX/UI<br />Interaction design<br />Prototyping<br />Design system</Positioned>

          <Positioned className="needin-next-title needin-centered" x={507} y={12671} width={267}>next project</Positioned>
          <ParallaxMedia className="needin-next-image" distance={0} xDistance={0} rotateDistance={0} reveal revealOffset={38}><Link href="/work/ridecentric"><img src="/ridecentric-exact/raw-9.png" alt="RideCentric+" /></Link></ParallaxMedia>
          <Positioned className="needin-meta-value needin-centered" x={597} y={13185} width={86}>RideCentric+</Positioned>
          <Link className="needin-work-strip" href="/work"><span className="needin-work-thumb needin-work-blue"><img src="/ridecentric-exact/raw-9.png" alt="" /></span><span className="needin-work-thumb needin-work-mint"><img src="/ridecentric-exact/raw-11.png" alt="" /></span><span className="needin-work-thumb needin-work-coral"><img src="/ridecentric-exact/raw-12.png" alt="" /></span><span className="needin-work-text">see all work</span><span className="needin-work-arrow">→</span></Link>
        </div>
      </article>
    </main>
  );
}

function RHeading({ children, className = "" }: { children: string; className?: string }) {
  return <h2 className={`needin-r-heading ${className}`}>{children.split("\n").map((line, index) => <span className="needin-r-text-line" key={`${line}-${index}`}><AnimatedWords text={line} /></span>)}</h2>;
}
function RBody({ children, className = "" }: { children: string; className?: string }) {
  return <p className={`needin-r-body ${className}`}>{children.split("\n").map((line, index) => <span className="needin-r-text-line" key={`${line}-${index}`}><AnimatedLines text={line} /></span>)}</p>;
}
function RLabel({ children }: { children: string }) { return <p className="needin-r-label"><AnimatedLines text={children} /></p>; }
function RMetaField({ label, value, delay = 0 }: { label: string; value: string; delay?: number }) { return <div><span><AnimatedLines text={label} delay={delay} /></span><strong><AnimatedLines text={value} delay={delay + .08} /></strong></div>; }
function RVisual({ className = "", src, alt = "", animatedSrc, animationClass = "" }: { className?: string; src?: string; alt?: string; animatedSrc?: string; animationClass?: string }) {
  return <div className={`needin-r-lime ${className}`}><ParallaxMedia className="needin-r-lime-depth" distance={0} xDistance={0} rotateDistance={0} reveal revealOffset={42}>{src ? <><img src={src} alt={alt} />{animatedSrc ? <><AnimatedMediaLayer src={animatedSrc} className={animationClass} /><PhoneFrameLayer animationClass={animationClass} /></> : null}</> : <span />}</ParallaxMedia></div>;
}

function ResponsiveNeedin() {
  return <div className="needin-responsive">
    <main className="needin-r-main">
      <section className="needin-r-shell needin-r-hero">
        <h1><AnimatedWords text="Needin" mode="load" delay={.12} /></h1>
        <div className="needin-r-meta"><RMetaField label="Role" value="Product & Design" delay={.16} /><RMetaField label="Year" value="2021" delay={.22} /><RMetaField label="Timeline" value="4 months" delay={.28} /></div>
        <RBody className="needin-r-intro">Needin connects people with home cooks through flexible meal subscriptions, bringing familiar food, healthier everyday meals, and cuisines from other cultures into a predictable routine.</RBody>
        <div className="needin-r-side"><RMetaField label="Responsibilities" value="Product Vision, Product Strategy, Discovery, Prioritization, UX Leadership, Stakeholder Alignment, Delivery" delay={.2} /><RMetaField label="Team" value="Engineers 03, Designer 02" delay={.3} /></div>
        <ParallaxMedia className="needin-r-hero-image" distance={0} xDistance={0} rotateDistance={0} reveal revealOffset={36}><img src="/needin-exact/brand-hero.png" alt="Needin identity with the line feel like home, right at home" /></ParallaxMedia>
      </section>
      <section className="needin-r-shell needin-r-section"><RLabel>Problem</RLabel><RHeading className="needin-r-light">Home cooks don’t operate like restaurants.</RHeading><RBody className="needin-r-lead">On-demand ordering gives customers flexibility, but gives a home cook very little certainty about what they need to prepare tomorrow.</RBody><RBody>A restaurant can continuously respond to incoming orders. A home cook works with limited ingredients, kitchen capacity and preparation time. For the model to work, cooks needed to know what they were making, how many portions were committed, and when those meals were expected before cooking began.</RBody><RHeading className="needin-r-pair">The customer wants choice.</RHeading><RHeading className="needin-r-pair">The cook needs predictability.</RHeading><RVisual className="needin-r-problem-media" src="/needin-exact/problem-research.png" alt="Two home cooks representing cultural variety and home cooking" /></section>
      <section className="needin-r-shell needin-r-section"><RLabel>Research &amp; Strategy</RLabel><RHeading>The answer wasn’t one meal plan. It was a subscription made of smaller commitments</RHeading><RVisual className="needin-r-research-media" src="/needin-exact/research-food.gif" alt="A rotating selection of meals representing variety across the week" /><div className="needin-r-columns"><RBody>Research and questionnaires pointed toward flexibility: people wanted different cooks, cuisines and meals without committing their entire week to one provider.</RBody><RBody>That changed the product model. Instead of subscribing to Needin itself or choosing a rigid weekly package, customers could subscribe to specific meals from specific cooks at the days and timings those cooks could reliably provide them. One person could get weekday lunches from one cook, dinner from another, or several meals from the same cook.</RBody></div><div className="needin-r-evidence"><div><RHeading className="needin-r-evidence-title">What we heard</RHeading><RBody>{"People wanted variety across the week.\nCommitting to one cook felt restrictive.\nCooks needed commitments before buying ingredients."}</RBody></div><RHeading className="needin-r-strategy">Subscription needed to happen at the meal + schedule level</RHeading></div></section>
      <section className="needin-r-shell needin-r-section needin-r-decision"><RLabel>Product Decisions</RLabel><RVisual className="needin-r-meal-card" src="/needin-exact/meal-card.png" animatedSrc="/needin-exact/meal-card.gif" animationClass="needin-anim-meal" alt="A recurring Chicken Tinga meal card with schedule and subscription details" /><RHeading>Flexibility for customers had to become certainty for cooks.</RHeading><RBody className="needin-r-lead">Every subscription choice needed to resolve into a clear production plan before the cook entered the kitchen.</RBody><RBody>Cooks define what they can make, which days they can make it, available meal windows and how many portions they can support. Customers subscribe within those constraints. As subscriptions accumulate, Needin can turn individual choices into a predictable schedule of committed portions for each cook.</RBody><div className="needin-r-framework"><div><RLabel>Decision I drove</RLabel><RBody>Move from platform-level subscription to meal-level recurring commitments.</RBody></div><div><RLabel>System consequence</RLabel><RBody>Every subscription had to resolve into a meal, quantity, date and delivery window.</RBody></div><div><RLabel>What this unlocked</RLabel><RBody>The same underlying model could power both the customer plan and the cook’s production schedule.</RBody></div></div></section>
      <section className="needin-r-shell needin-r-product"><RHeading>The Product</RHeading><div className="needin-r-product-grid"><RVisual className="needin-r-product-phone" src="/needin-exact/finding-meal.png" animatedSrc="/needin-exact/finding-meal.gif" animationClass="needin-anim-finding" alt="Needin flow for finding a meal" /><RVisual className="needin-r-customer-plan" src="/needin-exact/customer-plan.png" alt="A recurring meal plan with price, schedule and delivery details" /><RHeading>Build your week around the food you actually want.</RHeading><RVisual className="needin-r-subscribe" src="/needin-exact/subscribe-flow.png" animatedSrc="/needin-exact/meal-choosing-flow.mp4" animationClass="needin-anim-subscribe" alt="Needin flow for subscribing to a cook’s meal plan" /></div><RBody>Customers can mix cooks, meals and schedules while Needin keeps the resulting subscription understandable as one weekly plan.</RBody><RVisual className="needin-r-adjust" src="/needin-exact/adjust-plan.png" animatedSrc="/needin-exact/adjust-plan.gif" animationClass="needin-anim-adjust" alt="Needin flow for adjusting a weekly meal plan" /><div className="needin-r-paired-tiles"><RVisual src="/needin-exact/cook-notification.gif" alt="Needin notification prompting a customer to choose Wednesday’s meal" /><RVisual src="/needin-exact/brand-tile.png" alt="Needin brand image with the line feel like home, right at home" /></div></section>
      <section className="needin-r-shell needin-r-section"><RHeading className="needin-r-other-intro">{"choice on one side.\ncertainty on the other."}</RHeading><div className="needin-r-other-grid"><RVisual src="/needin-exact/brand-people.png" alt="Home cook Rosa Martínez with earnings, subscribers and rating details" /><RHeading className="needin-r-schedule">The same subscription becomes a plan for the customer and a production schedule for the cook.</RHeading><RBody>The product only works when changes on either side remain understandable before they become operational problems.</RBody><RVisual className="needin-r-fulfillment" src="/needin-exact/fulfillment.png" animatedSrc="/needin-exact/fulfillment.gif" animationClass="needin-anim-fulfillment" alt="Cook fulfillment screen turning subscriptions into meal preparation quantities" /><RVisual src="/needin-exact/weekly-schedule.png" animatedSrc="/needin-exact/weekly-schedule.gif" animationClass="needin-anim-weekly" alt="Cook weekly schedule showing locked capacity and committed portions" /><p className="needin-r-media-caption">Flow: Managing Schedule</p></div></section>
      <section className="needin-r-shell needin-r-section"><RLabel>Brand &amp; System</RLabel><RHeading className="needin-r-light needin-r-opsz-72">A marketplace built around people should feel human</RHeading><div className="needin-r-brand-grid"><RVisual className="needin-r-brand-foundations" src="/needin-exact/design-foundations.png" alt="Needin design foundations showing color, typography, spacing and corner-radius tokens" /><RVisual className="needin-r-brand-meals" src="/needin-exact/meal-components.png" alt="Needin meal cards and schedule components" /><RBody>The visual and interaction system balanced food discovery with the practical language of recurring meals, schedules, cooks and subscription states. Reusable patterns kept planning predictable across the product while the brand, imagery and motion preserved the personality of the people and food behind it.</RBody><RVisual className="needin-r-brand-buttons" src="/needin-exact/button-system.png" alt="Needin button variants, states and component anatomy" /><RVisual className="needin-r-brand-interface" src="/needin-exact/interface-components.png" alt="Needin interface tags, schedules, offers and meal-plan components" /></div><div className="needin-r-beta"><div><RHeading className="needin-r-evidence-title">What we learned from beta</RHeading><RBody>{"Customers could understand the meal-level subscription model.\nPeople could build a weekly plan across different meals, cooks and time slots.\nCook-defined availability and capacity could coexist with meaningful customer choice.\nThe same subscription structure could translate customer selections into an actionable schedule for cooks.\nThe core experience was understandable enough to move from concept into early product use."}</RBody></div><div><RHeading className="needin-r-evidence-title">What we couldn’t know yet</RHeading><RBody>The beta was too early to establish the long-term economics and behavior of the marketplace. Retention, subscription frequency, cook utilization, supply-demand balance and unit economics would have required sustained usage at a larger scale.</RBody></div></div></section>
      <section className="needin-r-reflection"><div className="needin-r-shell"><RHeading>Reflection</RHeading><ReflectionCard responsive /><div className="needin-r-reflection-copy"><RHeading className="needin-r-sans">The subscription wasn’t the business model sitting behind the product. It was the product.</RHeading><RBody className="needin-r-lead">The key design problem was finding a structure that could make flexible choice and predictable home cooking coexist.</RBody><RBody>Needin reinforced that marketplace experiences cannot be designed from only one side. Giving customers unlimited flexibility would make the cooks work harder; optimizing entirely for cooks would make the service too rigid to be useful. The product became stronger when those constraints were treated as one connected system rather than separate interfaces.</RBody><div className="needin-r-role"><RLabel>My Role</RLabel><RHeading className="needin-r-sans">Experience, Brand &amp; Strategy</RHeading><RBody>My role spanned product strategy, marketplace thinking and end-to-end product design.</RBody><RBody>I helped shape how Needin worked as a two-sided service, translating customer needs, cook constraints and business goals into the subscription model, service structure and core product experience.</RBody><RBody>I led the experience from information architecture and key user flows through interaction and interface design, while working through the operational rules behind scheduling, meal selection, cook availability and recurring service.</RBody></div><div className="needin-r-contributions"><RLabel>Contributions</RLabel><RBody>{"Customer & cook research\nMarketplace strategy\nSubscription model\nService design\nProduct prioritization\nInformation architecture\nUser flows\nUX/UI\nInteraction design\nPrototyping\nDesign system"}</RBody></div></div></div></section>
      <NextProject currentSlug="needin" />
      <WorkRail shell="case-study" className="design-project-work-rail" />
    </main>
    <SiteFooter />
  </div>;
}

export function NeedinProjectPage() {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const update = () => setScale(window.innerWidth < DESIGN_WIDTH ? window.innerWidth / DESIGN_WIDTH : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return <><div className="needin-desktop"><div className="needin-desktop-scale" style={{ height: DESIGN_HEIGHT * scale }}><DesktopNeedin /></div><SiteFooter /></div><ResponsiveNeedin /></>;
}
