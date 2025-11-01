// web/app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import { Github, Linkedin, Mail } from 'lucide-react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Ahmed Ayman Farouk | AI & Software Engineer',
  description: 'AI & Software Engineer specializing in Machine Learning and Full-Stack Web Development.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        
        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md shadow-lg">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            <a href="#home" className="text-3xl font-extrabold text-white tracking-tighter">
              A<span className="text-indigo-400">A</span>F
            </a>
            <div className="hidden md:flex space-x-8 text-white">
              <a href="#about" className="hover:text-indigo-300">About</a>
              <a href="#skills" className="hover:text-indigo-300">Skills</a>
              <a href="#experience" className="hover:text-indigo-300">Experience</a>
              <a href="#projects" className="hover:text-indigo-300">Projects</a>
              <a href="#contact" className="hover:text-indigo-300">Contact</a>
            </div>
          </nav>
        </header>

        {/* PAGE CONTENT */}
        {children}

        {/* FOOTER */}
        <footer className="bg-slate-900 border-t border-slate-700 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
            <div className="flex justify-center space-x-8 mb-6">
              <a href="https://github.com/Ahmed-Farouk10" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                <Github className="w-8 h-8" />
              </a>
              <a href="https://linkedin.com/in/ahmed-ayman-920975317" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                <Linkedin className="w-8 h-8" />
              </a>
              <a href="mailto:ahmed.aafmms@gmail.com" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                <Mail className="w-8 h-8" />
              </a>
            </div>
            <p>&copy; {new Date().getFullYear()} Ahmed Ayman Farouk. All rights reserved.</p>
          </div>
        </footer>

      </body>
    </html>
  )
}