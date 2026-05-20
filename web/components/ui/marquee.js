'use client'

import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  ...props
}) {
  const isReduced = useReducedMotion()

  return (
    <div
      {...props}
      className={cn(
        "flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)]",
          isReduced
            ? "flex-row flex-wrap justify-center w-full"
            : "animate-marquee flex-row min-w-full",
          reverse && !isReduced && "animate-marquee-reverse",
          pauseOnHover && !isReduced && "hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      {!isReduced && (
        <div
          aria-hidden="true"
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row min-w-full",
            reverse && "animate-marquee-reverse",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
