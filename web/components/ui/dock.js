'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export function Dock({ children, className = '' }) {
  const mouseX = useMotionValue(Infinity)
  const isReducedMotion = useReducedMotion()

  return (
    <motion.div
      onMouseMove={(e) => {
        if (!isReducedMotion) {
          mouseX.set(e.clientX)
        }
      }}
      onMouseLeave={() => {
        if (!isReducedMotion) {
          mouseX.set(Infinity)
        }
      }}
      className={`mx-auto flex h-16 items-end gap-4 rounded-2xl bg-zinc-900/60 border border-white/5 px-4 pb-3 backdrop-blur-xl ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { mouseX, isReducedMotion })
        }
        return child
      })}
    </motion.div>
  )
}

export function DockIcon({ mouseX, isReducedMotion, children, ...props }) {
  const ref = useRef(null)

  const distance = useTransform(mouseX, (val) => {
    if (isReducedMotion || val === Infinity || !ref.current) return 0
    const bounds = ref.current.getBoundingClientRect()
    return val - bounds.x - bounds.width / 2
  })

  // Magnify from 40px to 64px based on mouse proximity
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40])
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40])

  const springWidth = useSpring(widthTransform, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  })

  const springHeight = useSpring(heightTransform, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  })

  const style = isReducedMotion 
    ? { width: 40, height: 40 } 
    : { width: springWidth, height: springHeight }

  return (
    <motion.div
      ref={ref}
      style={style}
      className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-zinc-800 border border-zinc-700/50 hover:bg-zinc-700 transition-colors"
      {...props}
    >
      {children}
    </motion.div>
  )
}
