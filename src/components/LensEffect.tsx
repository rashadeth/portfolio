"use client";

import { useState, useRef, useEffect } from "react";

interface WordProps {
  en: string;
  zh: string;
}

function LensWord({ en, zh }: WordProps) {
  const [display, setDisplay] = useState(en);
  const [scale, setScale] = useState(1);
  const [minWidth, setMinWidth] = useState<number | undefined>(undefined);
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Measure English width once on mount so layout never shifts when text swaps
  useEffect(() => {
    if (ref.current) setMinWidth(ref.current.offsetWidth);
  }, []);

  const handleEnter = () => {
    clearTimeout(timer.current);
    setScale(0.85);
    timer.current = setTimeout(() => setDisplay(zh), 150);
  };

  const handleLeave = () => {
    clearTimeout(timer.current);
    setDisplay(en);
    setScale(1);
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: "inline-block",
        minWidth: minWidth !== undefined ? `${minWidth}px` : undefined,
        textAlign: "center",
        transform: `scale(${scale})`,
        transition: "transform 0.2s ease",
      }}
    >
      {display}
    </span>
  );
}

export default function LensEffect() {
  return (
    <>
      <LensWord en="Designing" zh="设计" />
      {" "}
      <LensWord en="and" zh="和" />
      {" "}
      <LensWord en="building" zh="构建" />
      {" "}
      <LensWord en="digital" zh="数字" />
      {" "}
      <LensWord en="products" zh="产品" />
      .
    </>
  );
}
