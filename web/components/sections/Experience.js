'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, ChevronDown, ChevronUp, MapPin } from 'lucide-react'
import { Timeline } from '@/components/ui/timeline'
import { MagicCard } from '@/components/ui/magic-card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Fallback high-fidelity descriptions and keywords for Ahmed's stellar roles
const DEFAULT_EXPERIENCES = [
  {
    _id: 'lines-architecture',
    jobTitle: 'Full Stack Developer',
    company: 'Lines Architecture',
    dateRange: 'Feb 2026 - Present',
    description: 'Built and deployed the official Lines Architecture website from scratch as the sole engineer, translating UI/UX wireframes into a fully functional Next.js platform.',
    responsibilities: [
      'Built and deployed the official Lines Architecture website from scratch as the sole engineer, translating UI/UX wireframes into a fully functional, production-ready web application using Next.js.',
      'Designed and implemented custom content schemas within Sanity CMS, creating a scalable headless backend architecture that streamlined the firm’s content management workflow.',
      'Integrated RESTful and GraphQL APIs to fetch and render dynamic architectural project data, ensuring efficient state management and optimized data fetching strategies.',
      'Enforced strict responsive design principles, ensuring the visual-heavy architectural portfolio maintained aesthetic integrity and usability across desktop, tablet, and mobile platforms.',
      'Orchestrated the final deployment pipeline and currently leads ongoing technical maintenance, monitoring site performance and implementing iterative updates as needed.',
    ],
    skills: ['Next.js', 'Sanity CMS', 'GraphQL', 'RESTful APIs', 'Responsive Design', 'Vercel'],
    webUrl: 'https://www.linesarchitects.ae',
  },
  {
    _id: 'soup-agency',
    jobTitle: 'AI Solution Architect Intern',
    company: 'Soup Marketing Agency',
    dateRange: '2026 - Present',
    description: 'Designed and deployed production-grade end-to-end AI Agentic systems leveraging OpenAI, Claude, and Model Context Protocol (MCP).',
    responsibilities: [
      'Designed and deployed end-to-end AI Agentic systems leveraging OpenAI, Claude (Anthropic), MCP (Model Context Protocol), and Hermes, optimizing agent reasoning pipelines for production-grade marketing workflows.',
      'Integrated AI agentic architectures directly into full-stack web applications, bridging LLM capabilities with scalable frontend and backend systems to deliver intelligent, user-facing features.',
    ],
    skills: ['AI Agents', 'MCP', 'LLMs', 'OpenAI', 'Claude', 'Hermes', 'Full Stack'],
  },
  {
    _id: 'qworld-intern',
    jobTitle: 'Quantum Computing Intern',
    company: 'QWorld (AIU & AleQCG)',
    dateRange: 'Jun - Sep 2025',
    description: 'Researched and implemented quantum circuit depth optimizations (FFFT) and simulated fault-tolerant architectures in Qiskit.',
    responsibilities: [
      'Completed intensive Quantum Computing training under Prof. Ahmed Younes, achieving 96.7% final grade (290/300).',
      'Engineered Fermionic Fast Fourier Transforms (FFFT), reducing quantum circuit depth from O(N) to O(log N) via exponential optimization.',
      'Simulated fault-tolerant architectures using Qiskit and Python, validating resource efficiency against Jordan-Wigner transformations.',
    ],
    skills: ['Qiskit', 'FFFT', 'Python', 'Jordan-Wigner', 'Quantum Simulation'],
  },
  {
    _id: 'uneeq-intern',
    jobTitle: 'Machine Learning Developer Intern',
    company: 'Uneeq Requirements',
    dateRange: 'May 2025',
    description: 'Developed deep learning models for medical diagnosis and churn prediction, achieving high classification accuracy.',
    responsibilities: [
      'Constructed neural network churn prediction model, boosting estimated client retention by 25% through data-driven insights.',
      'Architected residual-connected deep neural network for medical diagnosis, achieving 92% classification accuracy on clinical datasets.',
      'Deployed sentiment analysis pipeline processing 10K+ Reddit/Twitter posts daily using TF-IDF and custom Neural Networks.',
    ],
    skills: ['PyTorch', 'Neural Networks', 'Churn Prediction', 'Sentiment Analysis', 'TF-IDF'],
  },
  {
    _id: 'wtm-data',
    jobTitle: 'Data Analytics Intern',
    company: 'WTM - Data & Tech in Action',
    dateRange: 'Apr - May 2025',
    description: 'Created a comprehensive LinkedIn Job Market analytics dashboard analyzing thousands of job postings with Pandas and Plotly.',
    responsibilities: [
      'Delivered an interactive LinkedIn Job Market Dashboard using Python (Pandas, Plotly), analyzing 5,000+ job postings for trend visualization and market insights.',
    ],
    skills: ['Python', 'Pandas', 'Plotly', 'Data Analytics', 'Dashboards'],
  },
  {
    _id: 'iti-intern',
    jobTitle: 'Java Development Intern',
    company: 'International Technology Institute (ITI), AIU',
    dateRange: 'Aug - Sep 2024',
    description: 'Engineered scalable Java desktop applications with optimized database management layers for rapid retrieval.',
    responsibilities: [
      'Developed a scalable desktop application with integrated backend services and database management, reducing data retrieval time by 40%.',
    ],
    skills: ['Java', 'SQL', 'Database Management', 'Desktop Systems', 'Performance Tuning'],
  },
]

export default function Experience({ experiences = [] }) {
  const [mounted, setMounted] = useState(false)
  const [openItems, setOpenItems] = useState({})
  const isReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (!mounted) return null

  // Mix standard list and fallback list to ensure clean production loading
  const timelineData = experiences.length > 0 ? experiences : DEFAULT_EXPERIENCES

  return (
    <section id="experience" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Dynamic ambient background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-12 left-12 w-[350px] h-[350px] bg-cyan-950/15 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-100 text-center mb-16 tracking-tight">
          My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Experience</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <Timeline experiences={timelineData}>
            <div className="space-y-16 pl-12 md:pl-0">
              {timelineData.map((exp, index) => {
                const isOpen = !!openItems[exp._id]
                const itemSkills = exp.skills || ['AI', 'Software Systems', 'Java', 'Python']

                return (
                  <motion.div
                    key={exp._id}
                    initial={isReducedMotion ? false : { opacity: 0, y: 35 }}
                    whileInView={isReducedMotion ? false : { opacity: 1, y: 0 }}
                    transition={isReducedMotion ? {} : { delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '-100px' }}
                    className={`flex flex-col md:items-stretch relative ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Alternate text columns */}
                    <div
                      className={`md:w-1/2 flex flex-col justify-center mb-4 md:mb-0 ${
                        index % 2 === 0
                          ? 'md:text-right md:pr-16 md:items-end'
                          : 'md:text-left md:pl-16 md:items-start'
                      }`}
                    >
                      <span className="font-mono text-xs text-cyan-400 font-bold tracking-widest flex items-center gap-1.5 mb-2 uppercase">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.dateRange || '2025 - Present'}
                      </span>
                      <h3 className="text-2xl font-black text-zinc-100 tracking-tight uppercase leading-snug">
                        {exp.jobTitle}
                      </h3>
                      <p className="text-zinc-400 font-bold text-sm tracking-wide mt-1 uppercase flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-cyan-500/80" />
                        {exp.webUrl ? (
                          <a
                            href={exp.webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-250 underline decoration-cyan-500/30 decoration-2 underline-offset-4 flex items-center gap-0.5 group/link"
                          >
                            {exp.company}
                            <span className="inline-block transition-transform duration-250 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 text-[10px]">
                              ↗
                            </span>
                          </a>
                        ) : (
                          exp.company
                        )}
                      </p>
                    </div>

                    {/* Timeline Node Point (hidden on mobile, centered on desktop) */}
                    <div className="absolute left-[-32px] md:left-1/2 md:-translate-x-1/2 top-4 z-20 flex justify-center items-center">
                      <div className="relative">
                        <div className="absolute inset-[-6px] rounded-full bg-cyan-400/25 blur-sm animate-ping" />
                        <div className="w-4 h-4 rounded-full bg-cyan-400 border-[3.5px] border-zinc-950 focus-ring-halo" />
                      </div>
                    </div>

                    {/* Content Card Wrapper */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                      <MagicCard className="w-full">
                        <Collapsible open={isOpen} onOpenChange={() => toggleItem(exp._id)}>
                          <div className="flex flex-col space-y-4">
                            {/* Short Summary Description */}
                            <p className="text-zinc-300 text-sm leading-relaxed font-semibold">
                              {exp.description || 'Achieved structural database enhancements, modular architecture flows, and high-fps diagnostics workflows.'}
                            </p>

                            {/* Tech Badges */}
                            <div className="flex flex-wrap gap-1.5">
                              {itemSkills.map((skill, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-cyan-500/10 border-cyan-500/15 text-cyan-300 hover:bg-cyan-500/20 text-[10px] tracking-wide uppercase px-2.5 py-0.5"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            {/* Bullet points container (Collapsible trigger & content) */}
                            <div className="pt-2 border-t border-white/5">
                              <CollapsibleTrigger asChild>
                                <button className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-pointer select-none">
                                  {isOpen ? (
                                    <>
                                      <span>Collapse Details</span>
                                      <ChevronUp className="w-3.5 h-3.5" />
                                    </>
                                  ) : (
                                    <>
                                      <span>Expand Achievements</span>
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    </>
                                  )}
                                </button>
                              </CollapsibleTrigger>

                              <CollapsibleContent className="mt-4 data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down overflow-hidden">
                                <ul className="space-y-3.5 text-xs text-zinc-400 font-medium leading-relaxed">
                                  {exp.responsibilities.map((resp, i) => (
                                    <li key={i} className="flex items-start gap-2.5">
                                      <span className="text-cyan-400 font-bold mt-0.5">•</span>
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CollapsibleContent>
                            </div>
                          </div>
                        </Collapsible>
                      </MagicCard>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Timeline>
        </div>
      </div>
    </section>
  )
}

