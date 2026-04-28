"use client";

import { useState } from "react";

interface WordSwapProps {
  en: string;
  zh: string;
  italic?: boolean;
}

function WordSwap({ en, zh, italic }: WordSwapProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-block", position: "relative" }}
    >
      {/*
       * Invisible spacer — always renders English text in normal flow.
       * This fixes both width and height so nothing ever shifts.
       */}
      <span
        aria-hidden="true"
        style={{ visibility: "hidden", fontStyle: italic ? "italic" : "normal" }}
      >
        {en}
      </span>

      {/* English word */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontStyle: italic ? "italic" : "normal",
          opacity: hovered ? 0 : 1,
          transform: hovered ? "scale(0.8)" : "scale(1)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        {en}
      </span>

      {/* Chinese word */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-serif)",
          color: "#d4c9a8",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.8)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        {zh}
      </span>
    </span>
  );
}

export default function HeroTitle() {
  return (
    <h1
      className="mt-6 max-w-[13ch] font-sans font-light leading-[1.15] tracking-tight"
      style={{ fontSize: "clamp(44px, 10vw, 128px)" }}
    >
      <WordSwap en="Designing" zh="设计" />{" "}
      <WordSwap en="and" zh="和" />{" "}
      <WordSwap en="building" zh="构建" italic />{" "}
      <WordSwap en="digital" zh="数字" />{" "}
      <WordSwap en="products." zh="产品。" />
    </h1>
  );
}
