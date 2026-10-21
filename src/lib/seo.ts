import type { Metadata } from "next";

export const siteUrl = "https://yohanan.design";
export const siteTitle = "Ian Okpoko — Designer & AI Content Strategist";
export const siteDescription = "Ian Okpoko (Ian O) is a designer and AI content strategist. Explore his digital design case studies, AI films, brand ads and creative work.";
const shareImage = {
  url: `${siteUrl}/images/hero-social-preview.png`,
  width: 1200,
  height: 630,
  alt: "Ian Okpoko — Designer and AI content strategist, with olive ribbon hero artwork",
};

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: "Ian Okpoko",
      locale: "en_US",
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage] },
  };
}
