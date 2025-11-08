"use client"
import { useState, useEffect } from 'react'
import { useReveal } from '@/hooks/use-reveal'

function SkillTag({ skill }) {
  return (
    <span className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-blue-300 py-3 px-5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 cursor-default">
      {skill.name}
    </span>
  )
}

export default function Skills({ skills = [] }) {
  const [mounted, setMounted] = useState(false)
  const revealRef = useReveal()
  const programmingLanguages = skills.filter(s => s.category === 'languages');
  const toolsAndFrameworks = skills.filter(s => s.category === 'frameworks');

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-400/12 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div ref={revealRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-underline text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl text-center mb-12">
          Technical{' '}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold text-white text-center mb-8">
              Programming Languages
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {programmingLanguages.map((skill) => (
                <SkillTag key={skill._id} skill={skill} />
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold text-white text-center mb-8">
              Tools & Frameworks
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {toolsAndFrameworks.map((skill) => (
                <SkillTag key={skill._id} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}