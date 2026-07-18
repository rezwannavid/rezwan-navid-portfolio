import { TiltLink } from "@/components/motion/TiltLink";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/lib/site";

export function ProjectGrid() {
  return (
    <section className="selected-work" aria-labelledby="selected-work-title">
      <h2 id="selected-work-title" className="eyebrow work-eyebrow">Selected works</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal className={`project project-${index + 1}`} delay={(index % 3) * 70} key={project.slug}>
            <TiltLink href={`/work/${project.slug}`} ariaLabel={`View ${project.title}, ${project.year}`}>
              <span className="project-media" aria-hidden="true" />
              <span className="project-meta"><span>{project.title}</span><span>{project.year}</span></span>
            </TiltLink>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
