"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useTranslation } from "@/hooks/use-translation"

export function ConceptSection() {
  const { ref: titleRef, isVisible: titleVisible } = useReveal(0.3)
  const { ref: contentRef, isVisible: contentVisible } = useReveal(0.3)
  const { t } = useTranslation()

  const concept = t.concept

  return (
    <section className="flex min-h-screen w-screen shrink-0 items-center justify-center px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-6xl pt-16 sm:pt-0">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10 md:mb-12 lg:mb-16">
          <h2
            ref={titleRef}
            className={`mb-4 font-sans text-lg font-light leading-tight tracking-tight text-foreground transition-all duration-700 sm:mb-5 sm:text-xl md:mb-6 md:text-2xl lg:text-3xl xl:text-4xl ${
              titleVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
            }`}
          >
            <span className="text-balance">{concept.heading}</span>
          </h2>
          <div className="mx-auto h-px w-16 bg-primary/40 sm:w-20 md:w-24" />
        </div>

        {/* Main Content Grid */}
        <div
          ref={contentRef}
          className={`grid gap-8 transition-all duration-700 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 ${
            contentVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Left Column - Introduction */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 sm:px-4 sm:py-1.5">
              <p className="font-sans text-[10px] uppercase tracking-widest text-primary sm:text-xs">{concept.vision}</p>
            </div>
            <p className="font-sans text-sm leading-relaxed text-foreground/80 sm:text-base md:text-lg">
              <span className="text-pretty">{concept.paragraph1}</span>
            </p>
            <p className="font-sans text-xs leading-relaxed text-foreground/60 sm:text-sm md:text-base">
              <span className="text-pretty">{concept.paragraph2}</span>
            </p>
            {concept.paragraph3 && (
              <p className="font-sans text-xs leading-relaxed text-foreground/70 sm:text-sm md:text-base">
                <span className="text-pretty">{concept.paragraph3}</span>
              </p>
            )}
          </div>

          {/* Right Column - Features */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {concept.features.map((feature: any, i: number) => (
              <div
                key={i}
                className="group rounded-lg border border-border/50 bg-card/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/50 sm:rounded-xl sm:p-5 md:p-6"
              >
                <h3 className="mb-1.5 font-sans text-sm font-medium text-foreground sm:mb-2 sm:text-base md:text-lg">
                  {feature.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-foreground/60 sm:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
