'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const el = dotRef.current
    if (!el) return

    el.style.opacity = '1'

    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null

      if (target?.closest("[data-project-hover='true']")) {
        el.style.opacity = '0'
        return
      }

      const interactive = Boolean(target?.closest('a, button, [role="button"], input, select, label'))
      el.style.opacity = '1'
      el.style.width = interactive ? '28px' : '10px'
      el.style.height = interactive ? '28px' : '10px'
      el.style.background = interactive ? 'transparent' : 'rgba(255,255,255,0.85)'
      el.style.border = interactive ? '1.5px solid rgba(255,255,255,0.55)' : 'none'
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="hidden md:block"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.85)',
        pointerEvents: 'none',
        zIndex: 1000000,
        opacity: 0,
        transform: 'translate(-500px, -500px) translate(-50%, -50%)',
        transition: 'width 0.12s ease, height 0.12s ease, background 0.12s ease, border 0.12s ease, opacity 0.12s ease',
        willChange: 'transform',
      }}
    />
  )
}
