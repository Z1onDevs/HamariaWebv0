"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Service {
  title: string
  description: string
}

interface ServicesCarouselProps {
  services: Service[]
}

export function ServicesCarousel({ services }: ServicesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const totalSlides = Math.ceil(services.length / 3)

  useEffect(() => {
    if (isPaused || hoveredCard !== null) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 4000) // Auto-scroll every 4 seconds

    return () => clearInterval(interval)
  }, [isPaused, hoveredCard, totalSlides])

  const goToNext = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      goToNext()
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      goToPrev()
    }
  }

  const getVisibleServices = () => {
    const startIdx = currentIndex * 3
    return services.slice(startIdx, startIdx + 3)
  }

  const visibleServices = getVisibleServices()

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Arrows - Tablet/Desktop */}
      {currentIndex > 0 && (
        <button
          onClick={goToPrev}
          className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-primary/20 bg-background/80 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-background hover:scale-110 sm:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
      )}

      {currentIndex < totalSlides - 1 && (
        <button
          onClick={goToNext}
          className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-primary/20 bg-background/80 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-background hover:scale-110 sm:flex"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      )}

      {/* Cards Container */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-6">
        {visibleServices.map((service, idx) => {
          const globalIdx = currentIndex * 3 + idx
          return (
            <div
              key={globalIdx}
              onMouseEnter={() => setHoveredCard(globalIdx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative min-h-[180px] overflow-visible rounded-xl border border-primary/10 bg-background/20 p-5 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-background/40 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 active:scale-95 sm:min-h-[200px] md:p-6"
              style={{
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                animationDelay: `${idx * 100}ms`,
              }}
            >
              {/* Title - Always visible */}
              <h3 className="mb-3 font-sans text-base font-medium text-foreground transition-all duration-300 group-hover:text-primary sm:text-lg md:mb-4 md:text-xl">
                {service.title}
              </h3>

              {/* Description - Always visible on mobile, hover on desktop */}
              <div className="transition-all duration-500 md:max-h-0 md:opacity-0 md:overflow-hidden md:group-hover:max-h-96 md:group-hover:opacity-100">
                <p className="font-sans text-sm leading-relaxed text-foreground/70 sm:text-base">
                  {service.description}
                </p>
              </div>

              {/* Decorative element - Desktop only */}
              <div className={`absolute bottom-0 left-0 hidden h-1 bg-primary transition-all duration-500 md:block ${
                hoveredCard === globalIdx ? "w-full" : "w-0"
              }`} />
            </div>
          )
        })}
      </div>

      {/* Manual Navigation Buttons - Mobile */}
      <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className="rounded-full border border-primary/20 bg-background/60 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-background/80 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        
        <div className="font-mono text-sm text-foreground/70">
          {currentIndex + 1} / {totalSlides}
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === totalSlides - 1}
          className="rounded-full border border-primary/20 bg-background/60 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-background/80 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Carousel Indicators - Tablet/Desktop */}
      <div className="mt-6 hidden items-center justify-center gap-2 sm:flex sm:mt-8">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? "w-10 bg-primary shadow-sm shadow-primary/30" 
                : "w-2.5 bg-foreground/20 hover:bg-foreground/40 hover:w-4"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Swipe Hint - Mobile Only, First Slide */}
      {currentIndex === 0 && (
        <div className="mt-4 flex items-center justify-center gap-2 animate-pulse sm:hidden">
          <ChevronLeft className="h-4 w-4 text-foreground/30" />
          <p className="font-mono text-xs text-foreground/40">Swipe to navigate</p>
          <ChevronRight className="h-4 w-4 text-foreground/30" />
        </div>
      )}
    </div>
  )
}

