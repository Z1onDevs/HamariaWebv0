"use client"

import { useTranslation } from "@/hooks/use-translation"
import { Check, X } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { therapyMatrix } from "@/lib/therapy-matrix"

interface MembershipComparisonProps {
  currentTier?: string
}

export function MembershipComparison({ currentTier }: MembershipComparisonProps) {
  const { t, language } = useTranslation()
  const memberships = t.memberships
  const tiers = ["longevity", "performance", "aesthetics"]
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [hideTherapyNames, setHideTherapyNames] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Detect horizontal scroll to hide/show therapy names on mobile
  useEffect(() => {
    if (!isMobile || !tableContainerRef.current) return

    const container = tableContainerRef.current
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // Hide therapy names when scrolled left (showing more plans)
      if (scrollLeft > 50) {
        setHideTherapyNames(true)
      } else {
        // Show therapy names when scrolled back to the right
        scrollTimeout = setTimeout(() => {
          setHideTherapyNames(false)
        }, 150) // Small delay to prevent flickering
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [isMobile])

  const renderAllocation = (value: number | string) => {
    if (value === "Unlimited") {
      return (
        <span className="font-mono text-xs text-foreground/70">
          {memberships.unlimited}
        </span>
      )
    }
    if (!value || value === 0) {
      return <X className="mx-auto h-4 w-4 text-foreground/30" />
    }
    return (
      <span className="font-mono text-xs text-foreground/70">
        {value}
      </span>
    )
  }

  return (
    <div 
      ref={tableContainerRef}
      className="membership-comparison overflow-x-auto rounded-xl border border-border/50 bg-card/20"
    >
      <table className="w-full min-w-[800px]">
        {/* Header */}
        <thead className="border-b border-border/30">
          <tr>
            <th 
              className={`sticky left-0 z-10 bg-card/60 px-6 py-4 text-left text-sm font-medium text-foreground/70 backdrop-blur-sm transition-all duration-300 ${
                isMobile && hideTherapyNames 
                  ? 'w-0 px-0 opacity-0 overflow-hidden' 
                  : 'w-auto'
              }`}
            >
              {(!isMobile || !hideTherapyNames) && "Therapy"}
            </th>
            {tiers.map((tierId) => {
              const tier = memberships.tiers[tierId]
              const isCurrentTier = tierId === currentTier
              
              return (
                <th
                  key={tierId}
                  className={`px-6 py-4 text-center ${
                    isCurrentTier ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: `${tier.color}20`,
                        color: tier.color,
                        border: `1px solid ${tier.color}40`,
                      }}
                    >
                      {tier.name}
                    </div>
                    <div className="text-lg font-light text-foreground">
                      €{tier.monthlyPrice}
                      <span className="text-xs font-normal text-foreground/50">/mo</span>
                    </div>
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>

          {/* Therapies */}
        <tbody>
          <tr className="border-b border-border/30">
            <td 
              colSpan={4} 
              className={`bg-foreground/10 px-6 py-2 text-xs font-medium uppercase tracking-wide text-foreground/60 transition-all duration-300 ${
                isMobile && hideTherapyNames ? 'px-0' : ''
              }`}
            >
              {(!isMobile || !hideTherapyNames) && memberships.monthlyTherapies}
            </td>
          </tr>

          {therapyMatrix
            .filter((therapy) => !therapy.isYearly)
            .map((therapy, index) => {
              const hasAnyAllocation = Object.values(therapy.allocations).some(
                (val) => val !== 0 && val !== null && val !== undefined
              )
              if (!hasAnyAllocation) return null

              return (
                <tr
                  key={index}
                  className="border-b border-border/10 last:border-0 transition-colors hover:bg-foreground/5"
                >
                  <td 
                    className={`sticky left-0 z-10 bg-card/60 px-6 py-3 text-sm text-foreground/80 backdrop-blur-sm transition-all duration-300 ${
                      isMobile && hideTherapyNames 
                        ? 'w-0 px-0 opacity-0 overflow-hidden' 
                        : 'w-auto'
                    }`}
                  >
                    {(!isMobile || !hideTherapyNames) && (language === "es" ? therapy.nameES : therapy.name)}
                  </td>
                  {tiers.map((tierId) => {
                    const allocation = therapy.allocations[tierId as keyof typeof therapy.allocations]
                    const isCurrentTier = tierId === currentTier
                    
                    return (
                      <td
                        key={tierId}
                        className={`px-6 py-3 text-center ${
                          isCurrentTier ? "bg-primary/5" : ""
                        }`}
                      >
                        {renderAllocation(allocation)}
                      </td>
                    )
                  })}
                </tr>
              )
            })}

          {/* Yearly Therapies */}
          <tr className="border-b border-border/30">
            <td 
              colSpan={4} 
              className={`bg-foreground/10 px-6 py-2 text-xs font-medium uppercase tracking-wide text-foreground/60 transition-all duration-300 ${
                isMobile && hideTherapyNames ? 'px-0' : ''
              }`}
            >
              {(!isMobile || !hideTherapyNames) && memberships.yearlyTherapies}
            </td>
          </tr>

          {therapyMatrix
            .filter((therapy) => therapy.isYearly)
            .map((therapy, index) => {
              const hasAnyAllocation = Object.values(therapy.allocations).some(
                (val) => val !== 0 && val !== null && val !== undefined
              )
              if (!hasAnyAllocation) return null

              return (
                <tr
                  key={index}
                  className="border-b border-border/10 last:border-0 transition-colors hover:bg-foreground/5"
                >
                  <td 
                    className={`sticky left-0 z-10 bg-card/60 px-6 py-3 text-sm text-foreground/80 backdrop-blur-sm transition-all duration-300 ${
                      isMobile && hideTherapyNames 
                        ? 'w-0 px-0 opacity-0 overflow-hidden' 
                        : 'w-auto'
                    }`}
                  >
                    {(!isMobile || !hideTherapyNames) && (language === "es" ? therapy.nameES : therapy.name)}
                  </td>
                  {tiers.map((tierId) => {
                    const allocation = therapy.allocations[tierId as keyof typeof therapy.allocations]
                    const isCurrentTier = tierId === currentTier
                    
                    return (
                      <td
                        key={tierId}
                        className={`px-6 py-3 text-center ${
                          isCurrentTier ? "bg-primary/5" : ""
                        }`}
                      >
                        {renderAllocation(allocation)}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

