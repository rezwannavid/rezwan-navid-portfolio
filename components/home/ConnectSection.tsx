import { Container } from "@/components/layout/Container";
import { AnimatedDivider } from "@/components/ui/AnimatedDivider";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";

export function ConnectSection() {
  return (
    <section className="connect" aria-labelledby="connect-title">
      <Container>
        <AnimatedDivider />
        <Reveal className="connect-layout">
          <div><p className="eyebrow">Connect</p><h2 id="connect-title">Let’s build something memorable</h2></div>
          <PillButton />
        </Reveal>
      </Container>
    </section>
  );
}
