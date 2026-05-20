'use client'

import React from 'react'

export function BentoGrid({ children, className = '' }) {
  return (
    <div className={`grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  )
}

export function BentoGridItem({
  children,
  className = '',
  title,
  description,
  header,
  icon,
  ...props
}) {
  return (
    <div
      className={`
        row-span-1 rounded-3xl glass-container backdrop-blur-xl border border-white/5 p-6 
        justify-between flex flex-col space-y-4 hover:shadow-2xl hover:shadow-cyan-500/5 
        transition-all duration-300 hover:border-cyan-500/20 group/bento cursor-pointer
        ${className}
      `}
      {...props}
    >
      {header && <div className="grow">{header}</div>}
      <div className="group-hover/bento:translate-x-1 transition-transform duration-300">
        {icon && <div className="mb-2 text-cyan-400">{icon}</div>}
        {title && (
          <div className="font-bold text-zinc-100 mb-1 tracking-tight text-lg">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm text-zinc-400 font-medium leading-relaxed opacity-95">
            {description}
          </div>
        )}
      </div>
      {children && <div className="z-10">{children}</div>}
    </div>
  )
}
