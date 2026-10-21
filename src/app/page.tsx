import Image from "next/image";
import Link from "next/link";
import PortfolioHero from "@/components/PortfolioHero";
import PortfolioScrollReveal from "@/components/PortfolioScrollReveal";

export default function Home() {
  return <main className="portfolio" id="top">
    <PortfolioScrollReveal />
    <PortfolioHero />
    <section className="home-collection home-films">
      <Link href="/films" className="collection-link">
        <div className="collection-cover"><Image src="/images/ads/chowdeck-zayith-cover.jpg" alt="Chowdeck × Zayith AI film" fill sizes="(max-width: 700px) 100vw, 90vw" /></div>
        <div className="collection-label"><h2>Films & ads</h2><span>Explore films</span></div>
      </Link>
    </section>
    <section className="home-collection home-design">
      <Link href="/design" className="collection-link">
        <div className="collection-cover"><Image src="/images/ads/foodcourt.jpg" alt="Foodcourt digital design" fill sizes="(max-width: 700px) 100vw, 90vw" /></div>
        <div className="collection-label"><h2>Digital design</h2><span>Explore design</span></div>
      </Link>
    </section>
  </main>;
}
