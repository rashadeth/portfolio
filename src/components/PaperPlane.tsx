"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function PaperPlane() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none mb-6"
      style={{ animation: "paperPlaneFloat 3s ease-in-out infinite" }}
    >
      <Player
        autoplay
        loop
        src="https://lottie.host/5c332104-f41c-4e30-a05e-1b5d8a8dfc7b/eDyPHG4Yva.lottie"
        style={{ width: "160px", height: "160px" }}
      />
    </div>
  );
}
