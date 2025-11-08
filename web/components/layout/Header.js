'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Run effects only on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Detect scroll to shrink header and add opaque background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg h-16' : 'bg-transparent h-20'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        <a href="#home" className="text-3xl font-extrabold text-white tracking-tighter hover:scale-110 transition-transform">
          A<span className="text-blue-400">A</span>F
        </a>

        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navigation.slice(0, -1).map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-blue-300 transition-colors duration-300 font-medium relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Contact Me
          </a>
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-cyan-400 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg absolute w-full shadow-xl rounded-b-lg border-t border-slate-700">
          <div className="flex flex-col space-y-4 p-5">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className={`text-gray-300 hover:bg-slate-800 p-3 rounded-lg text-center font-medium transition-colors duration-300 ${
                  item.name === 'Contact'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : ''
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}