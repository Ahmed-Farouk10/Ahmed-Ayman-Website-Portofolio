'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import { useState, useEffect, useRef } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ExternalLink, Github } from 'lucide-react'

// --- This is the ProjectCard component that is actually being used ---
function ProjectCard({ project }) {
  const { title, description, mainImage, skills, demoLink, githubLink, webUrl } = project;
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)
  
  const imgUrl = mainImage ? urlFor(mainImage)?.width(600).height(400).url() : null
  
  // Truncate description for card preview (150 chars max)
  const maxLength = 150
  const truncatedDesc = description && description.length > maxLength 
    ? description.substring(0, maxLength).trim() + '...'
    : description
  
  const hasLongDescription = description && description.length > maxLength

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const absoluteTop = window.scrollY + rect.top
      const targetScroll = Math.max(absoluteTop - window.innerHeight * 0.25, 0)
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }
  }, [isOpen])

  return (
    <>
      <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={title || 'Project Image'}
            width={600}
            height={400}
            className="w-full h-56 object-cover"
          />
        ) : (
          <div className="w-full h-56 bg-slate-700 flex items-center justify-center text-gray-500">
             No image
          </div>
        )}
        <div className="p-6 flex flex-col grow">
          <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-gray-300 mb-4 line-clamp-4 leading-relaxed whitespace-pre-line">
            {truncatedDesc}
          </p>
          
          <div className="mb-4 flex flex-wrap gap-2">
            {skills?.map((skill) => (
              <span key={skill} className="bg-blue-900/40 text-blue-200 py-1 px-3 rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col gap-2 mt-auto">
            {hasLongDescription && (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <button
                    ref={triggerRef}
                    className="w-full text-center bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 border border-blue-500/30"
                  >
                    Read More
                  </button>
                </DialogTrigger>
                
                {/* --- FIX IS HERE --- */}
                <DialogContent
                  className="translate-y-[calc(-50%+240px)] sm:translate-y-[calc(-50%+200px)] md:translate-y-[calc(-50%+160px)] lg:translate-y-[calc(-50%+120px)] xl:translate-y-[calc(-50%+1700px)] max-w-none w-[min(95vw,860px)] sm:w-[min(95vw,860px)] max-h-[90vh] bg-slate-800 border border-slate-700 p-0 grid grid-rows-[auto_1fr_auto] rounded-2xl shadow-2xl"
                >  
                  {/*//Decide the breakpoint you care about (for laptop/desktop tweak lg or xl).
                   Increase the pixel amount to push the dialog lower; decrease to raise it.
                    Example: want it much lower on desktop? change lg:translate-y-[calc(-50%+120px)] to lg:translate-y-[calc(-50%+200px)].
                     On mobile, adjust the first value (no prefix) or the sm: value.*/}
                     
                  {/* Row 1: Header (fixed) */}
                  <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-700">
                    <DialogTitle className="text-2xl font-bold text-white">{title}</DialogTitle>
                  </DialogHeader>
                  
                  {/* Row 2: Content (scrollable) */}
                  <div className="overflow-y-auto px-6 py-4">
                    <DialogDescription className="text-slate-300 leading-relaxed whitespace-pre-line mb-6">
                      {description} {/* <-- Use the raw description string */}
                    </DialogDescription>
                    
                    {imgUrl && (
                      <div className="my-4 rounded-lg overflow-hidden border border-slate-700">
                        <Image
                          src={urlFor(mainImage)?.width(800).height(450).url()}
                          alt={title || 'Project Image'}
                          width={800}
                          height={450}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    
                    {skills && skills.length > 0 && (
                      <div className="my-4">
                        <h4 className="text-white font-semibold mb-3">Skills Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span key={skill} className="bg-blue-900/40 text-blue-200 py-1 px-3 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Row 3: Footer (fixed) */}
                  <DialogFooter className="px-6 pb-6 pt-4 border-t border-slate-700 gap-3 sm:gap-4 w-full">
                    {webUrl && (
                      <a
                        href={webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 shadow-lg shadow-blue-500/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Website
                      </a>
                    )}
                    {demoLink && (
                      <a
                        href={demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 shadow-lg shadow-blue-500/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {githubLink && (
                      <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    )}
                  </DialogFooter>
                </DialogContent>
                
              </Dialog>
            )}
            
            {webUrl && (
              <a 
                href={webUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-5 rounded-lg transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              >
                Visit Website
              </a>
            )}
            {demoLink && (
              <a 
                href={demoLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-lg transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              >
                Live Demo
              </a>
            )}
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-5 rounded-lg transition-colors duration-300"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// --- This is your main Projects component ---
export default function Projects({ projects = [] }) {
  const [mounted, setMounted] = useState(false)
  const revealRef = useReveal()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/12 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div ref={revealRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-underline text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl text-center mb-12">
          My{' '}
          {/* --- TYPO FIX HERE --- */}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}