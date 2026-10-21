import type { Metadata } from "next";
import PortfolioHeader from "@/components/PortfolioHeader";
import ContactComposer from "@/components/ContactComposer";

export const metadata: Metadata = { title: "Contact — Ian O", description: "Start a conversation about a film, design project or creative collaboration." };
export default function Contact() {
  return <main className="portfolio contact-page">
    <PortfolioHeader />
    <div className="contact-layout">
      <div className="contact-intro"><h1>Start with<br />an idea.</h1><p>Pick a message. Add your own touch if you like. Let’s see what we can make.</p></div>
      <ContactComposer />
    </div>
  </main>;
}
