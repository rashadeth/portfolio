import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yohanan.design";

  return [
    ...["films", "design", "contact"].map((page) => ({ url: `${baseUrl}/${page}`, lastModified: new Date(), priority: 0.8 })),
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
