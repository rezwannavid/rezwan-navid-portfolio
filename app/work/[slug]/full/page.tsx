import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ContactCTA } from "@/components/home/ContactCTA";
import { EditorialSiteHeader } from "@/components/home/EditorialSiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { accessCookieName, hasValidAccessToken } from "@/lib/workAccess";
import { getWorkProject } from "@/lib/workProjects";

export const metadata: Metadata = {
  title: "Protected case study",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
};

export default async function FullProtectedProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project?.protected) notFound();

  const cookieStore = await cookies();
  const token = cookieStore.get(accessCookieName)?.value;
  if (!hasValidAccessToken(token)) redirect(`/work/${slug}`);

  return <div className="home-page protected-full-page"><EditorialSiteHeader activeRoute="/work" /><main className="placeholder-page"><h1>{project.title}</h1><p>{project.shortDescription}</p><p>The complete protected case study is being prepared for this route.</p><Link href="/work">see other work</Link></main><ContactCTA variant="portfolio" /><SiteFooter /></div>;
}
