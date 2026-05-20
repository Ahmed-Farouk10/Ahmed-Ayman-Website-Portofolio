'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { Magnetic } from '@/components/ui/magnetic'
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetTitle } from '@/components/ui/sheet'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Detect scroll to shrink header and add opaque background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!mounted) return null

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-zinc-950/75 backdrop-blur-xl border-white/5 h-16 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-transparent h-24'
      }`}
    >
      {/* Dynamic Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 origin-[0%] z-50"
        style={{ scaleX }}
      />

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        {/* Brand Shiny Monogram Logo with Magnetic pull */}
        <Magnetic range={40} actionScale={1.1}>
          <a
            href={isHome ? "#home" : "/"}
            className="flex items-center text-2xl font-black text-white tracking-widest font-clash uppercase"
          >
            <AnimatedShinyText className="inline-block hover:brightness-125 transition-all">
              A<span className="text-cyan-400 font-extrabold">A</span>F
            </AnimatedShinyText>
          </a>
        </Magnetic>

        {/* Desktop Navbar Menu with Magnetic Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navigation.slice(0, -1).map((item) => (
            <Magnetic key={item.name} range={28} actionScale={1.05}>
              <a
                href={isHome ? item.href : `/${item.href}`}
                className="text-zinc-400 hover:text-cyan-400 transition-colors duration-300 font-semibold text-sm tracking-wide relative group px-2 py-1.5"
              >
                {item.name}
                <span className="absolute -bottom-0.5 left-2 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-[calc(100%-16px)]"></span>
              </a>
            </Magnetic>
          ))}
          <Magnetic range={35} actionScale={1.06}>
            <a
              href={isHome ? "#contact" : "/#contact"}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 px-6 rounded-full text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.45)]"
            >
              Contact Me
            </a>
          </Magnetic>
        </div>

        {/* Mobile menu Drawer using Radix Sheet overlay */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="p-2 text-zinc-400 hover:text-cyan-400 focus:outline-none"
                aria-label="Open navigation drawer"
              >
                <Menu className="w-6.5 h-6.5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-zinc-950/95 border-l border-white/5 backdrop-blur-2xl text-zinc-100 flex flex-col p-8 justify-between h-full"
            >
              <div className="flex flex-col space-y-8 mt-12">
                <SheetTitle className="text-glow-soft font-clash font-black text-xl uppercase tracking-wider text-cyan-400 border-b border-white/5 pb-4">
                  Navigation
                </SheetTitle>
                <div className="flex flex-col space-y-6">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <a
                        href={isHome ? item.href : `/${item.href}`}
                        className={`text-lg font-semibold tracking-wide py-2.5 px-4 rounded-xl transition-all duration-300 ${
                          item.name === 'Contact'
                            ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-center shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                            : 'text-zinc-300 hover:text-cyan-400 hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                      </a>
                    </SheetClose>
                  ))}
                </div>
              </div>

              {/* Extra visual metadata details in footer drawer */}
              <div className="text-center font-mono text-[10px] text-zinc-600 tracking-widest border-t border-white/5 pt-6">
                AHMED FAROUK © 2026
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}