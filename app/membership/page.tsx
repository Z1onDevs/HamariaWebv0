"use client"

import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { useReveal } from "@/hooks/use-reveal"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { StructuredData } from "@/components/structured-data"
import { ArrowLeft, Check, Sparkles, Dumbbell, Heart, Activity } from "lucide-react"
import { useEffect, useState } from "react"
import { 
  baseMembershipTherapies,
  addOnPrograms 
} from "@/lib/membership-data"

export default function MembershipPage() {
  const router = useRouter()
  const { t, language } = useTranslation()
  const [mounted, setMounted] = useState(false)

  const { ref: overviewRef, isVisible: overviewVisible } = useReveal(0.2)
  const { ref: fitnessRef, isVisible: fitnessVisible } = useReveal(0.2)
  const { ref: wellnessRef, isVisible: wellnessVisible } = useReveal(0.2)
  const { ref: longevityRef, isVisible: longevityVisible } = useReveal(0.2)
  const { ref: programsRef, isVisible: programsVisible } = useReveal(0.2)

  const membership = t.memberships.membership
  const categories = t.memberships.categories
  const programOneLiners = t.memberships.programOneLiners

  // Categorize therapies
  const fitnessTherapies = baseMembershipTherapies.filter(therapy => 
    ['Personal training', 'Pilates reformer', 'Mobility coaching', 'Breathing & stretching', 
     'Mindfulness', 'EMS training', 'Hot yoga'].some(name => 
      therapy.name.includes(name) || therapy.nameES.includes(name.toLowerCase())
    )
  )

  const wellnessUnlimited = baseMembershipTherapies.filter(therapy => 
    therapy.baseAllocation === "Unlimited" && 
    ['red light', 'sauna', 'Steam', 'Ice', 'Pressotherapy', 'UV', 'Vagus'].some(keyword =>
      therapy.name.includes(keyword) || therapy.nameES.toLowerCase().includes(keyword.toLowerCase())
    )
  )

  const wellnessAnnual = baseMembershipTherapies.filter(therapy => 
    therapy.baseAllocation !== "Unlimited" &&
    ['Cryotherapy', 'Float', 'Contrast'].some(keyword =>
      therapy.name.includes(keyword) || therapy.nameES.includes(keyword)
    )
  )

  const healthMonitoring = baseMembershipTherapies.filter(therapy =>
    ['bioimpedance', 'blood', 'VO₂', 'Guest'].some(keyword =>
      therapy.name.includes(keyword)
    )
  )

  useEffect(() => {
    setMounted(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    if (typeof window !== "undefined" && (window as any).clarity) {
      ;(window as any).clarity("set", "membership_detail_view", "hamaria")
    }
  }, [])

  const membershipStructuredData = {
    name: membership.name,
    description: membership.description,
    price: membership.monthlyPrice.toString(),
  }

  if (!mounted) return null

  const categoryColors = {
    fitness: { primary: '#10b981', light: '#10b98120', border: '#10b98140' },
    wellness: { primary: '#8b5cf6', light: '#8b5cf620', border: '#8b5cf640' },
    longevity: { primary: '#06b6d4', light: '#06b6d420', border: '#06b6d440' },
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <StructuredData type="membership" data={membershipStructuredData} />
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <ShaderWrapper />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Back Button */}
        <div className="px-4 pt-6 sm:pt-8 sm:px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <button
              onClick={() => router.back()}
              className="mb-4 sm:mb-6 flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors min-h-[44px]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="px-4 py-8 sm:py-12 sm:px-6 md:px-8 md:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 text-xs md:text-sm font-medium"
              style={{
                backgroundColor: `${membership.color}20`,
                color: membership.color,
                border: `1px solid ${membership.color}40`,
              }}
            >
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              {membership.tagline}
            </div>
            
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-foreground mb-3 sm:mb-4">
              {membership.name}
            </h1>
            
            <p className="max-w-3xl mx-auto font-sans text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70">
              {membership.description}
            </p>
          </div>
        </div>

        {/* Founders Offer */}
        <div className="px-4 pb-10 sm:pb-12 sm:px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-primary/40 bg-primary/10 p-4 sm:p-6 text-center backdrop-blur-sm">
              <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl font-medium text-foreground">
                {t.memberships.foundersOffer}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-foreground/70">
                {t.memberships.limitedMembers}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="px-4 pb-12 sm:pb-16 sm:px-6 md:px-8 md:pb-20 lg:px-12 lg:pb-24">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {/* Monthly */}
              <div 
                className="rounded-2xl border p-5 sm:p-6 md:p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  backgroundColor: `${membership.color}05`,
                  borderColor: `${membership.color}20`,
                }}
              >
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
                    {t.memberships.monthlyPrice}
                  </p>
                  <p className="font-sans text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-2">
                    €{membership.monthlyPrice}
                  </p>
                  <p className="text-sm text-foreground/60">per month</p>
                </div>
              </div>

              {/* Yearly */}
              <div 
                className="rounded-2xl border p-5 sm:p-6 md:p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                style={{
                  backgroundColor: `${membership.color}10`,
                  borderColor: `${membership.color}40`,
                }}
              >
                <div 
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: membership.color,
                    color: 'white',
                  }}
                >
                  Save 10%
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
                    {t.memberships.yearlyPrice}
                  </p>
                  <p className="font-sans text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-2">
                    €{membership.yearlyPrice}
                  </p>
                  <p className="text-sm text-foreground/60">{t.memberships.perYear}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Overview Cards */}
        <div ref={overviewRef} className="px-4 pb-12 sm:pb-16 sm:px-6 md:px-8 md:pb-20 lg:px-12 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-6 sm:mb-8 md:mb-12 text-center transition-all duration-1000 ${
              overviewVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}>
              {t.memberships.whatsIncluded}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {/* Fitness Overview */}
              <div 
                className={`rounded-xl border-2 bg-card/20 backdrop-blur-sm p-5 sm:p-6 md:p-8 hover:bg-card/30 hover:scale-[1.02] transition-all duration-300 min-h-[44px] ${
                  overviewVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{
                  borderColor: categoryColors.fitness.border,
                  transitionDelay: '100ms'
                }}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-center">💪</div>
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-foreground mb-2 text-center">
                  {categories?.fitness?.title || "Fitness"}
                </h3>
                <p className="text-xs text-center font-medium uppercase tracking-wide mb-3" style={{ color: categoryColors.fitness.primary }}>
                  {categories?.fitness?.subtitle || "Unlimited Training"}
                </p>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed text-center">
                  9 unlimited fitness therapies
                </p>
              </div>

              {/* Wellness Overview */}
              <div 
                className={`rounded-xl border-2 bg-card/20 backdrop-blur-sm p-5 sm:p-6 md:p-8 hover:bg-card/30 hover:scale-[1.02] transition-all duration-300 min-h-[44px] ${
                  overviewVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{
                  borderColor: categoryColors.wellness.border,
                  transitionDelay: '200ms'
                }}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-center">💎</div>
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-foreground mb-2 text-center">
                  {categories?.wellness?.title || "Wellness"}
                </h3>
                <p className="text-xs text-center font-medium uppercase tracking-wide mb-3" style={{ color: categoryColors.wellness.primary }}>
                  {categories?.wellness?.subtitle || "Full Spa Access"}
                </p>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed text-center">
                  12 spa services included
                </p>
              </div>

              {/* Longevity Overview */}
              <div 
                className={`rounded-xl border-2 bg-card/20 backdrop-blur-sm p-5 sm:p-6 md:p-8 hover:bg-card/30 hover:scale-[1.02] transition-all duration-300 min-h-[44px] sm:col-span-2 lg:col-span-1 ${
                  overviewVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{
                  borderColor: categoryColors.longevity.border,
                  transitionDelay: '300ms'
                }}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-center">🧬</div>
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-foreground mb-2 text-center">
                  {categories?.longevity?.title || "Longevity"}
                </h3>
                <p className="text-xs text-center font-medium uppercase tracking-wide mb-3" style={{ color: categoryColors.longevity.primary }}>
                  {categories?.longevity?.subtitle || "Health Tracking"}
                </p>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed text-center">
                  Lounge access + monitoring
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FITNESS DETAILED SECTION */}
        <div ref={fitnessRef} id="fitness-section" className="px-4 pb-12 sm:pb-16 sm:px-6 md:px-8 md:pb-20 lg:px-12 lg:pb-24 scroll-mt-20">
          <div className={`mx-auto max-w-6xl transition-all duration-1000 ${
            fitnessVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}>
            {/* Header */}
            <div className="mb-6 sm:mb-8 md:mb-12 pb-5 sm:pb-6 border-b-2" style={{ borderColor: categoryColors.fitness.border }}>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4 justify-center md:justify-start">
                <div className="text-4xl sm:text-5xl">💪</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
                  {categories?.fitness?.title || "Fitness"}
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wide mb-3 text-center md:text-left" style={{ color: categoryColors.fitness.primary }}>
                {categories?.fitness?.subtitle || "Unlimited Training"}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl">
                {categories?.fitness?.description}
              </p>
            </div>

            {/* Fitness Therapies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
              {fitnessTherapies.map((therapy, index) => (
                <div
                  key={index}
                  className="group rounded-lg border border-border/30 bg-card/15 p-4 hover:bg-card/25 hover:border-border/50 hover:scale-[1.02] transition-all duration-300 min-h-[44px]"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5 sm:mt-1" style={{ color: categoryColors.fitness.primary }} />
                    <div className="flex-1">
                      <h5 className="text-sm sm:text-base font-medium text-foreground mb-1">
                        {language === "es" ? therapy.nameES : therapy.name}
                      </h5>
                      {therapy.duration && therapy.capacity && (
                        <p className="text-xs text-foreground/50">
                          {therapy.duration} min · Capacity: {therapy.capacity}
                        </p>
                      )}
                      <div className="mt-2 sm:mt-3">
                        <span 
                          className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: categoryColors.fitness.light, color: categoryColors.fitness.primary }}
                        >
                          UNLIMITED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-foreground/60 text-center">
              {t.memberships.totalTherapies}: 9 {t.memberships.unlimitedTherapies}
            </p>
          </div>
        </div>

        {/* WELLNESS DETAILED SECTION */}
        <div ref={wellnessRef} id="wellness-section" className="px-4 pb-12 sm:pb-16 sm:px-6 md:px-8 md:pb-20 lg:px-12 lg:pb-24 scroll-mt-20">
          <div className={`mx-auto max-w-6xl transition-all duration-1000 ${
            wellnessVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}>
            {/* Header */}
            <div className="mb-6 sm:mb-8 md:mb-12 pb-5 sm:pb-6 border-b-2" style={{ borderColor: categoryColors.wellness.border }}>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4 justify-center md:justify-start">
                <div className="text-4xl sm:text-5xl">💎</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
                  {categories?.wellness?.title || "Wellness"}
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wide mb-3 text-center md:text-left" style={{ color: categoryColors.wellness.primary }}>
                {categories?.wellness?.subtitle || "Full Spa Access"}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl">
                {categories?.wellness?.description}
              </p>
            </div>

            {/* Unlimited Spa Access */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-base sm:text-lg font-medium text-foreground mb-3 sm:mb-4">{t.memberships.unlimitedAccess}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {wellnessUnlimited.map((therapy, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border/30 bg-card/15 p-4 hover:bg-card/25 hover:border-border/50 hover:scale-[1.02] transition-all duration-300 min-h-[44px]"
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5 sm:mt-1" style={{ color: categoryColors.wellness.primary }} />
                      <div className="flex-1">
                        <h5 className="text-sm sm:text-base font-medium text-foreground mb-1">
                          {language === "es" ? therapy.nameES : therapy.name}
                        </h5>
                        {therapy.duration && therapy.capacity && (
                          <p className="text-xs text-foreground/50">
                            {therapy.duration} min · Cap: {therapy.capacity}
                          </p>
                        )}
                        <div className="mt-2 sm:mt-3">
                          <span 
                            className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: categoryColors.wellness.light, color: categoryColors.wellness.primary }}
                          >
                            UNLIMITED
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Annual Sessions */}
            <div className="mb-5 sm:mb-6">
              <h4 className="text-base sm:text-lg font-medium text-foreground mb-3 sm:mb-4">{t.memberships.includedSessions}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {wellnessAnnual.map((therapy, index) => {
                  const allocation = therapy.baseAllocation
                  if (allocation === 0 || !allocation) return null
                  
                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-border/40 bg-card/20 p-4 sm:p-5 min-h-[44px]"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-xs sm:text-sm font-medium text-foreground">
                          {language === "es" ? therapy.nameES : therapy.name}
                        </p>
                        <p className="text-base sm:text-lg font-mono font-bold text-primary whitespace-nowrap">
                          {allocation}
                        </p>
                      </div>
                      {therapy.duration && (
                        <p className="text-xs text-foreground/50">{therapy.duration} min per session</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-foreground/60 text-center">
              {t.memberships.totalTherapies}: 9 {t.memberships.unlimitedTherapies} + 3 {t.memberships.annualSessions}
            </p>
          </div>
        </div>

        {/* LONGEVITY DETAILED SECTION */}
        <div ref={longevityRef} id="longevity-section" className="px-4 pb-12 sm:pb-16 sm:px-6 md:px-8 md:pb-20 lg:px-12 lg:pb-24 scroll-mt-20">
          <div className={`mx-auto max-w-6xl transition-all duration-1000 ${
            longevityVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}>
            {/* Header */}
            <div className="mb-6 sm:mb-8 md:mb-12 pb-5 sm:pb-6 border-b-2" style={{ borderColor: categoryColors.longevity.border }}>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4 justify-center md:justify-start">
                <div className="text-4xl sm:text-5xl">🧬</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
                  {categories?.longevity?.title || "Longevity"}
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wide mb-3 text-center md:text-left" style={{ color: categoryColors.longevity.primary }}>
                {categories?.longevity?.subtitle || "Members Lounge & Health Tracking"}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl">
                {categories?.longevity?.description}
              </p>
            </div>

            {/* Members Lounge */}
            <div className="mb-6 sm:mb-8">
              <div className="rounded-xl border border-border/30 bg-card/15 p-5 sm:p-6 md:p-8">
                <h4 className="text-base sm:text-lg font-medium text-foreground mb-3">Members Lounge</h4>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mb-4">
                  Private quiet space with optional silence zones. Access to cutting-edge longevity devices available with select add-on programs.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['PEMF', 'HBOT', 'IHHT', 'H₂ therapy', 'Vagus nerve stimulation', 'Massage chair', 'Foot roller'].map((device, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: categoryColors.longevity.light, color: categoryColors.longevity.primary }}
                    >
                      {device}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Health Monitoring */}
            <div className="mb-5 sm:mb-6">
              <h4 className="text-base sm:text-lg font-medium text-foreground mb-3 sm:mb-4">Health Monitoring Included</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Monthly */}
                <div className="rounded-lg border border-border/40 bg-card/20 p-5 sm:p-6 min-h-[44px]">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: categoryColors.longevity.primary }} />
                    <h5 className="text-sm sm:text-base font-medium text-foreground">Monthly Checkups</h5>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-foreground/70">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                      <span>Body Lab bioimpedance (unlimited)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                      <span>Physical assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                      <span>Progress tracking</span>
                    </li>
                  </ul>
                </div>

                {/* Annual */}
                <div className="rounded-lg border border-border/40 bg-card/20 p-5 sm:p-6 min-h-[44px]">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: categoryColors.longevity.primary }} />
                    <h5 className="text-sm sm:text-base font-medium text-foreground">Annual Assessment</h5>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-foreground/70">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                      <span>Complete blood panel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                      <span>VO₂ max cardiopulmonary test</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                      <span>Personalized longevity recommendations</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Guest Passes */}
              <div className="mt-5 sm:mt-6 rounded-lg border border-border/40 bg-card/20 p-4 sm:p-5 text-center">
                <p className="text-xs sm:text-sm text-foreground/70">
                  <span className="font-medium text-foreground">Bonus:</span> 12 guest passes per year to share the Hamaria experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ADD-ON PROGRAMS SECTION */}
        <div ref={programsRef} data-section="programs" id="programs-section" className="px-4 pb-12 sm:pb-16 sm:px-6 md:px-8 md:pb-20 lg:px-12 lg:pb-24 scroll-mt-20">
          <div className={`mx-auto max-w-7xl transition-all duration-1000 ${
            programsVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}>
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-3 sm:mb-4">
                {t.memberships.addOnPrograms}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
                {t.memberships.addOnProgramsSubtitle}
              </p>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
              {addOnPrograms.map((program, index) => (
                <div
                  key={program.id}
                  className={`rounded-xl border-2 border-border/30 bg-card/10 p-5 sm:p-6 md:p-8 hover:border-primary/40 hover:bg-card/20 transition-all duration-300 group relative overflow-hidden min-h-[44px] ${
                    programsVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{
                    borderTopColor: program.color,
                    borderTopWidth: '3px',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {/* Icon */}
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">{program.icon === 'sparkles' ? '💅' : program.icon === 'brain' ? '🧠' : program.icon === 'leaf' ? '⚖️' : program.icon === 'heart-pulse' ? '💪' : '🧬'}</div>
                  
                  {/* Name */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-foreground mb-2">
                    {language === "es" ? program.nameES : program.name}
                  </h3>
                  
                  {/* Tagline */}
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-3 sm:mb-4">
                    {language === "es" ? program.taglineES : program.tagline}
                  </p>
                  
                  {/* One-liner */}
                  <p className="text-xs sm:text-sm md:text-base text-foreground/70 leading-relaxed mb-5 sm:mb-6">
                    {language === "es" ? programOneLiners?.[program.id] : programOneLiners?.[program.id]}
                  </p>
                  
                  {/* Session count */}
                  <div className="pt-3 sm:pt-4 border-t border-border/20">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-foreground/50">Annual sessions</p>
                      <p className="text-xs sm:text-sm font-mono font-medium text-primary">
                        {language === "es" ? program.sessionCountES : program.sessionCount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FINAL CTA SECTION */}
        <div className="px-4 pb-16 sm:pb-20 sm:px-6 md:px-8 md:pb-24 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-foreground mb-6 sm:mb-8">
              Ready to begin your wellness journey?
            </h3>
            
            <div className="flex flex-col items-stretch sm:items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center max-w-lg mx-auto">
              {/* Apply Now */}
              <MagneticButton
                variant="primary"
                className="w-full sm:w-auto min-w-[200px] sm:min-w-[220px] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 text-base sm:text-lg py-4 px-8 sm:px-10 min-h-[56px]"
                onClick={() => router.push("/?section=contact")}
              >
                {t.memberships.applyNow}
              </MagneticButton>
              
              {/* Schedule Tour */}
              <MagneticButton
                variant="secondary"
                className="w-full sm:w-auto min-w-[200px] sm:min-w-[220px] text-base sm:text-lg py-4 px-8 sm:px-10 border-2 min-h-[56px]"
                onClick={() => router.push("/?section=contact")}
              >
                {t.memberships.scheduleTour || "Schedule Tour"}
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
