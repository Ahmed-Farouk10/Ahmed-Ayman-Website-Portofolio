'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Brain, Code, Award, GraduationCap, Server, Layers } from 'lucide-react'
import profilePicture from '@/components/Pics/Ahmed-Ayman-profile1.jpg'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { NumberTicker } from '@/components/ui/number-ticker'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export default function About() {
  const isReducedMotion = useReducedMotion()

  return (
    <section id="about" className="py-24 bg-carbon relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className={`absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-950/15 rounded-full blur-[140px] ${isReducedMotion ? '' : 'animate-pulse'}`} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-100 text-center mb-16 tracking-tight">
          About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Me</span>
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-16">
          {/* Left Column: 3D Profile Card */}
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, x: -40 }}
            whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={isReducedMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-1 flex justify-center"
          >
            <CardContainer className="w-full max-w-xs">
              <CardBody className="relative group/card bg-zinc-900/60 backdrop-blur-xl border border-white/5 p-6 rounded-3xl transition-shadow hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)]">
                <CardItem translateZ={isReducedMotion ? "0" : "60"} className="w-full">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/5] border border-cyan-500/25">
                    <Image
                      src={profilePicture}
                      alt="Ahmed Ayman Farouk"
                      priority
                      fill
                      className={`object-cover w-full h-full ${isReducedMotion ? '' : 'transition-transform duration-500 group-hover/card:scale-105'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                  </div>
                </CardItem>
                <CardItem
                  translateZ={isReducedMotion ? "0" : "40"}
                  className="mt-6 font-clash text-glow-soft font-black text-center text-xl uppercase tracking-widest text-zinc-100"
                >
                  Ahmed Ayman
                </CardItem>
                <CardItem
                  translateZ={isReducedMotion ? "0" : "30"}
                  className="text-center font-mono text-xs text-cyan-400 font-bold mt-1 tracking-wider"
                >
                  [ AI Systems Engineer ]
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* Right Column: Editorial Bio Block */}
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
            whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={isReducedMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-container backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-3xl space-y-6 text-base sm:text-lg text-zinc-300 leading-relaxed shadow-xl shadow-black/10">
              <p>
                I am an AI and Software Systems Engineer pursuing a{' '}
                <span className="text-cyan-400 font-bold">Master of Science (M.Sc.) in Artificial Intelligence</span> at AAST{' '}
                and holding a <span className="text-cyan-400 font-bold">Bachelor of Engineering (B.Eng.) in Computer Engineering</span> from{' '}
                <span className="text-cyan-400 font-bold">Alamein International University (AIU)</span>, specializing in Artificial Intelligence Engineering.
              </p>
              <p>
                My professional experience bridges high-end web architectures and advanced agentic AI. As the sole engineer at{' '}
                <span className="text-cyan-400 font-bold">Lines Architecture (Dubai Remote)</span>, I built and deployed their entire next-generation platform using Next.js and Sanity CMS. At{' '}
                <span className="text-cyan-400 font-bold">Soup Marketing Agency (Dubai Remote)</span>, I design end-to-end AI agentic systems leveraging OpenAI, Claude, and the Model Context Protocol (MCP) to automate enterprise marketing workflows.
              </p>
              <p>
                From simulating fault-tolerant quantum architectures using Qiskit at{' '}
                <span className="text-cyan-400 font-bold">QWorld</span> to programming autonomous IoT safety inspection robots and building deep medical diagnostic networks, I am driven by deep mathematical optimization and clean, high-performance systems.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid layout containing high-impact stats and spotlights */}
        <motion.div
          initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={isReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
        >
          <BentoGrid>
            {/* Stat Item 1 */}
            <BentoGridItem
              title="AI & ML Core"
              description="Deploying Deep Neural Networks, Transformer pipelines, and automated vision algorithms."
              icon={<Brain className="w-8 h-8" />}
              className="md:col-span-1"
            >
              <div className="mt-4 flex items-baseline gap-2">
                <NumberTicker value={12} className="text-4xl text-cyan-400" />
                <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Models Built</span>
              </div>
            </BentoGridItem>

            {/* Stat Item 2 */}
            <BentoGridItem
              title="Full-Stack Dev"
              description="Structuring highly parallel secure systems, RESTful microservices, and modern web interfaces."
              icon={<Code className="w-8 h-8" />}
              className="md:col-span-1"
            >
              <div className="mt-4 flex items-baseline gap-2">
                <NumberTicker value={18} className="text-4xl text-cyan-400" />
                <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Deployments</span>
              </div>
            </BentoGridItem>

            {/* Stat Item 3 */}
            <BentoGridItem
              title="System Operations"
              description="High-fps interactive web systems running automated rendering cycles."
              icon={<Server className="w-8 h-8" />}
              className="md:col-span-1"
            >
              <div className="mt-4 flex items-baseline gap-2">
                <NumberTicker value={100} className="text-4xl text-cyan-400" />
                <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">FPS Smoothness</span>
              </div>
            </BentoGridItem>

            {/* Spotlights inside grid */}
            <BentoGridItem
              title="Academic Honors & M.Sc."
              description="Pursuing M.Sc. in AI (AAST) and graduated B.Eng. with distinction (AIU). AWS Academy Graduate."
              icon={<GraduationCap className="w-8 h-8" />}
              className="md:col-span-2"
            />

            <BentoGridItem
              title="Enterprise Readiness"
              description="Experienced developing highly parallel multi-threaded database pipelines."
              icon={<Award className="w-8 h-8" />}
              className="md:col-span-1"
            />
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  )
}