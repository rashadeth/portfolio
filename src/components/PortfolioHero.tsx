"use client";

import Image from "next/image";
import Link from "next/link";
import PortfolioHeader from "./PortfolioHeader";
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
    media.muted = true;
    media.defaultMuted = true;
    media.controls = false;
    let visible = true;
    const playing = () => { section.dataset.playing = "true"; };
    const paused = () => { section.dataset.playing = "false"; };
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
    media.addEventListener("playing", playing);
    media.addEventListener("pause", paused);
    document.addEventListener("pointerdown", sync, { passive: true });
    document.addEventListener("touchend", sync, { passive: true });
    sync();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("canplay", sync);
      media.removeEventListener("playing", playing);
      media.removeEventListener("pause", paused);
      document.removeEventListener("pointerdown", sync);
      document.removeEventListener("touchend", sync);
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
          <Image src="/images/brand/ian-o-white-transparent.png" alt="" width={64} height={64} priority />
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <Image src="/images/hero/olive-waves-poster.jpg" alt="" fill priority sizes="100vw" className="hero-image hero-poster" />
        <video ref={video} className="hero-image hero-video" autoPlay muted loop playsInline controls={false} disablePictureInPicture disableRemotePlayback controlsList="nodownload nofullscreen noremoteplayback" preload="auto" poster="/images/hero/olive-waves-poster.jpg" tabIndex={-1}>
          <source src="/videos/hero/olive-waves.mp4" type="video/mp4" />
        </video>

      </div>
      <PortfolioHeader light />
      <div className="hero-content">
        <h1 id="intro-title">
          <span className="hero-line"><span>Designer &</span></span>
          <span className="hero-line"><span>AI content</span></span>
          <span className="hero-line"><span>strategist.</span></span>
        </h1>
        <div className="hero-introduction">
          <p>I design digital experiences and create AI-powered ads and brand stories.</p>
          <Link className="hero-contact" href="/contact">Let’s talk</Link>
        </div>
      </div>


    </section>
  );
}
