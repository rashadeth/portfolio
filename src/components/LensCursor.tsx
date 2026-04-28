'use client'
import { useEffect, useRef } from 'react'

const LERP = 0.12
const LERP_SCALE = 0.15

export default function LensCursor() {
  const lensRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const target = useRef({ x: -200, y: -200 })
  const active = useRef(false)
  const scaleTarget = useRef(1)
  const scaleCurrent = useRef(1)
  const raf = useRef<number>(0)

  useEffect(() => {
    const lens = lensRef.current
    if (!lens) return

    // Find hero section via DOM traversal — no data attrs needed
    const hero = lens.closest('section') as HTMLElement | null
    if (!hero) return

    const titleEl = hero.querySelector('h1')

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    const onEnter = () => { active.current = true }
    const onLeave = () => { active.current = false }
    const onTitleEnter = () => { scaleTarget.current = 1.2 }
    const onTitleLeave = () => { scaleTarget.current = 1 }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseenter', onEnter)
    hero.addEventListener('mouseleave', onLeave)
    titleEl?.addEventListener('mouseenter', onTitleEnter)
    titleEl?.addEventListener('mouseleave', onTitleLeave)

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP
      pos.current.y += (target.current.y - pos.current.y) * LERP
      scaleCurrent.current += (scaleTarget.current - scaleCurrent.current) * LERP_SCALE

      lens.style.transform = `translate(${pos.current.x - 50}px, ${pos.current.y - 50}px) scale(${scaleCurrent.current})`
      lens.style.opacity = active.current ? '1' : '0'

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)

    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseenter', onEnter)
      hero.removeEventListener('mouseleave', onLeave)
      titleEl?.removeEventListener('mouseenter', onTitleEnter)
      titleEl?.removeEventListener('mouseleave', onTitleLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={lensRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(8px) saturate(180%)',
        WebkitBackdropFilter: 'blur(8px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    />
  )
}
