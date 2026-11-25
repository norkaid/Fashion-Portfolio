import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import ProjectView from "@/components/ProjectView";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: [{ url: p.cover.src }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const next = projects[(i + 1) % projects.length];
  return <ProjectView project={projects[i]} index={i} next={next} />;
}
