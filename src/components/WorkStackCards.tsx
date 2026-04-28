"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  videoSrc: string;
  hasVideo: boolean;
  orientation: string;
  fitMode: string;
  mediaBg: string;
};

const TOP_BASE = 80;
const TOP_STEP = 40;

export default function WorkStackCards({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (cards.length < 2) return;

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.97,
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top 20%",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  // Refresh ScrollTrigger after SectionReveal's entrance animation settles
  // so trigger positions are measured from final layout, not the initial translateY state.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-4 md:gap-0">
      {projects.map((project, index) => (
        <article
          key={project.slug}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          data-project-hover="true"
          className="group relative overflow-hidden rounded-xl border border-transparent bg-transparent p-4 sm:p-6 md:sticky md:border-white/[0.05] md:bg-[var(--bg)] md:p-8"
          style={{
            top: `${TOP_BASE + index * TOP_STEP}px`,
            zIndex: (projects.length - index) * 10,
            transformOrigin: "top center",
          }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:max-h-[600px] overflow-hidden">
            <div className="w-full lg:w-3/5">
              <div
                data-orientation={project.orientation}
                className={`relative w-full rounded-[6px] border border-white/[0.06] ${
                  project.orientation === "portrait"
                    ? "flex h-[320px] items-center justify-center overflow-hidden bg-[#f5f5f5] p-3 sm:h-[520px] sm:p-5 lg:h-[600px] lg:p-6"
                    : "aspect-video h-full max-h-[260px] overflow-hidden sm:max-h-[340px] md:max-h-[420px] lg:max-h-[500px]"
                }`}
                style={{
                  backgroundColor:
                    project.hasVideo && project.fitMode === "contain"
                      ? project.mediaBg
                      : undefined,
                }}
              >
                {project.hasVideo ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    src={project.videoSrc}
                    data-orientation={project.orientation}
                    className={`${
                      project.fitMode === "contain"
                        ? "h-full w-full object-contain object-center"
                        : "h-full w-full object-cover object-center"
                    }`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#111] px-6 text-center">
                    <span className="font-sans text-5xl font-light italic tracking-tight text-[var(--fg)]/80">
                      {project.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex h-full w-full flex-col lg:w-2/5 lg:pl-6">
              <div className="space-y-5 transition-opacity duration-300 group-hover:opacity-75">
                <p className="text-xs font-light uppercase tracking-[0.18em] text-white">
                  {`0${index + 1}`}
                </p>
                <h3 className="font-sans text-[clamp(34px,7vw,52px)] font-light leading-[0.95] tracking-tight">
                  {project.name}
                </h3>
                <p className="text-sm font-light leading-relaxed text-white">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] px-3 py-1 text-[10px] font-light uppercase tracking-[0.16em] text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 inline-flex w-fit items-center gap-3 text-xs font-light uppercase tracking-[0.16em] text-white sm:mt-10">
                <span>View Case Study</span>
                <span className="inline-flex items-center gap-1" aria-hidden="true">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/90 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/90 [animation-delay:180ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/90 [animation-delay:360ms]" />
                </span>
                <span className="text-white/80">Coming Soon</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
