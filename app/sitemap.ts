import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getBuildSystems, getJournalPosts, getPartners } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const [systems, posts, partners] = await Promise.all([
    getBuildSystems(),
    getJournalPosts(),
    getPartners(),
  ]);

  const staticRoutes = [
    "",
    "/build",
    "/build/timeline",
    "/journal",
    "/watch",
    "/partners",
    "/partners/enquire",
    "/gear",
    "/about",
    "/story",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const dynamicRoutes = [
    ...systems.map((s) => ({ url: `${base}/build/${s.slug}`, lastModified: new Date(), priority: 0.6 })),
    ...posts.map((p) => ({ url: `${base}/journal/${p.slug}`, lastModified: new Date(p.publishedAt), priority: 0.6 })),
    ...partners.map((p) => ({ url: `${base}/partners/${p.slug}`, lastModified: new Date(), priority: 0.5 })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
