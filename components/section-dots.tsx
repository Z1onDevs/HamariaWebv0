"use client"

interface SectionDotsProps {
  totalSections: number
  currentSection: number
  onNavigate: (index: number) => void
  isLoaded: boolean
}

export function SectionDots({ totalSections, currentSection, onNavigate, isLoaded }: SectionDotsProps) {
  // Don't render section dots - not needed
  return null
}

