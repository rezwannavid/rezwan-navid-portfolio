"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { motionEase } from "@/lib/motion";

export function SiteFooter() {
  const closingRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: closingRef, offset: ["start end", "end start"] });
  const landscapeY = useTransform(scrollYProgress, [0, 1], [-7, 7]);
  const titleY = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <footer className="home-site-footer home-shell">
      <motion.div ref={closingRef} className="closing-art" initial={{ opacity: .2, scale: .992 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .78, ease: motionEase.editorial }}>
        <motion.div className="closing-landscape-depth" style={{ y: reduceMotion ? 0 : landscapeY }}><Image unoptimized className="closing-landscape" src="/home-design/footer-landscape.png?v=1" alt="A solitary tree beneath a blue landscape" width={4096} height={2403} sizes="1078px" /></motion.div>
        <motion.img className="closing-curved-title" style={{ y: reduceMotion ? 0 : titleY }} src="/home-design/create-with-impact.png?v=1" alt="Create with Impact" width="1471" height="329" />
        <img className="closing-logo" src="/RNLogo.svg" alt="" width="55" height="20" />
        <img className="closing-logo-secondary" src="/RNLogo.svg" alt="" width="55" height="20" />
        <nav className="closing-nav" aria-label="Footer navigation">
          <Link href="/">home</Link><Link href="/work">work</Link><Link href="/about">about</Link><a href="https://medium.com/@rezwannavidalvee" target="_blank" rel="noreferrer">opinions</a><a href="mailto:hello@rezwannavid.me">contact</a><Link href="/portfolio">portfolio</Link><a href="/Rezwan-Navid-Resume.pdf">resume</a>
        </nav>
        <nav className="closing-socials" aria-label="Social links">
          <a href="https://instagram.com/rezwannavid" aria-label="Instagram"><img src="/home-design/footer-instagram.svg" alt="" width="24" height="24" /></a>
          <a href="https://www.linkedin.com/in/rezwannavid" aria-label="LinkedIn"><img src="/home-design/footer-linkedin.svg" alt="" width="24" height="24" /></a>
          <a href="https://threads.net/@rezwannavid" aria-label="Threads"><img src="/home-design/footer-threads.svg" alt="" width="24" height="24" /></a>
          <a href="https://medium.com/@rezwannavidalvee" aria-label="Medium"><img src="/home-design/footer-medium.svg" alt="" width="24" height="24" /></a>
          <a href="https://github.com/rezwannavid" aria-label="GitHub"><img src="/home-design/footer-github.svg" alt="" width="24" height="24" /></a>
        </nav>
        <p className="made-with">made with coffee and droopy eyes</p>
      </motion.div>
    </footer>
  );
}
