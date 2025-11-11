# Services Animation Visual Mockups

This document provides ASCII and textual representations of the proposed animation enhancements to help visualize the final implementation.

---

## Current vs. Enhanced Comparison

### CURRENT STATE

```
┌────────────────────────────────────────────────────────┐
│  ● Featured: Hyperbaric Oxygen Therapy • Whole Body   │
│              Cryotherapy • Full Body Red Light Th▌     │
└────────────────────────────────────────────────────────┘
```
- Single line display
- Basic blinking cursor (▌)
- Uniform text color
- Static container
- Character-by-character typing

### ENHANCED STATE

```
╔══════════════════════════════════════════════════════════╗
║  ✦ Featured Therapies                    [Category Tag] ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║                                                          ║
║    Hyperbaric Oxygen Therapy  •  Whole Body Cryotherapy ║
║         •  Full Body Red Light Therapy                  ║
║                                                      ▮   ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
╚══════════════════════════════════════════════════════════╝
   └─ Ambient glow pulsing with typing rhythm ─┘
```
- Multi-line capable
- Breathing cursor (▮)
- Gradient text effects
- Animated container with glow
- Word-level animations with emphasis

---

## Animation Sequence Storyboards

### Wave Typing Animation (Wellness Category)

**Frame 1 (0.0s)** - Initial State
```
╔══════════════════════════════════════════════════════════╗
║  ● Featured Wellness                                     ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║    ▮                                                     ║
║                                                          ║
║  ─────────────────────────────────────────────────────── ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 2 (0.3s)** - First word appears with wave
```
╔══════════════════════════════════════════════════════════╗
║  ● Featured Wellness                                     ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║    Signature▮                                           ║
║       ↑ ↑ ↑ (subtle wave motion)                        ║
║  ─────────────────────────────────────────────────────── ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 3 (0.8s)** - Second word forming
```
╔══════════════════════════════════════════════════════════╗
║  ● Featured Wellness                                     ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║    Signature  Massages▮                                 ║
║                  ↑ ↑ ↑                                   ║
║  ─────────────────────────────────────────────────────── ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 4 (1.2s)** - Bullet appears
```
╔══════════════════════════════════════════════════════════╗
║  ● Featured Wellness                                     ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║    Signature Massages  •  ▮                             ║
║                        ↺ (spinning bullet)               ║
║  ─────────────────────────────────────────────────────── ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 5 (1.8s)** - Third therapy
```
╔══════════════════════════════════════════════════════════╗
║  ● Featured Wellness                                     ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║    Signature Massages  •  Infrared Sauna  •  ▮         ║
║                           ↑ ↑ ↑ ↑ ↑ ↑                   ║
║  ─────────────────────────────────────────────────────── ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 6 (2.8s)** - Complete line
```
╔══════════════════════════════════════════════════════════╗
║  ● Featured Wellness                                     ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║    Signature Massages • Infrared Sauna • Mineral Baths ▮║
║                                                          ║
║  ─────────────────────────────────────────────────────── ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 7 (5.3s)** - Hold for reading
```
╔══════════════════════════════════════════════════════════╗
║  ● Featured Wellness                                     ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║    Signature Massages • Infrared Sauna • Mineral Baths  ║
║                                                (blinking)║
║  ─────────────────────────────────────────────────────── ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 8 (6.1s)** - Fade out transition
```
╔══════════════════════════════════════════════════════════╗
║  ● Featured Wellness                                     ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║    Signature Massages • Infrared Sauna • Mineral Baths  ║
║    (50% opacity, fading...)                             ║
║  ─────────────────────────────────────────────────────── ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 9 (6.5s)** - New cycle begins
```
╔══════════════════════════════════════════════════════════╗
║  ● Featured Wellness                                     ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║    Ice P▮                                               ║
║       ↑ ↑                                                ║
║  ─────────────────────────────────────────────────────── ║
╚══════════════════════════════════════════════════════════╝
```

---

## Pulse Reveal Animation (Diagnostics Category)

**Frame 1** - Empty state
```
╔══════════════════════════════════════════════════════════╗
║  ⬢ Featured Diagnostics                  [Diagnostics]  ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║                                                          ║
║    ▮                                                     ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 2** - Word pulses in (scale animation)
```
╔══════════════════════════════════════════════════════════╗
║  ⬢ Featured Diagnostics                  [Diagnostics]  ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║                                                          ║
║    ⟨ Epigenetic ⟩▮                                      ║
║      ^ scale up ^                                        ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 3** - Settles to normal
```
╔══════════════════════════════════════════════════════════╗
║  ⬢ Featured Diagnostics                  [Diagnostics]  ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║                                                          ║
║    Epigenetic Age▮                                      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

**Frame 4** - Complete
```
╔══════════════════════════════════════════════════════════╗
║  ⬢ Featured Diagnostics                  [Diagnostics]  ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║                                                          ║
║    Epigenetic Age • Hormone Panel • VO₂ Max Testing ▮  ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

---

## Gradient Sweep Animation (Aesthetics Category)

This animation features a color gradient that sweeps across the text as it appears.

**Visual Effect Description:**
```
Initial:  [░░░░░░░░░░░░░░]  (invisible)
                    ↓
Sweeping: [███▓▓▒▒░░░░░░░░]  (gradient reveals text)
                    ↓
Complete: [██████████████]  (full color)

Color Gradient:
Dark → Medium → Light → Medium → Dark
(Creates shimmer effect)
```

**Example Sequence:**
```
Frame 1:  [▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒]
          H░y░d░r░a░F░a░c░i░a░l░®

Frame 2:  [███▓▓▒▒░░░░░░░░]
          Hyd▓ra▒Fa░ci░al░®

Frame 3:  [██████▓▓▒▒░░░░]
          HydraF▓ac▒ia░l®░

Frame 4:  [████████████████]
          HydraFacial®▮
```

---

## Tech Glitch Animation (Performance Category)

Brief digital scramble effect before text settles.

**Frame Sequence:**
```
Frame 1:  ▮

Frame 2:  H▮

Frame 3:  Hy%▮           ← glitch character
          
Frame 4:  Hyp#r▮         ← glitch characters

Frame 5:  Hype$ba▮       ← glitch characters

Frame 6:  Hyperbar▮      ← glitches resolving

Frame 7:  Hyperbaric Oxygen Therapy▮  ← clean text
```

**Visual Effect:**
- Random characters briefly appear (%, #, $, @, &)
- Characters flicker/shift position
- Final text snaps into place
- Digital, high-tech aesthetic
- Very brief (100-200ms of glitch per word)

---

## Enhanced Cursor Designs

### 1. Breathing Cursor (Default)
```
Frame 1:  Text here▊        (scale 1.0, opacity 1.0)
Frame 2:  Text here▋        (scale 0.95, opacity 0.9)
Frame 3:  Text here▌        (scale 0.9, opacity 0.8)
Frame 4:  Text here▋        (scale 0.95, opacity 0.9)
Frame 5:  Text here▊        (scale 1.0, opacity 1.0)

Animation: Smooth scale + opacity pulse (1.5s loop)
```

### 2. Gradient Cursor (Aesthetics)
```
▮  ← Solid base color
▯  ← 75% opacity
▮  ← With gradient (top to bottom)
▯  ← With glow effect

Animation: Color shifts through gradient palette
```

### 3. Glow Cursor (Premium)
```
     ▮      ← No glow
   ░▮░      ← Slight glow
  ░░▮░░     ← Medium glow
 ░░░▮░░░    ← Strong glow
  ░░▮░░     ← Medium glow
   ░▮░      ← Slight glow
     ▮      ← No glow

Animation: Pulsing glow halo (2s loop)
```

### 4. Morphing Cursor (Tech)
```
Frame 1:  |  (thin line)
Frame 2:  ▏ (slightly thicker)
Frame 3:  ▎ (medium)
Frame 4:  ▍ (thicker)
Frame 5:  ▌ (half block)
Frame 6:  ▋ (more)
Frame 7:  ▊ (almost full)
Frame 8:  █ (full block)

Then reverses back to thin line
Animation: Continuous morphing (1.2s loop)
```

---

## Container Design Variations

### Option 1: Minimalist Elegance
```
┌──────────────────────────────────────────────────────────┐
│  ● Featured Therapies                                    │
│  ──────────────────────────────────────────────────────  │
│                                                          │
│      Hyperbaric Oxygen • Cryotherapy • Red Light ▮      │
│                                                          │
└──────────────────────────────────────────────────────────┘

Features:
- Clean lines
- Subtle border
- Single line divider
- Generous padding
- Monochrome accents
```

### Option 2: Luxury Glass Morphism
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  ✦ Featured Therapies                    [Performance]  ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║                                                          ║
║      Hyperbaric Oxygen • Cryotherapy • Red Light ▮      ║
║                                                          ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
╚══════════════════════════════════════════════════════════╝
  └──── Frosted glass effect with backdrop blur ────┘
  └──────── Subtle gradient background ──────────────┘
  └────────── Ambient glow (category color) ─────────┘

Features:
- Double-line border
- Frosted glass background
- Category color accent
- Ambient glow effect
- Premium spacing
```

### Option 3: Tech-Forward Terminal
```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓                                                          ▓
▓  [>] FEATURED_THERAPIES                    [PERF_001]  ▓
▓  ─────────────────────────────────────────────────────  ▓
▓                                                          ▓
▓  [>] Hyperbaric_Oxygen ● Cryotherapy ● Red_Light ▮     ▓
▓                                                          ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

Features:
- Terminal/command-line aesthetic
- Monospace font
- Pixelated borders
- Tech ID codes
- Matrix-style green on black
```

### Option 4: Organic Flow
```
    ╭──────────────────────────────────────────────────╮
   ╱                                                    ╲
  │   ∿ Featured Wellness                               │
  │   ∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼   │
  │                                                      │
  │     Signature Massages ∼ Infrared Sauna ∼ Baths ▮   │
  │                                                      │
   ╲                                                    ╱
    ╰──────────────────────────────────────────────────╯

Features:
- Rounded, organic corners
- Wave-like dividers
- Soft, flowing aesthetic
- Warm, natural feel
- Perfect for wellness category
```

---

## Color Treatment Examples

### Gradient Text Effects

**Linear Gradient (Left to Right)**
```
Hyperbaric Oxygen Therapy
█▓▒░         ░▒▓█         (color flows)
└─ dark → light → dark ─┘
```

**Shimmer Gradient (Animated)**
```
Frame 1: Hyperbaric Oxygen Therapy
         ██░░░░░░░░░░░░░░░░

Frame 2: Hyperbaric Oxygen Therapy
         ░░██░░░░░░░░░░░░░░

Frame 3: Hyperbaric Oxygen Therapy
         ░░░░██░░░░░░░░░░░░

Frame 4: Hyperbaric Oxygen Therapy
         ░░░░░░██░░░░░░░░░░

(Highlight sweeps across text)
```

**Word-Based Color Emphasis**
```
Normal:    Hyperbaric Oxygen Therapy • Cryotherapy
           (all same color)

Emphasis:  HYPERBARIC Oxygen Therapy • CRYOTHERAPY
           └─ bold ─┘               └─ bold ──┘
           └─ bright ─┘             └─ bright ──┘

Smart:     Hyperbaric OXYGEN Therapy • Cryo THERAPY
                     └ key word ┘         └ key word ┘
```

---

## Interaction States

### Default State (No Hover)
```
╔══════════════════════════════════════════════════════════╗
║  ● All Featured Therapies                [View All]     ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║    HBOT • HydraFacial • Infrared Sauna • Ice Plunge ▮  ║
║                                                          ║
║  (Cycling through all featured from all categories)     ║
╚══════════════════════════════════════════════════════════╝
```

### Hover State (Tag Hovered)
```
╔══════════════════════════════════════════════════════════╗
║  ✦ Performance Therapies              [Performance]     ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║                                                          ║
║    HBOT • Cryotherapy • Red Light Therapy ▮            ║
║                                                          ║
║  (Animation speeds up, shows only Performance)          ║
╚══════════════════════════════════════════════════════════╝
  └──────── Container pulses with category color ────────┘
```

### Active State (Tag Clicked, Modal Open)
```
╔══════════════════════════════════════════════════════════╗
║  ⚡ Performance — Active                [Performance]    ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║                                                          ║
║    HBOT • Cryotherapy • Red Light Therapy               ║
║                                          (paused)        ║
║  (Animation paused while modal is open)                 ║
╚══════════════════════════════════════════════════════════╝
  └─────────── Strong glow, frozen animation ─────────────┘
```

---

## Responsive Layouts

### Desktop (>1024px)
```
╔══════════════════════════════════════════════════════════╗
║  ✦ Featured Therapies                                   ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║                                                          ║
║    Hyperbaric Oxygen Therapy • Whole Body Cryotherapy   ║
║        • Full Body Red Light Therapy ▮                  ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

- Full container width
- Multi-line text allowed
- All animation effects enabled
- Detailed cursor animation
```

### Tablet (768px - 1024px)
```
╔════════════════════════════════════════════════╗
║  ✦ Featured Therapies                         ║
║  ─────────────────────────────────────────────║
║                                               ║
║  HBOT • Cryotherapy • Red Light ▮            ║
║                                               ║
╚════════════════════════════════════════════════╝

- Narrower container
- Abbreviated therapy names
- Simplified animations
- Standard cursor
```

### Mobile (<768px)
```
╔══════════════════════════════╗
║  ● Featured                  ║
║  ─────────────────────────── ║
║  HBOT • Cryotherapy ▮       ║
╚══════════════════════════════╝

- Compact container
- Short therapy names
- 2 therapies at a time
- Basic typing only
- No decorative effects
```

---

## Animation Timing Diagrams

### Current Timing (Per Therapy Batch)
```
Type ──────────▶ Display ──────▶ Erase ─────▶ Next
|     2-3s      |    2.5s    |    0.5s   |
|               |            |           |
0s             3s          5.5s        6s

Total cycle: ~6 seconds
```

### Enhanced Timing (Recommended)
```
Fade In ─▶ Type (wave) ─▶ Display ─▶ Fade Out ─▶ Next
|   0.3s  |    2s      |    3s    |    0.5s   |
|         |            |          |           |
0s       0.3s        2.3s       5.3s        5.8s

Total cycle: ~5.8 seconds
Smoother transitions with fade
Variable display time based on text length
```

### Multi-Style Timing (Advanced)
```
Style A (Wave):
├─ Fade: 0.3s
├─ Type: 2.0s
├─ Display: 3.0s
└─ Fade: 0.5s
Total: 5.8s

Style B (Pulse):
├─ Pulse In: 0.5s
├─ Type: 1.5s
├─ Display: 3.0s
└─ Fade: 0.5s
Total: 5.5s

Style C (Glitch):
├─ Glitch: 0.2s per word
├─ Type: 1.8s
├─ Display: 3.0s
└─ Scramble out: 0.4s
Total: 5.4s
```

---

## Typography Hierarchy

### Information Architecture
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  [1] Label            [2] Context Tag                   ║
║  ─────────────────────────────────────────────────────── ║
║                                                          ║
║     [3] Therapy Names with [4] Separators  [5]          ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

[1] Label ("Featured" / "● Featured Therapies")
    - Font: Sans-serif
    - Size: 12px - 14px
    - Weight: Medium (500)
    - Color: Category color at 60% opacity

[2] Context Tag ("[Performance]")
    - Font: Monospace
    - Size: 10px - 12px
    - Weight: Regular (400)
    - Color: Category color
    - Background: Category color at 10%

[3] Therapy Names
    - Font: Sans-serif
    - Size: 14px - 18px
    - Weight: Light (300) to Regular (400)
    - Color: Category color
    - Letter spacing: 0.025em

[4] Separators ("•" or "·")
    - Size: 12px - 16px
    - Weight: Regular
    - Color: Category color at 40%
    - Margins: 0.5em left/right

[5] Cursor (▮)
    - Width: 2px
    - Height: 100% of text height
    - Color: Category color
    - Animation: Breathing/pulsing
```

---

## Accessibility Considerations

### Reduced Motion Mode
```
Normal:
╔══════════════════════════════════════════════════════════╗
║  ✦ Featured Therapies                                   ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║    HBOT • Cryotherapy • Red Light ▮                     ║
║    ^ wave ^  ^ wave ^  ^ wave ^  (animated)            ║
╚══════════════════════════════════════════════════════════╝

Reduced Motion (prefers-reduced-motion: reduce):
╔══════════════════════════════════════════════════════════╗
║  • Featured Therapies                                   ║
║  ─────────────────────────────────────────────────────── ║
║    HBOT • Cryotherapy • Red Light                       ║
║    (static display, simple fade between sets)           ║
╚══════════════════════════════════════════════════════════╝
```

### Screen Reader Announcements
```html
<!-- ARIA Live Region -->
<div role="status" aria-live="polite" aria-atomic="true">
  Currently featuring: 
  Hyperbaric Oxygen Therapy, 
  Whole Body Cryotherapy, 
  Full Body Red Light Therapy
</div>

Updates every 6 seconds without interrupting user
```

---

## Performance Optimization

### GPU Acceleration
```css
/* Optimized for smooth animation */
.typing-container {
  transform: translateZ(0);
  will-change: opacity, transform;
  backface-visibility: hidden;
}

.therapy-text {
  transform: translateZ(0);
  will-change: opacity;
}

.cursor {
  transform: translateZ(0);
  will-change: opacity, transform;
}
```

### Loading States
```
Loading (skeleton):
╔══════════════════════════════════════════════════════════╗
║  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                                        ║
║  ─────────────────────────────────────────────────────── ║
║    ▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒                     ║
╚══════════════════════════════════════════════════════════╝
(Pulsing placeholder blocks)

Loaded:
╔══════════════════════════════════════════════════════════╗
║  ✦ Featured Therapies                                   ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║    HBOT • Cryotherapy • Red Light ▮                     ║
╚══════════════════════════════════════════════════════════╝
(Fade in from skeleton)
```

---

## Implementation Notes

### CSS Variables for Easy Theming
```css
:root {
  --therapy-animation-duration: 5.8s;
  --therapy-typing-speed: 40ms;
  --therapy-cursor-size: 2px;
  --therapy-cursor-opacity: 0.8;
  --therapy-glow-intensity: 0.3;
  --therapy-container-padding: 1.5rem;
  --therapy-text-size: 1rem;
  --therapy-letter-spacing: 0.025em;
}

[data-category="performance"] {
  --therapy-color: #10b981;
  --therapy-animation-style: 'glitch';
}

[data-category="wellness"] {
  --therapy-color: #8b5cf6;
  --therapy-animation-style: 'wave';
}

[data-category="aesthetics"] {
  --therapy-color: #f59e0b;
  --therapy-animation-style: 'gradient';
}

[data-category="diagnostics"] {
  --therapy-color: #3b82f6;
  --therapy-animation-style: 'pulse';
}
```

---

## Testing Scenarios

### Visual Regression Tests
```
✓ Container renders correctly
✓ Text animates smoothly at 60fps
✓ Cursor animation is visible and smooth
✓ Colors match category theme
✓ Transitions between therapy sets are seamless
✓ Responsive layouts work on all breakpoints
✓ No layout shift during animation
✓ Accessibility features work correctly
✓ Performance metrics meet targets
```

### User Interaction Tests
```
✓ Hovering tag changes displayed therapies
✓ Clicking tag pauses animation
✓ Animation resumes when modal closes
✓ Keyboard navigation works
✓ Screen reader announces changes
✓ Reduced motion preference is respected
✓ Touch interactions work on mobile
```

---

## Final Recommendations

Based on visual mockups and user experience considerations:

1. **Preferred Container Style**: Option 2 (Luxury Glass Morphism)
   - Best balance of elegance and clarity
   - Aligns with premium brand positioning
   - Works well with all categories

2. **Preferred Animation Styles**:
   - Performance: Tech Glitch (subtle)
   - Wellness: Wave Typing
   - Aesthetics: Gradient Sweep
   - Diagnostics: Pulse Reveal

3. **Preferred Cursor**: Breathing Cursor
   - Subtle, professional
   - Works with all animation styles
   - Not distracting

4. **Timing**: Enhanced Timing (5.8s cycle)
   - Faster than current
   - Smooth transitions
   - Good balance of readability and movement

---

This visual reference should help guide the implementation of the enhanced typing animation. All designs prioritize clarity, performance, and brand alignment while creating a more engaging user experience.

