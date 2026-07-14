import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const projects = [
  { title: "RideCentric+", year: "2026", slug: "ridecentric" },
  { title: "Global Mission Institute", year: "2026", slug: "global-mission-institute" },
  { title: "Drivers App", year: "2025", slug: "drivers-app" },
  { title: "RideSync", year: "2024", slug: "ridesync" },
  { title: "Ruckus Games", year: "2026", slug: "ruckus-games" },
  { title: "Kivo", year: "2026", slug: "kivo" },
  { title: "Hobbit", year: "2026", slug: "hobbit" },
  { title: "TygrLabs", year: "2024", slug: "tygrlabs" },
  { title: "Global Mission Summit", year: "2025", slug: "global-mission-summit" },
];

export function ProjectGrid() {
  return (
    <section className="selected-work" aria-labelledby="selected-work-title">
      <p id="selected-work-title" className="eyebrow work-eyebrow">Selected works</p>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal className={`project project-${index + 1}`} delay={(index % 3) * 70} key={project.slug}>
            <Link href={`/work/${project.slug}`} aria-label={`View ${project.title}, ${project.year}`}>
              <span className="project-media" aria-hidden="true" />
              <span className="project-meta"><span>{project.title}</span><span>{project.year}</span></span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
