'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Sparkles, MessageSquare } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Greetings. I am Ahmed's virtual systems agent. What technical specifications or portfolio details would you like to query?" }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const isReduced = useReducedMotion()

  const starterChips = [
    { label: 'Explore AI/ML projects', text: 'Tell me about your computer vision and AI/ML work' },
    { label: 'Technical skillset', text: 'What programming languages and frameworks do you use?' },
    { label: 'Employment availability', text: 'Are you available for full-time or freelance hire?' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: isReduced ? 'auto' : 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async (textToSend) => {
    const userText = textToSend || input
    if (!userText.trim()) return

    const newMessages = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    if (!textToSend) setInput('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })

      const data = await res.json()
      if (res.ok && data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'System offline. Please establish fallback manual connection via mail.' }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection timed out. Network status check failed.' }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-trigger"
            onClick={() => setIsOpen(true)}
            initial={isReduced ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            className="flex items-center justify-center p-4 bg-gradient-to-br from-cyan-500 to-blue-600 border border-cyan-400/25 rounded-full shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all text-zinc-950 focus-ring-halo cursor-pointer"
            aria-label="Open systems AI agent assistant panel"
          >
            <Bot className="w-6 h-6 text-zinc-950" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat drawer panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-drawer"
            initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={isReduced ? { opacity: 0 } : { opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="w-[340px] sm:w-[380px] h-[520px] bg-carbon border border-white/8 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header banner */}
            <div className="bg-carbon-light border-b border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="relative">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse absolute -top-0.5 -right-0.5" />
                  <Bot className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-clash text-sm font-bold text-mercury uppercase tracking-tight">Systems Agent</h4>
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider">ONLINE // SECURE</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-cyan-400 transition-colors p-1 rounded cursor-pointer"
                aria-label="Close systems AI agent assistant panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages scrolling content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2.5 text-xs leading-relaxed border ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-300'
                        : 'bg-carbon-lighter border-white/5 text-mercury-muted'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-carbon-lighter border border-white/5 rounded-xl px-4 py-2.5 text-xs text-zinc-500 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                    <span>Processing telemetry...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips & inputs panel */}
            <div className="p-4 border-t border-white/5 bg-carbon-light space-y-4">
              {/* Show starter chips only if user has not interacted */}
              {messages.length === 1 && !isTyping && (
                <div className="flex flex-col gap-2">
                  {starterChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip.text)}
                      className="text-left w-full text-[10px] font-mono border border-white/5 bg-carbon/50 hover:bg-carbon hover:border-cyan-500/30 text-mercury-muted hover:text-cyan-electric p-2 rounded-lg transition-all focus-ring-halo cursor-pointer no-underline flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3 h-3 text-cyan-500" />
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage() }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask agent about portfolio..."
                  className="flex-1 bg-carbon border border-white/8 text-mercury px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 font-satoshi text-xs focus-ring-halo"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 bg-cyan-500/15 border border-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/25 disabled:opacity-40 disabled:hover:bg-cyan-500/15 transition-all focus-ring-halo cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
