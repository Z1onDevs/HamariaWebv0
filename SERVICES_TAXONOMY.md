# Services Taxonomy - Relational Mapping

## 📊 Category & Subcategory Structure

### Main Categories (4)
All services must belong to at least ONE main category:

| ID | Name | Color | Description |
|---|---|---|---|
| `performance` | Performance | `#10b981` (Green) | Athletic optimization, recovery, physical enhancement |
| `wellness` | Wellness | `#8b5cf6` (Purple) | Holistic health, stress, mental wellbeing |
| `aesthetics` | Aesthetics | `#f59e0b` (Amber) | Beauty, anti-aging, body contouring |
| `diagnostics` | Diagnostics | `#3b82f6` (Blue) | Testing, analysis, data tracking |

### Subcategories (12 Core Specializations)
All services must belong to at least ONE subcategory:

| ID | Name | Parent Categories | Focus |
|---|---|---|---|
| `aesthetics-sub` | Aesthetics | [aesthetics] | Facial, body, skin treatments |
| `energy` | Energy | [performance, wellness] | Vitality, cellular energy, metabolism |
| `information-medicine` | Information Medicine | [diagnostics, wellness] | Data-driven health, biomarkers |
| `detox` | Detoxification | [wellness] | Cleansing, elimination, purification |
| `regeneration` | Regeneration | [performance, wellness] | Recovery, healing, repair |
| `sleep` | Sleep | [wellness] | Rest optimization, sleep quality |
| `biorhythms` | Biorhythms | [wellness, performance] | Circadian rhythm, hormonal cycles |
| `stress` | Stress Management | [wellness] | Relaxation, nervous system regulation |
| `physical-medicine` | Physical Medicine | [performance, wellness] | Therapeutic interventions, rehab |
| `diagnostics-sub` | Diagnostics | [diagnostics] | Testing, screening, analysis |
| `movement` | Movement | [performance] | Training, mobility, functional fitness |
| `psyche` | Psyche & Cognition | [wellness] | Mental health, cognitive function |

---

## 🔗 Service-to-Category Mapping

### Complete Relational Matrix

```
SERVICE_ID → [MAIN_CATEGORIES] → [SUBCATEGORIES]
```

#### Diagnostics Services (23 total)

| Service | Main Categories | Subcategories |
|---------|----------------|---------------|
| Complete Blood Count (CBC) | diagnostics | diagnostics-sub, information-medicine |
| Metabolic Panel | diagnostics | diagnostics-sub, information-medicine, energy |
| Advanced Lipid Profile | diagnostics | diagnostics-sub, information-medicine |
| Inflammation Markers | diagnostics, wellness | diagnostics-sub, information-medicine |
| Comprehensive Hormone Panel | diagnostics, performance | diagnostics-sub, biorhythms, energy |
| Micronutrient Analysis | diagnostics, wellness | diagnostics-sub, energy |
| Oxidative Stress Assessment | diagnostics, wellness | diagnostics-sub, information-medicine |
| Coagulation Panel | diagnostics | diagnostics-sub |
| Cytokine & Catecholamine Testing | diagnostics, wellness | diagnostics-sub, stress, biorhythms |
| Gut Microbiome Analysis | diagnostics, wellness | diagnostics-sub, information-medicine, detox |
| Heavy Metal Panel | diagnostics, wellness | diagnostics-sub, detox |
| Genetic Sequencing | diagnostics | diagnostics-sub, information-medicine |
| Biological Age Testing | diagnostics, performance | diagnostics-sub, information-medicine, regeneration |
| Multi-Cancer Early Detection | diagnostics | diagnostics-sub, information-medicine |
| VO₂ Max Testing | diagnostics, performance | diagnostics-sub, movement, energy |
| 24-Hour ECG & BP Monitoring | diagnostics | diagnostics-sub, information-medicine |
| Ankle-Brachial Index (ABI) | diagnostics | diagnostics-sub |
| Advanced Skin Analysis | diagnostics, aesthetics | diagnostics-sub, aesthetics-sub |
| 3D Body Composition Scan | diagnostics, performance | diagnostics-sub, movement, information-medicine |
| Tissue Mineral Analysis | diagnostics, wellness | diagnostics-sub, information-medicine |

#### Performance Services (25+ total)

| Service | Main Categories | Subcategories |
|---------|----------------|---------------|
| HBOT | performance, wellness | regeneration, energy |
| Oxyven® IV Oxygen | performance, wellness | regeneration, energy |
| IV Vitamin & Antioxidant | wellness, performance | energy, regeneration |
| NAD+ IV Therapy | performance, wellness | energy, regeneration, biorhythms |
| Whole Body Cryotherapy | performance, wellness | regeneration, stress |
| Red & NIR Light Therapy | performance, wellness, aesthetics | regeneration, energy, aesthetics-sub |
| Infrared Sauna | wellness | detox, stress, regeneration |
| PEMF | performance, wellness | regeneration, physical-medicine |
| Emsculpt NEO | aesthetics, performance | aesthetics-sub, movement |
| Shockwave Therapy | performance, wellness | regeneration, physical-medicine |
| Therapeutic Ultrasound | performance, wellness | regeneration, physical-medicine |
| Pressotherapy Lymphatic Drainage | wellness, aesthetics | detox, regeneration |
| IHHT | performance | energy, regeneration, biorhythms |
| Movement Coaching (CLP) | performance | movement |
| Personal Training | performance | movement |
| Pilates Reformer | performance, wellness | movement |
| Private Yoga | wellness, performance | movement, psyche, stress |
| Aerial Yoga | performance, wellness | movement |
| Movement Lab (3D Analysis) | performance, diagnostics | movement, diagnostics-sub |
| Physiotherapy & Manual Therapy | performance, wellness | physical-medicine, regeneration |

#### Wellness Services (40+ total)

| Service | Main Categories | Subcategories |
|---------|----------------|---------------|
| UV Light Therapy | wellness | energy, biorhythms |
| Revitalizing Massage | wellness | physical-medicine, stress, regeneration |
| Relaxing Massage | wellness | stress, physical-medicine |
| Deep Tissue Massage | wellness, performance | physical-medicine, regeneration |
| Detox Massage | wellness | detox, physical-medicine |
| Slimming Massage | aesthetics, wellness | aesthetics-sub, detox |
| Bamboo Pain & Stress Relief | wellness | stress, physical-medicine |
| Traditional Thai Massage | wellness | physical-medicine, stress |
| Abhyanga Shirodhara | wellness | stress, physical-medicine, biorhythms |
| Chi Nei Tsang Abdominal | wellness | detox, stress, physical-medicine |
| Foot Reflexology | wellness | stress, physical-medicine |
| Alkaline & Salt Baths | wellness | detox, stress, regeneration |
| Detox Body Wraps | wellness, aesthetics | detox, aesthetics-sub |
| Moor Mud & Clay Therapy | wellness, aesthetics | detox, aesthetics-sub |
| Liver Detox Protocol | wellness | detox, information-medicine |
| Quality of Life Assessment | diagnostics, wellness | psyche, information-medicine |
| Cognitive Assessment (MoCA) | diagnostics, wellness | psyche, diagnostics-sub |
| Well-Being Questionnaire | wellness | psyche, information-medicine |
| Psychological Assessment | wellness | psyche, information-medicine |
| Need for Recovery Scale | wellness | stress, psyche |
| Nutritional Assessment | wellness | information-medicine, energy |
| Loneliness Assessment | wellness | psyche |
| NMN Supplementation | wellness, performance | energy, regeneration, biorhythms |
| NR Supplement | wellness, performance | energy, regeneration |
| Breathwork & Stretching | wellness | stress, psyche, movement |

#### Aesthetics Services (15+ total)

| Service | Main Categories | Subcategories |
|---------|----------------|---------------|
| HydraFacial® | aesthetics | aesthetics-sub |
| Photorejuvenation Laser | aesthetics | aesthetics-sub, regeneration |
| Vascular Laser Treatment | aesthetics | aesthetics-sub |
| ALMA Q Laser | aesthetics | aesthetics-sub |
| Medical Chemical Peels | aesthetics | aesthetics-sub, regeneration |
| High-Frequency Facial RF | aesthetics | aesthetics-sub, energy |
| HIFU Face Lift | aesthetics | aesthetics-sub, regeneration |
| CoolTech® Cryolipolysis | aesthetics | aesthetics-sub, regeneration |
| Localized Cryotherapy | aesthetics, wellness | aesthetics-sub, regeneration |
| Body Pressotherapy | aesthetics, wellness | aesthetics-sub, detox |
| Maderoterapia Wood Therapy | aesthetics | aesthetics-sub, detox |
| Red Light Hair Therapy | aesthetics | aesthetics-sub, energy, regeneration |

---

## 🔄 Filtering Logic

### Rule 1: Main Category Filter (OR Logic)
```
If user selects [Performance, Wellness]:
  → Show ALL services tagged with Performance OR Wellness
```

### Rule 2: Subcategory Filter (OR Logic)
```
If user selects [Energy, Regeneration]:
  → Show ALL services tagged with Energy OR Regeneration
```

### Rule 3: Combined Filter (AND of ORs)
```
If user selects Categories [Performance] + Subcategories [Energy]:
  → Show services that match (Performance) AND (Energy)
  → Results: HBOT, NAD+ IV, Red Light, IHHT, etc.
```

### Rule 4: Search (Additive)
```
Search "massage" + Category [Wellness]:
  → Show wellness services containing "massage"
```

---

## 📋 Service Validation Rules

### Required Fields (All Services):
```json
{
  "id": "unique-id",
  "name": "Service Name",
  "description": "Detailed description",
  "categories": ["at-least-one"],  // ≥1 required
  "subcategories": ["at-least-one"] // ≥1 required
}
```

### Category Assignment Guidelines:

**Performance** - Assign if service:
- Enhances athletic capacity
- Improves recovery speed
- Boosts energy/stamina
- Optimizes physical function

**Wellness** - Assign if service:
- Reduces stress
- Supports mental health
- Promotes relaxation
- Balances body systems

**Aesthetics** - Assign if service:
- Improves appearance
- Anti-aging benefits
- Body contouring
- Skin/hair enhancement

**Diagnostics** - Assign if service:
- Tests/measures health markers
- Provides data/insights
- Tracks progress
- Screens for conditions

---

## 🎯 Subcategory Assignment Matrix

### When to Use Each Subcategory:

**Aesthetics** (`aesthetics-sub`)
- Facial treatments, skin care, body sculpting
- Examples: HydraFacial, lasers, peels, Emsculpt

**Energy** (`energy`)
- Cellular energy, mitochondrial function, vitality
- Examples: NAD+ IV, HBOT, Red Light, IHHT, NMN

**Information Medicine** (`information-medicine`)
- Data collection, biomarker tracking, assessments
- Examples: Blood panels, genetic tests, questionnaires

**Detoxification** (`detox`)
- Elimination of toxins, cleansing protocols
- Examples: Liver detox, body wraps, lymphatic massage, sauna

**Regeneration** (`regeneration`)
- Tissue repair, recovery, healing
- Examples: HBOT, PEMF, Red Light, Stem cells, massages

**Sleep** (`sleep`)
- Sleep quality, rest optimization
- Examples: Sleep protocols, hormone optimization for sleep

**Biorhythms** (`biorhythms`)
- Circadian rhythm, hormonal cycles, timing
- Examples: Hormone panels, NAD+ IV, sleep optimization

**Stress Management** (`stress`)
- Relaxation, nervous system regulation
- Examples: Massages, sauna, floatation, breathwork

**Physical Medicine** (`physical-medicine`)
- Manual therapy, physiotherapy, hands-on treatment
- Examples: Massages, physio, osteopathy, shockwave

**Diagnostics** (`diagnostics-sub`)
- Testing and screening
- Examples: Blood work, scans, genetic tests

**Movement** (`movement`)
- Exercise, training, mobility
- Examples: Personal training, Pilates, yoga, movement coaching

**Psyche & Cognition** (`psyche`)
- Mental health, cognitive function, emotional wellbeing
- Examples: Assessments, breathwork, yoga, mindfulness

---

## 🛠️ How to Modify the Logic

### Location of Data:
```
/content/site.json → "therapies" object
```

### To Add a New Service:
```json
{
  "id": "new-service-id",
  "name": "New Service Name",
  "description": "Detailed description for search",
  "categories": ["performance", "wellness"],  // At least 1
  "subcategories": ["energy", "regeneration"]  // At least 1
}
```

### To Add a New Category:
```json
{
  "id": "new-category",
  "name": "New Category",
  "color": "#hexcode"
}
```

### To Add a New Subcategory:
```json
{
  "id": "new-subcategory",
  "name": "New Subcategory",
  "parentCategories": ["wellness", "performance"]
}
```

### To Change Filter Logic:

**Location**: `/components/filtered-services.tsx`

**Current Logic** (OR - ANY):
```typescript
// Line 63-73
if (selectedCategories.length > 0 || selectedSubcategories.length > 0) {
  result = result.filter(therapy => {
    const matchesCategory = selectedCategories.length === 0 ||
      therapy.categories.some(cat => selectedCategories.includes(cat))
    
    const matchesSubcategory = selectedSubcategories.length === 0 ||
      therapy.subcategories.some(sub => selectedSubcategories.includes(sub))

    return matchesCategory || matchesSubcategory  // OR logic
  })
}
```

**To Change to AND Logic**:
```typescript
return matchesCategory && matchesSubcategory  // AND logic
```

---

## 📱 Mobile Search Button Implementation

### When Visible:
- At least 1 category OR subcategory selected
- Sticky at bottom of filter panel
- Closes filter panel and scrolls to results

### Design:
- Full width, primary color
- Shows result count
- Smooth transition

---

## 🔍 Search Behavior Matrix

| Scenario | Category | Subcategory | Search | Result |
|----------|----------|-------------|--------|--------|
| 1 | None | None | Empty | All 70+ services |
| 2 | Wellness | None | Empty | All wellness services |
| 3 | None | Energy | Empty | All energy services |
| 4 | Wellness | Energy | Empty | Services in Wellness OR Energy |
| 5 | Wellness | Energy | "NAD" | Wellness OR Energy services containing "NAD" |
| 6 | None | None | "massage" | All services containing "massage" |

---

## 📊 Current Service Distribution

### By Main Category:
- **Wellness**: 42 services
- **Diagnostics**: 23 services
- **Performance**: 23 services
- **Aesthetics**: 19 services

### By Subcategory:
- **Physical Medicine**: 13 services (Manual Therapy)
- **Detox**: 10 services
- **Aesthetics Sub**: 10 services
- **Psyche**: 8 services
- **Regeneration**: 7 services
- **Movement**: 7 services
- **Energy**: 5+ services
- **Stress**: 5+ services
- **Information Medicine**: 5+ services
- **Diagnostics Sub**: 5+ services
- **Biorhythms**: 3+ services
- **Sleep**: 2+ services

---

## 🎯 Recommended Category Assignments

### High-Energy Services → Add "Energy" Subcategory:
- NAD+ IV ✓
- NMN/NR Supplements ✓
- HBOT ✓
- IHHT ✓
- Red Light Therapy ✓
- Oxyven ✓

### Stress Management → Add "Stress" Subcategory:
- All massage types ✓
- Sauna sessions ✓
- Floatation ✓
- Breathwork ✓
- Yoga ✓
- Ice plunge/cold exposure

### Sleep/Biorhythm Services → Add Subcategories:
- Hormone panels → biorhythms ✓
- NAD+ IV → biorhythms ✓
- Abhyanga Shirodhara → sleep
- Floatation → sleep
- Circadian light therapy → biorhythms

### Information Medicine → Data-Driven Services:
- All blood panels ✓
- Genetic tests ✓
- Body scans ✓
- Questionnaires/Assessments ✓

---

## 🔧 Configuration Files

### Primary Data Source:
```
/content/site.json
  └─ "therapies" object
      ├─ categories[]
      ├─ subcategories[]
      └─ items[]
```

### Filter Component:
```
/components/filtered-services.tsx
  └─ Filter logic (line 49-79)
  └─ UI components
```

### Validation:
- All services MUST have categories.length ≥ 1
- All services MUST have subcategories.length ≥ 1
- Categories must exist in categories[]
- Subcategories must exist in subcategories[]

---

## 💡 Best Practices

### 1. Consistent Tagging
- Tag services with ALL applicable categories
- Don't limit to just one if multiple apply
- Example: "Red Light" → Performance + Wellness + Aesthetics

### 2. Subcategory Selection
- Choose most specific subcategory first
- Add broader subcategories if relevant
- Max 3 subcategories per service recommended

### 3. Search Optimization
- Include common terms in description
- Use both technical and layman terms
- Example: "HBOT" description includes "hyperbaric oxygen"

### 4. Category Naming
- Keep category names broad (4-6 total)
- Subcategories more specific (10-15 ideal)
- Use descriptive, searchable names

---

## 🚀 Future Enhancements

### Possible Additions:
1. **Pricing Tiers** - Free, Standard, Premium
2. **Duration Tags** - Quick (<30min), Standard, Extended
3. **Membership Tiers** - Which memberships include service
4. **Popular Tags** - Most-booked services
5. **New/Featured** - Recently added services
6. **Medical Supervision** - Requires doctor approval

---

**Version**: 1.0  
**Last Updated**: November 5, 2025  
**Status**: Production Ready

