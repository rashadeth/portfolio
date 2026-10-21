import type { Metadata } from "next";
import PortfolioHeader from "@/components/PortfolioHeader";
import { FilmGallery } from "@/components/WorkGalleries";

export const metadata: Metadata = { title: "Films — Ian O", description: "AI films, brand ads and creator-style stories by Ian Okpoko." };
export default function Films() {
  return <main className="portfolio collection-page">
    <PortfolioHeader />
    <div className="collection-intro"><h1>Films & ads.</h1><p>Brand stories, made differently.</p></div>
    <section className="work-section" aria-label="All films"><FilmGallery /></section>
  </main>;
}
