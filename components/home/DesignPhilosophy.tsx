import { Container } from "@/components/layout/Container";
import { AnimatedDivider } from "@/components/ui/AnimatedDivider";
import { Reveal } from "@/components/ui/Reveal";

export function DesignPhilosophy() {
  return (
    <section className="philosophy" aria-labelledby="philosophy-title">
      <Container>
        <AnimatedDivider />
        <Reveal className="philosophy-layout">
          <div>
            <h2 id="philosophy-title" className="eyebrow">Design philosophy</h2>
            <p>Design, in every form, from software interaction to architecture is fundamentally about <strong>understanding human</strong>, their perception, their interaction. Connecting at a deeper subconscious level to string their intention</p>
          </div>
          <img className="eye-art" src="/EyeImage.png" alt="" width="736" height="594" />
        </Reveal>
      </Container>
    </section>
  );
}
