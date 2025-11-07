"use client"

import { useParams, useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { MembershipComparison } from "@/components/membership-comparison"
import { ArrowLeft, Check, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { therapyMatrix } from "@/lib/therapy-matrix"

export default function MembershipDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t, language } = useTranslation()
  const [showComparison, setShowComparison] = useState(false)
  const [mounted, setMounted] = useState(false)

  const membershipId = params.id as string
  const memberships = t.memberships
  const tier = memberships.tiers[membershipId]

  useEffect(() => {
    setMounted(true)
    
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    // Track page view for analytics
    if (typeof window !== "undefined" && (window as any).clarity) {
      ;(window as any).clarity("set", "membership_page_view", membershipId)
    }
  }, [membershipId])

  // Track pricing interaction
  const trackPricingClick = (action: string) => {
    if (typeof window !== "undefined" && (window as any).clarity) {
      ;(window as any).clarity("event", `membership_${action}`, {
        membership: membershipId,
        price: tier?.monthlyPrice,
      })
    }
  }

  if (!tier) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-foreground">{memberships.membershipNotFound}</h1>
          <button
            onClick={() => router.push("/?section=membership")}
            className="mt-4 text-primary hover:underline"
          >
            {memberships.returnToMemberships}
          </button>
        </div>
      </div>
    )
  }

  // Get therapies for this tier
  const therapies = therapyMatrix.filter(
    (therapy) => therapy.allocations[membershipId as keyof typeof therapy.allocations]
  )

  const monthlyTherapies = therapies.filter((t) => !t.isYearly)
  const yearlyTherapies = therapies.filter((t) => t.isYearly)

  // Calculate savings
  const monthlySavings = tier.monthlyPerceivedValue - tier.monthlyPrice
  const yearlySavings = tier.monthlyPerceivedValue * 12 - tier.yearlyPrice
  const savingsPercentage = Math.round((monthlySavings / tier.monthlyPerceivedValue) * 100)

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <ShaderWrapper />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <GrainOverlay />
      
      {/* Add cursor styles for membership pages */}
      <style jsx global>{`
        main * {
          cursor: auto !important;
        }
        main button, main a {
          cursor: pointer !important;
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 px-5 py-8 sm:px-6 md:px-8 lg:px-12">
        {/* Back Button */}
        <button
          onClick={() => {
            // Navigate back to membership section or previous page
            if (window.history.length > 1 && document.referrer.includes(window.location.origin)) {
              router.back()
            } else {
              router.push("/?section=membership")
            }
            // Fallback scroll after navigation
            setTimeout(() => {
              if (window.location.pathname === "/") {
                // Try to scroll to membership section
                const scrollToMembership = () => {
                  const membershipSection = document.querySelector('[data-section="membership"]')
                  if (membershipSection) {
                    membershipSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }
                scrollToMembership()
              }
            }, 100)
          }}
          className="mb-6 flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {memberships.backToHome}
        </button>

        {/* Hero Section */}
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 space-y-3">
            <div
              className="inline-block rounded-full px-4 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: `${tier.color}20`,
                color: tier.color,
                border: `1px solid ${tier.color}40`,
              }}
            >
              {tier.tagline}
            </div>
            
            <h1 className="font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {tier.name}
            </h1>
            
            <p className="max-w-3xl font-sans text-base text-foreground/70 md:text-lg">
              {tier.description}
            </p>
          </div>

          {/* Founders Offer Banner */}
          <div className="mb-8 rounded-xl border border-primary/40 bg-primary/10 p-4 text-center backdrop-blur-sm">
            <p className="font-sans text-base font-medium text-foreground md:text-lg">
              {memberships.foundersOffer}
            </p>
            <p className="mt-1 text-xs text-foreground/70">
              {memberships.limitedMembers}
            </p>
          </div>

          {/* Features */}
          <div className="mb-10">
            <h2 className="mb-4 font-sans text-xl font-light text-foreground">
              {memberships.keyBenefits}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tier.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/20 p-3"
                >
                  <div
                    className="mt-0.5 rounded-full p-1"
                    style={{ backgroundColor: `${tier.color}20` }}
                  >
                    <Check className="h-4 w-4" style={{ color: tier.color }} />
                  </div>
                  <p className="text-sm text-foreground/80">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Therapies Section */}
          <div className="mb-10">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-sans text-xl font-light text-foreground">
                {memberships.includedTherapies}
              </h2>
              <button
                onClick={() => {
                  setShowComparison(!showComparison)
                  trackPricingClick("comparison_toggle")
                }}
                className="rounded-lg border border-primary/20 bg-card/40 px-3 py-1.5 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-card/60"
              >
                {memberships.compareTitle}
              </button>
            </div>

            {showComparison ? (
              <MembershipComparison currentTier={membershipId} />
            ) : (
              <>
                {/* Monthly Therapies */}
                {monthlyTherapies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-wide text-foreground/50">
                      {memberships.monthlyTherapies}
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-border/50 bg-card/20">
                      <table className="w-full">
                        <thead className="border-b border-border/30">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-foreground/70">
                              Therapy
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-foreground/70">
                              Sessions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {monthlyTherapies.map((therapy, index) => {
                            const allocation = therapy.allocations[membershipId as keyof typeof therapy.allocations]
                            if (!allocation || allocation === 0) return null
                            
                            return (
                              <tr
                                key={index}
                                className="border-b border-border/10 last:border-0 transition-colors hover:bg-foreground/5"
                              >
                                <td className="px-4 py-2.5 text-sm text-foreground/80">
                                  {language === "es" ? therapy.nameES : therapy.name}
                                </td>
                                <td className="px-4 py-2.5 text-right font-mono text-xs text-foreground/70">
                                  {allocation === "Unlimited" ? memberships.unlimited : `${allocation}${memberships.perMonthSuffix}`}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Yearly Therapies */}
                {yearlyTherapies.length > 0 && (
                  <div>
                    <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-wide text-foreground/50">
                      {memberships.yearlyTherapies}
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-border/50 bg-card/20">
                      <table className="w-full">
                        <thead className="border-b border-border/30">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-foreground/70">
                              {memberships.therapy}
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-foreground/70">
                              {memberships.sessions}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {yearlyTherapies.map((therapy, index) => {
                            const allocation = therapy.allocations[membershipId as keyof typeof therapy.allocations]
                            if (!allocation || allocation === 0) return null
                            
                            return (
                              <tr
                                key={index}
                                className="border-b border-border/10 last:border-0 transition-colors hover:bg-foreground/5"
                              >
                                <td className="px-4 py-2.5 text-sm text-foreground/80">
                                  {language === "es" ? therapy.nameES : therapy.name}
                                </td>
                                <td className="px-4 py-2.5 text-right font-mono text-xs text-foreground/70">
                                  {allocation}{memberships.perYearSuffix}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Pricing Card - At Bottom */}
          <div className="mb-10">
            <div 
              className="mx-auto max-w-md rounded-2xl border p-6 backdrop-blur-sm shadow-xl"
              style={{
                backgroundColor: `${tier.color}08`,
                borderColor: `${tier.color}30`,
              }}
            >
              <div className="space-y-4">
                {/* Monthly Price */}
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground/50">
                    {memberships.monthlyPrice}
                  </p>
                  <p className="font-sans text-4xl font-light text-foreground md:text-5xl">
                    €{tier.monthlyPrice}
                  </p>
                  <p className="mt-1 text-xs text-foreground/60">{memberships.perMonth}</p>
                </div>

                {/* Yearly Price */}
                <div className="border-t border-foreground/10 pt-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground/50">
                    {memberships.yearlyPrice}
                  </p>
                  <p className="font-sans text-2xl font-light text-foreground md:text-3xl">
                    €{tier.yearlyPrice}
                  </p>
                  <p className="mt-1 text-xs text-foreground/60">{memberships.perYear}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton
              variant="primary"
              className="w-full shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/40 sm:w-auto"
              onClick={() => {
                trackPricingClick("apply_now")
                // Navigate back to membership section for application
                router.push("/?section=membership")
                setTimeout(() => {
                  const membershipSection = document.querySelector('[data-section="membership"]')
                  if (membershipSection) {
                    membershipSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }, 100)
              }}
            >
              {t.applyButton}
            </MagneticButton>
            <button
              onClick={() => {
                setShowComparison(true)
                trackPricingClick("view_comparison")
                // Scroll to comparison table when shown
                setTimeout(() => {
                  const comparisonTable = document.querySelector('.membership-comparison')
                  if (comparisonTable) {
                    comparisonTable.scrollIntoView({ behavior: "smooth", block: "nearest" })
                  }
                }, 100)
              }}
              className="w-full rounded-full border border-primary/30 px-8 py-3 font-sans text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-card/40 sm:w-auto"
            >
              {t.membershipForm.comparePlans}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

