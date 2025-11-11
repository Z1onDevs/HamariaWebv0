"use client"

import dynamic from "next/dynamic"
import { CustomCursor } from "@/components/custom-cursor"
import { ConceptSection } from "@/components/sections/concept-section"
import { ServicesSection } from "@/components/sections/services-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MembershipSection } from "@/components/sections/membership-section"
import { MagneticButton } from "@/components/magnetic-button"
import { MobileNav } from "@/components/mobile-nav"
import { SectionDots } from "@/components/section-dots"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/hooks/use-translation"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useScrollProgress } from "@/hooks/use-scroll-progress"
import { useRef, useEffect, useState } from "react"
import site from "@/content/site.json"

// Lazy load heavy components for better performance
const ShaderWrapper = dynamic(() => import("@/components/shader-wrapper").then(mod => ({ default: mod.ShaderWrapper })), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-gradient-to-br from-background via-background to-primary/5" />
})

const GrainOverlay = dynamic(() => import("@/components/grain-overlay").then(mod => ({ default: mod.GrainOverlay })), {
  ssr: false
})

const DNAHelix = dynamic(() => import("@/components/dna-helix").then(mod => ({ default: mod.DNAHelix })), {
  ssr: false
})

const HeartbeatTriangle = dynamic(() => import("@/components/heartbeat-triangle").then(mod => ({ default: mod.HeartbeatTriangle })), {
  ssr: false
})

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()
  const [heroScrollProgress, setHeroScrollProgress] = useState(0)
  const [heroSketchOffset, setHeroSketchOffset] = useState(0)
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
  const [showNavContent, setShowNavContent] = useState(true)
  const lastScrollY = useRef(0)
  
  useEffect(() => {
    if (!isMobile) return
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Hide nav content when scrolling down, show when scrolling up
      // Only hide after scrolling past 100px to avoid flickering at top
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setShowNavContent(false)
        } else {
          // Scrolling up
          setShowNavContent(true)
        }
      } else {
        // Near top of page, always show
        setShowNavContent(true)
      }
      
      lastScrollY.current = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  // Track page view
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).clarity) {
      ;(window as any).clarity("set", "page_view", "home")
    }
  }, [])

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
          const progress = scrollLeft / sectionWidth
          setHeroScrollProgress(progress)
          // Parallax effect: 50px max movement
          setHeroSketchOffset(progress * 50)
        }

        if (newSection !== currentSection && newSection >= 0 && newSection <= 5) {
          setCurrentSection(newSection)
          // Track section navigation
          if (typeof window !== "undefined" && (window as any).clarity) {
            const sectionNames = ["hero", "concept", "services", "gallery", "membership", "contact"]
            ;(window as any).clarity("event", "section_navigation", {
              section: sectionNames[newSection] || newSection,
            })
          }
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
          className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 sm:gap-3 xl:opacity-100 xl:translate-x-0 ${
            isMobile && !showNavContent 
              ? "opacity-0 -translate-x-4 pointer-events-none" 
              : "opacity-100 translate-x-0"
          }`}
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
          <div 
            className={`flex items-center gap-1 border-r border-foreground/20 pr-2 sm:pr-3 transition-all duration-300 xl:opacity-100 xl:translate-x-0 ${
              isMobile && !showNavContent 
                ? "opacity-0 translate-x-4 pointer-events-none" 
                : "opacity-100 translate-x-0"
            }`}
          >
            <button
              onClick={() => {
                setLanguage("en")
                if (typeof window !== "undefined" && (window as any).clarity) {
                  ;(window as any).clarity("event", "language_change", { language: "en" })
                }
              }}
              className={`font-mono text-xs uppercase tracking-wide transition-colors sm:text-xs ${
                language === "en" ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              EN
            </button>
            <span className="text-foreground/20">|</span>
            <button
              onClick={() => {
                setLanguage("es")
                if (typeof window !== "undefined" && (window as any).clarity) {
                  ;(window as any).clarity("event", "language_change", { language: "es" })
                }
              }}
              className={`font-mono text-xs uppercase tracking-wide transition-colors sm:text-xs ${
                language === "es" ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              ES
            </button>
          </div>
          
          {/* Desktop Apply Button - Fades out on services, spaces, and membership sections */}
          <MagneticButton 
            variant="primary" 
            className={`hidden text-xs transition-opacity duration-500 sm:text-sm xl:flex ${
              [2, 3, 4].includes(currentSection) ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            onClick={() => {
              scrollToSection(4)
              if (typeof window !== "undefined" && (window as any).clarity) {
                ;(window as any).clarity("event", "cta_click", { 
                  button: "header_apply",
                  destination: "membership"
                })
              }
            }}
          >
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
        <section className="relative flex min-h-screen w-screen shrink-0 items-end px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 md:px-8 md:pb-20 md:pt-24 lg:px-12 lg:pb-24">
          {/* Mobile/Tablet Hero Sketch - Highly Visible & Larger - Centered - Cropped */}
          <div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute left-1/2 top-[30%] w-[65vw] h-[36vh] max-h-[360px] opacity-80 -translate-x-1/2 -translate-y-1/2 sm:top-[32%] md:top-[35%] md:opacity-85 md:w-[70vw] md:h-[40vh] md:max-h-[400px]">
              <div className="relative h-full w-full overflow-hidden" style={{ clipPath: 'inset(10% 0% 10% 0%)' }}>
                <img 
                  src="/hero-sketch.png" 
                  alt="Hamaria wellness visualization"
                  width="800"
                  height="600"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="absolute inset-0 w-full object-contain object-center"
                  style={{ 
                    opacity: 0.9,
                    height: '125%',
                    top: '-12.5%'
                  }}
                />
              </div>
              
              {/* Corner frames - Mobile/Tablet */}
              <div className="absolute -left-2 -top-2 h-10 w-10 border-l-2 border-t-2 border-primary/30 sm:h-12 sm:w-12 md:h-14 md:w-14" />
              <div className="absolute -bottom-2 -right-2 h-10 w-10 border-b-2 border-r-2 border-primary/30 sm:h-12 sm:w-12 md:h-14 md:w-14" />
            </div>
          </div>

          {/* Desktop Hero Sketch - Constrained for large screens */}
          <div className="pointer-events-none absolute top-28 right-0 hidden lg:block">
            <div className="relative h-[60vh] w-[42vw] max-h-[650px] max-w-[550px] xl:h-[70vh] xl:w-[46vw] xl:max-h-[750px] xl:max-w-[650px] 2xl:h-[75vh] 2xl:w-[40vw] 2xl:max-h-[800px] 2xl:max-w-[700px]">
              <img
                src="/hero-sketch.png"
                alt="Hamaria wellness visualization"
                width="700"
                height="800"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-contain object-center"
                style={{ opacity: 0.95 }}
              />
              
              {/* Corner frames - Larger */}
              <div className="absolute -left-4 -top-4 h-16 w-16 border-l-2 border-t-2 border-primary/30 xl:h-20 xl:w-20" />
              <div className="absolute -bottom-4 -right-4 h-16 w-16 border-b-2 border-r-2 border-primary/30 xl:h-20 xl:w-20" />
            </div>
          </div>

          <div className="flex w-full items-end justify-between gap-6 lg:gap-8">
            <div className="w-full max-w-3xl lg:max-w-4xl lg:flex-1">
              <p 
                className="mb-3 animate-in fade-in slide-in-from-bottom-4 font-sans text-xs uppercase tracking-widest text-foreground/60 duration-1000 sm:mb-4 sm:text-sm 2xl:text-base"
                style={isMobile ? { 
                  transform: `translateY(${scrollY * 0.1}px)`,
                  transition: 'transform 0.3s ease-out'
                } : {}}
              >
                {t.openingText}
              </p>
              <h1 
                className="hero-heading mb-4 animate-in fade-in slide-in-from-bottom-8 font-sans text-3xl font-light leading-[1.15] text-foreground duration-1000 sm:mb-5 sm:text-4xl sm:leading-[1.1] md:mb-6 md:text-5xl lg:text-6xl xl:text-7xl"
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
                className="mb-5 max-w-xl animate-in fade-in slide-in-from-bottom-4 font-sans text-sm leading-[1.7] text-foreground/80 duration-1000 delay-200 sm:mb-6 sm:max-w-2xl sm:text-base md:mb-8 md:text-lg lg:text-xl lg:max-w-3xl"
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
                className="flex w-full animate-in fade-in slide-in-from-bottom-4 flex-col gap-2.5 duration-1000 delay-300 sm:w-auto sm:flex-row sm:items-center sm:gap-3"
                style={isMobile ? { 
                  transform: `translateY(${scrollY * 0.25}px) scale(${Math.max(0.9, 1 - (scrollY * 0.0003))})`,
                  opacity: Math.max(0, 1 - (scrollY * 0.0025)),
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out'
                } : {}}
              >
                <MagneticButton size="lg" variant="primary" className="hero-primary-button group relative overflow-hidden w-full text-sm sm:w-auto sm:text-base" onClick={() => scrollToSection(4)}>
                  <span className="relative z-10">{hero.primaryCta}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </MagneticButton>
                <MagneticButton size="lg" variant="secondary" className="hero-secondary-button w-full text-sm sm:w-auto sm:text-base" onClick={() => scrollToSection(1)}>
                  {hero.secondaryCta}
                </MagneticButton>
              </div>
            </div>

            {/* Vertical Text Only - DNA Helix moved to concept section */}
            {shouldRenderShader && (
              <div className="hidden xl:flex xl:items-center xl:gap-4 xl:-ml-12">
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

          {/* Scroll Progress Indicator - Desktop Only */}
          {!isMobile && (
            <div className="scroll-progress-indicator hidden xl:block animate-in fade-in duration-1000 delay-700">
              <div 
                className="scroll-progress-bar" 
                style={{ height: `${(currentSection / 5) * 100}%` }}
              />
            </div>
          )}
        </section>

        <ConceptSection />
        {/* DNA Helix - Mobile Only (between methodology and services) - Minimal Space */}
        <div className="flex w-screen shrink-0 items-center justify-center md:hidden" style={{ minHeight: 'auto', height: 'auto', padding: 0, margin: 0 }}>
          <div className="rotate-90 scale-[0.35]" style={{ margin: 0, padding: 0 }}>
            <DNAHelix scrollProgress={0.5} />
          </div>
        </div>
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
