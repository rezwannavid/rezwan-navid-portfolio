import { ConnectSection } from "@/components/home/ConnectSection";
import { DesignPhilosophy } from "@/components/home/DesignPhilosophy";
import { HeroSection } from "@/components/home/HeroSection";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ProjectGrid />
        <DesignPhilosophy />
        <ConnectSection />
      </main>
      <SiteFooter />
    </>
  );
}
