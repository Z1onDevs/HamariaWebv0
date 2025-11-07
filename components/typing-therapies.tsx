"use client"

import { useState, useEffect } from "react"

interface TypingTherapiesProps {
  therapies: string[]
  color: string
  isActive: boolean
}

export function TypingTherapies({ therapies, color, isActive }: TypingTherapiesProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (!isActive || therapies.length === 0) {
      setDisplayText("")
      return
    }

    let timeout: NodeJS.Timeout

    if (isTyping) {
      // Typing phase - show up to 3 therapies at a time
      const startIdx = currentIndex % therapies.length
      const therapiesToShow = []
      
      for (let i = 0; i < 3 && therapiesToShow.length < 3; i++) {
        const idx = (startIdx + i) % therapies.length
        if (therapies[idx]) {
          therapiesToShow.push(therapies[idx])
        }
      }
      
      const targetText = therapiesToShow.join(" • ")
      
      if (displayText.length < targetText.length) {
        timeout = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1))
        }, 40) // Typing speed
      } else {
        // Finished typing, wait before cycling to next batch
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2500) // Display time
      }
    } else {
      // Erasing phase
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 20) // Erasing speed (faster)
      } else {
        // Finished erasing, move to next batch
        setCurrentIndex((prev) => (prev + 3) % therapies.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isTyping, isActive, therapies, currentIndex])

  if (!isActive) {
    return null
  }

  return (
    <div className="relative min-h-[2rem] w-full overflow-hidden rounded-lg border border-border/30 bg-card/20 px-4 py-2 backdrop-blur-sm sm:min-h-[2.5rem] sm:px-6 sm:py-3">
      <div className="flex items-center gap-2">
        {/* Featured label */}
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 animate-pulse rounded-full"
            style={{ backgroundColor: color }}
          />
          <span
            className="font-sans text-xs font-medium uppercase tracking-wider opacity-60"
            style={{ color }}
          >
            Featured:
          </span>
        </div>
        
        {/* Typing text */}
        <p
          className="font-sans text-sm font-light tracking-wide transition-colors md:text-base"
          style={{ color }}
        >
          {displayText}
          {/* Blinking cursor */}
          <span
            className="ml-0.5 inline-block h-4 w-0.5 animate-pulse"
            style={{ backgroundColor: color }}
          />
        </p>
      </div>
    </div>
  )
}

