import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProtectedProjectGate } from "@/components/work/ProtectedProjectGate";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, schemaIds, webPageSchema } from "@/lib/structuredData";
import { absoluteUrl, projects } from "@/lib/site";
import { accessCookieName, hasValidAccessToken } from "@/lib/workAccess";
import { getWorkProject } from "@/lib/workProjects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  const workProject = getWorkProject(slug);
  const title = workProject?.seoTitle ?? `${project.title} — Case Study Preview`;
  const description = workProject?.seoDescription ?? `A future portfolio case study by Mir Rezwan Navid about ${project.title}.`;

  return createPageMetadata({
    title,
    description,
    path: `/work/${project.slug}`,
    keywords: [`${project.title} design`, `${project.title} case study`, "Mir Rezwan Navid project"],
    category: "Product Design Project",
    indexable: project.indexable && Boolean(workProject) && !workProject?.protected,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const workProject = getWorkProject(slug);
  if (workProject?.protected) {
    const cookieStore = await cookies();
    const token = cookieStore.get(accessCookieName(slug))?.value;
    if (!hasValidAccessToken(slug, token)) {
      return <><SiteHeader /><ProtectedProjectGate slug={slug} title={project.title} /><SiteFooter /></>;
    }
  }

  const path = `/work/${project.slug}`;
  const title = workProject?.seoTitle ?? `${project.title} — Case Study Preview`;
  const description = workProject?.seoDescription ?? `A future portfolio case study by Mir Rezwan Navid about ${project.title}.`;
  const creativeWork = workProject ? {
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(path)}#project`,
    name: project.title,
    description,
    copyrightYear: Number(project.year),
    creator: { "@id": schemaIds.person },
    url: absoluteUrl(path),
    isPartOf: { "@id": `${absoluteUrl("/work")}#webpage` },
  } : null;

  return <><SiteHeader /><main className="placeholder-page">
      <JsonLd data={pageSchema(
        webPageSchema({ name: title, description, path }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path },
        ]),
        creativeWork,
      )} />
      <h1>{project.title}</h1>
      {workProject && <p>{workProject.shortDescription}</p>}
      <p>The full case study is coming soon.</p>
      <Link href="/work">Explore Mir Rezwan Navid’s selected work</Link>
    </main><SiteFooter /></>;
}
