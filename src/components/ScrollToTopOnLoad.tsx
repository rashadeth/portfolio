"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTopOnLoad() {
  const lenis = useLenis();
  const pathname = usePathname();

  // Scroll to top on every page navigation.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    requestAnimationFrame(() => {
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [lenis, pathname]);

  // Clear any overflow locks left by Lenis or GSAP on every route change.
  // Without this, navigating away from a page mid-animation can leave
  // overflow: hidden on body/html, permanently blocking scroll.
  useEffect(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, [pathname]);

  return null;
}
