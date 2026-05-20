'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function BackgroundGradient({
  children,
  className = '',
  containerClassName = '',
  animate = true,
}) {
  const variants = {
    initial: {
      backgroundPosition: '0 50%',
    },
    animate: {
      backgroundPosition: ['0 50%', '100% 50%', '0 50%'],
    },
  }

  return (
    <div className={`relative p-[4px] group ${containerClassName}`}>
      {/* Animated blurry gradient background behind card */}
      <motion.div
        variants={animate ? variants : undefined}
        initial="initial"
        animate={animate ? 'animate' : undefined}
        transition={
          animate
            ? {
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }
            : undefined
        }
        style={{
          backgroundSize: '400% 400%',
        }}
        className="absolute inset-0 rounded-3xl z-0 opacity-45 group-hover:opacity-75 blur-xl transition-opacity duration-500 bg-[radial-gradient(circle_farthest-side_at_0_100%,#00f0ff,transparent),radial-gradient(circle_farthest-side_at_100%_0,#3b82f6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#00f0ff,transparent),radial-gradient(circle_farthest-side_at_0_0,#3b82f6,transparent)]"
      />

      {/* Solid gradient border */}
      <motion.div
        variants={animate ? variants : undefined}
        initial="initial"
        animate={animate ? 'animate' : undefined}
        transition={
          animate
            ? {
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }
            : undefined
        }
        style={{
          backgroundSize: '400% 400%',
        }}
        className="absolute inset-0 rounded-3xl z-0 bg-[radial-gradient(circle_farthest-side_at_0_100%,#00f0ff,transparent),radial-gradient(circle_farthest-side_at_100%_0,#3b82f6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#00f0ff,transparent),radial-gradient(circle_farthest-side_at_0_0,#3b82f6,transparent)]"
      />

      {/* Content wrapper */}
      <div className={`relative z-10 rounded-2xl ${className}`}>{children}</div>
    </div>
  )
}
