'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

export default function Hero() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setStars(generatedStars)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      <div className="text-center max-w-4xl z-10 relative hero-card rounded-3xl px-6 sm:px-10 py-10 sm:py-12 mx-4">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-3xl animate-pulse"></div>
            <Sparkles className="w-20 h-20 text-blue-400 relative z-10 animate-bounce" />
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-6 text-white animate-fade-in text-glow-soft tracking-tight">
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent">
            Ahmed Ayman
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-300/95 mb-10 max-w-2xl mx-auto animate-fade-in delay-200">
          An <span className="text-blue-400 font-semibold">AI & Software Engineer</span> specializing in Machine Learning and Full-Stack Web Development. I build intelligent applications and user-friendly experiences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-300">
          <a
            href="#projects"
            className="btn-primary-gradient text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 relative overflow-hidden group"
          >
            <span className="relative z-10">View My Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          </a>
          <a
            href="mailto:ahmed.aafmms@gmail.com"
            className="border border-blue-500/40 bg-slate-800/60 hover:bg-slate-800 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Email Me
          </a>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/12 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  )
}