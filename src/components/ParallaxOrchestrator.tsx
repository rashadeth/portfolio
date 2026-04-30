"use client";

import { useEffect } from "react";

export default function ParallaxOrchestrator() {
  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-speed]"));
    if (!elements.length) return;

    let frame = 0;
    let lastY = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;

      elements.forEach((el) => {
        const speed = Number(el.dataset.parallaxSpeed ?? "0");
        const y = scrollY * speed;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    const onScroll = () => {
      if (Math.abs(window.scrollY - lastY) < 1) return;
      lastY = window.scrollY;
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
