'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function MagicCard({
  children,
  className = '',
  spotlightColor = 'rgba(6, 182, 212, 0.12)',
  glowColor = 'rgba(6, 182, 212, 0.04)',
}) {
  const containerRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    setIsTouchDevice(mediaQuery.matches)
  }, [])

  const handleMouseMove = (e) => {
    if (isTouchDevice || !containerRef.current) return

    const { left, top } = containerRef.current.getBoundingClientRect()
    setCoords({
      x: e.clientX - left,
      y: e.clientY - top,
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-2xl border border-white/5 
        bg-zinc-900/60 backdrop-blur-xl transition-all duration-500
        hover:border-cyan-500/25 ${className}
      `}
    >
      {/* Moving dynamic radial hover spotlight */}
      {isHovered && !isTouchDevice && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Static background glow on hover for touch fallback */}
      {isTouchDevice && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30 transition-opacity"
          style={{
            background: `radial-gradient(circle at center, ${glowColor}, transparent)`,
          }}
        />
      )}

      <div className="relative z-10 p-6 sm:p-8">{children}</div>
    </div>
  )
}
