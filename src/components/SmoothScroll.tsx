"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = 80;

function ScrollTriggerBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const unsub = lenis.on("scroll", () => {
      ScrollTrigger.update();
    });
    ScrollTrigger.refresh();
    return () => {
      unsub();
    };
  }, [lenis]);

  return null;
}

function FluidParallax() {
  useGSAP(() => {
    // Desktop only — touch devices use native scroll with no GSAP interference.
    if (window.innerWidth <= 1024) return;

    const layers = gsap.utils.toArray<HTMLElement>(
      document.querySelectorAll("main [data-parallax-layer]"),
    );

    if (!layers.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      layers.forEach((layer) => {
        const base = Number(layer.dataset.parallaxAmount ?? "36");
        const trigger = layer.closest("section");
        if (!trigger) return;

        gsap.fromTo(
          layer,
          { y: -base },
          {
            y: base,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.75,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return null;
}

function SmoothAnchors() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      if (href === "#") {
        if (event.cancelable) event.preventDefault();
        lenis.scrollTo(0, { duration: 1.05 });
        return;
      }

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      if (event.cancelable) event.preventDefault();
      lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.1 });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

function NativeSmoothAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      if (event.cancelable) event.preventDefault();

      if (href === "#") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
      }

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      const absoluteTop = window.scrollY + el.getBoundingClientRect().top - NAV_OFFSET;
      window.scrollTo({
        top: Math.max(absoluteTop, 0),
        left: 0,
        behavior: "smooth",
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // Lenis runs only on screens wider than 1024px — every touch device gets
  // 100% native browser scroll with zero JS interference.
  const [useLenis, setUseLenis] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const sync = () => setUseLenis(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!useLenis) {
    return (
      <>
        <NativeSmoothAnchors />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 0.9,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        syncTouch: false,
        autoRaf: true,
      }}
    >
      <ScrollTriggerBridge />
      <FluidParallax />
      <SmoothAnchors />
      {children}
    </ReactLenis>
  );
}
