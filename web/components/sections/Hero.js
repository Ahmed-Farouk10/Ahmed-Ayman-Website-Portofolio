'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'
import { Sparkles, Terminal } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { ShimmerButton } from '@/components/ui/shimmer-button'

export default function Hero() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaContainerRef = useRef(null)
  const sparklesRef = useRef(null)
  const timelineRef = useRef(null)

  // Check for prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsReducedMotion(prefersReducedMotion)

    const handleChange = (e) => setIsReducedMotion(e.matches)
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', handleChange)
    return () => window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', handleChange)
  }, [])

  // GSAP Stagger Animation Timeline
  useEffect(() => {
    if (isReducedMotion) {
      if (headingRef.current) headingRef.current.style.opacity = '1'
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1'
      if (ctaContainerRef.current) ctaContainerRef.current.style.opacity = '1'
      if (sparklesRef.current) sparklesRef.current.style.opacity = '1'
      return
    }

    // Split text into characters for premium reveal
    let splitHeading
    if (headingRef.current) {
      splitHeading = new SplitType(headingRef.current, {
        types: 'chars',
        tagName: 'span',
      })

      // Add wrapper styling to each character to clip it
      if (splitHeading.chars) {
        splitHeading.chars.forEach((char) => {
          char.style.display = 'inline-block'
          char.style.transform = 'translateY(110%)'
          char.style.opacity = '0'
          char.style.willChange = 'transform, opacity'
        })
      }
    }

    // Create stagger timeline
    const timeline = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.2 },
    })

    timeline
      // Animate sparkles icon
      .fromTo(
        sparklesRef.current,
        { opacity: 0, scale: 0.6, y: -40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
      )
      // Stagger char elements
      .to(
        splitHeading?.chars || [],
        {
          opacity: 1,
          y: '0%',
          stagger: 0.03,
          duration: 1.0,
          ease: 'power4.out',
        },
        '-=0.5'
      )
      // Animate subtitle
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      // Animate CTA buttons container
      .fromTo(
        ctaContainerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )

    timelineRef.current = timeline

    return () => {
      if (timelineRef.current) timelineRef.current.kill()
      if (splitHeading) splitHeading.revert()
    }
  }, [isReducedMotion])

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 px-4 overflow-hidden"
    >
      {/* Premium Aceternity SVG Spotlight */}
      <Spotlight />

      {/* Floating terminal design details */}
      <div className="absolute top-12 left-12 opacity-5 hidden lg:flex items-center gap-3 text-cyan-400 font-mono text-xs select-none">
        <Terminal className="w-5 h-5 animate-pulse" />
        <span>SYS_INIT: READY_STATE_OK</span>
      </div>

      {/* Hero Content Card */}
      <div className="text-center max-w-4xl z-10 relative glass-container rounded-3xl px-6 sm:px-12 py-12 sm:py-16 mx-4 backdrop-blur-md border border-white/5 shadow-2xl shadow-cyan-950/10">
        {/* Sparkles Icon Container */}
        <div ref={sparklesRef} className="mb-8 flex justify-center opacity-0">
          <div className="relative">
            <div
              className={`absolute inset-[-12px] rounded-full bg-cyan-500/10 blur-2xl ${
                isReducedMotion ? '' : 'animate-pulse'
              }`}
            ></div>
            <div className="relative p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/15">
              <Sparkles className="w-10 h-10 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Main Heading with Vertical Character Reveal Mask */}
        <h1
          ref={headingRef}
          className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 text-zinc-100 text-glow-soft tracking-tight uppercase overflow-hidden"
          style={{ lineHeight: 1.15 }}
        >
          I engineer{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            intelligence
          </span>
        </h1>

        {/* Dynamic Interactive Subtitle */}
        <div
          ref={subtitleRef}
          className="text-lg sm:text-2xl text-zinc-300 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 min-h-[64px]"
        >
          Specialized{' '}
          <TypingAnimation
            words={['AI & Machine Learning Engineer', 'Software Systems Architect', 'Full-Stack Developer']}
            className="font-extrabold text-cyan-electric tracking-tight text-glow-soft"
          />{' '}
          architecting highly parallel systems, neural networks, and secure, hyper-fluid web monoliths.
        </div>

        {/* Premium CTA Buttons */}
        <div
          ref={ctaContainerRef}
          className="flex flex-col sm:flex-row justify-center items-center gap-5 opacity-0"
        >
          <ShimmerButton
            href="#projects"
            shimmerColor="#00f0ff"
            className="w-full sm:w-auto"
          >
            <span>Explore Architecture</span>
          </ShimmerButton>
          <ShimmerButton
            href="#contact"
            shimmerColor="#3b82f6"
            background="rgba(15, 23, 42, 0.5)"
            className="w-full sm:w-auto"
          >
            <span>Establish Connection</span>
          </ShimmerButton>
        </div>
      </div>

      {/* Background Spotlight Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/12 rounded-full blur-3xl ${
            isReducedMotion ? '' : 'animate-pulse'
          }`}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-700/10 rounded-full blur-3xl ${
            isReducedMotion ? '' : 'animate-pulse'
          }`}
          style={isReducedMotion ? {} : { animationDelay: '2s' }}
        ></div>
      </div>
    </section>
  )
}
