"use client";

import { Component, useEffect, useRef, type ReactNode } from "react";
import { useState } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

const STATIC_GRADIENT_STYLE = {
  background:
    "radial-gradient(120% 90% at 78% 8%, #fff6c8 0%, rgba(255,180,96,0.85) 22%, rgba(255,106,59,0.75) 46%, rgba(61,10,30,0.9) 72%, #0c0c0c 100%)",
} as const;

// Belt-and-suspenders: if the shader ever throws during mount (an
// unsupported WebGL context, a broken env-map fetch, a GPU driver quirk we
// haven't seen), fail into the static gradient instead of taking the whole
// page — and the scroll it needs — down with it.
class ShaderErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div aria-hidden="true" className="absolute inset-0" style={STATIC_GRADIENT_STYLE} />;
    }
    return this.props.children;
  }
}

// `(hover: hover) and (pointer: fine)` is not a reliable "is this a touch
// device" test on real Android hardware — some devices misreport it as true
// even though the primary input is touch. Actual touch hardware capability
// can't be misreported the same way, so it's used as a hard veto.
function isTouchCapable() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export default function FramerGradientBackground() {
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const lastMoveRef = useRef(0);
  const runningRef = useRef(false);
  const [gradient, setGradient] = useState({
    cAzimuthAngle: 228,
    cPolarAngle: 126,
    positionX: 0,
    positionY: 0,
    uStrength: 2.05,
  });
  const [pixelDensity, setPixelDensity] = useState(1.2);
  // The shader is a real-time WebGL render loop (react-three-fiber, frameloop
  // "always") that never stops — on touch/lower-power devices it competes
  // with the browser's compositor for every scroll frame, which is a major
  // source of scroll jank on Android. Those devices get a static CSS
  // gradient instead: same look, zero per-frame cost.
  //
  // Defaulting this to `false` (rather than `true` + flipping off post-mount)
  // is deliberate: mounting the canvas and tearing it straight back down
  // creates a WebGL context while an HDR env-map texture load is still in
  // flight, then destroys it. That create/destroy churn is known to hang or
  // crash on Android's fragmented GPU/driver stack (freezing the whole page,
  // scroll included) even though iOS Safari tolerates it fine. So WebGL only
  // ever gets created once we've confirmed it's safe — never provisionally.
  const [renderShader, setRenderShader] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const densityQuery = window.matchMedia("(max-width: 1024px)");
    const syncDensity = () => {
      setPixelDensity(densityQuery.matches ? 1.1 : 1.35);
    };
    syncDensity();
    densityQuery.addEventListener("change", syncDensity);

    // Requires a wide viewport, a fine pointer, AND no touch hardware at
    // all — so a touch tablet, or an Android phone that misreports
    // hover/pointer, never qualifies.
    const canRenderShaderQuery = window.matchMedia(
      "(min-width: 1025px) and (hover: hover) and (pointer: fine)",
    );
    const syncRenderShader = () =>
      setRenderShader(canRenderShaderQuery.matches && !isTouchCapable());
    syncRenderShader();
    canRenderShaderQuery.addEventListener("change", syncRenderShader);

    return () => {
      densityQuery.removeEventListener("change", syncDensity);
      canRenderShaderQuery.removeEventListener("change", syncRenderShader);
    };
  }, []);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer || isTouchCapable()) return;

    const onMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      targetRef.current.x = nx;
      targetRef.current.y = ny;
      lastMoveRef.current = performance.now();

      if (!runningRef.current) {
        runningRef.current = true;
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      smoothRef.current.x += (targetRef.current.x - smoothRef.current.x) * 0.06;
      smoothRef.current.y += (targetRef.current.y - smoothRef.current.y) * 0.06;

      const sx = smoothRef.current.x;
      const sy = smoothRef.current.y;
      const dx = Math.abs(targetRef.current.x - sx);
      const dy = Math.abs(targetRef.current.y - sy);

      setGradient((prev) => {
        const next = {
          cAzimuthAngle: 228 + sx * 32,
          cPolarAngle: 126 + sy * -14,
          positionX: sx * 0.22,
          positionY: sy * -0.2,
          uStrength: 1.95 + Math.abs(sx) * 0.3 + Math.abs(sy) * 0.3,
        };

        if (
          Math.abs(prev.cAzimuthAngle - next.cAzimuthAngle) < 0.01 &&
          Math.abs(prev.cPolarAngle - next.cPolarAngle) < 0.01 &&
          Math.abs(prev.positionX - next.positionX) < 0.001 &&
          Math.abs(prev.positionY - next.positionY) < 0.001 &&
          Math.abs(prev.uStrength - next.uStrength) < 0.001
        ) {
          return prev;
        }

        return next;
      });

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${sx * 8}px, ${sy * 8}px, 0)`;
      }

      const idleForMs = performance.now() - lastMoveRef.current;
      if (dx < 0.0008 && dy < 0.0008 && idleForMs > 140) {
        runningRef.current = false;
        return;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      runningRef.current = false;
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="pointer-events-none fixed inset-0 z-0 will-change-transform">
      <div className="absolute inset-0">
        {renderShader ? (
          <ShaderErrorBoundary>
            <ShaderGradientCanvas
              style={{ position: "absolute", inset: 0 }}
              pixelDensity={pixelDensity}
              fov={42}
            >
              <ShaderGradient
                animate="on"
                type="plane"
                shader="defaults"
                uSpeed={0.32}
                uStrength={gradient.uStrength}
                uDensity={1.2}
                uFrequency={5.1}
                positionX={gradient.positionX}
                positionY={gradient.positionY}
                color1="#fff6c8"
                color2="#ff6a3b"
                color3="#3d0a1e"
                brightness={0.98}
                grain="on"
                grainBlending={0.24}
                cDistance={3.45}
                cPolarAngle={gradient.cPolarAngle}
                cAzimuthAngle={gradient.cAzimuthAngle}
                lightType="3d"
                envPreset="dawn"
              />
            </ShaderGradientCanvas>
          </ShaderErrorBoundary>
        ) : (
          // Static stand-in for the animated shader: same warm dawn palette,
          // rendered once and left to the compositor — no per-frame WebGL cost.
          <div aria-hidden="true" className="absolute inset-0" style={STATIC_GRADIENT_STYLE} />
        )}
      </div>

      <div className="absolute inset-0 bg-[#0c0c0c]/42" />
      <div className="absolute inset-0 bg-[radial-gradient(56%_40%_at_50%_44%,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.52)_64%,rgba(0,0,0,0.84)_100%)]" />
      <div className="mobile-hidden absolute -left-[18%] -top-[24%] h-[56%] w-[102%] rotate-[-9deg] bg-[linear-gradient(106deg,rgba(255,246,200,0.52)_0%,rgba(255,180,96,0.34)_30%,rgba(230,78,50,0.34)_56%,rgba(12,12,12,0)_100%)] blur-[62px] mix-blend-screen" />
      <div className="mobile-hidden absolute -bottom-[24%] right-[-12%] h-[56%] w-[76%] bg-[radial-gradient(ellipse_at_center,rgba(248,176,86,0.34)_0%,rgba(224,87,48,0.24)_38%,rgba(12,12,12,0)_76%)] blur-[72px] mix-blend-screen" />
      <div className="mobile-hidden absolute -left-[10%] bottom-[14%] h-[42%] w-[44%] bg-[radial-gradient(circle_at_center,rgba(255,170,74,0.25)_0%,rgba(210,62,45,0.18)_42%,rgba(12,12,12,0)_78%)] blur-[74px] mix-blend-screen" />
      <div
        className="mobile-hidden absolute inset-0 mix-blend-overlay opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' seed='11'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
