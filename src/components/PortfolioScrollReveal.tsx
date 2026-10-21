"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioScrollReveal() {
  useEffect(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const root = document.querySelector("main.portfolio");
      if (!root) return;

      root.querySelectorAll<HTMLElement>(".section-heading h2").forEach((heading) => {
        gsap.fromTo(heading, { y: 36, opacity: 0 }, {
          y: 0, opacity: 1, ease: "none",
          scrollTrigger: {
            trigger: heading.parentElement,
            start: "top 94%", end: "top 72%", scrub: 0.35,
          },
        });
      });

      root.querySelectorAll<HTMLElement>(".film-card, .design-card").forEach((card) => {
        const media = card.querySelector<HTMLElement>(".film-media, .design-media");
        const caption = card.querySelector<HTMLElement>(".film-caption");
        if (!media || !caption) return;

        // Offset each column's reveal; stacked mobile cards follow their own position.
        const column = () => {
          const grid = card.parentElement!;
          const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
          if (columns < 2 || card.offsetWidth > grid.clientWidth * 0.75) return 0;
          return Math.round((card.offsetLeft - grid.offsetLeft) / card.offsetWidth);
        };
        gsap.fromTo(media, { y: 64, opacity: 0.12, scale: 0.98 }, {
          y: 0, opacity: 1, scale: 1, ease: "none",
          scrollTrigger: {
            trigger: card,
            start: () => `top ${96 - column() * 5}%`,
            end: () => `top ${56 - column() * 5}%`,
            scrub: 0.45, invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(caption, { y: 28, opacity: 0 }, {
          y: 0, opacity: 1, ease: "none",
          scrollTrigger: {
            trigger: caption,
            start: "top 98%", end: "top 80%", scrub: 0.35,
          },
        });
      });

      // Keyboard focus should never land in a faded-out project link or player.
      const revealFocus = (event: Event) => {
        const card = (event.target as Element).closest(".film-card, .design-card");
        if (!card) return;
        const targets = card.querySelectorAll(".film-media, .design-media, .film-caption");
        gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
      };
      root.addEventListener("focusin", revealFocus);
      ScrollTrigger.refresh();
      return () => root.removeEventListener("focusin", revealFocus);
    });
    return () => motion.revert();
  }, []);

  return null;
}
