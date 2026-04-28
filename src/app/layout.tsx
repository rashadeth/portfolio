import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
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
  title: "Ian Okpoko — Product Designer & Developer",
  description:
    "Product designer and frontend developer based in Abuja, Nigeria. Building digital products from Figma to React and Flutter.",
  openGraph: {
    title: "Ian Okpoko — Product Designer & Developer",
    description:
      "Product designer and frontend developer based in Abuja, Nigeria. Building digital products from Figma to React and Flutter.",
    url: "https://ianokpoko.com",
    siteName: "Ian Okpoko",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Okpoko — Product Designer & Developer",
    description:
      "Product designer and frontend developer based in Abuja, Nigeria. Building digital products from Figma to React and Flutter.",
    creator: "@yohanansoltd",
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
    </html>
  );
}
