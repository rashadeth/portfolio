"use client";

import { useEffect, useRef, useState } from "react";
import { isTouchCapable } from "@/lib/device";

export default function ProjectHoverCursor() {
  const [active, setActive] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer || isTouchCapable()) return;

    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setActive(Boolean(target?.closest("[data-project-hover='true']")));
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      setActive(Boolean(related?.closest("[data-project-hover='true']")));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[99999] hidden md:flex h-[112px] w-[112px] items-center justify-center rounded-full border border-white/45 bg-white/10 text-center text-[11px] uppercase tracking-[0.14em] text-[#0f0f0f] backdrop-blur-xl shadow-[inset_0_1px_14px_rgba(255,255,255,0.22),0_10px_28px_rgba(0,0,0,0.38),0_0_30px_rgba(255,255,255,0.18)] transition-opacity duration-200 ${
        active ? "opacity-100" : "opacity-0"
      }`}
      style={{ animation: "liquidMorph 2.4s ease-in-out infinite alternate" }}
    >
      <span className="rounded-full bg-black/12 px-3 py-1 font-medium leading-tight text-white shadow-[0_1px_3px_rgba(0,0,0,0.55)]">
        View Case Study
      </span>
    </div>
  );
}
