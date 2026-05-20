'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/client'
import { Magnetic } from '@/components/ui/magnetic'

export default function ProjectCard3D({ project }) {
  const { title, description, mainImage, skills, demoLink, githubLink, webUrl } = project
  const [isHovered, setIsHovered] = useState(false)
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)
  const cardRef = useRef(null)

  // Magnetic animations handled natively via <Magnetic> component wrapper

  const imgUrl = mainImage ? urlFor(mainImage)?.width(600).height(400).url() : null

  const maxLength = 150
  const truncatedDesc = description && description.length > maxLength
    ? description.substring(0, maxLength).trim() + '...'
    : description

  const hasLongDescription = description && description.length > maxLength

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = ((y - centerY) / centerY) * 12
    const rotateY = ((centerX - x) / centerX) * 12

    setTiltX(rotateX)
    setTiltY(rotateY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTiltX(0)
    setTiltY(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      animate={{
        rotateX: tiltX,
        rotateY: tiltY,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 40,
      }}
      className="h-full"
    >
      <div className="glass-container rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 border border-white/5 hover:border-cyan-500/30">
        {/* Image Container with high-end linear mask overlays */}
        <div className="relative h-56 overflow-hidden bg-zinc-900/40">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent z-10 pointer-events-none" />
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={title || 'Project Image'}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              }}
            />
          ) : (
            <div className="w-full h-full bg-zinc-900/50 flex items-center justify-center text-zinc-600 font-medium">
              No image preview
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col grow">
          <h3 className="text-2xl font-bold mb-3 text-zinc-100 tracking-tight">{title}</h3>
          <p className="text-zinc-300 mb-5 line-clamp-4 leading-relaxed whitespace-pre-line text-sm opacity-90">
            {truncatedDesc}
          </p>

          {/* Skills Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {skills?.map((skill) => (
              <span
                key={skill}
                className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 py-1 px-3 rounded-full text-xs font-medium border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-cyan-500/20 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Action Buttons with Spring-based Magnetic Snapping followers */}
          <div className="flex flex-col gap-3 mt-auto">
            {hasLongDescription && (
              <Magnetic range={40} actionScale={1.03}>
                <Link
                  href={`/project/${project._id}`}
                  className="w-full text-center py-2.5 px-4 rounded-lg transition-all duration-300 min-h-[44px] flex items-center justify-center font-semibold border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/50 focus-ring-halo magnetic-target"
                  aria-label={`Read more about the ${title} project`}
                >
                  Read More
                </Link>
              </Magnetic>
            )}

            {webUrl && (
              <Magnetic range={40} actionScale={1.03}>
                <a
                  href={webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 px-5 rounded-lg transition-all duration-300 min-h-[44px] flex items-center justify-center font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-400 focus-ring-halo magnetic-target"
                  aria-label={`Visit the live website of ${title}`}
                >
                  Visit Website
                </a>
              </Magnetic>
            )}

            {demoLink && (
              <Magnetic range={40} actionScale={1.03}>
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 px-5 rounded-lg transition-all duration-300 min-h-[44px] flex items-center justify-center font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:from-blue-400 hover:to-cyan-400 focus-ring-halo magnetic-target"
                  aria-label={`View the live demo of ${title}`}
                >
                  Live Demo
                </a>
              </Magnetic>
            )}

            {githubLink && (
              <Magnetic range={40} actionScale={1.03}>
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 px-5 rounded-lg transition-all duration-300 min-h-[44px] flex items-center justify-center font-bold bg-zinc-900/60 text-zinc-200 border border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700 focus-ring-halo magnetic-target"
                  aria-label={`View source code of ${title} on GitHub`}
                >
                  View Code
                </a>
              </Magnetic>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
