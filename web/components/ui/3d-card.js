'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

export function CardContainer({ children, className = '' }) {
  const ref = useRef(null)
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    setIsTouchDevice(mediaQuery.matches)
  }, [])

  const springConfig = { stiffness: 350, damping: 30, mass: 0.6 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = (e) => {
    if (isTouchDevice || !ref.current) return

    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    // Get cursor relative coordinates inside bounding box
    const relativeX = e.clientX - centerX
    const relativeY = e.clientY - centerY

    // Map to rotation degrees (max 15 deg)
    const rotateX = -(relativeY / (height / 2)) * 12
    const rotateY = (relativeX / (width / 2)) * 12

    x.set(rotateY)
    y.set(rotateX)
  }

  const handleMouseEnter = () => {
    if (isTouchDevice) return
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  if (isTouchDevice) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{
          rotateY: x,
          rotateX: y,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`w-full h-full [transform-style:preserve-3d] ${className}`}>
      {children}
    </div>
  )
}

export function CardItem({ children, className = '', translateZ = 0, ...props }) {
  return (
    <div
      style={{
        transform: `translateZ(${translateZ}px)`,
        transformStyle: 'preserve-3d',
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}
