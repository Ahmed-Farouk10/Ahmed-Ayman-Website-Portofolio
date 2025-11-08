'use client'

import { useState, useEffect } from 'react'
import { Toaster as Sonner } from 'sonner'

const Toaster = ({ ...props }) => {
  // Simple theme detection since next-themes might not be set up yet
  const [theme, setTheme] = useState('dark')
  
  useEffect(() => {
    // Set default to dark theme
    setTheme('dark')
  }, [])

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-slate-900 group-[.toaster]:text-white group-[.toaster]:border-slate-700 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-gray-400',
          actionButton:
            'group-[.toast]:bg-blue-500 group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-slate-700 group-[.toast]:text-gray-300',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }