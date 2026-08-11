"use client";

import Link from "next/link";
import { EditorialArrow } from "@/components/home/ContactCTA";
import { ProjectLink } from "@/components/motion/ProjectTransition";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { publishedProjects, type ResolvedProject } from "@/lib/projectRegistry";

const cardCount = Math.min(4, publishedProjects.length);
const projectPairs = publishedProjects.slice(0, cardCount).map((project, index) => [
  project,
  publishedProjects[(index + cardCount) % publishedProjects.length] ?? project,
] as const);

function ProjectImage({ project, state }: { project: ResolvedProject; state: "primary" | "alternate" }) {
  return (
    <ProjectLink className={`work-rail-image is-${state}`} href={project.href} projectId={project.id} aria-label={`View ${project.title}`} data-cursor="View">
      <ProjectMedia project={project} context="small" />
    </ProjectLink>
  );
}

export function WorkRail({ className = "" }: { className?: string }) {
  return (
    <section className={`work-rail home-shell ${className}`.trim()} aria-label="See all work">
      <span className="work-rail-thumbnails">
        {projectPairs.map(([primaryProject, alternateProject], index) => {
          const direction = index % 2 === 0 ? "up" : "down";
          const primary = <ProjectImage project={primaryProject} state="primary" />;
          const alternate = <ProjectImage project={alternateProject} state="alternate" />;
          return (
            <span className={`work-rail-card is-${direction}`} key={`${primaryProject.id}-${alternateProject.id}`}>
              <span className="work-rail-card-track">{direction === "up" ? <>{primary}{alternate}</> : <>{alternate}{primary}</>}</span>
            </span>
          );
        })}
      </span>
      <Link className="work-rail-cta" href="/work"><span className="work-rail-label">see all work</span><EditorialArrow /></Link>
    </section>
  );
}
