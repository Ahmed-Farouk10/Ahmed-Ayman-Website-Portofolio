'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function ShimmerButton({
  children,
  onClick,
  className = '',
  shimmerColor = '#00f0ff',
  shimmerSize = '0.15rem',
  shimmerDuration = '2.2s',
  borderRadius = '9999px',
  background = 'rgba(10, 10, 12, 0.85)',
  href,
  ...props
}) {
  const ButtonContent = (
    <div className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </div>
  )

  const containerStyles = {
    '--shimmer-color': shimmerColor,
    '--shimmer-duration': shimmerDuration,
    '--shimmer-size': shimmerSize,
    '--border-radius': borderRadius,
    '--background': background,
  }

  const baseClasses = `
    group relative flex cursor-pointer items-center justify-center overflow-hidden 
    border border-white/10 px-8 py-3.5 text-zinc-100 font-semibold transition-all duration-300
    hover:border-cyan-500/50 hover:scale-[1.03] active:scale-[0.98]
    focus-ring-halo shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]
    ${className}
  `

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        style={{ borderRadius, ...containerStyles }}
        {...props}
      >
        {/* Shimmer Border Light effect */}
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ borderRadius }}>
          <div
            className="absolute inset-[-100%] animate-shimmer-spin"
            style={{
              background: `conic-gradient(from 0deg, transparent 40%, var(--shimmer-color) 50%, transparent 60%)`,
            }}
          />
        </div>

        {/* Solid dark mask inside for glassmorphism */}
        <div
          className="absolute inset-[1px] z-1 backdrop-blur-xl transition-colors group-hover:bg-zinc-950/90"
          style={{
            borderRadius: `calc(${borderRadius} - 1px)`,
            background,
          }}
        />

        {/* Content */}
        {ButtonContent}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses}
      style={{ borderRadius, ...containerStyles }}
      {...props}
    >
      {/* Shimmer Border Light effect */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ borderRadius }}>
        <div
          className="absolute inset-[-100%] animate-shimmer-spin"
          style={{
            background: `conic-gradient(from 0deg, transparent 40%, var(--shimmer-color) 50%, transparent 60%)`,
          }}
        />
      </div>

      {/* Solid dark mask inside for glassmorphism */}
      <div
        className="absolute inset-[1px] z-1 backdrop-blur-xl transition-colors group-hover:bg-zinc-950/90"
        style={{
          borderRadius: `calc(${borderRadius} - 1px)`,
          background,
        }}
      />

      {/* Content */}
      {ButtonContent}
    </button>
  )
}
