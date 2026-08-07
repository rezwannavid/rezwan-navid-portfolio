"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { RevealMedia } from "@/components/motion/RevealMedia";
import { TiltLink } from "@/components/motion/TiltLink";
import { motionEase } from "@/lib/motion";

type PortfolioPdf = {
  fileSize: string;
  href: string;
  lastUpdated: string;
  pageCount: number;
};

const resumeHref = "/Rezwan-Navid-Resume.pdf";

export function PortfolioDownload({ pdf }: { pdf: PortfolioPdf }) {
  const downloads = [
    { label: "download portfolio", href: pdf.href, filename: "Rezwan-Navid-Portfolio-2026.pdf" },
    { label: "download resume", href: resumeHref, filename: "Rezwan-Navid-Resume.pdf" },
  ];

  return (
    <section className="portfolio-showcase" aria-labelledby="portfolio-title">
      <div className="portfolio-intro">
        <h1 id="portfolio-title"><AnimatedWords text="portfolio" mode="load" delay={.12} /></h1>
        <p><AnimatedLines text="A curated collection of product studies, design systems, AI exploration & product thinking" delay={.12} /></p>
      </div>

      <motion.div className="portfolio-artifact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .34, ease: motionEase.editorial }}>
        <TiltLink href={pdf.href} ariaLabel="Open Mir Rezwan Navid’s 2026 portfolio PDF" cursorLabel="View" className="portfolio-cover-link">
          <RevealMedia className="portfolio-cover-reveal" delay={.3}>
            <span className="portfolio-cover-mask">
              <ParallaxMedia className="portfolio-cover-parallax" distance={7}>
                <Image
                  src="/cover.png"
                  alt="Cover of Mir Rezwan Navid’s 2026 product design portfolio"
                  fill
                  priority
                  unoptimized
                  sizes="425px"
                />
              </ParallaxMedia>
            </span>
          </RevealMedia>
        </TiltLink>
        <motion.div className="portfolio-metadata" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .42, delay: .66, ease: motionEase.snappy }}>
          <span>Last updated {pdf.lastUpdated}</span>
          <span>{pdf.pageCount} Pages | {pdf.fileSize}</span>
        </motion.div>
      </motion.div>

      <div className="portfolio-download-grid">
        {downloads.map((download, index) => (
          <motion.a
            className="portfolio-download-row"
            href={download.href}
            download={download.filename}
            data-cursor="Download"
            key={download.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .45 }}
            transition={{ duration: .54, delay: index * .07, ease: motionEase.editorial }}
          >
            <span>{download.label}</span>
            <img src="/home-design/download.svg" alt="" width="26" height="26" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
