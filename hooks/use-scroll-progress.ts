import { useState, useEffect, useRef } from "react"

interface ScrollProgressOptions {
  offset?: number
  smooth?: boolean
}

export function useScrollProgress(options: ScrollProgressOptions = {}) {
  const { offset = 0, smooth = true } = options
  const [progress, setProgress] = useState(0)
  const elementRef = useRef<HTMLElement | null>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    const updateProgress = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height

      // Calculate progress from 0 to 1 as element scrolls through viewport
      const start = windowHeight - offset
      const end = -elementHeight + offset
      const distance = start - end
      const current = start - rect.top
      
      const rawProgress = Math.max(0, Math.min(1, current / distance))
      
      if (smooth) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
        rafRef.current = requestAnimationFrame(() => {
          setProgress(rawProgress)
        })
      } else {
        setProgress(rawProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [offset, smooth])

  return { ref: elementRef, progress }
}


