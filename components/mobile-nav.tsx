"use client"

import { useState, useEffect } from "react"
import { X, Menu } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface MobileNavProps {
  currentSection: number
  onNavigate: (index: number) => void
  isLoaded: boolean
}

export function MobileNav({ currentSection, onNavigate, isLoaded }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleNavigate = (index: number) => {
    onNavigate(index)
    setIsOpen(false)
  }

  const getSectionIndex = (item: string, index: number) => {
    if (item === "Membership" || item === "Membresía") return 4
    if (item === "Contact" || item === "Contacto") return 5
    return index
  }

  return (
    <>
      {/* Hamburger Button - Only visible on mobile/tablet */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-center rounded-lg border border-primary/20 bg-background/80 p-2 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-background/90 lg:hidden ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-foreground sm:h-6 sm:w-6" />
      </button>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998] animate-in fade-in duration-300 lg:hidden"
            onClick={() => setIsOpen(false)}
            style={{
              background: 'rgba(var(--color-background), 0.4)',
              backdropFilter: 'blur(12px)',
            }}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 z-[9999] h-full w-[280px] animate-in slide-in-from-right duration-300 lg:hidden sm:w-[320px]">
            <div 
              className="flex h-full flex-col border-l border-primary/10 shadow-2xl"
              style={{
                background: 'rgba(250, 248, 245, 0.85)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-primary/10 p-4 sm:p-5">
                <h2 className="font-sans text-lg font-light tracking-wide text-foreground sm:text-xl">
                  {t.siteName}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-primary/10 bg-background/40 p-2 transition-all hover:border-primary/20 hover:bg-background/60"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-foreground sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4 sm:p-6">
                <ul className="space-y-2">
                  {t.nav.map((item: string, index: number) => {
                    const sectionIndex = getSectionIndex(item, index)
                    const isActive = currentSection === sectionIndex

                    return (
                      <li 
                        key={item}
                        className="animate-in slide-in-from-right fade-in"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animationDuration: '400ms',
                          animationFillMode: 'backwards',
                        }}
                      >
                        <button
                          onClick={() => handleNavigate(sectionIndex)}
                          className={`group relative w-full rounded-lg px-4 py-3 text-left transition-all duration-300 sm:px-5 sm:py-4 ${
                            isActive
                              ? "bg-primary/15 text-foreground shadow-sm scale-105"
                              : "text-foreground/70 hover:bg-background/40 hover:text-foreground hover:scale-105 hover:translate-x-1"
                          }`}
                          style={{
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        >
                          <span className="font-sans text-base font-light tracking-wide sm:text-lg">
                            {item}
                          </span>
                          {isActive && (
                            <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-primary shadow-sm shadow-primary/30 animate-in slide-in-from-left duration-300" />
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* Footer - Apply Button */}
              <div className="border-t border-primary/10 p-4 sm:p-5">
                <button
                  onClick={() => handleNavigate(4)}
                  className="w-full rounded-lg bg-primary px-6 py-3 font-sans text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md sm:text-base"
                >
                  {t.applyButton}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

