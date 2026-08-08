import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { EditorialSiteHeader } from "@/components/home/EditorialSiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProtectedCaseStudy, type ProtectedCaseStudyData } from "@/components/work/ProtectedCaseStudy";
import { EventFlowProjectPage } from "@/components/work/design-project/EventFlowProjectPage";
import { FodoProjectPage } from "@/components/work/design-project/FodoProjectPage";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, schemaIds, webPageSchema } from "@/lib/structuredData";
import { absoluteUrl, projects } from "@/lib/site";
import { accessCookieName, hasValidAccessToken } from "@/lib/workAccess";
import { getWorkProject } from "@/lib/workProjects";

type ProtectedPreviewEditorial = Omit<ProtectedCaseStudyData, "slug" | "title" | "role" | "year" | "previewImages">;

const protectedPreviews: Record<string, ProtectedPreviewEditorial> = {
  ridecentric: {
    timeline: "6 months",
    responsibilities: "Product Vision, Product Strategy, Discovery, Prioritization, UX Leadership, Stakeholder Alignment, Delivery",
    team: [
      { label: "PM", value: "01" },
      { label: "Engineers", value: "07" },
      { label: "QA", value: "02" },
      { label: "Designer", value: "03" },
    ],
    statement: "Designing an enterprise mobility platform for corporate travel, events, and transportation operations.",
  },
};

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
    const token = cookieStore.get(accessCookieName)?.value;
    if (hasValidAccessToken(token)) redirect(`/work/${slug}/full`);
    const preview = protectedPreviews[slug];
    if (!preview) notFound();
    const data: ProtectedCaseStudyData = {
      ...preview,
      slug: workProject.slug,
      title: workProject.title,
      role: workProject.role,
      year: workProject.year,
      previewImages: [{ src: workProject.hero, alt: workProject.thumbnailAlt }],
    };
    return <div className="home-page protected-case-page"><EditorialSiteHeader activeRoute="/work" /><ProtectedCaseStudy data={data} /><SiteFooter /></div>;
  }

  if (slug === "eventflow") return <EventFlowProjectPage />;
  if (slug === "fodo") return <FodoProjectPage />;

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
