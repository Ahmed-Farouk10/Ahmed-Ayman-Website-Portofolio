'use client'

import { useState } from 'react'
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { Dock, DockIcon } from '@/components/ui/dock'
import { toast } from 'sonner'

export default function Contact() {
  const revealRef = useReveal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Real-time client-side checks
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill out all fields before transmitting.')
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Signal transmitted successfully!', {
          description: 'Your message has been registered in the development console.'
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error(data.error || 'Transmission failed. Please try again.')
      }
    } catch {
      toast.error('Network error. Failed to establish connection with server.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-carbon relative overflow-hidden">
      {/* Editorial ambient gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div ref={revealRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold text-mercury text-center mb-4 tracking-tight">
          Get In <span className="text-cyan-electric">Touch</span>
        </h2>
        <p className="text-center text-md text-mercury-muted max-w-xl mx-auto mb-16 opacity-80 leading-relaxed">
          I am currently available for freelance systems engineering and open to innovative team collaborations. Reach out to coordinate.
        </p>

        <div className="max-w-5xl mx-auto">
          <BackgroundGradient className="bg-carbon-light border border-white/5 p-8 sm:p-12 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              
              {/* Direct Info Section */}
              <div className="flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <h3 className="font-clash text-2xl sm:text-3xl font-bold text-mercury uppercase tracking-tight">
                    Direct Connections
                  </h3>
                  <p className="text-sm text-mercury-muted leading-relaxed max-w-md">
                    Fill out the automated transmission form, or trigger direct channels via email, phone, or secure networks.
                  </p>

                  <div className="space-y-4 pt-4">
                    <a
                      href="mailto:ahmed.aafmms@gmail.com"
                      className="flex items-center space-x-3 group focus-ring-halo rounded p-2 border border-white/5 bg-carbon/50 hover:bg-carbon-lighter hover:border-cyan-500/30 transition-all text-mercury hover:text-cyan-electric no-underline"
                    >
                      <div className="p-2.5 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-semibold tracking-tight">ahmed.aafmms@gmail.com</span>
                    </a>

                    <a
                      href="tel:+201021297500"
                      className="flex items-center space-x-3 group focus-ring-halo rounded p-2 border border-white/5 bg-carbon/50 hover:bg-carbon-lighter hover:border-cyan-500/30 transition-all text-mercury hover:text-cyan-electric no-underline"
                    >
                      <div className="p-2.5 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-semibold tracking-tight">+20 102 129 7500</span>
                    </a>
                  </div>
                </div>

                {/* macOS Magnifying Social Dock */}
                <div className="pt-8 border-t border-white/5 flex flex-col items-center md:items-start gap-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-mercury-muted/65">
                    Authorized Networks
                  </span>
                  <Dock className="w-full justify-center md:justify-start">
                    <DockIcon onClick={() => window.open('https://github.com/Ahmed-Farouk10', '_blank')}>
                      <Github className="w-5 h-5 text-mercury" />
                    </DockIcon>
                    <DockIcon onClick={() => window.open('https://www.linkedin.com/in/ahmed-ayman10', '_blank')}>
                      <Linkedin className="w-5 h-5 text-cyan-400" />
                    </DockIcon>
                    <DockIcon onClick={() => window.location.href = 'mailto:ahmed.aafmms@gmail.com'}>
                      <Mail className="w-5 h-5 text-blue-400" />
                    </DockIcon>
                    <DockIcon onClick={() => window.location.href = 'tel:+201021297500'}>
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </DockIcon>
                  </Dock>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="bg-carbon/40 border border-white/5 rounded-xl p-6 sm:p-8 backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-mercury mb-2">
                      Operator Identity
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                      className="w-full bg-carbon-lighter/75 border border-white/8 text-mercury px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-satoshi text-sm focus-ring-halo placeholder-white/20"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-mercury mb-2">
                      Return Channel (Email)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. operator@network.com"
                      required
                      className="w-full bg-carbon-lighter/75 border border-white/8 text-mercury px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-satoshi text-sm focus-ring-halo placeholder-white/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-mercury mb-2">
                      Transmission Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. System Integration Query"
                      required
                      className="w-full bg-carbon-lighter/75 border border-white/8 text-mercury px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-satoshi text-sm focus-ring-halo placeholder-white/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-mercury mb-2">
                      Payload Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your transmission payload here..."
                      required
                      className="w-full bg-carbon-lighter/75 border border-white/8 text-mercury px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-satoshi text-sm focus-ring-halo placeholder-white/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-cyan-600 disabled:to-blue-700 disabled:cursor-not-allowed text-carbon font-bold py-3.5 px-6 rounded-lg text-sm transition-all duration-300 transform active:scale-95 disabled:active:scale-100 shadow-md shadow-cyan-500/10 min-h-[44px] flex items-center justify-center space-x-2 group focus-ring-halo select-none uppercase tracking-wider"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Transmit Signal'}</span>
                    {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform text-carbon" />}
                  </button>
                </form>
              </div>

            </div>
          </BackgroundGradient>
        </div>
      </div>
    </section>
  )
}