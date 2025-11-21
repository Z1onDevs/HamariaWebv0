"use client"

import { memo } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { Check, Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { addOnPrograms } from "@/lib/membership-data"

interface NewMembershipSectionProps {
  scrollToSection?: (section: string) => void
}

export const NewMembershipSection = memo(function NewMembershipSection({ 
  scrollToSection 
}: NewMembershipSectionProps) {
  const { ref, isVisible } = useReveal(0.2)
  const { t, language } = useTranslation()
  const router = useRouter()

  const membership = t?.memberships?.membership || {
    name: 'Membership',
    description: 'Complete wellness access',
    monthlyPrice: '350',
    yearlyPrice: '3780',
    color: '#4A90E2'
  }

  return (
    <section
      ref={ref}
      data-section="membership"
      data-version="2.0"
      className="relative flex items-center justify-center px-4 py-20 sm:px-6 sm:py-24 md:px-8 lg:px-12 lg:py-16 xl:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div 
          className={`mb-5 sm:mb-6 lg:mb-6 xl:mb-5 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-foreground">
            {membership.name}
          </h2>
        </div>

        {/* 2-Card Layout */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* LEFT CARD: Membership Overview */}
          <div 
            className="rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm p-5 sm:p-6 lg:p-7 xl:p-8 shadow-lg hover:shadow-xl hover:border-border/60 transition-all duration-300"
          >
            <div className="space-y-2.5 lg:space-y-3">
              {/* Title */}
              <div>
                <h3 className="font-sans text-base sm:text-lg lg:text-xl font-light text-foreground mb-1.5">
                  {membership.name}
                </h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-foreground/70 leading-relaxed">
                  {membership.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="space-y-1.5 py-3 border-y border-border/30">
                {/* Monthly */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-foreground/50 mb-0.5">
                      {t?.memberships?.monthlyPrice || 'Monthly'}
                    </p>
                    <p className="font-sans text-xl sm:text-2xl lg:text-3xl font-light text-foreground">
                      €{membership.monthlyPrice}
                      <span className="text-[10px] sm:text-xs text-foreground/60 ml-1">/ {language === "es" ? "mes" : "mo"}</span>
                    </p>
                  </div>
                </div>

                {/* Yearly */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-foreground/50 mb-0.5">
                      {t?.memberships?.yearlyPrice || 'Yearly'}
                    </p>
                    <p className="font-sans text-lg sm:text-xl lg:text-2xl font-light text-foreground">
                      €{membership.yearlyPrice}
                      <span className="text-[10px] sm:text-xs text-foreground/60 ml-1">/ {language === "es" ? "año" : "yr"}</span>
                    </p>
                  </div>
                  <div 
                    className="px-2 py-0.5 rounded-full text-[9px] font-medium"
                    style={{
                      backgroundColor: membership.color,
                      color: 'white',
                    }}
                  >
                    {language === "es" ? "-10%" : "-10%"}
                  </div>
                </div>
              </div>

              {/* What's Included - 4 Categories */}
              <div>
                <h4 className="text-xs sm:text-sm font-medium text-foreground mb-1.5">
                  {t?.memberships?.whatsIncluded || "What's Included"}
                </h4>
                <div className="space-y-1.5 xl:space-y-1">
                  {/* Wellness */}
                  <div className="flex items-start gap-2">
                    <div 
                      className="rounded-full p-1 mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: `${membership.color}20` }}
                    >
                      <Check className="h-3 w-3" style={{ color: membership.color }} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        {t.memberships?.inclusionCategories?.wellness?.title || "Wellness"}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-foreground/60 leading-snug">
                        {t.memberships?.inclusionCategories?.wellness?.description || "Unlimited wellness access"}
                      </p>
                    </div>
                  </div>

                  {/* Fitness */}
                  <div className="flex items-start gap-2">
                    <div 
                      className="rounded-full p-1 mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: `${membership.color}20` }}
                    >
                      <Check className="h-3 w-3" style={{ color: membership.color }} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        {t.memberships?.inclusionCategories?.fitness?.title || "Fitness"}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-foreground/60 leading-snug">
                        {t.memberships?.inclusionCategories?.fitness?.description || "Unlimited fitness access"}
                      </p>
                    </div>
                  </div>

                  {/* Longevity Technology */}
                  <div className="flex items-start gap-2">
                    <div 
                      className="rounded-full p-1 mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: `${membership.color}20` }}
                    >
                      <Check className="h-3 w-3" style={{ color: membership.color }} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        {t.memberships?.inclusionCategories?.longevityTech?.title || "Longevity Technology"}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-foreground/60 leading-snug">
                        {t.memberships?.inclusionCategories?.longevityTech?.description || "Advanced longevity devices"}
                      </p>
                    </div>
                  </div>

                  {/* Diagnostics */}
                  <div className="flex items-start gap-2">
                    <div 
                      className="rounded-full p-1 mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: `${membership.color}20` }}
                    >
                      <Check className="h-3 w-3" style={{ color: membership.color }} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        {t.memberships?.inclusionCategories?.diagnostics?.title || "Diagnostics"}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-foreground/60 leading-snug">
                        {t.memberships?.inclusionCategories?.diagnostics?.description || "Comprehensive health diagnostics"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* View All Link */}
              <div className="pt-1">
                <button
                  onClick={() => router.push('/membership')}
                  className="group inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-primary hover:text-primary/80 transition-all"
                >
                  {language === "es" ? "Ver todas" : "View all"}
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <MagneticButton
                  variant="primary"
                  className="w-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 text-xs lg:text-sm py-2.5 lg:py-3 min-h-[40px] lg:min-h-[44px]"
                  onClick={() => scrollToSection?.("contact")}
                >
                  {t?.memberships?.applyNow || 'Apply Now'}
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* RIGHT CARD: Add-On Programs */}
          <div 
            className="rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm p-5 sm:p-6 lg:p-7 xl:p-8 shadow-lg hover:shadow-xl hover:border-border/60 transition-all duration-300"
          >
            <div>
              {/* Programs Header */}
              <div className="mb-3">
                <h3 className="font-sans text-sm sm:text-base lg:text-lg font-light text-foreground mb-1">
                  {t?.memberships?.addOnPrograms || 'Specialized Programs'}
                </h3>
                <p className="text-[9px] sm:text-[10px] text-foreground/60">
                  {t?.memberships?.addOnProgramsSubtitle || 'Curated programs for specific wellness goals'}
                </p>
                {/* Shared Feature Note */}
                <p className="text-[9px] sm:text-[10px] text-foreground/60 italic mt-1.5">
                  {t?.memberships?.programsNote || 'All programs include personalized protocols'}
                </p>
              </div>

              {/* Programs List */}
              <div className="space-y-2 xl:space-y-1.5">
                {addOnPrograms?.map((program, index) => (
                  <div
                    key={program?.id || index}
                    className="group relative rounded-md border border-border/30 bg-card/10 p-2 lg:p-2 xl:p-2 hover:bg-card/20 hover:border-border/50 transition-all duration-300"
                    style={{
                      borderLeftWidth: '3px',
                      borderLeftColor: program?.color || '#888',
                    }}
                  >
                    <div className="space-y-0.5">
                      {/* Program Name */}
                      <div className="flex items-start justify-between gap-1.5">
                        <h4 className="text-xs sm:text-sm lg:text-base font-medium text-foreground leading-tight">
                          {language === "es" ? (program?.nameES || program?.name) : (program?.name || '')}
                        </h4>
                        <div 
                          className="h-2 w-2 rounded-full flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: program?.color || '#888' }}
                        />
                      </div>

                      {/* Tagline */}
                      <p 
                        className="text-[8px] sm:text-[9px] uppercase tracking-wide font-medium"
                        style={{ color: program?.color || '#888' }}
                      >
                        {language === "es" ? (program?.taglineES || program?.tagline) : (program?.tagline || '')}
                      </p>

                      {/* Key Therapies */}
                      <p className="text-[10px] sm:text-xs text-foreground/70 leading-snug">
                        {(language === "es" ? program?.keyTherapiesES : program?.keyTherapies)?.join(', ') || ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Learn More Link */}
              <div className="mt-2.5 pt-2.5 border-t border-border/30">
                <button
                  onClick={() => router.push('/membership#programs-section')}
                  className="group inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-primary hover:text-primary/80 transition-all"
                >
                  {language === "es" ? "Ver detalles" : "View details"}
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
