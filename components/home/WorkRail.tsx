"use client";

import Image from "next/image";
import Link from "next/link";
import { EditorialArrow } from "@/components/home/ContactCTA";
import { projectRegistry, seeAllWorkProjectIds } from "@/lib/projectRegistry";

const projectPairs = Array.from({ length: 4 }, (_, index) => [
  projectRegistry[seeAllWorkProjectIds[index * 2]],
  projectRegistry[seeAllWorkProjectIds[index * 2 + 1]],
]);

function ProjectImage({ project, state }: { project: (typeof projectPairs)[number][number]; state: "primary" | "alternate" }) {
  const contain = project.resolvedThumbnail.includes("thumb-phone-green") || project.resolvedThumbnail.includes("thumb-phone-pink");
  return (
    <Link className={`work-rail-image is-${state}`} href={project.href} aria-label={`View ${project.title}`} data-cursor="View">
      <Image unoptimized className={contain ? "is-contain" : ""} src={project.resolvedThumbnail} alt={project.thumbnailAlt} fill sizes="154px" loading="eager" />
    </Link>
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
