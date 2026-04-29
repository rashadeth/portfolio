"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

export default function ScrollToTopOnLoad() {
  const lenis = useLenis();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Remove hash fragments so external/shared links never auto-jump
    // to lower sections like #work or #contact on first load.
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Run once more after paint to override any late browser restoration.
    requestAnimationFrame(() => {
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [lenis]);

  return null;
}
