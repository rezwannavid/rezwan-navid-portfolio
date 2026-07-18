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

  return createPageMetadata({
    title: `${project.title} Product Design Project — Rezwan Navid`,
    description: `${project.title} is a ${project.year} product design project by Mir Rezwan Navid. This project page will present the product thinking, UX, UI, and design process.`,
    path: `/work/${project.slug}`,
    keywords: [`${project.title} design`, `${project.title} case study`, "Rezwan Navid project", "product design project"],
    category: "Product Design Project",
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
  const title = `${project.title} Product Design Project — Rezwan Navid`;
  const description = `${project.title} is a ${project.year} product design project by Mir Rezwan Navid. The full case study is coming soon.`;
  const creativeWork = {
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(path)}#project`,
    name: project.title,
    description,
    copyrightYear: Number(project.year),
    creator: { "@id": schemaIds.person },
    url: absoluteUrl(path),
    isPartOf: { "@id": `${absoluteUrl("/work")}#webpage` },
  };

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
      <h1>{project.title} case study coming soon.</h1>
      <Link href="/work">Explore Rezwan Navid’s product design work</Link>
    </main><SiteFooter /></>;
}
