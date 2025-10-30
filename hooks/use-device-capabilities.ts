import { useState, useEffect } from "react"

interface DeviceCapabilities {
  isLowEnd: boolean
  isTouchDevice: boolean
  prefersReducedMotion: boolean
  hasGoodConnection: boolean
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEnd: false,
    isTouchDevice: false,
    prefersReducedMotion: false,
    hasGoodConnection: true,
  })

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.matchMedia("(hover: none) and (pointer: coarse)").matches

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Detect low-end device (basic heuristics)
    const isLowEnd = (() => {
      // Check device memory (if available)
      const memory = (navigator as any).deviceMemory
      if (memory && memory < 4) return true

      // Check hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency
      if (cores && cores < 4) return true

      // Check for older mobile user agents
      const ua = navigator.userAgent.toLowerCase()
      if (ua.includes('android') && !ua.includes('chrome/9') && !ua.includes('chrome/1')) {
        // Likely older Android
        return true
      }

      return false
    })()

    // Check network connection quality
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    const hasGoodConnection = !connection || 
      connection.effectiveType === '4g' || 
      connection.effectiveType === 'wifi' ||
      !connection.saveData

    setCapabilities({
      isLowEnd,
      isTouchDevice,
      prefersReducedMotion,
      hasGoodConnection,
    })
  }, [])

  return capabilities
}

