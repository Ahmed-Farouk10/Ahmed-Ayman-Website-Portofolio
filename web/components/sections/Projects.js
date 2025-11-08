'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import { useState, useEffect } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { ExternalLink, Github, X } from 'lucide-react'

// --- This is the ProjectCard component that is actually being used ---
function ProjectCard({ project }) {
  const { title, description, mainImage, skills, demoLink, githubLink, webUrl } = project;
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }
  
  const imgUrl = mainImage ? urlFor(mainImage)?.width(600).height(400).url() : null
  
  // Truncate description for card preview (150 chars max)
  const maxLength = 150
  const truncatedDesc = description && description.length > maxLength 
    ? description.substring(0, maxLength).trim() + '...'
    : description
  
  const hasLongDescription = description && description.length > maxLength

  // Removed scroll lock - users can now scroll while modal is open

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
              <>
                {/* Trigger Button */}
                <button
                  onClick={toggleModal}
                  className="w-full text-center bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 border border-blue-500/30"
                >
                  Read More
                </button>

                {/* Modal Overlay */}
                {isOpen && (
                  <div 
                    onClick={(e) => {
                      // Close when clicking the overlay (not the modal content)
                      if (e.target === e.currentTarget) {
                        toggleModal()
                      }
                    }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    style={{ touchAction: 'manipulation' }}
                  >
                    {/* Modal Content */}
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="bg-slate-800 rounded-2xl shadow-2xl max-w-[95vw] sm:max-w-[90vw] md:max-w-[860px] w-full h-[90vh] max-h-[90vh] border border-slate-700 flex flex-col"
                      style={{ touchAction: 'pan-y' }}
                    >
                    {/* Header - Fixed */}
                    <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-slate-700 flex items-center justify-between flex-shrink-0 gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-white flex-1 pr-2">{title}</h2>
                      {/* Mobile: Text button, Desktop: X icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleModal()
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleModal()
                        }}
                        className="sm:hidden text-blue-400 hover:text-blue-300 active:text-blue-200 font-medium px-4 py-2 rounded-lg hover:bg-blue-500/20 active:bg-blue-500/30 min-h-[44px] flex items-center justify-center transition-colors"
                        style={{ touchAction: 'manipulation' }}
                      >
                        Close
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleModal()
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleModal()
                        }}
                        className="hidden sm:flex text-slate-400 hover:text-white active:text-white transition-colors p-2 rounded-lg hover:bg-slate-700 active:bg-slate-600 min-w-[44px] min-h-[44px] items-center justify-center"
                        aria-label="Close modal"
                        style={{ touchAction: 'manipulation' }}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Content (scrollable) - Takes remaining space */}
                    <div className="overflow-y-auto px-4 sm:px-6 py-4 flex-1 min-h-0" style={{ WebkitOverflowScrolling: 'touch', maxHeight: 'calc(90vh - 200px)' }}>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-line mb-6">
                        {description}
                      </p>
                      
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
                    
                    {/* Footer - Fixed */}
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-4 border-t border-slate-700 gap-2 sm:gap-3 md:gap-4 w-full flex flex-col sm:flex-row flex-shrink-0">
                      {webUrl && (
                        <a
                          href={webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 sm:py-2.5 px-4 sm:px-6 rounded-lg transition-colors duration-300 shadow-lg shadow-blue-500/20 min-h-[44px] sm:min-h-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm sm:text-base">Visit Website</span>
                        </a>
                      )}
                      {demoLink && (
                        <a
                          href={demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 sm:py-2.5 px-4 sm:px-6 rounded-lg transition-colors duration-300 shadow-lg shadow-blue-500/20 min-h-[44px] sm:min-h-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm sm:text-base">Live Demo</span>
                        </a>
                      )}
                      {githubLink && (
                        <a
                          href={githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 sm:py-2.5 px-4 sm:px-6 rounded-lg transition-colors duration-300 min-h-[44px] sm:min-h-0"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm sm:text-base">View Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                )}
              </>
            )}
            
            {webUrl && (
              <a 
                href={webUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-5 rounded-lg transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 min-h-[44px] flex items-center justify-center"
              >
                Visit Website
              </a>
            )}
            {demoLink && (
              <a 
                href={demoLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-lg transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 min-h-[44px] flex items-center justify-center"
              >
                Live Demo
              </a>
            )}
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-5 rounded-lg transition-colors duration-300 min-h-[44px] flex items-center justify-center"
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