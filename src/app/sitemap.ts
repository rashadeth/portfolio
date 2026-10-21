import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yohanan.design";

  return [
    ...getAllSlugs().map((slug) => ({ url: `${baseUrl}/case-study/${slug}`, priority: 0.7 })),
    ...["films", "design", "contact"].map((page) => ({ url: `${baseUrl}/${page}`, lastModified: new Date(), priority: 0.8 })),
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
