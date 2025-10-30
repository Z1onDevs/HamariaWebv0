"use client"

interface SectionDotsProps {
  totalSections: number
  currentSection: number
  onNavigate: (index: number) => void
  isLoaded: boolean
}

export function SectionDots({ totalSections, currentSection, onNavigate, isLoaded }: SectionDotsProps) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-2 backdrop-blur-md transition-all duration-700 sm:bottom-8 sm:gap-3 sm:px-4 sm:py-2.5 lg:hidden ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          className="group relative p-2"
          aria-label={`Go to section ${index + 1}`}
        >
          <div
            className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-2.5 sm:w-2.5 ${
              currentSection === index
                ? "bg-primary scale-125"
                : "bg-foreground/30 hover:bg-foreground/50 group-hover:scale-110"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

