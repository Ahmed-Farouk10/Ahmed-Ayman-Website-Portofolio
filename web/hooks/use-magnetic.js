'use client'

import { useRef, useState, useEffect } from 'react'

/**
 * Custom hook to create a premium magnetic hover effect on interactive elements.
 * Attracts the element toward the cursor within a given range.
 */
export default function useMagnetic(range = 45) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isReduced, setIsReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReduced(mediaQuery.matches)

    const handleChange = (e) => {
      setIsReduced(e.matches)
      if (e.matches) {
        setPosition({ x: 0, y: 0 })
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (isReduced) {
      setPosition({ x: 0, y: 0 })
      return
    }

    const handleMouseMove = (e) => {
      if (!ref.current) return

      const { clientX, clientY } = e
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = clientX - centerX
      const distanceY = clientY - centerY

      // If mouse is within active magnetic threshold bounds
      if (Math.sqrt(distanceX * distanceX + distanceY * distanceY) < range) {
        // Pull target towards mouse coordinates (subtle dampening applied)
        setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 })
      } else {
        // Spring back home
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    const element = ref.current
    if (element) {
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [range, isReduced])

  return { ref, x: position.x, y: position.y }
}

