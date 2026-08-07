import Image from "next/image";
import Link from "next/link";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { TiltLink } from "@/components/motion/TiltLink";
import { VideoFeature } from "@/components/home/VideoFeature";

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <span className={`home-arrow${diagonal ? " is-diagonal" : ""}`} aria-hidden="true">→</span>;

function PortfolioHeader() {
  return (
    <header className="home-header">
      <div className="home-header-inner">
        <Link className="home-logo" href="/" aria-label="Mir Rezwan Navid, home"><img src="/RNLogo.svg" alt="" width="55" height="20" /></Link>
        <nav className="home-nav" aria-label="Primary navigation">
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <a href="https://medium.com/@rezwannavid" target="_blank" rel="noreferrer">Opinion</a>
          <Link href="/portfolio">Portfolio</Link>
          <a href="/Rezwan-Navid-Portfolio-2026.pdf" target="_blank" rel="noreferrer">Resume</a>
        </nav>
        <a className="home-contact-link" href="mailto:hello@rezwannavid.me">Contact <img src="/home-design/navbar-arrow-right.svg" alt="" width="16" height="16" /></a>
      </div>
    </header>
  );
}

function IdentityCard() {
  return (
    <article className="identity-card" aria-label="Mir Rezwan Navid profile">
      <span className="identity-overline">04/08</span>
      <p className="identity-role"><strong>design engineer /</strong><br /><em>product thinker</em></p>
      <div className="identity-photo"><Image unoptimized src="/home-design/profile-card-portrait.png?v=1" alt="Portrait of Mir Rezwan Navid" width={904} height={904} priority /></div>
      <p className="identity-name"><span>Mir</span><br /><strong>Rezwan</strong><br /><em>Navid</em></p>
      <div className="identity-details" aria-label="Current roles">
        <span>@mir.stdio</span><span>founder</span>
        <span>@tygrlabs</span><span>product manager</span>
        <span>@10ms</span><span>product exec</span>
        <span>@needin</span><span>snr. product designer</span>
        <span>@heavygari</span><span>product designer</span>
      </div>
      <p className="identity-description">Designing products that solve complex problems through research, systems thinking, and thoughtful execution</p>
    </article>
  );
}

function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-shell home-hero-grid">
        <div className="home-hero-copy">
          <h1 id="home-title"><span>Product Brain,</span><em>Design Heart</em></h1>
          <div className="home-hero-actions">
            <Link href="/work">see work <Arrow /></Link>
            <a href="mailto:hello@rezwannavid.me">connect <Arrow /></a>
          </div>
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
        <ParallaxMedia className="human-image human-flowers" distance={9}><Image unoptimized src="/home-design/human-flowers.png?v=2" alt="Flowers and ground textures" width={1028} height={640} /></ParallaxMedia>
        <ParallaxMedia className="human-image human-sky" distance={14}><Image unoptimized src="/home-design/human-sky.png?v=2" alt="Distant tree beneath a warm sky" width={1028} height={640} /></ParallaxMedia>
        <ParallaxMedia className="human-image human-clouds" distance={18}><Image unoptimized src="/home-design/human-clouds.png?v=2" alt="Soft clouds over a green landscape" width={1844} height={1144} /></ParallaxMedia>
        <ParallaxMedia className="human-image human-tree" distance={25}><Image unoptimized src="/home-design/human-tree.png?v=2" alt="A tree canopy viewed from below" width={1028} height={984} /></ParallaxMedia>
        <ParallaxMedia className="human-statement" distance={11}>Design is deeply about human understanding</ParallaxMedia>
      </div>
    </section>
  );
}

const featured = [
  { title: "ridecentric+", year: "2026", image: "/home-design/project-ridecentric.png?v=2", href: "/work/ridecentric", alt: "RideCentric transportation operations dashboard" },
  { title: "trewhub", year: "2026", image: "/home-design/project-trewhub.png?v=2", href: "/work", alt: "Trewhub executive leadership summit product interface" },
  { title: "Navi AI", year: "2026", image: "/home-design/project-navi-ai.png?v=2", href: "/work", alt: "Navi AI idea generation interface" },
];

function FeaturedWorkSection() {
  return (
    <section className="featured-section" aria-labelledby="featured-title">
      <div className="home-shell featured-layout">
        <h2 id="featured-title" className="featured-sticky">featured<br />work</h2>
        <div className="featured-list">
          {featured.map((project) => (
            <article className="featured-project" key={project.title}>
              <TiltLink href={project.href} ariaLabel={`View ${project.title}, ${project.year}`} className="featured-media-link">
                <Image unoptimized src={project.image} alt={project.alt} width={2764} height={1856} sizes="(min-width: 1000px) 691px, 70vw" />
                <span className="featured-lock">Case study locked</span>
              </TiltLink>
              <div className="featured-meta"><span>{project.title}</span><span>{project.year}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkRail() {
  return (
    <Link className="work-rail home-shell" href="/work">
      <span className="work-rail-thumbnails" aria-hidden="true">
        <span><Image unoptimized src="/home-design/thumb-dashboard.png?v=2" alt="" width={4096} height={2733} /></span>
        <span><Image unoptimized src="/home-design/thumb-phone-green.png?v=2" alt="" width={1854} height={2000} /></span>
        <span><Image unoptimized src="/home-design/thumb-phone-pink.png?v=2" alt="" width={1368} height={2828} /></span>
        <span><Image unoptimized src="/home-design/thumb-phone-coral.png?v=2" alt="" width={4096} height={2730} /></span>
      </span>
      <span className="work-rail-label">see all work</span><Arrow />
    </Link>
  );
}

function ExperienceSection() {
  return (
    <section className="experience-section home-shell" aria-label="Experience and recognition">
      <div className="experience-frame">
        <Image unoptimized src="/home-design/experience-banner.png?v=2" alt="Mir Rezwan Navid speaking at a technology event" width={4096} height={2731} sizes="1080px" />
        <p>7+ years building<br />products across<br />industries</p>
        <div className="experience-awards"><span>◈ Creative Mapper of The Year</span><span>♙ Winner of EWU Analytics</span><span>♙ GetinView</span><span>♙ 2nd in BrandAid</span></div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="home-philosophy" aria-labelledby="philosophy-title">
      <h2 id="philosophy-title">Product thinking is the <u>culture</u> of<br />21st-century technology.</h2>
      <VideoFeature />
      <nav className="editorial-links" aria-label="More about Mir Rezwan Navid">
        <Link href="/about">about me <Arrow /></Link>
        <a href="https://medium.com/@rezwannavid" target="_blank" rel="noreferrer">opinion <Arrow /></a>
      </nav>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="home-contact home-shell" aria-labelledby="contact-title">
      <div className="contact-row"><h2 id="contact-title">let’s build something<br />worth building</h2><a href="mailto:hello@rezwannavid.me">email me <Arrow /></a></div>
      <div className="closing-art">
        <Image unoptimized className="closing-landscape" src="/home-design/footer-landscape.png?v=1" alt="A solitary tree beneath a blue landscape" width={4096} height={2403} sizes="1078px" />
        <img className="closing-curved-title" src="/home-design/create-with-impact.png?v=1" alt="Create with Impact" width="1471" height="329" />
        <img className="closing-logo" src="/RNLogo.svg" alt="" width="55" height="20" />
        <nav className="closing-nav" aria-label="Footer navigation">
          <Link href="/">home</Link><Link href="/work">work</Link><Link href="/about">about</Link><a href="https://medium.com/@rezwannavid" target="_blank" rel="noreferrer">opinions</a><a href="mailto:hello@rezwannavid.me">contact</a><Link href="/portfolio">portfolio</Link><a href="/Rezwan-Navid-Portfolio-2026.pdf">resume</a>
        </nav>
        <nav className="closing-socials" aria-label="Social links">
          <a href="https://instagram.com/rezwannavid" aria-label="Instagram"><img src="/home-design/footer-instagram.svg" alt="" width="24" height="24" /></a>
          <a href="https://www.linkedin.com/in/rezwannavid" aria-label="LinkedIn"><img src="/home-design/footer-linkedin.svg" alt="" width="24" height="24" /></a>
          <a href="https://threads.net/@rezwannavid" aria-label="Threads"><img src="/home-design/footer-threads.svg" alt="" width="24" height="24" /></a>
          <a href="https://medium.com/@rezwannavid" aria-label="Medium"><img src="/home-design/footer-medium.svg" alt="" width="24" height="24" /></a>
          <a href="https://github.com/rezwannavid" aria-label="GitHub"><img src="/home-design/footer-github.svg" alt="" width="24" height="24" /></a>
        </nav>
        <p className="made-with">made with coffee and droopy eyes</p>
      </div>
    </section>
  );
}

export function PortfolioHomepage() {
  return <><PortfolioHeader /><HeroSection /><HumanUnderstandingSection /><FeaturedWorkSection /><WorkRail /><ExperienceSection /><PhilosophySection /><ContactSection /></>;
}
