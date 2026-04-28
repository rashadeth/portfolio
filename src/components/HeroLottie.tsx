"use client";

import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function HeroLottie() {
  const [loaded, setLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (!loaded) setUseFallback(true);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [loaded]);

  if (useFallback) {
    return (
      <iframe
        title="Hero Illustration"
        src="https://lottie.host/embed/5c332104-f41c-4e30-a05e-1b5d8a8dfc7b/eDyPHG4Yva.lottie"
        className="h-[200px] w-[200px] border-0 bg-transparent"
        loading="eager"
      />
    );
  }

  return (
    <Player
      autoplay
      loop
      src="https://lottie.host/5c332104-f41c-4e30-a05e-1b5d8a8dfc7b/eDyPHG4Yva.lottie"
      style={{ width: "200px", height: "200px" }}
      onEvent={(event) => {
        if (event === "load" || event === "ready") setLoaded(true);
        if (event === "error") setUseFallback(true);
      }}
    />
  );
}
