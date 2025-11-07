"use client"

import { useState } from "react"

interface ServiceTagProps {
  id: string
  label: string
  position: { x: number; y: number } // percentage-based positioning (for connection lines)
  side: "left" | "right"
  verticalPosition: number // 1, 2, 3, or 4 from top
  color: string
  count?: number
  delay?: number
  isActive?: boolean
  onClick?: () => void
  onHover?: (isHovered: boolean) => void
}

export function InteractiveServiceTag({
  id,
  label,
  position,
  side,
  verticalPosition,
  color,
  count,
  delay = 0,
  isActive = false,
  onClick,
  onHover,
}: ServiceTagProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover?.(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover?.(false)
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer animate-in fade-in zoom-in"
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "600ms",
        animationFillMode: "backwards",
      }}
      aria-label={`${label} - ${count} services`}
    >
      {/* Main tag container - compact card */}
      <div className="relative flex items-center transition-all duration-300">
        {/* Glow effect on hover/active */}
        <div
          className="pointer-events-none absolute inset-0 blur-2xl transition-opacity duration-300"
          style={{
            backgroundColor: color,
            opacity: isHovered || isActive ? 0.4 : 0,
            transform: "scale(1.8)",
          }}
        />

        {/* Tag content - Compact on small screens */}
        <div
          className={`relative rounded-lg border-2 backdrop-blur-md px-2 py-1.5 transition-all duration-300 md:px-3 md:py-2 lg:px-4 lg:py-2.5 ${
            isActive ? "shadow-lg" : "shadow-md"
          } ${isHovered ? "scale-105" : "scale-100"} active:scale-95`}
          style={{
            backgroundColor: isHovered || isActive ? `${color}20` : `${color}10`,
            borderColor: isHovered || isActive ? color : `${color}60`,
            boxShadow: isHovered || isActive
              ? `0 0 20px ${color}40, 0 4px 15px rgba(0,0,0,0.15)`
              : "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex flex-col items-start gap-0.5">
            {/* Label - Responsive text sizing */}
            <span
              className="whitespace-nowrap font-sans text-[10px] font-medium tracking-wide transition-colors duration-300 md:text-xs lg:text-sm xl:text-base text-foreground"
            >
              {label}
            </span>
            
            {/* Count - Hide on very small desktop, show on larger */}
            {count !== undefined && (
              <span
                className="hidden text-[9px] font-light opacity-70 lg:inline md:text-[10px] xl:text-xs"
                style={{ color }}
              >
                {count} offerings
              </span>
            )}
          </div>

          {/* Active indicator */}
          {isActive && (
            <div
              className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 animate-pulse rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
        </div>
      </div>
    </button>
  )
}
