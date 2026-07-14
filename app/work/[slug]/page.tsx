import Link from "next/link";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <main className="placeholder-page"><p>{slug.replaceAll("-", " ")} case study coming soon.</p><Link href="/">Return home</Link></main>;
}
