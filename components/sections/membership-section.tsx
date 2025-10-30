"use client"

import { useMemo, useState, useEffect } from "react"
import { createPortal } from "react-dom"

import { useReveal } from "@/hooks/use-reveal"
import { useTranslation } from "@/hooks/use-translation"
import { useSwipeToClose } from "@/hooks/use-swipe-to-close"
import { MagneticButton } from "@/components/magnetic-button"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { X } from "lucide-react"

type MembershipKey = "core" | "performance" | "aesthetics"

const membershipDefinitions = [
  {
    key: "core" as const,
    name: "Longevity +",
    description: "Foundational therapies curated for holistic wellbeing",
    highlighted: false,
  },
  {
    key: "performance" as const,
    name: "Performance +",
    description: "Add performance and recovery optimization to your Longevity + program",
    highlighted: true,
  },
  {
    key: "aesthetics" as const,
    name: "Aesthetics +",
    description: "Add aesthetic and regenerative treatments to your Longevity + program",
    highlighted: false,
  },
] satisfies Array<{
  key: MembershipKey
  name: string
  description: string
  highlighted: boolean
}>

const therapyMatrix = [
  {
    name: "Cryotherapy (electric chamber)",
    allocations: { core: 2, performance: 4, aesthetics: 4 },
  },
  {
    name: "Cold plunge",
    allocations: { core: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
  },
  {
    name: "IHHT (intermittent hypoxic-hyperoxic)",
    allocations: { core: 0, performance: 4, aesthetics: 0 },
  },
  {
    name: "Hyperbaric oxygen therapy (HBOT)",
    allocations: { core: 1, performance: 4, aesthetics: 4 },
  },
  {
    name: "Red light therapy (full body)",
    allocations: { core: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
  },
  {
    name: "Microcurrent & LED facial",
    allocations: { core: 0, performance: 0, aesthetics: 4 },
  },
  {
    name: "Indiba (RF/Tecar)",
    allocations: { core: 0, performance: 0, aesthetics: 2 },
  },
  {
    name: "Pressotherapy",
    allocations: { core: 4, performance: "Unlimited", aesthetics: "Unlimited" },
  },
  {
    name: "Pilates (class/session)",
    allocations: { core: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
  },
  {
    name: "Floatation (sensory tank)",
    allocations: { core: 1, performance: 2, aesthetics: 3 },
  },
  {
    name: "Sauna session",
    allocations: { core: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
  },
  {
    name: "Masaje linfático",
    allocations: { core: 0, performance: 1, aesthetics: 2 },
  },
  {
    name: "Masaje terapéutico",
    allocations: { core: 1, performance: 4, aesthetics: 4 },
  },
  {
    name: "Signature massage",
    allocations: { core: 0, performance: 0, aesthetics: 1 },
  },
  {
    name: "Swim",
    allocations: { core: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
  },
  {
    name: "Personal trainer",
    allocations: { core: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
  },
  {
    name: "Baseline assessment (per year)",
    allocations: { core: 1, performance: 1, aesthetics: 1 },
  },
  {
    name: "VO2 max (per year)",
    allocations: { core: 0, performance: 4, aesthetics: 0 },
  },
  {
    name: "Sofwave (ultrasound facelift) (per year)",
    allocations: { core: 1, performance: 1, aesthetics: 0 },
  },
  {
    name: "Sofwave (ultrasound facelift)",
    allocations: { core: 0, performance: 0, aesthetics: 2 },
  },
  {
    name: "NAD+ IV (per year)",
    allocations: { core: 1, performance: 1, aesthetics: 2 },
  },
] satisfies Array<{
  name: string
  allocations: Record<MembershipKey, number | string>
}>

interface MembershipSectionProps {
  scrollToSection: (index: number) => void
}

export function MembershipSection({ scrollToSection }: MembershipSectionProps) {
  const { ref, isVisible } = useReveal(0.3)
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inviteCode: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string>("")

  // Check if special code is entered
  const isSpecialCode = formData.inviteCode.toUpperCase() === "HAMARIA&FRIENDS"
  const discount = isSpecialCode ? 40 : 30
  const form = t.membershipForm

  // Swipe to close modal
  useSwipeToClose({ 
    onClose: () => setIsModalOpen(false), 
    enabled: isModalOpen 
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement
      if (scrollContainer) {
        scrollContainer.style.overflow = "hidden"
      }
      document.body.style.overflow = "hidden"

      // Close on Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsModalOpen(false)
        }
      }
      window.addEventListener("keydown", handleEscape)

      return () => {
        window.removeEventListener("keydown", handleEscape)
      }
    } else {
      const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement
      if (scrollContainer) {
        scrollContainer.style.overflow = ""
      }
      document.body.style.overflow = ""
    }
  }, [isModalOpen])

  const handleApply = (plan: string) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
    
    // Focus first input after modal opens
    setTimeout(() => {
      const firstInput = document.querySelector('input[type="text"]') as HTMLInputElement
      if (firstInput) {
        firstInput.focus()
      }
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Send email to pedro@hamaria.com
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "pedro@hamaria.com",
          subject: `Membership Application - ${selectedPlan}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          plan: selectedPlan,
          inviteCode: formData.inviteCode,
          discount: discount,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", phone: "", inviteCode: "" })
        setTimeout(() => {
          setIsModalOpen(false)
          setSubmitSuccess(false)
        }, 3000)
      } else {
        setSubmitError(result.error || "Failed to submit application. Please try again.")
        console.error("Failed to submit application:", result)
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatAllocation = (value: number | string, therapyName: string = "") => {
    if (value === "Unlimited") return "Unlimited"
    if (!value || value === 0) return null
    
    // Check if therapy is yearly
    const isYearly = therapyName.includes("(per year)")
    
    if (typeof value === "number") {
    if (value >= 1) {
      const rounded = Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)
      // Don't add /month suffix for yearly therapies
      if (isYearly) return `${rounded.replace(/\.0$/, "")}`
      return `${rounded.replace(/\.0$/, "")}/month`
    }
    const months = Math.round(1 / value)
    return months <= 1 ? "Monthly" : `Every ${months} months`
    }
    return value
  }

  const formatExtraAllocation = (currentValue: number | string, baseValue: number | string, therapyName: string = "") => {
    // If base is Unlimited and current is Unlimited, no difference
    if (baseValue === "Unlimited" && currentValue === "Unlimited") return null
    
    // If base is 0 or doesn't exist, show the full value as new
    if (!baseValue || baseValue === 0) return formatAllocation(currentValue, therapyName)
    
    // If current is Unlimited but base isn't
    if (currentValue === "Unlimited" && baseValue !== "Unlimited") return "Unlimited"
    
    // Check if therapy is yearly
    const isYearly = therapyName.includes("(per year)")
    
    // Calculate numeric difference
    if (typeof currentValue === 'number' && typeof baseValue === 'number') {
      const diff = currentValue - baseValue
      if (diff <= 0) return null
      
      if (diff >= 1) {
        const rounded = Number.isInteger(diff) ? diff.toFixed(0) : diff.toFixed(1)
        // Don't add /month suffix for yearly therapies
        if (isYearly) return `+${rounded.replace(/\.0$/, "")} extra`
        return `+${rounded.replace(/\.0$/, "")} extra/month`
      }
      
      const months = Math.round(1 / diff)
      return `+${months <= 1 ? "1 extra" : `1 extra per ${months} months`}`
    }
    
    return formatAllocation(currentValue, therapyName)
  }

  const formatMinutes = (value: number) =>
    new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1, useGrouping: false }).format(value)

  const memberships = useMemo(
    () =>
      membershipDefinitions.map((membership) => {
        let features: Array<{ name: string; schedule: string; isExtra?: boolean }> = []
        
        if (membership.key === "core") {
          // Core: Show all Core therapies, unlimited first
          features = therapyMatrix
            .map((therapy) => {
              const allocation = therapy.allocations.core
              const schedule = formatAllocation(allocation, therapy.name)
              if (!schedule) return null
              
              return {
                name: therapy.name,
                schedule,
              }
            })
            .filter(Boolean) as Array<{ name: string; schedule: string }>
          
          // Sort: Unlimited first, then by name
          features.sort((a, b) => {
            if (a.schedule === "Unlimited" && b.schedule !== "Unlimited") return -1
            if (a.schedule !== "Unlimited" && b.schedule === "Unlimited") return 1
            return a.name.localeCompare(b.name)
          })
        } else if (membership.key === "performance") {
          // Performance: Show only Performance-specific add-ons showing EXTRA sessions beyond Longevity
          features = therapyMatrix
            .map((therapy) => {
              const coreAllocation = therapy.allocations.core
              const perfAllocation = therapy.allocations.performance
              
              // Skip if Performance doesn't have this therapy
              if (!perfAllocation || perfAllocation === 0) return null
              
              // Show if Longevity doesn't have it, or Performance has more than Longevity
              const isNew = coreAllocation === 0
              const isIncreased = typeof coreAllocation === 'number' && typeof perfAllocation === 'number' && perfAllocation > coreAllocation
              
              if (isNew || isIncreased) {
                const schedule = formatExtraAllocation(perfAllocation, coreAllocation, therapy.name)
                if (!schedule) return null
                
                return {
                  name: therapy.name,
                  schedule,
                  isExtra: true,
                }
              }
              return null
            })
            .filter(Boolean) as Array<{ name: string; schedule: string; isExtra?: boolean }>
        } else if (membership.key === "aesthetics") {
          // Aesthetics: Show only Aesthetics-specific add-ons showing EXTRA sessions beyond Longevity
          features = therapyMatrix
            .map((therapy) => {
              const coreAllocation = therapy.allocations.core
              const aesAllocation = therapy.allocations.aesthetics
              
              // Skip if Aesthetics doesn't have this therapy
              if (!aesAllocation || aesAllocation === 0) return null
              
              // Show if Longevity doesn't have it, or Aesthetics has more than Longevity
              const isNew = coreAllocation === 0
              const isIncreased = typeof coreAllocation === 'number' && typeof aesAllocation === 'number' && aesAllocation > coreAllocation
              
              if (isNew || isIncreased) {
                const schedule = formatExtraAllocation(aesAllocation, coreAllocation, therapy.name)
                if (!schedule) return null
                
                return {
                  name: therapy.name,
                  schedule,
                  isExtra: true,
                }
              }
              return null
            })
            .filter(Boolean) as Array<{ name: string; schedule: string; isExtra?: boolean }>
        }
        
        return {
          ...membership,
          features,
        }
      }),
    []
  )

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-screen shrink-0 snap-start items-center justify-center overflow-y-auto px-5 py-24 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-0 pt-20 sm:px-4 sm:pt-12 md:pt-8">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {memberships.map((membership, i) => (
            <div
              key={i}
              className={`group relative flex flex-col rounded-xl border border-primary/20 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:shadow-md sm:rounded-xl sm:p-4 md:p-5 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div className="mb-3 sm:mb-3">
                <h3 className="mb-1 font-sans text-lg font-light text-foreground sm:mb-1 sm:text-lg md:text-xl">{membership.name}</h3>
                <p className="font-mono text-xs leading-relaxed text-foreground/60 sm:text-xs">{membership.description}</p>
              </div>

              {/* Show inclusion note for higher tiers */}
              {membership.key !== "core" && (
                <div className="mb-3 rounded-md bg-primary/10 px-3 py-2 sm:mb-3 sm:px-3 sm:py-2">
                  <p className="font-mono text-xs text-primary/80 sm:text-xs">
                    {form.includesAll}
                  </p>
                </div>
              )}

              <div className="mb-4 flex-1 overflow-x-auto sm:mb-4">
                <div className="min-w-full">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-foreground/10">
                        <th className="pb-2 text-left font-mono text-xs font-normal uppercase tracking-wide text-foreground/50 sm:pb-2 sm:text-xs">
                          Therapy
                        </th>
                        <th className="pb-2 text-right font-mono text-xs font-normal uppercase tracking-wide text-foreground/50 sm:pb-2 sm:text-xs">
                          Sessions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {membership.features.map((feature, j) => (
                        <tr
                          key={j}
                          className="border-b border-foreground/5 transition-colors active:bg-foreground/10 sm:hover:bg-foreground/5"
                        >
                          <td className="py-2.5 pr-3 text-xs leading-relaxed text-foreground/80 sm:py-2 sm:pr-2 sm:text-xs">
                            {feature.name}
                          </td>
                          <td className="py-2.5 text-right font-mono text-xs tracking-wide text-foreground/60 sm:py-2 sm:text-xs">
                            {feature.schedule}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <MagneticButton
                variant="secondary"
                className="w-full text-xs sm:text-sm"
                onClick={() => handleApply(membership.name)}
              >
                Apply Now
              </MagneticButton>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {mounted && isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Shader Background */}
          <div className="absolute inset-0 z-0">
            <ShaderWrapper />
            <div className="absolute inset-0 bg-background/60" />
          </div>
          <GrainOverlay />

          <div 
            className="relative z-10 h-full w-full sm:h-auto sm:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-20 rounded-full border border-primary/30 bg-background/90 p-3 text-foreground shadow-sm backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-background hover:text-foreground sm:right-0 sm:top-0 sm:-right-12 sm:p-3"
              aria-label="Close form"
            >
              <X className="h-6 w-6 sm:h-6 sm:w-6" />
            </button>

            {/* Modal Content */}
            <div className="relative h-full overflow-y-auto border-primary/20 bg-background p-5 shadow-2xl sm:max-h-[85vh] sm:rounded-2xl sm:border sm:p-6 md:p-8">
              {/* Early Bird Offer Banner */}
              <div className={`mb-5 animate-in fade-in slide-in-from-top-4 rounded-lg border p-3 text-center transition-all duration-300 sm:mb-6 sm:p-4 ${
                isSpecialCode 
                  ? "border-primary/50 bg-primary/20 shadow-lg shadow-primary/20" 
                  : "border-primary/30 bg-primary/10"
              }`}>
                <p className="mb-1 font-sans text-sm font-medium text-foreground sm:text-base md:text-lg">
                  {form.earlyBirdTitle}
                </p>
                <p className={`font-mono text-[10px] leading-relaxed transition-all duration-300 sm:text-xs ${
                  isSpecialCode ? "text-foreground font-semibold" : "text-foreground/80"
                }`}>
                  {form.earlyBirdText} • <span className={isSpecialCode ? "text-primary" : ""}>{discount}% {form.discount}</span>
                </p>
              </div>

              {/* Title */}
              <div className="mb-5 animate-in fade-in slide-in-from-top-4 sm:mb-5 md:mb-6" style={{ animationDelay: "100ms", animationFillMode: "backwards" }}>
                <h2 className="mb-3 font-sans text-2xl font-light tracking-tight text-foreground sm:text-2xl md:text-3xl">
                  {form.applyFor} {selectedPlan}
                </h2>
                <p className="font-mono text-xs text-foreground/60 sm:text-xs">
                  {form.subtitle}
                </p>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-5">
                {/* Name */}
                <div className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "200ms", animationFillMode: "backwards" }}>
                  <label className="mb-2 block font-mono text-sm font-medium text-foreground/70 sm:mb-1.5 sm:text-xs">
                    {form.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-primary/20 bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/40 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:px-4 sm:py-3 sm:text-sm"
                    placeholder={form.namePlaceholder}
                  />
                </div>

                {/* Email */}
                <div className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "300ms", animationFillMode: "backwards" }}>
                  <label className="mb-2 block font-mono text-sm font-medium text-foreground/70 sm:mb-1.5 sm:text-xs">
                    {form.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-primary/20 bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/40 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:px-4 sm:py-3 sm:text-sm"
                    placeholder={form.emailPlaceholder}
                  />
                </div>

                {/* Phone */}
                <div className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "400ms", animationFillMode: "backwards" }}>
                  <label className="mb-2 block font-mono text-sm font-medium text-foreground/70 sm:mb-1.5 sm:text-xs">
                    {form.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-primary/20 bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/40 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:px-4 sm:py-3 sm:text-sm"
                    placeholder={form.phonePlaceholder}
                  />
                </div>

                {/* Invitation Code */}
                <div className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "500ms", animationFillMode: "backwards" }}>
                  <label className="mb-2 block font-mono text-sm font-medium text-foreground/70 sm:mb-1.5 sm:text-xs">
                    {form.inviteLabel} <span className="text-foreground/40">{form.inviteOptional}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.inviteCode}
                    onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
                    className="w-full rounded-lg border border-primary/20 bg-background/50 px-4 py-3.5 font-mono text-sm uppercase tracking-wider text-foreground placeholder:text-foreground/40 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:px-4 sm:py-3 sm:text-sm"
                    placeholder={form.invitePlaceholder}
                  />
                </div>

                {/* Submit Button */}
                <div className="animate-in fade-in slide-in-from-bottom-4 pt-3" style={{ animationDelay: "600ms", animationFillMode: "backwards" }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-primary px-6 py-4 font-sans text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50 sm:px-8 sm:py-3.5 sm:text-sm"
                  >
                    {isSubmitting ? form.submitting : submitSuccess ? form.success : form.submitButton}
                  </button>
                  {submitSuccess && (
                    <p className="mt-3 text-center font-mono text-xs text-primary sm:text-xs">
                      {form.successMessage}
                    </p>
                  )}
                  {submitError && (
                    <p className="mt-3 text-center font-mono text-xs text-destructive sm:text-xs">
                      {submitError}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
