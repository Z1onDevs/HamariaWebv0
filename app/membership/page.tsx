"use client"

import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { useReveal } from "@/hooks/use-reveal"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { StructuredData } from "@/components/structured-data"
import { CustomCursor } from "@/components/custom-cursor"
import { ArrowLeft, Check, Heart, Activity, ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"
import { 
  baseMembershipTherapies,
  addOnPrograms 
} from "@/lib/membership-data"

export default function MembershipPage() {
  const router = useRouter()
  const { t, language } = useTranslation()
  const [mounted, setMounted] = useState(false)

  const { ref: overviewRef, isVisible: overviewVisible } = useReveal(0.15)
  const { ref: fitnessRef, isVisible: fitnessVisible } = useReveal(0.15)
  const { ref: wellnessRef, isVisible: wellnessVisible } = useReveal(0.15)
  const { ref: longevityRef, isVisible: longevityVisible } = useReveal(0.15)
  const { ref: programsRef, isVisible: programsVisible } = useReveal(0.15)
  
  // Expandable sections state
  const [expandedSections, setExpandedSections] = useState<{
    fitness: boolean
    wellness: boolean
    longevity: boolean
  }>({
    fitness: false,
    wellness: false,
    longevity: false
  })
  
  const [expandedPrograms, setExpandedPrograms] = useState<Record<string, boolean>>({})
  
  const toggleSection = (section: 'fitness' | 'wellness' | 'longevity') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  
  const toggleProgram = (programId: string) => {
    setExpandedPrograms(prev => ({
      ...prev,
      [programId]: !prev[programId]
    }))
  }

  const membership = t?.memberships?.membership
  const categories = t?.memberships?.categories
  const programOneLiners = t?.memberships?.programOneLiners

  const fitnessTherapies = baseMembershipTherapies.filter(therapy => 
    therapy.baseAllocation === "Unlimited" &&
    ['Personal training', 'Pilates', 'swimming', 'Hydrodrive', 'Breathing', 'stretching',
     'Mindfulness', 'EMS', 'yoga'].some(keyword => 
      therapy.name.toLowerCase().includes(keyword.toLowerCase()) || 
      therapy.nameES.toLowerCase().includes(keyword.toLowerCase())
    )
  )

  const wellnessUnlimited = baseMembershipTherapies.filter(therapy => 
    therapy.baseAllocation === "Unlimited" && 
    !therapy.name.toLowerCase().includes('bioimpedance') &&
    !therapy.name.toLowerCase().includes('bioimpedancia') &&
    ['red light', 'light therapy', 'sauna', 'steam', 'ice', 'plunge', 'pressotherapy', 
     'presoterapia', 'uv', 'vagus'].some(keyword =>
      therapy.name.toLowerCase().includes(keyword.toLowerCase()) || 
      therapy.nameES.toLowerCase().includes(keyword.toLowerCase())
    )
  )

  const wellnessAnnual = baseMembershipTherapies.filter(therapy => 
    therapy.isYearly &&
    ['cryotherapy', 'crioterapia', 'float', 'flotación', 'contrast'].some(keyword =>
      therapy.name.toLowerCase().includes(keyword.toLowerCase()) || 
      therapy.nameES.toLowerCase().includes(keyword.toLowerCase())
    )
  )

  const healthMonitoring = baseMembershipTherapies.filter(therapy =>
    ['bioimpedance', 'bioimpedancia', 'blood', 'sangre', 'VO₂', 'vo2', 'guest', 'invitado'].some(keyword =>
      therapy.name.toLowerCase().includes(keyword.toLowerCase()) ||
      therapy.nameES.toLowerCase().includes(keyword.toLowerCase())
    )
  )

  useEffect(() => {
    setMounted(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    if (typeof window !== "undefined" && (window as any).clarity) {
      ;(window as any).clarity("set", "membership_detail_view", "hamaria")
    }
  }, [])


  if (!membership || !categories) {
    return (
      <main className="relative min-h-screen bg-background overflow-x-hidden flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </main>
    )
  }

  const membershipStructuredData = {
    name: membership.name,
    description: membership.description,
    price: membership.monthlyPrice.toString(),
  }

  const categoryColors = {
    fitness: { primary: '#10b981', light: '#10b98120', border: '#10b98140' },
    wellness: { primary: '#8b5cf6', light: '#8b5cf620', border: '#8b5cf640' },
    longevity: { primary: '#06b6d4', light: '#06b6d420', border: '#06b6d440' },
  }

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
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
        <div className="px-6 pt-6 sm:pt-8 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl">
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
        <div className="px-6 py-6 sm:py-8 sm:px-6 md:px-8 md:py-10 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl text-center">
            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-2 sm:mb-3">
              {membership.name}
            </h1>
            
            <p className="max-w-3xl mx-auto font-sans text-sm sm:text-base md:text-lg text-foreground/70">
              {membership.description}
            </p>
          </div>
        </div>

        {/* Founders Offer */}
        <div className="px-6 pb-6 sm:pb-8 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-xl border border-primary/40 bg-primary/10 p-3 sm:p-4 text-center backdrop-blur-sm">
              <p className="font-sans text-sm sm:text-base font-medium text-foreground">
                {t.memberships.foundersOffer}
              </p>
              <p className="mt-1 text-xs text-foreground/70">
                {t.memberships.limitedMembers}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="px-6 pb-8 sm:pb-10 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-3xl lg:max-w-4xl">
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {/* Monthly */}
              <div 
                className="rounded-xl border p-4 sm:p-5 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow"
                style={{
                  backgroundColor: `${membership.color}05`,
                  borderColor: `${membership.color}20`,
                }}
              >
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-1">
                    {t.memberships.monthlyPrice}
                  </p>
                  <p className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-1">
                    €{membership.monthlyPrice}
                  </p>
                  <p className="text-xs text-foreground/60">per month</p>
                </div>
              </div>

              {/* Yearly */}
              <div 
                className="rounded-xl border p-4 sm:p-5 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow"
                style={{
                  backgroundColor: `${membership.color}10`,
                  borderColor: `${membership.color}40`,
                }}
              >
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-1">
                    {t.memberships.yearlyPrice}
                  </p>
                  <p className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-1">
                    €{membership.yearlyPrice}
                  </p>
                  <p className="text-xs text-foreground/60">{t.memberships.perYear}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Overview Cards */}
        <div ref={overviewRef} className="px-6 pb-8 sm:pb-10 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-5xl lg:max-w-6xl">
            <h2 className={`text-lg sm:text-xl md:text-2xl font-light text-foreground mb-4 sm:mb-6 text-center transition-all duration-1000 ${
              mounted && overviewVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}>
              {t.memberships.whatsIncluded}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto">
              {/* Fitness Overview */}
              <div 
                className={`rounded-lg border bg-card/20 backdrop-blur-sm p-4 sm:p-5 hover:bg-card/30 transition-all duration-300 min-h-[44px] ${
                  mounted && overviewVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{
                  borderColor: categoryColors.fitness.border,
                  transitionDelay: '100ms'
                }}
              >
                <h3 className="text-sm sm:text-base font-medium text-foreground mb-1 text-center">
                  {categories?.fitness?.title || "Fitness"}
                </h3>
                <p className="text-xs text-center font-medium uppercase tracking-wide mb-2" style={{ color: categoryColors.fitness.primary }}>
                  {categories?.fitness?.subtitle || "Unlimited Training"}
                </p>
                <p className="text-xs text-foreground/70 leading-relaxed text-center">
                  {categories?.fitness?.description}
                </p>
              </div>

              {/* Wellness Overview */}
              <div 
                className={`rounded-lg border bg-card/20 backdrop-blur-sm p-4 sm:p-5 hover:bg-card/30 transition-all duration-300 min-h-[44px] ${
                  mounted && overviewVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{
                  borderColor: categoryColors.wellness.border,
                  transitionDelay: '200ms'
                }}
              >
                <h3 className="text-sm sm:text-base font-medium text-foreground mb-1 text-center">
                  {categories?.wellness?.title || "Wellness"}
                </h3>
                <p className="text-xs text-center font-medium uppercase tracking-wide mb-2" style={{ color: categoryColors.wellness.primary }}>
                  {categories?.wellness?.subtitle || "Full Spa Access"}
                </p>
                <p className="text-xs text-foreground/70 leading-relaxed text-center">
                  {categories?.wellness?.description}
                </p>
              </div>

              {/* Longevity Overview */}
              <div 
                className={`rounded-lg border bg-card/20 backdrop-blur-sm p-4 sm:p-5 hover:bg-card/30 transition-all duration-300 min-h-[44px] sm:col-span-2 lg:col-span-1 ${
                  mounted && overviewVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{
                  borderColor: categoryColors.longevity.border,
                  transitionDelay: '300ms'
                }}
              >
                <h3 className="text-sm sm:text-base font-medium text-foreground mb-1 text-center">
                  {categories?.longevity?.title || "Longevity"}
                </h3>
                <p className="text-xs text-center font-medium uppercase tracking-wide mb-2" style={{ color: categoryColors.longevity.primary }}>
                  {categories?.longevity?.subtitle || "Health Tracking"}
                </p>
                <p className="text-xs text-foreground/70 leading-relaxed text-center">
                  Lounge access + monitoring
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FITNESS DETAILED SECTION */}
        <div ref={fitnessRef} id="fitness-section" className="px-6 pb-3 sm:pb-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 scroll-mt-20">
          <div className={`mx-auto max-w-5xl lg:max-w-6xl transition-all duration-1000 ${
            fitnessVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}>
            {/* Collapsible Header */}
            <button
              onClick={() => toggleSection('fitness')}
              className="w-full rounded-lg border bg-card/20 backdrop-blur-sm p-4 hover:bg-card/30 transition-all duration-300 text-left"
              style={{ borderColor: categoryColors.fitness.border }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">
                      {categories?.fitness?.title || "Fitness"}
                    </h2>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide" style={{ color: categoryColors.fitness.primary }}>
                    {categories?.fitness?.subtitle || "Unlimited Training"}
                  </p>
                </div>
                {expandedSections.fitness ? (
                  <ChevronUp className="h-5 w-5 text-foreground/50 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground/50 flex-shrink-0" />
                )}
              </div>
            </button>

            {/* Expandable Content */}
            {expandedSections.fitness && (
              <div className="mt-3 rounded-lg border bg-card/10 backdrop-blur-sm p-4" style={{ borderColor: categoryColors.fitness.border }}>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4 max-w-3xl">
                  {categories?.fitness?.description}
                </p>

                {/* Fitness Therapies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  {fitnessTherapies.map((therapy, index) => (
                    <div
                      key={index}
                      className="rounded-md border border-border/30 bg-card/15 p-3 hover:bg-card/25 transition-all duration-200"
                    >
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: categoryColors.fitness.primary }} />
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-foreground mb-0.5">
                            {language === "es" ? therapy.nameES : therapy.name}
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WELLNESS DETAILED SECTION */}
        <div ref={wellnessRef} id="wellness-section" className="px-6 pb-3 sm:pb-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 scroll-mt-20">
          <div className={`mx-auto max-w-5xl lg:max-w-6xl transition-all duration-1000 ${
            wellnessVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}>
            {/* Collapsible Header */}
            <button
              onClick={() => toggleSection('wellness')}
              className="w-full rounded-lg border bg-card/20 backdrop-blur-sm p-4 hover:bg-card/30 transition-all duration-300 text-left"
              style={{ borderColor: categoryColors.wellness.border }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">
                      {categories?.wellness?.title || "Wellness"}
                    </h2>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide" style={{ color: categoryColors.wellness.primary }}>
                    {categories?.wellness?.subtitle || "Full Spa Access"}
                  </p>
                </div>
                {expandedSections.wellness ? (
                  <ChevronUp className="h-5 w-5 text-foreground/50 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground/50 flex-shrink-0" />
                )}
              </div>
            </button>

            {/* Expandable Content */}
            {expandedSections.wellness && (
              <div className="mt-3 rounded-lg border bg-card/10 backdrop-blur-sm p-4" style={{ borderColor: categoryColors.wellness.border }}>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4 max-w-3xl">
                  {categories?.wellness?.description}
                </p>

                {/* Unlimited Spa Access */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">{t.memberships.unlimitedAccess}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {wellnessUnlimited.map((therapy, index) => (
                      <div
                        key={index}
                        className="rounded-md border border-border/30 bg-card/15 p-3 hover:bg-card/25 transition-all duration-200"
                      >
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: categoryColors.wellness.primary }} />
                          <div className="flex-1">
                            <h5 className="text-sm font-medium text-foreground mb-0.5">
                              {language === "es" ? therapy.nameES : therapy.name}
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Annual Sessions */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">{t.memberships.includedSessions}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {wellnessAnnual.map((therapy, index) => {
                      const allocation = therapy.baseAllocation
                      if (allocation === 0 || !allocation) return null
                      
                      return (
                        <div
                          key={index}
                          className="rounded-md border border-border/40 bg-card/20 p-3"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm font-medium text-foreground">
                              {language === "es" ? therapy.nameES : therapy.name}
                            </p>
                            <p className="text-base font-mono font-bold text-primary whitespace-nowrap">
                              {allocation}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LONGEVITY DETAILED SECTION */}
        <div ref={longevityRef} id="longevity-section" className="px-6 pb-3 sm:pb-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 scroll-mt-20">
          <div className={`mx-auto max-w-5xl lg:max-w-6xl transition-all duration-1000 ${
            longevityVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}>
            {/* Collapsible Header */}
            <button
              onClick={() => toggleSection('longevity')}
              className="w-full rounded-lg border bg-card/20 backdrop-blur-sm p-4 hover:bg-card/30 transition-all duration-300 text-left"
              style={{ borderColor: categoryColors.longevity.border }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">
                      {categories?.longevity?.title || "Longevity"}
                    </h2>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide" style={{ color: categoryColors.longevity.primary }}>
                    {categories?.longevity?.subtitle || "Members Lounge & Health Tracking"}
                  </p>
                </div>
                {expandedSections.longevity ? (
                  <ChevronUp className="h-5 w-5 text-foreground/50 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground/50 flex-shrink-0" />
                )}
              </div>
            </button>

            {/* Expandable Content */}
            {expandedSections.longevity && (
              <div className="mt-3 rounded-lg border bg-card/10 backdrop-blur-sm p-4" style={{ borderColor: categoryColors.longevity.border }}>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4 max-w-3xl">
                  {categories?.longevity?.description}
                </p>

                {/* Members Lounge */}
                <div className="mb-4">
                  <div className="rounded-lg border border-border/30 bg-card/15 p-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Members Lounge</h4>
                    <p className="text-xs text-foreground/70 leading-relaxed mb-3">
                      Private quiet space with optional silence zones. Access to cutting-edge longevity devices available with select add-on programs.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['PEMF', 'HBOT', 'IHHT', 'H₂ therapy', 'Vagus nerve stimulation', 'Massage chair', 'Foot roller'].map((device, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: categoryColors.longevity.light, color: categoryColors.longevity.primary }}
                        >
                          {device}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Health Monitoring */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Health Monitoring Included</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Monthly */}
                    <div className="rounded-lg border border-border/40 bg-card/20 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4" style={{ color: categoryColors.longevity.primary }} />
                        <h5 className="text-sm font-medium text-foreground">Monthly Checkups</h5>
                      </div>
                      <ul className="space-y-1.5 text-xs text-foreground/70">
                        <li className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                          <span>Body Lab bioimpedance (unlimited)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                          <span>Physical assessments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                          <span>Progress tracking</span>
                        </li>
                      </ul>
                    </div>

                    {/* Annual */}
                    <div className="rounded-lg border border-border/40 bg-card/20 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="h-4 w-4" style={{ color: categoryColors.longevity.primary }} />
                        <h5 className="text-sm font-medium text-foreground">Annual Assessment</h5>
                      </div>
                      <ul className="space-y-1.5 text-xs text-foreground/70">
                        <li className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                          <span>Complete blood panel</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                          <span>VO₂ max cardiopulmonary test</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: categoryColors.longevity.primary }} />
                          <span>Personalized longevity recommendations</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Guest Passes */}
                  <div className="mt-3 rounded-lg border border-border/40 bg-card/20 p-3 text-center">
                    <p className="text-xs text-foreground/70">
                      <span className="font-medium text-foreground">Bonus:</span> 12 guest passes per year to share the Hamaria experience
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ADD-ON PROGRAMS SECTION - ACCORDION INTERFACE */}
        <div ref={programsRef} data-section="programs" id="programs-section" className="px-6 pb-8 sm:pb-10 sm:px-6 md:px-8 lg:px-10 xl:px-12 scroll-mt-20">
          <div className={`mx-auto max-w-6xl transition-all duration-1000 ${
            programsVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}>
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 max-w-4xl mx-auto">
              <h2 className="text-lg sm:text-xl md:text-2xl font-light text-foreground mb-2 sm:mb-3">
                {t.memberships.addOnPrograms}
              </h2>
              <p className="text-sm text-foreground/70 mb-2">
                {t.memberships.addOnProgramsSubtitle}
              </p>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Enhance your base membership with specialized programs designed for specific wellness goals
              </p>
            </div>

            {/* Programs Accordion */}
            <div className="space-y-3">
              {addOnPrograms.map((program) => (
                <div key={program.id} className="rounded-lg border border-border/30 bg-card/20 backdrop-blur-sm overflow-hidden">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleProgram(program.id)}
                    className="w-full p-4 hover:bg-card/30 transition-all duration-300 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div 
                            className="h-3 w-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: program.color }}
                          />
                          <h3 className="text-base sm:text-lg font-medium text-foreground">
                            {language === "es" ? program.nameES : program.name}
                          </h3>
                          <span 
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${program.color}20`,
                              color: program.color
                            }}
                          >
                            +€{program.yearlyPrice.toLocaleString()}/year
                          </span>
                        </div>
                        <p className="text-xs uppercase tracking-wide text-foreground/60">
                          {language === "es" ? program.taglineES : program.tagline}
                        </p>
                      </div>
                      {expandedPrograms[program.id] ? (
                        <ChevronUp className="h-5 w-5 text-foreground/50 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-foreground/50 flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {expandedPrograms[program.id] && (
                    <div className="px-4 pb-4 border-t border-border/20">
                      <div className="pt-4 space-y-4">
                        {/* Description */}
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {language === "es" ? program.descriptionES : program.description}
                        </p>

                        {/* Features */}
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Features Included</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(language === "es" ? program.featuresES : program.features).map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2 p-2 rounded-md bg-card/20">
                                <Check 
                                  className="h-4 w-4 flex-shrink-0 mt-0.5" 
                                  style={{ color: program.color }} 
                                />
                                <span className="text-xs text-foreground/80 leading-relaxed">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Session Count */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-card/20 border border-border/30">
                          <p className="text-xs uppercase tracking-wide text-foreground/50">
                            Annual Sessions
                          </p>
                          <p className="text-base sm:text-lg font-medium text-foreground">
                            {language === "es" ? program.sessionCountES : program.sessionCount}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-2">
                          <MagneticButton
                            variant="primary"
                            className="w-full shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 text-sm py-3 px-6 min-h-[44px]"
                            onClick={() => router.push("/apply")}
                          >
                            {t.memberships.applyNow}
                          </MagneticButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FINAL CTA SECTION */}
        <div className="px-6 pb-12 sm:pb-16 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-lg sm:text-xl md:text-2xl font-light text-foreground mb-4 sm:mb-6">
              Ready to begin your wellness journey?
            </h3>
            
            <div className="flex flex-col items-stretch sm:items-center gap-3 sm:flex-row sm:justify-center max-w-lg mx-auto">
              {/* Apply Now */}
              <MagneticButton
                variant="primary"
                className="w-full sm:w-auto min-w-[180px] shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 text-sm sm:text-base py-3 px-6 min-h-[44px]"
                onClick={() => router.push("/apply")}
              >
                {t.memberships.applyNow}
              </MagneticButton>
              
              {/* Schedule Tour */}
              <MagneticButton
                variant="secondary"
                className="w-full sm:w-auto min-w-[180px] text-sm sm:text-base py-3 px-6 border min-h-[44px]"
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
