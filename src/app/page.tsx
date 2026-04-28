import FramerGradientBackground from "@/components/FramerGradientBackground";
import ParallaxOrchestrator from "@/components/ParallaxOrchestrator";
import ProjectHoverCursor from "@/components/ProjectHoverCursor";
import SectionReveal from "@/components/SectionReveal";
import WorkStackCards from "@/components/WorkStackCards";
import { Aperture } from "lucide-react";

export default function Home() {
  const projects = [
    {
      name: "Barbr App",
      slug: "barbr-app",
      description: "A booking and discovery app experience tailored for barbers and clients.",
      tags: ["Mobile", "Product"],
      videoSrc: "/videos/barbr.MP4",
      hasVideo: true,
      orientation: "portrait",
      fitMode: "contain",
      mediaBg: "#f5f5f5",
    },
    {
      name: "Foodcourt",
      slug: "foodcourt",
      description: "A food ordering and discovery concept focused on speed and clarity.",
      tags: ["Food", "Web"],
      videoSrc: "/videos/foodcourt.MP4",
      hasVideo: true,
      orientation: "landscape",
      fitMode: "contain",
      mediaBg: "#f5f5f5",
    },
    {
      name: "Spacebook",
      slug: "spacebook",
      description: "A social product workspace for teams building fast-moving digital ideas.",
      tags: ["Product", "Web"],
      videoSrc: "/videos/spacebook.mp4",
      hasVideo: true,
      orientation: "landscape",
      fitMode: "cover",
      mediaBg: "transparent",
    },
    {
      name: "Steppa",
      slug: "steppa",
      description: "A modern mobility interface focused on intuitive booking and routing flows.",
      tags: ["UX", "Platform"],
      videoSrc: "/videos/steppa.mp4",
      hasVideo: true,
      orientation: "portrait",
      fitMode: "contain",
      mediaBg: "#f5f5f5",
    },
    {
      name: "AFROSZN",
      slug: "afroszn",
      description: "A culture-first media experience blending editorial storytelling and commerce.",
      tags: ["Brand", "Web"],
      videoSrc: "/videos/afroszn.mp4",
      hasVideo: true,
      orientation: "landscape",
      fitMode: "contain",
      mediaBg: "#f5f5f5",
    },
  ];

  const contactLinks = [
    { label: "Email", handle: "ian@okpoko.dev", href: "mailto:ian@okpoko.dev" },
    { label: "Behance", handle: "@ianokpoko", href: "https://www.behance.net" },
    { label: "Twitter", handle: "@ianokpoko", href: "https://twitter.com" },
    { label: "TikTok", handle: "@ianokpoko", href: "https://www.tiktok.com" },
  ];

  return (
    <main className="relative min-h-screen bg-[#0c0c0c] text-[#e8e4dc]" style={{ overflow: "clip" }}>
      <FramerGradientBackground />
      <ParallaxOrchestrator />
      <ProjectHoverCursor />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          animation: "grainDrift 14s steps(6, end) infinite",
        }}
      />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-t border-white/[0.05] bg-[rgba(12,12,12,0.64)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 md:px-10">
          <a
            href="#"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-colors hover:border-white"
            aria-label="Home"
          >
            <Aperture size={22} strokeWidth={1.75} />
          </a>
          <nav className="font-mono text-[10px] font-light uppercase tracking-[0.18em] text-white sm:text-[11px] sm:tracking-[0.2em]">
            <ul className="flex items-center gap-4 sm:gap-6 md:gap-10">
              <li>
                <a href="#work" className="transition-colors hover:text-[var(--fg)]">
                  Work
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-[var(--fg)]">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-[var(--fg)]">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <SectionReveal
        delayMs={20}
        className="relative mx-auto min-h-[100svh] w-full max-w-[1440px] overflow-hidden px-4 pb-8 pt-24 sm:px-6 sm:pb-16 sm:pt-32 md:px-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 will-change-transform"
          data-parallax-speed="-0.06"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' seed='3'/%3E%3CfeDisplacementMap scale='8'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23w)' opacity='0.18'/%3E%3C/svg%3E\")",
            opacity: 0.2,
          }}
        />
        <div className="relative z-10 flex h-full flex-col justify-end">
          <p className="text-[11px] font-light uppercase tracking-[0.2em] text-white">
            Product Designer & Frontend Developer — Abuja, Nigeria
          </p>
          <h1
            className="mt-6 max-w-[13ch] font-sans font-light leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(44px, 10vw, 128px)" }}
          >
            Designing and <span className="italic">building</span> digital products.
          </h1>
          <div className="mt-10 flex flex-col gap-8 border-t border-white/[0.05] pt-8 md:mt-12 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-sm font-light leading-relaxed text-white">
              I craft visually distinct, high-performing interfaces and turn product ideas into polished,
              scalable digital experiences from concept to launch.
            </p>
            <div className="flex flex-col items-start gap-2 text-xs font-light uppercase tracking-[0.16em] text-white md:items-end">
              <div className="flex items-center gap-3 text-white">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#4ade80] shadow-[0_0_14px_rgba(74,222,128,0.95)]" />
                <span>Available for projects</span>
              </div>
              <span>Based in Abuja, NG</span>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="work"
        delayMs={40}
        className="relative mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 sm:py-16 md:px-10 md:py-24 md:pb-40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 will-change-transform"
          data-parallax-speed="-0.045"
          style={{
            backgroundImage: "radial-gradient(rgba(232,228,220,0.06) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
          }}
        />
        <div className="relative z-10 border-t border-white/[0.05] pt-0">
          <WorkStackCards projects={projects} />
        </div>
      </SectionReveal>

      <SectionReveal
        id="about"
        delayMs={60}
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-52 -left-44 z-0 h-[700px] w-[700px] rounded-full will-change-transform"
          data-parallax-speed="-0.075"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,200,150,0.08) 0%, rgba(0,200,150,0.025) 48%, rgba(0,200,150,0) 76%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-40 will-change-transform"
          data-parallax-speed="-0.03"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(232,228,220,0.04) 0 1px, transparent 1px 18px)",
          }}
        />
        <div className="relative z-10 grid gap-12 border-t border-white/[0.05] pt-10 md:grid-cols-2 md:gap-20">
          <p className="max-w-[20ch] font-sans text-[clamp(36px,8vw,60px)] font-light leading-[1.02] tracking-tight">
            I am a designer and developer focused on making digital products feel clear, useful, and
            deeply human.
          </p>
          <div className="divide-y divide-[rgba(232,228,220,0.08)]">
            <div className="grid gap-2 py-5 sm:grid-cols-[120px_1fr] sm:gap-6">
              <span className="text-xs font-light uppercase tracking-[0.16em] text-white">
                Currently
              </span>
              <p className="text-sm font-light leading-relaxed">Freelancing on product and frontend work.</p>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[120px_1fr] sm:gap-6">
              <span className="text-xs font-light uppercase tracking-[0.16em] text-white">
                Previously
              </span>
              <p className="text-sm font-light leading-relaxed">
                Designed and shipped products across startup teams.
              </p>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[120px_1fr] sm:gap-6">
              <span className="text-xs font-light uppercase tracking-[0.16em] text-white">
                Stack
              </span>
              <p className="text-sm font-light leading-relaxed">
                Figma, Next.js, React, TypeScript, Tailwind, GSAP.
              </p>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[120px_1fr] sm:gap-6">
              <span className="text-xs font-light uppercase tracking-[0.16em] text-white">
                Education
              </span>
              <p className="text-sm font-light leading-relaxed">
                B.Sc. Computer Science — University of Abuja.
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="contact"
        delayMs={70}
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-black px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28"
      >
        <div className="relative z-10 border-t border-white/[0.05] pt-10">
          <h2 className="max-w-[12ch] font-sans text-[clamp(40px,9vw,84px)] font-light leading-[0.96] tracking-tight">
            Let&apos;s make something great.
          </h2>
          <div className="mt-10 sm:mt-12">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group grid w-full grid-cols-[1fr_auto_auto] items-center border-b border-white/[0.05] py-5 sm:py-6"
              >
                <span className="text-xs font-light uppercase tracking-[0.18em] sm:text-sm">{item.label}</span>
                <span className="mr-3 text-xs font-light text-white sm:mr-5 sm:text-sm">{item.handle}</span>
                <span className="text-lg font-light text-white transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        delayMs={80}
        className="relative z-20 mx-auto w-full max-w-[1440px] bg-black px-4 pb-0 sm:px-6 md:px-10"
      >
        <div className="grid gap-3 border-t border-white/[0.05] pb-6 pt-6 text-[10px] font-light uppercase tracking-[0.18em] text-white sm:text-[11px] md:grid-cols-3">
          <span>© {new Date().getFullYear()} Ian Okpoko</span>
          <span className="md:text-center">Designed & built by Ian</span>
          <span className="md:text-right">Abuja, Nigeria</span>
        </div>
      </SectionReveal>
    </main>
  );
}
