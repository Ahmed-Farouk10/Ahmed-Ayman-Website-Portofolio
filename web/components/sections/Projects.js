'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import ProjectCard3D from '@/components/ui/ProjectCard3D'

gsap.registerPlugin(ScrollTrigger)

/**
 * Horizontal pinned scroll slider for showcasing projects.
 *
 * The page pins vertically when the user scrolls into this section.
 * Further scrolling translates project panels horizontally (left).
 * Each panel heading uses SplitType character-mask staggers for reveal.
 *
 * Falls back to a clean responsive grid when prefers-reduced-motion is active.
 */
export default function Projects({ projects = [] }) {
  const [mounted, setMounted] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mq.matches)
    const handler = (e) => setIsReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // GSAP ScrollTrigger horizontal pin
  useEffect(() => {
    if (!mounted || isReducedMotion || !sectionRef.current || !sliderRef.current || projects.length === 0) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.project-panel')
      if (panels.length === 0) return

      // Horizontal scroll timeline with dynamic calculations to prevent sticky end dead-space
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.6, // Tighter responsiveness for native scrolling mechanics
          start: 'top top',
          end: () => `+=${sliderRef.current.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      })

      // Translate dynamically to match precise content bounds on resize
      tl.to(sliderRef.current, {
        x: () => -(sliderRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
      })

      // SplitType character reveals per panel (plays cleanly on enter instead of scrub glitches)
      const splitInstances = []
      panels.forEach((panel) => {
        const heading = panel.querySelector('.reveal-chars')
        if (!heading) return

        const split = new SplitType(heading, { types: 'chars' })
        splitInstances.push(split)

        if (split.chars && split.chars.length > 0) {
          gsap.set(split.chars, { yPercent: 120, opacity: 0 })
          gsap.to(split.chars, {
            yPercent: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: 'left 75%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      })

      // Staggered fade-in for card content (plays cleanly on enter instead of scrub glitches)
      panels.forEach((panel) => {
        const content = panel.querySelector('.panel-content')
        if (!content) return

        gsap.fromTo(
          content,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Cleanup
      return () => {
        splitInstances.forEach((s) => s.revert())
      }
    }, sectionRef)

    // Schedule recalculations to ensure pixel-perfect scroll lengths after lazy assets load
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 500)
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 1500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      ctx.revert()
    }
  }, [mounted, isReducedMotion, projects])

  if (!mounted) return null

  // Reduced-motion fallback: clean responsive card grid
  if (isReducedMotion) {
    return (
      <section id="projects" className="py-32 relative overflow-hidden" aria-label="Projects">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold text-mercury tracking-tight mb-4">
              Curated <span className="text-cyan-electric">Projects</span>
            </h2>
            <p className="text-mercury-muted max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              A showcasing of interactive solutions, combining machine learning intelligence with highly refined creative frontend designs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project) => (
              <div key={project._id} className="transition-transform duration-500 hover:-translate-y-2">
                <ProjectCard3D project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Full GSAP horizontal pinned slider
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-carbon"
      aria-label="Projects"
    >
      {/* Ambient spotlights behind the pinned section */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-700/6 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Slider container — panels sit side-by-side, translated horizontally */}
      <div
        ref={sliderRef}
        className="flex items-stretch will-change-transform"
        style={{ width: 'max-content' }}
      >
        {/* Intro panel */}
        <div className="project-panel flex-shrink-0 w-screen h-screen flex items-center justify-center px-8">
          <div className="text-center max-w-3xl">
            <h2 className="reveal-chars font-clash text-5xl sm:text-6xl lg:text-7xl font-bold text-mercury tracking-tight mb-6 overflow-hidden">
              Curated Projects
            </h2>
            <p className="text-mercury-muted text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">
              Scroll to explore interactive solutions combining machine learning intelligence with refined creative design.
            </p>
            {/* Scroll indicator */}
            <div className="mt-12 flex items-center justify-center gap-3 text-mercury-muted/60">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium">Scroll</span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>
          </div>
        </div>

        {/* Project panels */}
        {projects.map((project, i) => (
          <div
            key={project._id}
            className="project-panel flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 sm:px-16"
          >
            <div className="panel-content w-full max-w-4xl">
              {/* Panel number + title */}
              <div className="mb-8">
                <span className="text-cyan-electric/40 font-mono text-sm tracking-[0.5em] uppercase mb-3 block">
                  {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <h3 className="reveal-chars font-clash text-4xl sm:text-5xl lg:text-6xl font-bold text-mercury tracking-tight overflow-hidden">
                  {project.title}
                </h3>
              </div>

              {/* Card */}
              <div className="max-w-2xl">
                <ProjectCard3D project={project} />
              </div>
            </div>
          </div>
        ))}

        {/* Outro panel — CTA */}
        <div className="project-panel flex-shrink-0 w-screen h-screen flex items-center justify-center px-8">
          <div className="text-center max-w-2xl">
            <h3 className="reveal-chars font-clash text-4xl sm:text-5xl font-bold text-mercury tracking-tight mb-6 overflow-hidden">
              Want to see more?
            </h3>
            <p className="text-mercury-muted text-lg mb-10">
              These projects represent only a fraction of what I build. Let&apos;s connect and create something extraordinary.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 focus-ring-halo"
            >
              Get in Touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}