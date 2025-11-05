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
        className="flex min-h-screen w-screen shrink-0 snap-start items-center justify-center px-5 py-24 pt-28 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:px-12 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Enhanced Triangle Layout with Cards */}
          <div className="relative">
            {/* Triangle Layout with Compact Cards */}
            <div className="relative z-[1] grid grid-cols-1 gap-4 py-6 sm:gap-5 sm:py-8 md:grid-cols-3 md:gap-6 md:py-10 lg:gap-8">
              {/* Top Center: Longevity */}
              <div className="md:col-span-3 md:flex md:justify-center">
                <div
                  className={`group max-w-xs rounded-xl border border-border/20 bg-card/10 p-5 text-center backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:bg-card/20 hover:shadow-lg hover:shadow-primary/10 md:max-w-sm ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                >
                  <h2 className="mb-2 font-sans text-2xl font-light tracking-wide text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                    Longevity
                  </h2>
                  <p className="text-xs font-light leading-relaxed text-foreground/50 sm:text-sm md:text-base">
                    Data-driven protocols for optimal healthspan
                  </p>
                </div>
              </div>

              {/* Bottom Row: Wellness & Aesthetics */}
              <div className="md:col-span-3 md:grid md:grid-cols-2 md:gap-6 md:px-8 lg:gap-8 lg:px-12">
                {/* Bottom Left: Wellness */}
                <div
                  className={`group mb-4 max-w-xs rounded-xl border border-border/20 bg-card/10 p-5 text-center backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:bg-card/20 hover:shadow-lg hover:shadow-primary/10 sm:mb-5 md:mb-0 md:max-w-none ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: "100ms" }}
                >
                  <h2 className="mb-2 font-sans text-2xl font-light tracking-wide text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                    Wellness
                  </h2>
                  <p className="text-xs font-light leading-relaxed text-foreground/50 sm:text-sm md:text-base">
                    Holistic balance for mind and body
                  </p>
                </div>

                {/* Bottom Right: Aesthetics */}
                <div
                  className={`group max-w-xs rounded-xl border border-border/20 bg-card/10 p-5 text-center backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:bg-card/20 hover:shadow-lg hover:shadow-primary/10 md:max-w-none ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <h2 className="mb-2 font-sans text-2xl font-light tracking-wide text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                    Aesthetics
                  </h2>
                  <p className="text-xs font-light leading-relaxed text-foreground/50 sm:text-sm md:text-base">
                    Regenerative beauty and excellence
                  </p>
                </div>
              </div>
            </div>

            {/* Heartbeat Triangle - On top of cards, fits between them */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 sm:h-[220px] sm:w-[220px] md:h-[280px] md:w-[280px] lg:h-[300px] lg:w-[300px]">
              <HeartbeatTriangle />
            </div>

            {/* Subheading - Below Cards */}
            {services.subheading && (
              <div
                className={`mx-auto mt-12 max-w-3xl text-center transition-all duration-700 delay-300 sm:mt-16 md:mt-20 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
              >
                <div className="mb-4 flex items-center justify-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/40" />
                  <span className="font-mono text-xs uppercase tracking-widest text-primary">70+ Services</span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/40" />
                </div>
                <p className="font-sans text-sm font-light leading-relaxed text-foreground/60 sm:text-base md:text-lg">
                  {services.subheading}
                </p>
              </div>
            )}
          </div>

          {/* All Services Button - Enhanced */}
          {hasMoreServices && (
            <div
              className={`mt-12 flex justify-center transition-all duration-700 delay-500 sm:mt-16 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden rounded-full border border-primary/30 bg-background/40 px-10 py-4 font-sans text-base font-medium text-foreground shadow-lg shadow-primary/20 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/60 hover:shadow-xl hover:shadow-primary/30 active:scale-95 sm:px-12 sm:py-4 md:text-lg"
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
