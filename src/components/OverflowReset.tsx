"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Kill any ScrollTriggers whose target elements no longer exist in this page
// (e.g. data-parallax-layer elements left over from the home page).
// Overflow resets are handled globally by ScrollToTopOnLoad.
export default function OverflowReset() {
  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger && !document.contains(t.trigger)) {
        t.kill();
      }
    });
  }, []);

  return null;
}
