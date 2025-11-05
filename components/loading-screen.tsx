"use client"

import { useEffect, useState } from "react"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.width = "100%"
    document.body.style.height = "100%"

    // Minimum loading time for smooth experience
    const minLoadTime = 1500
    const startTime = Date.now()

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minLoadTime - elapsedTime)

      setTimeout(() => {
        setFadeOut(true)
        // Remove from DOM after fade out animation
        setTimeout(() => {
          setIsLoading(false)
          // Unlock scrolling
          document.body.style.overflow = ""
          document.body.style.position = ""
          document.body.style.width = ""
          document.body.style.height = ""
        }, 800)
      }, remainingTime)
    }

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center transition-opacity duration-800 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <ShaderWrapper />
        <div className="absolute inset-0 bg-background/80" />
      </div>
      <GrainOverlay />

      {/* Hamaria Text Animation */}
      <div className="relative z-10">
        {/* Main Text with Individual Letter Animations */}
        <h1
          className="font-sans text-6xl font-light tracking-wider text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          style={{
            letterSpacing: "0.15em",
          }}
        >
          {["H", "A", "M", "A", "R", "I", "A"].map((letter, index) => (
            <span
              key={index}
              className={`inline-block ${fadeOut ? "" : "animate-letter-charge"}`}
              style={{
                animation: fadeOut
                  ? "none"
                  : `letterCharge 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s forwards`,
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Animated Underline */}
        <div className="relative mt-4 overflow-hidden sm:mt-6 md:mt-8">
          <div
            className={`h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent ${
              fadeOut ? "" : "animate-line-expand"
            }`}
            style={{
              animation: fadeOut
                ? "none"
                : "lineExpand 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
              transformOrigin: "center",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Pulsing Dot */}
        <div className="mt-8 flex justify-center sm:mt-10 md:mt-12">
          <div
            className={`h-2 w-2 rounded-full bg-primary ${fadeOut ? "" : "animate-pulse-dot"}`}
            style={{
              animation: fadeOut ? "none" : "pulseDot 1.5s ease-in-out 0.6s infinite",
            }}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes letterCharge {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes lineExpand {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes pulseDot {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  )
}

