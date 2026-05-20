'use client'

import React from 'react'

export function AnimatedShinyText({ children, className = '', shimmerWidth = 100 }) {
  return (
    <span
      style={{
        '--shimmer-width': `${shimmerWidth}px`,
      }}
      className={`
        mx-auto max-w-md text-zinc-300/60
        animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%]
        bg-gradient-to-r from-transparent via-white/80 to-transparent
        ${className}
      `}
    >
      {children}
    </span>
  )
}
