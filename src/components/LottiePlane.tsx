'use client'
import { useEffect, useRef } from 'react'

export default function LottiePlane() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js'
    script.type = 'module'
    document.head.appendChild(script)

    script.onload = () => {
      if (ref.current) {
        ref.current.innerHTML = `
          <dotlottie-player
            src="https://lottie.host/5c332104-f41c-4e30-a05e-1b5d8a8dfc7b/eDyPHG4Yva.lottie"
            autoplay
            loop
            style="width:400px;height:400px"
          ></dotlottie-player>
        `
      }
    }
  }, [])

  return <div ref={ref} />
}
