"use client";

import { useEffect, useRef, useState } from "react";

export default function ProjectHoverCursor() {
  const [active, setActive] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setActive(Boolean(target?.closest("[data-project-hover='true']")));
    };

    const onOut = (event: MouseEvent) => {
      const related = event.relatedTarget as Element | null;
      setActive(Boolean(related?.closest("[data-project-hover='true']")));
    };

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.16;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.16;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[70] flex h-[112px] w-[112px] items-center justify-center rounded-full border border-white/45 bg-white/10 text-center text-[11px] uppercase tracking-[0.14em] text-[#0f0f0f] backdrop-blur-xl shadow-[inset_0_1px_14px_rgba(255,255,255,0.22),0_10px_28px_rgba(0,0,0,0.38),0_0_30px_rgba(255,255,255,0.18)] transition-opacity duration-200 ${
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
