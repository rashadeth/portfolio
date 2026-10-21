"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function DitherTrophy() {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (video.current) { video.current.muted = true; video.current.defaultMuted = true; }
    const sync = () => {
      if (motion.matches) video.current?.pause();
      else void video.current?.play().catch(() => {});
    };
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);
  return <video ref={video} className="success-trophy" src="/videos/brand/dither-trophy.mp4?v=3" poster="/images/brand/dither-trophy.jpg?v=3" muted loop playsInline controls={false} disablePictureInPicture disableRemotePlayback preload="auto" tabIndex={-1} aria-hidden="true" />;
}

export default function ContactSuccess({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [intro, setIntro] = useState(true);
  const introVideo = useRef<HTMLVideoElement>(null);
  const successTitle = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!intro) { successTitle.current?.focus({ preventScroll: true }); return; }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => setIntro(false);
    // Never hold a successful message behind a failed or blocked video.
    const watchdog = window.setTimeout(finish, reduced.matches ? 0 : 4500);
    let playbackTimer: ReturnType<typeof setTimeout> | undefined;
    const playing = () => { if (!playbackTimer) playbackTimer = setTimeout(finish, 3000); };
    const video = introVideo.current;
    video?.addEventListener("playing", playing);
    if (video && !video.paused) playing();
    if (!reduced.matches) void video?.play().catch(finish);
    reduced.addEventListener("change", finish);
    return () => { clearTimeout(watchdog); clearTimeout(playbackTimer); video?.removeEventListener("playing", playing); reduced.removeEventListener("change", finish); };
  }, [intro]);
  useEffect(() => {
    const node = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    node?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { node?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className={`contact-celebration${intro ? " is-intro" : ""}`} aria-label={intro ? "Message sent" : undefined} aria-labelledby={intro ? undefined : "success-title"} aria-describedby={intro ? undefined : "success-description"} onCancel={(event) => { event.preventDefault(); onClose(); }}>
    {intro ? <div className="success-dither" aria-hidden="true">
      <video ref={introVideo} src="/videos/brand/dither-horse.mp4" autoPlay muted playsInline controls={false} disablePictureInPicture disableRemotePlayback preload="auto" tabIndex={-1} onEnded={() => setIntro(false)} onError={() => setIntro(false)} />
    </div> : <>
    <div className="success-content">
      <DitherTrophy />
      <h2 ref={successTitle} tabIndex={-1} id="success-title">Message sent.</h2>
      <p id="success-description">Thanks for reaching out.<br />I’ll be in touch by email.</p>
      <div className="success-actions">
        <Link href="/films">Explore my work</Link>
        <button type="button" onClick={onClose}>Back to contact</button>
      </div>
    </div>
    </>}
  </dialog>;
}
