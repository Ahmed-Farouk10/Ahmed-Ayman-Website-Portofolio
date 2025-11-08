'use client'

import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/Ahmed-Farouk10"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 hover:bg-blue-500/20 rounded-full text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-ayman10"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 hover:bg-blue-500/20 rounded-full text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:ahmed.aafmms@gmail.com"
              className="p-3 bg-slate-800 hover:bg-blue-500/20 rounded-full text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="flex items-center space-x-2 text-gray-400">
            <span>&copy; {currentYear} Ahmed Ayman Farouk</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>and Next.js</span>
            </span>
          </div>

          <p className="text-sm text-gray-400 text-center max-w-md">
            AI & Software Engineer passionate about building intelligent applications and solving real-world problems
          </p>
        </div>
      </div>
    </footer>
  )
}