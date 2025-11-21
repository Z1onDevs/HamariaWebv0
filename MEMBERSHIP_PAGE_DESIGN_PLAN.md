# Membership Page - Complete Design Plan

**Date:** November 21, 2025  
**Status:** 📋 **PLANNING - READY FOR IMPLEMENTATION**  
**Page**: `/membership`

---

## 🎯 Objectives

Create a beautiful, comprehensive membership page that:
- Showcases the complete Hamaria Members offering
- Details each category (Fitness, Wellness, Longevity) with specific therapies
- Presents add-on programs with compelling one-liners
- Works flawlessly across all devices
- Converts visitors into members

---

## 📐 Page Structure & Layout

### **Overall Flow**

```
┌─────────────────────────────────────────┐
│         1. HERO SECTION                 │
│    "Hamaria Members" + Tagline          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      2. FOUNDERS OFFER BANNER           │
│     "3 months free, first 42"           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         3. PRICING CARDS                │
│     Monthly €650 | Yearly €7,800        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    4. WHAT'S INCLUDED OVERVIEW          │
│   3 cards: Fitness | Wellness | Long.   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    5. FITNESS CATEGORY (Detailed)       │
│    All fitness therapies listed         │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    6. WELLNESS CATEGORY (Detailed)      │
│    All wellness therapies listed        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    7. LONGEVITY CATEGORY (Detailed)     │
│    All longevity therapies listed       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    8. ADD-ON PROGRAMS SECTION           │
│    5 programs with one-liners           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         9. FINAL CTA                    │
│    Apply Now | Schedule Tour            │
└─────────────────────────────────────────┘
```

---

## 🎨 Section-by-Section Design Specifications

### **SECTION 1: Hero Section**

#### **Desktop (1024px+)**
```
┌────────────────────────────────────────────────────┐
│  ← Back                                            │
│                                                    │
│              ✨ Everything You Need to Thrive      │
│                                                    │
│              HAMARIA MEMBERS                       │
│                                                    │
│  One membership. Complete access. Unlimited        │
│  fitness, full spa facilities, members lounge,     │
│  and comprehensive health monitoring.              │
│                                                    │
└────────────────────────────────────────────────────┘

Max-width: 1400px
Padding: 80px vertical, 48px horizontal
Typography:
  - Badge: 12px, purple background
  - H1: 64px, light weight
  - Description: 20px, muted
```

#### **Mobile (< 640px)**
```
┌──────────────────────┐
│ ← Back               │
│                      │
│  ✨ Everything You   │
│     Need to Thrive   │
│                      │
│  HAMARIA MEMBERS     │
│                      │
│  One membership...   │
│                      │
└──────────────────────┘

Padding: 40px vertical, 16px horizontal
Typography:
  - Badge: 11px
  - H1: 36px
  - Description: 16px
```

---

### **SECTION 2: Founders Offer**

```
┌────────────────────────────────────────┐
│  🎁 FOUNDERS: 3 MONTHS FREE            │
│     Limited to first 42 members        │
└────────────────────────────────────────┘

Design:
- Border: 2px solid primary/40
- Background: primary/10 with backdrop blur
- Padding: 24px
- Center aligned
- Max-width: 700px
- Margin: 0 auto
```

---

### **SECTION 3: Pricing Cards**

#### **Desktop Layout**
```
┌──────────────────┬──────────────────┐
│     MONTHLY      │     YEARLY       │
│                  │   [Save 10%]     │
│     €650         │    €7,800        │
│   per month      │   per year       │
│                  │                  │
│  • Full access   │  • Full access   │
│  • No commitment │  • Best value    │
└──────────────────┴──────────────────┘

Grid: 2 columns, gap-6
Max-width: 900px
Card styling:
  - Gradient border
  - Glass morphism background
  - Subtle shadow
  - Hover lift effect
```

#### **Mobile Layout**
```
┌────────────────────┐
│      MONTHLY       │
│      €650          │
│    per month       │
└────────────────────┘
         ↓
┌────────────────────┐
│      YEARLY        │
│  [SAVE 10%]        │
│      €7,800        │
│    per year        │
└────────────────────┘

Stack vertically
Full width - 16px padding
```

---

### **SECTION 4: Overview Cards**

```
┌──────────┬──────────┬──────────┐
│   💪     │   💎     │   🧬     │
│ FITNESS  │ WELLNESS │ LONGEVITY│
│          │          │          │
│ Unlimit  │ Full Spa │ Members  │
│ Training │  Access  │  Lounge  │
│          │          │          │
│ 8 thera- │ 9 thera- │ Devices  │
│  pies    │  pies    │ + Health │
└──────────┴──────────┴──────────┘

Mobile: Stack vertically
Tablet: 2 columns, then 3
Desktop: 3 columns

Card specs:
  - Height: 200px min
  - Padding: 32px
  - Icon: 48px
  - Hover: Scale 1.02, shadow increase
```

---

### **SECTION 5: FITNESS CATEGORY (DETAILED)**

```
┌─────────────────────────────────────────────────────┐
│                    💪 FITNESS                        │
│              Unlimited Training Access               │
│                                                      │
│  Train without limits. Our fitness program includes  │
│  small group classes, 1-on-1 training, and outdoor  │
│  experiences designed by expert coaches.             │
│                                                      │
│  ┌──────────────────┬──────────────────┬──────────┐ │
│  │ ✓ Small group    │ ✓ Personal       │ ✓ Pilates│ │
│  │   classes        │   training       │   reformer│ │
│  │ 30-60 min        │ 30 min           │ 60 min   │ │
│  │ Capacity: 8      │ Capacity: 4      │ Cap: 8   │ │
│  └──────────────────┴──────────────────┴──────────┘ │
│                                                      │
│  ┌──────────────────┬──────────────────┬──────────┐ │
│  │ ✓ Mobility       │ ✓ Outdoor        │ ✓ Breath-│ │
│  │   coaching       │   training       │   ing &  │ │
│  │ 60 min           │ 30 min (Retiro)  │   stretch│ │
│  └──────────────────┴──────────────────┴──────────┘ │
│                                                      │
│  ┌──────────────────┬──────────────────┬──────────┐ │
│  │ ✓ Mindfulness    │ ✓ EMS training   │ ✓ Hot    │ │
│  │   sessions       │                  │   yoga   │ │
│  │ 60 min           │ 30 min           │ 60 min   │ │
│  └──────────────────┴──────────────────┴──────────┘ │
│                                                      │
│  Total: 8 unlimited fitness therapies               │
└─────────────────────────────────────────────────────┘

Specs:
- Section padding: 60px vertical
- Max-width: 1200px
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Each therapy card: border, background, duration shown
```

---

### **SECTION 6: WELLNESS CATEGORY (DETAILED)**

```
┌─────────────────────────────────────────────────────┐
│                    💎 WELLNESS                       │
│              Complete Spa & Recovery Access          │
│                                                      │
│  Our spa facilities offer the perfect environment   │
│  for recovery, detoxification, and deep relaxation. │
│  All unlimited. All included.                        │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │         UNLIMITED SPA ACCESS                 │   │
│  │                                              │   │
│  │  ✓ Full body red light  (30 min, cap: 3)   │   │
│  │  ✓ Infrared sauna       (varies, cap: 4)   │   │
│  │  ✓ Dry sauna            (15 min, cap: 4)   │   │
│  │  ✓ Steam room           (10 min, cap: 3)   │   │
│  │  ✓ Ice plunge           (5 min, cap: 2)    │   │
│  │  ✓ Pressotherapy        (30 min, cap: 4)   │   │
│  │  ✓ UV light therapy     (30 min, cap: 1)   │   │
│  │  ✓ Hair red light       (20 min, cap: 6)   │   │
│  │  ✓ Vagus nerve stim     (20 min, cap: 1)   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │       INCLUDED SESSIONS (Annual)             │   │
│  │                                              │   │
│  │  • Private contrast suite  4 sessions        │   │
│  │  • Cryotherapy            12 sessions        │   │
│  │  • Float tank             12 sessions        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Total: 9 unlimited + 3 annual spa therapies        │
└─────────────────────────────────────────────────────┘

Design:
- Two-tone background (darker for unlimited, lighter for annual)
- List style for therapies (not grid)
- Show duration and capacity for operational transparency
```

---

### **SECTION 7: LONGEVITY CATEGORY (DETAILED)**

```
┌─────────────────────────────────────────────────────┐
│                    🧬 LONGEVITY                      │
│        Members Lounge & Comprehensive Health         │
│                                                      │
│  Access our private members lounge featuring         │
│  cutting-edge longevity devices. Plus ongoing        │
│  health monitoring to track your progress.           │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │      MEMBERS LOUNGE DEVICES (Unlimited)      │   │
│  │                                              │   │
│  │  Privacy & silence optional                  │   │
│  │                                              │   │
│  │  ✓ PEMF therapy          (30 min, cap: 4)  │   │
│  │  ✓ HBOT hyperbaric       (60 min, cap: 1)  │   │
│  │  ✓ IHHT altitude sim.    (60 min, cap: 2)  │   │
│  │  ✓ Compression therapy   (30 min, cap: 4)  │   │
│  │  ✓ Vagus nerve stim      (20 min, cap: 1)  │   │
│  │  ✓ H₂ molecular hydrogen (40 min, cap: 1)  │   │
│  │  ✓ Massage chair         (20 min)          │   │
│  │  ✓ Foot roller therapy   (15 min)          │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │         HEALTH MONITORING INCLUDED           │   │
│  │                                              │   │
│  │  📊 Monthly Checkups                         │   │
│  │     • Body Lab bioimpedance (unlimited)     │   │
│  │                                              │   │
│  │  📊 Annual Comprehensive Assessment          │   │
│  │     • Complete blood panel     (1/year)     │   │
│  │     • VO₂ max testing           (1/year)     │   │
│  │                                              │   │
│  │  🎁 Bonus                                    │   │
│  │     • 12 guest passes per year              │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Total: Unlimited lounge access + ongoing tracking  │
└─────────────────────────────────────────────────────┘

Note: PEMF, HBOT, IHHT appear in both Wellness and Longevity
- In practice, these are lounge devices with unlimited access
```

---

### **SECTION 8: ADD-ON PROGRAMS**

```
┌─────────────────────────────────────────────────────┐
│              SPECIALIZED PROGRAMS                    │
│       Curated annual programs for specific goals     │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  💅 ADVANCED AESTHETICS                      │   │
│  │  Regenerative beauty treatments and body     │   │
│  │  contouring for visible anti-aging results   │   │
│  │                                              │   │
│  │  ~150 annual sessions                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  🧠 STRESS MANAGEMENT & MENTAL PERFORMANCE   │   │
│  │  Master stress and optimize cognitive        │   │
│  │  performance through advanced therapies      │   │
│  │                                              │   │
│  │  ~144 annual sessions                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  ⚖️ DETOX & WEIGHT MANAGEMENT                 │   │
│  │  Metabolic optimization and sustainable      │   │
│  │  weight transformation protocols             │   │
│  │                                              │   │
│  │  ~189 annual sessions                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  💪 CHRONIC PAIN MANAGEMENT                  │   │
│  │  Break free from pain with intensive         │   │
│  │  therapeutic and rehabilitation protocols    │   │
│  │                                              │   │
│  │  ~257 annual sessions                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  🧬 ADVANCED LONGEVITY                       │   │
│  │  Maximize healthspan with cutting-edge       │   │
│  │  diagnostics and longevity optimization      │   │
│  │                                              │   │
│  │  ~237 annual sessions                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘

Grid: 1 column mobile, 2 columns desktop
Program cards: Gradient borders matching color schemes
```

---

## 📝 Detailed Content Specifications

### **FITNESS CATEGORY - Complete Breakdown**

#### **Section Header**
- Title: "💪 Fitness"
- Subtitle: "Unlimited Training Access"
- Description: "Train without limits. Our fitness program includes small group classes, 1-on-1 training, and outdoor experiences designed by expert coaches to help you reach peak performance."

#### **Therapies to List** (8 total):

1. **Small Group Classes**
   - Duration: 30-60 min
   - Capacity: 8 people
   - Types: Functional training, strength, conditioning

2. **Personal Training**
   - Duration: 30 min per session
   - Capacity: 4 simultaneous
   - One-on-one or partner sessions

3. **Pilates Reformer**
   - Duration: 60 min
   - Capacity: 8 reformers
   - Equipment-based Pilates

4. **Mobility Coaching**
   - Duration: 60 min
   - Capacity: 4-8 people
   - Joint health and flexibility

5. **Outdoor Training (Retiro Park)**
   - Duration: 30 min
   - Capacity: 4 people
   - Nature-based functional training

6. **Breathing & Stretching**
   - Duration: 60 min
   - Capacity: 8 people
   - Recovery and flexibility focused

7. **Mindfulness Sessions**
   - Duration: 60 min
   - Capacity: 8 people
   - Meditation and mental training

8. **EMS Training**
   - Duration: 30 min
   - Capacity: 4 units
   - Electrical muscle stimulation

9. **Hot Yoga**
   - Duration: 60 min
   - Heated yoga practice

---

### **WELLNESS CATEGORY - Complete Breakdown**

#### **Section Header**
- Title: "💎 Wellness"
- Subtitle: "Complete Spa & Recovery Access"
- Description: "Our spa facilities offer the perfect environment for recovery, detoxification, and deep relaxation. Experience world-class wellness amenities designed for your complete rejuvenation."

#### **Unlimited Spa Access** (9 therapies):

1. **Full Body Red Light Therapy**
   - Duration: 30 min
   - Capacity: 3 beds
   - Photobiomodulation for cellular health

2. **Infrared Sauna**
   - Duration: Variable
   - Capacity: 4 people
   - Deep tissue detoxification

3. **Dry Sauna (Finnish)**
   - Duration: 15 min sessions
   - Capacity: 4 people
   - Traditional high-heat sauna

4. **Steam Room**
   - Duration: 10 min sessions
   - Capacity: 3 people
   - Humid heat therapy

5. **Ice Plunge**
   - Duration: 5 min
   - Capacity: 2 people
   - Cold water immersion

6. **Pressotherapy**
   - Duration: 30 min
   - Capacity: 4 units
   - Lymphatic drainage compression

7. **UV Light Therapy**
   - Duration: 30 min
   - Capacity: 1 person
   - Controlled UV exposure

8. **Hair Red Light Therapy**
   - Duration: 20 min
   - Capacity: 6 units
   - Scalp and hair health

9. **Vagus Nerve Stimulation**
   - Duration: 20 min
   - Capacity: 1 unit
   - Parasympathetic activation

#### **Included Sessions** (Annual):

10. **Private Contrast Suite**
    - 4 sessions per year
    - 40 min per session
    - Private infrared sauna + cold plunge

11. **Cryotherapy**
    - 12 sessions per year (1/month)
    - 10 min per session
    - Whole body cryo chamber

12. **Float Tank (Flotarium)**
    - 12 sessions per year (1/month)
    - 60 min per session
    - Sensory deprivation therapy

---

### **LONGEVITY CATEGORY - Complete Breakdown**

#### **Section Header**
- Title: "🧬 Longevity"
- Subtitle: "Members Lounge & Comprehensive Health Monitoring"
- Description: "Access our private members lounge featuring cutting-edge longevity devices in a peaceful environment with optional privacy and silence. Plus ongoing health monitoring to track and optimize your wellness journey."

#### **Members Lounge Devices** (Note on PEMF, HBOT, etc.):

**Important Context**:
Some therapies like PEMF, HBOT, IHHT appear in the spreadsheet under programs but are mentioned as "lounge devices" in the membership description. For the base membership page, we should clarify:

**Option A**: List them as "Available in Members Lounge"
- PEMF therapy (30 min, cap: 4)
- HBOT (60 min, cap: 1)
- IHHT (60 min, cap: 2)
- Compression therapy (30 min, cap: 4) - already in Pressotherapy
- Vagus nerve stimulation (20 min, cap: 1) - already in Wellness
- H₂ protocol (40 min, cap: 1)
- Massage chair (20 min)
- Foot roller therapy (15 min)

**Option B**: Keep simple for base, detail in programs
- "Private lounge with longevity devices"
- "PEMF, HBOT, IHHT, H₂, and more"
- "Access available with select add-on programs"

**Recommendation**: Use Option B for base membership (simpler), detail in programs

#### **Longevity Section Content**:

**Lounge Access**:
- Private, quiet space
- Optional silence zones
- Relaxation areas
- Device bookings available

**Included Health Monitoring**:

1. **Monthly Checkups**
   - Body Lab bioimpedance (unlimited)
   - Physical assessments
   - Progress tracking

2. **Annual Comprehensive Assessment**
   - Complete blood panel (1/year)
   - VO₂ max cardiopulmonary test (1/year)
   - Personalized longevity recommendations

3. **Member Benefits**
   - 12 guest passes per year
   - Bring friends and family
   - Share the Hamaria experience

---

## 🎨 Visual Design System

### **Color Coding by Category**

```typescript
const categoryColors = {
  fitness: {
    primary: '#10b981',    // Green
    light: '#10b98120',    // Green 20% opacity
    border: '#10b98140',   // Green 40% opacity
  },
  wellness: {
    primary: '#8b5cf6',    // Purple
    light: '#8b5cf620',    // Purple 20% opacity
    border: '#8b5cf640',   // Purple 40% opacity
  },
  longevity: {
    primary: '#06b6d4',    // Cyan
    light: '#06b6d420',    // Cyan 20% opacity
    border: '#06b6d440',   // Cyan 40% opacity
  },
}
```

### **Typography Hierarchy**

```
Page Title (H1):        64px → 48px → 36px (desktop → tablet → mobile)
Section Titles (H2):    40px → 32px → 28px
Category Titles (H3):   32px → 24px → 20px
Therapy Names:          16px → 14px → 14px
Body Text:              18px → 16px → 14px
Small Text:             14px → 12px → 12px
```

### **Spacing System**

```
Section gaps:           96px → 64px → 48px (desktop → tablet → mobile)
Card padding:           32px → 24px → 20px
Grid gaps:              24px → 20px → 16px
Element margins:        24px → 16px → 12px
```

---

## 💎 Add-On Programs - One-Liners

### **Content for site.json**

```json
{
  "addOnPrograms": {
    "title": "Specialized Programs",
    "subtitle": "Curated annual programs designed for specific wellness goals",
    "description": "Enhance your membership with specialized programs. Each program includes 140+ sessions per year tailored to your specific health objectives.",
    
    "programs": {
      "aesthetics": {
        "name": "Advanced Aesthetics",
        "oneLiner": "Regenerative beauty treatments and body contouring for visible anti-aging results",
        "sessions": "~150 annual sessions"
      },
      "stress": {
        "name": "Stress Management & Mental Performance",
        "oneLiner": "Master stress and optimize cognitive performance through advanced therapies",
        "sessions": "~144 annual sessions"
      },
      "detox": {
        "name": "Detox & Weight Management",
        "oneLiner": "Metabolic optimization and sustainable weight transformation protocols",
        "sessions": "~189 annual sessions"
      },
      "pain": {
        "name": "Chronic Pain Management",
        "oneLiner": "Break free from pain with intensive therapeutic and rehabilitation protocols",
        "sessions": "~257 annual sessions"
      },
      "longevity": {
        "name": "Advanced Longevity",
        "oneLiner": "Maximize healthspan with cutting-edge diagnostics and longevity optimization",
        "sessions": "~237 annual sessions"
      }
    }
  }
}
```

### **Spanish Versions**

```json
{
  "addOnPrograms": {
    "title": "Programas especializados",
    "subtitle": "Programas anuales curados diseñados para objetivos de bienestar específicos",
    "description": "Mejora tu membresía con programas especializados. Cada programa incluye más de 140 sesiones anuales adaptadas a tus objetivos de salud específicos.",
    
    "programs": {
      "aesthetics": {
        "name": "Estética avanzada",
        "oneLiner": "Tratamientos de belleza regenerativa y contorneo corporal para resultados anti-edad visibles",
        "sessions": "~150 sesiones anuales"
      },
      "stress": {
        "name": "Gestión del estrés y rendimiento mental",
        "oneLiner": "Domina el estrés y optimiza el rendimiento cognitivo con terapias avanzadas",
        "sessions": "~144 sesiones anuales"
      },
      "detox": {
        "name": "Detox y control de peso",
        "oneLiner": "Optimización metabólica y protocolos de transformación de peso sostenible",
        "sessions": "~189 sesiones anuales"
      },
      "pain": {
        "name": "Manejo del dolor crónico",
        "oneLiner": "Libérate del dolor con protocolos terapéuticos y de rehabilitación intensivos",
        "sessions": "~257 sesiones anuales"
      },
      "longevity": {
        "name": "Longevidad avanzada",
        "oneLiner": "Maximiza tu vida saludable con diagnósticos de vanguardia y optimización de longevidad",
        "sessions": "~237 sesiones anuales"
      }
    }
  }
}
```

---

## 📱 Responsive Design Specifications

### **Mobile (< 640px)**

**Layout**:
- Single column for everything
- Cards stack vertically
- Full-width pricing cards
- Therapy lists in 1-2 columns max

**Padding & Spacing**:
```
Page padding:     px-4 (16px)
Section padding:  py-12 (48px)
Card padding:     p-5 (20px)
Grid gaps:        gap-4 (16px)
```

**Typography**:
```
H1: text-4xl (36px)
H2: text-2xl (24px)
H3: text-xl (20px)
Body: text-sm (14px)
```

---

### **Tablet (640px - 1024px)**

**Layout**:
- 2-column grids for pricing
- 2-column for category overview
- 2-3 column for therapy lists
- Programs in 2 columns

**Padding & Spacing**:
```
Page padding:     px-6 sm:px-8 (24-32px)
Section padding:  py-16 (64px)
Card padding:     p-6 (24px)
Grid gaps:        gap-5 (20px)
Max width:        max-w-4xl (896px)
```

**Typography**:
```
H1: text-5xl (48px)
H2: text-3xl (30px)
H3: text-2xl (24px)
Body: text-base (16px)
```

---

### **Desktop (1024px - 1440px)**

**Layout**:
- 2-column pricing (side by side)
- 3-column category overview
- 3-column therapy lists
- 2-column programs (better readability than 3)

**Padding & Spacing**:
```
Page padding:     px-8 lg:px-12 (32-48px)
Section padding:  py-20 lg:py-24 (80-96px)
Card padding:     p-8 (32px)
Grid gaps:        gap-6 lg:gap-8 (24-32px)
Max width:        max-w-6xl (1152px)
```

**Typography**:
```
H1: text-6xl lg:text-7xl (60-72px)
H2: text-4xl (36px)
H3: text-3xl (30px)
Body: text-lg (18px)
```

---

### **Large Desktop (> 1440px)**

**Layout**:
- Same structure as desktop
- More generous spacing
- Larger imagery
- Better breathing room

**Padding & Spacing**:
```
Page padding:     px-12 2xl:px-16 (48-64px)
Section padding:  py-24 2xl:py-28 (96-112px)
Max width:        max-w-7xl (1280px)
```

**Typography**: Same as desktop with slight increases

---

## 🎨 Component Design Details

### **Category Detail Card Design**

```typescript
// Example: Fitness Category Card
<div className="
  rounded-2xl                    // Large rounded corners
  border-2                       // Thicker border
  border-green-500/30            // Category color
  bg-card/20                     // Glass morphism
  backdrop-blur-md               // Blur background
  p-8                            // Generous padding
  hover:border-green-500/50      // Hover state
  hover:bg-card/30               // Hover background
  transition-all duration-300    // Smooth transition
">
  {/* Header */}
  <div className="mb-6 pb-6 border-b border-border/30">
    <div className="flex items-center gap-3 mb-3">
      <div className="text-5xl">💪</div>
      <h3 className="text-3xl font-light">Fitness</h3>
    </div>
    <p className="text-sm text-primary font-medium uppercase tracking-wide">
      Unlimited Training Access
    </p>
    <p className="text-foreground/70 mt-3 leading-relaxed">
      {description}
    </p>
  </div>
  
  {/* Therapies Grid */}
  <div className="grid md:grid-cols-2 gap-4">
    {therapies.map(therapy => (
      <div className="flex items-start gap-3 p-4 rounded-lg bg-background/40 border border-border/20">
        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-foreground">{therapy.name}</p>
          <p className="text-xs text-foreground/60 mt-1">
            {therapy.duration} min · Capacity: {therapy.capacity}
          </p>
        </div>
      </div>
    ))}
  </div>
  
  {/* Summary */}
  <div className="mt-6 pt-6 border-t border-border/30">
    <p className="text-sm text-foreground/60 text-center">
      Total: {count} unlimited fitness therapies
    </p>
  </div>
</div>
```

---

### **Add-On Program Card Design**

```typescript
<div className="
  rounded-xl
  border-2 border-border/30
  bg-card/10
  p-6
  hover:border-primary/40
  hover:bg-card/20
  transition-all duration-300
  group
  relative
  overflow-hidden
">
  {/* Gradient accent */}
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500" />
  
  {/* Icon/Emoji */}
  <div className="text-4xl mb-4">💅</div>
  
  {/* Program Name */}
  <h4 className="text-xl font-medium text-foreground mb-2">
    Advanced Aesthetics
  </h4>
  
  {/* One-liner */}
  <p className="text-sm text-foreground/70 leading-relaxed mb-4">
    Regenerative beauty treatments and body contouring for visible anti-aging results
  </p>
  
  {/* Session count */}
  <div className="flex items-center justify-between pt-4 border-t border-border/20">
    <p className="text-xs text-foreground/50">Annual sessions</p>
    <p className="text-sm font-mono font-medium text-primary">~150 sessions</p>
  </div>
  
  {/* Hover indicator */}
  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
    <ArrowRight className="h-4 w-4 text-primary" />
  </div>
</div>
```

---

## 🎭 Interactive Elements

### **Smooth Section Scroll**
```typescript
// Add anchors to each section
<div id="fitness-section" className="scroll-mt-20">
  {/* Fitness content */}
</div>

// Quick navigation (optional)
<nav className="sticky top-20 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 py-3">
  <div className="max-w-7xl mx-auto px-4 flex gap-6 justify-center">
    <button onClick={() => scrollTo('fitness-section')}>Fitness</button>
    <button onClick={() => scrollTo('wellness-section')}>Wellness</button>
    <button onClick={() => scrollTo('longevity-section')}>Longevity</button>
    <button onClick={() => scrollTo('programs-section')}>Programs</button>
  </div>
</nav>
```

### **Expandable Therapy Details**
```typescript
// Optional: Click to expand for more details
<button onClick={() => setExpanded(!expanded)}>
  <div className="flex justify-between">
    <span>Personal Training</span>
    <ChevronDown className={expanded ? "rotate-180" : ""} />
  </div>
</button>

{expanded && (
  <div className="mt-3 pl-8 text-sm text-foreground/70">
    <p>One-on-one training sessions tailored to your fitness goals...</p>
    <ul className="mt-2 space-y-1">
      <li>• Strength training</li>
      <li>• Functional fitness</li>
      <li>• Athletic performance</li>
    </ul>
  </div>
)}
```

---

## 🖼️ Visual Elements

### **Background Treatments**

1. **Shader Background** (existing)
   - Keep the animated shader
   - Lower opacity (40%) for readability

2. **Grain Overlay** (existing)
   - Subtle texture
   - Maintains brand consistency

3. **Section Dividers**
   - Subtle gradient lines between sections
   - Minimal, elegant separators

### **Photography Integration**

**Option A**: Full-width background images per category
```
┌────────────────────────────────────────┐
│  [Fitness photo as background]         │
│  💪 FITNESS                             │
│  Content overlays photo with           │
│  backdrop blur and gradient            │
└────────────────────────────────────────┘
```

**Option B**: Side-by-side content and image
```
┌──────────────────┬─────────────────────┐
│  💪 FITNESS      │  [Fitness photo]    │
│  Content here    │                     │
│  Therapies list  │                     │
└──────────────────┴─────────────────────┘
```

**Option C**: Image gallery below each category
```
┌─────────────────────────────────────────┐
│  💪 FITNESS                             │
│  Content and therapies                  │
│                                         │
│  [Small image gallery of fitness areas] │
└─────────────────────────────────────────┘
```

**Recommendation**: Option C - Keep content clear, add visual interest below

---

## 🎯 CTA Strategy

### **Multiple CTA Placements**

1. **Top** (After pricing)
   - "Apply Now" (primary)
   - Position: Sticky on scroll?

2. **Middle** (After categories, before programs)
   - "Ready to Join?" + Apply button
   - Reinforcement CTA

3. **Bottom** (After programs)
   - "Apply Now" + "Schedule a Tour"
   - Final conversion opportunity

### **CTA Button Specs**

**Primary Button** (Apply Now):
```
Size: Large (py-4 px-10)
Color: Primary gradient
Shadow: Large with primary tint
Text: Bold, 18px
Icon: Arrow right or sparkles
Hover: Lift + shadow increase
```

**Secondary Button** (Schedule Tour / See Programs):
```
Size: Large (py-4 px-10)
Color: Outlined with primary border
Background: Transparent → slight fill on hover
Text: Medium, 18px
Icon: Calendar or chevron
Hover: Border brightness + background
```

---

## 📊 Information Architecture

### **Page Sections in Order**

1. **Hero** (H1, tagline, description)
2. **Founders Offer** (banner)
3. **Pricing** (monthly/yearly cards)
4. **Overview** (3 category cards)
5. **Fitness Detailed** (full therapy list)
6. **Wellness Detailed** (unlimited + annual sessions)
7. **Longevity Detailed** (lounge + health monitoring)
8. **Programs** (5 add-on programs with one-liners)
9. **FAQ** (optional - common questions)
10. **Final CTA** (apply + tour buttons)

### **Estimated Page Length**

- **Mobile**: ~8-10 screen lengths (4000-5000px)
- **Desktop**: ~5-7 screen lengths (4000-5600px)

**Scroll Experience**: 
- Smooth, engaging journey
- Each section reveals progressively
- Not overwhelming, well-paced

---

## 🎨 Animation & Transitions

### **Scroll Animations**

```typescript
// Use existing useReveal hook
const { ref: fitnessRef, isVisible: fitnessVisible } = useReveal(0.2)
const { ref: wellnessRef, isVisible: wellnessVisible } = useReveal(0.2)
const { ref: longevityRef, isVisible: longevityVisible } = useReveal(0.2)

// Apply fade-in and slide-up
className={`
  transition-all duration-1000
  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
`}
```

### **Stagger Children Animations**

```typescript
// Therapy cards appear with stagger
{therapies.map((therapy, index) => (
  <div
    key={index}
    className="animate-in fade-in slide-in-from-bottom-4"
    style={{
      animationDelay: `${index * 50}ms`,
      animationFillMode: 'backwards'
    }}
  >
    {/* Therapy card */}
  </div>
))}
```

### **Hover Interactions**

```
Therapy cards:
- Scale: 1.0 → 1.02
- Shadow: sm → md
- Border opacity: 30% → 50%
- Transition: 300ms ease-out

Program cards:
- Background: card/10 → card/20
- Border: border/30 → primary/40
- Icon: Subtle rotation or bounce
- Transition: 300ms ease-out
```

---

## 🎯 Therapy Display Format

### **For Unlimited Therapies**

```
┌─────────────────────────────────────┐
│  ✓ Personal Training                │
│    30 minutes · Capacity: 4         │
│    One-on-one or partner sessions   │
│                                     │
│    [UNLIMITED] badge                │
└─────────────────────────────────────┘
```

### **For Limited Therapies**

```
┌─────────────────────────────────────┐
│  ✓ Cryotherapy                      │
│    10 minutes · Capacity: 1         │
│    Whole body cryo chamber          │
│                                     │
│    12 sessions/year (1/month)       │
└─────────────────────────────────────┘
```

### **Therapy Card Component Specs**

```typescript
<div className="
  group
  rounded-lg
  border border-border/30
  bg-card/15
  p-4
  hover:bg-card/25
  hover:border-border/50
  hover:scale-[1.02]
  transition-all duration-300
">
  {/* Icon or Check */}
  <div className="flex items-start gap-3">
    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
    
    <div className="flex-1">
      {/* Name */}
      <h5 className="font-medium text-foreground mb-1">
        {therapy.name}
      </h5>
      
      {/* Meta info */}
      <p className="text-xs text-foreground/50">
        {therapy.duration} min · Capacity: {therapy.capacity}
      </p>
      
      {/* Brief description */}
      <p className="text-sm text-foreground/70 mt-2">
        {therapy.briefDescription}
      </p>
      
      {/* Allocation badge */}
      <div className="mt-3">
        {therapy.allocation === 'Unlimited' ? (
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
            UNLIMITED
          </span>
        ) : (
          <span className="text-xs text-foreground/60">
            {therapy.allocation} sessions/year
          </span>
        )}
      </div>
    </div>
  </div>
</div>
```

---

## 📋 Content Outline (Complete)

### **FITNESS Section Content**

**Header**:
- Icon: 💪
- Title: "Fitness"
- Subtitle: "Unlimited Training Access"
- Description: "Train without limits. Our fitness program includes small group classes, 1-on-1 training, and outdoor experiences designed by expert coaches to help you reach peak performance."

**Therapies to Include**:
1. Small group classes (30-60 min, cap: 8) - UNLIMITED
2. Personal training (30 min, cap: 4) - UNLIMITED
3. Pilates reformer (60 min, cap: 8) - UNLIMITED
4. Mobility coaching (60 min, cap: 4) - UNLIMITED
5. Outdoor training in Retiro (30 min, cap: 4) - UNLIMITED
6. Breathing & stretching (60 min, cap: 8) - UNLIMITED
7. Mindfulness sessions (60 min, cap: 8) - UNLIMITED
8. EMS training (30 min, cap: 4) - UNLIMITED
9. Hot yoga (60 min) - UNLIMITED

**Total**: 9 unlimited fitness therapies

---

### **WELLNESS Section Content**

**Header**:
- Icon: 💎
- Title: "Wellness"
- Subtitle: "Complete Spa & Recovery Access"
- Description: "Our spa facilities offer the perfect environment for recovery, detoxification, and deep relaxation. Experience world-class wellness amenities designed for your complete rejuvenation."

**Unlimited Spa Access**:
1. Full body red light therapy (30 min, cap: 3)
2. Infrared sauna (varies, cap: 4)
3. Dry sauna (15 min, cap: 4)
4. Steam room (10 min, cap: 3)
5. Ice plunge (5 min, cap: 2)
6. Pressotherapy (30 min, cap: 4)
7. UV light therapy (30 min, cap: 1)
8. Hair red light therapy (20 min, cap: 6)
9. Vagus nerve stimulation (20 min, cap: 1)

**Included Annual Sessions**:
10. Private contrast suite (4 sessions, 40 min)
11. Cryotherapy (12 sessions, 10 min)
12. Float tank (12 sessions, 60 min)

**Total**: 9 unlimited + 3 annual therapies = 12 wellness services

---

### **LONGEVITY Section Content**

**Header**:
- Icon: 🧬
- Title: "Longevity"
- Subtitle: "Members Lounge & Comprehensive Health Monitoring"
- Description: "Access our private members lounge featuring cutting-edge longevity devices in a peaceful environment with optional privacy and silence. Plus ongoing health monitoring to track and optimize your wellness journey."

**Members Lounge**:
- Private quiet space
- Optional silence zones
- Longevity devices available (details in programs)
- Relaxation areas
- Device booking system

**Health Monitoring Included**:

**Monthly**:
1. Body Lab bioimpedance (unlimited, 5 min)
2. Physical checkups
3. Progress tracking

**Annual**:
4. Complete blood panel (1/year, 30 min)
5. VO₂ max cardiopulmonary test (1/year, 30 min)
6. Personalized longevity recommendations

**Member Perks**:
7. 12 guest passes per year
8. Bring friends and family to experience Hamaria

**Total**: Unlimited monthly tracking + comprehensive annual assessment

---

### **PROGRAMS Section Content**

**Header**:
- Title: "Specialized Programs"
- Subtitle: "Curated annual programs designed for specific wellness goals"
- Description: "Enhance your membership with specialized programs. Each program includes 140+ sessions per year tailored to your specific health objectives."

**5 Programs with One-Liners**:

1. **💅 Advanced Aesthetics**
   - One-liner: "Regenerative beauty treatments and body contouring for visible anti-aging results"
   - Sessions: ~150 annual sessions
   - Color: Pink (#ec4899)

2. **🧠 Stress Management & Mental Performance**
   - One-liner: "Master stress and optimize cognitive performance through advanced therapies"
   - Sessions: ~144 annual sessions
   - Color: Purple (#8b5cf6)

3. **⚖️ Detox & Weight Management**
   - One-liner: "Metabolic optimization and sustainable weight transformation protocols"
   - Sessions: ~189 annual sessions
   - Color: Green (#10b981)

4. **💪 Chronic Pain Management**
   - One-liner: "Break free from pain with intensive therapeutic and rehabilitation protocols"
   - Sessions: ~257 annual sessions
   - Color: Orange (#f59e0b)

5. **🧬 Advanced Longevity**
   - One-liner: "Maximize healthspan with cutting-edge diagnostics and longevity optimization"
   - Sessions: ~237 annual sessions
   - Color: Cyan (#06b6d4)

---

## 🎨 Design Inspiration & Mood

### **Visual Style**
- **Luxury spa meets tech wellness**
- Clean, minimal, spacious
- Glass morphism and blur effects
- Subtle gradients and shadows
- Professional photography integration
- Premium feel without being cold

### **Color Palette**
```
Primary:     #8b5cf6 (purple)
Fitness:     #10b981 (green)
Wellness:    #8b5cf6 (purple)
Longevity:   #06b6d4 (cyan)
Aesthetics:  #ec4899 (pink)
Pain:        #f59e0b (orange)

Backgrounds: Dark mode friendly
Text:        High contrast for readability
Accents:     Subtle, not overwhelming
```

### **Photography Style**
- Use existing render images
- Show actual facilities
- Professional, architectural
- Warm, inviting lighting
- Human element where appropriate

---

## 📱 Mobile-First Considerations

### **Touch Targets**
- Minimum 44x44px for all interactive elements
- Adequate spacing between buttons (16px minimum)
- Large, easy-to-tap CTAs

### **Content Prioritization**
- Most important info above the fold
- Pricing visible without scrolling
- Category overview within first 2 screens
- Programs further down (for interested users)

### **Performance**
- Lazy load images below fold
- Optimize for 3G networks
- Fast initial render
- Smooth scroll performance

---

## 🎯 Conversion Optimization

### **Trust Signals**

```
┌────────────────────────────────────┐
│  ✓ No long-term commitment         │
│  ✓ Cancel anytime (30-day notice)  │
│  ✓ First 42 members get 3 mo free  │
│  ✓ Schedule a free facility tour   │
└────────────────────────────────────┘
```

### **Social Proof** (optional for Phase 2)
```
"Join 38 members already experiencing
 the Hamaria difference"

[Member testimonial carousel]
```

### **Urgency**
```
🔥 Only 4 founder spots remaining
⏰ Offer ends when we hit 42 members
```

---

## 🔧 Technical Implementation Notes

### **Component Structure**

```
/app/membership/page.tsx (already created - needs update)
  ├─ HeroSection
  ├─ FoundersOfferBanner  
  ├─ PricingCards
  ├─ CategoryOverviewCards
  ├─ FitnessDetailSection
  │   └─ TherapyCard × 9
  ├─ WellnessDetailSection
  │   ├─ UnlimitedTherapies × 9
  │   └─ AnnualSessions × 3
  ├─ LongevityDetailSection
  │   ├─ LoungeInfo
  │   └─ HealthMonitoring
  ├─ AddOnProgramsSection
  │   └─ ProgramCard × 5
  └─ FinalCTASection
```

### **Data Sources**

```typescript
// Import from membership-data.ts
import { 
  baseMembershipTherapies,
  getUnlimitedTherapies,
  getLimitedTherapies,
  addOnPrograms 
} from '@/lib/membership-data'

// Import from site.json translations
const { t, language } = useTranslation()
const membership = t.memberships.membership
const categories = t.memberships.categories
const programs = t.memberships.addOnPrograms
```

### **SEO Optimization**

```typescript
// Metadata
export const metadata = {
  title: 'Hamaria Members - Complete Wellness Membership | Madrid',
  description: 'One membership. Complete access. €650/month for unlimited fitness, spa, longevity devices, and health monitoring. Join Hamaria Club Madrid.',
  openGraph: {
    title: 'Hamaria Members - All-Inclusive Wellness',
    description: 'Unlimited fitness, spa, and longevity optimization.',
    images: ['/retiro render copia/pool.jpg'],
  }
}

// Structured data
<StructuredData 
  type="membership" 
  data={{
    name: 'Hamaria Members',
    price: '650',
    priceCurrency: 'EUR',
    description: 'Complete wellness membership'
  }} 
/>
```

---

## 📏 Responsive Grid Specifications

### **Category Overview Cards**
```
Mobile:   1 column  (grid-cols-1)
Tablet:   2 columns (md:grid-cols-2)
Desktop:  3 columns (lg:grid-cols-3)
Gap:      24px
```

### **Therapy Lists**
```
Mobile:   2 columns  (grid-cols-2) for compact unlimited list
          1 column   (grid-cols-1) for detailed annual sessions
Tablet:   2 columns  (md:grid-cols-2)
Desktop:  3 columns  (lg:grid-cols-3)
Gap:      16px
```

### **Add-On Programs**
```
Mobile:   1 column  (grid-cols-1)
Tablet:   2 columns (md:grid-cols-2)
Desktop:  2 columns (lg:grid-cols-2) - better readability than 3
          OR 3 cols for first 3, 2 cols for last 2
Gap:      24px
```

---

## 🎨 Color-Coded Category Sections

### **Fitness Section**
```
Border top: 3px solid #10b981
Background: linear-gradient(to-br, #10b98105, transparent)
Icon color: #10b981
Badges: bg-green-500/20, text-green-500
```

### **Wellness Section**
```
Border top: 3px solid #8b5cf6
Background: linear-gradient(to-br, #8b5cf605, transparent)
Icon color: #8b5cf6
Badges: bg-purple-500/20, text-purple-500
```

### **Longevity Section**
```
Border top: 3px solid #06b6d4
Background: linear-gradient(to-br, #06b6d405, transparent)
Icon color: #06b6d4
Badges: bg-cyan-500/20, text-cyan-500
```

---

## 📱 Mobile Optimizations

### **Collapsible Sections** (Optional)
```typescript
// For very long therapy lists on mobile
<details className="rounded-lg border border-border/30 bg-card/10 p-4">
  <summary className="font-medium cursor-pointer">
    View all 9 unlimited therapies
  </summary>
  <div className="mt-4 space-y-3">
    {/* Therapy list */}
  </div>
</details>
```

### **Sticky Pricing** (Optional)
```typescript
// Small pricing bar that sticks to top on scroll
<div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 py-2 px-4 md:hidden">
  <div className="flex justify-between items-center">
    <span className="text-sm">€650/month</span>
    <button className="btn-sm">Apply</button>
  </div>
</div>
```

---

## ✅ Implementation Checklist

### **Phase 1: Content & Structure** (1-2 hours)
- [ ] Add category content to site.json (fitness, wellness, longevity details)
- [ ] Add program one-liners to site.json
- [ ] Create therapy brief descriptions
- [ ] Organize data structure

### **Phase 2: Component Development** (3-4 hours)
- [ ] Update /app/membership/page.tsx with new structure
- [ ] Create category detail components
- [ ] Build therapy card component
- [ ] Implement program cards with one-liners
- [ ] Add responsive width controls

### **Phase 3: Styling & Polish** (2-3 hours)
- [ ] Apply color coding to sections
- [ ] Implement hover effects
- [ ] Add scroll animations
- [ ] Fine-tune spacing
- [ ] Typography optimization

### **Phase 4: Responsive Testing** (1-2 hours)
- [ ] Test on mobile (375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1440px, 1920px)
- [ ] Fix any layout issues
- [ ] Verify scroll behavior

### **Phase 5: Content & Copy** (1 hour)
- [ ] Polish all descriptions
- [ ] Ensure bilingual accuracy
- [ ] Add any missing details
- [ ] SEO optimization

**Total Estimated Time**: 8-12 hours

---

## 🎯 Success Criteria

### **Visual Quality**
- ✅ Professional, luxury appearance
- ✅ Consistent branding throughout
- ✅ Beautiful on all screen sizes
- ✅ Smooth animations and transitions

### **Information Architecture**
- ✅ Clear hierarchy of information
- ✅ Easy to scan and understand
- ✅ All therapies and programs explained
- ✅ No confusion about what's included

### **Functionality**
- ✅ All CTAs work correctly
- ✅ Smooth scrolling
- ✅ Fast page load
- ✅ No layout shift
- ✅ Mobile-friendly interactions

### **Conversion**
- ✅ Compelling value proposition
- ✅ Multiple conversion points
- ✅ Addresses potential objections
- ✅ Clear next steps

---

## 🎨 Visual Mockup (Text-Based)

### **Desktop View (~1440px)**

```
═══════════════════════════════════════════════════════════
                         ← Back

              ✨ Everything You Need to Thrive

                   HAMARIA MEMBERS

        One membership. Complete access. Unlimited
      fitness, spa, longevity devices, and health monitoring.

───────────────────────────────────────────────────────────

            🎁 FOUNDERS: 3 MONTHS FREE
            Limited to first 42 members

───────────────────────────────────────────────────────────

    ┌─────────────────┐        ┌─────────────────┐
    │    MONTHLY      │        │  YEARLY [Save]  │
    │                 │        │                 │
    │     €650        │        │    €7,800       │
    │   per month     │        │   per year      │
    └─────────────────┘        └─────────────────┘

═══════════════════════════════════════════════════════════
                     WHAT'S INCLUDED
═══════════════════════════════════════════════════════════

  ┌────────────┬────────────┬────────────┐
  │     💪     │     💎     │     🧬     │
  │  FITNESS   │  WELLNESS  │ LONGEVITY  │
  │            │            │            │
  │ Unlimited  │  Full Spa  │  Members   │
  │  Training  │   Access   │   Lounge   │
  │            │            │            │
  │ 9 therapies│12 services │  Health    │
  │            │            │  Tracking  │
  └────────────┴────────────┴────────────┘

═══════════════════════════════════════════════════════════
                    💪 FITNESS
              Unlimited Training Access

  Train without limits. Our fitness program includes...

  ┌─────────────┬─────────────┬─────────────┐
  │✓ Small group│✓ Personal   │✓ Pilates    │
  │  classes    │  training   │  reformer   │
  │ 60 min      │ 30 min      │ 60 min      │
  │ UNLIMITED   │ UNLIMITED   │ UNLIMITED   │
  └─────────────┴─────────────┴─────────────┘
  
  [Continue with all 9 therapies...]

  Total: 9 unlimited fitness therapies

═══════════════════════════════════════════════════════════
                    💎 WELLNESS
           Complete Spa & Recovery Access

  Our spa facilities offer the perfect environment...

  UNLIMITED SPA ACCESS (9 therapies)
  ┌──────────────────────────────────────────┐
  │  ✓ Full body red light  30 min · Cap: 3 │
  │  ✓ Infrared sauna       Varies · Cap: 4 │
  │  ✓ Dry sauna            15 min · Cap: 4 │
  │  [... 6 more ...]                        │
  └──────────────────────────────────────────┘

  INCLUDED SESSIONS (Annual)
  ┌──────────────────────────────────────────┐
  │  • Private contrast suite   4 sessions   │
  │  • Cryotherapy             12 sessions   │
  │  • Float tank              12 sessions   │
  └──────────────────────────────────────────┘

═══════════════════════════════════════════════════════════
                    🧬 LONGEVITY
        Members Lounge & Health Monitoring

  Access our private members lounge...

  MEMBERS LOUNGE
  • Private quiet space with longevity devices
  • Optional silence zones
  • Available with select programs

  HEALTH MONITORING
  Monthly:   Body composition, physical checkups
  Annual:    Blood panel, VO₂ max, recommendations
  Bonus:     12 guest passes

═══════════════════════════════════════════════════════════
                SPECIALIZED PROGRAMS
         Curated for specific wellness goals

  ┌─────────────────────────┬─────────────────────────┐
  │  💅 ADVANCED AESTHETICS │  🧠 STRESS MANAGEMENT   │
  │                         │                         │
  │  Regenerative beauty    │  Master stress and      │
  │  treatments and body    │  optimize cognitive     │
  │  contouring for visible │  performance through    │
  │  anti-aging results     │  advanced therapies     │
  │                         │                         │
  │  ~150 sessions/year     │  ~144 sessions/year     │
  └─────────────────────────┴─────────────────────────┘

  [... 3 more programs ...]

═══════════════════════════════════════════════════════════

              [APPLY NOW]  [SCHEDULE TOUR]

═══════════════════════════════════════════════════════════
```

---

## 🚀 Next Steps

1. **Review this plan** - Confirm approach and content
2. **Approve design direction** - Visual style and layout
3. **Implement Phase 1** - Content updates to site.json
4. **Implement Phase 2** - Component development
5. **Test & refine** - Across all devices
6. **Deploy** - Push to production

**Ready to implement when you approve!**

---

**Document Version**: 1.0  
**Last Updated**: November 21, 2025  
**Status**: 📋 **AWAITING APPROVAL TO IMPLEMENT**

