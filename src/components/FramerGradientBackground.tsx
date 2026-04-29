"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const syncDensity = () => {
      setPixelDensity(window.matchMedia("(max-width: 1024px)").matches ? 1.1 : 1.35);
    };
    syncDensity();
    window.addEventListener("resize", syncDensity);
    return () => window.removeEventListener("resize", syncDensity);
  }, []);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer) return;

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
