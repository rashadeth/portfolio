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
  // Enable Lenis only on desktop-class devices with fine pointers.
  // Touch devices (including large tablets) stay on native scroll to avoid friction.
  const [useLenis, setUseLenis] = useState(false);

  useEffect(() => {
    const sizeMq = window.matchMedia("(min-width: 1024px)");
    const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const sync = () => setUseLenis(sizeMq.matches && pointerMq.matches);
    sync();

    sizeMq.addEventListener("change", sync);
    pointerMq.addEventListener("change", sync);
    return () => {
      sizeMq.removeEventListener("change", sync);
      pointerMq.removeEventListener("change", sync);
    };
  }, []);

  if (!useLenis) {
    return <>{children}</>;
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
