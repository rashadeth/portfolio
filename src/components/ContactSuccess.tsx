"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

function FallingRibbons() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const node = canvas.current;
    const context = node?.getContext("2d");
    if (!node || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      node.width = width * ratio;
      node.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    const colors = ["#f8ebd8", "#bbbd91", "#a4992e", "#c53d10", "#766a32"];
    const ribbons = Array.from({ length: width < 700 ? 105 : 210 }, (_, index) => ({
      x: Math.random(), y: Math.random() * 1.6 - .85,
      depth: .35 + Math.random() * .65,
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - .5) * 3,
      color: colors[index % colors.length],
      curl: index % 3 !== 0,
    }));
    let start = 0;
    const draw = (now: number) => {
      if (!start) start = now;
      const time = (now - start) / 1000;
      context.clearRect(0, 0, width, height);
      if (motion.matches || time > 11) return;
      for (const ribbon of ribbons) {
        const y = ribbon.y * height + time * (85 + ribbon.depth * 95);
        if (y > height + 40) continue;
        const x = ribbon.x * width + Math.sin(time * 1.4 + ribbon.phase) * (20 + ribbon.depth * 45);
        const length = 9 + ribbon.depth * 15;
        context.save();
        context.translate(x, y);
        context.rotate(ribbon.phase + time * ribbon.spin);
        context.scale(1, Math.cos(time * 3 + ribbon.phase) * .85 + .15);
        context.globalAlpha = (.45 + ribbon.depth * .55) * Math.min(1, time * 3) * Math.min(1, (11 - time) / 2);
        const sheen = context.createLinearGradient(-length / 2, 0, length / 2, 0);
        sheen.addColorStop(0, ribbon.color);
        sheen.addColorStop(.48, "#f8ebd8");
        sheen.addColorStop(1, ribbon.color);
        context.strokeStyle = sheen;
        context.fillStyle = sheen;
        if (ribbon.curl) {
          context.lineWidth = 3 + ribbon.depth * 3;
          context.beginPath();
          context.moveTo(-length / 2, -3);
          context.bezierCurveTo(-length / 5, 7, length / 5, -7, length / 2, 3);
          context.stroke();
        } else {
          context.fillRect(-length / 2, -3, length, 4 + ribbon.depth * 3);
        }
        context.restore();
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    const stopMotion = () => { if (motion.matches) { cancelAnimationFrame(frame); context.clearRect(0, 0, width, height); } };
    motion.addEventListener("change", stopMotion);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); motion.removeEventListener("change", stopMotion); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvas} className="success-ribbons" aria-hidden="true" />;
}

export default function ContactSuccess({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    node?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { node?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="contact-celebration" aria-labelledby="success-title" aria-describedby="success-description" onCancel={(event) => { event.preventDefault(); onClose(); }}>
    <FallingRibbons />
    <div className="success-content">
      <Image src="/images/brand/ian-o-white-transparent.png" alt="Ian O" width={76} height={76} className="success-logo" />
      <h2 id="success-title">Message sent.</h2>
      <p id="success-description">Thanks for reaching out.<br />I’ll be in touch by email.</p>
      <div className="success-actions">
        <Link href="/films">Explore my work</Link>
        <button type="button" onClick={onClose} autoFocus>Back to contact</button>
      </div>
    </div>
  </dialog>;
}
