import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/work/CaseStudy";
import { allProjectSlugs, getProject, site } from "@/lib/content";

// Every slug comes from projects.json, so an unknown slug is a real 404 rather
// than a page that builds itself out of empty fields.
export const dynamicParams = false;

export function generateStaticParams() {
  return allProjectSlugs().map((slug) => ({ slug }));
}

type CaseStudyParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: CaseStudyParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getProject(slug);
  if (!study) return { title: "Project not found" };

  const description = `${study.summary} A ${study.category.toLowerCase()} case study for ${site.brand.name}.`;

  return {
    title: study.title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      siteName: site.brand.name,
      title: `${study.title} — ${site.brand.name}`,
      description,
      url: `/work/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — ${site.brand.name}`,
      description,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: CaseStudyParams }) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();

  return <CaseStudy slug={slug} />;
}
