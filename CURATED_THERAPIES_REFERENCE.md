# Curated Therapies Quick Reference

## Premium Therapy Selections by Category

This document provides the exact therapy lists to use in the enhanced animation, organized by category with rationale for each selection.

---

## 🟢 Longevity Technology (Performance)
**Category ID**: `performance`
**Theme**: Cutting-edge biohacking and athletic optimization
**Color**: `#6B8E23` (Olive Green)

### Animation Set A (Primary - Morning/Default)
```json
[
  "Hyperbaric Oxygen Therapy (HBOT)",
  "Whole Body Cryotherapy",
  "Full Body Red Light Therapy"
]
```
**Why these?**
- HBOT: Ultimate flagship technology therapy
- Cryotherapy: Highly recognizable, trending wellness therapy
- Red Light: Popular biohacking modality

### Animation Set B (Secondary - Afternoon)
```json
[
  "Intermittent Hypoxic-Hyperoxic Therapy (IHHT)",
  "Pulsed Electromagnetic Field Therapy (PEMF)",
  "VO₂ Max Testing"
]
```
**Why these?**
- IHHT: Unique, advanced altitude training
- PEMF: Mysterious-sounding, high-tech
- VO₂ Max: Athletic performance gold standard

### Animation Set C (Tertiary - Evening)
```json
[
  "Personal Training",
  "Ice Plunge",
  "Electrical Muscle Stimulation Training"
]
```
**Why these?**
- Personal Training: Accessible, understandable
- Ice Plunge: Viral wellness trend
- EMS: High-tech muscle building

---

## 🟣 Wellness Spa (Wellness)
**Category ID**: `wellness`
**Theme**: Luxurious relaxation and holistic balance
**Color**: `#6B8E23` (Olive Green)

### Animation Set A (Primary - Morning/Default)
```json
[
  "Signature Massages",
  "Infrared Sauna",
  "Magnesium, Alkaline & Salt Baths"
]
```
**Why these?**
- Signature Massages: Ultimate luxury spa experience
- Infrared Sauna: Classic wellness staple everyone knows
- Mineral Baths: Exotic, luxurious bathing ritual

### Animation Set B (Secondary - Afternoon)
```json
[
  "Ice Plunge",
  "Oriental Massages",
  "Mindfulness Practice"
]
```
**Why these?**
- Ice Plunge: Contrast therapy, trending
- Oriental Massages: Exotic, traditional wisdom
- Mindfulness: Mental wellness, meditation

### Animation Set C (Tertiary - Evening)
```json
[
  "Therapeutic Massages",
  "Steam Room",
  "Foot Reflexology"
]
```
**Why these?**
- Therapeutic Massages: Evidence-based wellness
- Steam Room: Traditional spa essential
- Foot Reflexology: Specialized relaxation

---

## 🟡 Aesthetics
**Category ID**: `aesthetics`
**Theme**: Medical-grade beauty and regenerative treatments
**Color**: `#6B8E23` (Olive Green)

### Animation Set A (Primary - Morning/Default)
```json
[
  "HydraFacial®",
  "High-Frequency Facial RF (Face/Neck)",
  "Photorejuvenation Laser"
]
```
**Why these?**
- HydraFacial®: Instantly recognizable brand name
- RF Facial: Advanced anti-aging technology
- Photorejuvenation: Medical-grade laser treatment

### Animation Set B (Secondary - Afternoon)
```json
[
  "PRF Stem Cell Facelift",
  "Medical Chemical Peels",
  "Microneedling with PRP"
]
```
**Why these?**
- PRF Facelift: Cutting-edge regenerative medicine
- Chemical Peels: Professional-grade skincare
- Microneedling PRP: Trendy, celebrity-endorsed

### Animation Set C (Tertiary - Evening)
```json
[
  "Signature Facials",
  "Red Light Hair Therapy",
  "Pressotherapy Lymphatic Drainage"
]
```
**Why these?**
- Signature Facials: Bespoke luxury
- Hair Therapy: Addresses common concern
- Pressotherapy: Body sculpting appeal

---

## 🔵 Diagnostics
**Category ID**: `diagnostics`
**Theme**: Data-driven precision medicine
**Color**: `#6B8E23` (Olive Green)

### Animation Set A (Primary - Morning/Default)
```json
[
  "Epigenetic Age Assessment",
  "Comprehensive Hormone Panel",
  "VO₂ Max Testing"
]
```
**Why these?**
- Epigenetic Age: Biohacker dream, age reversal
- Hormone Panel: Comprehensive health optimization
- VO₂ Max: Athletic performance benchmark

### Animation Set B (Secondary - Afternoon)
```json
[
  "Full Body DEXA Scan",
  "Continuous Glucose Monitoring",
  "Body Lab Bioimpedance Analysis"
]
```
**Why these?**
- DEXA Scan: Gold standard body composition
- CGM: Metabolic precision, trending
- Bioimpedance: Advanced body analysis

### Animation Set C (Tertiary - Evening)
```json
[
  "RMR Metabolic Testing",
  "Gut Microbiome Mapping",
  "Food Sensitivity Testing"
]
```
**Why these?**
- RMR Testing: Metabolism understanding
- Microbiome: Gut health optimization
- Food Sensitivity: Personalized nutrition

---

## Implementation Code Snippets

### Site.json Addition

Add this new section to site.json under each language:

```json
"featuredTherapies": {
  "performance": {
    "sets": [
      {
        "id": "primary",
        "therapies": [
          "Hyperbaric Oxygen Therapy (HBOT)",
          "Whole Body Cryotherapy",
          "Full Body Red Light Therapy"
        ],
        "timeOfDay": "morning"
      },
      {
        "id": "secondary",
        "therapies": [
          "Intermittent Hypoxic-Hyperoxic Therapy (IHHT)",
          "Pulsed Electromagnetic Field Therapy (PEMF)",
          "VO₂ Max Testing"
        ],
        "timeOfDay": "afternoon"
      },
      {
        "id": "tertiary",
        "therapies": [
          "Personal Training",
          "Ice Plunge",
          "Electrical Muscle Stimulation Training"
        ],
        "timeOfDay": "evening"
      }
    ]
  },
  "wellness": {
    "sets": [
      {
        "id": "primary",
        "therapies": [
          "Signature Massages",
          "Infrared Sauna",
          "Magnesium, Alkaline & Salt Baths"
        ],
        "timeOfDay": "morning"
      },
      {
        "id": "secondary",
        "therapies": [
          "Ice Plunge",
          "Oriental Massages",
          "Mindfulness Practice"
        ],
        "timeOfDay": "afternoon"
      },
      {
        "id": "tertiary",
        "therapies": [
          "Therapeutic Massages",
          "Steam Room",
          "Foot Reflexology"
        ],
        "timeOfDay": "evening"
      }
    ]
  },
  "aesthetics": {
    "sets": [
      {
        "id": "primary",
        "therapies": [
          "HydraFacial®",
          "High-Frequency Facial RF (Face/Neck)",
          "Photorejuvenation Laser"
        ],
        "timeOfDay": "morning"
      },
      {
        "id": "secondary",
        "therapies": [
          "PRF Stem Cell Facelift",
          "Medical Chemical Peels",
          "Microneedling with PRP"
        ],
        "timeOfDay": "afternoon"
      },
      {
        "id": "tertiary",
        "therapies": [
          "Signature Facials",
          "Red Light Hair Therapy",
          "Pressotherapy Lymphatic Drainage"
        ],
        "timeOfDay": "evening"
      }
    ]
  },
  "diagnostics": {
    "sets": [
      {
        "id": "primary",
        "therapies": [
          "Epigenetic Age Assessment",
          "Comprehensive Hormone Panel",
          "VO₂ Max Testing"
        ],
        "timeOfDay": "morning"
      },
      {
        "id": "secondary",
        "therapies": [
          "Full Body DEXA Scan",
          "Continuous Glucose Monitoring",
          "Body Lab Bioimpedance Analysis"
        ],
        "timeOfDay": "afternoon"
      },
      {
        "id": "tertiary",
        "therapies": [
          "RMR Metabolic Testing",
          "Gut Microbiome Mapping",
          "Food Sensitivity Testing"
        ],
        "timeOfDay": "evening"
      }
    ]
  }
}
```

### Component Hook for Time-Based Selection

```typescript
// hooks/use-therapy-set.ts
import { useMemo } from 'react'

export function useTherapySet(categoryId: string, therapySets: any) {
  return useMemo(() => {
    const hour = new Date().getHours()
    
    // Morning: 6am - 12pm
    // Afternoon: 12pm - 6pm
    // Evening: 6pm - 6am
    
    let timeOfDay = 'morning'
    if (hour >= 12 && hour < 18) timeOfDay = 'afternoon'
    if (hour >= 18 || hour < 6) timeOfDay = 'evening'
    
    const sets = therapySets[categoryId]?.sets || []
    const matchingSet = sets.find(s => s.timeOfDay === timeOfDay)
    
    return matchingSet?.therapies || sets[0]?.therapies || []
  }, [categoryId, therapySets])
}
```

---

## Animation Style Recommendations by Category

### Performance → **"Tech Glitch" Animation**
- Brief digital scramble effect
- Sharp, precise movements
- Metallic color accents
- Fast, energetic pacing

### Wellness → **"Wave Typing" Animation**
- Smooth, flowing appearance
- Gentle, organic movements
- Warm color gradients
- Calm, measured pacing

### Aesthetics → **"Gradient Sweep" Animation**
- Elegant color transitions
- Luxurious shimmer effects
- Soft, graceful movements
- Sophisticated pacing

### Diagnostics → **"Pulse Reveal" Animation**
- Data-driven appearance
- Clean, clinical movements
- Blue accent highlights
- Precise, measured pacing

---

## Therapy Name Optimization

Some therapy names are long. Consider these shortened display versions for the animation:

| Full Name | Animation Display |
|-----------|------------------|
| Intermittent Hypoxic-Hyperoxic Therapy (IHHT) | IHHT Altitude Training |
| High-Frequency Facial RF (Face/Neck) | RF Facial Lifting |
| Pulsed Electromagnetic Field Therapy (PEMF) | PEMF Therapy |
| Hyperbaric Oxygen Therapy (HBOT) | HBOT |
| Magnesium, Alkaline & Salt Baths | Mineral Baths |
| Electrical Muscle Stimulation Training | EMS Training |
| Comprehensive Hormone Panel | Full Hormone Analysis |
| Pressotherapy Lymphatic Drainage | Pressotherapy |
| Continuous Glucose Monitoring | CGM |
| Full Body Red Light Therapy | Red Light Therapy |

---

## Spanish Translations

### Longevity Technology (Tecnología de Longevidad)

**Set A:**
```json
[
  "Cámara Hiperbárica (HBOT)",
  "Crioterapia de Cuerpo Completo",
  "Terapia de Luz Roja"
]
```

**Set B:**
```json
[
  "Terapia IHHT",
  "Campo Electromagnético Pulsado (PEMF)",
  "Test de VO₂ Máx"
]
```

**Set C:**
```json
[
  "Entrenamiento Personal",
  "Baño de Hielo",
  "Electroestimulación Muscular"
]
```

### Wellness Spa (Spa de Bienestar)

**Set A:**
```json
[
  "Masajes Signature",
  "Sauna de Infrarrojos",
  "Baños de Magnesio y Sal"
]
```

**Set B:**
```json
[
  "Baño de Hielo",
  "Masajes Orientales",
  "Práctica de Mindfulness"
]
```

**Set C:**
```json
[
  "Masajes Terapéuticos",
  "Baño de Vapor",
  "Reflexología Podal"
]
```

### Aesthetics (Estética)

**Set A:**
```json
[
  "HydraFacial®",
  "Radiofrecuencia Facial",
  "Láser Fotorrejuvenecedor"
]
```

**Set B:**
```json
[
  "Lifting con Células Madre PRF",
  "Peelings Químicos Médicos",
  "Microagujas con PRP"
]
```

**Set C:**
```json
[
  "Faciales Signature",
  "Terapia Capilar con Luz Roja",
  "Presoterapia"
]
```

### Diagnostics (Diagnóstico)

**Set A:**
```json
[
  "Edad Epigenética",
  "Panel Hormonal Completo",
  "Test de VO₂ Máx"
]
```

**Set B:**
```json
[
  "Escáner DEXA Completo",
  "Monitorización Continua de Glucosa",
  "Análisis de Bioimpedancia"
]
```

**Set C:**
```json
[
  "Test Metabólico RMR",
  "Mapeo del Microbioma",
  "Test de Sensibilidad Alimentaria"
]
```

---

## Testing Checklist

### Visual Quality
- [ ] Animations are smooth at 60fps
- [ ] Text is clearly readable at all animation stages
- [ ] Colors match brand guidelines
- [ ] Cursor animation is subtle but noticeable
- [ ] Transitions between therapies are seamless

### Functionality
- [ ] Therapies change based on hovered/active tag
- [ ] Animation pauses when section is out of view
- [ ] All therapy sets display correctly
- [ ] Time-based rotation works (if implemented)
- [ ] No memory leaks or performance issues

### Responsive Design
- [ ] Works on desktop (1920px+)
- [ ] Works on laptop (1280px-1920px)
- [ ] Works on tablet (768px-1280px)
- [ ] Works on mobile (320px-768px)
- [ ] Touch interactions work on mobile

### Accessibility
- [ ] Respects prefers-reduced-motion
- [ ] Screen reader announces changes
- [ ] Keyboard navigation works
- [ ] Focus states are clear
- [ ] Sufficient color contrast

### Browser Support
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Performance Targets

| Metric | Target | Critical |
|--------|--------|----------|
| Component Load Time | <100ms | <200ms |
| Animation FPS | 60fps | 45fps+ |
| Memory Usage | <5MB | <10MB |
| CPU Usage (idle) | <5% | <10% |
| CPU Usage (animating) | <20% | <30% |
| Lighthouse Performance | >95 | >85 |
| Lighthouse Accessibility | 100 | 95+ |

---

## Future Enhancements

### Phase 2 Ideas
1. **Therapy Tooltips**: Hover over therapy name for quick description
2. **Click to Learn More**: Click therapy to see full details
3. **Favorites**: Users can save favorite therapies
4. **Share**: Social share of specific therapy
5. **Voice Narration**: Optional audio reading of therapies

### Advanced Features
1. **AI Recommendations**: Suggest therapies based on user profile
2. **Seasonal Highlighting**: Emphasize season-appropriate therapies
3. **Trend Indicators**: Show which therapies are trending
4. **Availability Status**: Real-time booking availability
5. **Integration**: Link to booking system

---

## Contact & Questions

For implementation questions or design clarifications:
- Reference: SERVICES_ANIMATION_ENHANCEMENT_PLAN.md
- Current Implementation: components/typing-therapies.tsx
- Services Section: components/sections/services-section.tsx
- Data Source: content/site.json

**Key Decision Makers Should Approve:**
1. Curated therapy selections per category
2. Animation style choices
3. Time-based vs. random rotation
4. Desktop vs. mobile animation intensity
5. Sound effects (yes/no)

---

## Quick Start Implementation

### Minimum Viable Enhancement (1-2 hours)
1. Replace current therapy selection with curated sets (Set A for each category)
2. Add breathing cursor animation (scale 0.9 to 1)
3. Add subtle container glow effect
4. Variable typing speed (faster for short words, slower for long)

### Recommended Enhancement (1-2 days)
1. All curated therapy sets
2. Time-based rotation system
3. Wave typing animation
4. Enhanced container with gradient background
5. Typography improvements
6. Mobile optimizations

### Complete Enhancement (3-5 days)
1. All features from plan
2. Multiple animation styles
3. Full micro-interactions
4. Accessibility features
5. Performance optimizations
6. Cross-browser testing
7. Analytics integration

