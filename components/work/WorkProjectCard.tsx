import { TiltLink } from "@/components/motion/TiltLink";
import { CategoryIcon } from "@/components/work/CategoryIcon";
import type { WorkProject } from "@/lib/workProjects";

function LockIcon() {
  return <svg aria-hidden="true" viewBox="0 0 18 18" width="18" height="18"><path d="M5.5 8V5.75a3.5 3.5 0 0 1 7 0V8M4 8h10v7H4V8Z" fill="currentColor" /></svg>;
}

export function WorkProjectCard({ project, index }: { project: WorkProject; index: number }) {
  return (
    <article className="work-project-card" data-project-index={index} id={`project-${project.number}`}>
      <div className="work-card-compress">
        <div className="work-card-heading">
          <div className="work-card-title-row">
            <h2>{project.title}</h2>
            {project.protected && <span className="work-protected-label"><LockIcon />Password Protected</span>}
          </div>
          <p>{project.role}</p>
        </div>

        <div className="work-card-layout">
          <TiltLink className="work-card-media" href={project.href} ariaLabel={`View ${project.title} case study${project.protected ? ", password protected" : ""}`}>
            {project.thumbnail ? (
              <img src={project.thumbnail} alt={project.thumbnailAlt} width="1184" height="680" loading={index === 0 ? "eager" : "lazy"} decoding="async" />
            ) : (
              <span className="work-card-placeholder" role="img" aria-label={project.thumbnailAlt} />
            )}
          </TiltLink>

          <div className="work-card-meta">
            <div className="work-card-meta-top">
              <span className="work-category-tag"><CategoryIcon />{project.categoryLabel}</span>
              <dl>
                <div><dt className="sr-only">Year</dt><dd>{project.year}</dd></div>
                <div><dt className="sr-only">Status</dt><dd>Shipped</dd></div>
                <div><dt className="sr-only">Client</dt><dd>{project.client}</dd></div>
              </dl>
            </div>
            <p className="work-card-mobile-role">{project.role}</p>
            <p>{project.shortDescription}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
