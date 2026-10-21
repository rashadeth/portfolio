import { pageMetadata } from "@/lib/seo";
import PortfolioHeader from "@/components/PortfolioHeader";
import { DesignGallery } from "@/components/WorkGalleries";

export const metadata = pageMetadata("/design", "Digital Design & Case Studies — Ian Okpoko", "Explore digital design projects and product design case studies by Ian Okpoko.");
export default function Design() {
  return <main className="portfolio collection-page design-page">
    <PortfolioHeader />
    <div className="collection-intro"><h1>Digital design.</h1><p>Thoughtful experiences, from idea to interface.</p></div>
    <section className="work-section" aria-label="All design projects"><DesignGallery /></section>
  </main>;
}
