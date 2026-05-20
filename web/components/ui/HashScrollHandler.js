'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash
      if (hash) {
        const targetId = hash.replace('#', '')
        const element = document.getElementById(targetId)
        if (element) {
          // A 350ms delay allows layout threads to complete, hydrations to settle,
          // and GSAP horizontal pinned slider coordinates to fully calculate.
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 350)
        }
      }
    }

    // Execute when route mounts/transitions
    handleHashScroll()

    // Listen to in-page hash changes
    window.addEventListener('hashchange', handleHashScroll)
    return () => window.removeEventListener('hashchange', handleHashScroll)
  }, [pathname])

  return null
}
