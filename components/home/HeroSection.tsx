import { Container } from "@/components/layout/Container";

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
          <span className="orbit-word product">Product</span>
          <span className="orbit-word brain">Brain</span>
          <span className="orbit-word design">Design</span>
          <span className="orbit-word heart">Heart</span>
          <img className="portrait" src="/MRNFacePotrait.svg" alt="Pixel-art portrait of Rezwan Navid" width="380" height="380" />
        </div>
        <h1 id="hero-heading" className="intro"><span>Rezwan Navid</span> <img src="/icons/Dot.svg" alt="" /> <span className="intro-muted">Product Thinker</span><br />I build systems with impact</h1>
        <dl className="roles">
          {roles.map(([company, role]) => <div key={company}><dt>{company}</dt><dd>{role}</dd></div>)}
        </dl>
      </Container>
    </section>
  );
}
