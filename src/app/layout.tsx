import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { pageMetadata, siteUrl, siteTitle, siteDescription } from "@/lib/seo";
import GlassNav from "@/components/GlassNav";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./brand-theme.css";
import "./portfolio-pages.css";

const manrope = Manrope({
  variable: "--font-sans",
  weight: ["300", "400"],
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...pageMetadata("/", siteTitle, siteDescription),
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Ian Okpoko", url: siteUrl }],
  creator: "Ian Okpoko",
  publisher: "Ian Okpoko",
  keywords: ["Ian Okpoko", "Ian O", "designer", "AI content strategist", "digital design", "AI films"],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll />
        {children}
        <GlassNav />
      <script
        id="person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${siteUrl}/#ian-okpoko`,
                name: "Ian Okpoko",
                alternateName: "Ian O",
                url: siteUrl,
                jobTitle: "Designer & AI Content Strategist",
                description: siteDescription,
                knowsAbout: ["Digital design", "Product design", "AI filmmaking", "Content strategy"],
                sameAs: ["https://x.com/yohanansoltd"],
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: "Ian Okpoko",
                alternateName: "Ian O Portfolio",
                url: siteUrl,
                description: siteDescription,
                inLanguage: "en",
                author: { "@id": `${siteUrl}/#ian-okpoko` },
              },
            ],
          }),
        }}
      />
      </body>
    </html>
  );
}
