'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useSpring, useTransform, motion } from 'framer-motion'

export function Timeline({ experiences = [], children }) {
  const containerRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ['start 60%', 'end 60%'],
  })

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    restDelta: 0.001,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || experiences.length === 0) {
    return <div className="w-full h-10 bg-transparent" />
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      {/* Scroll Tracing Laser SVG Line */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px]">
        {/* Underlay tracking track */}
        <div className="absolute inset-0 bg-white/5 rounded-full" />
        
        {/* Animated tracing beam overlay */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="laser-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
              <stop offset="90%" stopColor="#00f0ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>
            <filter id="laser-glow">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="url(#laser-grad)"
            strokeWidth="3"
            filter="url(#laser-glow)"
            style={{ pathLength }}
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {children}
    </div>
  )
}
