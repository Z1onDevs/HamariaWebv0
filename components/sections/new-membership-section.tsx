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
      className="relative min-h-screen py-20 px-5 sm:px-6 md:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="mb-16 text-center">
            <div 
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-medium"
              style={{
                backgroundColor: `${membership.color}20`,
                color: membership.color,
                border: `1px solid ${membership.color}40`,
              }}
            >
              <Sparkles className="h-3 w-3" />
              {membership.tagline}
            </div>
            
            <h2 className="font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl mb-4">
              {membership.name}
            </h2>
            
            <p className="max-w-3xl mx-auto font-sans text-base text-foreground/70 md:text-lg">
              {membership.description}
            </p>
          </div>

          {/* Founders Offer Banner */}
          <div className="mb-12 rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center backdrop-blur-sm max-w-2xl mx-auto">
            <p className="font-sans text-lg font-medium text-foreground md:text-xl">
              {t.memberships.foundersOffer}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {t.memberships.limitedMembers}
            </p>
          </div>

          {/* Pricing Card */}
          <div className="mb-16 max-w-md mx-auto">
            <div 
              className="rounded-2xl border p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
              style={{
                backgroundColor: `${membership.color}08`,
                borderColor: `${membership.color}30`,
              }}
            >
              <div className="text-center mb-6">
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
                  {t.memberships.monthlyPrice}
                </p>
                <p className="font-sans text-5xl font-light text-foreground mb-1">
                  €{membership.monthlyPrice}
                </p>
                <p className="text-sm text-foreground/60">per month</p>
              </div>

              <div className="text-center pt-4 border-t border-foreground/10">
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
                  {t.memberships.yearlyPrice}
                </p>
                <p className="font-sans text-3xl font-light text-foreground mb-1">
                  €{membership.yearlyPrice}
                </p>
                <p className="text-sm text-foreground/60">{t.memberships.perYear}</p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16 max-w-5xl mx-auto">
            <h3 className="text-2xl font-light text-foreground mb-6 text-center">
              {t.memberships.whatsIncluded}
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {membership.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/20 p-4"
                >
                  <div
                    className="mt-0.5 rounded-full p-1 flex-shrink-0"
                    style={{ backgroundColor: `${membership.color}20` }}
                  >
                    <Check className="h-4 w-4" style={{ color: membership.color }} />
                  </div>
                  <p className="text-sm text-foreground/80">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unlimited Therapies */}
          <div className="mb-12">
            <h3 className="text-xl font-light text-foreground mb-4 text-center">
              {t.memberships.unlimitedAccess}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-6xl mx-auto">
              {unlimitedTherapies.map((therapy, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg border border-border/30 bg-card/10 p-3 hover:bg-card/20 transition-colors"
                >
                  <Check className="h-3 w-3 flex-shrink-0 text-primary" />
                  <span className="text-xs text-foreground/70">
                    {language === "es" ? therapy.nameES : therapy.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Limited Sessions */}
          <div className="mb-16">
            <h3 className="text-xl font-light text-foreground mb-4 text-center">
              {t.memberships.includedSessions}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {limitedTherapies.map((therapy, index) => {
                const allocation = therapy.baseAllocation
                if (allocation === 0 || !allocation) return null
                
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-border/40 bg-card/15 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">
                        {language === "es" ? therapy.nameES : therapy.name}
                      </p>
                      <p className="text-xs font-mono text-primary whitespace-nowrap">
                        {allocation} {therapy.name === "Guest passes" ? t.memberships.guestPasses : t.memberships.sessions}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Add-on Programs */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-light text-foreground mb-3">
                {t.memberships.addOnPrograms}
              </h3>
              <p className="text-foreground/70 max-w-2xl mx-auto text-sm">
                {t.memberships.addOnProgramsSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {addOnPrograms.map((program) => (
                <div
                  key={program.id}
                  className="rounded-xl border border-border/30 bg-card/10 p-6 hover:border-primary/40 hover:bg-card/20 transition-all group"
                  style={{
                    borderTopColor: `${program.color}40`,
                  }}
                >
                  <div className="mb-4">
                    <div 
                      className="inline-block rounded-full p-2 mb-3"
                      style={{ backgroundColor: `${program.color}20` }}
                    >
                      <div 
                        className="h-5 w-5 rounded-full"
                        style={{ backgroundColor: program.color }}
                      />
                    </div>
                    <h4 className="font-sans text-lg font-medium text-foreground mb-1">
                      {language === "es" ? program.nameES : program.name}
                    </h4>
                    <p className="text-xs font-medium text-foreground/50 mb-3">
                      {language === "es" ? program.taglineES : program.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-foreground/70 mb-4">
                    {language === "es" ? program.descriptionES : program.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs text-foreground/50 mb-2">Key features:</p>
                    <ul className="space-y-1">
                      {(language === "es" ? program.featuresES : program.features).slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-foreground/70">
                          <Check className="h-3 w-3 flex-shrink-0 text-primary mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/20">
                    <p className="text-xs text-foreground/50">
                      {language === "es" ? program.sessionCountES : program.sessionCount}
                    </p>
                    <button 
                      className="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all"
                      onClick={() => scrollToSection?.("contact")}
                    >
                      Learn more <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton
              variant="primary"
              className="w-full sm:w-auto shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
              onClick={() => scrollToSection?.("contact")}
            >
              {t.memberships.applyNow}
            </MagneticButton>
            
            <MagneticButton
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => {
                window.location.href = "/membership"
              }}
            >
              {t.memberships.learnMore}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
})

