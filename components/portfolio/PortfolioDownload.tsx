import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function PortfolioDownload() {
  return (
    <section className="portfolio-hero" aria-labelledby="portfolio-title">
      <div className="portfolio-module">
        <Reveal className="portfolio-copy" delay={40}>
          <h1 id="portfolio-title">Portfolio 2026</h1>
          <p>A curated collection of product studies, design systems, AI exploration &amp; product thinking</p>
        </Reveal>

        <Reveal className="portfolio-cover-reveal" delay={140}>
          <div className="portfolio-cover">
            <Image
              src="/portfolio-cover.png"
              alt="Cover of Mir Rezwan Navid’s 2026 product design portfolio"
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 42px), 446px"
            />
          </div>
        </Reveal>

        <Reveal className="portfolio-actions" delay={240}>
          <a className="portfolio-download" href="/Rezwan-Navid-Portfolio-2026.pdf" download>
            Download PDF
          </a>
          <div className="portfolio-meta">
            <span>Last Updated: July 2026</span>
            <span>233kB | 45 Pages</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
