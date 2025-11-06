"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { useTranslation } from "@/hooks/use-translation"
import { FilteredServices } from "@/components/filtered-services"
import { HeartbeatTriangle } from "@/components/heartbeat-triangle"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)
  const { t } = useTranslation()
  const services = t.services
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isTriangleHovered, setIsTriangleHovered] = useState(false)
  
  const hasMoreServices = services.items.length > 0

  // Note: Swipe to close disabled for services modal to allow scrolling through filtered services

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement
      if (scrollContainer) {
        scrollContainer.style.overflow = "hidden"
      }
      document.body.style.overflow = "hidden"

      // Close on Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsModalOpen(false)
        }
      }
      window.addEventListener("keydown", handleEscape)

      return () => {
        window.removeEventListener("keydown", handleEscape)
      }
    } else {
      const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement
      if (scrollContainer) {
        scrollContainer.style.overflow = ""
      }
      document.body.style.overflow = ""
    }
  }, [isModalOpen])

  return (
    <>
      <section
        ref={ref}
        className="flex min-h-screen w-screen shrink-0 snap-start items-center justify-center px-5 py-16 pt-20 sm:px-6 sm:py-20 sm:pt-28 md:px-8 md:py-32 md:pt-36 lg:px-12 lg:py-36 lg:pt-40"
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Enhanced Triangle Layout with Cards */}
          <div className="relative">
            {/* Service Cards Grid with Triangle Integration */}
            <div className="relative min-h-[400px] md:min-h-[420px] lg:min-h-[480px]">
              {/* Desktop: Triangle Layout */}
              <div className="hidden md:block">
                <div className="relative mx-auto max-w-5xl">
                  {/* Top Card: Longevity */}
                  <div className="flex justify-center pb-4 md:pb-5 lg:pb-6">
                    <div
                      data-card="longevity"
                      onMouseEnter={() => setHoveredCard('longevity')}
                      onMouseLeave={() => setHoveredCard(null)}
                      className={`group relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-md rounded-xl border border-border/20 bg-card/10 p-4 md:p-5 lg:p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:bg-card/20 hover:shadow-2xl hover:shadow-primary/20 ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                      }`}
                      style={{ 
                        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
                      }}
                    >
                      <h2 className="mb-2 font-sans text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight tracking-wide text-foreground">
                        {services.pillars?.longevity?.title || "Longevity"}
                      </h2>
                      <p className="text-xs md:text-sm lg:text-base font-light leading-relaxed text-foreground/60">
                        {services.pillars?.longevity?.description || "Data-driven protocols for optimal healthspan"}
                      </p>
                      <div className="mt-2 md:mt-3 flex items-center justify-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-primary/60" />
                        <div className="h-1 w-1 rounded-full bg-primary/60" />
                        <div className="h-1 w-1 rounded-full bg-primary/60" />
                        <span className="ml-1 font-mono text-xs tracking-wider text-primary/70">25+ Services</span>
                      </div>
                    </div>
                  </div>

                  {/* Center: Triangle (Absolute Positioned - Interactive) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[20%] pointer-events-auto group/triangle">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      onMouseEnter={() => setIsTriangleHovered(true)}
                      onMouseLeave={() => setIsTriangleHovered(false)}
                      className="relative cursor-pointer"
                      aria-label="Explore all services"
                    >
                      <div 
                        className={`transition-all duration-500 ${
                          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
                        } ${hoveredCard || isTriangleHovered ? "scale-110" : ""}`}
                        style={{
                          transitionDelay: hoveredCard || isTriangleHovered ? '0ms' : '150ms',
                          filter: (hoveredCard || isTriangleHovered) ? 'brightness(1.3) saturate(1.4)' : 'brightness(1) saturate(1)',
                        }}
                      >
                        <div className="h-[180px] w-[180px] md:h-[200px] md:w-[200px] lg:h-[220px] lg:w-[220px] xl:h-[240px] xl:w-[240px]">
                          <HeartbeatTriangle />
                        </div>
                      </div>
                      
                      {/* Tooltip on hover */}
                      <div 
                        className={`absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary/90 px-4 py-2 text-xs font-medium text-primary-foreground shadow-lg backdrop-blur-sm transition-all duration-300 ${
                          isTriangleHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                        }`}
                      >
                        Explore All Services
                        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-primary/90" />
                      </div>
                    </button>
                  </div>

                  {/* Bottom Cards: Wellness & Aesthetics */}
                  <div className="grid grid-cols-2 gap-6 pt-4 md:gap-8 md:pt-5 lg:gap-10 lg:pt-6 xl:gap-12 xl:px-12">
                    {/* Bottom Left: Wellness */}
                    <div className="flex justify-end">
                      <div
                        data-card="wellness"
                        onMouseEnter={() => setHoveredCard('wellness')}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`group relative w-full max-w-[260px] md:max-w-[280px] lg:max-w-sm rounded-xl border border-border/20 bg-card/10 p-4 md:p-5 lg:p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:bg-card/20 hover:shadow-2xl hover:shadow-primary/20 ${
                          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                        }`}
                        style={{ 
                          transitionDelay: "100ms",
                          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
                        }}
                      >
                        <h2 className="mb-2 font-sans text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight tracking-wide text-foreground">
                          {services.pillars?.wellness?.title || "Wellness"}
                        </h2>
                        <p className="text-xs md:text-sm lg:text-base font-light leading-relaxed text-foreground/60">
                          {services.pillars?.wellness?.description || "Holistic balance for mind and body"}
                        </p>
                        <div className="mt-2 md:mt-3 flex items-center justify-center gap-1">
                          <div className="h-1 w-1 rounded-full bg-primary/60" />
                          <div className="h-1 w-1 rounded-full bg-primary/60" />
                          <div className="h-1 w-1 rounded-full bg-primary/60" />
                          <span className="ml-1 font-mono text-xs tracking-wider text-primary/70">30+ Services</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Right: Aesthetics */}
                    <div className="flex justify-start">
                      <div
                        data-card="aesthetics"
                        onMouseEnter={() => setHoveredCard('aesthetics')}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`group relative w-full max-w-[260px] md:max-w-[280px] lg:max-w-sm rounded-xl border border-border/20 bg-card/10 p-4 md:p-5 lg:p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:bg-card/20 hover:shadow-2xl hover:shadow-primary/20 ${
                          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                        }`}
                        style={{ 
                          transitionDelay: "200ms",
                          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
                        }}
                      >
                        <h2 className="mb-2 font-sans text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight tracking-wide text-foreground">
                          {services.pillars?.aesthetics?.title || "Aesthetics"}
                        </h2>
                        <p className="text-xs md:text-sm lg:text-base font-light leading-relaxed text-foreground/60">
                          {services.pillars?.aesthetics?.description || "Regenerative beauty and excellence"}
                        </p>
                        <div className="mt-2 md:mt-3 flex items-center justify-center gap-1">
                          <div className="h-1 w-1 rounded-full bg-primary/60" />
                          <div className="h-1 w-1 rounded-full bg-primary/60" />
                          <div className="h-1 w-1 rounded-full bg-primary/60" />
                          <span className="ml-1 font-mono text-xs tracking-wider text-primary/70">20+ Services</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connection Lines Overlay */}
                  <svg 
                    className="absolute inset-0 pointer-events-none"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    
                    {/* Line from triangle to Longevity (top) */}
                    <line
                      x1="50%" y1="50%"
                      x2="50%" y2="15%"
                      stroke="url(#lineGradient)"
                      strokeWidth={hoveredCard === 'longevity' || isTriangleHovered ? "2" : "1"}
                      strokeDasharray="4,4"
                      className="connection-line animate-pulse"
                      style={{ 
                        opacity: isVisible ? (hoveredCard === 'longevity' || isTriangleHovered ? 0.8 : 0.3) : 0,
                        transition: 'opacity 0.3s ease-in-out, stroke-width 0.3s ease-in-out',
                        transitionDelay: isVisible ? '400ms' : '0ms'
                      }}
                    />
                    
                    {/* Animated particles on line to Longevity */}
                    {(hoveredCard === 'longevity' || isTriangleHovered) && (
                      <>
                        <circle r="2" fill="hsl(var(--primary))" opacity="0.8">
                          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0,0 L 0,-100" />
                          <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <circle r="2" fill="hsl(var(--primary))" opacity="0.8">
                          <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.5s" path="M 0,0 L 0,-100" />
                          <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                        </circle>
                      </>
                    )}
                    
                    {/* Line from triangle to Wellness (bottom-left) */}
                    <line
                      x1="50%" y1="50%"
                      x2="25%" y2="85%"
                      stroke="url(#lineGradient)"
                      strokeWidth={hoveredCard === 'wellness' || isTriangleHovered ? "2" : "1"}
                      strokeDasharray="4,4"
                      className="connection-line animate-pulse"
                      style={{ 
                        opacity: isVisible ? (hoveredCard === 'wellness' || isTriangleHovered ? 0.8 : 0.3) : 0,
                        transition: 'opacity 0.3s ease-in-out, stroke-width 0.3s ease-in-out',
                        transitionDelay: isVisible ? '500ms' : '0ms',
                        animationDelay: '0.5s'
                      }}
                    />
                    
                    {/* Animated particles on line to Wellness */}
                    {(hoveredCard === 'wellness' || isTriangleHovered) && (
                      <circle r="2" fill="hsl(var(--primary))" opacity="0.8">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0,0 L -60,60" />
                        <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    
                    {/* Line from triangle to Aesthetics (bottom-right) */}
                    <line
                      x1="50%" y1="50%"
                      x2="75%" y2="85%"
                      stroke="url(#lineGradient)"
                      strokeWidth={hoveredCard === 'aesthetics' || isTriangleHovered ? "2" : "1"}
                      strokeDasharray="4,4"
                      className="connection-line animate-pulse"
                      style={{ 
                        opacity: isVisible ? (hoveredCard === 'aesthetics' || isTriangleHovered ? 0.8 : 0.3) : 0,
                        transition: 'opacity 0.3s ease-in-out, stroke-width 0.3s ease-in-out',
                        transitionDelay: isVisible ? '600ms' : '0ms',
                        animationDelay: '1s'
                      }}
                    />
                    
                    {/* Animated particles on line to Aesthetics */}
                    {(hoveredCard === 'aesthetics' || isTriangleHovered) && (
                      <circle r="2" fill="hsl(var(--primary))" opacity="0.8">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0,0 L 60,60" />
                        <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </svg>
                </div>
              </div>

              {/* Mobile: Stacked Layout */}
              <div className="md:hidden">
                <div className="space-y-4">
                  {/* Longevity */}
                  <div
                    className={`group max-w-xs mx-auto rounded-xl border border-border/20 bg-card/10 p-5 text-center backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:bg-card/20 hover:shadow-lg hover:shadow-primary/10 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                    }`}
                  >
                    <h2 className="mb-2 font-sans text-2xl font-light tracking-wide text-foreground sm:text-3xl">
                      {services.pillars?.longevity?.title || "Longevity"}
                    </h2>
                    <p className="text-xs font-light leading-relaxed text-foreground/50 sm:text-sm">
                      {services.pillars?.longevity?.description || "Data-driven protocols for optimal healthspan"}
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <div className="h-1 w-1 rounded-full bg-primary/60" />
                      <div className="h-1 w-1 rounded-full bg-primary/60" />
                      <div className="h-1 w-1 rounded-full bg-primary/60" />
                      <span className="ml-1 font-mono text-xs tracking-wider text-primary/70">25+ Services</span>
                    </div>
                  </div>

                  {/* Wellness */}
                  <div
                    className={`group max-w-xs mx-auto rounded-xl border border-border/20 bg-card/10 p-5 text-center backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:bg-card/20 hover:shadow-lg hover:shadow-primary/10 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                    }`}
                    style={{ transitionDelay: "100ms" }}
                  >
                    <h2 className="mb-2 font-sans text-2xl font-light tracking-wide text-foreground sm:text-3xl">
                      {services.pillars?.wellness?.title || "Wellness"}
                    </h2>
                    <p className="text-xs font-light leading-relaxed text-foreground/50 sm:text-sm">
                      {services.pillars?.wellness?.description || "Holistic balance for mind and body"}
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <div className="h-1 w-1 rounded-full bg-primary/60" />
                      <div className="h-1 w-1 rounded-full bg-primary/60" />
                      <div className="h-1 w-1 rounded-full bg-primary/60" />
                      <span className="ml-1 font-mono text-xs tracking-wider text-primary/70">30+ Services</span>
                    </div>
                  </div>

                  {/* Aesthetics */}
                  <div
                    className={`group max-w-xs mx-auto rounded-xl border border-border/20 bg-card/10 p-5 text-center backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:bg-card/20 hover:shadow-lg hover:shadow-primary/10 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    <h2 className="mb-2 font-sans text-2xl font-light tracking-wide text-foreground sm:text-3xl">
                      {services.pillars?.aesthetics?.title || "Aesthetics"}
                    </h2>
                    <p className="text-xs font-light leading-relaxed text-foreground/50 sm:text-sm">
                      {services.pillars?.aesthetics?.description || "Regenerative beauty and excellence"}
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <div className="h-1 w-1 rounded-full bg-primary/60" />
                      <div className="h-1 w-1 rounded-full bg-primary/60" />
                      <div className="h-1 w-1 rounded-full bg-primary/60" />
                      <span className="ml-1 font-mono text-xs tracking-wider text-primary/70">20+ Services</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subheading - Below Cards (Hidden, removed per user request) */}
          </div>

          {/* All Services Button - Enhanced */}
          {hasMoreServices && (
            <div
              className={`mt-6 flex justify-center transition-all duration-700 delay-500 sm:mt-8 md:mt-6 lg:mt-8 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className={`group relative overflow-hidden rounded-full border border-primary/30 bg-background/40 px-10 py-4 font-sans text-base font-medium text-foreground shadow-lg shadow-primary/20 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/60 hover:shadow-xl hover:shadow-primary/30 active:scale-95 sm:px-12 sm:py-4 md:text-lg ${
                  hoveredCard ? 'ring-2 ring-primary/20 ring-offset-2 ring-offset-background' : ''
                }`}
              >
                <span className="relative z-10">{t.moreLink}</span>
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {mounted && isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Shader Background */}
          <div className="absolute inset-0 z-0">
            <ShaderWrapper />
            <div className="absolute inset-0 bg-background/40" />
          </div>
          <GrainOverlay />

          <div 
            className="relative z-10 h-full w-full sm:h-auto sm:max-w-5xl md:max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-20 rounded-full border border-primary/20 bg-background/60 p-3 text-foreground shadow-sm backdrop-blur-md transition-all hover:border-primary/30 hover:bg-background/80 hover:text-foreground sm:right-0 sm:top-0 sm:-right-12 sm:p-3"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 sm:h-6 sm:w-6" />
            </button>

            {/* Modal Content */}
            <div className="relative h-full overflow-y-auto border-primary/10 bg-background/30 p-5 shadow-2xl backdrop-blur-md sm:max-h-[85vh] sm:rounded-2xl sm:border sm:p-5 md:p-7 lg:p-9">
              {/* Text Section */}
              {(services.modalTitle || services.modalDescription) && (
                <div className="mb-5 animate-in fade-in slide-in-from-top-4 sm:mb-7 md:mb-9">
                  {services.modalTitle && (
                    <h2 className="mb-2 font-sans text-xl font-light tracking-tight text-foreground sm:mb-3 sm:text-2xl md:text-3xl lg:text-4xl">
                      {services.modalTitle}
                    </h2>
                  )}
                  {services.modalDescription && (
                    <p className="max-w-4xl font-sans text-xs leading-relaxed text-foreground/80 sm:text-sm md:text-base lg:text-lg">
                      <span className="text-pretty">{services.modalDescription}</span>
                    </p>
                  )}
                  <div className="mt-3 h-px w-12 bg-primary/30 sm:mt-4 sm:w-16 md:mt-5 md:w-20" />
                </div>
              )}

              {/* Filtered Services Component */}
              <FilteredServices />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
