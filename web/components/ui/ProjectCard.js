'use client'

import React from 'react'
import { ExternalLink, Github } from 'lucide-react'

export default function ProjectCard({
  title,
  description,
  image,
  skills,
  demoLink,
  codeLink
}) {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20 group">
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex flex-col grow">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-gray-300 mb-6 flex-grow">{description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-900/40 text-cyan-200 py-1 px-3 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex space-x-4 mt-auto">
          <a
            href={demoLink}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-lg transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>
          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-5 rounded-lg transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>
        </div>
      </div>
    </div>
  )
}