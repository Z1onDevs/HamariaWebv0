"use client"

import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { StructuredData } from "@/components/structured-data"
import { ArrowLeft, Check, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { 
  baseMembershipTherapies, 
  getUnlimitedTherapies, 
  getLimitedTherapies,
  addOnPrograms 
} from "@/lib/membership-data"

export default function MembershipPage() {
  const router = useRouter()
  const { t, language } = useTranslation()
  const [mounted, setMounted] = useState(false)

  const membership = t.memberships.membership
  const unlimitedTherapies = getUnlimitedTherapies()
  const limitedTherapies = getLimitedTherapies()

  useEffect(() => {
    setMounted(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    // Analytics tracking
    if (typeof window !== "undefined" && (window as any).clarity) {
      ;(window as any).clarity("set", "membership_detail_view", "hamaria")
    }
  }, [])

  // Structured data
  const membershipStructuredData = {
    name: membership.name,
    description: membership.description,
    price: membership.monthlyPrice.toString(),
  }

  if (!mounted) return null

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <StructuredData type="membership" data={membershipStructuredData} />
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <ShaderWrapper />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10 px-5 py-8 sm:px-6 md:px-8 lg:px-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mx-auto max-w-7xl">
          {/* Hero */}
          <div className="mb-12 text-center">
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
            
            <h1 className="font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl mb-4">
              {membership.name}
            </h1>
            
            <p className="max-w-3xl mx-auto font-sans text-lg text-foreground/70 md:text-xl">
              {membership.description}
            </p>
          </div>

          {/* Founders Offer */}
          <div className="mb-12 rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center backdrop-blur-sm max-w-2xl mx-auto">
            <p className="font-sans text-xl font-medium text-foreground">
              {t.memberships.foundersOffer}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {t.memberships.limitedMembers}
            </p>
          </div>

          {/* Pricing */}
          <div className="mb-16 max-w-md mx-auto">
            <div 
              className="rounded-2xl border p-8 backdrop-blur-sm shadow-xl"
              style={{
                backgroundColor: `${membership.color}08`,
                borderColor: `${membership.color}30`,
              }}
            >
              <div className="text-center mb-6">
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
                  {t.memberships.monthlyPrice}
                </p>
                <p className="font-sans text-6xl font-light text-foreground mb-2">
                  €{membership.monthlyPrice}
                </p>
                <p className="text-sm text-foreground/60">per month</p>
              </div>

              <div className="text-center pt-6 border-t border-foreground/10">
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
                  {t.memberships.yearlyPrice}
                </p>
                <p className="font-sans text-4xl font-light text-foreground mb-2">
                  €{membership.yearlyPrice}
                </p>
                <p className="text-sm text-foreground/60">{t.memberships.perYear}</p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-foreground mb-6 text-center">
              {t.memberships.whatsIncluded}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {membership.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/20 p-4"
                >
                  <div
                    className="mt-0.5 rounded-full p-1 flex-shrink-0"
                    style={{ backgroundColor: `${membership.color}20` }}
                  >
                    <Check className="h-5 w-5" style={{ color: membership.color }} />
                  </div>
                  <p className="text-sm text-foreground/80 font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-16 mb-16">
            {/* Unlimited Access */}
            <div>
              <h2 className="text-3xl font-light text-foreground mb-4 text-center">
                {t.memberships.unlimitedAccess}
              </h2>
              <p className="text-foreground/60 mb-6 text-center max-w-3xl mx-auto">
                Use these therapies as often as you like, no limits, no bookings required for most.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
                {unlimitedTherapies.map((therapy, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/20 p-4"
                  >
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-foreground/80">
                      {language === "es" ? therapy.nameES : therapy.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Limited Sessions */}
            <div>
              <h2 className="text-3xl font-light text-foreground mb-4 text-center">
                {t.memberships.includedSessions}
              </h2>
              <p className="text-foreground/60 mb-6 text-center max-w-3xl mx-auto">
                These premium services are included with your membership on an annual basis.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {limitedTherapies.map((therapy, index) => {
                  const allocation = therapy.baseAllocation
                  if (allocation === 0 || !allocation) return null
                  
                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-border/50 bg-card/20 p-5"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-sm font-medium text-foreground">
                          {language === "es" ? therapy.nameES : therapy.name}
                        </p>
                        <p className="text-lg font-mono font-bold text-primary whitespace-nowrap">
                          {allocation}
                        </p>
                      </div>
                      {therapy.duration && (
                        <p className="text-xs text-foreground/50">{therapy.duration} minutes per session</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Add-on Programs */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light text-foreground mb-3">
                {t.memberships.addOnPrograms}
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                {t.memberships.addOnProgramsSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {addOnPrograms.map((program) => (
                <div
                  key={program.id}
                  className="rounded-xl border border-border/30 bg-card/10 p-8 hover:border-primary/40 hover:bg-card/20 transition-all"
                  style={{
                    borderTopWidth: '3px',
                    borderTopColor: program.color,
                  }}
                >
                  <div className="mb-6">
                    <div 
                      className="inline-block rounded-full p-3 mb-4"
                      style={{ backgroundColor: `${program.color}20` }}
                    >
                      <div 
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: program.color }}
                      />
                    </div>
                    <h3 className="text-2xl font-medium text-foreground mb-2">
                      {language === "es" ? program.nameES : program.name}
                    </h3>
                    <p className="text-sm font-medium text-foreground/50 mb-4">
                      {language === "es" ? program.taglineES : program.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-foreground/70 mb-6">
                    {language === "es" ? program.descriptionES : program.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-3">
                      Key Features
                    </p>
                    <ul className="space-y-2">
                      {(language === "es" ? program.featuresES : program.features).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                          <Check className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-border/20">
                    <p className="text-xs text-foreground/50 mb-1">Annual Sessions</p>
                    <p className="text-sm font-medium text-primary">
                      {language === "es" ? program.sessionCountES : program.sessionCount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton
              variant="primary"
              className="w-full sm:w-auto shadow-lg"
              onClick={() => {
                router.push("/?section=contact")
              }}
            >
              {t.memberships.applyNow}
            </MagneticButton>
          </div>
        </div>
      </div>
    </main>
  )
}

