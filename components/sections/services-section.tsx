"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useState, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { useTranslation } from "@/hooks/use-translation"
import { FilteredServices } from "@/components/filtered-services"
import { InteractiveServiceTag } from "@/components/interactive-service-tag"
import { TypingTherapies } from "@/components/typing-therapies"
import Image from "next/image"

interface ServiceTagConfig {
  id: string
  label: string
  position: { x: number; y: number }
  side: "left" | "right"
  verticalPosition: number
  color: string
  categoryId?: string
  subcategoryId?: string
  categories?: string[]
  subcategories?: string[]
}

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)
  const { t } = useTranslation()
  const services = t.services
  const therapiesData = t.therapies || {}
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  const [activeTagId, setActiveTagId] = useState<string | null>(null)
  const [prefilterCategories, setPrefilterCategories] = useState<string[]>([])
  const [prefilterSubcategories, setPrefilterSubcategories] = useState<string[]>([])

  // Count therapies per category/subcategory
  const therapies = therapiesData.items || []
  const categories = therapiesData.categories || []

  const getCategoryCount = (categoryId: string) => {
    return therapies.filter(therapy => therapy.categories.includes(categoryId)).length
  }

  const getSubcategoryCount = (subcategoryId: string) => {
    return therapies.filter(therapy => therapy.subcategories.includes(subcategoryId)).length
  }

  // Get featured therapy names for a category/subcategory (first 4 as featured)
  const getFeaturedTherapyNames = (categoryId?: string, subcategoryId?: string): string[] => {
    let filtered = therapies
    
    if (categoryId) {
      filtered = filtered.filter(t => t.categories.includes(categoryId))
    }
    if (subcategoryId) {
      filtered = filtered.filter(t => t.subcategories.includes(subcategoryId))
    }
    
    // Return first 4 as "featured" therapies
    return filtered.slice(0, 4).map(t => t.name)
  }

  // Service tag configuration - 4 tags positioned inside figure (Olive Green Theme)
  const serviceTags: ServiceTagConfig[] = useMemo(() => [
    // TOP LEFT
    {
      id: "longevity-tech",
      label: "Longevity Technology",
      position: { x: 15, y: 20 },
      side: "left",
      verticalPosition: 1,
      color: "#6B8E23",
      categoryId: "performance",
    },
    // BOTTOM LEFT
    {
      id: "wellness-spa",
      label: "Wellness Spa",
      position: { x: 15, y: 80 },
      side: "left",
      verticalPosition: 2,
      color: "#6B8E23",
      categoryId: "wellness",
    },
    
    // TOP RIGHT
    {
      id: "aesthetics",
      label: "Aesthetics",
      position: { x: 85, y: 20 },
      side: "right",
      verticalPosition: 1,
      color: "#6B8E23",
      categoryId: "aesthetics",
    },
    // BOTTOM RIGHT
    {
      id: "diagnostics",
      label: "Diagnostics",
      position: { x: 85, y: 80 },
      side: "right",
      verticalPosition: 2,
      color: "#6B8E23",
      categoryId: "diagnostics",
    },
  ], [])

  // Enhance tags with computed counts and featured therapy names
  const enhancedTags = useMemo(() => {
    return serviceTags.map(tag => {
      let count = 0
      
      if (tag.categoryId) {
        count = getCategoryCount(tag.categoryId)
      } else if (tag.subcategoryId) {
        count = getSubcategoryCount(tag.subcategoryId)
      } else if (tag.categories || tag.subcategories) {
        count = therapies.filter(therapy => {
          const catMatch = tag.categories?.length ? therapy.categories.some(c => tag.categories!.includes(c)) : true
          const subMatch = tag.subcategories?.length ? therapy.subcategories.some(s => tag.subcategories!.includes(s)) : true
          return catMatch && subMatch
        }).length
      }
      
      return {
        ...tag,
        count,
        therapyNames: getFeaturedTherapyNames(tag.categoryId, tag.subcategoryId)
      }
    })
  }, [serviceTags, therapies])

  // Get all featured therapies for constant display
  const allFeaturedTherapies = useMemo(() => {
    const allTherapies: string[] = []
    enhancedTags.forEach(tag => {
      if (tag.therapyNames && tag.therapyNames.length > 0) {
        allTherapies.push(...tag.therapyNames)
      }
    })
    // Remove duplicates
    return Array.from(new Set(allTherapies))
  }, [enhancedTags])

  // Get current hovered/active tag data, or use all featured as default
  const currentTag = useMemo(() => {
    const tagId = hoveredTag || activeTagId
    if (tagId) {
      return enhancedTags.find(t => t.id === tagId) || null
    }
    // Return default "all featured" when no tag is hovered
    return {
      id: 'all-featured',
      label: 'Featured Therapies',
      color: '#6B8E23',
      therapyNames: allFeaturedTherapies,
      count: allFeaturedTherapies.length,
    }
  }, [hoveredTag, activeTagId, enhancedTags, allFeaturedTherapies])

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
          setActiveTagId(null)
          setPrefilterCategories([])
          setPrefilterSubcategories([])
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

  const handleTagClick = (tag: ServiceTagConfig) => {
    setActiveTagId(tag.id)
    
    // Set prefilter based on tag configuration
    if (tag.categoryId) {
      setPrefilterCategories([tag.categoryId])
      setPrefilterSubcategories([])
    } else if (tag.subcategoryId) {
      setPrefilterCategories([])
      setPrefilterSubcategories([tag.subcategoryId])
    } else if (tag.categories || tag.subcategories) {
      setPrefilterCategories(tag.categories || [])
      setPrefilterSubcategories(tag.subcategories || [])
    }
    
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    // Small delay before clearing filters to avoid flicker
    setTimeout(() => {
      setActiveTagId(null)
      setPrefilterCategories([])
      setPrefilterSubcategories([])
    }, 300)
  }

  return (
    <>
      <section
        ref={ref}
        className="flex min-h-screen w-screen shrink-0 snap-start items-center justify-center px-4 py-8 pt-12 sm:px-6 sm:py-12 sm:pt-16 md:px-8 md:py-16 md:pt-20"
      >
        <div className="mx-auto w-full max-w-[1600px] px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Section Title */}
          <div
            className={`mb-3 text-center transition-all duration-700 sm:mb-4 md:mb-6 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="mb-1.5 font-sans text-lg font-extralight tracking-wide text-foreground sm:mb-2 sm:text-xl md:text-2xl lg:text-3xl">
              {services.title || "Our Services"}
            </h2>
            <p className="mx-auto max-w-xl text-[11px] font-light leading-relaxed text-foreground/60 sm:text-xs md:text-sm">
              {services.subtitle || "Explore our comprehensive wellness offerings"}
            </p>
          </div>

          {/* Interactive Image with Tags */}
          <div className="relative overflow-hidden">
            {/* Main Container with Tags */}
            <div
              className={`relative mx-auto max-w-full transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {/* Figure Container with Overlaid Tags - Seamlessly Integrated */}
              <div className="relative mx-auto w-full max-w-xl md:max-w-2xl">
                {/* Main Image Container - Responsive Height */}
                <div className="relative w-full h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] max-h-[500px]">
                  <Image
                    src="/services figure.png"
                    alt="Hamaria Services"
                    fill
                    className="object-contain opacity-90"
                    priority
                    sizes="(max-width: 768px) 95vw, (max-width: 1024px) 600px, 672px"
                  />
                  
                  {/* Tags Positioned Inside Container (Desktop) */}
                  <div className="hidden md:block">
                    {enhancedTags.map((tag, index) => (
                      <div
                        key={tag.id}
                        className="absolute"
                        style={{
                          left: `${tag.position.x}%`,
                          top: `${tag.position.y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <InteractiveServiceTag
                          id={tag.id}
                          label={tag.label}
                          position={tag.position}
                          side={tag.side}
                          verticalPosition={tag.verticalPosition}
                          color={tag.color}
                          count={tag.count}
                          delay={200 + index * 100}
                          isActive={activeTagId === tag.id}
                          onClick={() => handleTagClick(tag)}
                          onHover={(isHovered) => setHoveredTag(isHovered ? tag.id : null)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

                  {/* Connection Lines from Tags to Figure Center (SVG Overlay) */}
                  <svg
                    className="pointer-events-none absolute inset-0 hidden overflow-visible md:block"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <defs>
                      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6B8E23" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#6B8E23" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6B8E23" stopOpacity="0.1" />
                      </linearGradient>
                      
                      <linearGradient id="activeConnectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6B8E23" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#6B8E23" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#6B8E23" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    
                    {/* Draw lines from each tag to image center */}
                    {enhancedTags.map(tag => {
                      const isActive = hoveredTag === tag.id || activeTagId === tag.id
                      return (
                        <line
                          key={`line-${tag.id}`}
                          x1={`${tag.position.x}%`}
                          y1={`${tag.position.y}%`}
                          x2="50%"
                          y2="50%"
                          stroke={isActive ? "url(#activeConnectionGradient)" : "url(#connectionGradient)"}
                          strokeWidth={isActive ? "2" : "1"}
                          strokeDasharray="4,4"
                          className={isActive ? "animate-pulse" : ""}
                          style={{
                            opacity: isActive ? 1 : 0.4,
                            transition: 'all 0.3s ease-in-out',
                            animationDuration: '2s'
                          }}
                        />
                      )
                    })}
                    
                    {/* Animated dots traveling along active lines */}
                    {enhancedTags.map(tag => {
                      const isActive = hoveredTag === tag.id || activeTagId === tag.id
                      if (!isActive) return null
                      
                      const dx = 50 - tag.position.x
                      const dy = 50 - tag.position.y
                      
                      return (
                        <circle
                          key={`dot-${tag.id}`}
                          r="3"
                          fill="#6B8E23"
                          opacity="0.8"
                        >
                          <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            path={`M 0,0 L ${dx * 10},${dy * 10}`}
                          />
                          <animate
                            attributeName="opacity"
                            values="0;0.8;0"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            from={`${tag.position.x * 10} ${tag.position.y * 10}`}
                            to="500 500"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )
                    })}
                  </svg>
                </div>
              
              {/* Mobile Tags (Below Image) */}
              <div className="mt-6 grid grid-cols-2 gap-3 md:hidden">
                {enhancedTags.map((tag, index) => (
                    <button
                    key={tag.id}
                    onClick={() => handleTagClick(tag)}
                    className="rounded-lg border-2 px-4 py-3 text-left transition-all active:scale-95"
                        style={{
                      backgroundColor: activeTagId === tag.id ? `${tag.color}20` : `${tag.color}10`,
                      borderColor: activeTagId === tag.id ? tag.color : `${tag.color}60`,
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <span
                        className="text-sm font-medium"
                        style={{ color: tag.color }}
                      >
                        {tag.label}
                      </span>
                      <span
                        className="text-xs font-light opacity-70"
                        style={{ color: tag.color }}
                      >
                        {tag.count} therapies
                      </span>
                    </div>
                  </button>
                ))}
                  </div>

            {/* Typing Animation Area - Below Image (Always Active) */}
            <div
              className={`mx-auto mt-4 w-full max-w-2xl transition-all duration-700 sm:mt-5 md:mt-6 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <TypingTherapies
                therapies={currentTag?.therapyNames || []}
                color={currentTag?.color || '#6B8E23'}
                isActive={true}
              />
            </div>
          </div>

          {/* Explore All Button */}
          <div
            className={`mt-4 flex justify-center transition-all duration-700 sm:mt-5 md:mt-6 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <button
              onClick={() => {
                setActiveTagId(null)
                setPrefilterCategories([])
                setPrefilterSubcategories([])
                setIsModalOpen(true)
              }}
              className="group relative overflow-hidden rounded-full border border-primary/30 bg-background/40 px-8 py-3 font-sans text-sm font-medium text-foreground shadow-lg shadow-primary/20 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/60 hover:shadow-xl hover:shadow-primary/30 active:scale-95 sm:px-10 sm:py-3.5 md:px-12 md:py-4 md:text-base lg:text-lg"
            >
              <span className="relative z-10">{t.moreLink || "Explore All Services"}</span>
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {mounted && isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4"
          onClick={handleModalClose}
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
              onClick={handleModalClose}
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

              {/* Filtered Services Component with Prefilters */}
              <FilteredServices 
                prefilterCategories={prefilterCategories}
                prefilterSubcategories={prefilterSubcategories}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
