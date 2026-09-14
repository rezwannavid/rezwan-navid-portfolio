"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { globalNavigation, globalTextNavigation, isNavigationItemActive, isTextNavigationItemActive, type GlobalNavItem, type GlobalTextNavItem } from "@/lib/navigation";
import { motionEase, physicalSpring } from "@/lib/motion";
import { GlassNavbarSurface } from "@/components/layout/GlassNavbarSurface";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

type TooltipState = { label: string; visible: boolean; pathname: string };
const MotionLink = motion.create(Link);

export function GlobalNavbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [tooltip, setTooltip] = useState<TooltipState>({ label: "", visible: false, pathname });
  const suppressTooltip = useRef(false);
  const suppressTimer = useRef<number | null>(null);
  const tooltipX = useMotionValue(0);
  const tooltipY = useMotionValue(0);
  const smoothTooltipX = useSpring(tooltipX, { stiffness: 520, damping: 38, mass: .42 });
  const smoothTooltipY = useSpring(tooltipY, { stiffness: 520, damping: 38, mass: .42 });

  useEffect(() => () => { if (suppressTimer.current) window.clearTimeout(suppressTimer.current); }, []);

  const updateTooltipPosition = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    tooltipX.set(event.clientX + 16);
    tooltipY.set(event.clientY + 10);
  };

  const showTooltip = (label: string, event: PointerEvent<HTMLElement>) => {
    if (suppressTooltip.current || reduceMotion || event.pointerType !== "mouse") return;
    tooltipX.jump(event.clientX + 16);
    tooltipY.jump(event.clientY + 10);
    smoothTooltipX.jump(event.clientX + 16);
    smoothTooltipY.jump(event.clientY + 10);
    setTooltip({ label, visible: true, pathname });
  };

  const hideTooltip = () => setTooltip((current) => ({ ...current, visible: false }));
  const beginNavigation = () => {
    suppressTooltip.current = true;
    hideTooltip();
    if (suppressTimer.current) window.clearTimeout(suppressTimer.current);
    suppressTimer.current = window.setTimeout(() => { suppressTooltip.current = false; }, 450);
  };

  return (
    <>
    <header className="global-navbar global-navbar-desktop" data-node-id="856:40143">
      <motion.div
        className="global-navbar-shell"
        initial={false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={reduceMotion ? { duration: .12 } : { duration: .72, ease: motionEase.editorial }}
      >
        <GlassNavbarSurface className="global-navbar-glass">
          <motion.div
            className="global-navbar-content"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: .12 } : { duration: .42, delay: .18, ease: motionEase.editorial }}
          >
            <LayoutGroup id="global-navbar-active-state">
              <div className="global-navbar-primary">
                <NavbarLogo pathname={pathname} reduceMotion={Boolean(reduceMotion)} />
                <nav className="global-navbar-text-items" aria-label="Main pages">
                  {globalTextNavigation.map((item) => (
                    <NavbarTextItem
                      key={item.id}
                      item={item}
                      active={isTextNavigationItemActive(pathname, item)}
                      reduceMotion={Boolean(reduceMotion)}
                      onNavigate={beginNavigation}
                    />
                  ))}
                </nav>
              </div>

              <motion.nav layout className="global-navbar-items" aria-label="Primary navigation" onPointerMove={updateTooltipPosition} onPointerLeave={() => { suppressTooltip.current = false; }}>
                {globalNavigation.map((item) => {
                  const active = isNavigationItemActive(pathname, item);
                  return (
                    <NavbarItem
                      key={item.id}
                      item={item}
                      active={active}
                      reduceMotion={Boolean(reduceMotion)}
                      onTooltipShow={showTooltip}
                      onTooltipHide={hideTooltip}
                      onNavigate={beginNavigation}
                    />
                  );
                })}
              </motion.nav>
            </LayoutGroup>
          </motion.div>
        </GlassNavbarSurface>
      </motion.div>

      <AnimatePresence>
        {tooltip.visible && tooltip.pathname === pathname && (
          <motion.div
            className="global-navbar-tooltip"
            aria-hidden="true"
            style={{ x: smoothTooltipX, y: smoothTooltipY }}
            initial={{ opacity: 0, scale: .92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .96 }}
            transition={{ duration: reduceMotion ? .08 : .15, ease: motionEase.snappy }}
          >
            <motion.span layout>{tooltip.label}</motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    <MobileNavigation />
    </>
  );
}

function NavbarTextItem({ item, active, reduceMotion, onNavigate }: {
  item: GlobalTextNavItem;
  active: boolean;
  reduceMotion: boolean;
  onNavigate: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, physicalSpring);
  const smoothY = useSpring(y, physicalSpring);

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - .5) * 6);
    y.set(((event.clientY - rect.top) / rect.height - .5) * 4);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <MotionLink
      href={item.href}
      prefetch={false}
      className={`global-navbar-text-item${active ? " is-active" : ""}`}
      aria-current={active ? "page" : undefined}
      onPointerMove={move}
      onPointerLeave={reset}
      onClick={onNavigate}
      style={{ x: smoothX, y: smoothY }}
      whileTap={reduceMotion ? undefined : { scale: .98 }}
    >
      <motion.span className="global-navbar-text-label" animate={{ y: 0 }} whileHover={reduceMotion ? undefined : { y: -1 }} transition={{ duration: .18, ease: motionEase.snappy }}>{item.label}</motion.span>
      {active && <motion.span className="global-navbar-underline" layoutId="global-navbar-underline" transition={reduceMotion ? { duration: 0 } : { duration: .3, ease: motionEase.editorial }} />}
    </MotionLink>
  );
}

function NavbarLogo({ pathname, reduceMotion }: { pathname: string; reduceMotion: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, physicalSpring);
  const smoothY = useSpring(y, physicalSpring);

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - .5) * 3);
    y.set(((event.clientY - rect.top) / rect.height - .5) * 3);
  };

  const reset = () => { x.set(0); y.set(0); };
  const commonProps = {
    className: "global-navbar-logo",
    "aria-label": "Mir Rezwan Navid, home",
    "aria-current": pathname === "/" ? ("page" as const) : undefined,
    onPointerMove: move,
    onPointerLeave: reset,
    style: { x: smoothX, y: smoothY },
    whileTap: reduceMotion ? undefined : { scale: .985 },
  };

  return pathname === "/" ? (
    <motion.a {...commonProps} href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); }}>
      <img src="/RNLogo.svg" alt="" width="55" height="20" />
    </motion.a>
  ) : (
    <MotionLink href="/" prefetch={false} {...commonProps}><img src="/RNLogo.svg" alt="" width="55" height="20" /></MotionLink>
  );
}

function NavbarItem({ item, active, reduceMotion, onTooltipShow, onTooltipHide, onNavigate }: {
  item: GlobalNavItem;
  active: boolean;
  reduceMotion: boolean;
  onTooltipShow: (label: string, event: PointerEvent<HTMLElement>) => void;
  onTooltipHide: () => void;
  onNavigate: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const smoothX = useSpring(x, physicalSpring);
  const smoothY = useSpring(y, physicalSpring);
  const smoothRotate = useSpring(rotate, { stiffness: 310, damping: 28, mass: .62 });
  const alwaysLabeled = item.id === "contact";
  const labelVisible = active || alwaysLabeled;

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - .5;
    const relativeY = (event.clientY - rect.top) / rect.height - .5;
    x.set(relativeX * 6);
    y.set(relativeY * 4);
    rotate.set(relativeX * 10);
  };

  const reset = () => { x.set(0); y.set(0); rotate.set(0); onTooltipHide(); };
  const content = (
    <>
      <motion.img className={`global-navbar-icon global-navbar-icon-${item.id}`} src={item.icon} alt="" width={item.iconSize} height={item.iconSize} style={{ rotate: smoothRotate }} />
      <motion.span
        className="global-navbar-label"
        aria-hidden={!labelVisible}
        animate={{ opacity: labelVisible ? 1 : 0, width: labelVisible ? item.labelWidth : 0, x: labelVisible ? 0 : -3 }}
        transition={{ duration: reduceMotion ? .08 : .3, ease: motionEase.editorial }}
      >{item.label}</motion.span>
      {active && <motion.span className="global-navbar-underline" layoutId="global-navbar-underline" transition={reduceMotion ? { duration: 0 } : { duration: .28, ease: motionEase.editorial }} />}
    </>
  );
  const interactionProps = {
    className: `global-navbar-item global-navbar-item-${item.id}${active ? " is-active" : ""}`,
    "aria-label": item.label,
    "aria-current": active ? ("page" as const) : undefined,
    onPointerEnter: (event: PointerEvent<HTMLAnchorElement>) => { if (!labelVisible) onTooltipShow(item.label, event); },
    onPointerMove: move,
    onPointerLeave: reset,
    onClick: onNavigate,
    style: { x: smoothX, y: smoothY },
    layout: "position" as const,
    transition: { layout: reduceMotion ? { duration: 0 } : { duration: .3, ease: motionEase.editorial } },
    whileTap: reduceMotion ? undefined : { scale: .98 },
  };

  if (item.external || item.href.startsWith("mailto:")) {
    return <motion.a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} {...interactionProps}>{content}</motion.a>;
  }

  return <MotionLink href={item.href} prefetch={false} {...interactionProps}>{content}</MotionLink>;
}
