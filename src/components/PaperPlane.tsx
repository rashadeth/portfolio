"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function PaperPlane() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 z-10"
      style={{ animation: "paperPlaneFloat 3s ease-in-out infinite" }}
    >
      <Player
        autoplay
        loop
        src="https://lottie.host/5c332104-f41c-4e30-a05e-1b5d8a8dfc7b/eDyPHG4Yva.lottie"
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  );
}
