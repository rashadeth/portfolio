"use client";

import { useEffect, useRef } from "react";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delayMs?: number;
};

export default function SectionReveal({ children, className, id, delayMs = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    // On mobile, skip the scroll reveal — elements appear in final state immediately.
    if (window.innerWidth <= 768) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={`section-reveal ${className ?? ""}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
