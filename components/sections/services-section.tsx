"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { useTranslation } from "@/hooks/use-translation"
import { useSwipeToClose } from "@/hooks/use-swipe-to-close"
import { ServicesCarousel } from "@/components/services-carousel"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)
  const { t } = useTranslation()
  const services = t.services
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const primaryServices = services.items.filter((item: any) => item.primary === true)
  const hasMoreServices = services.items.some((item: any) => item.primary === false)

  // Swipe to close modal
  useSwipeToClose({ 
    onClose: () => setIsModalOpen(false), 
    enabled: isModalOpen 
  })

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
          {/* Hero Text */}
          {services.heroText && (
            <div className="mb-12 mt-8 space-y-3 sm:mb-16 sm:mt-10 sm:space-y-4 md:mb-20 md:mt-12 md:space-y-5 lg:mb-24 lg:mt-16">
              <div
                className={`transition-all duration-700 delay-100 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <p className="font-sans text-xl font-normal leading-tight tracking-tight text-foreground/90 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                  {services.heroText.line1}
                </p>
              </div>
              <div
                className={`transition-all duration-700 delay-200 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <p className="font-sans text-lg font-light leading-snug text-foreground/80 sm:text-xl md:text-2xl lg:text-3xl">
                  <span className="text-foreground/90">{services.heroText.line2.split(',')[0]}</span>
                  <span className="text-foreground/70">,</span>
                  <span className="ml-2 text-foreground/80">{services.heroText.line2.split(',')[1]}</span>
                </p>
              </div>
              <div
                className={`transition-all duration-700 delay-300 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <p className="font-sans text-base font-light leading-relaxed text-foreground/60 sm:text-lg md:text-xl lg:text-2xl">
                  {services.heroText.line3}
                </p>
              </div>
            </div>
          )}

          {/* Heading - moved below hero */}
          <div
            className={`mb-8 text-center transition-all duration-700 sm:mb-10 md:mb-12 lg:mb-14 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="font-sans text-sm font-light tracking-tight text-foreground sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              {services.heading}
            </h2>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:gap-x-16 lg:gap-y-10">
            {primaryServices.map((service: any, i: number) => (
              <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
            ))}
          </div>

          {/* More Link */}
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

              {/* Services Carousel */}
              <ServicesCarousel services={services.items} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0 scale-95"
        case "right":
          return "translate-x-16 opacity-0 scale-95"
        case "top":
          return "-translate-y-16 opacity-0 scale-95"
        case "bottom":
          return "translate-y-16 opacity-0 scale-95"
        default:
          return "translate-y-12 opacity-0 scale-95"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100 scale-100"
  }

  return (
    <div
      className={`group flex flex-col items-center justify-center rounded-lg border border-border/50 bg-card/20 p-5 backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:bg-card/40 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 active:scale-95 sm:rounded-xl sm:p-6 md:p-8 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 80}ms`,
        transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Title */}
      <h3 className="mb-3 text-center font-sans text-base font-medium text-foreground sm:mb-4 sm:text-lg md:text-xl lg:text-2xl">
        {service.title}
      </h3>
      
      {/* Description - always visible */}
      <p className="text-center text-xs leading-relaxed text-foreground/70 sm:text-sm md:text-base">
        {service.description}
      </p>
    </div>
  )
}
