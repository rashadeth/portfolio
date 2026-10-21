import { pageMetadata } from "@/lib/seo";
import PortfolioHeader from "@/components/PortfolioHeader";
import ContactComposer from "@/components/ContactComposer";

export const metadata = pageMetadata("/contact", "Contact Ian Okpoko", "Contact Ian Okpoko about digital design, an AI film, content strategy or a creative collaboration.");
export default function Contact() {
  return <main className="portfolio contact-page">
    <PortfolioHeader />
    <div className="contact-layout">
      <div className="contact-intro"><h1>Let’s talk.</h1></div>
      <ContactComposer />
    </div>
  </main>;
}
