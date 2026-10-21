import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
  title: "Ian O — Designer & AI Content Strategist",
  description: "Digital design, AI films and brand stories by Ian Okpoko, designer and AI content strategist.",
  metadataBase: new URL("https://yohanan.design"),
  openGraph: {
    title: "Ian O — Designer & AI Content Strategist",
    description: "Digital design, AI films and brand stories by Ian Okpoko, designer and AI content strategist.",
    url: "https://yohanan.design",
    siteName: "Ian O",
    images: [
      {
        url: "https://yohanan.design/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ian O — Designer & AI Content Strategist",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian O — Designer & AI Content Strategist",
    description: "Digital design, AI films and brand stories by Ian Okpoko, designer and AI content strategist.",
    images: [{ url: "https://yohanan.design/images/og-image.png", alt: "Ian O — Designer & AI Content Strategist" }],
  },
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
        {children}
      </body>
      <Script
        id="person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ian Okpoko",
            alternateName: "Ian O",
            url: "https://yohanan.design",
            jobTitle: "Designer & AI Content Strategist",
            address: {
              "@type": "PostalAddress",
              addressLocality: "9.0722° N, 7.4891° E",
              addressCountry: "NG",
            },
            sameAs: ["https://x.com/yohanansoltd"],
          }),
        }}
      />
    </html>
  );
}
