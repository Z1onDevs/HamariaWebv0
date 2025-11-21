"use client"

import { memo } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { Check, Sparkles, ArrowRight } from "lucide-react"
import { 
  baseMembershipTherapies, 
  getUnlimitedTherapies, 
  getLimitedTherapies,
  addOnPrograms 
} from "@/lib/membership-data"

interface NewMembershipSectionProps {
  scrollToSection?: (section: string) => void
}

export const NewMembershipSection = memo(function NewMembershipSection({ 
  scrollToSection 
}: NewMembershipSectionProps) {
  const { ref, isVisible } = useReveal(0.3)
  const { t, language } = useTranslation()

  const membership = t.memberships.membership
  const unlimitedTherapies = getUnlimitedTherapies()
  const limitedTherapies = getLimitedTherapies()

  return (
    <section
      ref={ref}
      data-section="membership"
      className="relative w-screen shrink-0 flex items-center justify-center min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 overflow-visible"
    >
      <div className="mx-auto w-full max-w-4xl sm:max-w-5xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-6 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="mb-12 sm:mb-16 text-center">
            <div 
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs md:text-sm font-medium"
              style={{
                backgroundColor: `${membership.color}20`,
                color: membership.color,
                border: `1px solid ${membership.color}40`,
              }}
            >
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              {membership.tagline}
            </div>
            
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-4">
              {membership.name}
            </h2>
            
            <p className="max-w-3xl mx-auto font-sans text-sm sm:text-base md:text-lg text-foreground/70">
              {membership.description}
            </p>
          </div>

          {/* Founders Offer Banner */}
          <div className="mb-10 sm:mb-12 rounded-2xl border border-primary/40 bg-primary/10 p-4 sm:p-6 text-center backdrop-blur-sm max-w-2xl mx-auto">
            <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl font-medium text-foreground">
              {t.memberships.foundersOffer}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-foreground/70">
              {t.memberships.limitedMembers}
            </p>
          </div>

          {/* Pricing Card */}
          <div className="mb-12 sm:mb-16 max-w-md md:max-w-lg lg:max-w-xl mx-auto">
            <div 
              className="rounded-2xl border p-5 sm:p-6 md:p-8 lg:p-10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
              style={{
                backgroundColor: `${membership.color}08`,
                borderColor: `${membership.color}30`,
              }}
            >
              <div className="text-center mb-5">
                <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-foreground/50 mb-2">
                  {t.memberships.monthlyPrice}
                </p>
                <p className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-1">
                  €{membership.monthlyPrice}
                </p>
                <p className="text-sm md:text-base text-foreground/60">per month</p>
              </div>

              <div className="text-center pt-5 border-t border-foreground/10">
                <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-foreground/50 mb-2">
                  {t.memberships.yearlyPrice}
                </p>
                <p className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-1">
                  €{membership.yearlyPrice}
                </p>
                <p className="text-sm md:text-base text-foreground/60">{t.memberships.perYear}</p>
              </div>
            </div>
          </div>

          {/* Category Cards - Fitness, Wellness, Longevity */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-6 sm:mb-8 md:mb-10 text-center">
              {t.memberships.whatsIncluded}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 xl:gap-10 max-w-6xl mx-auto">
              {/* FITNESS CARD */}
              <div className="rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm p-5 sm:p-6 lg:p-7 xl:p-8 hover:bg-card/30 hover:border-border/60 transition-all duration-300 min-h-[44px]">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-5 text-center">💪</div>
                <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-foreground mb-2 md:mb-3 text-center">
                  {t.memberships.categories?.fitness?.title || "Fitness"}
                </h4>
                <p className="text-xs md:text-sm text-primary mb-3 md:mb-4 text-center font-medium uppercase tracking-wide">
                  {t.memberships.categories?.fitness?.subtitle || "Unlimited Training"}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-foreground/70 leading-relaxed text-center">
                  {t.memberships.categories?.fitness?.description || "Small group classes, personal training, Pilates reformer, mobility coaching, and outdoor training."}
                </p>
              </div>
              
              {/* WELLNESS CARD */}
              <div className="rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm p-5 sm:p-6 lg:p-7 xl:p-8 hover:bg-card/30 hover:border-border/60 transition-all duration-300 min-h-[44px]">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-5 text-center">💎</div>
                <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-foreground mb-2 md:mb-3 text-center">
                  {t.memberships.categories?.wellness?.title || "Wellness"}
                </h4>
                <p className="text-xs md:text-sm text-primary mb-3 md:mb-4 text-center font-medium uppercase tracking-wide">
                  {t.memberships.categories?.wellness?.subtitle || "Full Spa Access"}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-foreground/70 leading-relaxed text-center">
                  {t.memberships.categories?.wellness?.description || "Complete access to spa facilities including sauna, steam room, ice plunge, cryotherapy, and more."}
                </p>
              </div>
              
              {/* LONGEVITY CARD */}
              <div className="rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm p-5 sm:p-6 lg:p-7 xl:p-8 hover:bg-card/30 hover:border-border/60 transition-all duration-300 min-h-[44px] sm:col-span-2 lg:col-span-1">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-5 text-center">🧬</div>
                <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-foreground mb-2 md:mb-3 text-center">
                  {t.memberships.categories?.longevity?.title || "Longevity"}
                </h4>
                <p className="text-xs md:text-sm text-primary mb-3 md:mb-4 text-center font-medium uppercase tracking-wide">
                  {t.memberships.categories?.longevity?.subtitle || "Members Lounge & Health Tracking"}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-foreground/70 leading-relaxed text-center">
                  {t.memberships.categories?.longevity?.description || "Private lounge with longevity devices and comprehensive health monitoring."}
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-12 sm:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {membership.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/20 p-4 min-h-[44px]"
                >
                  <div
                    className="mt-0.5 rounded-full p-1 flex-shrink-0"
                    style={{ backgroundColor: `${membership.color}20` }}
                  >
                    <Check className="h-4 w-4" style={{ color: membership.color }} />
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/80">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unlimited Therapies */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-foreground mb-5 sm:mb-6 md:mb-8 text-center">
              {t.memberships.unlimitedAccess}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto">
              {unlimitedTherapies.map((therapy, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 md:gap-3 rounded-lg border border-border/30 bg-card/10 p-3 md:p-4 hover:bg-card/20 transition-colors min-h-[44px]"
                >
                  <Check className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0 text-primary" />
                  <span className="text-xs sm:text-sm md:text-base text-foreground/70 leading-snug">
                    {language === "es" ? therapy.nameES : therapy.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Limited Sessions */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-foreground mb-5 sm:mb-6 md:mb-8 text-center">
              {t.memberships.includedSessions}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-5xl mx-auto">
              {limitedTherapies.map((therapy, index) => {
                const allocation = therapy.baseAllocation
                if (allocation === 0 || !allocation) return null
                
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-border/40 bg-card/15 p-4 md:p-5 lg:p-6 min-h-[44px]"
                  >
                    <div className="flex items-start justify-between gap-3 md:gap-4">
                      <p className="text-xs sm:text-sm md:text-base font-medium text-foreground leading-snug">
                        {language === "es" ? therapy.nameES : therapy.name}
                      </p>
                      <p className="text-xs md:text-sm font-mono text-primary whitespace-nowrap font-semibold">
                        {allocation} {therapy.name === "Guest passes" ? t.memberships.guestPasses : t.memberships.sessions}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Add-on Programs */}
          <div className="mb-10 sm:mb-12 md:mb-16" data-section="programs">
            <div className="text-center mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-3 md:mb-4">
                {t.memberships.addOnPrograms}
              </h3>
              <p className="text-foreground/70 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base lg:text-lg">
                {t.memberships.addOnProgramsSubtitle}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-foreground/60 leading-relaxed">
                Enhance your membership with specialized programs designed for specific wellness goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
              {addOnPrograms.map((program) => (
                <div
                  key={program.id}
                  className="rounded-xl border-2 border-border/30 bg-card/10 p-5 sm:p-6 md:p-7 lg:p-8 hover:border-primary/40 hover:bg-card/20 transition-all group min-h-[44px]"
                  style={{
                    borderTopColor: `${program.color}60`,
                    borderTopWidth: '4px',
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="inline-flex items-center justify-center rounded-full p-3 md:p-4 mb-4 md:mb-5"
                      style={{ backgroundColor: `${program.color}20` }}
                    >
                      <div 
                        className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                        style={{ backgroundColor: program.color }}
                      />
                    </div>
                    <h4 className="font-sans text-lg sm:text-xl md:text-2xl font-medium text-foreground mb-2 md:mb-3">
                      {language === "es" ? program.nameES : program.name}
                    </h4>
                    <p className="text-xs md:text-sm font-medium uppercase tracking-wide mb-4 md:mb-5" style={{ color: program.color }}>
                      {language === "es" ? program.taglineES : program.tagline}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed mb-6 md:mb-8">
                      {language === "es" ? program.descriptionES : program.description}
                    </p>
                    <button 
                      className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-primary hover:text-primary/80 group-hover:gap-3 transition-all min-h-[44px] justify-center"
                      onClick={() => scrollToSection?.("contact")}
                    >
                      Learn more <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-stretch sm:items-center gap-3 sm:gap-4 md:gap-5 sm:flex-row sm:justify-center max-w-2xl mx-auto pt-4 md:pt-6">
            {/* PRIMARY: Apply Now */}
            <MagneticButton
              variant="primary"
              className="w-full sm:w-auto min-w-[200px] md:min-w-[240px] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 text-base md:text-lg lg:text-xl py-4 md:py-5 px-8 md:px-10 lg:px-12 min-h-[56px] md:min-h-[64px]"
              onClick={() => scrollToSection?.("contact")}
            >
              {t.memberships.applyNow}
            </MagneticButton>
            
            {/* SECONDARY: See Programs */}
            <MagneticButton
              variant="secondary"
              className="w-full sm:w-auto min-w-[200px] md:min-w-[240px] text-base md:text-lg lg:text-xl py-4 md:py-5 px-8 md:px-10 lg:px-12 border-2 min-h-[56px] md:min-h-[64px]"
              onClick={() => {
                // Scroll to add-on programs section within same page
                const programsSection = document.querySelector('[data-section="programs"]')
                if (programsSection) {
                  programsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              {t.memberships.seePrograms || "See Programs"}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
})

