'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Magnetic({ children, range = 50, actionScale = 1.05 }) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  const [isReduced, setIsReduced] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 180, damping: 15, mass: 0.8 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const mediaQueryTouch = window.matchMedia('(pointer: coarse)')
    setIsTouchDevice(mediaQueryTouch.matches)

    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReduced(mediaQueryMotion.matches)

    const handleChangeTouch = (e) => setIsTouchDevice(e.matches)
    const handleChangeMotion = (e) => {
      setIsReduced(e.matches)
      if (e.matches) {
        x.set(0)
        y.set(0)
        setIsHovered(false)
      }
    }

    mediaQueryTouch.addEventListener('change', handleChangeTouch)
    mediaQueryMotion.addEventListener('change', handleChangeMotion)

    return () => {
      mediaQueryTouch.removeEventListener('change', handleChangeTouch)
      mediaQueryMotion.removeEventListener('change', handleChangeMotion)
    }
  }, [x, y])

  const handleMouseMove = (e) => {
    if (isReduced || isTouchDevice || !ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    // Get distance relative to the center of the bounding box
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    // If within interaction range
    const distance = Math.hypot(distanceX, distanceY)

    if (distance < range) {
      setIsHovered(true)
      // Pull element toward cursor (dampened effect)
      x.set(distanceX * 0.45)
      y.set(distanceY * 0.45)
    } else {
      setIsHovered(false)
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  if (isReduced || isTouchDevice) {
    return <div ref={ref} className="inline-block">{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      animate={{ scale: isHovered ? actionScale : 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}

