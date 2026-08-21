"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, type PanInfo } from "motion/react";
import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { siteConfig } from "@/lib/site";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, src: "/Contact/mingcute_linkedin-line.png" },
  { label: "Instagram", href: siteConfig.social.instagram, mask: "/home-design/footer-instagram.svg" },
  { label: "Threads", href: "https://threads.net/@rezwannavid", src: "/Contact/mingcute_threads-line.png" },
  { label: "Medium", href: siteConfig.social.medium, src: "/Contact/mingcute_medium-line.png" },
  { label: "GitHub", href: siteConfig.social.github, mask: "/home-design/footer-github.svg" },
] as const;

const cardSpring = { stiffness: 290, damping: 27, mass: .72 };

export function ContactPageContent() {
  const stageRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);
  const scale = useMotionValue(1);
  const smoothRotateX = useSpring(rotateX, cardSpring);
  const smoothRotateY = useSpring(rotateY, cardSpring);
  const smoothRotateZ = useSpring(rotateZ, cardSpring);
  const smoothScale = useSpring(scale, cardSpring);

  const resetAttitude = () => {
    rotateX.set(0);
    rotateY.set(0);
    rotateZ.set(0);
    scale.set(1);
  };

  const resetCard = () => {
    x.set(0);
    y.set(0);
    resetAttitude();
  };

  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - .5;
    const vertical = (event.clientY - bounds.top) / bounds.height - .5;
    rotateX.set(vertical * -10);
    rotateY.set(horizontal * 12);
    rotateZ.set(horizontal * 1.4);
  };

  const push = (_event: MouseEvent | TouchEvent | globalThis.PointerEvent, info: PanInfo) => {
    if (reduceMotion) return;
    rotateY.set(Math.max(-11, Math.min(11, info.velocity.x / 85)));
    rotateX.set(Math.max(-8, Math.min(8, -info.velocity.y / 100)));
    rotateZ.set(Math.max(-4, Math.min(4, info.velocity.x / 230)));
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    const distance = event.shiftKey ? 28 : 12;
    if (event.key === "ArrowLeft") x.set(x.get() - distance);
    else if (event.key === "ArrowRight") x.set(x.get() + distance);
    else if (event.key === "ArrowUp") y.set(y.get() - distance);
    else if (event.key === "ArrowDown") y.set(y.get() + distance);
    else if (event.key.toLowerCase() === "r" || event.key === "Escape") resetCard();
    else return;
    event.preventDefault();
  };

  return (
    <main ref={stageRef} className="contact-page" aria-labelledby="contact-page-title">
      <h1 id="contact-page-title" className="visually-hidden">Contact Mir Rezwan Navid</h1>
      <div className="contact-card-perspective">
        <motion.div
          className="contact-card"
          data-node-id="1573:8431"
          tabIndex={0}
          role="group"
          aria-label="Interactive contact card. Drag it, tilt it with your pointer, or use the arrow keys. Press R to reset."
          drag={!reduceMotion}
          dragConstraints={stageRef}
          dragElastic={.16}
          dragMomentum
          dragTransition={{ bounceStiffness: 260, bounceDamping: 24, power: .28, timeConstant: 260 }}
          style={{ x, y, rotateX: smoothRotateX, rotateY: smoothRotateY, rotateZ: smoothRotateZ, scale: smoothScale }}
          onPointerMove={tilt}
          onPointerLeave={resetAttitude}
          onPointerDown={() => scale.set(.985)}
          onPointerUp={() => scale.set(1)}
          onDragStart={() => scale.set(1.025)}
          onDrag={push}
          onDragEnd={() => { scale.set(1); window.setTimeout(resetAttitude, 90); }}
          onDoubleClick={resetCard}
          onKeyDown={handleKeyboard}
          whileFocus={reduceMotion ? undefined : { boxShadow: "0 32px 90px rgba(37,91,246,.22)" }}
        >
          <span className="contact-card-date">04/08</span>
          <span className="contact-card-place">Dacca</span>

          <img className="contact-signature contact-signature-rezwan" src="/Contact/Group 123291.png" alt="" width="341" height="215" draggable="false" />
          <img className="contact-signature contact-signature-mir" src="/Contact/Group 123292.png" alt="" width="108" height="127" draggable="false" />
          <img className="contact-portrait" src="/Contact/Group 123223.png" alt="Illustrated portrait of Mir Rezwan Navid" width="296" height="319" draggable="false" />
          <img className="contact-signature contact-signature-navid" src="/Contact/Group 123290.png" alt="" width="351" height="202" draggable="false" />

          <a className="contact-card-email" href="mailto:m.rezwannavid@gmail.com" aria-label="Email m.rezwannavid@gmail.com">
            <img src="/Contact/m.rezwannavid@gmail.com.png" alt="m.rezwannavid@gmail.com" width="400" height="32" draggable="false" />
          </a>

          <nav className="contact-card-socials" aria-label="Social profiles">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} data-cursor="Open">
                {"src" in social ? (
                  <img src={social.src} alt="" width="50" height="50" draggable="false" />
                ) : (
                  <span className="contact-card-social-mask" style={{ WebkitMaskImage: `url(${social.mask})`, maskImage: `url(${social.mask})` }} />
                )}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
      <p className="visually-hidden">The contact card can be dragged with a mouse or touch. Double-click it, press Escape, or press R to return it to its starting position.</p>
    </main>
  );
}
