# Mobile Luxury Animations - Implementation Roadmap
## File-by-File Implementation Guide

**Created:** November 7, 2025  
**Companion to:** MOBILE_LUXURY_ANIMATIONS_PLAN.md & MOBILE_ANIMATIONS_VISUAL_GUIDE.md

---

## 📋 Quick Reference

This document maps each animation enhancement from the plan to specific files in your codebase, with exact locations and code changes needed.

---

## 🎯 Phase 1: Enhanced Touch Micro-Interactions

### 1.1 Button Press States

**Files to Modify:**

#### `components/magnetic-button.tsx`
**Current State:** Has magnetic effect on desktop, basic active state  
**Enhancements Needed:**

```typescript
// ADD: Touch ripple effect
// ADD: Enhanced press state animation
// ADD: Mobile-specific spring release

Line 24-50 (handleMouseMove/handleMouseLeave):
// Keep existing desktop behavior

ADD new functions:
const [ripples, setRipples] = useState<Array<{x: number, y: number, id: number}>>([])
const [isPressed, setIsPressed] = useState(false)

const handleTouchStart = (e: React.TouchEvent) => {
  setIsPressed(true)
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.touches[0].clientX - rect.left
  const y = e.touches[0].clientY - rect.top
  setRipples(prev => [...prev, { x, y, id: Date.now() }])
  setTimeout(() => setRipples(prev => prev.slice(1)), 600)
}

const handleTouchEnd = () => {
  setIsPressed(false)
}

Line 66-89 (return statement):
<button
  // ... existing props
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
  onTouchCancel={handleTouchEnd}
  className={`
    ${className}
    ${isPressed ? 'brightness-95' : ''}
    active:scale-95 
    transition-all duration-200
  `}
>
  {/* Ripple effects */}
  {ripples.map((ripple) => (
    <span
      key={ripple.id}
      className="absolute pointer-events-none rounded-full bg-white/30"
      style={{
        left: ripple.x,
        top: ripple.y,
        transform: 'translate(-50%, -50%)',
        animation: 'ripple 600ms cubic-bezier(0, 0, 0.2, 1) forwards',
      }}
    />
  ))}
  
  {/* existing children */}
</button>
```

**CSS to Add (in `app/globals.css`):**

```css
/* Add after existing animations (around line 200) */

@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  100% {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}

/* Enhanced button press states for mobile */
.active\:scale-95:active {
  transform: scale(0.95);
  transition: transform 80ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Testing:**
- [ ] Tap button on mobile - should scale down immediately
- [ ] Ripple should appear from touch point
- [ ] Release should spring back smoothly
- [ ] No interference with desktop magnetic effect

---

### 1.2 Card Touch Interactions

**Files to Modify:**

#### `components/sections/membership-section.tsx`

**Location:** Lines 405-586 (membership cards rendering)

**Changes:**

```typescript
// ADD after line 55 (after state declarations):
const [touchedCard, setTouchedCard] = useState<number | null>(null)
const [touchPosition, setTouchPosition] = useState<{x: number, y: number} | null>(null)

// MODIFY card rendering (around line 405):
<div
  key={i}
  className={`
    membership-card 
    group 
    relative 
    flex 
    flex-col 
    overflow-hidden 
    rounded-xl 
    border 
    border-primary/20 
    bg-card/60 
    p-5 
    shadow-sm 
    backdrop-blur-sm 
    transition-all 
    duration-700 
    
    // NEW: Enhanced touch states
    ${touchedCard === i ? 'scale-95 shadow-xl shadow-primary/20 border-primary/40' : ''}
    
    hover:border-primary/30 
    hover:shadow-xl 
    hover:shadow-primary/10 
    xl:hover:scale-100 
    xl:hover:translate-y-0 
    hover:scale-105 
    hover:-translate-y-2 
    active:scale-95
  `}
  style={{
    transitionDelay: `${i * 150}ms`,
    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
  }}
  
  // NEW: Touch handlers
  onTouchStart={(e) => {
    setTouchedCard(i)
    const rect = e.currentTarget.getBoundingClientRect()
    setTouchPosition({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    })
  }}
  onTouchEnd={() => {
    setTouchedCard(null)
    setTouchPosition(null)
  }}
  onTouchCancel={() => {
    setTouchedCard(null)
    setTouchPosition(null)
  }}
  
  onMouseEnter={() => {
    if (isLargeScreen) setIsHoveringCard(true)
  }}
  onMouseLeave={() => {
    if (isLargeScreen) setIsHoveringCard(false)
  }}
>
  {/* NEW: Touch glow effect */}
  {touchedCard === i && touchPosition && (
    <div
      className="absolute pointer-events-none"
      style={{
        left: touchPosition.x,
        top: touchPosition.y,
        width: '200px',
        height: '200px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(107, 142, 35, 0.3) 0%, transparent 70%)',
        animation: 'touchGlow 400ms ease-out forwards',
      }}
    />
  )}
  
  {/* existing card content */}
</div>
```

**CSS to Add:**

```css
@keyframes touchGlow {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}
```

---

#### `components/interactive-service-tag.tsx`

**Location:** Lines 44-112 (button rendering)

**Changes:**

```typescript
// ADD after line 32:
const [touchGlow, setTouchGlow] = useState<{x: number, y: number} | null>(null)

// MODIFY button (line 44):
<button
  onClick={onClick}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  
  // NEW: Touch handlers
  onTouchStart={(e) => {
    handleMouseEnter()
    const rect = e.currentTarget.getBoundingClientRect()
    setTouchGlow({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    })
  }}
  onTouchEnd={() => {
    setTimeout(() => handleMouseLeave(), 100)
    setTimeout(() => setTouchGlow(null), 400)
  }}
  
  className={`
    group cursor-pointer animate-in fade-in zoom-in
    // NEW: Enhanced active state
    active:scale-95 active:brightness-95
  `}
>
  {/* NEW: Touch glow */}
  {touchGlow && (
    <div
      className="absolute pointer-events-none"
      style={{
        left: touchGlow.x,
        top: touchGlow.y,
        width: '100px',
        height: '100px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        animation: 'touchGlow 400ms ease-out forwards',
      }}
    />
  )}
  
  {/* existing content */}
</button>
```

---

### 1.3 Form Input States

**Files to Modify:**

#### `components/sections/membership-section.tsx`

**Location:** Lines 661-719 (form inputs in modal)

**Changes:**

```typescript
// ADD after line 119 (after state declarations):
const [focusedField, setFocusedField] = useState<string | null>(null)
const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({})

// MODIFY each input (example for name field, line 667):
<div className="animate-in fade-in slide-in-from-bottom-4 relative" style={{ animationDelay: "200ms" }}>
  <label 
    className={`
      mb-2 block font-mono text-sm font-medium 
      transition-all duration-200
      ${focusedField === 'name' || formData.name 
        ? 'text-primary -translate-y-1 scale-95' 
        : 'text-foreground/70'
      }
    `}
  >
    {form.nameLabel}
  </label>
  <input
    type="text"
    required
    value={formData.name}
    onChange={(e) => {
      setFormData({ ...formData, name: e.target.value })
      // Clear error on change
      if (fieldErrors.name) {
        setFieldErrors(prev => ({ ...prev, name: '' }))
      }
    }}
    onFocus={() => setFocusedField('name')}
    onBlur={() => setFocusedField(null)}
    className={`
      w-full rounded-lg border bg-background/50 px-4 py-3.5 
      text-sm text-foreground placeholder:text-foreground/40 
      transition-all duration-300
      
      ${focusedField === 'name' 
        ? 'border-primary/40 ring-2 ring-primary/20 shadow-lg shadow-primary/10' 
        : 'border-primary/20'
      }
      
      ${fieldErrors.name 
        ? 'border-red-500 bg-red-50 animate-shake' 
        : ''
      }
      
      focus:border-primary/40 
      focus:outline-none 
      focus:ring-2 
      focus:ring-primary/20
    `}
    placeholder={form.namePlaceholder}
  />
  
  {/* Error message */}
  {fieldErrors.name && (
    <p className="mt-1 text-xs text-red-600 animate-in fade-in slide-in-from-top-2">
      {fieldErrors.name}
    </p>
  )}
</div>
```

**CSS to Add:**

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
}

.animate-shake {
  animation: shake 400ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

/* Floating label effect */
input:focus + label,
input:not(:placeholder-shown) + label {
  transform: translateY(-24px) scale(0.85);
  color: var(--primary);
}
```

---

## 🎯 Phase 2: Scroll-Based Animations

### 2.1 Section Reveal Choreography

**New Hook to Create:**

#### `hooks/use-luxury-reveal.ts`

```typescript
"use client"

import { useEffect, useRef, useState } from "react"

export function useLuxuryReveal(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold,
        root: null,
        rootMargin: '-10% 0px',
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  return { ref, isVisible, scrollDirection }
}
```

**Files to Modify:**

#### `components/sections/services-section.tsx`

**Change:**
- Line 29: Replace `useReveal` with `useLuxuryReveal`
- Lines 245-256: Enhance title/subtitle animations

```typescript
// Line 1: Change import
import { useLuxuryReveal } from "@/hooks/use-luxury-reveal"

// Line 29: Change hook
const { ref, isVisible, scrollDirection } = useLuxuryReveal(0.3)

// Lines 245-256: Enhanced reveal
<div
  className={`mb-3 text-center transition-all duration-700 sm:mb-4 md:mb-6 ${
    isVisible 
      ? "translate-y-0 opacity-100" 
      : `${scrollDirection === 'down' ? 'translate-y-12' : '-translate-y-12'} opacity-0`
  }`}
>
  <h2 
    className="mb-1.5 font-sans text-lg font-extralight tracking-wide text-foreground 
    transition-all duration-700 delay-0 sm:mb-2 sm:text-xl md:text-2xl lg:text-3xl
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
  >
    {services.title || "Our Services"}
  </h2>
  <p 
    className="mx-auto max-w-xl text-[11px] font-light leading-relaxed text-foreground/60 
    transition-all duration-700 delay-100 sm:text-xs md:text-sm
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
  >
    {services.subtitle || "Explore our comprehensive wellness offerings"}
  </p>
</div>
```

**Similar changes needed in:**
- `components/sections/concept-section.tsx`
- `components/sections/gallery-section.tsx`
- `components/sections/contact-section.tsx`

---

### 2.2 Enhanced Parallax

**Files to Modify:**

#### `app/page.tsx`

**Location:** Lines 426-479 (hero content section)

**Current parallax is good, but enhance it:**

```typescript
// ADD more sophisticated parallax (around line 428):

// Calculate multiple parallax layers
const heroParallax = useMemo(() => ({
  sketch: scrollY * -0.15,      // Background - slower
  title: scrollY * 0.1,          // Midground - normal
  titleScale: Math.max(0.85, 1 - (scrollY * 0.0002)),
  description: scrollY * 0.2,    // Foreground - faster
  descriptionOpacity: Math.max(0, 1 - (scrollY * 0.002)),
  buttons: scrollY * 0.25,
  buttonsScale: Math.max(0.9, 1 - (scrollY * 0.0003)),
  buttonsOpacity: Math.max(0, 1 - (scrollY * 0.0025)),
}), [scrollY])

// UPDATE line 389-407 (mobile hero sketch):
<div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden">
  <div 
    className="absolute left-1/2 top-[30%] w-[65vw] h-[36vh] max-h-[360px] opacity-80 
    -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
    style={{
      transform: isMobile 
        ? `translateX(-50%) translateY(calc(-50% + ${heroParallax.sketch}px))` 
        : undefined,
    }}
  >
    {/* sketch image */}
  </div>
</div>
```

---

### 2.3 Scroll Progress Indicator

**New Component to Create:**

#### `components/scroll-progress-bar.tsx`

```typescript
"use client"

import { useState, useEffect } from "react"

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [sectionColor, setSectionColor] = useState('#6B8E23')

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100
      setScrollProgress(progress)
      
      // Change color based on scroll position
      const sections = [
        { threshold: 0, color: '#6B8E23' },    // Hero/Concept - sage
        { threshold: 33, color: '#8B7355' },   // Services - olive
        { threshold: 50, color: '#D4A574' },   // Gallery - amber
        { threshold: 66, color: '#6B8E23' },   // Membership - sage
        { threshold: 83, color: '#7B9BA8' },   // Contact - blue
      ]
      
      const currentSection = sections.reverse().find(s => progress >= s.threshold)
      if (currentSection) {
        setSectionColor(currentSection.color)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 h-0.5 xl:hidden"
      style={{
        background: 'transparent',
      }}
    >
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(to right, ${sectionColor}, ${sectionColor}80)`,
          boxShadow: `0 0 8px ${sectionColor}40`,
        }}
      />
    </div>
  )
}
```

**Add to `app/page.tsx`:**

```typescript
// Line 12: Add import
import { ScrollProgressBar } from "@/components/scroll-progress-bar"

// Line 278: Add component (after GrainOverlay)
<ScrollProgressBar />
```

---

## 🎯 Phase 3: Modal & Overlay Animations

### 3.1 Enhanced Modal Transitions

**Files to Modify:**

#### `components/sections/services-section.tsx`

**Location:** Lines 463-516 (modal portal)

**Changes:**

```typescript
// ADD state for modal animation (after line 38):
const [isModalAnimating, setIsModalAnimating] = useState(false)

// MODIFY handleModalClose (around line 227):
const handleModalClose = () => {
  setIsModalAnimating(true)
  
  // Wait for exit animation before closing
  setTimeout(() => {
    setIsModalOpen(false)
    setIsModalAnimating(false)
    setActiveTagId(null)
    setPrefilterCategories([])
    setPrefilterSubcategories([])
  }, 400) // Match animation duration
}

// MODIFY modal backdrop (line 464):
<div 
  className={`
    fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4
    transition-all duration-300
    ${isModalAnimating ? 'opacity-0' : 'opacity-100'}
  `}
  onClick={handleModalClose}
  style={{
    animation: isModalAnimating 
      ? 'modalBackdropExit 300ms ease-out forwards' 
      : 'modalBackdropEnter 300ms ease-out forwards',
  }}
>
  {/* Shader Background */}
  <div className="absolute inset-0 z-0">
    <ShaderWrapper />
    <div 
      className="absolute inset-0 transition-all duration-300"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: isModalAnimating ? 'blur(0px)' : 'blur(12px)',
      }}
    />
  </div>
  
  {/* ... rest of modal */}
</div>

// MODIFY modal content container (line 475):
<div 
  className={`
    relative z-10 h-full w-full sm:h-auto sm:max-w-5xl md:max-w-6xl
  `}
  onClick={(e) => e.stopPropagation()}
  style={{
    animation: isModalAnimating 
      ? 'modalContentExit 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards' 
      : 'modalContentEnter 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  }}
>
  {/* modal content */}
</div>
```

**CSS to Add:**

```css
/* Modal animations */
@keyframes modalBackdropEnter {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(12px);
  }
}

@keyframes modalBackdropExit {
  from {
    opacity: 1;
    backdrop-filter: blur(12px);
  }
  to {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
}

@keyframes modalContentEnter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modalContentExit {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
}
```

**Similar changes needed in:**
- `components/sections/membership-section.tsx` (lines 607-790)

---

### 3.2 Stagger Content in Modals

**New Hook to Create:**

#### `hooks/use-stagger-reveal.ts`

```typescript
"use client"

import { useState, useEffect } from "react"

export function useStaggerReveal(count: number, baseDelay = 50, maxDelay = 800) {
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (count === 0) return

    // Reveal items with stagger
    const timeouts: NodeJS.Timeout[] = []
    
    for (let i = 0; i < count; i++) {
      const delay = Math.min(i * baseDelay, maxDelay)
      
      const timeout = setTimeout(() => {
        setRevealedIndices(prev => new Set(prev).add(i))
      }, delay)
      
      timeouts.push(timeout)
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [count, baseDelay, maxDelay])

  const isRevealed = (index: number) => revealedIndices.has(index)
  const getDelay = (index: number) => Math.min(index * baseDelay, maxDelay)

  return { isRevealed, getDelay }
}
```

**Files to Modify:**

#### `components/filtered-services.tsx`

```typescript
// Line 1: Add import
import { useStaggerReveal } from "@/hooks/use-stagger-reveal"

// After getting filtered therapies:
const { isRevealed } = useStaggerReveal(filteredTherapies.length, 50, 800)

// In the map function where therapies are rendered:
{filteredTherapies.map((therapy, index) => (
  <div
    key={therapy.id}
    className={`
      transition-all duration-300
      ${isRevealed(index) 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-5'
      }
    `}
    style={{
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    }}
  >
    {/* therapy content */}
  </div>
))}
```

---

## 🎯 Phase 4: List & Grid Animations

### 4.1 Service Tags Mobile Grid Stagger

**Files to Modify:**

#### `components/sections/services-section.tsx`

**Location:** Lines 393-420 (mobile tags grid)

```typescript
// Line 10: Add import
import { useStaggerReveal } from "@/hooks/use-stagger-reveal"

// After line 143:
const { isRevealed: isTagRevealed } = useStaggerReveal(enhancedTags.length, 100, 500)

// MODIFY mobile tags grid (line 394):
<div className="mt-6 grid grid-cols-2 gap-3 md:hidden">
  {enhancedTags.map((tag, index) => (
    <button
      key={tag.id}
      onClick={() => handleTagClick(tag)}
      className={`
        rounded-lg border-2 px-4 py-3 text-left 
        transition-all duration-400
        active:scale-95
        
        ${isTagRevealed(index) 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
        }
      `}
      style={{
        backgroundColor: activeTagId === tag.id ? `${tag.color}20` : `${tag.color}10`,
        borderColor: activeTagId === tag.id ? tag.color : `${tag.color}60`,
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* tag content */}
    </button>
  ))}
</div>
```

---

## 🎯 Phase 5: Advanced Gestures

### 5.1 Pull-to-Refresh

**New Component to Create:**

#### `components/pull-to-refresh.tsx`

```typescript
"use client"

import { useState, useRef, useEffect } from "react"

export function PullToRefresh({ onRefresh }: { onRefresh: () => Promise<void> }) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const touchStartY = useRef(0)
  const threshold = 80

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        touchStartY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY === 0 && !isRefreshing) {
        const distance = e.touches[0].clientY - touchStartY.current
        if (distance > 0) {
          // Rubber band resistance
          const resistance = Math.min(distance / 2, 100)
          setPullDistance(resistance)
          
          if (resistance > threshold) {
            // Could trigger haptic feedback here
          }
        }
      }
    }

    const handleTouchEnd = async () => {
      if (pullDistance > threshold && !isRefreshing) {
        setIsRefreshing(true)
        await onRefresh()
        setIsRefreshing(false)
      }
      setPullDistance(0)
      touchStartY.current = 0
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pullDistance, isRefreshing, onRefresh, threshold])

  if (pullDistance === 0 && !isRefreshing) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{
        transform: `translateY(${Math.min(pullDistance, 100)}px)`,
        transition: pullDistance === 0 ? 'transform 0.3s ease-out' : 'none',
      }}
    >
      <div
        className={`
          rounded-full bg-background/90 p-3 shadow-lg backdrop-blur-md
          transition-all duration-300
          ${pullDistance > threshold ? 'scale-110' : 'scale-100'}
        `}
        style={{
          opacity: Math.min(pullDistance / threshold, 1),
        }}
      >
        {isRefreshing ? (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        ) : pullDistance > threshold ? (
          <div className="h-6 w-6 text-primary">↓</div>
        ) : (
          <div className="h-6 w-6 rounded-full border-2 border-primary/30" />
        )}
      </div>
    </div>
  )
}
```

**Add to `app/page.tsx`:**

```typescript
// Import
import { PullToRefresh } from "@/components/pull-to-refresh"

// Add component (line 276, after CustomCursor)
{isMobile && (
  <PullToRefresh 
    onRefresh={async () => {
      // Could refresh data, or just provide visual feedback
      await new Promise(resolve => setTimeout(resolve, 1000))
    }} 
  />
)}
```

---

## 🎯 Phase 6: Micro-Animations & Polish

### 6.1 Number Counting

**New Hook to Create:**

#### `hooks/use-count-up.ts`

```typescript
"use client"

import { useState, useEffect } from "react"

export function useCountUp(
  end: number,
  duration: number = 1000,
  start: number = 0,
  shouldStart: boolean = true
) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Ease out cubic for deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(start + (end - start) * easeOutCubic)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, start, shouldStart])

  return count
}
```

**Files to Modify:**

#### `components/interactive-service-tag.tsx`

```typescript
// Line 1: Add import
import { useCountUp } from "@/hooks/use-count-up"

// After line 32:
const animatedCount = useCountUp(count || 0, 800, 0, isHovered || isActive)

// Line 92-97: Update count display
{count !== undefined && (
  <span
    className="hidden text-[9px] font-light opacity-70 lg:inline md:text-[10px] xl:text-xs"
    style={{ color }}
  >
    {animatedCount} offerings
  </span>
)}
```

---

## 📦 Utility Files to Create

### Animation Utilities

#### `lib/animation-utils.ts`

```typescript
// Spring physics configurations
export const spring = {
  gentle: { stiffness: 120, damping: 14, mass: 1 },
  medium: { stiffness: 200, damping: 20, mass: 1 },
  snappy: { stiffness: 300, damping: 25, mass: 1 },
}

// Easing curves
export const easings = {
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  exit: 'cubic-bezier(0.4, 0, 0.2, 1)',
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}

// Timing constants
export const timing = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slowest: 800,
}

// Stagger calculator
export const calculateStagger = (
  index: number,
  baseDelay: number,
  maxDelay: number
) => Math.min(index * baseDelay, maxDelay)

// Scroll-based interpolation
export const scrollInterpolate = (
  scrollY: number,
  inputRange: [number, number],
  outputRange: [number, number]
) => {
  const progress = Math.max(
    0,
    Math.min(1, (scrollY - inputRange[0]) / (inputRange[1] - inputRange[0]))
  )
  return outputRange[0] + (outputRange[1] - outputRange[0]) * progress
}

// Performance optimization
export const optimizeAnimation = (
  element: HTMLElement,
  properties: string[]
) => {
  element.style.willChange = properties.join(', ')

  // Remove will-change after animation
  setTimeout(() => {
    element.style.willChange = 'auto'
  }, 1000)
}
```

---

## ✅ Testing Checklist

### Per Phase Testing

**Phase 1 Complete:**
- [ ] All buttons have ripple effect on mobile
- [ ] Cards show glow on tap
- [ ] Forms have floating labels
- [ ] Input errors shake
- [ ] All animations are 60fps
- [ ] Reduced motion respected

**Phase 2 Complete:**
- [ ] Sections reveal with stagger
- [ ] Parallax feels smooth
- [ ] Progress bar updates correctly
- [ ] Colors transition smoothly
- [ ] No scroll jank

**Phase 3 Complete:**
- [ ] Modals enter with spring animation
- [ ] Modals exit smoothly
- [ ] Content staggers inside modals
- [ ] Backdrop blurs properly
- [ ] Close button works

**Phase 4 Complete:**
- [ ] Grids cascade reveal
- [ ] List reorder smoothly
- [ ] No layout shift
- [ ] Animations complete

**Phase 5 Complete:**
- [ ] Pull-to-refresh works
- [ ] Threshold provides feedback
- [ ] Rubber-band resistance works
- [ ] Refresh completes properly

**Phase 6 Complete:**
- [ ] Numbers count up smoothly
- [ ] Icons animate on state change
- [ ] All micro-animations polished
- [ ] Nav transitions smooth

---

## 🚀 Quick Start Implementation Order

### Week 1: Foundation & Impact
1. **Day 1:** Create utility files and hooks
2. **Day 2:** Phase 1.1 - Button press states (2 hours)
3. **Day 3:** Phase 1.2 - Card interactions (3 hours)
4. **Day 4:** Phase 3.1 - Modal animations (3 hours)
5. **Day 5:** Testing and bug fixes

### Week 2: Depth & Motion
6. **Day 6-7:** Phase 2.1-2.2 - Scroll reveals and parallax
7. **Day 8:** Phase 2.3 - Progress indicator
8. **Day 9:** Phase 4.1 - Grid staggers
9. **Day 10:** Testing

### Week 3: Advanced Features
10. **Day 11-12:** Phase 1.3 - Form animations
11. **Day 13:** Phase 3.2 - Modal content stagger
12. **Day 14:** Phase 6.1-6.4 - Micro-animations
13. **Day 15:** Final testing

---

## 📊 Impact Tracking

### Before vs After Metrics

Create baseline measurements before implementing:

```typescript
// utils/analytics.ts
export const trackAnimation = (name: string, duration: number, fps: number) => {
  // Track to analytics
  console.log(`Animation: ${name}, Duration: ${duration}ms, FPS: ${fps}`)
}

// Usage in components:
useEffect(() => {
  const start = performance.now()
  // ... animation happens
  const end = performance.now()
  trackAnimation('modal-open', end - start, 60)
}, [])
```

**Measure:**
- Time to interactive
- Animation frame rate
- User engagement (time on site)
- Conversion rate (applications submitted)
- User feedback/satisfaction

---

## 🔄 Rollback Plan

If animations cause issues:

1. **Feature flags:** Wrap animations in conditional checks
2. **Gradual rollout:** Test with % of users first
3. **Quick disable:** Environment variable to turn off all animations
4. **Fallbacks:** Simple fade-in/out as backup

```typescript
// Example feature flag usage
const ENABLE_LUXURY_ANIMATIONS = process.env.NEXT_PUBLIC_LUXURY_ANIMATIONS === 'true'

{ENABLE_LUXURY_ANIMATIONS ? (
  <LuxuryButton />
) : (
  <SimpleButton />
)}
```

---

**This roadmap provides exact file locations and code changes for implementing all planned mobile animations. Start with Week 1 for maximum impact with minimum effort.**


