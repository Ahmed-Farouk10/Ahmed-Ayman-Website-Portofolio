'use client'

import { Download, FileText, Briefcase, GraduationCap, Award } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function CV() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="cv" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/12 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-400/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl text-center mb-12">
          Download My{' '}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Resume
          </span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-900/40 rounded-lg">
                    <FileText className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Professional Resume</h3>
                    <p className="text-gray-300">
                      Comprehensive overview of my skills, experience, and achievements
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400">Experience</p>
                     {/* <p className="font-semibold text-white">3+ Years</p> */}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400">Education</p>
                      <p className="font-semibold text-white">Bachelor's</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                    <Award className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400">Projects</p>
                      <p className="font-semibold text-white">15+ Done</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="/Ahmed_Ayman_CV.pdf"
                    download
                    className="inline-flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 w-full sm:w-auto group"
                  >
                    <Download className="w-6 h-6 group-hover:animate-bounce" />
                    <span>Download CV</span>
                  </a>
                  <p className="text-sm text-gray-400 mt-3 text-center sm:text-left">
                    PDF Format • Updated November 2025
                  </p>
                </div>
              </div>

              <div className="relative hidden md:block">
                <div className="w-64 h-80 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex flex-col h-full justify-between">
                    <div className="space-y-3">
                      <div className="h-3 bg-blue-500/30 rounded w-3/4"></div>
                      <div className="h-3 bg-blue-500/20 rounded w-full"></div>
                      <div className="h-3 bg-blue-500/20 rounded w-5/6"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-cyan-400/30 rounded w-full"></div>
                      <div className="h-2 bg-cyan-400/20 rounded w-4/5"></div>
                      <div className="h-2 bg-cyan-400/20 rounded w-full"></div>
                      <div className="h-2 bg-cyan-400/20 rounded w-3/4"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-600/30 rounded w-full"></div>
                      <div className="h-2 bg-gray-600/30 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-600/30 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}