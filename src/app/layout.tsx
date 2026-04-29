import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import Script from "next/script";
import ScrollToTopOnLoad from "@/components/ScrollToTopOnLoad";
import SmoothScroll from "@/components/SmoothScroll";
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
  metadataBase: new URL("https://yohanan.design"),
  title: {
    default: "Ian Okpoko — Design Engineer in Abuja",
    template: "%s | Ian Okpoko",
  },
  description:
    "Ian Okpoko is a design engineer in Abuja, Nigeria, building digital products from concept to launch across web and mobile.",
  keywords: [
    "Ian Okpoko",
    "Ian Rashad",
    "Design Engineer",
    "Product Designer Nigeria",
    "Frontend Developer Abuja",
    "UI UX Designer Nigeria",
    "Portfolio",
    "Yohanan Design",
  ],
  applicationName: "Ian Okpoko Portfolio",
  authors: [{ name: "Ian Okpoko", url: "https://yohanan.design" }],
  creator: "Ian Okpoko",
  publisher: "Ian Okpoko",
  category: "portfolio",
  alternates: {
    canonical: "https://yohanan.design",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ian Okpoko — Design Engineer in Abuja",
    description:
      "Design engineer portfolio for Ian Okpoko: product design and frontend development work across web and mobile.",
    url: "https://yohanan.design",
    siteName: "Ian Okpoko Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Okpoko — Design Engineer in Abuja",
    description:
      "Design engineer portfolio for Ian Okpoko: selected projects, product design, and frontend development.",
    creator: "@yohanansoltd",
    images: ["/og-image.png"],
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
        <SmoothScroll>
          <ScrollToTopOnLoad />
          {children}
        </SmoothScroll>
      </body>
      <Script
        id="person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ian Okpoko",
            alternateName: "Ian Rashad",
            url: "https://yohanan.design",
            jobTitle: "Design Engineer",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Abuja",
              addressCountry: "NG",
            },
            sameAs: [
              "https://www.linkedin.com/in/ian-okpoko-9b35922b6",
              "https://x.com/yohanansoltd",
              "https://www.tiktok.com/@yohanan.sol",
            ],
          }),
        }}
      />
    </html>
  );
}
