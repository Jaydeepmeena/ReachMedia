import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { getPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts(100);

  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    // Every published post, so search engines find them without a deploy.
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
