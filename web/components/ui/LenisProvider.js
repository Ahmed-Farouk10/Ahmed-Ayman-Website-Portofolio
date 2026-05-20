'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register ScrollTrigger client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function LenisProvider({ children }) {
  useEffect(() => {
    ScrollTrigger.defaults({
      ignoreMobileResize: true,
    })
    
    // Refresh ScrollTrigger once everything mounts
    ScrollTrigger.refresh()
  }, [])

  return <>{children}</>
}
