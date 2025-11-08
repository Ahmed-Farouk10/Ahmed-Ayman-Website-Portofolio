// Simple IntersectionObserver-based reveal hook
"use client"

import { useEffect, useRef } from 'react'

export function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.classList.add('reveal')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.add('reveal-visible')
          element.classList.add('is-visible') // for heading underline
          observer.unobserve(element)
        }
      })
    }, { threshold })

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}


