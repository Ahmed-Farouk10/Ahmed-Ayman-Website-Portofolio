'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function Spotlight({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden -z-10 ${className}`}>
      <svg
        className="animate-spotlight absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <g filter="url(#filter-spotlight-1)">
          <ellipse
            cx="720"
            cy="-100"
            rx="600"
            ry="300"
            transform="rotate(-15 720 -100)"
            fill="url(#gradient-spotlight-1)"
            fillOpacity="0.22"
          />
        </g>
        <g filter="url(#filter-spotlight-2)">
          <ellipse
            cx="300"
            cy="-50"
            rx="450"
            ry="250"
            transform="rotate(-5 300 -50)"
            fill="url(#gradient-spotlight-2)"
            fillOpacity="0.18"
          />
        </g>
        <defs>
          <filter
            id="filter-spotlight-1"
            x="0"
            y="-500"
            width="1500"
            height="1000"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="120" result="effect1_foregroundBlur_1" />
          </filter>
          <filter
            id="filter-spotlight-2"
            x="-300"
            y="-400"
            width="1200"
            height="800"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_2" />
          </filter>
          <linearGradient
            id="gradient-spotlight-1"
            x1="720"
            y1="-400"
            x2="720"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00f0ff" />
            <stop offset="1" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="gradient-spotlight-2"
            x1="300"
            y1="-300"
            x2="300"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {/* Dynamic ambient cursor/pointer glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(12,74,96,0.15),transparent_70%)]" />
    </div>
  )
}
