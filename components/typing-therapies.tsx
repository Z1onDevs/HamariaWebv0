"use client"

import { useState, useEffect } from "react"

interface TypingTherapiesProps {
  therapies: string[]
  color: string
  isActive: boolean
  categoryId?: string
}

export function TypingTherapies({ 
  therapies, 
  color, 
  isActive,
  categoryId = "wellness"
}: TypingTherapiesProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [cursorScale, setCursorScale] = useState(1)

  // Breathing cursor animation
  useEffect(() => {
    if (!isActive) return

    const breatheInterval = setInterval(() => {
      setCursorScale(prev => {
        // Smooth breathing: 1 → 0.9 → 1
        const direction = prev > 0.95 ? -1 : prev < 0.9 ? 1 : (Math.random() > 0.5 ? 1 : -1)
        return prev + (direction * 0.02)
      })
    }, 50)

    return () => clearInterval(breatheInterval)
  }, [isActive])

  // Main typing animation
  useEffect(() => {
    if (!isActive || therapies.length === 0) {
      setDisplayText("")
      return
    }

    let timeout: NodeJS.Timeout

    if (isTyping) {
      // Typing phase - show 2 therapies at a time to prevent wrapping
      const startIdx = currentIndex % therapies.length
      const therapiesToShow = []
      
      for (let i = 0; i < 2 && therapiesToShow.length < 2; i++) {
        const idx = (startIdx + i) % therapies.length
        if (therapies[idx]) {
          therapiesToShow.push(therapies[idx])
        }
      }
      
      const targetText = therapiesToShow.join(" • ")
      
      if (displayText.length < targetText.length) {
        // Variable typing speed - slower at word boundaries
        const currentChar = targetText[displayText.length]
        const isWordBoundary = currentChar === ' ' || currentChar === '•'
        const typingSpeed = isWordBoundary ? 60 : 35

        timeout = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1))
        }, typingSpeed)
      } else {
        // Finished typing, wait before fading out
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 3000) // Display time (increased from 2500ms)
      }
    } else {
      // Fade/erase phase - faster than typing
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 15) // Faster erasing
      } else {
        // Finished erasing, move to next batch (advance by 2)
        setCurrentIndex((prev) => (prev + 2) % therapies.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isTyping, isActive, therapies, currentIndex])

  if (!isActive) {
    return null
  }

  // Convert hex color to rgba for better compatibility
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <div 
      className="group relative min-h-[2rem] w-full overflow-hidden rounded-lg backdrop-blur-sm transition-all duration-500 sm:min-h-[2.5rem]"
      style={{
        background: `linear-gradient(135deg, ${hexToRgba(color, 0.03)} 0%, ${hexToRgba(color, 0.01)} 100%)`,
        border: `1px solid ${hexToRgba(color, 0.12)}`,
        boxShadow: `0 0 20px ${hexToRgba(color, 0.06)}, inset 0 0 20px ${hexToRgba(color, 0.02)}`
      }}
    >
      {/* Ambient glow effect */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${hexToRgba(color, 0.08)} 0%, transparent 70%)`,
          animation: 'therapy-pulse 3s ease-in-out infinite'
        }}
      />

      {/* Content */}
      <div className="relative px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex items-center justify-center overflow-hidden">
          {/* Typing text with enhanced styling - centered without label */}
          <div className="flex-1 text-center max-w-full">
            <p
              className="font-sans text-xs font-light tracking-wide transition-all whitespace-nowrap overflow-hidden text-ellipsis sm:text-sm md:text-base"
              style={{ 
                color,
                textShadow: `0 0 20px ${hexToRgba(color, 0.2)}`,
                letterSpacing: '0.025em'
              }}
            >
              {displayText}
              {/* Enhanced breathing cursor */}
              <span
                className="ml-0.5 inline-block h-3.5 w-0.5 align-middle transition-transform sm:h-4"
                style={{ 
                  backgroundColor: color,
                  transform: `scaleY(${cursorScale})`,
                  boxShadow: `0 0 8px ${hexToRgba(color, 0.4)}`,
                  opacity: 0.8
                }}
              />
            </p>
          </div>
        </div>
      </div>

      {/* Top accent line */}
      <div 
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(color, 0.25)} 50%, transparent 100%)`
        }}
      />

      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(color, 0.25)} 50%, transparent 100%)`
        }}
      />
    </div>
  )
}

