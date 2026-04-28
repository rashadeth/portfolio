"use client";

import { useEffect, useRef } from "react";

const LERP = 0.08;
const SIZE = 120;
const RADIUS = 80;

export default function LensEffect() {
  const lensRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -999, y: -999 });
  const target = useRef({ x: -999, y: -999 });
  const active = useRef(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    const lens = lensRef.current;
    if (!lens) return;

    const hero = document.querySelector("[data-hero-section]") as HTMLElement | null;
    if (!hero) return;

    const revertAll = () => {
      document.querySelectorAll<HTMLElement>("[data-en]").forEach((el) => {
        el.textContent = el.dataset.en ?? "";
        el.style.transform = "";
        el.style.display = "";
      });
    };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const onEnter = () => { active.current = true; };
    const onLeave = () => { active.current = false; revertAll(); };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseenter", onEnter);
    hero.addEventListener("mouseleave", onLeave);

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP;
      pos.current.y += (target.current.y - pos.current.y) * LERP;

      lens.style.transform = `translate(${pos.current.x - SIZE / 2}px, ${pos.current.y - SIZE / 2}px)`;
      lens.style.opacity = active.current ? "1" : "0";

      document.querySelectorAll<HTMLElement>("[data-en]").forEach((el) => {
        if (!active.current) return;
        const r = el.getBoundingClientRect();
        const dist = Math.hypot(
          target.current.x - (r.left + r.width / 2),
          target.current.y - (r.top + r.height / 2)
        );
        if (dist < RADIUS) {
          el.textContent = el.dataset.zh ?? el.dataset.en ?? "";
          el.style.display = "inline-block";
          el.style.transform = "scale(1.4)";
        } else {
          el.textContent = el.dataset.en ?? "";
          el.style.display = "";
          el.style.transform = "";
        }
      });

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseenter", onEnter);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
      revertAll();
    };
  }, []);

  return (
    <div
      ref={lensRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow:
          "inset 0 0 20px rgba(255,255,255,0.05), 0 0 30px rgba(255,255,255,0.03)",
        background: "rgba(255,255,255,0.02)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
