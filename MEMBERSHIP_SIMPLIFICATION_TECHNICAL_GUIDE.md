# Membership Simplification - Technical Implementation Guide

**Date:** November 20, 2025  
**Status:** 📋 **READY FOR IMPLEMENTATION**  
**Complexity:** 🔴 **HIGH - Full System Refactor**

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Data Structure Changes](#data-structure-changes)
3. [Component Updates](#component-updates)
4. [API & Database Changes](#api--database-changes)
5. [SEO & Metadata Updates](#seo--metadata-updates)
6. [Testing Checklist](#testing-checklist)
7. [Rollback Plan](#rollback-plan)

---

## 🎯 Overview

This guide provides step-by-step technical instructions for implementing the single-tier membership restructuring. All code examples are production-ready and follow the existing codebase patterns.

### **Impact Assessment**

| Area | Impact Level | Estimated Hours |
|------|-------------|-----------------|
| Data Structure | 🔴 High | 4-6 hours |
| UI Components | 🔴 High | 8-12 hours |
| Backend/Database | 🟡 Medium | 2-4 hours |
| SEO/Metadata | 🟡 Medium | 2-3 hours |
| Testing/QA | 🟡 Medium | 4-6 hours |
| **Total** | | **20-31 hours** |

---

## 📊 Data Structure Changes

### **1. Update Therapy Matrix**

**File**: `/lib/therapy-matrix.ts`

#### Current Structure:
```typescript
export interface Therapy {
  name: string
  nameES: string
  allocations: {
    longevity: TherapyAllocation
    performance: TherapyAllocation
    aesthetics: TherapyAllocation
  }
  isYearly?: boolean
  duration?: number
}
```

#### New Structure:
```typescript
export type AccessLevel = 'included' | 'complimentary' | 'addon'

export interface Therapy {
  name: string
  nameES: string
  allocation: TherapyAllocation  // Single allocation for all members
  accessLevel: AccessLevel        // NEW: Determines if included or addon
  category: TherapyCategory       // NEW: For organizing complimentary programs
  isYearly?: boolean
  duration?: number
  price?: number                  // NEW: Price for complimentary/addon services
}

export type TherapyCategory = 
  | 'fitness'
  | 'spa' 
  | 'lounge'
  | 'checkup'
  | 'aesthetics'
  | 'performance'
  | 'recovery'
  | 'mind-body'
```

#### Implementation Steps:

**Step 1**: Create new therapy matrix structure

```typescript
// lib/therapy-matrix.ts

export const therapyMatrix: Therapy[] = [
  // ============================================
  // FITNESS (Included - Unlimited)
  // ============================================
  {
    name: "Small group fitness classes",
    nameES: "Clases fitness en grupos pequeños",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "fitness",
    duration: 60,
  },
  {
    name: "Guided Performance training",
    nameES: "Entrenamiento de rendimiento guiado",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "fitness",
    duration: 60,
  },
  {
    name: "Personal training",
    nameES: "Entrenamiento personal",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "fitness",
    duration: 60,
  },
  {
    name: "Pilates reformer",
    nameES: "Pilates reformer",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "fitness",
    duration: 50,
  },
  {
    name: "Mobility coaching",
    nameES: "Coaching de movilidad",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "fitness",
    duration: 60,
  },
  {
    name: "Outdoor training (Retiro)",
    nameES: "Entrenamiento al aire libre (Retiro)",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "fitness",
    duration: 60,
  },
  {
    name: "Breathing & stretching",
    nameES: "Respiración y estiramientos",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "fitness",
    duration: 45,
  },
  {
    name: "Mindfulness sessions",
    nameES: "Sesiones de mindfulness",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "fitness",
    duration: 45,
  },

  // ============================================
  // SPA FACILITIES (Included - Unlimited)
  // ============================================
  {
    name: "Private contrast suite",
    nameES: "Suite de contraste privada",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "spa",
    duration: 30,
  },
  {
    name: "Flotarium (float therapy)",
    nameES: "Flotarium (terapia de flotación)",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "spa",
    duration: 60,
  },
  {
    name: "Cold plunge & ice bath",
    nameES: "Inmersión en frío y baño de hielo",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "spa",
    duration: 10,
  },
  {
    name: "Steam room",
    nameES: "Sala de vapor",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "spa",
    duration: 30,
  },
  {
    name: "Infrared sauna",
    nameES: "Sauna infrarroja",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "spa",
    duration: 30,
  },
  {
    name: "Hydrodrive pool",
    nameES: "Piscina hidrodinámica",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "spa",
    duration: 30,
  },
  {
    name: "Full body red light therapy",
    nameES: "Terapia de luz roja cuerpo completo",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "spa",
    duration: 20,
  },
  {
    name: "Cryotherapy",
    nameES: "Crioterapia",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "spa",
    duration: 5,
  },
  {
    name: "Salt bath (magnesium/alkaline/salt)",
    nameES: "Baño de sales (magnesio/alcalino/sal)",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "spa",
    duration: 30,
  },

  // ============================================
  // MEMBERS LOUNGE (Included - Unlimited)
  // ============================================
  {
    name: "PEMF therapy",
    nameES: "Terapia PEMF",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "lounge",
    duration: 30,
  },
  {
    name: "Compression therapy (pressotherapy)",
    nameES: "Terapia de compresión (presoterapia)",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "lounge",
    duration: 30,
  },
  {
    name: "Red light hair therapy",
    nameES: "Terapia de luz roja capilar",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "lounge",
    duration: 20,
  },
  {
    name: "IHHT (hypoxic-hyperoxic training)",
    nameES: "IHHT (entrenamiento hipóxico-hiperóxico)",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "lounge",
    duration: 45,
  },
  {
    name: "H₂ (molecular hydrogen therapy)",
    nameES: "H₂ (terapia de hidrógeno molecular)",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "lounge",
    duration: 20,
  },
  {
    name: "Vagus nerve stimulation",
    nameES: "Estimulación del nervio vago",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "lounge",
    duration: 20,
  },
  {
    name: "Foot roller therapy",
    nameES: "Terapia de rodillo para pies",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "lounge",
    duration: 15,
  },
  {
    name: "Massage chair",
    nameES: "Sillón de masaje",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "lounge",
    duration: 20,
  },
  {
    name: "HBOT (hyperbaric oxygen therapy)",
    nameES: "HBOT (terapia de oxígeno hiperbárico)",
    allocation: "Unlimited",
    accessLevel: "included",
    category: "lounge",
    duration: 60,
  },

  // ============================================
  // HEALTH CHECKUPS (Included)
  // ============================================
  {
    name: "Monthly physical checkup",
    nameES: "Revisión física mensual",
    allocation: 12,
    accessLevel: "included",
    category: "checkup",
    isYearly: false,
    duration: 30,
  },
  {
    name: "Body composition analysis (monthly)",
    nameES: "Análisis de composición corporal (mensual)",
    allocation: 12,
    accessLevel: "included",
    category: "checkup",
    isYearly: false,
    duration: 30,
  },
  {
    name: "Annual longevity checkup (comprehensive panel)",
    nameES: "Revisión anual de longevidad (panel completo)",
    allocation: 1,
    accessLevel: "included",
    category: "checkup",
    isYearly: true,
    duration: 120,
  },
  {
    name: "VO₂ max test (annual)",
    nameES: "Prueba de VO₂ máx (anual)",
    allocation: 1,
    accessLevel: "included",
    category: "checkup",
    isYearly: true,
    duration: 45,
  },

  // ============================================
  // COMPLIMENTARY: AESTHETICS PROGRAM
  // ============================================
  {
    name: "HydraFacial®",
    nameES: "HydraFacial®",
    allocation: 0,
    accessLevel: "complimentary",
    category: "aesthetics",
    duration: 45,
    price: 150,
  },
  {
    name: "Signature facials",
    nameES: "Faciales signature",
    allocation: 0,
    accessLevel: "complimentary",
    category: "aesthetics",
    duration: 60,
    price: 120,
  },
  {
    name: "High-frequency facial RF",
    nameES: "Radiofrecuencia facial de alta frecuencia",
    allocation: 0,
    accessLevel: "complimentary",
    category: "aesthetics",
    duration: 45,
    price: 180,
  },
  {
    name: "Ultrasound therapy / HIFU (Sofwave)",
    nameES: "Terapia de ultrasonidos / HIFU (Sofwave)",
    allocation: 0,
    accessLevel: "complimentary",
    category: "aesthetics",
    isYearly: true,
    duration: 60,
    price: 450,
  },
  {
    name: "HIFEM (Emsculpt NEO)",
    nameES: "HIFEM (Emsculpt NEO)",
    allocation: 0,
    accessLevel: "complimentary",
    category: "aesthetics",
    isYearly: true,
    duration: 30,
    price: 400,
  },
  {
    name: "Cryolipolysis (CoolTech)",
    nameES: "Criolipólisis (CoolTech)",
    allocation: 0,
    accessLevel: "complimentary",
    category: "aesthetics",
    isYearly: true,
    duration: 45,
    price: 350,
  },
  {
    name: "HIFU face lift (Ultherapy)",
    nameES: "Lifting facial HIFU (Ultherapy)",
    allocation: 0,
    accessLevel: "complimentary",
    category: "aesthetics",
    isYearly: true,
    duration: 90,
    price: 800,
  },
  {
    name: "Body wraps",
    nameES: "Envolturas corporales",
    allocation: 0,
    accessLevel: "complimentary",
    category: "aesthetics",
    duration: 60,
    price: 100,
  },

  // ============================================
  // COMPLIMENTARY: PERFORMANCE PROGRAM
  // ============================================
  {
    name: "EMS training",
    nameES: "Entrenamiento con electroestimulación",
    allocation: 0,
    accessLevel: "complimentary",
    category: "performance",
    duration: 20,
    price: 80,
  },
  {
    name: "Shockwave therapy",
    nameES: "Terapia de ondas de choque",
    allocation: 0,
    accessLevel: "complimentary",
    category: "performance",
    duration: 30,
    price: 120,
  },
  {
    name: "Physiotherapy & osteopathy",
    nameES: "Fisioterapia y osteopatía",
    allocation: 0,
    accessLevel: "complimentary",
    category: "performance",
    duration: 60,
    price: 100,
  },
  {
    name: "Genetic sequencing",
    nameES: "Secuenciación genética",
    allocation: 0,
    accessLevel: "complimentary",
    category: "performance",
    isYearly: true,
    duration: 60,
    price: 800,
  },
  {
    name: "Epigenetic clocks & telomere testing",
    nameES: "Relojes epigenéticos y telómeros",
    allocation: 0,
    accessLevel: "complimentary",
    category: "performance",
    isYearly: true,
    duration: 30,
    price: 500,
  },
  {
    name: "Nutrition protocols (advanced)",
    nameES: "Protocolos de nutrición (avanzados)",
    allocation: 0,
    accessLevel: "complimentary",
    category: "performance",
    duration: 60,
    price: 150,
  },
  {
    name: "Supplementation protocols",
    nameES: "Protocolos de suplementación",
    allocation: 0,
    accessLevel: "complimentary",
    category: "performance",
    duration: 60,
    price: 150,
  },

  // ============================================
  // COMPLIMENTARY: RECOVERY PROGRAM
  // ============================================
  {
    name: "Therapeutic massage (deep tissue)",
    nameES: "Masaje terapéutico (tejido profundo)",
    allocation: 0,
    accessLevel: "complimentary",
    category: "recovery",
    duration: 60,
    price: 90,
  },
  {
    name: "Oriental massage",
    nameES: "Masaje oriental",
    allocation: 0,
    accessLevel: "complimentary",
    category: "recovery",
    duration: 60,
    price: 95,
  },
  {
    name: "Foot reflexology",
    nameES: "Reflexología podal",
    allocation: 0,
    accessLevel: "complimentary",
    category: "recovery",
    duration: 45,
    price: 70,
  },
  {
    name: "Compressive drainage protocol (advanced)",
    nameES: "Protocolo de drenaje compresivo (avanzado)",
    allocation: 0,
    accessLevel: "complimentary",
    category: "recovery",
    duration: 30,
    price: 80,
  },
  {
    name: "IV vitamins, antioxidants & NAD+",
    nameES: "Vitaminas IV, antioxidantes y NAD+",
    allocation: 0,
    accessLevel: "complimentary",
    category: "recovery",
    duration: 90,
    price: 250,
  },

  // ============================================
  // COMPLIMENTARY: MIND & BODY PROGRAM
  // ============================================
  {
    name: "Hot yoga",
    nameES: "Yoga caliente",
    allocation: 0,
    accessLevel: "complimentary",
    category: "mind-body",
    duration: 60,
    price: 25,
  },
]
```

**Step 2**: Create helper functions for filtering

```typescript
// lib/therapy-matrix.ts

export const getIncludedTherapies = () => 
  therapyMatrix.filter(t => t.accessLevel === 'included')

export const getComplimentaryTherapies = () => 
  therapyMatrix.filter(t => t.accessLevel === 'complimentary')

export const getTherapiesByCategory = (category: TherapyCategory) => 
  therapyMatrix.filter(t => t.category === category)

export const getComplimentaryPrograms = () => {
  const programs = {
    aesthetics: therapyMatrix.filter(t => 
      t.accessLevel === 'complimentary' && t.category === 'aesthetics'
    ),
    performance: therapyMatrix.filter(t => 
      t.accessLevel === 'complimentary' && t.category === 'performance'
    ),
    recovery: therapyMatrix.filter(t => 
      t.accessLevel === 'complimentary' && t.category === 'recovery'
    ),
    mindBody: therapyMatrix.filter(t => 
      t.accessLevel === 'complimentary' && t.category === 'mind-body'
    ),
  }
  return programs
}
```

---

### **2. Update Content Structure**

**File**: `/content/site.json`

#### New Membership Structure:

```json
{
  "en": {
    "memberships": {
      "pageTitle": "Membership",
      "heroTitle": "Hamaria Members",
      "heroTagline": "Everything You Need to Thrive",
      "heroDescription": "One membership. Complete access. Unlimited fitness, full spa facilities, members lounge with longevity devices, and comprehensive health monitoring.",
      "monthlyPrice": "Monthly",
      "yearlyPrice": "Yearly",
      "foundersOffer": "Founders: 3 months free",
      "limitedMembers": "Limited to first 42 members",
      "applyNow": "Apply Now",
      "learnMore": "Learn More",
      "whatsIncluded": "What's Included",
      "complimentaryPrograms": "Complimentary Programs",
      "unlimited": "Unlimited",
      "perMonth": "/month",
      "perYear": "/year",
      
      "membership": {
        "id": "hamaria",
        "name": "Hamaria Members",
        "tagline": "Everything You Need to Thrive",
        "description": "Unlimited access to all fitness, spa, and longevity facilities, plus comprehensive health monitoring and exclusive members lounge.",
        "monthlyPrice": 1850,
        "yearlyPrice": 20350,
        "color": "#8b5cf6",
        "features": [
          "Unlimited fitness classes and training",
          "Full spa and recovery facilities access",
          "Members lounge with longevity devices",
          "Monthly physical checkups included",
          "Annual comprehensive longevity assessment",
          "Private booking system",
          "Exclusive member events",
          "Complimentary programs available"
        ]
      },
      
      "sections": {
        "fitness": {
          "title": "Fitness",
          "subtitle": "Unlimited access to all training and classes",
          "description": "Small group classes, personal training, Pilates, mobility coaching, and outdoor training in Retiro Park."
        },
        "spa": {
          "title": "Spa Facilities",
          "subtitle": "Complete recovery and wellness access",
          "description": "Private contrast suite, flotarium, cold plunge, ice bath, steam room, infrared sauna, hydrodrive pool, red light room, cryotherapy, and salt baths."
        },
        "lounge": {
          "title": "Members Lounge",
          "subtitle": "Longevity devices in a relaxing environment",
          "description": "Quiet space with optional privacy featuring PEMF, compression therapy, hair red light, IHHT, H₂, vagus nerve stimulation, massage chair, and HBOT."
        },
        "checkups": {
          "title": "Health Monitoring",
          "subtitle": "Continuous wellness tracking",
          "description": "Monthly physical checkups and body composition analysis. Annual comprehensive longevity assessment including blood panels, VO₂ max testing, and personalized recommendations."
        }
      },
      
      "complimentaryPrograms": {
        "title": "Complimentary Programs",
        "subtitle": "Premium services available to members",
        "description": "Enhance your membership with specialized programs for aesthetics, performance, recovery, and mind-body wellness.",
        
        "aesthetics": {
          "title": "Advanced Aesthetics",
          "description": "Premium facial treatments, body contouring, and regenerative beauty services.",
          "price": "From €100/session"
        },
        "performance": {
          "title": "Performance Optimization",
          "description": "Advanced testing, specialized training, and personalized protocols for peak performance.",
          "price": "From €80/session"
        },
        "recovery": {
          "title": "Recovery & Regeneration",
          "description": "Therapeutic massages, advanced drainage protocols, and IV therapy.",
          "price": "From €70/session"
        },
        "mindBody": {
          "title": "Mind & Body",
          "description": "Hot yoga, extended mindfulness sessions, and specialized wellness programs.",
          "price": "From €25/session"
        }
      }
    }
  },
  "es": {
    "memberships": {
      "pageTitle": "Membresía",
      "heroTitle": "Miembros Hamaria",
      "heroTagline": "Todo Lo Que Necesitas Para Prosperar",
      "heroDescription": "Una membresía. Acceso completo. Fitness ilimitado, instalaciones spa completas, salón de miembros con dispositivos de longevidad y monitoreo integral de salud.",
      "monthlyPrice": "Mensual",
      "yearlyPrice": "Anual",
      "foundersOffer": "Fundadores: 3 meses gratis",
      "limitedMembers": "Limitado a los primeros 42 miembros",
      "applyNow": "Solicitar ahora",
      "learnMore": "Saber más",
      "whatsIncluded": "Qué está incluido",
      "complimentaryPrograms": "Programas complementarios",
      "unlimited": "Ilimitado",
      "perMonth": "/mes",
      "perYear": "/año",
      
      "membership": {
        "id": "hamaria",
        "name": "Miembros Hamaria",
        "tagline": "Todo Lo Que Necesitas Para Prosperar",
        "description": "Acceso ilimitado a todas las instalaciones de fitness, spa y longevidad, además de monitoreo integral de salud y salón exclusivo para miembros.",
        "monthlyPrice": 1850,
        "yearlyPrice": 20350,
        "color": "#8b5cf6",
        "features": [
          "Clases de fitness y entrenamiento ilimitados",
          "Acceso completo a instalaciones spa y recuperación",
          "Salón de miembros con dispositivos de longevidad",
          "Revisiones físicas mensuales incluidas",
          "Evaluación anual integral de longevidad",
          "Sistema de reservas privado",
          "Eventos exclusivos para miembros",
          "Programas complementarios disponibles"
        ]
      },
      
      "sections": {
        "fitness": {
          "title": "Fitness",
          "subtitle": "Acceso ilimitado a entrenamientos y clases",
          "description": "Clases en grupos pequeños, entrenamiento personal, Pilates, coaching de movilidad y entrenamiento al aire libre en el Parque del Retiro."
        },
        "spa": {
          "title": "Instalaciones Spa",
          "subtitle": "Acceso completo a recuperación y bienestar",
          "description": "Suite de contraste privada, flotarium, inmersión en frío, baño de hielo, sala de vapor, sauna infrarroja, piscina hidrodinámica, sala de luz roja, crioterapia y baños de sales."
        },
        "lounge": {
          "title": "Salón de Miembros",
          "subtitle": "Dispositivos de longevidad en ambiente relajante",
          "description": "Espacio tranquilo con privacidad opcional que incluye PEMF, terapia de compresión, luz roja capilar, IHHT, H₂, estimulación del nervio vago, sillón de masaje y HBOT."
        },
        "checkups": {
          "title": "Monitoreo de Salud",
          "subtitle": "Seguimiento continuo del bienestar",
          "description": "Revisiones físicas mensuales y análisis de composición corporal. Evaluación anual integral de longevidad que incluye paneles sanguíneos, prueba de VO₂ máx y recomendaciones personalizadas."
        }
      },
      
      "complimentaryPrograms": {
        "title": "Programas Complementarios",
        "subtitle": "Servicios premium disponibles para miembros",
        "description": "Mejora tu membresía con programas especializados de estética, rendimiento, recuperación y bienestar mente-cuerpo.",
        
        "aesthetics": {
          "title": "Estética Avanzada",
          "description": "Tratamientos faciales premium, contorneo corporal y servicios de belleza regenerativa.",
          "price": "Desde €100/sesión"
        },
        "performance": {
          "title": "Optimización del Rendimiento",
          "description": "Pruebas avanzadas, entrenamiento especializado y protocolos personalizados para máximo rendimiento.",
          "price": "Desde €80/sesión"
        },
        "recovery": {
          "title": "Recuperación y Regeneración",
          "description": "Masajes terapéuticos, protocolos avanzados de drenaje y terapia IV.",
          "price": "Desde €70/sesión"
        },
        "mindBody": {
          "title": "Mente y Cuerpo",
          "description": "Yoga caliente, sesiones extendidas de mindfulness y programas especializados de bienestar.",
          "price": "Desde €25/sesión"
        }
      }
    }
  }
}
```

---

## 🎨 Component Updates

### **3. Redesign Membership Section**

**File**: `/components/sections/membership-section.tsx`

#### New Implementation:

```typescript
"use client"

import { memo, useMemo } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { getIncludedTherapies, getComplimentaryPrograms } from "@/lib/therapy-matrix"
import { Check, Sparkles, ChevronRight } from "lucide-react"

interface MembershipSectionProps {
  scrollToSection?: (section: string) => void
}

export const MembershipSection = memo(function MembershipSection({ 
  scrollToSection 
}: MembershipSectionProps) {
  const { ref, isVisible } = useReveal(0.3)
  const { t, language } = useTranslation()

  const membership = t.memberships.membership
  const sections = t.memberships.sections
  const complimentaryPrograms = useMemo(() => getComplimentaryPrograms(), [])
  
  // Calculate savings
  const monthlySavings = (membership.yearlyPrice / 12) - membership.monthlyPrice
  const yearlyDiscount = Math.round((1 - (membership.yearlyPrice / (membership.monthlyPrice * 12))) * 100)

  return (
    <section
      ref={ref}
      data-section="membership"
      className="relative min-h-screen py-20 px-5 sm:px-6 md:px-8 lg:px-12"
    >
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="mb-16 text-center">
            <div 
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-medium"
              style={{
                backgroundColor: `${membership.color}20`,
                color: membership.color,
                border: `1px solid ${membership.color}40`,
              }}
            >
              <Sparkles className="h-3 w-3" />
              {membership.tagline}
            </div>
            
            <h2 className="font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl mb-4">
              {membership.name}
            </h2>
            
            <p className="max-w-3xl mx-auto font-sans text-base text-foreground/70 md:text-lg">
              {membership.description}
            </p>
          </div>

          {/* Founders Offer Banner */}
          <div className="mb-12 rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center backdrop-blur-sm max-w-2xl mx-auto">
            <p className="font-sans text-lg font-medium text-foreground md:text-xl">
              {t.memberships.foundersOffer}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {t.memberships.limitedMembers}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
            {/* Monthly Card */}
            <div 
              className="rounded-2xl border p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
              style={{
                backgroundColor: `${membership.color}05`,
                borderColor: `${membership.color}20`,
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
                {t.memberships.monthlyPrice}
              </p>
              <p className="font-sans text-5xl font-light text-foreground mb-1">
                €{membership.monthlyPrice}
              </p>
              <p className="text-sm text-foreground/60">{t.memberships.perMonth}</p>
            </div>

            {/* Yearly Card */}
            <div 
              className="rounded-2xl border p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
              style={{
                backgroundColor: `${membership.color}10`,
                borderColor: `${membership.color}40`,
              }}
            >
              <div 
                className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: membership.color,
                  color: 'white',
                }}
              >
                Save {yearlyDiscount}%
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
                {t.memberships.yearlyPrice}
              </p>
              <p className="font-sans text-5xl font-light text-foreground mb-1">
                €{membership.yearlyPrice}
              </p>
              <p className="text-sm text-foreground/60">{t.memberships.perYear}</p>
            </div>
          </div>

          {/* What's Included Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-light text-foreground mb-8 text-center">
              {t.memberships.whatsIncluded}
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Fitness */}
              <div className="rounded-xl border border-border/50 bg-card/20 p-6 backdrop-blur-sm">
                <h4 className="font-sans text-lg font-medium text-foreground mb-2">
                  {sections.fitness.title}
                </h4>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-3">
                  {sections.fitness.subtitle}
                </p>
                <p className="text-sm text-foreground/70 mb-4">
                  {sections.fitness.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: membership.color }}>
                  <Check className="h-4 w-4" />
                  {t.memberships.unlimited}
                </div>
              </div>

              {/* Spa */}
              <div className="rounded-xl border border-border/50 bg-card/20 p-6 backdrop-blur-sm">
                <h4 className="font-sans text-lg font-medium text-foreground mb-2">
                  {sections.spa.title}
                </h4>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-3">
                  {sections.spa.subtitle}
                </p>
                <p className="text-sm text-foreground/70 mb-4">
                  {sections.spa.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: membership.color }}>
                  <Check className="h-4 w-4" />
                  {t.memberships.unlimited}
                </div>
              </div>

              {/* Lounge */}
              <div className="rounded-xl border border-border/50 bg-card/20 p-6 backdrop-blur-sm">
                <h4 className="font-sans text-lg font-medium text-foreground mb-2">
                  {sections.lounge.title}
                </h4>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-3">
                  {sections.lounge.subtitle}
                </p>
                <p className="text-sm text-foreground/70 mb-4">
                  {sections.lounge.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: membership.color }}>
                  <Check className="h-4 w-4" />
                  {t.memberships.unlimited}
                </div>
              </div>

              {/* Health Checkups */}
              <div className="rounded-xl border border-border/50 bg-card/20 p-6 backdrop-blur-sm">
                <h4 className="font-sans text-lg font-medium text-foreground mb-2">
                  {sections.checkups.title}
                </h4>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-3">
                  {sections.checkups.subtitle}
                </p>
                <p className="text-sm text-foreground/70 mb-4">
                  {sections.checkups.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: membership.color }}>
                  <Check className="h-4 w-4" />
                  Included
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="mb-16 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-3">
              {membership.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/20 p-4"
                >
                  <div
                    className="mt-0.5 rounded-full p-1 flex-shrink-0"
                    style={{ backgroundColor: `${membership.color}20` }}
                  >
                    <Check className="h-4 w-4" style={{ color: membership.color }} />
                  </div>
                  <p className="text-sm text-foreground/80">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complimentary Programs */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-light text-foreground mb-3">
                {t.memberships.complimentaryPrograms.title}
              </h3>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                {t.memberships.complimentaryPrograms.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {/* Aesthetics */}
              <div className="rounded-xl border border-border/30 bg-card/10 p-5 hover:border-primary/40 hover:bg-card/20 transition-all group">
                <h4 className="font-sans text-base font-medium text-foreground mb-2">
                  {t.memberships.complimentaryPrograms.aesthetics.title}
                </h4>
                <p className="text-xs text-foreground/60 mb-3">
                  {t.memberships.complimentaryPrograms.aesthetics.description}
                </p>
                <p className="text-xs font-medium text-primary">
                  {t.memberships.complimentaryPrograms.aesthetics.price}
                </p>
                <button className="mt-3 flex items-center gap-1 text-xs text-foreground/70 group-hover:text-primary transition-colors">
                  View options <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              {/* Performance */}
              <div className="rounded-xl border border-border/30 bg-card/10 p-5 hover:border-primary/40 hover:bg-card/20 transition-all group">
                <h4 className="font-sans text-base font-medium text-foreground mb-2">
                  {t.memberships.complimentaryPrograms.performance.title}
                </h4>
                <p className="text-xs text-foreground/60 mb-3">
                  {t.memberships.complimentaryPrograms.performance.description}
                </p>
                <p className="text-xs font-medium text-primary">
                  {t.memberships.complimentaryPrograms.performance.price}
                </p>
                <button className="mt-3 flex items-center gap-1 text-xs text-foreground/70 group-hover:text-primary transition-colors">
                  View options <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              {/* Recovery */}
              <div className="rounded-xl border border-border/30 bg-card/10 p-5 hover:border-primary/40 hover:bg-card/20 transition-all group">
                <h4 className="font-sans text-base font-medium text-foreground mb-2">
                  {t.memberships.complimentaryPrograms.recovery.title}
                </h4>
                <p className="text-xs text-foreground/60 mb-3">
                  {t.memberships.complimentaryPrograms.recovery.description}
                </p>
                <p className="text-xs font-medium text-primary">
                  {t.memberships.complimentaryPrograms.recovery.price}
                </p>
                <button className="mt-3 flex items-center gap-1 text-xs text-foreground/70 group-hover:text-primary transition-colors">
                  View options <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              {/* Mind & Body */}
              <div className="rounded-xl border border-border/30 bg-card/10 p-5 hover:border-primary/40 hover:bg-card/20 transition-all group">
                <h4 className="font-sans text-base font-medium text-foreground mb-2">
                  {t.memberships.complimentaryPrograms.mindBody.title}
                </h4>
                <p className="text-xs text-foreground/60 mb-3">
                  {t.memberships.complimentaryPrograms.mindBody.description}
                </p>
                <p className="text-xs font-medium text-primary">
                  {t.memberships.complimentaryPrograms.mindBody.price}
                </p>
                <button className="mt-3 flex items-center gap-1 text-xs text-foreground/70 group-hover:text-primary transition-colors">
                  View options <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              variant="primary"
              className="w-full sm:w-auto shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
              onClick={() => scrollToSection?.("contact")}
            >
              {t.memberships.applyNow}
            </MagneticButton>
            
            <MagneticButton
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => {
                // Navigate to detail page or scroll to more info
                window.location.href = "/membership"
              }}
            >
              {t.memberships.learnMore}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
})
```

---

### **4. Update Membership Detail Page**

**File**: `/app/membership/page.tsx` (new single page, not `[id]`)

```typescript
"use client"

import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { StructuredData } from "@/components/structured-data"
import { ArrowLeft, Check, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { getTherapiesByCategory, getComplimentaryPrograms } from "@/lib/therapy-matrix"

export default function MembershipPage() {
  const router = useRouter()
  const { t, language } = useTranslation()
  const [mounted, setMounted] = useState(false)

  const membership = t.memberships.membership
  const sections = t.memberships.sections

  useEffect(() => {
    setMounted(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    // Analytics tracking
    if (typeof window !== "undefined" && (window as any).clarity) {
      ;(window as any).clarity("set", "membership_detail_view", "hamaria")
    }
  }, [])

  // Get therapies by category
  const fitnessTherapies = getTherapiesByCategory('fitness')
  const spaTherapies = getTherapiesByCategory('spa')
  const loungeTherapies = getTherapiesByCategory('lounge')
  const checkupTherapies = getTherapiesByCategory('checkup')
  const complimentaryPrograms = getComplimentaryPrograms()

  // Structured data
  const membershipStructuredData = {
    name: membership.name,
    description: membership.description,
    price: membership.monthlyPrice.toString(),
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <StructuredData type="membership" data={membershipStructuredData} />
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <ShaderWrapper />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10 px-5 py-8 sm:px-6 md:px-8 lg:px-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mx-auto max-w-7xl">
          {/* Hero */}
          <div className="mb-12 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-medium"
              style={{
                backgroundColor: `${membership.color}20`,
                color: membership.color,
                border: `1px solid ${membership.color}40`,
              }}
            >
              <Sparkles className="h-3 w-3" />
              {membership.tagline}
            </div>
            
            <h1 className="font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl mb-4">
              {membership.name}
            </h1>
            
            <p className="max-w-3xl mx-auto font-sans text-lg text-foreground/70 md:text-xl">
              {membership.description}
            </p>
          </div>

          {/* Founders Offer */}
          <div className="mb-12 rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center backdrop-blur-sm max-w-2xl mx-auto">
            <p className="font-sans text-xl font-medium text-foreground">
              {t.memberships.foundersOffer}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {t.memberships.limitedMembers}
            </p>
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
            <div 
              className="rounded-2xl border p-8 backdrop-blur-sm"
              style={{
                backgroundColor: `${membership.color}05`,
                borderColor: `${membership.color}20`,
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
                {t.memberships.monthlyPrice}
              </p>
              <p className="font-sans text-6xl font-light text-foreground mb-2">
                €{membership.monthlyPrice}
              </p>
              <p className="text-sm text-foreground/60">{t.memberships.perMonth}</p>
            </div>

            <div 
              className="rounded-2xl border p-8 backdrop-blur-sm relative"
              style={{
                backgroundColor: `${membership.color}10`,
                borderColor: `${membership.color}40`,
              }}
            >
              <div 
                className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: membership.color, color: 'white' }}
              >
                Save 10%
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
                {t.memberships.yearlyPrice}
              </p>
              <p className="font-sans text-6xl font-light text-foreground mb-2">
                €{membership.yearlyPrice}
              </p>
              <p className="text-sm text-foreground/60">{t.memberships.perYear}</p>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-16 mb-16">
            {/* Fitness Section */}
            <div>
              <h2 className="text-3xl font-light text-foreground mb-4">
                {sections.fitness.title}
              </h2>
              <p className="text-foreground/70 mb-6 max-w-3xl">
                {sections.fitness.description}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {fitnessTherapies.map((therapy, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/20 p-3"
                  >
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: membership.color }} />
                    <span className="text-sm text-foreground/80">
                      {language === "es" ? therapy.nameES : therapy.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spa Section */}
            <div>
              <h2 className="text-3xl font-light text-foreground mb-4">
                {sections.spa.title}
              </h2>
              <p className="text-foreground/70 mb-6 max-w-3xl">
                {sections.spa.description}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {spaTherapies.map((therapy, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/20 p-3"
                  >
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: membership.color }} />
                    <span className="text-sm text-foreground/80">
                      {language === "es" ? therapy.nameES : therapy.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Members Lounge Section */}
            <div>
              <h2 className="text-3xl font-light text-foreground mb-4">
                {sections.lounge.title}
              </h2>
              <p className="text-foreground/70 mb-6 max-w-3xl">
                {sections.lounge.description}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {loungeTherapies.map((therapy, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/20 p-3"
                  >
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: membership.color }} />
                    <span className="text-sm text-foreground/80">
                      {language === "es" ? therapy.nameES : therapy.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Checkups Section */}
            <div>
              <h2 className="text-3xl font-light text-foreground mb-4">
                {sections.checkups.title}
              </h2>
              <p className="text-foreground/70 mb-6 max-w-3xl">
                {sections.checkups.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {checkupTherapies.map((therapy, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border/50 bg-card/20 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: membership.color }} />
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          {language === "es" ? therapy.nameES : therapy.name}
                        </p>
                        <p className="text-xs text-foreground/60">
                          {therapy.allocation === "Unlimited" || therapy.allocation === 12 
                            ? `${therapy.allocation}${therapy.isYearly ? '/year' : '/month'}`
                            : `${therapy.allocation}/year`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Complimentary Programs */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light text-foreground mb-3">
                {t.memberships.complimentaryPrograms.title}
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                {t.memberships.complimentaryPrograms.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {Object.entries(t.memberships.complimentaryPrograms).map(([key, program]) => {
                if (key === 'title' || key === 'subtitle' || key === 'description') return null
                
                return (
                  <div
                    key={key}
                    className="rounded-xl border border-border/30 bg-card/10 p-6 hover:border-primary/40 hover:bg-card/20 transition-all"
                  >
                    <h3 className="text-xl font-medium text-foreground mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      {program.description}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {program.price}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton
              variant="primary"
              className="w-full sm:w-auto shadow-lg"
              onClick={() => {
                router.push("/?section=contact")
              }}
            >
              {t.memberships.applyNow}
            </MagneticButton>
          </div>
        </div>
      </div>
    </main>
  )
}
```

---

## 🗄️ API & Database Changes

### **5. Update Database Schema**

**File**: Update Supabase schema or create migration

```sql
-- Add new membership tier
ALTER TABLE memberships 
ADD COLUMN IF NOT EXISTS legacy_tier VARCHAR(50);

-- For existing members, preserve their tier
UPDATE memberships 
SET legacy_tier = tier
WHERE tier IN ('wellness', 'longevity', 'aesthetics');

-- Update all active memberships to new structure
UPDATE memberships 
SET tier = 'hamaria'
WHERE status = 'active';

-- Add complimentary programs tracking table
CREATE TABLE IF NOT EXISTS member_complimentary_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES memberships(id) ON DELETE CASCADE,
  therapy_name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  purchased_at TIMESTAMP DEFAULT NOW(),
  used_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'purchased' CHECK (status IN ('purchased', 'scheduled', 'completed', 'cancelled'))
);

CREATE INDEX idx_member_complimentary_member ON member_complimentary_purchases(member_id);
CREATE INDEX idx_member_complimentary_category ON member_complimentary_purchases(category);
```

### **6. Update TypeScript Types**

**File**: `/lib/types/database.ts`

```typescript
// Old
export type MembershipTier = 'harmony' | 'renaissance' | 'opulence';

// New
export type MembershipTier = 'hamaria' | 'legacy-wellness' | 'legacy-longevity' | 'legacy-aesthetics';

export interface ComplimentaryPurchase {
  id: string
  member_id: string
  therapy_name: string
  category: 'aesthetics' | 'performance' | 'recovery' | 'mind-body'
  price: number
  purchased_at: string
  used_at?: string
  status: 'purchased' | 'scheduled' | 'completed' | 'cancelled'
}
```

---

## 🔍 SEO & Metadata Updates

### **7. Update SEO Metadata**

**File**: `/lib/seo/membership-metadata.ts`

```typescript
export interface MembershipMetadataConfig {
  id: string
  title: string
  description: string
  price: number
  keywords: string[]
}

export const membershipConfig: MembershipMetadataConfig = {
  id: 'hamaria',
  title: 'Hamaria Members - All-Inclusive Wellness & Longevity',
  description: 'One membership. Complete access. Unlimited fitness, spa facilities, members lounge with longevity devices, and comprehensive health monitoring. €1,850/month in Madrid.',
  price: 1850,
  keywords: [
    'luxury wellness membership Madrid',
    'all-inclusive spa membership Madrid',
    'unlimited fitness wellness Madrid',
    'longevity center membership Madrid',
    'premium health club Madrid',
    'HBOT membership Spain',
    'cryotherapy sauna membership Madrid',
    'biohacking wellness center Madrid',
    'private wellness club Madrid',
    'comprehensive health tracking Madrid',
    'float therapy membership Madrid',
    'red light therapy membership Madrid',
    'executive wellness program Madrid',
    'longevity optimization Madrid',
    'wellness concierge Madrid',
  ],
}

// Legacy configs for redirects
export const legacyMembershipConfigs: Record<string, MembershipMetadataConfig> = {
  wellness: {
    id: 'wellness',
    title: 'Redirecting to Hamaria Membership',
    description: 'This page has moved. Hamaria now offers a single comprehensive membership.',
    price: 1850,
    keywords: [],
  },
  longevity: {
    id: 'longevity',
    title: 'Redirecting to Hamaria Membership',
    description: 'This page has moved. Hamaria now offers a single comprehensive membership.',
    price: 1850,
    keywords: [],
  },
  aesthetics: {
    id: 'aesthetics',
    title: 'Redirecting to Hamaria Membership',
    description: 'This page has moved. Hamaria now offers a single comprehensive membership.',
    price: 1850,
    keywords: [],
  },
}
```

### **8. Add Redirects**

**File**: `/app/membership/[id]/page.tsx` (modify for redirects)

```typescript
"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

// Legacy tier IDs that should redirect
const LEGACY_TIERS = ['wellness', 'longevity', 'aesthetics', 'harmony', 'renaissance', 'opulence']

export default function LegacyMembershipRedirect() {
  const params = useParams()
  const router = useRouter()
  const tierId = params.id as string

  useEffect(() => {
    // If it's a legacy tier, redirect to new membership page
    if (LEGACY_TIERS.includes(tierId)) {
      router.replace('/membership')
    } else {
      // If it's not a known tier, redirect to home
      router.replace('/')
    }
  }, [tierId, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-foreground/70">Redirecting...</p>
      </div>
    </div>
  )
}
```

**File**: `next.config.mjs` (add permanent redirects)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
  
  async redirects() {
    return [
      {
        source: '/membership/wellness',
        destination: '/membership',
        permanent: true,
      },
      {
        source: '/membership/longevity',
        destination: '/membership',
        permanent: true,
      },
      {
        source: '/membership/aesthetics',
        destination: '/membership',
        permanent: true,
      },
      {
        source: '/membership/harmony',
        destination: '/membership',
        permanent: true,
      },
      {
        source: '/membership/renaissance',
        destination: '/membership',
        permanent: true,
      },
      {
        source: '/membership/opulence',
        destination: '/membership',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
```

---

## ✅ Testing Checklist

### **Functionality Testing**

- [ ] Homepage membership section displays correctly
- [ ] "Apply Now" button scrolls to contact form
- [ ] "Learn More" navigates to `/membership` page
- [ ] Membership detail page loads without errors
- [ ] All therapy lists display correctly
- [ ] Complimentary programs section renders
- [ ] Pricing displays correctly (monthly & yearly)
- [ ] Founders offer banner shows
- [ ] Back button works correctly
- [ ] Language toggle works (EN/ES)

### **Responsive Testing**

- [ ] Mobile (320px-767px) layout works
- [ ] Tablet (768px-1023px) layout works
- [ ] Desktop (1024px+) layout works
- [ ] Large desktop (1920px+) layout works
- [ ] Touch interactions work on mobile
- [ ] Scroll behavior is smooth

### **SEO Testing**

- [ ] Meta tags are correct
- [ ] OpenGraph tags are present
- [ ] Structured data validates
- [ ] Sitemap includes new URL
- [ ] Robots.txt allows crawling
- [ ] Page loads in <3 seconds
- [ ] Legacy URLs redirect properly

### **Analytics Testing**

- [ ] Page view events fire
- [ ] Button click events track
- [ ] Form submission events track
- [ ] Clarity session recording works

### **Cross-Browser Testing**

- [ ] Chrome/Edge (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🔄 Rollback Plan

### **If Issues Arise**

**Step 1**: Immediate Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to last known good commit
git reset --hard <commit-hash>
git push --force origin main
```

**Step 2**: Database Rollback
```sql
-- Restore legacy tiers
UPDATE memberships 
SET tier = legacy_tier
WHERE legacy_tier IS NOT NULL;
```

**Step 3**: Clear CDN Cache
```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod --force
```

**Step 4**: Communication
- Post notice on website about temporary reversion
- Email affected members
- Update social media

---

## 📅 Deployment Checklist

### **Pre-Deployment**

- [ ] All code changes reviewed
- [ ] Tests passing locally
- [ ] Database migrations tested
- [ ] Backup created
- [ ] Staging environment tested
- [ ] Stakeholder approval obtained

### **Deployment**

- [ ] Deploy to staging
- [ ] Run smoke tests
- [ ] Deploy to production
- [ ] Verify deployment
- [ ] Clear CDN cache
- [ ] Monitor error logs

### **Post-Deployment**

- [ ] Test all critical paths
- [ ] Monitor analytics
- [ ] Check error rates
- [ ] Verify SEO indexing
- [ ] Gather user feedback
- [ ] Document any issues

---

## 📞 Support & Maintenance

### **Post-Launch Monitoring**

**Week 1**:
- Daily analytics review
- User feedback collection
- Bug fixes as needed
- Performance monitoring

**Week 2-4**:
- Weekly analytics reports
- A/B testing opportunities
- Content refinements
- SEO optimization

**Month 2-3**:
- Quarterly review
- Feature iterations
- Complimentary program optimization
- Member satisfaction surveys

---

**Document Version**: 1.0  
**Last Updated**: November 20, 2025  
**Implementation Status**: ⏳ **READY TO START**

