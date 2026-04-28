"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const WORDS = ["products", "websites", "brands", "mobile apps"];
const PAUSE = 2600;

export default function CyclingWord() {
  const elRef = useRef<HTMLSpanElement>(null);
  const idx = useRef(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const advance = () => {
      gsap.to(el, {
        rotateX: -90,
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        onComplete() {
          idx.current = (idx.current + 1) % WORDS.length;
          el.textContent = WORDS[idx.current];
          gsap.fromTo(
            el,
            { rotateX: 90, opacity: 0 },
            { rotateX: 0, opacity: 1, duration: 0.32, ease: "power2.out" }
          );
        },
      });
    };

    const id = setInterval(advance, PAUSE);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ display: "inline-block", perspective: "600px" }}>
      <span
        ref={elRef}
        style={{ display: "inline-block", transformOrigin: "50% 50%" }}
      >
        {WORDS[0]}
      </span>
    </span>
  );
}
