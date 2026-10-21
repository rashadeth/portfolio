"use client";

import Image from "next/image";
import "./portfolio-hero.css";
import { useEffect, useRef } from "react";

export default function PortfolioHero() {
  const hero = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = video.current;
    const section = hero.current;
    if (!media || !section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const sync = () => {
      if (preference.matches || !visible || document.hidden) media.pause();
      else void media.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(section);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("canplay", sync);
    sync();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("canplay", sync);
      media.pause();
    };
  }, []);

  return (
    <section className="portfolio-hero" aria-labelledby="intro-title" ref={hero}>
      <div className="hero-entry" aria-hidden="true">
        <div className="hero-entry-panels">
          {[0, 1, 2, 3, 4].map((panel) => <div className="hero-entry-panel" key={panel} />)}
        </div>
        <div className="hero-entry-brand">
          <Image src="/images/brand/ian-o-logo.png" alt="" width={64} height={64} priority />
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <Image src="/images/hero/reference-clean.png" alt="" fill priority sizes="100vw" className="hero-image hero-poster" />
        <video ref={video} className="hero-image hero-video" autoPlay muted loop playsInline preload="auto" poster="/images/hero/reference-clean.png" tabIndex={-1}>
          <source src="/videos/hero/reference-waves.mp4" type="video/mp4" />
        </video>

      </div>
      <header className="site-header hero-header">
        <a className="wordmark" href="#top" aria-label="Ian O home">
          <Image src="/images/brand/ian-o-white-transparent.png" alt="Ian O" width={88} height={88} priority className="brand-logo" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="mailto:yohananokpoko@gmail.com">Let’s talk</a>
        </nav>
      </header>
      <div className="hero-content">
        <h1 id="intro-title">
          <span className="hero-line"><span>Designer &</span></span>
          <span className="hero-line"><span>AI content</span></span>
          <span className="hero-line"><span>strategist.</span></span>
        </h1>
        <div className="hero-introduction">
          <p>I design digital experiences and create AI-powered ads and brand stories.</p>
          <a className="hero-contact" href="mailto:yohananokpoko@gmail.com">Let’s talk</a>
        </div>
      </div>


    </section>
  );
}
