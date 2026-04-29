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

    mm.add("(max-width: 768px)", () => {
      layers.forEach((layer) => {
        const base = Number(layer.dataset.parallaxAmount ?? "36") * 0.45;
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
              scrub: 0.9,
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
        event.preventDefault();
        lenis.scrollTo(0, { duration: 1.05 });
        return;
      }

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.1 });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        lerp: 0.07,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.65,
        syncTouch: true,
        syncTouchLerp: 0.075,
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
