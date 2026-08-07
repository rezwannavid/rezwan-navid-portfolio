"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Magnetic } from "@/components/motion/Magnetic";
import { motionDuration, motionEase } from "@/lib/motion";

type EditorialRoute = "/" | "/work" | "/about" | "/portfolio";

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "https://medium.com/@rezwannavidalvee", label: "Opinion", external: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/Rezwan-Navid-Resume.pdf", label: "Resume", external: true },
];

export function EditorialSiteHeader({ activeRoute }: { activeRoute?: EditorialRoute }) {
  return (
    <motion.header className="home-header" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionDuration.editorial, ease: motionEase.editorial }}>
      <motion.div className="home-header-inner" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: .055, delayChildren: .06 } } }}>
        <motion.div variants={{ hidden: { opacity: 0, y: -4 }, visible: { opacity: 1, y: 0 } }}>
          <Link className="home-logo" href="/" aria-label="Mir Rezwan Navid, home" aria-current={activeRoute === "/" ? "page" : undefined}><img src="/RNLogo.svg" alt="" width="55" height="20" /></Link>
        </motion.div>
        <motion.nav className="home-nav" aria-label="Primary navigation" variants={{ hidden: {}, visible: { transition: { staggerChildren: .035 } } }}>
          {navigation.map((item) => item.external ? (
            <a href={item.href} key={item.label} target="_blank" rel="noreferrer">{item.label}</a>
          ) : (
            <Link href={item.href} key={item.label} aria-current={activeRoute === item.href ? "page" : undefined}>{item.label}</Link>
          ))}
        </motion.nav>
        <motion.a variants={{ hidden: { opacity: 0, x: -4 }, visible: { opacity: 1, x: 0 } }} className="home-contact-link" data-cursor="Open" href="mailto:hello@rezwannavid.me">
          <Magnetic className="home-contact-magnetic" strength={3}>Contact <img src="/home-design/navbar-arrow-right.svg" alt="" width="16" height="16" /></Magnetic>
        </motion.a>
      </motion.div>
    </motion.header>
  );
}
