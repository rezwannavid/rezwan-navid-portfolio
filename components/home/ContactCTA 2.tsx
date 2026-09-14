"use client";

import { AnimatedLines } from "@/components/motion/AnimatedLines";
import { Magnetic } from "@/components/motion/Magnetic";

export function EditorialArrow({ magnetic = false }: { magnetic?: boolean }) {
  const arrow = <span className="home-arrow" aria-hidden="true">→</span>;
  return magnetic ? <Magnetic strength={5}>{arrow}</Magnetic> : arrow;
}

export function ContactCTA({ variant = "home" }: { variant?: "home" | "portfolio" }) {
  return (
    <section className={`home-contact home-shell${variant === "portfolio" ? " is-portfolio" : ""}`} aria-labelledby={`${variant}-contact-title`}>
      <div className="contact-row">
        <h2 id={`${variant}-contact-title`}><AnimatedLines text="let’s build something worth building" /></h2>
        <a href="mailto:hello@rezwannavid.me" data-cursor="Open"><Magnetic className="contact-email-magnetic" strength={3}><span>email me</span> <EditorialArrow /></Magnetic></a>
      </div>
    </section>
  );
}
