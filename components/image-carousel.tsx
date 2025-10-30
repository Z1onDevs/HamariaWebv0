"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageCarouselProps {
  images: Array<{ src: string; title: string; description?: string }>
  initialIndex?: number
  onClose: () => void
}

export function ImageCarousel({ images, initialIndex = 0, onClose }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [lastTap, setLastTap] = useState(0)

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsZoomed(false)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsZoomed(false)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, onClose])

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (isZoomed) return // Don't swipe when zoomed

    const swipeThreshold = 75
    const distance = touchStart - touchEnd

    if (distance > swipeThreshold) {
      goToNext()
    } else if (distance < -swipeThreshold) {
      goToPrev()
    }
  }

  // Double tap to zoom
  const handleDoubleTap = () => {
    const now = Date.now()
    const timeSinceLastTap = now - lastTap

    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      setIsZoomed(!isZoomed)
    }

    setLastTap(now)
  }

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col bg-background/98 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-5">
        <button
          onClick={onClose}
          className="rounded-full border border-primary/20 bg-background/60 p-3 text-foreground transition-all hover:border-primary/30 hover:bg-background/80"
          aria-label="Close gallery"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="font-mono text-sm text-foreground/70">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Image Container */}
      <div 
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleDoubleTap}
      >
        <img
          src={currentImage.src}
          alt={currentImage.title}
          className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          style={{
            transformOrigin: "center",
          }}
        />

        {/* Navigation Arrows - Desktop/Tablet */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrev()
            }}
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-primary/20 bg-background/80 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-background sm:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-primary/20 bg-background/80 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-background sm:block"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>
        )}
      </div>

      {/* Image Title */}
      <div className="border-t border-primary/10 bg-background/80 p-4 backdrop-blur-sm sm:p-5">
        <h3 className="mb-1 font-sans text-lg font-medium text-foreground sm:text-xl">
          {currentImage.title}
        </h3>
        {currentImage.description && (
          <p className="font-mono text-xs text-foreground/60 sm:text-sm">
            {currentImage.description}
          </p>
        )}
      </div>

      {/* Thumbnail Navigation Strip */}
      <div className="border-t border-primary/10 bg-background/90 p-3 backdrop-blur-sm sm:p-4">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx)
                setIsZoomed(false)
              }}
              className={`flex-shrink-0 overflow-hidden rounded-md transition-all ${
                idx === currentIndex
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.src}
                alt={img.title}
                className="h-16 w-16 object-cover sm:h-20 sm:w-20"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

