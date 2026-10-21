"use client";

import { useEffect } from "react";
import "./portfolio-scroll-stack.css";

/** Sections stay behind the following section as it scrolls over them. */
export default function PortfolioScrollReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("main.portfolio");
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>(":scope > section"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      sections.forEach((section, index) => {
        // Long sections scroll fully before their bottom rests in the viewport.
        section.style.setProperty("--stack-top", `${Math.min(0, window.innerHeight - section.offsetHeight)}px`);
        section.style.setProperty("--stack-order", String(index + 1));
      });
    };
    const sync = () => {
      measure();
      root.classList.toggle("section-stack", !preference.matches);
      document.documentElement.classList.toggle("portfolio-stack-active", !preference.matches);
    };
    const observer = new ResizeObserver(measure);
    sections.forEach((section) => observer.observe(section));
    sync();
    window.addEventListener("resize", measure);
    preference.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", sync);
      root.classList.remove("section-stack");
      document.documentElement.classList.remove("portfolio-stack-active");
      sections.forEach((section) => {
        section.style.removeProperty("--stack-top");
        section.style.removeProperty("--stack-order");
      });
    };
  }, []);

  return null;
}
