'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState, useMemo } from 'react'
import * as THREE from 'three'

/**
 * Highly optimized, GPU-accelerated glowing 3D Neural Synaptic Web
 * - Renders 120 dynamic nodes
 * - Projects real-time line synapses between adjacent points (< 18 units)
 * - Employs vertex colors to animate running electric light pulses along the synapses
 * - Implements cursor gravity wells pulling connections elastically towards the pointer
 */
function NeuralNetwork({ mouseX, mouseY }) {
  const pointsRef = useRef(null)
  const linesRef = useRef(null)

  const nodeCount = 120
  const maxDistance = 18

  // 1. Initialize stable node positions and dynamic velocities
  const [nodes, velocities] = useMemo(() => {
    const tempNodes = []
    const tempVels = []
    for (let i = 0; i < nodeCount; i++) {
      // Bounded distribution inside spatial container box
      tempNodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
      ))
      // Subtle velocity vectors for slow spatial drift
      tempVels.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.08,
        (Math.random() - 0.5) * 0.08,
        (Math.random() - 0.5) * 0.08
      ))
    }
    return [tempNodes, tempVels]
  }, [])

  // 2. Pre-allocate Buffer Arrays for points geometry
  const [pointsGeometry, pointsMaterial] = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(nodeCount * 3)
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      size: 0.8,
      color: '#00e5ff',
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    })
    return [geometry, material]
  }, [])

  // 3. Pre-allocate dynamic Line Segment arrays
  // Max possible line segments for 120 points is N*(N-1)/2, but active synapses rarely exceed 400
  const maxSegments = 600
  const [linesGeometry, linesMaterial] = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array(maxSegments * 2 * 3) // 2 points per line segment
    const lineColors = new Float32Array(maxSegments * 2 * 3)

    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      linewidth: 1,
    })
    return [geometry, material]
  }, [])

  // 4. Memory Cleanup: Dispose geometries and materials on unmount to prevent GPU leaks
  useEffect(() => {
    return () => {
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      linesGeometry.dispose()
      linesMaterial.dispose()
    }
  }, [pointsGeometry, pointsMaterial, linesGeometry, linesMaterial])

  // 5. Main WebGL Animation Loop: Computes drift, pointer gravity, dynamic synapses, and pulses
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const pointsPositions = pointsGeometry.attributes.position.array
    const linePositions = linesGeometry.attributes.position.array
    const lineColors = linesGeometry.attributes.color.array

    let lineIndex = 0

    // Smooth lerp targets for cursor drift tracking
    const targetX = mouseX * 0.4
    const targetY = mouseY * 0.4

    for (let i = 0; i < nodeCount; i++) {
      const node = nodes[i]
      const vel = velocities[i]

      // Slow orbital drift updates
      node.add(vel)

      // Bounding box bounce dynamics
      if (Math.abs(node.x) > 40) vel.x *= -1
      if (Math.abs(node.y) > 40) vel.y *= -1
      if (Math.abs(node.z) > 40) vel.z *= -1

      // Cursor gravity well calculation: pulls nodes closer to pointer coordinates
      const distToMouse = Math.sqrt((node.x - targetX) ** 2 + (node.y - targetY) ** 2)
      if (distToMouse < 25) {
        const pullStrength = (25 - distToMouse) * 0.008
        node.x += (targetX - node.x) * pullStrength
        node.y += (targetY - node.y) * pullStrength
      }

      // Update Points Buffer
      const i3 = i * 3
      pointsPositions[i3] = node.x
      pointsPositions[i3 + 1] = node.y
      pointsPositions[i3 + 2] = node.z

      // Synaptic search: calculate connections to subsequent nodes
      for (let j = i + 1; j < nodeCount; j++) {
        if (lineIndex >= maxSegments) break

        const otherNode = nodes[j]
        const dx = node.x - otherNode.x
        const dy = node.y - otherNode.y
        const dz = node.z - otherNode.z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        // Draw active synapse connection if nodes are within close proximity
        if (dist < maxDistance) {
          const l6 = lineIndex * 6

          // Node A vertex coordinates
          linePositions[l6] = node.x
          linePositions[l6 + 1] = node.y
          linePositions[l6 + 2] = node.z

          // Node B vertex coordinates
          linePositions[l6 + 3] = otherNode.x
          linePositions[l6 + 4] = otherNode.y
          linePositions[l6 + 5] = otherNode.z

          // Pulsing wave calculation: sends high-intensity electric light down the line segment
          // pulseOffset shifts waves along the lines. Mouse movement speed scales pulse speed.
          const pulseSpeed = 6.0
          const wavePulse = Math.sin(dist * 0.8 - time * pulseSpeed) * 0.5 + 0.5
          
          // Interpolate synapse colors between base blue/slate and blazing glowing cyan
          // Base: Deep Cyan (#083344)
          // Pulse Peak: Glowing Neon Cyan (#00e5ff)
          const baseColor = new THREE.Color('#083344')
          const pulseColor = new THREE.Color('#00e5ff')
          const finalColor = baseColor.clone().lerp(pulseColor, wavePulse)

          // Assign color values to line vertices
          lineColors[l6] = finalColor.r
          lineColors[l6 + 1] = finalColor.g
          lineColors[l6 + 2] = finalColor.b

          lineColors[l6 + 3] = finalColor.r
          lineColors[l6 + 4] = finalColor.g
          lineColors[l6 + 5] = finalColor.b

          lineIndex++
        }
      }
    }

    // Set remaining buffer positions to 0 to prevent rendering artifacts
    for (let k = lineIndex * 6; k < maxSegments * 6; k++) {
      linePositions[k] = 0
      lineColors[k] = 0
    }

    // Flag buffer attributes for immediate WebGL redraw updates
    pointsGeometry.attributes.position.needsUpdate = true
    linesGeometry.attributes.position.needsUpdate = true
    linesGeometry.attributes.color.needsUpdate = true
  })

  return (
    <group>
      <points geometry={pointsGeometry} material={pointsMaterial} ref={pointsRef} />
      <lineSegments geometry={linesGeometry} material={linesMaterial} ref={linesRef} />
    </group>
  )
}

/**
 * Scene setup with active lighting
 */
function Scene({ mouseX, mouseY, isReducedMotion }) {
  return (
    <>
      <perspectiveCamera makeDefault position={[0, 0, 100]} />
      <ambientLight intensity={0.6} color={0x00e5ff} />
      <pointLight position={[60, 60, 60]} intensity={1.2} color={0xffffff} />
      <pointLight position={[-60, -60, 60]} intensity={0.6} color={0x3b82f6} />

      {!isReducedMotion && (
        <NeuralNetwork mouseX={mouseX} mouseY={mouseY} />
      )}

      {isReducedMotion && (
        // Render a static point cluster when user prefers reduced motion
        <PointsFallback />
      )}
    </>
  )
}

/**
 * Static points fallback to perfectly satisfy accessibility standard (reduced motion)
 */
function PointsFallback() {
  const geom = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const pos = new Float32Array(150 * 3)
    for (let i = 0; i < 150 * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 80
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geometry
  }, [])

  const mat = useMemo(() => new THREE.PointsMaterial({ size: 0.6, color: '#00e5ff', opacity: 0.4, transparent: true }), [])

  return <points geometry={geom} material={mat} />
}

export default function HeroCanvas({ isInView, isReducedMotion = false }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isReducedMotion) return

    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      // Keep boundaries focused around relative coordinates
      setMousePos({ x: x * 50, y: y * 50 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isReducedMotion])

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        className="w-full h-full"
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
        }}
      >
        {isInView && (
          <Scene mouseX={mousePos.x} mouseY={mousePos.y} isReducedMotion={isReducedMotion} />
        )}
      </Canvas>
    </div>
  )
}
