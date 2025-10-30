import { useEffect, useRef } from "react"

interface SwipeToCloseOptions {
  onClose: () => void
  threshold?: number
  enabled?: boolean
}

export function useSwipeToClose({ onClose, threshold = 100, enabled = true }: SwipeToCloseOptions) {
  const startY = useRef(0)
  const currentY = useRef(0)
  const isDragging = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY
      currentY.current = e.touches[0].clientY
      isDragging.current = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return
      currentY.current = e.touches[0].clientY
      const deltaY = currentY.current - startY.current

      // Only allow downward swipe
      if (deltaY > 0) {
        // Prevent default scrolling behavior
        const target = e.target as HTMLElement
        const scrollTop = target.scrollTop || 0
        
        // Only prevent if at top of scrollable content
        if (scrollTop === 0) {
          e.preventDefault()
        }
      }
    }

    const handleTouchEnd = () => {
      if (!isDragging.current) return
      
      const deltaY = currentY.current - startY.current
      
      // Close if swiped down beyond threshold
      if (deltaY > threshold) {
        onClose()
      }
      
      isDragging.current = false
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [onClose, threshold, enabled])
}

