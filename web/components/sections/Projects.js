'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/client'
import { useState, useEffect } from 'react'
import { useReveal } from '@/hooks/use-reveal'

// --- This is the ProjectCard component that is actually being used ---
function ProjectCard({ project }) {
  const { title, description, mainImage, skills, demoLink, githubLink, webUrl } = project;
  
  const imgUrl = mainImage ? urlFor(mainImage)?.width(600).height(400).url() : null
  
  // Truncate description for card preview (150 chars max)
  const maxLength = 150
  const truncatedDesc = description && description.length > maxLength 
    ? description.substring(0, maxLength).trim() + '...'
    : description
  
  const hasLongDescription = description && description.length > maxLength

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
              <Link
                href={`/project/${project._id}`}
                className="w-full text-center bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 border border-blue-500/30 block"
              >
                Read More
              </Link>
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