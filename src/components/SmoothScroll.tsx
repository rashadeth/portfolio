"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

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

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // Lenis now runs on every device, including touch/Android. `syncTouch` stays
  // false so touch input keeps the OS's native momentum scroll (the smoothest,
  // cheapest path on Android) — Lenis just mirrors scroll position for
  // ScrollTrigger sync and drives smooth anchor-link jumps. Only wheel/trackpad
  // input gets Lenis's own eased scrolling (smoothWheel).
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
