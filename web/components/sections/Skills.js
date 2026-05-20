'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Matter from 'matter-js'

/**
 * Interactive 2D physics sandbox replacing static skill marquees.
 * Skills are rigid-body capsules that can be dragged, tossed, and bounced
 * inside a bounded canvas container using Matter.js.
 *
 * Falls back to a static glass-badge grid when prefers-reduced-motion is active.
 */
export default function Skills({ skills = [] }) {
  const [mounted, setMounted] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const animFrameRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mq.matches)
    const handler = (e) => setIsReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Physics engine lifecycle
  useEffect(() => {
    if (!mounted || isReducedMotion || !containerRef.current || !canvasRef.current || skills.length === 0) return

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Body } = Matter

    const width = containerRef.current.clientWidth
    const height = 480

    // 1. Engine
    const engine = Engine.create({ gravity: { x: 0, y: 0.18 } })
    engineRef.current = engine

    // 2. Renderer (transparent background — HTML badges drawn on top)
    const render = Render.create({
      element: containerRef.current,
      canvas: canvasRef.current,
      engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
    })

    // 3. Containment walls (invisible)
    const wallOpts = { isStatic: true, render: { visible: false }, friction: 0.3 }
    const ground = Bodies.rectangle(width / 2, height + 30, width + 100, 60, wallOpts)
    const ceiling = Bodies.rectangle(width / 2, -30, width + 100, 60, wallOpts)
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height + 100, wallOpts)
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height + 100, wallOpts)
    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall])

    // 4. Generate rigid bodies for skill badges
    const badgeBodies = skills.map((skill, index) => {
      const radius = 38 + Math.random() * 12
      const x = 80 + Math.random() * (width - 160)
      const y = 40 + Math.random() * 120

      const body = Bodies.circle(x, y, radius, {
        restitution: 0.75,
        frictionAir: 0.025,
        density: 0.0012,
        render: { visible: false },
      })

      body.label = skill.name
      body.skillIndex = index
      return body
    })

    Composite.add(engine.world, badgeBodies)

    // 5. Mouse constraint for spring-drag interactions
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.12,
        render: { visible: false },
      },
    })
    Composite.add(engine.world, mouseConstraint)
    render.mouse = mouse

    // Prevent canvas from hijacking page scroll
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)

    // 6. Run engine + renderer
    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)

    // 7. Sync HTML badge overlays to physics body positions
    // Cache badge dimensions to prevent layout thrashing (forced synchronous layout queries)
    const dimensions = badgeBodies.map((body, i) => {
      const el = document.getElementById(`skill-badge-${i}`)
      if (el) {
        return {
          bw: el.offsetWidth / 2,
          bh: el.offsetHeight / 2,
        }
      }
      return { bw: 40, bh: 20 } // safe fallback
    })

    const syncBadges = () => {
      badgeBodies.forEach((body, i) => {
        const el = document.getElementById(`skill-badge-${i}`)
        if (el) {
          const { bw, bh } = dimensions[i]
          el.style.transform = `translate3d(${body.position.x - bw}px, ${body.position.y - bh}px, 0) rotate(${body.angle}rad)`
        }
      })
      animFrameRef.current = requestAnimationFrame(syncBadges)
    }
    syncBadges()

    // 8. Responsive resize
    const handleResize = () => {
      if (!containerRef.current) return
      const newWidth = containerRef.current.clientWidth
      render.canvas.width = newWidth * Math.min(window.devicePixelRatio, 2)
      render.canvas.height = height * Math.min(window.devicePixelRatio, 2)
      render.canvas.style.width = `${newWidth}px`
      render.canvas.style.height = `${height}px`
      render.options.width = newWidth
      render.options.height = height
      Body.setPosition(rightWall, { x: newWidth + 30, y: height / 2 })
      Body.setPosition(ground, { x: newWidth / 2, y: height + 30 })
      Body.setPosition(ceiling, { x: newWidth / 2, y: -30 })
    }
    window.addEventListener('resize', handleResize)

    // 9. Full GPU memory cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animFrameRef.current)
      Render.stop(render)
      Runner.stop(runner)
      Composite.clear(engine.world)
      Engine.clear(engine)
      render.canvas.remove()
      render.textures = {}
    }
  }, [mounted, isReducedMotion, skills])

  if (!mounted) return null

  // Reduced-motion static fallback: beautiful glass badge grid
  if (isReducedMotion) {
    return (
      <section id="skills" className="py-24 relative overflow-hidden" aria-label="Technical Skills">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold text-mercury text-center mb-4 tracking-tight">
            Technical <span className="text-cyan-electric">Skills</span>
          </h2>
          <p className="text-mercury-muted text-center mb-12 max-w-xl mx-auto text-sm opacity-80">
            Technologies I work with daily to build intelligent systems.
          </p>
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 bg-carbon-light/35 border border-white/5 rounded-3xl p-8">
            {skills.map((skill, i) => (
              <div
                key={skill._id || i}
                className="glass-container px-6 py-3.5 rounded-full border border-white/8 hover:border-cyan-500/50 transition-colors duration-300"
                tabIndex={0}
              >
                <span className="text-cyan-electric font-semibold text-sm tracking-tight">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Full interactive physics playground
  return (
    <section id="skills" className="py-24 relative overflow-hidden" aria-label="Technical Skills">
      {/* Background ambient spotlights */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold text-mercury text-center mb-4 tracking-tight">
          Technical <span className="text-cyan-electric">Skills</span>
        </h2>
        <p className="text-mercury-muted text-center mb-12 max-w-xl mx-auto text-sm opacity-80">
          Drag, toss, and play — these are the tools I use to build intelligent systems.
        </p>

        {/* Physics Container */}
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl mx-auto overflow-hidden bg-carbon-light/35 border border-white/5 rounded-3xl"
          style={{ height: '480px' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 z-0" />

          {/* HTML badge overlays synced to physics bodies */}
          <div className="absolute inset-0 z-10 pointer-events-none select-none">
            {skills.map((skill, i) => (
              <div
                key={skill._id || i}
                id={`skill-badge-${i}`}
                className="absolute pointer-events-auto cursor-grab active:cursor-grabbing backdrop-blur-xl bg-zinc-900/60 px-6 py-3.5 rounded-full select-none flex items-center justify-center border border-white/8 hover:border-cyan-500/50 shadow-lg shadow-black/30 transition-[border-color] duration-200"
                style={{ willChange: 'transform' }}
                tabIndex={0}
                role="listitem"
                aria-label={skill.name}
              >
                <span className="text-mercury font-semibold text-sm tracking-tight whitespace-nowrap">{skill.name}</span>
              </div>
            ))}
          </div>

          {/* Subtle ambient glow inside the playground */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
