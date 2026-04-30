"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lenis (ReactLenis root) sets overflow:hidden on <html> to take over scrolling.
// Stale ScrollTriggers from other pages (e.g. home parallax) can also leave the
// document in a frozen state after client-side navigation. This component resets
// both on case-study page mount so scroll always works here.
export default function OverflowReset() {
  useEffect(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Kill any ScrollTriggers whose target elements no longer exist in this page
    // (e.g. data-parallax-layer elements from the home page).
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger && !document.contains(t.trigger)) {
        t.kill();
      }
    });

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return null;
}
