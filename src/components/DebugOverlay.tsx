"use client";

// TEMPORARY diagnostic overlay for the Android scroll-freeze investigation.
// Shows device/touch capability info, live scroll/touch event counters, and
// any JS errors, directly on screen — no computer or cable needed. Only
// renders when the page is loaded with ?debug=1, so normal visitors never
// see it. Remove this file and its <DebugOverlay /> usage in layout.tsx
// once resolved.

import { useEffect, useState } from "react";

export default function DebugOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [lines, setLines] = useState<string[]>(["booting…"]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Reading window.location on mount — not derivable during SSR/render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(new URLSearchParams(window.location.search).get("debug") === "1");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const staticInfo = [
      `UA: ${navigator.userAgent}`,
      `maxTouchPoints: ${navigator.maxTouchPoints}`,
      `ontouchstart in window: ${"ontouchstart" in window}`,
      `hover:hover+pointer:fine: ${window.matchMedia("(hover: hover) and (pointer: fine)").matches}`,
      `pointer:coarse: ${window.matchMedia("(pointer: coarse)").matches}`,
      `viewport: ${window.innerWidth}x${window.innerHeight}`,
      `html scrollHeight/clientHeight: ${document.documentElement.scrollHeight}/${document.documentElement.clientHeight}`,
      `body scrollHeight/clientHeight: ${document.body.scrollHeight}/${document.body.clientHeight}`,
      `html overflow-y: ${getComputedStyle(document.documentElement).overflowY}`,
      `body overflow-y: ${getComputedStyle(document.body).overflowY}`,
      `html touch-action: ${getComputedStyle(document.documentElement).touchAction}`,
      `body touch-action: ${getComputedStyle(document.body).touchAction}`,
    ];

    let touchmoveCount = 0;
    let scrollCount = 0;

    const onTouchMove = () => {
      touchmoveCount++;
    };
    const onScroll = () => {
      scrollCount++;
    };
    const onError = (e: ErrorEvent) => {
      setErrors((prev) => [...prev, `ERROR: ${e.message} @ ${e.filename}:${e.lineno}:${e.colno}`]);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      setErrors((prev) => [...prev, `UNHANDLED REJECTION: ${String(e.reason)}`]);
    };

    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    const tick = () => {
      setLines([
        ...staticInfo,
        "—",
        `scrollY: ${Math.round(window.scrollY)}`,
        `touchmove events seen: ${touchmoveCount}`,
        `scroll events seen: ${scrollCount}`,
      ]);
    };
    tick();
    const interval = window.setInterval(tick, 500);

    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      window.clearInterval(interval);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2147483647,
        background: "rgba(0,0,0,0.94)",
        color: "#3f3",
        fontFamily: "monospace",
        fontSize: 10,
        lineHeight: 1.45,
        padding: "6px 8px",
        maxHeight: "48vh",
        overflow: "hidden",
        pointerEvents: "none",
        whiteSpace: "pre-wrap",
      }}
    >
      {lines.map((line, i) => (
        <div key={`l${i}`}>{line}</div>
      ))}
      {errors.map((err, i) => (
        <div key={`e${i}`} style={{ color: "#f66" }}>
          {err}
        </div>
      ))}
    </div>
  );
}
