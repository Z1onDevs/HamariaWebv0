import { useState, useEffect, useRef } from "react"

interface VigorousRevealOptions {
  threshold?: number
  once?: boolean
}

export function useVigorousReveal(options: VigorousRevealOptions = {}) {
  const { threshold = 0.2, once = false } = options
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const elementRef = useRef<HTMLElement | null>(null)
  const hasBeenVisible = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Check if element is in viewport
      const inViewport = rect.top < windowHeight * (1 - threshold) && rect.bottom > windowHeight * threshold
      
      if (inViewport) {
        if (!once || !hasBeenVisible.current) {
          setIsVisible(true)
          hasBeenVisible.current = true
        }
        
        // Calculate scroll progress through element (0 to 1)
        const elementHeight = rect.height
        const progress = Math.max(0, Math.min(1, 
          (windowHeight - rect.top) / (windowHeight + elementHeight)
        ))
        setScrollProgress(progress)
      } else if (!once) {
        setIsVisible(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold, once])

  return { ref: elementRef, isVisible, scrollProgress }
}

