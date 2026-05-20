'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export function Globe({ className = '' }) {
  const canvasRef = useRef(null)
  const isReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let rotation = 0

    // Coordinates of Cairo: 30.0444° N, 31.2357° E
    // Cairo connected to other global hub cities
    const points = [
      { lat: 30.04, lng: 31.24, label: 'Cairo (Home Base)' },
      { lat: 40.71, lng: -74.00, label: 'New York' },
      { lat: 51.50, lng: -0.12, label: 'London' },
      { lat: 35.67, lng: 139.65, label: 'Tokyo' },
    ]

    const resizeCanvas = () => {
      if (!canvas.parentNode) return
      const rect = canvas.parentNode.getBoundingClientRect()
      canvas.width = rect.width * (window.devicePixelRatio || 1)
      canvas.height = rect.height * (window.devicePixelRatio || 1)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const draw = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const scale = Math.min(canvas.width, canvas.height) / 2
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const r = scale * 0.75

      // 1. Draw Globe Atmosphere Outer Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.1)
      glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.04)')
      glowGrad.addColorStop(0.8, 'rgba(6, 182, 212, 0.12)')
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2)
      ctx.fill()

      // 2. Draw Sphere Outer Wireframe Outline
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.stroke()

      // 3. Draw Grid Lines (Latitude & Longitude)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
      
      // Latitude circles
      for (let lat = -75; lat <= 75; lat += 15) {
        const theta = (lat * Math.PI) / 180
        const z = r * Math.sin(theta)
        const rad = r * Math.cos(theta)
        ctx.beginPath()
        for (let i = 0; i <= 60; i++) {
          const phi = (i * 6 * Math.PI) / 180 + rotation
          const x = rad * Math.cos(phi)
          const y = z
          if (i === 0) ctx.moveTo(cx + x, cy + y)
          else ctx.lineTo(cx + x, cy + y)
        }
        ctx.stroke()
      }

      // Longitude lines
      for (let lng = 0; lng < 180; lng += 30) {
        ctx.beginPath()
        for (let i = -90; i <= 90; i++) {
          const latTheta = (i * Math.PI) / 180
          const z = r * Math.sin(latTheta)
          const rad = r * Math.cos(latTheta)
          const phi = (lng * Math.PI) / 180 + rotation
          const x = rad * Math.cos(phi)
          const y = z
          if (i === -90) ctx.moveTo(cx + x, cy + y)
          else ctx.lineTo(cx + x, cy + y)
        }
        ctx.stroke()
      }

      // 4. Draw Points and Arcs
      const projected = points.map((p) => {
        const phi = (p.lng * Math.PI) / 180 + rotation
        const theta = (p.lat * Math.PI) / 180
        
        // Orthographic projection formulas
        const x = r * Math.cos(theta) * Math.sin(phi)
        const y = -r * Math.sin(theta)
        const z = r * Math.cos(theta) * Math.cos(phi) // z positive is front-facing

        return { x: cx + x, y: cy + y, z, label: p.label }
      })

      // Connections first (drawn behind dots)
      const cairo = projected[0]
      if (cairo.z > 0) {
        projected.forEach((target, i) => {
          if (i === 0 || target.z <= 0) return
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)'
          ctx.lineWidth = 1.2
          ctx.setLineDash([3, 4])
          ctx.beginPath()
          ctx.moveTo(cairo.x, cairo.y)
          
          const mx = (cairo.x + target.x) / 2
          const my = (cairo.y + target.y) / 2 - 20 // upward arc offset
          ctx.quadraticCurveTo(mx, my, target.x, target.y)
          ctx.stroke()
          ctx.setLineDash([])
        })
      }

      // Connection dots
      projected.forEach((p) => {
        if (p.z <= 0) return

        ctx.fillStyle = p.label.includes('Cairo') ? '#00f0ff' : 'rgba(59, 130, 246, 0.8)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.label.includes('Cairo') ? 4.5 : 3, 0, Math.PI * 2)
        ctx.fill()

        if (p.label.includes('Cairo')) {
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)'
          ctx.lineWidth = 1
          ctx.beginPath()
          const pulseRadius = 4 + (Date.now() % 1600) / 150
          ctx.arc(p.x, p.y, pulseRadius, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      if (!isReduced) {
        rotation += 0.0035
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted, isReduced])

  if (!mounted) return <div className={`aspect-square w-full bg-transparent ${className}`} />

  return (
    <div className={`relative aspect-square w-full max-w-[280px] sm:max-w-[320px] mx-auto select-none ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  )
}
