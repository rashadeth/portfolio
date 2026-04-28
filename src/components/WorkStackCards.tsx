"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";

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
  liveUrl?: string;
};

const PATTERNS = [
  // 0 — Topography dots
  {
    backgroundImage: 'radial-gradient(#e8e4dc 2px, transparent 2px)',
    backgroundSize: '28px 28px',
    opacity: 0.15,
  },
  // 1 — Plus grid
  {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 0h2v24h-2zM0 11h24v2H0z' fill='%23e8e4dc' fill-opacity='0.18'/%3E%3C/svg%3E\")",
    backgroundSize: '24px 24px',
  },
  // 2 — Diagonal lines
  {
    backgroundImage:
      'repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(232,228,220,0.15) 10px,rgba(232,228,220,0.15) 12px)',
  },
  // 3 — Hexagon dots
  {
    backgroundImage:
      'radial-gradient(circle,rgba(232,228,220,0.18) 2px,transparent 2px),radial-gradient(circle,rgba(232,228,220,0.18) 2px,transparent 2px)',
    backgroundSize: '22px 38px',
    backgroundPosition: '0 0,11px 19px',
  },
  // 4 — Circuit grid
  {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20h40M20 0v40' stroke='%23e8e4dc' stroke-opacity='0.18' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
    backgroundSize: '40px 40px',
  },
  // 5 — Dots grid (accent tint)
  {
    backgroundImage: 'radial-gradient(rgba(212,201,168,0.18) 2.5px,transparent 2.5px)',
    backgroundSize: '24px 24px',
  },
] as const;

export default function WorkStackCards({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative z-10 flex flex-col gap-6">
      {projects.map((project, index) => (
        <article
          key={project.slug}
          data-project-hover="true"
          className="group relative w-full overflow-hidden rounded-xl border border-white/[0.05] bg-[var(--bg)] p-4 sm:p-6 md:p-8"
        >
          {/* Subtle background pattern — unique per card, fades toward edges */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 0,
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
              ...PATTERNS[index % PATTERNS.length],
            }}
          />
          <div className="relative z-[1] flex flex-col lg:flex-row lg:items-stretch lg:gap-8 lg:max-h-[600px] lg:overflow-hidden">
            <div className="w-full lg:w-3/5">
              <div
                data-orientation={project.orientation}
                className={`relative w-full rounded-[6px] border border-white/[0.06] ${
                  project.orientation === "portrait"
                    ? "h-[300px] overflow-hidden sm:flex sm:h-[520px] sm:items-center sm:justify-center sm:bg-[#f5f5f5] sm:p-5 lg:h-[600px] lg:p-6"
                    : "h-[300px] overflow-hidden sm:aspect-video sm:h-auto sm:max-h-[340px] md:max-h-[420px] lg:max-h-[500px]"
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
                    className={`pointer-events-none h-full w-full object-cover object-center md:pointer-events-auto${
                      project.fitMode === "contain" ? " md:object-contain" : ""
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

            <div className="flex h-full w-full flex-col px-6 pb-6 pt-5 lg:px-0 lg:pb-0 lg:pt-0 lg:w-2/5 lg:pl-6">
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
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white transition-opacity hover:opacity-80"
                  >
                    <span className="sm:hidden" aria-hidden="true">
                      <ExternalLink size={14} strokeWidth={1.75} />
                    </span>
                    <span className="hidden sm:inline">Live App</span>
                    <span className="hidden sm:inline" aria-hidden="true">
                      <ExternalLink size={12} strokeWidth={1.75} />
                    </span>
                  </a>
                ) : null}
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
