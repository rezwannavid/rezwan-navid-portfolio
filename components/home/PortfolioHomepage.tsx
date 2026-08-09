"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { type PointerEvent } from "react";
import { ContactCTA, EditorialArrow as Arrow } from "@/components/home/ContactCTA";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { RevealMedia } from "@/components/motion/RevealMedia";
import { TiltLink } from "@/components/motion/TiltLink";
import { VideoFeature } from "@/components/home/VideoFeature";
import { WorkRail } from "@/components/home/WorkRail";
import { EditorialLinks } from "@/components/home/EditorialLinks";
import { motionEase, physicalSpring } from "@/lib/motion";
import { featuredProjectIds, projectRegistry } from "@/lib/projectRegistry";
import { MobileHomepage } from "@/components/home/MobileHomepage";

function IdentityCard() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, physicalSpring);
  const smoothY = useSpring(pointerY, physicalSpring);
  const rotateX = useTransform(smoothY, [-1, 1], [4.5, -4.5]);
  const rotateY = useTransform(smoothX, [-1, 1], [-4.5, 4.5]);
  const portraitX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const portraitY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const copyX = useTransform(smoothX, [-1, 1], [-2, 2]);
  const copyY = useTransform(smoothY, [-1, 1], [-2, 2]);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
    pointerX.set(x);
    pointerY.set(y);
    event.currentTarget.style.setProperty("--identity-x", `${(x + 1) * 50}%`);
    event.currentTarget.style.setProperty("--identity-y", `${(y + 1) * 50}%`);
  };
  const reset = () => { pointerX.set(0); pointerY.set(0); };

  return (
    <motion.article
      className="identity-card"
      aria-label="Mir Rezwan Navid profile"
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: .975, rotate: .7 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{ duration: .72, delay: .42, ease: motionEase.editorial }}
      style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <span className="identity-overline">04/08</span>
      <motion.p className="identity-role" style={{ x: copyX, y: copyY }}><strong>design engineer /</strong><br /><em>product thinker</em></motion.p>
      <motion.div className="identity-photo" style={{ x: portraitX, y: portraitY }}><Image unoptimized src="/home-design/profile-card-portrait.png?v=1" alt="Portrait of Mir Rezwan Navid" width={904} height={904} priority /></motion.div>
      <motion.p className="identity-name" style={{ x: portraitX, y: portraitY }}><span>Mir</span><br /><strong>Rezwan</strong><br /><em>Navid</em></motion.p>
      <motion.div className="identity-details" aria-label="Current roles" style={{ x: copyX, y: copyY }}>
        <span>@mir.stdio</span><span>founder</span>
        <span>@tygrlabs</span><span>product manager</span>
        <span>@10ms</span><span>product exec</span>
        <span>@needin</span><span>snr. product designer</span>
        <span>@heavygari</span><span>product designer</span>
      </motion.div>
      <motion.p className="identity-description" style={{ x: copyX, y: copyY }}>Designing products that solve complex problems through research, systems thinking, and thoughtful execution</motion.p>
    </motion.article>
  );
}

function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-shell home-hero-grid">
        <div className="home-hero-copy">
          <h1 id="home-title"><AnimatedWords text="Product Brain," mode="load" delay={.15} /><AnimatedWords text="Design Heart" as="em" mode="load" delay={.24} /></h1>
          <motion.div className="home-hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .58, delay: .48, ease: motionEase.editorial }}>
            <Link href="/work">see work <Arrow /></Link>
            <a href="mailto:hello@rezwannavid.me">connect <Arrow /></a>
          </motion.div>
        </div>
        <IdentityCard />
      </div>
    </section>
  );
}

function HumanUnderstandingSection() {
  return (
    <section className="human-section" aria-label="Design is deeply about human understanding">
      <div className="human-cluster">
        <ParallaxMedia className="human-image human-clouds" distance={14} xDistance={3} rotateDistance={.55} velocityResponse reveal><Image unoptimized src="/home-design/human-clouds.png?v=2" alt="Soft clouds over a green landscape" width={1844} height={1144} /></ParallaxMedia>
        <ParallaxMedia className="human-image human-flowers" distance={-18} xDistance={-5} rotateDistance={1.2} velocityResponse reveal revealDelay={.09}><Image unoptimized src="/home-design/human-flowers.png?v=2" alt="Flowers and ground textures" width={1028} height={640} /></ParallaxMedia>
        <ParallaxMedia className="human-image human-sky" distance={22} xDistance={6} rotateDistance={-.9} velocityResponse reveal revealDelay={.18}><Image unoptimized src="/home-design/human-sky.png?v=2" alt="Distant tree beneath a warm sky" width={1028} height={640} /></ParallaxMedia>
        <ParallaxMedia className="human-image human-tree" distance={-12} xDistance={4} rotateDistance={.75} velocityResponse reveal revealDelay={.27}><Image unoptimized src="/home-design/human-tree.png?v=2" alt="A tree canopy viewed from below" width={1028} height={984} /></ParallaxMedia>
        <ParallaxMedia className="human-statement" distance={4} xDistance={32} rotateDistance={.5} reveal revealDelay={.36} revealOffset={6}><img src="/home-design/human-statement.png?v=1" alt="Product is deeply about human understanding" width="2901" height="1079" /></ParallaxMedia>
      </div>
    </section>
  );
}

const featured = featuredProjectIds.map((id) => projectRegistry[id]);

function FeaturedWorkSection() {
  return (
    <section className="featured-section" aria-labelledby="featured-title">
      <div className="home-shell featured-layout">
        <h2 id="featured-title" className="featured-sticky"><AnimatedWords text="featured" /><AnimatedWords text="work" delay={.06} /></h2>
        <div className="featured-list">
          {featured.map((project, index) => (
            <motion.article
              className="featured-project"
              key={project.title}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: .12 }}
              transition={{ duration: .7, delay: index * .035, ease: motionEase.editorial }}
            >
              <TiltLink href={project.href} projectId={project.id} ariaLabel={`View ${project.title}, ${project.year}`} className="featured-media-link">
                <RevealMedia className="featured-reveal" delay={.04}>
                  <span className="featured-media-mask">
                    <ParallaxMedia className="featured-scroll-depth" distance={12} velocityResponse>
                      <Image unoptimized priority src={project.resolvedFeaturedThumbnail} alt={project.thumbnailAlt} width={2764} height={1856} sizes="(min-width: 1000px) 691px, 70vw" />
                    </ParallaxMedia>
                    <span className="featured-lock">Case study locked</span>
                  </span>
                </RevealMedia>
              </TiltLink>
              <motion.div className="featured-meta" initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .45, delay: .16, ease: motionEase.snappy }}><span>{project.title}</span><span>{project.year}</span></motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const awards = [
    "Creative Mapper of the Year",
    "Winner of EWU Analytics",
    "Gold in UniV",
    "2nd in BrandAid",
  ];

  return (
    <section className="experience-section home-shell" aria-label="Experience and recognition">
      <motion.div className="experience-frame" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}>
        <motion.div className="experience-media" variants={{ hidden: { clipPath: "inset(8% 0 42% 0 round 8px)" }, visible: { clipPath: "inset(0% 0 0% 0 round 8px)", transition: { duration: .82, ease: motionEase.editorial } } }}>
          <motion.div className="experience-photo" variants={{ hidden: { scale: 1.025, y: 8 }, visible: { scale: 1, y: 0, transition: { duration: .82, ease: motionEase.editorial } } }}>
            <Image unoptimized src="/home-design/experience-banner.png?v=2" alt="Mir Rezwan Navid speaking at a technology event" width={4096} height={2731} sizes="1386px" />
          </motion.div>
          <div
            className="experience-gradient"
            aria-hidden="true"
            style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1172 406' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect width='100%25' height='100%25' fill='url(%23grad)'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-51.8 15.05 -43.445 -149.53 727 151)'><stop stop-color='rgba(0,0,0,0)'/><stop stop-color='rgba(0,53,111,0)' offset='.086538'/><stop stop-color='rgba(0,25,53,.5)' offset='.55916'/><stop stop-color='rgba(0,13,27,.75)' offset='.77958'/><stop stop-color='rgba(0,6,13,.875)' offset='.88979'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")" }}
          />
          <motion.p className="experience-copy" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: .58, delay: .16, ease: motionEase.editorial } } }}><span>7+ years building products </span><span>across industries</span></motion.p>
        </motion.div>
        <motion.div className="experience-awards" variants={{ hidden: {}, visible: { transition: { staggerChildren: .055, delayChildren: .28 } } }}>
          {awards.map((award) => (
            <motion.span className="experience-award" key={award} variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0, transition: { duration: .4, ease: motionEase.snappy } } }}>
              <span className="experience-award-icon" aria-hidden="true"><img src="/home-design/experience-award.svg" alt="" width="16" height="16" /></span>
              <span>{award}</span>
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="home-philosophy" aria-labelledby="philosophy-title">
      <h2 id="philosophy-title"><AnimatedLines text="Product thinking is the culture of 21st-century technology." emphasis="culture" /></h2>
      <VideoFeature />
      <EditorialLinks ariaLabel="More about Mir Rezwan Navid" items={[{ href: "/about", label: "about me" }, { href: "/opinion", label: "opinion" }]} />
    </section>
  );
}

export function PortfolioHomepage() {
  return <><div className="desktop-homepage"><HeroSection /><HumanUnderstandingSection /><FeaturedWorkSection /><WorkRail /><ExperienceSection /><PhilosophySection /><ContactCTA /></div><MobileHomepage /><SiteFooter /></>;
}
