"use client";

import { useRef, useState, useEffect } from "react";

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

export default function WorkStackCards({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 flex flex-col gap-6">
      {projects.map((project, index) => (
        <article
          key={project.slug}
          data-project-hover={isDesktop ? "true" : undefined}
          className="group relative w-full overflow-hidden rounded-xl border border-white/[0.05] bg-[var(--bg)] p-4 sm:p-6 md:p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-8 lg:max-h-[600px] lg:overflow-hidden">
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
                    className={`h-full w-full object-cover object-center${
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
