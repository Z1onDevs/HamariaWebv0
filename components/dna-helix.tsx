"use client"

import { useEffect, useRef, useState } from "react"

interface DNAHelixProps {
  scrollProgress?: number
}

interface Particle {
  position: number
  speed: number
  strand: 0 | 1
  life: number
}

export function DNAHelix({ scrollProgress = 0 }: DNAHelixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const rotationRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 200, height: 700 })
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      setIsSmallScreen(width < 1024)
      
      if (width < 1024) {
        setDimensions({ width: 160, height: 560 })
      } else if (width < 1536) {
        setDimensions({ width: 180, height: 640 })
      } else {
        setDimensions({ width: 200, height: 700 })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = dimensions
    const centerX = width / 2
    const centerY = height / 2
    const helixRadius = width * 0.25
    const helixHeight = height * 0.8
    const segments = 50
    const baseRotation = scrollProgress * Math.PI * 3

    // Dynamic intensity based on scroll (0.3 idle, 1.0 when scrolling)
    const intensity = 0.3 + scrollProgress * 0.7
    const glowIntensity = 0.2 + scrollProgress * 0.8

    // Manage particles
    if (scrollProgress > 0.1 && Math.random() < scrollProgress * 0.3) {
      particlesRef.current.push({
        position: 0,
        speed: 0.01 + Math.random() * 0.02,
        strand: Math.random() > 0.5 ? 0 : 1,
        life: 1,
      })
    }

    const drawHelix = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connecting base pairs and strands
      const points: Array<{
        x1: number
        y1: number
        z1: number
        x2: number
        y2: number
        z2: number
        y: number
      }> = []

      for (let i = 0; i < segments; i++) {
        const t = i / segments
        const y = (t - 0.5) * helixHeight
        const angle = t * Math.PI * 4 + rotationRef.current + baseRotation

        // First strand
        const x1 = centerX + Math.cos(angle) * helixRadius
        const z1 = Math.sin(angle) * helixRadius
        const y1Pos = centerY + y

        // Second strand (opposite side)
        const x2 = centerX + Math.cos(angle + Math.PI) * helixRadius
        const z2 = Math.sin(angle + Math.PI) * helixRadius
        const y2Pos = centerY + y

        points.push({ x1, y1: y1Pos, z1, x2, y2: y2Pos, z2, y })
      }

      // Sort by z-depth for proper rendering
      points.sort((a, b) => (a.z1 + a.z2) - (b.z1 + b.z2))

      // Enhanced glow backdrop
      if (scrollProgress > 0.2) {
        points.forEach((point, i) => {
          if (i % 3 === 0) {
            const depthOpacity = (point.z1 + helixRadius) / (helixRadius * 2)
            const radius = 25 * glowIntensity
            const gradient = ctx.createRadialGradient(point.x1, point.y1, 0, point.x1, point.y1, radius)
            gradient.addColorStop(0, `rgba(95, 105, 65, ${depthOpacity * glowIntensity * 0.4})`)
            gradient.addColorStop(0.5, `rgba(95, 105, 65, ${depthOpacity * glowIntensity * 0.15})`)
            gradient.addColorStop(1, "rgba(95, 105, 65, 0)")
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(point.x1, point.y1, radius, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      }

      // Draw base pairs (connecting lines) with enhanced thickness
      points.forEach((point, i) => {
        const opacity = (point.z1 + helixRadius) / (helixRadius * 2)
        const baseOpacity = 0.3 + intensity * 0.5
        
        // Draw connection between strands
        ctx.beginPath()
        ctx.moveTo(point.x1, point.y1)
        ctx.lineTo(point.x2, point.y2)
        ctx.strokeStyle = `rgba(95, 105, 65, ${opacity * baseOpacity})`
        ctx.lineWidth = 1 + intensity * 1.5
        ctx.stroke()

        // Glow on connections when scrolling
        if (scrollProgress > 0.3 && i % 2 === 0) {
          ctx.shadowBlur = 10 * scrollProgress
          ctx.shadowColor = `rgba(95, 105, 65, ${scrollProgress * 0.6})`
          ctx.stroke()
          ctx.shadowBlur = 0
        }
      })

      // Draw the two helical strands with enhanced definition
      for (let strand = 0; strand < 2; strand++) {
        // Draw glow layer first
        if (scrollProgress > 0.2) {
          ctx.shadowBlur = 15 * scrollProgress
          ctx.shadowColor = `rgba(95, 105, 65, ${scrollProgress * 0.8})`
        }

        ctx.beginPath()
        
        points.forEach((point, i) => {
          const x = strand === 0 ? point.x1 : point.x2
          const y = strand === 0 ? point.y1 : point.y2
          const z = strand === 0 ? point.z1 : point.z2
          const opacity = (z + helixRadius) / (helixRadius * 2)

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }

          // Draw nodes with enhanced size and glow
          const nodeSize = 3 + intensity * 2
          const nodeOpacity = 0.6 + intensity * 0.4
          ctx.fillStyle = `rgba(95, 105, 65, ${opacity * nodeOpacity})`
          ctx.beginPath()
          ctx.arc(x, y, nodeSize, 0, Math.PI * 2)
          ctx.fill()

          // Add bright core to nodes when scrolling
          if (scrollProgress > 0.4) {
            ctx.fillStyle = `rgba(130, 145, 90, ${opacity * scrollProgress * 0.6})`
            ctx.beginPath()
            ctx.arc(x, y, nodeSize * 0.5, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        const strandOpacity = 0.5 + intensity * 0.4
        ctx.strokeStyle = `rgba(95, 105, 65, ${strandOpacity})`
        ctx.lineWidth = 2 + intensity * 2
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Draw energy particles flowing along the helix
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.position += particle.speed
        particle.life -= 0.01

        if (particle.position >= 1 || particle.life <= 0) return false

        const t = particle.position
        const y = (t - 0.5) * helixHeight
        const angle = t * Math.PI * 4 + rotationRef.current + baseRotation
        const offset = particle.strand === 0 ? 0 : Math.PI

        const x = centerX + Math.cos(angle + offset) * helixRadius
        const z = Math.sin(angle + offset) * helixRadius
        const yPos = centerY + y
        const depthOpacity = (z + helixRadius) / (helixRadius * 2)

        // Draw particle with glow
        const particleSize = 4 + scrollProgress * 3
        const gradient = ctx.createRadialGradient(x, yPos, 0, x, yPos, particleSize * 3)
        gradient.addColorStop(0, `rgba(130, 145, 90, ${depthOpacity * particle.life * 0.9})`)
        gradient.addColorStop(0.4, `rgba(95, 105, 65, ${depthOpacity * particle.life * 0.5})`)
        gradient.addColorStop(1, "rgba(95, 105, 65, 0)")
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, yPos, particleSize * 3, 0, Math.PI * 2)
        ctx.fill()

        // Bright core
        ctx.fillStyle = `rgba(150, 165, 105, ${depthOpacity * particle.life * 0.8})`
        ctx.beginPath()
        ctx.arc(x, yPos, particleSize * 0.6, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

      // Rotation speed increases with scroll
      rotationRef.current += 0.005 + scrollProgress * 0.015
      animationFrameRef.current = requestAnimationFrame(drawHelix)
    }

    drawHelix()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions, scrollProgress])

  return (
    <div className="flex items-center justify-center" style={{ opacity: 0.3 + scrollProgress * 0.5 }}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="animate-in fade-in duration-1000 delay-700"
        style={{ 
          filter: `brightness(${1 + scrollProgress * 0.4}) saturate(${1 + scrollProgress * 0.5}) contrast(${isSmallScreen ? 1.5 : 1})` 
        }}
      />
    </div>
  )
}

