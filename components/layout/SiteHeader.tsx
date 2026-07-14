"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatedDivider } from "@/components/ui/AnimatedDivider";

const email = "mailto:hello@rezwannavid.me";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => drawerRef.current?.querySelector<HTMLElement>("a")?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const update = () => headerRef.current?.toggleAttribute("data-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header ref={headerRef} className="site-header">
      <div className="header-inner">
        <div className="desktop-nav-group">
          <Link className="brand" href="/" aria-label="Mir Rezwan Navid, home">
            <img src="/RNLogo.svg" alt="" width="107" height="39" />
            <span>Mir Rezwan Navid</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <div className="desktop-socials">
          <a href="https://www.linkedin.com/in/rezwannavid" target="_blank" rel="noreferrer" aria-label="Mir Rezwan Navid on LinkedIn"><img src="/icons/LinkedIn.svg" alt="" /></a>
          <a href={email} aria-label="Email Mir Rezwan Navid"><img src="/icons/Email.svg" alt="" /></a>
        </div>

        <button ref={triggerRef} className="mobile-icon mobile-menu-trigger" data-open={open} type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => open ? close(false) : setOpen(true)}>
          <img src="/icons/HamBurger.svg" alt="" />
          <span className="menu-close-glyph" aria-hidden="true"><i /><i /></span>
        </button>
        <Link className="mobile-brand" href="/" aria-label="Mir Rezwan Navid, home"><img src="/RNLogo.svg" alt="" /><span>Mir Rezwan Navid</span></Link>
        <a className="mobile-icon mobile-email" href={email} aria-label="Email Mir Rezwan Navid"><img src="/icons/Email.svg" alt="" /></a>
      </div>
      <AnimatedDivider className="header-divider" />

      <div className="drawer-backdrop" data-open={open} onMouseDown={(event) => event.target === event.currentTarget && close()}>
        <div ref={drawerRef} id="mobile-navigation" className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <nav className="drawer-primary" aria-label="Mobile primary navigation">
            <Link href="/work" onClick={() => close(false)}>Work</Link>
            <Link href="/about" onClick={() => close(false)}>About</Link>
          </nav>
          <img className="drawer-brain" src="/BrainImage.png" alt="" />
          <div className="drawer-social-panel">
            <nav className="drawer-socials" aria-label="Mobile social links">
              <a href="https://www.linkedin.com/in/rezwannavid" target="_blank" rel="noreferrer" onClick={() => close(false)}>LinkedIn</a>
              <a href={email} onClick={() => close(false)}>Email</a>
              <a href="https://instagram.com/rezwannavid" target="_blank" rel="noreferrer" onClick={() => close(false)}>Instagram</a>
              <a href="https://medium.com/@rezwannavid" target="_blank" rel="noreferrer" onClick={() => close(false)}>Medium</a>
              <a href="https://github.com/rezwannavid" target="_blank" rel="noreferrer" onClick={() => close(false)}>GitHub</a>
            </nav>
            <span className="drawer-version">v1.01</span>
          </div>
        </div>
      </div>
    </header>
  );
}
