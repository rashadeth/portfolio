"use client";

import { useEffect, useRef, useState } from "react";
import PortfolioIcon from "./PortfolioIcon";
import "./glass-nav.css";

const links = [
  { label: "Home", href: "#top", icon: "home" },
  { label: "Films", href: "#work", icon: "film" },
  { label: "Design", href: "#design", icon: "design" },
  { label: "Contact", href: "mailto:yohananokpoko@gmail.com", icon: "mail" },
] as const;

export default function GlassNav() {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const lens = useRef<HTMLSpanElement>(null);
  const animation = useRef<Animation | null>(null);
  const selected = preview ?? active;

  useEffect(() => {
    const node = lens.current;
    if (!node) return;
    const width = node.offsetWidth;
    const parent = node.parentElement!.getBoundingClientRect();
    const current = node.getBoundingClientRect();
    const from = current.left + current.width / 2 - parent.left - 8 - width / 2;
    const to = selected * width;
    animation.current?.cancel();
    node.style.transform = `translateX(${to}px)`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const distance = to - from;
    if (Math.abs(distance) < 1) return;
    const stretch = 1 + Math.min(Math.abs(distance) / width * 0.38, 0.85);
    animation.current = node.animate([
      { transform: `translateX(${from}px) scale(1, 1)`, offset: 0 },
      { transform: `translateX(${from + distance * 0.55}px) scale(${stretch}, .88)`, offset: 0.38 },
      { transform: `translateX(${to + Math.sign(distance) * 3}px) scale(.96, 1.04)`, offset: 0.76 },
      { transform: `translateX(${to}px) scale(1, 1)`, offset: 1 },
    ], { duration: 620, easing: "cubic-bezier(.22,.7,.24,1)" });
  }, [selected]);

  useEffect(() => () => animation.current?.cancel(), []);

  useEffect(() => {
    const resize = () => {
      animation.current?.cancel();
      if (lens.current) lens.current.style.transform = `translateX(${selected * lens.current.offsetWidth}px)`;
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [selected]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.4;
      const design = document.getElementById("design-section");
      const work = document.getElementById("films-section");
      setActive(design && design.getBoundingClientRect().top <= threshold ? 2
        : work && work.getBoundingClientRect().top <= threshold ? 1 : 0);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  return (
    <nav className="glass-nav" aria-label="Main navigation"
      onMouseLeave={() => setPreview(null)}>
      <span ref={lens} className="glass-nav-lens" aria-hidden="true" />
      {links.map(({ label, href, icon }, index) => (
        <a key={label} href={href}
          aria-current={index === active ? "location" : undefined}
          data-lit={(preview ?? active) === index}
          onMouseEnter={() => setPreview(index)}
          onFocus={() => setPreview(index)}
          onBlur={() => setPreview(null)}
          onClick={() => { if (index < 3) setActive(index); setPreview(null); }}>
          <PortfolioIcon name={icon} size={22} active={(preview ?? active) === index} />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
