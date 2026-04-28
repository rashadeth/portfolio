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
  metadataBase: new URL("https://yohanan.design"),
  title: "Ian Okpoko — Product Designer & Developer",
  description:
    "Product designer and frontend developer based in Abuja, Nigeria. Building digital products from Figma to React and Flutter.",
  openGraph: {
    title: "Ian Okpoko — Product Designer & Developer",
    description:
      "Product designer and frontend developer based in Abuja, Nigeria. Building digital products from Figma to React and Flutter.",
    url: "https://yohanan.design",
    siteName: "Ian Okpoko",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Okpoko — Product Designer & Developer",
    description:
      "Product designer and frontend developer based in Abuja, Nigeria. Building digital products from Figma to React and Flutter.",
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
      <body className="min-h-full flex flex-col font-sans">{children}</body>
      <Script
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
        type="module"
        strategy="beforeInteractive"
      />
    </html>
  );
}
