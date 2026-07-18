import Link from "next/link";
import { Container } from "@/components/layout/Container";

const socialLinks = [
  ["LinkedIn", "https://www.linkedin.com/in/rezwannavid"],
  ["Medium", "https://medium.com/@rezwannavid"],
  ["GitHub", "https://github.com/rezwannavid"],
  ["Instagram", "https://instagram.com/rezwannavid"],
  ["Email", "mailto:hello@rezwannavid.me"],
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <div className="footer-left">
          <Link href="/" aria-label="Mir Rezwan Navid, home"><img className="footer-logo" src="/rezwan-navid-logo.svg" alt="" width="107" height="39" loading="lazy" /></Link>
          <nav aria-label="Social links">{socialLinks.map(([label, href]) => <a href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{label}</a>)}</nav>
          <span className="version">v1.01</span>
        </div>
        <img className="brain-art" src="/pixel-brain-product-thinking.png" alt="Pixel-art brain representing product thinking and creative problem solving" width="413" height="413" loading="lazy" decoding="async" />
        <div className="impact-wrap"><p className="impact"><span>Create</span><span><em>with</em> Impact</span></p></div>
      </Container>
    </footer>
  );
}
