"use client"

import { useParams, useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { MembershipComparison } from "@/components/membership-comparison"
import { ArrowLeft, Check, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

// Therapy matrix from membership section
const therapyMatrix = [
  {
    name: "Cryotherapy (electric chamber)",
    nameES: "Crioterapia (cámara eléctrica)",
    allocations: { longevity: 2, performance: 4, aesthetics: 4 },
    duration: 5,
  },
  {
    name: "Cold plunge",
    nameES: "Inmersión en frío",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 10,
  },
  {
    name: "IHHT (intermittent hypoxic-hyperoxic)",
    nameES: "IHHT (hipoxia-hiperoxia intermitente)",
    allocations: { longevity: 0, performance: 4, aesthetics: 0 },
    duration: 45,
  },
  {
    name: "Hyperbaric oxygen therapy (HBOT)",
    nameES: "Cámara hiperbárica (HBOT)",
    allocations: { longevity: 1, performance: 4, aesthetics: 4 },
    duration: 60,
  },
  {
    name: "Red light therapy (full body)",
    nameES: "Terapia de luz roja (cuerpo completo)",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 20,
  },
  {
    name: "Microcurrent & LED facial",
    nameES: "Microcorriente y LED facial",
    allocations: { longevity: 0, performance: 0, aesthetics: 4 },
    duration: 45,
  },
  {
    name: "Indiba (RF/Tecar)",
    nameES: "Indiba (RF/Tecar)",
    allocations: { longevity: 0, performance: 0, aesthetics: 2 },
    duration: 45,
  },
  {
    name: "Pressotherapy",
    nameES: "Presoterapia",
    allocations: { longevity: 4, performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 30,
  },
  {
    name: "Pilates (class/session)",
    nameES: "Pilates (clase/sesión)",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 50,
  },
  {
    name: "Floatation (sensory tank)",
    nameES: "Flotación (tanque sensorial)",
    allocations: { longevity: 1, performance: 2, aesthetics: 3 },
    duration: 60,
  },
  {
    name: "Sauna session",
    nameES: "Sesión de sauna",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 30,
  },
  {
    name: "Lymphatic massage",
    nameES: "Masaje linfático",
    allocations: { longevity: 0, performance: 1, aesthetics: 2 },
    duration: 60,
  },
  {
    name: "Therapeutic massage",
    nameES: "Masaje terapéutico",
    allocations: { longevity: 1, performance: 4, aesthetics: 4 },
    duration: 60,
  },
  {
    name: "Signature massage",
    nameES: "Masaje signature",
    allocations: { longevity: 0, performance: 0, aesthetics: 1 },
    duration: 90,
  },
  {
    name: "Swim",
    nameES: "Natación",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 30,
  },
  {
    name: "Personal trainer",
    nameES: "Entrenador personal",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 60,
  },
  {
    name: "Baseline assessment",
    nameES: "Evaluación de línea base",
    allocations: { longevity: 1, performance: 1, aesthetics: 1 },
    isYearly: true,
    duration: 120,
  },
  {
    name: "VO2 max",
    nameES: "VO₂ máx",
    allocations: { longevity: 0, performance: 4, aesthetics: 0 },
    isYearly: true,
    duration: 45,
  },
  {
    name: "Sofwave (ultrasound facelift)",
    nameES: "Sofwave (lifting ultrasónico)",
    allocations: { longevity: 1, performance: 1, aesthetics: 2 },
    isYearly: false,
    duration: 60,
  },
  {
    name: "NAD+ IV",
    nameES: "NAD+ IV",
    allocations: { longevity: 1, performance: 1, aesthetics: 2 },
    isYearly: true,
    duration: 90,
  },
]

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
          <h1 className="text-2xl font-light text-foreground">Membership not found</h1>
          <button
            onClick={() => router.push("/?section=membership")}
            className="mt-4 text-primary hover:underline"
          >
            Return to memberships
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
      <div className="relative z-10 px-5 py-12 sm:px-6 md:px-8 lg:px-12">
        {/* Back Button */}
        <button
          onClick={() => {
            // Navigate back to membership section
            router.push("/?section=membership")
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
          className="mb-8 flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {memberships.backToHome}
        </button>

        {/* Hero Section */}
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 space-y-4">
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
            
            <p className="max-w-3xl font-sans text-lg text-foreground/70 md:text-xl">
              {tier.description}
            </p>
          </div>

          {/* Pricing Card - Simplified */}
          <div className="mb-16">
            <div 
              className="inline-block rounded-2xl border p-8 backdrop-blur-sm shadow-xl"
              style={{
                backgroundColor: `${tier.color}08`,
                borderColor: `${tier.color}30`,
              }}
            >
              <p className="mb-2 text-sm font-medium uppercase tracking-wide text-foreground/50">
                {memberships.monthlyPrice}
              </p>
              <p className="font-sans text-5xl font-light text-foreground md:text-6xl">
                €{tier.monthlyPrice}
              </p>
              <p className="mt-1 text-sm text-foreground/60">{memberships.perMonth}</p>
            </div>
          </div>

          {/* Founders Offer Banner */}
          <div className="mb-12 rounded-xl border border-primary/40 bg-primary/10 p-6 text-center backdrop-blur-sm">
            <p className="font-sans text-lg font-medium text-foreground md:text-xl">
              {memberships.foundersOffer}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              Limited to first 42 members
            </p>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="mb-6 font-sans text-2xl font-light text-foreground">
              Key Benefits
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tier.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/20 p-4"
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
          <div className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-sans text-2xl font-light text-foreground">
                {memberships.includedTherapies}
              </h2>
              <button
                onClick={() => {
                  setShowComparison(!showComparison)
                  trackPricingClick("comparison_toggle")
                }}
                className="rounded-lg border border-primary/20 bg-card/40 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-card/60"
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
                  <div className="mb-8">
                    <h3 className="mb-4 font-mono text-sm font-medium uppercase tracking-wide text-foreground/50">
                      {memberships.monthlyTherapies}
                    </h3>
                    <div className="overflow-hidden rounded-xl border border-border/50 bg-card/20">
                      <table className="w-full">
                        <thead className="border-b border-border/30">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-foreground/70">
                              Therapy
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-medium text-foreground/70">
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
                                <td className="px-6 py-4 text-sm text-foreground/80">
                                  {language === "es" ? therapy.nameES : therapy.name}
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-sm text-foreground/70">
                                  {allocation === "Unlimited" ? memberships.unlimited : `${allocation}/month`}
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
                    <h3 className="mb-4 font-mono text-sm font-medium uppercase tracking-wide text-foreground/50">
                      {memberships.yearlyTherapies}
                    </h3>
                    <div className="overflow-hidden rounded-xl border border-border/50 bg-card/20">
                      <table className="w-full">
                        <thead className="border-b border-border/30">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-foreground/70">
                              Therapy
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-medium text-foreground/70">
                              Sessions
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
                                <td className="px-6 py-4 text-sm text-foreground/80">
                                  {language === "es" ? therapy.nameES : therapy.name}
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-sm text-foreground/70">
                                  {allocation}/year
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

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton
              variant="primary"
              className="w-full shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/40 sm:w-auto"
              onClick={() => {
                trackPricingClick("apply_now")
                // Go back to homepage and scroll to membership section
                router.push("/")
                setTimeout(() => {
                  const membershipSection = document.getElementById("membership")
                  if (membershipSection) {
                    membershipSection.scrollIntoView({ behavior: "smooth" })
                  } else {
                    // Fallback: use section index if ID not found
                    window.location.hash = "membership"
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

