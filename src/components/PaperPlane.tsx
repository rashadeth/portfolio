"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function PaperPlane() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[4%] top-[18%]"
      style={{ animation: "paperPlaneFloat 3s ease-in-out infinite" }}
    >
      <DotLottieReact
        src="https://lottie.host/5c332104-f41c-4e30-a05e-1b5d8a8dfc7b/eDyPHG4Yva.lottie"
        autoplay
        loop
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
}
