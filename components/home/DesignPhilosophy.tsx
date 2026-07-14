import { Container } from "@/components/layout/Container";
import { AnimatedDivider } from "@/components/ui/AnimatedDivider";
import { Reveal } from "@/components/ui/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

export function DesignPhilosophy() {
  return (
    <section className="philosophy" aria-labelledby="philosophy-title">
      <Container>
        <AnimatedDivider />
        <Reveal className="philosophy-layout">
          <div>
            <h2 id="philosophy-title" className="eyebrow">Design philosophy</h2>
            <p><LineReveal>{[
              <>Design, in every form, from&nbsp;</>,
              <>software interaction to&nbsp;</>,
              <>architecture is fundamentally&nbsp;</>,
              <>about <strong>understanding human</strong>,&nbsp;</>,
              <>their perception, their&nbsp;</>,
              <>interaction. Connecting at a&nbsp;</>,
              <>deeper subconscious level to&nbsp;</>,
              <>string their intention</>,
            ]}</LineReveal></p>
          </div>
          <img className="eye-art" src="/EyeImage.png" alt="" width="736" height="594" />
        </Reveal>
      </Container>
    </section>
  );
}
