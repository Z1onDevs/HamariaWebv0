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
  const [isMobile, setIsMobile] = useState(false)
  const [showStickyColumn, setShowStickyColumn] = useState(true)
  const lastScrollLeft = useRef(0)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle horizontal scroll to show/hide sticky column on mobile
  useEffect(() => {
    if (!isMobile || !tableContainerRef.current) return

    const handleScroll = () => {
      if (!tableContainerRef.current) return
      
      const currentScrollLeft = tableContainerRef.current.scrollLeft
      
      // Hide sticky column when scrolling left (viewing other columns)
      if (currentScrollLeft > 20) {
        if (currentScrollLeft > lastScrollLeft.current) {
          // Scrolling left (into content)
          setShowStickyColumn(false)
        } else {
          // Scrolling right (back to start)
          setShowStickyColumn(true)
        }
      } else {
        // Near the start, always show
        setShowStickyColumn(true)
      }
      
      lastScrollLeft.current = currentScrollLeft
    }

    const container = tableContainerRef.current
    container.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
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
    <>
      {/* Scroll Hint - Mobile Only */}
      {isMobile && (
        <div className="mb-3 flex items-center justify-center gap-2 text-xs text-foreground/50">
          <span>←</span>
          <span>{memberships.scrollToCompare}</span>
          <span>→</span>
        </div>
      )}
      
      <div 
        ref={tableContainerRef}
        className="membership-comparison overflow-x-auto rounded-xl border border-border/50 bg-card/20"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <table className="w-auto md:w-full min-w-[480px] md:min-w-[800px]">
        {/* Header */}
        <thead className="border-b border-border/30">
          <tr>
            <th 
              className={`sticky left-0 z-10 bg-card/98 px-2 py-3 text-left text-[10px] font-medium text-foreground/70 backdrop-blur-md border-r border-border/30 w-[85px] max-w-[85px] md:w-auto md:max-w-none md:px-6 md:py-4 md:text-sm md:shadow-none md:border-r-0 transition-all duration-300 ${
                isMobile && !showStickyColumn 
                  ? 'opacity-0 -translate-x-full shadow-none' 
                  : 'opacity-100 translate-x-0 shadow-[2px_0_4px_rgba(0,0,0,0.1)]'
              }`}
            >
              {memberships.therapy}
            </th>
            {tiers.map((tierId) => {
              const tier = memberships.tiers[tierId]
              const isCurrentTier = tierId === currentTier
              
              return (
                <th
                  key={tierId}
                  className={`px-3 py-3 text-center w-[110px] md:w-auto md:px-6 md:py-4 ${
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
                      <span className="text-xs font-normal text-foreground/50">{memberships.perMonthShort}</span>
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
              className="bg-foreground/10 px-3 py-2 text-xs font-medium uppercase tracking-wide text-foreground/60 md:px-6"
            >
              {memberships.monthlyTherapies}
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
                    className={`sticky left-0 z-10 bg-card/98 px-2 py-2 text-[10px] text-foreground/80 backdrop-blur-md border-r border-border/30 w-[85px] max-w-[85px] truncate md:w-auto md:max-w-none md:px-6 md:py-3 md:text-sm md:shadow-none md:border-r-0 transition-all duration-300 ${
                      isMobile && !showStickyColumn 
                        ? 'opacity-0 -translate-x-full shadow-none' 
                        : 'opacity-100 translate-x-0 shadow-[2px_0_4px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    {language === "es" ? therapy.nameES : therapy.name}
                  </td>
                  {tiers.map((tierId) => {
                    const allocation = therapy.allocations[tierId as keyof typeof therapy.allocations]
                    const isCurrentTier = tierId === currentTier
                    
                    return (
                      <td
                        key={tierId}
                        className={`px-3 py-3 text-center w-[110px] md:w-auto md:px-6 ${
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
              className="bg-foreground/10 px-3 py-2 text-xs font-medium uppercase tracking-wide text-foreground/60 md:px-6"
            >
              {memberships.yearlyTherapies}
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
                    className={`sticky left-0 z-10 bg-card/98 px-2 py-2 text-[10px] text-foreground/80 backdrop-blur-md border-r border-border/30 w-[85px] max-w-[85px] truncate md:w-auto md:max-w-none md:px-6 md:py-3 md:text-sm md:shadow-none md:border-r-0 transition-all duration-300 ${
                      isMobile && !showStickyColumn 
                        ? 'opacity-0 -translate-x-full shadow-none' 
                        : 'opacity-100 translate-x-0 shadow-[2px_0_4px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    {language === "es" ? therapy.nameES : therapy.name}
                  </td>
                  {tiers.map((tierId) => {
                    const allocation = therapy.allocations[tierId as keyof typeof therapy.allocations]
                    const isCurrentTier = tierId === currentTier
                    
                    return (
                      <td
                        key={tierId}
                        className={`px-3 py-2 text-center w-[110px] md:w-auto md:px-6 md:py-3 ${
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
    </>
  )
}

