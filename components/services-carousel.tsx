"use client"

import { useState, useEffect, useRef } from "react"

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

  const totalSlides = Math.ceil(services.length / 3)

  useEffect(() => {
    if (isPaused || hoveredCard !== null) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 4000) // Auto-scroll every 4 seconds

    return () => clearInterval(interval)
  }, [isPaused, hoveredCard, totalSlides])

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
    >
      {/* Cards Container */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-6">
        {visibleServices.map((service, idx) => {
          const globalIdx = currentIndex * 3 + idx
          return (
            <div
              key={globalIdx}
              onMouseEnter={() => setHoveredCard(globalIdx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative min-h-[200px] overflow-hidden rounded-xl border border-primary/10 bg-background/20 p-5 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-background/40 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 sm:min-h-[220px] md:p-6"
              style={{
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                animationDelay: `${idx * 100}ms`,
              }}
            >
              {/* Title - Always visible */}
              <h3 className="mb-3 font-sans text-base font-medium text-foreground transition-all duration-300 group-hover:text-primary sm:text-lg md:text-xl">
                {service.title}
              </h3>

              {/* Description - Hidden by default, shown on hover */}
              <div className={`transition-all duration-500 ${
                hoveredCard === globalIdx 
                  ? "max-h-96 opacity-100" 
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}>
                <p className="font-sans text-sm leading-relaxed text-foreground/70 sm:text-base">
                  {service.description}
                </p>
              </div>

              {/* Decorative element */}
              <div className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 ${
                hoveredCard === globalIdx ? "w-full" : "w-0"
              }`} />

              {/* Hover indicator */}
              {hoveredCard !== globalIdx && (
                <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Carousel Indicators */}
      <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? "w-8 bg-primary" 
                : "w-2 bg-foreground/20 hover:bg-foreground/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="mt-4 text-center">
        <p className="font-mono text-xs text-foreground/50">
          {currentIndex + 1} / {totalSlides}
        </p>
      </div>
    </div>
  )
}

