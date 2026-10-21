import type { Metadata } from "next";
import PortfolioHeader from "@/components/PortfolioHeader";
import ContactComposer from "@/components/ContactComposer";

export const metadata: Metadata = { title: "Contact — Ian O", description: "Start a conversation about a film, design project or creative collaboration." };
export default function Contact() {
  return <main className="portfolio contact-page">
    <PortfolioHeader />
    <div className="contact-layout">
      <div className="contact-intro"><h1>Let’s talk.</h1></div>
      <ContactComposer />
    </div>
  </main>;
}
