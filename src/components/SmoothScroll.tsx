"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isTouchCapable } from "@/lib/device";

/** Match the reference's wheel momentum without replacing native touch scrolling. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const compact = window.matchMedia("(max-width: 700px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;

    const sync = () => {
      lenis?.destroy();
      lenis = undefined;
      if (compact.matches || !pointer.matches || isTouchCapable() || reducedMotion.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.07,
        wheelMultiplier: 0.6,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -80 },
        prevent: (node) => node.getAttribute("role") === "dialog",
      });
    };

    sync();
    pointer.addEventListener("change", sync);
    compact.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    return () => {
      lenis?.destroy();
      pointer.removeEventListener("change", sync);
      compact.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, [pathname]);

  return null;
}
