"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatedDivider } from "@/components/ui/AnimatedDivider";

const email = "mailto:hello@rezwannavid.me";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => drawerRef.current?.querySelector<HTMLElement>("a")?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="desktop-nav-group">
          <Link className="brand" href="/" aria-label="Rezwan Navid, home">
            <img src="/RNLogo.svg" alt="" width="107" height="39" />
            <span>Rezwan Navid</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <div className="desktop-socials">
          <a href="https://www.linkedin.com/in/rezwannavid" target="_blank" rel="noreferrer" aria-label="Rezwan Navid on LinkedIn"><img src="/icons/LinkedIn.svg" alt="" /></a>
          <a href={email} aria-label="Email Rezwan Navid"><img src="/icons/Email.svg" alt="" /></a>
        </div>

        <button ref={triggerRef} className="mobile-icon mobile-menu-trigger" type="button" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}>
          <img src="/icons/HamBurger.svg" alt="" />
        </button>
        <Link className="mobile-brand" href="/" aria-label="Rezwan Navid, home"><img src="/RNLogo.svg" alt="" /><span>Rezwan Navid</span></Link>
        <a className="mobile-icon mobile-email" href={email} aria-label="Email Rezwan Navid"><img src="/icons/Email.svg" alt="" /></a>
      </div>
      <AnimatedDivider className="header-divider" />

      <div className="drawer-backdrop" data-open={open} onMouseDown={(event) => event.target === event.currentTarget && close()}>
        <div ref={drawerRef} id="mobile-navigation" className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button className="drawer-close" type="button" onClick={() => close()} aria-label="Close navigation">Close</button>
          <nav>
            <Link href="/work" onClick={() => close(false)}>Work</Link>
            <Link href="/about" onClick={() => close(false)}>About</Link>
            <a href="https://www.linkedin.com/in/rezwannavid" target="_blank" rel="noreferrer" onClick={() => close(false)}>LinkedIn</a>
            <a href={email} onClick={() => close(false)}>Email</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
