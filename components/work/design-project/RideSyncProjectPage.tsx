import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { ProjectLink } from "@/components/motion/ProjectTransition";
import { RideSyncVisual as Visual } from "@/components/work/design-project/RideSyncVisual";

const media = {
  hero: "/ridesync-exact/HQ/ridesync-hero.png",
  relationship: "/ridesync-exact/passenger-information-gap-poster.png",
  confirmation: "/ridesync-exact/HQ/ride-confirmation-card.png",
  informationModel: "/ridesync-exact/HQ/ridesync-guest-access-flow.png",
  twoQuestions: "/ridesync-exact/booker-passenger-questions-poster.png",
  dispatchModel: "/ridesync-exact/HQ/dispatch-information-model.png",
  passengerView: "/ridesync-exact/passenger-itinerary-dashboard-poster.png",
  cityIllustration: "/ridesync-exact/live-itinerary-cityscape-poster.png",
  eventDashboard: "/ridesync-exact/event-dashboard-poster.png",
  eventMap: "/ridesync-exact/HQ/event-map-laptop.png",
  payment: "/ridesync-exact/confirmation-payment-poster.png",
  transition: "/ridesync-exact/service-information-flow-poster.png",
  betaTesting: "/ridesync-exact/HQ/beta-testing-findings.png",
  reflection: "/ridesync-exact/HQ/ridesync-reflection-portrait.png",
  nextProject: "/ridesync-exact/ridecentric-next-project.png",
} as const;

const videos = {
  relationship: "/ridesync-exact/Video/passenger-information-gap.mp4",
  twoQuestions: "/ridesync-exact/Video/booker-passenger-questions.mp4",
  passengerView: "/ridesync-exact/Video/passenger-sharing-flow.mp4",
  cityIllustration: "/ridesync-exact/Video/live-itinerary-cityscape.mp4",
  eventDashboard: "/ridesync-exact/Video/event-dashboard-overview.mp4",
  payment: "/ridesync-exact/Video/confirmation-payment-experience.mp4",
  transition: "/ridesync-exact/Video/service-information-flow.mp4",
} as const;

function HeadingText({ children, load = false }: { children: string; load?: boolean }) {
  return <AnimatedWords text={children} mode={load ? "load" : "view"} stagger={.055} />;
}

function CopyText({ children, delay = 0, emphasis }: { children: string; delay?: number; emphasis?: string }) {
  return <AnimatedLines text={children} delay={delay} emphasis={emphasis} breakableSpacing />;
}

function ChapterLabel({ children }: { children: string }) {
  return <p className="ridesync-chapter-label"><CopyText>{children}</CopyText></p>;
}

function CopyList({ items }: { items: string[] }) {
  return <>{items.map((item, index) => <span className="ridesync-motion-line" key={item}><CopyText delay={index * .035}>{item}</CopyText></span>)}</>;
}

export function RideSyncProjectPage() {
  return (
    <div className="ridesync-project-page">
      <main><article className="ridesync-case-study">
        <header className="ridesync-hero">
          <div className="ridesync-hero-copy">
            <h1><HeadingText load>RideSync</HeadingText></h1>
            <dl className="ridesync-primary-meta">
              <div className="ridesync-meta-role"><dt><CopyText delay={.12}>Role</CopyText></dt><dd><CopyText delay={.18}>Product Manager</CopyText></dd></div>
              <div><dt><CopyText delay={.2}>Year</CopyText></dt><dd><CopyText delay={.26}>2024</CopyText></dd></div>
              <div><dt><CopyText delay={.24}>Timeline</CopyText></dt><dd><CopyText delay={.3}>4 months</CopyText></dd></div>
            </dl>
            <p className="ridesync-hero-statement"><CopyText delay={.2}>Designing the bridge from high-touch service to self-service</CopyText></p>
          </div>
          <dl className="ridesync-secondary-meta">
            <div><dt><CopyText delay={.18}>Responsibilities</CopyText></dt><dd><CopyText delay={.24}>Product Strategy, Discovery, Prioritization, UX &amp; UI Leadership, Stakeholder Alignment, Delivery</CopyText></dd></div>
            <div><dt>Team</dt><dd><span>PM</span> 01, <span>Engineers</span> 07, <span>QA</span> 02, <span>Designer</span> 03</dd></div>
          </dl>
          <div className="ridesync-hero-art"><ParallaxMedia className="ridesync-hero-reveal" distance={0} xDistance={0} rotateDistance={0} reveal revealOffset={34}><Image src={media.hero} alt="RideSync identity on a blue and mint gradient" width={2140} height={1166} priority sizes="(min-width: 1100px) 1070px, calc(100vw - 64px)" /></ParallaxMedia></div>
        </header>

        <section className="ridesync-story ridesync-story-relationship">
          <ChapterLabel>Context</ChapterLabel>
          <h2><HeadingText>We were successfully moving passengers without really serving them.</HeadingText></h2>
          <p><CopyText>RideCentric’s enterprise relationship was built around the travel arranger. They booked transportation, received confirmations, coordinated changes, and communicated with Operations.</CopyText></p>
          <Visual src={media.relationship} videoSrc={videos.relationship} alt="The travel arranger, RideCentric Operations and passenger relationship" width={928} height={496} />
          <h3><CopyText>The problem wasn’t a lack of structure. It was a lack of shared visibility around it.</CopyText></h3>
          <p className="ridesync-story-detail"><CopyText>When a passenger needed information, the question moved through the organization before the answer could reach them. At the same time, bookers were managing several passengers and rides through email threads, forwarded itineraries, and repeated status checks.</CopyText></p>
        </section>

        <section className="ridesync-story ridesync-story-workaround">
          <ChapterLabel>Research</ChapterLabel>
          <h2><HeadingText>The workaround showed us what the product was missing.</HeadingText></h2>
          <p><CopyText>During research, we noticed something important: confirmations and itineraries sent to bookers were already being forwarded to passengers.</CopyText></p>
          <p className="ridesync-workaround-detail"><CopyText>That behavior told us two things. Passengers clearly needed access to information RideCentric was only providing to the booker, and bookers were already acting as a manual distribution layer.</CopyText></p>
          <Visual src={media.confirmation} alt="A shared RideSync itinerary confirmation" width={808} height={432} />
          <h3><CopyText>Customers had already designed the first version of the product themselves</CopyText></h3>
          <div className="ridesync-question-pair"><p><CopyText>“How do we give passengers more updates?”</CopyText></p><span aria-hidden="true">→</span><p><CopyText delay={.08}>“How do we turn the information customers are already passing around into a live shared experience?”</CopyText></p></div>
        </section>

        <section className="ridesync-story ridesync-story-entry">
          <ChapterLabel>Strategy</ChapterLabel>
          <h2><HeadingText>We deliberately did not start with the full booker platform</HeadingText></h2>
          <p><CopyText>We knew bookers would eventually need a deeper product. But building RideCentric+ first would have required customers to create accounts, learn a new system, and change their workflow before they had experienced enough value to justify the commitment.</CopyText></p>
          <h3><CopyText>Value first. Commitment later.</CopyText></h3>
          <p className="ridesync-entry-detail"><CopyText>The product could open from the communication customers already used, expose live transportation information immediately, and be shared with the passenger without forcing either person through a traditional signup flow.</CopyText></p>
          <Visual src={media.informationModel} alt="RideSync access and information model" width={807} height={421} />
          <p className="ridesync-entry-caption"><CopyText>We made access portable because the relationship was temporary for some users and recurring for others.</CopyText></p>
          <div className="ridesync-entry-question">
            <h2><HeadingText>One ride had to support two completely different questions</HeadingText></h2>
            <Visual src={media.twoQuestions} videoSrc={videos.twoQuestions} alt="Booker and passenger views of the same ride" width={804} height={430} />
            <p><span className="ridesync-copy-block"><CopyText emphasis="booker">For the booker, the product needed to scale outward: passengers, multiple rides, dates, statuses, vehicle assignments, and event-level visibility.</CopyText></span><span className="ridesync-copy-block"><CopyText emphasis="passenger">For the passenger, it needed to collapse inward: itinerary, chauffeur, vehicle, next stop, and current state.</CopyText></span></p>
          </div>
        </section>

        <section className="ridesync-story ridesync-story-product">
          <ChapterLabel>System</ChapterLabel>
          <div className="ridesync-product-model-copy"><h2><HeadingText>We organized RideSync around how customers think about transportation, not how dispatch stores it.</HeadingText></h2><p><CopyText>Internally, RideCentric deals with operational entities, statuses, service types, and assignment logic.</CopyText></p><p><CopyText>We exposed complexity progressively instead of transferring backend complexity into the interface.</CopyText></p></div>
          <Visual src={media.dispatchModel} alt="RideSync customer model compared with dispatch records" width={474} height={384} />
          <p className="ridesync-product-label"><CopyText>The product</CopyText></p>
          <div className="ridesync-itinerary-copy"><h2><HeadingText>A forwarded itinerary became a living itinerary.</HeadingText></h2><p><span className="ridesync-copy-block"><CopyText>The passenger view turned static information into an experience that changed with the trip.</CopyText></span><span className="ridesync-copy-block"><CopyText>An incoming flight could affect pickup. A chauffeur could move from unassigned to assigned. A vehicle could move from approaching to in progress. The passenger could track the ride when information was enough and call the chauffeur when conversation was actually necessary.</CopyText></span></p></div>
          <Visual src={media.passengerView} videoSrc={videos.passengerView} alt="RideSync passenger itinerary and ride status experience" width={1170} height={752} />
          <p className="ridesync-product-caption"><CopyText>The product answered questions before they became support requests.</CopyText></p>
          <Visual src={media.cityIllustration} videoSrc={videos.cityIllustration} alt="A blue cityscape illustration used in the RideSync experience" width={877} height={453} />
          <div className="ridesync-booker-copy"><h2><HeadingText>For bookers, visibility scaled from one passenger to the whole event.</HeadingText></h2><p><span className="ridesync-copy-block"><CopyText>Once RideSync became useful at the individual itinerary level, the same information model could support bookers coordinating larger groups.</CopyText></span><span className="ridesync-copy-block"><CopyText>The event view surfaced rides by date, passenger, and status, while the map turned multiple simultaneous rides into something understandable at a glance.</CopyText></span></p></div>
          <Visual src={media.eventDashboard} videoSrc={videos.eventDashboard} alt="RideSync event dashboard with passengers, rides and statuses" width={1116} height={718} />
          <p className="ridesync-dashboard-caption"><CopyText>The booker no longer had to reconstruct the event from confirmations and email threads.</CopyText></p>
          <Visual src={media.eventMap} alt="RideSync event map showing simultaneous rides" width={1104} height={665} />
        </section>

        <section className="ridesync-story ridesync-story-payment"><h2><HeadingText>Self-service only worked if confirmation and payment could stay inside the same experience.</HeadingText></h2><p><span className="ridesync-copy-block"><CopyText>Card payment could be automated end-to-end, but enterprise customers still relied on bank transfers.</CopyText></span><span className="ridesync-copy-block"><CopyText>Rather than removing that workflow to make the product cleaner, we kept the familiar payment method and digitized everything around it.</CopyText></span></p><Visual src={media.payment} videoSrc={videos.payment} alt="RideSync confirmation and payment experience" width={1104} height={710} /></section>

        <section className="ridesync-story ridesync-story-transition"><ChapterLabel>Roadmap</ChapterLabel><h2><HeadingText>RideSync was the first product in a larger transition.</HeadingText></h2><p><span className="ridesync-copy-block"><CopyText>The goal was never to make one portal solve every role in RideCentric’s operation.</CopyText></span><span className="ridesync-copy-block"><CopyText>RideSync created the first customer-facing visibility layer and gave the business a low-friction way to introduce software into an established service relationship.</CopyText></span><span className="ridesync-copy-block"><CopyText>From there, the product ecosystem could deepen by role.</CopyText></span></p><Visual src={media.transition} videoSrc={videos.transition} alt="RideSync as the first customer-facing layer in the RideCentric product transition" width={809} height={443} /></section>

        <section className="ridesync-story ridesync-story-beta"><h2><HeadingText>Beta testing showed us where humans had been filling the UX gaps.</HeadingText></h2><p><CopyText>Small ambiguities became much more important once an Operations agent wasn’t there to explain them.</CopyText></p><Visual src={media.betaTesting} alt="RideSync beta testing findings and interface details" width={806} height={434} /></section>

        <section className="ridesync-story ridesync-story-outcomes">
          <ChapterLabel>Outcome</ChapterLabel>
          <h2><HeadingText>We removed the middleman from the information, not from the service.</HeadingText></h2>
          <p><span className="ridesync-copy-block"><CopyText>RideSync gave passengers direct visibility and gave bookers a way to coordinate transportation without constantly reconstructing the latest state through calls and emails.</CopyText></span><span className="ridesync-copy-block"><CopyText>It also established a product relationship before asking customers to adopt a full platform.</CopyText></span></p>
          <div className="ridesync-metrics"><div><strong><HeadingText>88%</HeadingText></strong><span><CopyText>Enterprise Adoption of existing clients</CopyText></span></div><div><strong><HeadingText>73%</HeadingText></strong><span><CopyText delay={.08}>Drop in manual inquiries for ride updates</CopyText></span></div></div>
          <p className="ridesync-outcome-note"><CopyText>RideSync gave customers more direct control over routine interactions while reducing the need for Operations to coordinate every step between bookers and passengers.</CopyText></p>
        </section>

        <section className="ridesync-reflection">
          <h2><HeadingText>Reflection</HeadingText></h2><div className="ridesync-reflection-tile"><ParallaxMedia className="ridesync-reflection-depth" distance={0} xDistance={0} rotateDistance={0} reveal revealOffset={38}><Image src={media.reflection} alt="Illustrated portrait of Rezwan over the RideSync gradient" width={498} height={451} sizes="(max-width: 767px) 100vw, 498px" /></ParallaxMedia></div>
          <div className="ridesync-reflection-copy">
            <h3><HeadingText>The biggest product decision wasn’t what to build. It was what not to ask users to change yet.</HeadingText></h3>
            <p className="ridesync-reflection-summary"><CopyText>RideSync reinforced that removing friction does not always mean introducing a bigger platform. Bookers were already coordinating rides through email, phone calls and forwarded confirmations. Passengers were often even further removed from the system, depending on someone else for updates, payment information and ride visibility.</CopyText></p>
            <h5 className="ridesync-role-label"><CopyText>My Role</CopyText></h5>
            <h3 className="ridesync-role-title"><HeadingText>Product Strategy, Experience &amp; Systems</HeadingText></h3>
            <div className="ridesync-role-copy"><p><strong><CopyText>My role spanned product strategy, service thinking and end-to-end experience design.</CopyText></strong></p><p><CopyText>I helped define how RideSync could sit between RideCentric’s internal operations, bookers and passengers without introducing unnecessary complexity. This included structuring the event and ride experience, payment and confirmation flows, passenger sharing, ride visibility and the broader relationship between RideSync and the products that would follow it.</CopyText></p><p><CopyText>The work required thinking beyond individual screens and designing the system around how information moved between people.</CopyText></p></div>
            <h5 className="ridesync-contribution-label"><CopyText>Contributions</CopyText></h5>
            <p className="ridesync-contributions"><CopyList items={["Product strategy", "Service design", "Booker & passenger experience", "Information architecture", "User flows", "Payment & confirmation flows", "Event & ride structure", "Interaction design", "Responsive experience", "Design system", "Product sequencing"]} /></p>
          </div>
        </section>

        <section className="ridesync-next" aria-labelledby="ridesync-next-title">
          <h2 id="ridesync-next-title"><HeadingText>next project</HeadingText></h2>
          <ParallaxMedia className="ridesync-next-reveal" distance={0} xDistance={0} rotateDistance={0} reveal revealOffset={38}><ProjectLink className="ridesync-next-link" href="/work/ridecentric" projectId="ridecentric" data-cursor="View"><Image src={media.nextProject} alt="RideCentric+ enterprise mobility dashboard" width={603} height={405} sizes="602px" /><span>RideCentric+</span></ProjectLink></ParallaxMedia>
          <Link className="ridesync-all-work" href="/work"><span aria-hidden="true" className="ridesync-all-work-collage"><i /><i /><i /><i /></span><strong><HeadingText>see all work</HeadingText></strong><b aria-hidden="true">→</b></Link>
        </section>
      </article></main>

      <section className="ridesync-contact" aria-label="Contact"><h2><span className="ridesync-motion-line"><HeadingText>let’s build something</HeadingText></span><span className="ridesync-motion-line"><HeadingText>worth building</HeadingText></span></h2><a href="mailto:hello@rezwannavid.me"><CopyText>email me</CopyText><span aria-hidden="true">→</span></a></section>
      <SiteFooter />
    </div>
  );
}
