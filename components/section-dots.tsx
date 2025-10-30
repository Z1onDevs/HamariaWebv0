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
      className={`fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-3 rounded-full border border-primary/20 bg-background/80 px-2 py-4 backdrop-blur-md transition-all duration-700 sm:right-6 sm:gap-4 sm:px-2.5 sm:py-5 lg:hidden ${
        isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      }`}
    >
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          className="group relative p-1.5"
          aria-label={`Go to section ${index + 1}`}
        >
          <div
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-primary h-3 w-3"
                : "bg-foreground/30 hover:bg-foreground/50 group-hover:scale-110"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

