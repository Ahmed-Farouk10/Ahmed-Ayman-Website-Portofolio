'use client'

import { useState } from 'react'
import { Mail, Phone, Linkedin, Github, Send, Heart } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'

export default function Contact() {
  const revealRef = useReveal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showMessage, setShowMessage] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setShowMessage(true)
    setFormData({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setShowMessage(false), 5000)
  }

  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/12 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-400/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div ref={revealRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-underline text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl text-center mb-12">
          Get In{' '}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>
        <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto mb-16">
          I&apos;m currently available for freelance work and open to new opportunities. Feel free to send me a message!
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <div className="space-y-6 text-gray-300">
            <h3 className="text-2xl font-semibold text-white">Contact Information</h3>
            <p>Fill out the form, or reach out to me directly via email or social media.</p>

            <a href="mailto:ahmed.aafmms@gmail.com" className="flex items-center space-x-3 group transition-all hover:translate-x-2">
              <div className="p-2 bg-blue-900/40 rounded-lg group-hover:bg-blue-800/40 transition-colors">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <span className="group-hover:text-blue-300 transition-colors">ahmed.aafmms@gmail.com</span>
            </a>

            <a href="tel:+201021297500" className="flex items-center space-x-3 group transition-all hover:translate-x-2">
              <div className="p-2 bg-blue-900/40 rounded-lg group-hover:bg-blue-800/40 transition-colors">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <span className="group-hover:text-blue-300 transition-colors">+20 102 129 7500</span>
            </a>

            <a href="https://www.linkedin.com/in/ahmed-ayman10" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group transition-all hover:translate-x-2">
                <div className="p-2 bg-blue-900/40 rounded-lg group-hover:bg-blue-800/40 transition-colors">
                <Linkedin className="w-6 h-6 text-blue-400" />
              </div>
              <span className="group-hover:text-blue-300 transition-colors">LinkedIn Profile</span>
            </a>

            <a href="https://github.com/Ahmed-Farouk10" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group transition-all hover:translate-x-2">
              <div className="p-2 bg-blue-900/40 rounded-lg group-hover:bg-blue-800/40 transition-colors">
                <Github className="w-6 h-6 text-blue-400" />
              </div>
              <span className="group-hover:text-blue-300 transition-colors">GitHub Profile</span>
            </a>
          </div>

              <div>
            {showMessage && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-500 text-green-300 rounded-lg">
                Thank you for your message! I&apos;ll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2 group"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}