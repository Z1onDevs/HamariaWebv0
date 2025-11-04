"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { useTranslation } from "@/hooks/use-translation"
import { FilteredServices } from "@/components/filtered-services"

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
          {/* Header with Water Texture Background */}
          <div className="relative mb-12 overflow-hidden rounded-3xl sm:mb-16 md:mb-20 lg:mb-24">
            {/* Water Texture Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/Water texture.jpeg"
                alt=""
                className="h-full w-full object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/80" />
            </div>
            
            {/* Red Spotlight Overlay */}
            <div className="pointer-events-none absolute inset-0 z-[1]">
              <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl">
                <div className="h-full w-full rounded-full bg-gradient-radial from-red-500/60 via-red-600/30 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 px-5 py-12 text-center sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
              <div
                className={`mb-6 transition-all duration-700 sm:mb-8 md:mb-10 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
              >
                <h2 className="font-sans text-2xl font-light tracking-wide text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  {services.heading}
                </h2>
              </div>
              
              {/* Subheading */}
              {services.subheading && (
                <div
                  className={`mx-auto max-w-4xl transition-all duration-700 delay-100 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                >
                  <p className="font-sans text-sm font-light leading-relaxed text-foreground/70 sm:text-base md:text-lg lg:text-xl">
                    {services.subheading}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* All Services Button */}
          {hasMoreServices && (
            <div
              className={`mt-6 flex justify-center transition-all duration-700 sm:mt-8 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group border-b border-transparent font-sans text-sm text-foreground/70 transition-all hover:border-foreground/70 hover:text-foreground sm:text-base"
              >
                {t.moreLink}
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
