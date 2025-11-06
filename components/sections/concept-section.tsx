"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useTranslation } from "@/hooks/use-translation"
import { DNAHelix } from "@/components/dna-helix"
import { useState, useEffect } from "react"

export function ConceptSection() {
  const { ref: titleRef, isVisible: titleVisible } = useReveal(0.3)
  const { ref: contentRef, isVisible: contentVisible } = useReveal(0.3)
  const { ref: dividerRef, isVisible: dividerVisible } = useReveal(0.3)
  const { t } = useTranslation()
  const [scrollProgress, setScrollProgress] = useState(0)

  const concept = t.concept

  // Track scroll for DNA helix animation
  useEffect(() => {
    const handleScroll = () => {
      if (dividerRef.current) {
        const rect = dividerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementTop = rect.top
        const elementHeight = rect.height
        
        // Calculate progress when element is in view
        const progress = Math.max(0, Math.min(1, 
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        ))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="flex min-h-screen w-screen shrink-0 items-center justify-center px-5 py-12 pt-16 sm:px-6 sm:py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8 md:mb-12 lg:mb-16">
          <h2
            ref={titleRef}
            className={`mb-3 font-sans text-lg font-light leading-tight tracking-tight text-foreground transition-all duration-700 sm:mb-4 sm:text-xl md:mb-6 md:text-2xl lg:text-3xl xl:text-4xl ${
              titleVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
            }`}
          >
            <span className="text-balance">{concept.heading}</span>
          </h2>
          <div className="mx-auto h-px w-16 bg-primary/40 sm:w-20 md:w-24" />
        </div>

        {/* Enhanced Content Grid with DNA Helix Divider */}
        <div
          ref={contentRef}
          className={`grid gap-6 transition-all duration-700 sm:gap-8 md:grid-cols-3 md:gap-8 lg:gap-12 xl:gap-16 ${
            contentVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Left Column - Vision */}
          <div className="space-y-4 sm:space-y-5 md:space-y-7">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2">
              <p className="font-sans text-xs uppercase tracking-widest text-primary sm:text-xs">{concept.vision}</p>
            </div>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-sans text-base leading-relaxed text-foreground/90 sm:text-lg md:text-xl">
                <span className="text-pretty font-medium">{concept.paragraph1.split(".")[0]}.</span>{" "}
                <span className="text-pretty text-foreground/75">{concept.paragraph1.split(".").slice(1).join(".").trim()}</span>
              </p>
            </div>
            <div className="border-l-2 border-primary/20 pl-4 sm:pl-5 md:pl-6">
              <p className="font-sans text-sm leading-relaxed text-foreground/70 sm:text-base md:text-lg">
                <span className="text-pretty">{concept.paragraph2}</span>
              </p>
            </div>
            {concept.paragraph3 && (
              <p className="font-sans text-xs leading-relaxed text-foreground/60 italic sm:text-sm md:text-base">
                <span className="text-pretty">{concept.paragraph3}</span>
              </p>
            )}
          </div>

          {/* Center Column - DNA Helix Divider */}
          <div 
            ref={dividerRef}
            className="flex items-center justify-center md:order-2"
          >
            {/* Mobile: Horizontal (rotated 90°) */}
            <div className="rotate-90 scale-[0.35] md:hidden">
              <DNAHelix scrollProgress={scrollProgress} />
            </div>
            {/* Desktop: Vertical */}
            <div className="hidden scale-75 md:block md:scale-90 lg:scale-100">
              <DNAHelix scrollProgress={scrollProgress} />
            </div>
          </div>

          {/* Right Column - Methodology */}
          <div className="relative space-y-4 sm:space-y-5 md:order-3 md:space-y-7">
            <div className="relative z-10 inline-block rounded-full bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2">
              <p className="font-sans text-xs uppercase tracking-widest text-primary sm:text-xs">{concept.methodology}</p>
            </div>
            <div className="relative z-10 flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-5">
              {concept.features.map((feature: any, i: number) => (
              <div
                key={i}
                className="group w-full max-w-sm rounded-lg border border-border/50 bg-card/30 p-4 text-center backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/50 hover:shadow-md sm:rounded-xl sm:p-5 md:max-w-none md:p-6 md:hover:scale-102 active:border-primary/30 active:bg-card/50"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <h3 className="mb-1.5 font-sans text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary sm:mb-2 sm:text-base md:text-lg">
                  {feature.title}
                </h3>
                {/* Mobile: Always show text, Desktop: Show on hover */}
                <div className="grid grid-rows-[1fr] transition-all duration-500 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <p className="overflow-hidden font-sans text-xs leading-relaxed text-foreground/60 transition-all duration-500 sm:text-sm"
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <span className="block pt-1.5 sm:pt-2">{feature.description}</span>
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
