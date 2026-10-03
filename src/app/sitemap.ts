import type { MetadataRoute } from "next";
import { allProjectSlugs, site } from "@/lib/content";

/**
 * Every route a visitor can land on. The `/#section` links are anchors on `/`,
 * so they are not listed separately.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = site.brand.url;
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  return [
    ...routes.map((route) => ({
      url: `${origin}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...allProjectSlugs().map((slug) => ({
      url: `${origin}/work/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
