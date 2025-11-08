"use client"
import { useReveal } from '@/hooks/use-reveal'

export default function Experience({ experiences = [] }) {
  const revealRef = useReveal()
  return (
    <section id="experience" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-400/12 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div ref={revealRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-underline text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl text-center mb-12">
          My{' '}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-blue-500/20 rounded-full hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp._id}
                className={`flex flex-col md:items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse md:space-x-reverse'
                }`}
              >
                <div className={`md:w-1/2 mb-4 md:mb-0 ${
                  index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                }`}>
                  <h3 className="text-2xl font-bold text-white">{exp.jobTitle}</h3>
                  <p className="text-blue-300 font-medium">{exp.company}</p>
                  <p className="text-gray-400 text-sm">{exp.dateRange}</p>
                </div>
                <div className={`md:w-1/2 relative ${
                  index % 2 === 0 
                    ? 'md:pl-8 md:border-l-4' 
                    : 'md:pr-8 md:text-right md:border-r-4'
                } border-blue-500`}>
                  <span className={`absolute top-2 w-5 h-5 bg-blue-500 rounded-full border-4 border-slate-900 hidden md:block ${
                    index % 2 === 0 ? '-left-3' : '-right-3'
                  }`}></span>
                  <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
                    <ul className={`list-disc list-inside text-gray-300 space-y-2 ${
                      index % 2 !== 0 ? 'text-left md:text-right' : 'text-left'
                    }`}>
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}