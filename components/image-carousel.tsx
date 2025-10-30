"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"

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
  const [showUI, setShowUI] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setSlideDirection('left')
      setImageLoaded(false)
      setCurrentIndex(currentIndex + 1)
      setIsZoomed(false)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSlideDirection('right')
      setImageLoaded(false)
      setCurrentIndex(currentIndex - 1)
      setIsZoomed(false)
    }
  }

  // Reset image loaded state when index changes
  useEffect(() => {
    setImageLoaded(false)
    // Clear slide direction after animation
    const timer = setTimeout(() => setSlideDirection(null), 300)
    return () => clearTimeout(timer)
  }, [currentIndex])

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

  // Single tap toggles UI, double tap zooms
  const handleImageClick = () => {
    const now = Date.now()
    const timeSinceLastTap = now - lastTap

    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Double tap - zoom
      setIsZoomed(!isZoomed)
    } else {
      // Single tap - toggle UI
      setShowUI(!showUI)
    }

    setLastTap(now)
  }

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col bg-background/98 backdrop-blur-md">
      {/* Header */}
      <div className={`flex items-center justify-between p-4 transition-all duration-300 sm:p-5 ${
        showUI ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <button
          onClick={onClose}
          className="rounded-full border border-primary/20 bg-background/60 p-3 text-foreground transition-all hover:border-primary/30 hover:bg-background/80"
          aria-label="Close gallery"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="flex items-center gap-3">
          {isZoomed && (
            <button
              onClick={() => setIsZoomed(false)}
              className="rounded-full border border-primary/20 bg-background/60 p-2 text-foreground/60 transition-all hover:text-foreground"
              aria-label="Reset zoom"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          )}
          <div className="font-mono text-sm text-foreground/70">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Swipe Hint - First Image Only */}
      {currentIndex === 0 && showUI && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 animate-pulse pointer-events-none sm:hidden">
          <div className="flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 backdrop-blur-sm">
            <ChevronLeft className="h-4 w-4 text-foreground/50" />
            <span className="font-mono text-xs text-foreground/60">Swipe to navigate</span>
            <ChevronRight className="h-4 w-4 text-foreground/50" />
          </div>
        </div>
      )}

      {/* Image Container */}
      <div 
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleImageClick}
      >
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
          </div>
        )}

        <img
          ref={imageRef}
          src={currentImage.src}
          alt={currentImage.title}
          onLoad={() => setImageLoaded(true)}
          className={`max-h-full max-w-full object-contain transition-all duration-300 ${
            isZoomed ? "scale-150 cursor-move" : "scale-100 cursor-pointer"
          } ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${
            slideDirection === 'left' ? 'animate-slide-in-from-right' : 
            slideDirection === 'right' ? 'animate-slide-in-from-left' : ''
          }`}
          style={{
            transformOrigin: "center",
          }}
        />

        {/* Navigation Arrows - Desktop/Tablet, hidden when UI is hidden */}
        {showUI && currentIndex > 0 && (
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

        {showUI && currentIndex < images.length - 1 && (
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

      {/* Image Title & Thumbnail Navigation */}
      <div className={`border-t border-primary/10 bg-background/80 backdrop-blur-sm transition-all duration-300 ${
        showUI ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        {/* Image Title */}
        <div className="p-4 sm:p-5">
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
          <div className="flex gap-2 overflow-x-auto pb-2 sm:gap-3 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setImageLoaded(false)
                  setCurrentIndex(idx)
                  setIsZoomed(false)
                  // Scroll thumbnail into view
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                }}
                className={`flex-shrink-0 overflow-hidden rounded-md transition-all ${
                  idx === currentIndex
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="h-16 w-16 object-cover sm:h-20 sm:w-20"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

