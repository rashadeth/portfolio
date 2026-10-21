import Image from "next/image";
import Link from "next/link";

export default function PortfolioHeader({ light = false }: { light?: boolean }) {
  return <header className={`site-header ${light ? "hero-header" : "page-header"}`}>
    <Link className="wordmark" href="/" aria-label="Ian O home">
      <Image src="/images/brand/ian-o-white-transparent.png" alt="Ian O" width={88} height={88} priority className="brand-logo" />
    </Link>
    <nav className="desktop-navigation" aria-label="Main navigation">
      <Link href="/films">Films</Link>
      <Link href="/design">Design</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  </header>;
}
