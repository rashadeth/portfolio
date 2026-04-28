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
        opacity: 0,
        y: "-0.2em",
        duration: 0.3,
        ease: "power2.in",
        onComplete() {
          idx.current = (idx.current + 1) % WORDS.length;
          el.textContent = WORDS[idx.current];
          gsap.fromTo(
            el,
            { opacity: 0, y: "0.25em" },
            { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
          );
        },
      });
    };

    const id = setInterval(advance, PAUSE);
    return () => clearInterval(id);
  }, []);

  return <span ref={elRef}>{WORDS[0]}</span>;
}
