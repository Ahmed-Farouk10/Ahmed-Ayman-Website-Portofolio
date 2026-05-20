'use client'

import React from 'react'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { Marquee } from '@/components/ui/marquee'
import { Globe } from '@/components/ui/globe'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-carbon-light border-t border-white/5 py-16 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Giant High-Impact Text Marquee Background Layer */}
      <div className="absolute top-4 left-0 w-full opacity-5 pointer-events-none select-none">
        <Marquee className="py-2" speed="slow">
          <span className="font-clash text-7xl sm:text-8xl font-black uppercase tracking-widest text-mercury mx-4">
            Ahmed Ayman Farouk • AI Systems Architect • Full-Stack Engineer • Deep Learning • Systems Optimization •
          </span>
        </Marquee>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-10">
          
          {/* Rotating Dynamic 3D Canvas Globe Centerpiece */}
          <div className="w-full flex justify-center">
            <Globe />
          </div>

          {/* Social Network Anchors */}
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/Ahmed-Farouk10"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-carbon hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-full text-mercury-muted hover:text-cyan-electric transition-all duration-300 transform hover:scale-110 focus-ring-halo"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-ayman10"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-carbon hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-full text-mercury-muted hover:text-cyan-electric transition-all duration-300 transform hover:scale-110 focus-ring-halo"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:ahmed.aafmms@gmail.com"
              className="p-3 bg-carbon hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-full text-mercury-muted hover:text-cyan-electric transition-all duration-300 transform hover:scale-110 focus-ring-halo"
              aria-label="Email Transmission"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright, Built Tools & Info Details */}
          <div className="flex flex-col items-center space-y-4 pt-4 border-t border-white/5 w-full max-w-xl text-center">
            <div className="flex flex-wrap justify-center items-center gap-2 text-xs font-mono tracking-wider text-mercury-muted/60 uppercase">
              <span>&copy; {currentYear} Ahmed Ayman Farouk</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center space-x-1">
                <span>Handcrafted with</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/80 animate-pulse" />
                <span>using Next.js</span>
              </span>
            </div>

            <p className="text-xs text-mercury-muted/50 leading-relaxed max-w-md">
              AI Engineer & Software Specialist dedicated to architecting high-performance parallel computing solutions, deep neural network interfaces, and secure full-stack web monoliths.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}