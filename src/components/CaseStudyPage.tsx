import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PortfolioIcon from "@/components/PortfolioIcon";
import { getProject } from "@/lib/projects";
import projects from "@/lib/projects";
import OverflowReset from "@/components/OverflowReset";

export function getCaseStudyMetadata(slug: string): Metadata {
  const project = getProject(slug);
  return project ? pageMetadata(`/case-study/${slug}`, `${project.name} Case Study — Ian Okpoko`, `${project.tagline} A digital design case study by Ian Okpoko.`) : {};
}

export default function CaseStudyPage({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="cursor-restore relative min-h-screen bg-[var(--brand-espresso)] text-[var(--brand-cream)]">
      <OverflowReset />
      {/* grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          animation: "grainDrift 14s steps(6, end) infinite",
        }}
      />

      {/* nav */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.05] bg-[rgba(36,25,21,0.92)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 md:px-10">
          <Link
            href="/design"
            className="inline-flex items-center gap-2 text-[10px] font-light uppercase tracking-[0.14em] text-[#f8ebd8]/70 transition-colors hover:text-[#f8ebd8]"
          >
            <PortfolioIcon name="back" size={13} />
            Back
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-light uppercase tracking-[0.14em] text-[#f8ebd8]/70 transition-colors hover:text-[#f8ebd8]"
            >
              Live Project
              <PortfolioIcon name="external" size={11} />
            </a>
          )}
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-10">
        {/* ── HERO ── */}
        <section className="relative pb-4 pt-24 sm:pb-6 sm:pt-28 md:pb-8 md:pt-32">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:rounded-3xl">
            {/* dot grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 opacity-100"
              style={{
                backgroundImage: "radial-gradient(rgba(232,228,220,0.05) 1.5px, transparent 1.5px)",
                backgroundSize: "28px 28px",
                maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
              }}
            />

            <div className="relative z-10 px-5 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-16 md:px-12 md:pb-20 md:pt-20">
              {/* tags */}
              <div className="mb-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] px-3 py-1 text-[10px] font-light uppercase tracking-[0.16em] text-[#f8ebd8]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* title */}
              <h1 className="max-w-[16ch] font-sans text-[clamp(42px,9vw,96px)] font-light leading-[0.94] tracking-tight">
                {project.name}
              </h1>
              <p className="mt-5 max-w-[52ch] text-base font-light leading-relaxed text-[#f8ebd8]/60 sm:text-lg">
                {project.tagline}
              </p>

              {/* meta grid */}
              <dl className="mt-12 grid gap-px border border-white/[0.06] sm:grid-cols-3">
                {[
                  { term: "Year", detail: project.year },
                  { term: "Role", detail: project.role },
                  { term: "Platform", detail: project.platform },
                ].map(({ term, detail }) => (
                  <div key={term} className="bg-white/[0.02] px-5 py-5 sm:px-6">
                    <dt className="mb-1.5 text-[10px] font-light uppercase tracking-[0.18em] text-[#f8ebd8]/40">
                      {term}
                    </dt>
                    <dd className="text-sm font-light leading-snug text-[#e8e4dc]">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="relative pb-4 pt-2 sm:pb-6 sm:pt-3 md:pb-8 md:pt-4">
          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:rounded-3xl">
            <div className="px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16">
              <p className="mb-6 text-[10px] font-light uppercase tracking-[0.2em] text-[#f8ebd8]/40">
                The Problem
              </p>
              <p className="max-w-[62ch] font-sans text-[clamp(20px,3.2vw,30px)] font-light leading-[1.35] tracking-tight text-[#e8e4dc]">
                {project.problem}
              </p>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="relative pb-4 pt-2 sm:pb-6 sm:pt-3 md:pb-8 md:pt-4">
          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:rounded-3xl">
            <div className="px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16">
              <p className="mb-10 text-[10px] font-light uppercase tracking-[0.2em] text-[#f8ebd8]/40">
                Process
              </p>
              <div className="grid gap-px border border-white/[0.05] sm:grid-cols-2">
                {project.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="group bg-[#0c0c0c] px-6 py-8 transition-colors hover:bg-white/[0.025] sm:px-8 sm:py-10"
                  >
                    <span className="mb-4 block text-[10px] font-light uppercase tracking-[0.2em] text-[#f8ebd8]/30">
                      {step.step}
                    </span>
                    <h3 className="mb-3 font-sans text-xl font-light leading-snug tracking-tight text-[#e8e4dc]">
                      {step.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-[#f8ebd8]/55">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MOCKUPS ── */}
        {project.mockups && project.mockups.length > 0 && (() => {
          const isDesktop = project.mockups[0].orientation === "desktop";
          return (
            <section className="relative pb-4 pt-2 sm:pb-6 sm:pt-3 md:pb-8 md:pt-4">
              <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:rounded-3xl">
                <div className="px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16">
                  <p className="mb-10 text-[10px] font-light uppercase tracking-[0.2em] text-[#f8ebd8]/40">
                    Screens
                  </p>

                  {isDesktop ? (
                    /* ── desktop: vertical strip ── */
                    <div className="flex flex-col items-center gap-12">
                      {project.mockups.map((mockup) => (
                        <div key={mockup.src} className="flex w-full flex-col items-center gap-3">
                          <div className="w-full max-w-[900px] overflow-hidden rounded-[8px] border border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.55),0_1px_4px_rgba(0,0,0,0.3)]">
                            <img
                              src={mockup.src}
                              alt={mockup.label}
                              className="w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-[10px] font-light uppercase tracking-[0.16em] text-[#f8ebd8]/35">
                            {mockup.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* ── portrait: horizontal scroll row ── */
                    <div className="scrollbar-hide flex gap-5 overflow-x-auto pb-2 sm:gap-6">
                      {project.mockups.map((mockup) => {
                        const radius = mockup.cornerRadius ?? "44px";
                        const hasNotch = !mockup.cornerRadius;
                        return (
                          <div key={mockup.src} className="flex flex-none flex-col items-center gap-4">
                            <div
                              className="relative h-[520px] w-[240px] overflow-hidden border border-white/[0.08] bg-[#111] shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
                              style={{ borderRadius: radius }}
                            >
                              {hasNotch && (
                                <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-3">
                                  <div className="h-[18px] w-[72px] rounded-full bg-black" />
                                </div>
                              )}
                              <img
                                src={mockup.src}
                                alt={mockup.label}
                                className="h-full w-full object-cover object-top"
                                loading="lazy"
                              />
                            </div>
                            <span className="text-[10px] font-light uppercase tracking-[0.16em] text-[#f8ebd8]/35">
                              {mockup.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ── AI WORKFLOW ── */}
        <section className="relative pb-4 pt-2 sm:pb-6 sm:pt-3 md:pb-8 md:pt-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] sm:rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(79,142,247,0.04) 0%, rgba(12,12,12,0.98) 60%), #0c0c0c",
            }}
          >
            {/* subtle grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(232,228,220,0.04) 0 1px, transparent 1px 22px)",
              }}
            />
            <div className="relative z-10 px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16">
              <p className="mb-3 text-[10px] font-light uppercase tracking-[0.2em] text-[#f8ebd8]/40">
                AI Workflow
              </p>
              <h2 className="mb-10 max-w-[40ch] font-sans text-[clamp(18px,2.8vw,26px)] font-light leading-[1.3] tracking-tight">
                {project.aiWorkflow.headline}
              </h2>

              <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {project.aiWorkflow.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col gap-1 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 sm:w-[calc(33.333%-8px)]"
                  >
                    <span className="text-xs font-light uppercase tracking-[0.14em] text-[#f8ebd8]">
                      {tool.name}
                    </span>
                    <span className="text-sm font-light leading-relaxed text-[#f8ebd8]/50">{tool.role}</span>
                  </div>
                ))}
              </div>

              <p className="max-w-[58ch] text-sm font-light leading-relaxed text-[#f8ebd8]/55">
                {project.aiWorkflow.summary}
              </p>
            </div>
          </div>
        </section>

        {/* ── IMPACT ── */}
        <section className="relative pb-4 pt-2 sm:pb-6 sm:pt-3 md:pb-8 md:pt-4">
          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:rounded-3xl">
            <div className="px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16">
              <p className="mb-10 text-[10px] font-light uppercase tracking-[0.2em] text-[#f8ebd8]/40">
                Business Impact
              </p>
              <div className="grid grid-cols-2 gap-px border border-white/[0.05] sm:grid-cols-4">
                {project.impactStats.map((stat) => (
                  <div key={stat.label} className="bg-[#0c0c0c] px-5 py-8 sm:px-6">
                    <p className="mb-2 font-sans text-[clamp(28px,5vw,44px)] font-light leading-none tracking-tight text-[#e8e4dc]">
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-light uppercase tracking-[0.14em] text-[#f8ebd8]/40">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── NEXT PROJECT ── */}
        <section className="relative pb-8 pt-2 sm:pb-12 sm:pt-3 md:pb-16 md:pt-4">
          <Link
            href={`/case-study/${nextProject.slug}`}
            className="group block overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-colors hover:bg-white/[0.04] sm:rounded-3xl"
          >
            <div className="flex items-center justify-between px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14">
              <div>
                <p className="mb-2 text-[10px] font-light uppercase tracking-[0.2em] text-[#f8ebd8]/40">
                  Next Project
                </p>
                <h2 className="font-sans text-[clamp(28px,6vw,56px)] font-light leading-[0.95] tracking-tight text-[#e8e4dc]">
                  {nextProject.name}
                </h2>
                <p className="mt-3 max-w-[40ch] text-sm font-light text-[#f8ebd8]/50">
                  {nextProject.tagline}
                </p>
              </div>
              <PortfolioIcon name="next"
                size={32}
                className="shrink-0 text-[#f8ebd8]/30 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#f8ebd8]/70"
              />
            </div>
          </Link>
        </section>
      </div>

      <footer className="mx-auto w-full max-w-[1440px] bg-black px-4 sm:px-6 md:px-10">
        <div className="grid gap-3 border-t border-white/[0.05] pb-6 pt-6 text-[10px] font-light uppercase tracking-[0.18em] text-[#f8ebd8] sm:text-[11px] md:grid-cols-3">
          <span>© {new Date().getFullYear()} Ian O</span>
          <span className="md:text-center">Designed & built by Ian</span>
          <span className="md:text-right">9.0722° N, 7.4891° E</span>
        </div>
      </footer>
    </main>
  );
}
