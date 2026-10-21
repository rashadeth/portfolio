import { pageMetadata } from "@/lib/seo";
import PortfolioHeader from "@/components/PortfolioHeader";
import { FilmGallery } from "@/components/WorkGalleries";

export const metadata = pageMetadata("/films", "AI Films & Ads — Ian Okpoko", "AI films, brand ads and creator-style stories by Ian Okpoko, designer and AI content strategist.");
export default function Films() {
  return <main className="portfolio collection-page">
    <PortfolioHeader />
    <div className="collection-intro"><h1>Films & ads.</h1><p>Brand stories, made differently.</p></div>
    <section className="work-section" aria-label="All films"><FilmGallery /></section>
  </main>;
}
