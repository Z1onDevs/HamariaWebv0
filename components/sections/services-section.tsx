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
          {/* World-Class Services Header */}
          <div className="relative mb-16 text-center sm:mb-20 md:mb-24 lg:mb-28">
            {/* Main Heading with Red Spotlight */}
            <div className="relative inline-block">
              {/* Red Spotlight - Focused on Text */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                  src="/red-spotlight--vector.png"
                  alt=""
                  className="h-[400px] w-[900px] object-contain opacity-60 blur-2xl sm:h-[500px] sm:w-[1100px] md:opacity-50"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
              
              {/* Heading */}
              <div
                className={`relative z-10 transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
              >
                <h2 className="font-sans text-3xl font-light tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  {services.heading}
                </h2>
              </div>
            </div>
            
            {/* Elegant Divider */}
            <div
              className={`mx-auto my-8 h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-all duration-700 delay-100 sm:my-10 sm:w-32 md:my-12 md:w-40 ${
                isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
            />
            
            {/* Subheading */}
            {services.subheading && (
              <div
                className={`mx-auto max-w-3xl transition-all duration-700 delay-200 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
              >
                <p className="font-sans text-sm font-light leading-relaxed text-foreground/60 sm:text-base md:text-lg lg:text-xl">
                  {services.subheading}
                </p>
              </div>
            )}
          </div>

          {/* Water Texture Hero Image - Mobile Only */}
          <div
            className={`relative mb-12 overflow-hidden rounded-2xl transition-all duration-700 delay-300 sm:mb-16 md:hidden ${
              isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
            }`}
          >
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
              <img
                src="/Water texture.jpeg"
                alt="Hamaria Wellness Experience"
                className="h-full w-full object-cover object-center transition-transform duration-700 active:scale-105"
                loading="lazy"
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />
            </div>
          </div>

          {/* All Services Button */}
          {hasMoreServices && (
            <div
              className={`flex justify-center transition-all duration-700 delay-400 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden rounded-full border border-primary/30 bg-background/40 px-8 py-3 font-sans text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/10 active:scale-95 sm:px-10 sm:py-3.5 sm:text-base"
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
