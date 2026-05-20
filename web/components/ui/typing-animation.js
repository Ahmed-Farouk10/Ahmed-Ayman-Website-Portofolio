'use client'

import { useEffect, useState } from 'react'

export function TypingAnimation({
  words = ['AI Engineer', 'Software Engineer', 'Machine Learning Specialist'],
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 2000,
  className = '',
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timer

    const handleTyping = () => {
      const fullWord = words[currentWordIndex]

      if (!isDeleting) {
        // Typing letters
        setCurrentText((prev) => fullWord.substring(0, prev.length + 1))

        if (currentText === fullWord) {
          // Pause when word is finished typing
          timer = setTimeout(() => setIsDeleting(true), pauseDuration)
          return
        }
        
        timer = setTimeout(handleTyping, typingSpeed)
      } else {
        // Deleting letters
        setCurrentText((prev) => fullWord.substring(0, prev.length - 1))

        if (currentText === '') {
          setIsDeleting(false)
          // Cycle to next word
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
          timer = setTimeout(handleTyping, 500)
          return
        }

        timer = setTimeout(handleTyping, deletingSpeed)
      }
    }

    timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={`inline-flex items-center text-glow-soft font-semibold text-cyan-400 ${className}`}>
      {currentText}
      <span className="ml-1 w-1.5 h-6 bg-cyan-400 animate-pulse" style={{ animationDuration: '0.8s' }} />
    </span>
  )
}
