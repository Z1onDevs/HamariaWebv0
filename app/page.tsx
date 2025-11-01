"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { ConceptSection } from "@/components/sections/concept-section"
import { ServicesSection } from "@/components/sections/services-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MembershipSection } from "@/components/sections/membership-section"
import { MagneticButton } from "@/components/magnetic-button"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { DNAHelix } from "@/components/dna-helix"
import { MobileNav } from "@/components/mobile-nav"
import { SectionDots } from "@/components/section-dots"
import { StickyCTA } from "@/components/sticky-cta"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/hooks/use-translation"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useScrollProgress } from "@/hooks/use-scroll-progress"
import { useRef, useEffect, useState } from "react"
import site from "@/content/site.json"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()
  const [heroScrollProgress, setHeroScrollProgress] = useState(0)
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()
  const hero = t.hero
  
  // Device capability detection for performance optimization
  const { isLowEnd, prefersReducedMotion } = useDeviceCapabilities()
  const shouldRenderShader = !isLowEnd && !prefersReducedMotion
  
  // Media query for mobile/tablet vs desktop behavior
  // Mobile + iPad (vertical scroll) vs Desktop (horizontal scroll)
  const isMobile = useMediaQuery('(max-width: 1279px)') // xl breakpoint
  
  // Scroll-based animations for mobile
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    if (!isMobile) return
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  useEffect(() => {
    // If shaders are disabled, load immediately
    if (!shouldRenderShader) {
      setIsLoaded(true)
      return
    }

    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [shouldRenderShader])

  const scrollToSection = (index: number) => {
    if (!scrollContainerRef.current) return

    if (isMobile) {
      // Mobile: Scroll to section vertically
      const sections = scrollContainerRef.current.querySelectorAll('section')
      const targetSection = sections[index] as HTMLElement
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setCurrentSection(index)
      }
    } else {
      // Desktop: Scroll horizontally
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    // Only add touch handlers on desktop (for horizontal scroll)
    if (isMobile) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      // Increase threshold to 150px to allow for scrolling within sections
      // Only trigger page change for strong vertical swipes
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 150) {
        if (deltaY > 0 && currentSection < 5) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection, isMobile])

  useEffect(() => {
    // Only add wheel handler on desktop (for horizontal scroll)
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 5) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection, isMobile])

  useEffect(() => {
    // Mobile: Use Intersection Observer for section detection
    if (isMobile) {
      const sections = document.querySelectorAll('section')
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              const index = Array.from(sections).indexOf(entry.target as HTMLElement)
              if (index !== -1 && index !== currentSection) {
                setCurrentSection(index)
              }
            }
          })
        },
        { threshold: [0.5], rootMargin: '-64px 0px' }
      )

      sections.forEach((section) => observer.observe(section))

      return () => {
        sections.forEach((section) => observer.unobserve(section))
      }
    }

    // Desktop: Use scroll position for horizontal scroll detection
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        // Calculate hero scroll progress (0 to 1 in first section)
        if (scrollLeft < sectionWidth) {
          setHeroScrollProgress(scrollLeft / sectionWidth)
        }

        if (newSection !== currentSection && newSection >= 0 && newSection <= 5) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection, isMobile])

  return (
    <main className={`relative w-full bg-background ${isMobile ? 'h-auto' : 'h-screen overflow-hidden'}`}>
      <CustomCursor />
      <GrainOverlay />

      {shouldRenderShader && (
        <div
          ref={shaderContainerRef}
          className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ contain: "strict" }}
        >
          <ShaderWrapper />
          <div className="absolute inset-0 bg-background/60" />
        </div>
      )}

      {/* Fallback background for low-end devices */}
      {!shouldRenderShader && (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-background via-background to-primary/5" />
      )}

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-3 transition-opacity duration-700 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-12 lg:py-6 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105 sm:gap-3"
        >
          <span className="font-sans text-lg font-light tracking-wide text-foreground sm:text-xl md:text-2xl">{t.siteName}</span>
        </button>

        <div className="hidden items-center gap-4 xl:flex xl:gap-6 2xl:gap-8">
          {t.nav.map((item: string, index: number) => {
            let sectionIndex = index
            if (item === "Membership" || item === "Membresía") sectionIndex = 4
            if (item === "Contact" || item === "Contacto") sectionIndex = 5
            return (
              <button
                key={item}
                onClick={() => scrollToSection(sectionIndex)}
                className={`group relative font-sans text-xs font-normal tracking-wide transition-colors sm:text-sm ${
                  currentSection === sectionIndex ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                    currentSection === sectionIndex ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* Language Switcher & Mobile Nav */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 border-r border-foreground/20 pr-2 sm:pr-3">
            <button
              onClick={() => setLanguage("en")}
              className={`font-mono text-xs uppercase tracking-wide transition-colors sm:text-xs ${
                language === "en" ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              EN
            </button>
            <span className="text-foreground/20">|</span>
            <button
              onClick={() => setLanguage("es")}
              className={`font-mono text-xs uppercase tracking-wide transition-colors sm:text-xs ${
                language === "es" ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              ES
            </button>
          </div>
          
          {/* Desktop Apply Button */}
          <MagneticButton variant="primary" className="hidden text-xs sm:text-sm xl:flex" onClick={() => scrollToSection(4)}>
            {t.applyButton}
          </MagneticButton>

          {/* Mobile Menu Button */}
          <MobileNav currentSection={currentSection} onNavigate={scrollToSection} isLoaded={isLoaded} />
        </div>
      </nav>

      {/* Section Navigation Dots - Mobile Only */}
      <SectionDots
        totalSections={6}
        currentSection={currentSection}
        onNavigate={scrollToSection}
        isLoaded={isLoaded}
      />

      {/* Sticky CTA Button - Mobile Only */}
      <StickyCTA
        currentSection={currentSection}
        onApply={() => scrollToSection(4)}
        isLoaded={isLoaded}
      />

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 transition-opacity duration-700 ${
          isMobile 
            ? "flex flex-col h-auto overflow-y-auto overflow-x-hidden" 
            : "flex flex-row h-screen overflow-x-auto overflow-y-hidden"
        } ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <section className="relative flex min-h-screen w-screen shrink-0 items-end px-5 pb-20 pt-28 sm:px-6 sm:pb-20 sm:pt-24 md:px-8 md:pb-24 lg:px-12 lg:pb-28">
          {/* DNA Helix - Horizontal on mobile/tablet, vertical on desktop */}
          <div 
            className="absolute left-1/2 top-4 -translate-x-1/2 animate-in fade-in slide-in-from-top-4 duration-1000 xl:hidden"
            style={isMobile ? {
              transform: `translateX(-50%) translateY(${scrollY * -0.3}px)`,
              opacity: Math.max(0, 1 - (scrollY * 0.003)),
              transition: 'transform 0.4s ease-out, opacity 0.3s ease-out',
            } : {}}
          >
            <div className="rotate-90 scale-[0.35] sm:scale-50">
              <DNAHelix scrollProgress={heroScrollProgress} />
            </div>
          </div>

          <div className="flex w-full items-end justify-between gap-8">
            <div className="w-full max-w-4xl lg:flex-1">
              <p 
                className="mb-4 animate-in fade-in slide-in-from-bottom-4 font-sans text-xs uppercase tracking-widest text-foreground/60 duration-1000 sm:mb-4 sm:text-sm"
                style={isMobile ? { 
                  transform: `translateY(${scrollY * 0.1}px)`,
                  transition: 'transform 0.3s ease-out'
                } : {}}
              >
                {t.openingText}
              </p>
              <h1 
                className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-3xl font-light leading-[1.15] tracking-tight text-foreground duration-1000 sm:mb-6 sm:text-5xl sm:leading-[1.1] md:mb-8 md:text-6xl lg:text-7xl xl:text-8xl"
                style={isMobile ? { 
                  transform: `translateY(${scrollY * 0.15}px) scale(${1 - (scrollY * 0.0002)})`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                } : {}}
              >
                <span className="text-balance">
                  {hero.titleLines[0]}
                  <br />
                  {hero.titleLines[1]}
                </span>
              </h1>

              <p 
                className="mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 font-sans text-base leading-[1.7] text-foreground/80 duration-1000 delay-200 sm:mb-8 sm:text-base md:mb-10 md:text-lg lg:text-xl"
                style={isMobile ? { 
                  transform: `translateY(${scrollY * 0.2}px)`,
                  opacity: Math.max(0, 1 - (scrollY * 0.002)),
                  transition: 'transform 0.5s ease-out, opacity 0.3s ease-out'
                } : {}}
              >
                <span className="text-pretty">
                  {hero.description}
                </span>
              </p>
              <div 
                className="flex w-full animate-in fade-in slide-in-from-bottom-4 flex-col gap-3 duration-1000 delay-300 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
                style={isMobile ? { 
                  transform: `translateY(${scrollY * 0.25}px) scale(${Math.max(0.9, 1 - (scrollY * 0.0003))})`,
                  opacity: Math.max(0, 1 - (scrollY * 0.0025)),
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out'
                } : {}}
              >
                <MagneticButton size="lg" variant="primary" className="w-full text-sm sm:w-auto sm:text-base" onClick={() => scrollToSection(4)}>
                  {hero.primaryCta}
                </MagneticButton>
                <MagneticButton size="lg" variant="secondary" className="w-full text-sm sm:w-auto sm:text-base" onClick={() => scrollToSection(1)}>
                  {hero.secondaryCta}
                </MagneticButton>
              </div>
            </div>

            {/* DNA Helix with Vertical Text - Only on desktop with good performance */}
            {shouldRenderShader && (
              <div className="hidden xl:flex xl:items-center xl:gap-4 xl:-ml-12">
                {/* DNA Helix */}
                <DNAHelix scrollProgress={heroScrollProgress} />
                {/* Vertical Text */}
                <div className="flex items-center">
                  <p 
                    className="animate-in fade-in slide-in-from-right-8 font-sans text-sm font-light tracking-[0.3em] text-foreground/60 duration-1000 delay-500 xl:text-base 2xl:text-lg"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    {t.verticalText}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-in fade-in duration-1000 delay-500 xl:block">
            <div className="flex items-center gap-2 sm:gap-3">
              <p className="font-sans text-xs uppercase tracking-widest text-foreground/70 sm:text-xs">{t.scrollText}</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md sm:h-6 sm:w-12">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary/80 sm:h-2 sm:w-2" />
              </div>
            </div>
          </div>
        </section>

        <ConceptSection />
        <ServicesSection />
        <GallerySection />
        <MembershipSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
