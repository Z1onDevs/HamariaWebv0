"use client"

import { MagneticButton } from "./magnetic-button"
import { useTranslation } from "@/hooks/use-translation"

interface StickyCTAProps {
  currentSection: number
  onApply: () => void
  isLoaded: boolean
}

export function StickyCTA({ currentSection, onApply, isLoaded }: StickyCTAProps) {
  const { t } = useTranslation()
  
  // Hide when on membership section (section 4) or contact (section 5)
  const shouldShow = currentSection !== 4 && currentSection !== 5

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transition-all duration-500 sm:bottom-8 lg:hidden ${
        isLoaded && shouldShow 
          ? "translate-y-0 opacity-100 animate-float-subtle" 
          : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      <MagneticButton
        variant="primary"
        size="default"
        className="shadow-lg shadow-primary/20 text-sm font-semibold"
        onClick={onApply}
      >
        {t.applyButtonShort}
      </MagneticButton>
    </div>
  )
}

