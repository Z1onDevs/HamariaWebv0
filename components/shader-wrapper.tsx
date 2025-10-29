"use client"

import { useEffect, useState } from "react"

import { Shader, ChromaFlow, Swirl } from "shaders/react"

export function ShaderWrapper() {
  const [isClient, setIsClient] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [fallback, setFallback] = useState<JSX.Element | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || hasError) {
    return fallback ?? (
      <div className="h-full w-full bg-gradient-to-br from-[#1275d8] via-[#0066ff] to-[#e19136]" />
    )
  }

  if (fallback) {
    return fallback
  }

  const shaderContent = (
    <Shader className="h-full w-full">
      <Swirl
        colorA="#1275d8"
        colorB="#e19136"
        speed={0.8}
        detail={0.8}
        blend={50}
        coarseX={40}
        coarseY={40}
        mediumX={40}
        mediumY={40}
        fineX={40}
        fineY={40}
      />
      <ChromaFlow
        baseColor="#0066ff"
        upColor="#0066ff"
        downColor="#d1d1d1"
        leftColor="#e19136"
        rightColor="#e19136"
        intensity={0.9}
        radius={1.8}
        momentum={25}
        maskType="alpha"
        opacity={0.97}
      />
    </Shader>
  )

  try {
    return shaderContent
  } catch (error) {
    setHasError(true)
    const gradientFallback = (
      <div className="h-full w-full bg-gradient-to-br from-[#1275d8] via-[#0066ff] to-[#e19136]" />
    )
    setFallback(gradientFallback)
    return gradientFallback
  }
}
