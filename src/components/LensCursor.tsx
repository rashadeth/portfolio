'use client'
import { useEffect, useRef, useState } from 'react'

const WORDS = [
  { en: 'Designing', zh: '设计' },
  { en: 'and', zh: '和' },
  { en: 'building', zh: '构建' },
  { en: 'digital', zh: '数字' },
  { en: 'products.', zh: '产品。' },
]

const LERP = 0.1
const RADIUS = 60

export default function LensCursor() {
  const [mounted, setMounted] = useState(false)
  const lensRef = useRef<HTMLDivElement>(null)
  const clipCircleRef = useRef<SVGCircleElement>(null)
  const magLayerRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -300, y: -300 })
  const target = useRef({ x: -300, y: -300 })
  const active = useRef(false)
  const titleRect = useRef<DOMRect | null>(null)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (window.innerWidth < 768) return
    setMounted(true)

    const measureTitle = () => {
      const el = document.getElementById('hero-title')
      if (el) titleRect.current = el.getBoundingClientRect()
    }
    requestAnimationFrame(measureTitle)
    window.addEventListener('resize', measureTitle)

    const heroSection = document.getElementById('hero-title')?.closest('section') as HTMLElement | null

    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY } }
    const onEnter = () => { active.current = true }
    const onLeave = () => { active.current = false }

    heroSection?.addEventListener('mousemove', onMove)
    heroSection?.addEventListener('mouseenter', onEnter)
    heroSection?.addEventListener('mouseleave', onLeave)

    const onWordHover = ((e: CustomEvent) => {
      const { en, zh } = e.detail
      if (!magLayerRef.current) return
      magLayerRef.current.querySelectorAll<HTMLSpanElement>('[data-en]').forEach(span => {
        if (span.dataset.en === en) {
          span.textContent = zh
          span.style.color = '#d4c9a8'
          span.style.fontFamily = 'var(--font-serif)'
        }
      })
    }) as EventListener

    const onWordLeave = (() => {
      if (!magLayerRef.current) return
      magLayerRef.current.querySelectorAll<HTMLSpanElement>('[data-en]').forEach(span => {
        span.textContent = span.dataset.en ?? ''
        span.style.color = ''
        span.style.fontFamily = ''
      })
    }) as EventListener

    window.addEventListener('word-hover', onWordHover)
    window.addEventListener('word-leave', onWordLeave)

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP
      pos.current.y += (target.current.y - pos.current.y) * LERP

      const { x, y } = pos.current
      const tr = titleRect.current

      // Lens circle
      if (lensRef.current) {
        lensRef.current.style.transform = `translate(${x - RADIUS}px, ${y - RADIUS}px)`
        lensRef.current.style.opacity = active.current ? '1' : '0'
      }

      // SVG clip circle
      if (clipCircleRef.current) {
        clipCircleRef.current.setAttribute('cx', String(Math.round(x)))
        clipCircleRef.current.setAttribute('cy', String(Math.round(y)))
      }

      // Magnified text layer
      if (magLayerRef.current && tr) {
        magLayerRef.current.style.top = `${tr.top}px`
        magLayerRef.current.style.left = `${tr.left}px`
        magLayerRef.current.style.transformOrigin = `${x - tr.left}px ${y - tr.top}px`
        magLayerRef.current.style.opacity = active.current ? '1' : '0'
      }

      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      heroSection?.removeEventListener('mousemove', onMove)
      heroSection?.removeEventListener('mouseenter', onEnter)
      heroSection?.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('word-hover', onWordHover)
      window.removeEventListener('word-leave', onWordLeave)
      window.removeEventListener('resize', measureTitle)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* SVG clip path — circle tracks cursor in viewport space */}
      <svg
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          overflow: 'visible',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      >
        <defs>
          <clipPath id="lens-clip" clipPathUnits="userSpaceOnUse">
            <circle ref={clipCircleRef} cx="-300" cy="-300" r={RADIUS} />
          </clipPath>
        </defs>
      </svg>

      {/* Magnified text layer — same position/font as real title, scaled from cursor */}
      <div
        ref={magLayerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          fontFamily: 'var(--font-sans)',
          fontWeight: 300,
          fontSize: 'clamp(44px, 10vw, 128px)',
          lineHeight: 1.15,
          letterSpacing: '-0.05em',
          maxWidth: '13ch',
          color: '#e8e4dc',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          transform: 'scale(1.6)',
          clipPath: 'url(#lens-clip)',
          userSelect: 'none',
          whiteSpace: 'normal',
        }}
      >
        {WORDS.map((w, i) => (
          <span key={w.en}>
            {i > 0 && ' '}
            <span data-en={w.en}>{w.en}</span>
          </span>
        ))}
      </div>

      {/* Glass lens circle */}
      <div
        ref={lensRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: RADIUS * 2,
          height: RADIUS * 2,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  )
}
