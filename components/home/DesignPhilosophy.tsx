import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { AnimatedDivider } from "@/components/ui/AnimatedDivider";
import { Reveal } from "@/components/ui/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";

export function DesignPhilosophy() {
  return (
    <section className="philosophy" aria-labelledby="philosophy-title">
      <Container>
        <AnimatedDivider />
        <Reveal className="philosophy-layout">
          <div>
            <h2 id="philosophy-title" className="eyebrow">Design philosophy</h2>
            <p><LineReveal>{[
              <Fragment key="design">Design, in every form, from&nbsp;</Fragment>,
              <Fragment key="software">software interaction to&nbsp;</Fragment>,
              <Fragment key="architecture">architecture is fundamentally&nbsp;</Fragment>,
              <Fragment key="human">about <strong>understanding human</strong>,&nbsp;</Fragment>,
              <Fragment key="perception">their perception, their&nbsp;</Fragment>,
              <Fragment key="interaction">interaction. Connecting at a&nbsp;</Fragment>,
              <Fragment key="subconscious">deeper subconscious level to&nbsp;</Fragment>,
              <Fragment key="intention">string their intention</Fragment>,
            ]}</LineReveal></p>
          </div>
          <ParallaxMedia className="eye-art-wrap" distance={12}>
            <img className="eye-art" src="/pixel-eye-human-centered-design.png" alt="Pixel-art eye representing perception and human-centered design" width="736" height="594" loading="lazy" decoding="async" />
          </ParallaxMedia>
        </Reveal>
      </Container>
    </section>
  );
}
