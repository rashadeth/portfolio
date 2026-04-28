"use client";

import { useRef } from "react";

function LensWord({ en, zh }: { en: string; zh: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const enRef = useRef<HTMLSpanElement>(null);
  const zhRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    if (wrapRef.current) wrapRef.current.style.transform = "scale(0.85)";
    if (enRef.current) enRef.current.style.opacity = "0";
    if (zhRef.current) zhRef.current.style.opacity = "1";
  };

  const onLeave = () => {
    if (wrapRef.current) wrapRef.current.style.transform = "scale(1)";
    if (enRef.current) enRef.current.style.opacity = "1";
    if (zhRef.current) zhRef.current.style.opacity = "0";
  };

  return (
    <span
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: "inline-block",
        position: "relative",
        transition: "transform 0.2s ease",
      }}
    >
      {/* Always in flow — locks layout width to English word */}
      <span ref={enRef} style={{ transition: "opacity 0.15s ease" }}>
        {en}
      </span>
      {/* Chinese overlay — absolutely positioned, never affects layout */}
      <span
        ref={zhRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.15s ease",
          pointerEvents: "none",
        }}
      >
        {zh}
      </span>
    </span>
  );
}

export default function LensEffect() {
  return (
    <>
      <LensWord en="Designing" zh="设计" />{" "}
      <LensWord en="and" zh="和" />{" "}
      <LensWord en="building" zh="构建" />{" "}
      <LensWord en="digital" zh="数字" />{" "}
      <LensWord en="products" zh="产品" />.
    </>
  );
}
