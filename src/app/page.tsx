import FramerGradientBackground from "@/components/FramerGradientBackground";
import ContactLinksAnimated from "@/components/ContactLinksAnimated";
import HeroTitle from "@/components/HeroTitle";
import LensCursor from "@/components/LensCursor";
import ProjectHoverCursor from "@/components/ProjectHoverCursor";
import WhatsAppIcon from "@/components/WhatsAppIcon";
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
      liveUrl: "https://apps.apple.com/ng/app/barbr-creators/id6760665839",
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
      liveUrl: "https://apps.apple.com/ng/app/foodcourt-food-delivery/id1579693328",
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
      liveUrl: "https://afroszn.org/",
    },
  ];

  const contactLinks = [
    { label: "Email", href: "mailto:yohananokpoko@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ian-okpoko-9b35922b6?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
    { label: "Twitter", href: "https://x.com/yohanansoltd?s=21" },
    { label: "TikTok", href: "https://www.tiktok.com/@yohanan.sol?_r=1&_t=ZS-95usZANzM2i." },
  ];

  return (
    <main className="relative min-h-screen bg-[#0c0c0c] text-[#e8e4dc]" style={{ overflow: "clip" }}>
      <FramerGradientBackground />
      <ProjectHoverCursor />
      <WhatsAppIcon />

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
          <nav className="font-sans text-[10px] font-light tracking-[0.08em] text-white sm:text-[11px] sm:tracking-[0.1em]">
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

      <section className="relative mx-auto min-h-[100svh] w-full max-w-[1440px] overflow-hidden px-4 pb-8 pt-24 sm:px-6 sm:pb-16 sm:pt-32 md:px-10">
        <LensCursor />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' seed='3'/%3E%3CfeDisplacementMap scale='8'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23w)' opacity='0.18'/%3E%3C/svg%3E\")",
            opacity: 0.2,
          }}
        />
        <div className="relative z-10 flex h-full flex-col justify-end">
          <div style={{ marginBottom: '24px' }}>
            <svg
              width="280"
              height="160"
              viewBox="0 0 280 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <g style={{ animation: 'flyAcross 14s linear infinite', transform: 'scale(2)', transformOrigin: '0px 0px' }}>
                {/* Paper plane body */}
                <path
                  d="M0 0 L-30 -15 L-22 0 L-30 15 Z"
                  stroke="#e8e4dc"
                  strokeWidth="1.2"
                  fill="rgba(232,228,220,0.1)"
                  strokeLinejoin="round"
                />
                {/* Wing fold */}
                <path d="M0 0 L-22 0" stroke="#e8e4dc" strokeWidth="0.8" opacity="0.4"/>

                {/* Ribbon string from tail */}
                <path
                  d="M-30 0 Q-45 8 -55 4 Q-70 0 -80 6 Q-90 12 -100 8"
                  stroke="#d4c9a8"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.7"
                />

                {/* Ribbon banner */}
                <rect
                  x="-145" y="-10" width="60" height="20" rx="2"
                  fill="rgba(212,201,168,0.12)"
                  stroke="#d4c9a8"
                  strokeWidth="0.8"
                />
                {/* Ribbon tails */}
                <path
                  d="M-145 -10 L-152 0 L-145 10"
                  fill="rgba(212,201,168,0.12)"
                  stroke="#d4c9a8"
                  strokeWidth="0.8"
                />

                {/* Text on ribbon */}
                <text
                  x="-115" y="5"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontSize="7"
                  fill="#d4c9a8"
                  letterSpacing="1"
                  opacity="0.9"
                >
                  let&apos;s work
                </text>
              </g>

              <style>{`
                @keyframes flyAcross {
                  0%   { transform: scale(2) translate(-200px, 100px) rotate(-3deg); }
                  30%  { transform: scale(2) translate(400px,  70px)  rotate(-5deg); }
                  60%  { transform: scale(2) translate(850px,  90px)  rotate(-2deg); }
                  100% { transform: scale(2) translate(1600px, 75px)  rotate(-4deg); }
                }
                @keyframes drawString {
                  0%, 100% { opacity: 0.7; }
                  50%      { opacity: 0.4; }
                }
              `}</style>
            </svg>
          </div>
          <p className="text-[11px] font-light uppercase tracking-[0.2em] text-white">Design Engineer</p>
          <HeroTitle />
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
      </section>

      <section
        id="work"
        className="relative z-10 mx-auto w-full max-w-[1440px] overflow-hidden px-4 py-8 sm:px-6 sm:py-16 md:px-10 md:py-24 md:pb-40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
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
      </section>

      <section
        id="about"
        className="relative z-20 mx-auto w-full max-w-[1440px] overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 md:px-10 md:pb-28 md:pt-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-52 -left-44 z-0 h-[700px] w-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,200,150,0.08) 0%, rgba(0,200,150,0.025) 48%, rgba(0,200,150,0) 76%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
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
      </section>

      <section
        id="contact"
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-black px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28"
      >
        <div className="relative z-10 border-t border-white/[0.05] pt-10">
          <h2 className="max-w-[12ch] font-sans text-[clamp(40px,9vw,84px)] font-light leading-[0.96] tracking-tight">
            Let&apos;s make something great.
          </h2>
          <ContactLinksAnimated links={contactLinks} />
        </div>
      </section>

      <footer className="relative z-20 mx-auto w-full max-w-[1440px] bg-black px-4 pb-0 sm:px-6 md:px-10">
        <div className="grid gap-3 border-t border-white/[0.05] pb-6 pt-6 text-[10px] font-light uppercase tracking-[0.18em] text-white sm:text-[11px] md:grid-cols-3">
          <span>© {new Date().getFullYear()} Ian Rashad</span>
          <span className="md:text-center">Designed & built by Ian</span>
          <span className="md:text-right">Abuja, Nigeria</span>
        </div>
      </footer>
    </main>
  );
}
