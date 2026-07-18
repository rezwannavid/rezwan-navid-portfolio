import { Container } from "@/components/layout/Container";
import { HeroMagneticWords } from "@/components/home/HeroMagneticWords";

const roles = [
  ["Mir Stdio", "Founder"],
  ["TygrLabs", "Product Manager"],
  ["10MS", "Exec - Product & Branding"],
  ["Needin", "Product Designer"],
  ["HeavyGari", "Product Designer"],
];

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <Container className="hero-inner">
        <div className="orbit" aria-hidden="true">
          <HeroMagneticWords />
          <img className="portrait" src="/mir-rezwan-navid-portrait.svg" alt="" width="380" height="380" loading="eager" fetchPriority="high" />
        </div>
        <h1 id="hero-heading" className="intro">
          <span className="intro-name">Mir Rezwan Navid</span>
          <span className="intro-title"><img src="/icons/Dot.svg" alt="" width="12" height="12" /> <span className="intro-muted">Product Thinker</span></span>
          <span className="intro-impact">I build systems with impact</span>
        </h1>
        <dl className="roles">
          {roles.map(([company, role]) => <div key={company}><dt>{company}</dt><dd>{role}</dd></div>)}
        </dl>
      </Container>
    </section>
  );
}
