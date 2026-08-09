"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { globalNavigation, globalTextNavigation } from "@/lib/navigation";
import { motionEase } from "@/lib/motion";

type MenuPhase = "idle" | "opening" | "open" | "selecting" | "cover" | "revealing" | "closing";
type MenuItem = { id: string; label: string; href: string; icon?: string; primary: boolean };

const contact = globalNavigation.find((item) => item.id === "contact")!;
const primaryItems: MenuItem[] = [
  ...globalTextNavigation.map((item) => ({ ...item, primary: true })),
  { id: contact.id, label: contact.label, href: contact.href, icon: contact.icon, primary: true },
];
const secondaryItems: MenuItem[] = globalNavigation
  .filter((item) => item.id !== "contact")
  .map((item) => ({ id: item.id, label: item.label, href: item.href, icon: item.icon, primary: false }));

const MotionLink = motion.create(Link);

export function MobileNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<MenuPhase>("idle");
  const [selected, setSelected] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const pendingPath = useRef<string | null>(null);
  const restoreFocus = useRef(false);
  const destinationScroll = useRef(false);
  const lockedScroll = useRef(0);
  const sheetY = useMotionValue(573);
  const layerOpacity = useMotionValue(1);
  const backdropOpacity = useTransform(sheetY, [0, 260, 573], [.62, .22, 0]);
  const combinedBackdropOpacity = useTransform(() => backdropOpacity.get() * layerOpacity.get());
  const menuVisible = phase === "opening" || phase === "open";
  const navVisible = phase === "idle" || phase === "closing" || phase === "revealing";

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const finishReveal = useCallback(() => {
    setMounted(false);
    setPhase("idle");
    setSelected(null);
    pendingPath.current = null;
    sheetY.set(573);
    layerOpacity.set(1);
  }, [layerOpacity, sheetY]);

  const revealDestination = useCallback(() => {
    destinationScroll.current = true;
    document.body.style.top = "0px";
    setPhase("revealing");
    const controls = animate(layerOpacity, 0, {
      duration: reduceMotion ? .08 : .38,
      ease: motionEase.editorial,
      onComplete: finishReveal,
    });
    return () => controls.stop();
  }, [finishReveal, layerOpacity, reduceMotion]);

  const openMenu = () => {
    if (mounted) return;
    clearTimers();
    restoreFocus.current = false;
    destinationScroll.current = false;
    layerOpacity.set(1);
    sheetY.set(reduceMotion ? 0 : 573);
    setMounted(true);
    setPhase("opening");
    requestAnimationFrame(() => {
      animate(sheetY, 0, {
        duration: reduceMotion ? .08 : .52,
        ease: motionEase.editorial,
        onComplete: () => setPhase((current) => current === "opening" ? "open" : current),
      });
    });
  };

  const closeMenu = useCallback((returnToTrigger = true) => {
    if (!mounted || phase === "cover" || phase === "revealing") return;
    clearTimers();
    restoreFocus.current = returnToTrigger;
    setPhase("closing");
    animate(sheetY, 573, {
      duration: reduceMotion ? .08 : .36,
      ease: motionEase.editorial,
      onComplete: () => {
        setMounted(false);
        setPhase("idle");
        setSelected(null);
      },
    });
  }, [clearTimers, mounted, phase, reduceMotion, sheetY]);

  const beginNavigation = (event: MouseEvent<HTMLAnchorElement>, item: MenuItem) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (phase === "selecting" || phase === "cover" || phase === "revealing") return;
    clearTimers();
    restoreFocus.current = false;
    setSelected(item.id);
    setPhase("selecting");

    const coverTimer = window.setTimeout(() => setPhase("cover"), reduceMotion ? 20 : 140);
    const routeTimer = window.setTimeout(() => {
      if (item.href.startsWith("mailto:")) {
        window.location.href = item.href;
        const revealTimer = window.setTimeout(revealDestination, reduceMotion ? 30 : 220);
        timers.current.push(revealTimer);
        return;
      }

      const nextPath = new URL(item.href, window.location.href).pathname;
      if (nextPath === pathname) {
        revealDestination();
        return;
      }
      pendingPath.current = nextPath;
      router.push(item.href);
    }, reduceMotion ? 90 : 540);
    timers.current.push(coverTimer, routeTimer);
  };

  useEffect(() => {
    if (!pendingPath.current || pathname !== pendingPath.current) return;
    const timer = window.setTimeout(revealDestination, reduceMotion ? 20 : 70);
    timers.current.push(timer);
  }, [pathname, reduceMotion, revealDestination]);

  useEffect(() => {
    if (!mounted) return;
    lockedScroll.current = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const previous = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
    };
    body.style.position = "fixed";
    body.style.top = `-${lockedScroll.current}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    return () => {
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.width = previous.bodyWidth;
      body.style.overflow = previous.bodyOverflow;
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, destinationScroll.current ? 0 : lockedScroll.current);
      requestAnimationFrame(() => { html.style.scrollBehavior = previous.htmlScrollBehavior; });
      if (restoreFocus.current) requestAnimationFrame(() => triggerRef.current?.focus());
      destinationScroll.current = false;
    };
  }, [mounted]);

  useEffect(() => {
    if (phase !== "open") return;
    closeRef.current?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = [...sheetRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeMenu, mounted]);

  useEffect(() => {
    const shortLandscape = window.matchMedia("(max-height: 500px) and (orientation: landscape)").matches;
    if (window.innerWidth >= 768 && !shortLandscape) return;
    [...primaryItems, ...secondaryItems].forEach((item) => {
      if (!item.href.startsWith("mailto:")) router.prefetch(item.href);
    });
    return clearTimers;
  }, [clearTimers, router]);

  return (
    <div className="mobile-navigation" data-mobile-nav-phase={phase}>
      <motion.div
        className="mobile-nav-closed"
        aria-hidden={!navVisible}
        animate={{ y: navVisible ? 0 : -82, opacity: navVisible ? 1 : 0, scale: navVisible ? 1 : .985 }}
        transition={{ duration: reduceMotion ? .08 : .3, ease: motionEase.editorial }}
      >
        <div
          className="mobile-nav-glass glass-surface"
          aria-hidden="true"
        />
        <div className="mobile-nav-content">
          <Link className="mobile-nav-home" href="/" aria-label="Mir Rezwan Navid, home"><img src="/RNLogo.svg" alt="" width="55" height="20" /></Link>
          <motion.button
            ref={triggerRef}
            className="mobile-nav-trigger"
            type="button"
            aria-label="Open navigation"
            aria-expanded={mounted}
            aria-controls="mobile-navigation-sheet"
            onClick={openMenu}
            whileTap={reduceMotion ? undefined : { scale: .88, x: 1, y: 1 }}
          ><img src="/icons/HamBurger.svg" alt="" width="20" height="20" /></motion.button>
        </div>
      </motion.div>

      {mounted && (
        <>
          <motion.button
            className="mobile-nav-backdrop"
            type="button"
            aria-label="Close navigation"
            tabIndex={-1}
            style={{ opacity: combinedBackdropOpacity }}
            onClick={() => closeMenu(true)}
          />
          <motion.div
            ref={sheetRef}
            id="mobile-navigation-sheet"
            className="mobile-nav-sheet-layer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            style={{ y: sheetY, opacity: layerOpacity }}
            drag={phase === "open" ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: .82 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y > 118 || (info.offset.y > 42 && info.velocity.y > 680)) closeMenu(true);
              else animate(sheetY, 0, { type: "spring", stiffness: 390, damping: 34, mass: .72 });
            }}
          >
            <motion.div
              className="mobile-nav-sheet-surface"
              animate={phase === "cover" || phase === "revealing"
                ? { width: "100vw", height: "100dvh", borderRadius: 0 }
                : { width: "min(392px, 100vw)", height: 573, borderRadius: 25 }}
              transition={{ duration: reduceMotion ? .08 : .4, ease: motionEase.editorial }}
            />
            <motion.div
              className="mobile-nav-sheet-content"
              animate={{ opacity: menuVisible ? 1 : 0 }}
              transition={{ duration: reduceMotion ? .06 : .18, ease: "easeOut" }}
            >
              <motion.img className="mobile-nav-sheet-logo" src="/RNLogo.svg" alt="" width="55" height="20" initial={false} animate={{ opacity: menuVisible ? 1 : 0, y: menuVisible ? 0 : 7, clipPath: menuVisible ? "inset(0% 0 0% 0)" : "inset(0% 0 100% 0)" }} transition={{ duration: .28, delay: menuVisible ? .08 : 0, ease: motionEase.editorial }} />
              <motion.button ref={closeRef} className="mobile-nav-close" type="button" onClick={() => closeMenu(true)} whileTap={reduceMotion ? undefined : { scale: .92, x: 2, y: 1 }} initial={false} animate={{ opacity: menuVisible ? 1 : 0, y: menuVisible ? 0 : 6 }} transition={{ duration: .24, delay: menuVisible ? .08 : 0 }}>close</motion.button>
              {primaryItems.map((item, index) => <MobileMenuLink key={item.id} item={item} index={index} visible={menuVisible} selected={selected === item.id} reduceMotion={Boolean(reduceMotion)} onNavigate={beginNavigation} />)}
              {secondaryItems.map((item, index) => <MobileMenuLink key={item.id} item={item} index={index} visible={menuVisible} selected={selected === item.id} reduceMotion={Boolean(reduceMotion)} onNavigate={beginNavigation} />)}
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
}

function MobileMenuLink({ item, index, visible, selected, reduceMotion, onNavigate }: {
  item: MenuItem;
  index: number;
  visible: boolean;
  selected: boolean;
  reduceMotion: boolean;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, item: MenuItem) => void;
}) {
  const delay = item.primary ? .13 + index * .055 : .31 + index * .045;
  const className = `mobile-nav-menu-link is-${item.id} ${item.primary ? "is-primary" : "is-secondary"}`;
  const content = (
    <>
      {item.icon && <span className="mobile-nav-menu-icon-mask"><motion.img src={item.icon} alt="" animate={{ y: visible ? 0 : 9, opacity: visible ? 1 : 0 }} transition={{ duration: .28, delay: visible ? delay : 0, ease: motionEase.editorial }} /></span>}
      <span className="mobile-nav-word-mask"><motion.span animate={{ y: visible ? "0%" : "108%", opacity: visible ? 1 : 0 }} transition={{ duration: reduceMotion ? .06 : .34, delay: visible ? delay : 0, ease: motionEase.editorial }}>{item.label}</motion.span></span>
    </>
  );
  const props = {
    className,
    onClick: (event: MouseEvent<HTMLAnchorElement>) => onNavigate(event, item),
    animate: { x: selected ? 4 : 0, opacity: visible || selected ? 1 : 0 },
    whileTap: reduceMotion ? undefined : { x: item.primary ? 4 : 3, scale: item.primary ? .985 : .992, opacity: .72 },
    transition: { duration: .16, ease: motionEase.snappy },
    "aria-label": item.label,
  };
  return item.href.startsWith("mailto:")
    ? <motion.a href={item.href} {...props}>{content}</motion.a>
    : <MotionLink href={item.href} {...props}>{content}</MotionLink>;
}
