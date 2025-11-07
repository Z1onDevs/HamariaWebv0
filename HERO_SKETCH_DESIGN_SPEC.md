# Hero Sketch Design Specification

## Quick Visual Reference

### Current vs. Planned Layout

```
BEFORE (Current - Yoga SVG)
┌─────────────────────────────────────────────┐
│  HAMARIA CLUB               EN|ES    [Apply]│
│                                              │
│                                              │
│  Opening Fall 2026                           │
│                                        ╱╲    │
│  Transform Your                       ╱  ╲   │
│  Body and Mind                       │ 🧘 │  │
│                                       ╲  ╱   │
│  Long description text...             ╲╱    │
│                                       yoga   │
│  [Apply] [Explore]                   25%    │
│                                              │
│              ↓ Scroll                        │
└─────────────────────────────────────────────┘

AFTER (Planned - Hero Sketch)
┌─────────────────────────────────────────────┐
│  HAMARIA CLUB               EN|ES    [Apply]│
│  ━━━━━━━━                                    │
│  (subtle underline animation)          ┌─    │
│                                        │     │
│  Opening Fall 2026                     │     │
│                                        │ 🏛️  │
│  Transform Your                        │     │
│  Body and Mind                         │sketch│
│  ━━━━━━━━━━━━━                        │     │
│  (gradient text)                       │ 40% │
│                                        │     │
│  Long description text...              └─    │
│  (with backdrop)                    (framed) │
│                                              │
│  [Apply✨] [Explore]                        │
│  (enhanced buttons)                          │
│                                              │
│              ↓ Scroll                        │
│         ▓▓▓▓░░░░  (progress bar)            │
└─────────────────────────────────────────────┘
```

---

## Design Details

### 1. Hero Sketch Positioning

```
Desktop (XL+):
┌─────────────────────────┐
│ Content Area    │ Sketch│
│ 60%            │  40%  │
│                 │       │
│ [Buttons]       │       │
│                 │       │
│ DNA Helix      │       │
│ (vertical)     │       │
└─────────────────────────┘

Tablet (MD-LG):
┌──────────────┐
│   Sketch     │
│   (top)      │
├──────────────┤
│   Content    │
│              │
│  [Buttons]   │
│              │
└──────────────┘

Mobile (SM):
┌──────────────┐
│ Sketch (bg)  │
│ 10% opacity  │
│─────────────│
│   Content    │
│  (centered)  │
│              │
│  [Buttons]   │
└──────────────┘
```

---

## 2. Hero Sketch Frame Design

### Corner Accent Pattern
```
    ┌─────┐                    ┌─────┐
    │                              │
    │    ┏━━━━━━━━━━━━━━━┓       │
         ┃                ┃
         ┃  Hero Sketch   ┃
         ┃                ┃
    │    ┗━━━━━━━━━━━━━━━┛       │
    │                              │
    └─────┘                    └─────┘

Border Style:
- Width: 2px
- Color: primary/20
- Length: 64px (4rem)
- Offset: -16px from container
- Animation: Subtle pulse on scroll
```

### Shadow & Depth
```
Layer Stack (bottom to top):
5. Background (--background)
4. Shadow (primary/5, 80px blur)
3. Image (hero sketch.png, 40% opacity)
2. Gradient overlay (left to right fade)
1. Grain texture (overlay blend mode)
```

---

## 3. Animation Timeline

### Page Load Sequence (0-2.5s)

```
Timeline:
0.0s  ─┬─ Navigation fades in
      │
0.3s  ─┼─ "Opening Fall 2026" slides up
      │
0.5s  ─┼─ Main heading slides up + scale
      │   
0.7s  ─┼─ Description fades in
      │
0.8s  ─┼─ Hero sketch reveals (blur → clear)
      │   └─ Corner frames animate in
0.9s  ─┼─ Buttons spring in
      │
1.0s  ─┼─ DNA helix animates
      │
1.2s  ─┴─ Scroll indicator pulses
```

### Scroll Interaction (continuous)

```
Scroll Progress: 0% ─────────────────> 100%
                 │                        │
Hero Sketch:    0px ──── parallax ───> 50px down
Opacity:        40% ──── fade ─────> 20%
Content:        scale(1) ─────────> scale(0.95)
DNA Helix:      rotate(0) ────────> rotate(180deg)
```

---

## 4. Typography Enhancement

### Heading Treatment

```css
Before:
  font-size: 8xl
  font-weight: 300
  color: foreground
  letter-spacing: -0.025em

After:
  font-size: 8xl
  font-weight: 300
  background: linear-gradient(135deg, 
    foreground 0%, 
    foreground 70%, 
    primary 100%)
  background-clip: text
  letter-spacing: -0.03em
  text-shadow: 0 2px 20px rgba(0,0,0,0.03)
  line-height: 1.1
```

### Visual Result:
```
Regular:   Transform Your Body and Mind
Enhanced:  𝕋𝕣𝕒𝕟𝕤𝕗𝕠𝕣𝕞 𝕐𝕠𝕦𝕣 𝔹𝕠𝕕𝕪 𝕒𝕟𝕕 𝕄𝕚𝕟𝕕
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           (subtle gradient from dark → sage green)
```

---

## 5. Button Redesign

### Primary Button States

```
Idle:
┌──────────────────┐
│  Apply for       │  ← Shadow: primary/20
│  Membership      │
└──────────────────┘
    bg: primary
    shadow: lg

Hover:
┌──────────────────┐
│  ✨ Apply for    │  ← Shadow: primary/30
│    Membership    │  ← Scale: 105%
└──────────────────┘  ← Shine effect sweeps →
    shadow: xl

Active:
┌──────────────────┐
│  Apply for       │  ← Scale: 98%
│  Membership      │  ← Haptic feedback
└──────────────────┘
```

### Secondary Button

```
Idle:
┌──────────────────┐
│  Explore         │  ← Border: foreground/20
│  Services        │  ← Backdrop blur
└──────────────────┘
    bg: background/40

Hover:
┌──────────────────┐
│  → Explore       │  ← Border: foreground/40
│    Services      │  ← Scale: 105%
└──────────────────┘
    bg: background/60
```

---

## 6. Blend Modes & Filters

### Hero Sketch Processing

```
Original Image → Processing Pipeline → Final Display
     ↓                    ↓                  ↓
  PNG file          Mix-blend-mode      Parallax
  (color)           (multiply)          Transform
     ↓                    ↓                  ↓
  Opacity          Grayscale filter    Shadow
  (40%)            (optional 30%)      (primary/5)
     ↓                    ↓                  ↓
  Result: Elegant integration with color palette
```

### Filter Options (Choose One)

```css
Option 1: Sepia Integration
  filter: sepia(0.3) opacity(0.4);
  mix-blend-mode: multiply;

Option 2: Grayscale Elegance
  filter: grayscale(0.3) opacity(0.4);
  mix-blend-mode: soft-light;

Option 3: Pure Opacity (Recommended)
  filter: opacity(0.4);
  mix-blend-mode: multiply;
  // Let the sketch's natural tones shine
```

---

## 7. Responsive Behavior

### Breakpoint Specifications

```
Mobile (< 768px):
- Sketch: Background, 10% opacity, grayscale
- Position: Top-right corner, 60vw width
- Frame: None
- Parallax: Disabled

Tablet (768px - 1279px):
- Sketch: Visible, 25% opacity
- Position: Top-center, 40vh height
- Frame: None
- Parallax: Subtle (25px max)

Desktop (≥ 1280px):
- Sketch: Full visibility, 40% opacity
- Position: Bottom-right, 50vh height
- Frame: Corner accents visible
- Parallax: Full effect (50px max)

Large Desktop (≥ 1536px):
- Sketch: 35vw width, 60vh height
- Enhanced frame with subtle glow
- Maximum parallax depth
```

---

## 8. Color Integration

### Sketch Color Harmonization

```
Site Palette:          Sketch Tones:
━━━━━━━━━━━━          ━━━━━━━━━━━━
Background:            Paper White:
oklch(0.97 0.012 80)   Natural, warm

Primary (Sage):        Sketch Lines:
oklch(0.42 0.09 145)   Gray/Charcoal

Foreground:            Shadows:
oklch(0.25 0.02 85)    Deep Gray

How They Work Together:
┌─────────────────────────┐
│ Background (light warm) │
│   ↓ multiply             │
│ Sketch (gray lines)     │
│   ↓ result               │
│ Integrated gray-sage    │ ✓ Harmony
└─────────────────────────┘
```

---

## 9. Grain & Texture Layer

### Texture Stack

```
Visual Layers (Z-index order):

1. Shader Background (z: 0)
   └─ Animated fluid gradient

2. Shader Overlay (z: 0)
   └─ bg-background/55

3. Hero Sketch (z: 10)
   └─ with corner frames
   └─ with shadow

4. Grain Overlay (z: 15)
   └─ 3% opacity
   └─ overlay blend mode
   └─ subtle noise texture

5. Content (z: 20)
   └─ text, buttons, etc.
```

### Grain Pattern

```
Pattern Type: Fine grain noise
Size: 1px × 1px repeating
Opacity: 3%
Blend: overlay
Animation: None (static texture)
Purpose: Add tactile quality

Visual Effect:
┌─────────────────┐
│ ·  · ·· ·  ·   │  Before: Flat digital
│  · ··  ·· · ·  │
│ ·· ·  · ·  ··  │  After: Paper-like texture
│  · ·· ·· · · · │  Subtle sophistication
└─────────────────┘
```

---

## 10. Performance Specifications

### Image Optimization

```
Hero Sketch File:
├─ hero-sketch.png (fallback)
│  ├─ Size: < 200KB
│  ├─ Dimensions: 1200×1600px
│  └─ Format: PNG-8 with alpha
│
└─ hero-sketch.webp (preferred)
   ├─ Size: < 100KB
   ├─ Quality: 85
   └─ Format: WebP with alpha

Loading Strategy:
<picture>
  <source srcset="/hero-sketch.webp" type="image/webp" />
  <img 
    src="/hero-sketch.png" 
    loading="eager"
    fetchpriority="high"
    alt=""
  />
</picture>
```

### Animation Performance

```
GPU-Accelerated Properties:
✓ transform        (3D transforms)
✓ opacity          (fade effects)
✓ filter           (with will-change)

Avoid Animating:
✗ width/height     (causes reflow)
✗ margin/padding   (causes reflow)
✗ left/top         (use transform instead)

CSS Optimization:
.hero-sketch-container {
  contain: layout style paint;
  will-change: transform;
  transform: translateZ(0); /* Force GPU layer */
}
```

---

## 11. Interaction Details

### Mouse Interaction (Desktop)

```
Hover States:
─────────────
1. Navigation items:
   - Underline grows from left
   - Duration: 300ms
   - Easing: ease-out

2. Buttons:
   - Scale to 105%
   - Shadow expands
   - Shine effect sweeps
   - Magnetic pull (subtle)

3. Hero sketch:
   - No direct interaction
   - Responds to scroll only
   - Parallax effect
```

### Touch Interaction (Mobile)

```
Gesture          Action              Feedback
────────────────────────────────────────────────
Scroll down   →  Fade hero sketch  →  Visual fade
Scroll up     →  Reveal sketch     →  Visual reveal
Tap button    →  Scale to 95%      →  Haptic pulse
Swipe left    →  Next section      →  Slide transition
```

---

## 12. Accessibility Considerations

### Screen Reader Support

```html
<!-- Proper semantic structure -->
<section aria-label="Welcome to Hamaria Club">
  <p role="doc-subtitle" aria-label="Opening date">
    Opening Fall 2026
  </p>
  
  <h1>
    <span className="sr-only">Hamaria Club: </span>
    Transform Your Body and Mind
  </h1>
  
  <!-- Decorative image, hidden from screen readers -->
  <div aria-hidden="true">
    <img src="/hero-sketch.png" alt="" />
  </div>
</section>
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .hero-sketch-image {
    animation: none !important;
    transform: none !important;
    transition: none !important;
  }
  
  .hero-content * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States

```css
/* Enhanced focus for keyboard navigation */
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 4px;
  border-radius: 4px;
}
```

---

## 13. Testing Checklist

```
Visual Testing:
□ Sketch opacity looks elegant (not too faint/dark)
□ Corner frames align properly
□ Gradient text is readable
□ Buttons have good contrast
□ Mobile layout is clean

Interaction Testing:
□ Parallax is smooth (60fps)
□ Hover states are responsive
□ Touch interactions feel natural
□ Animations complete properly

Performance Testing:
□ Image loads in < 1s (3G)
□ No layout shift during load
□ Animations at 60fps
□ Memory usage acceptable

Accessibility Testing:
□ Screen reader compatible
□ Keyboard navigation works
□ Focus states visible
□ Reduced motion respected
□ Color contrast passes WCAG AA

Cross-browser Testing:
□ Chrome/Edge (Chromium)
□ Safari (WebKit)
□ Firefox
□ Mobile Safari (iOS)
□ Chrome Mobile (Android)
```

---

## 14. Design Token Updates

```css
/* New design tokens for hero section */
:root {
  /* Sketch Integration */
  --hero-sketch-opacity: 0.4;
  --hero-sketch-blur: 0px;
  --hero-sketch-scale: 1;
  
  /* Frame Accents */
  --frame-color: oklch(0.45 0.08 145 / 0.2);
  --frame-width: 2px;
  --frame-length: 64px;
  
  /* Parallax */
  --parallax-distance: 50px;
  --parallax-timing: cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Shadows */
  --sketch-shadow: 0 20px 80px oklch(0.45 0.08 145 / 0.05);
  --button-shadow-idle: 0 4px 20px oklch(0.45 0.08 145 / 0.2);
  --button-shadow-hover: 0 8px 30px oklch(0.45 0.08 145 / 0.3);
}
```

---

## Implementation Files

```
Files to Modify:
├─ app/page.tsx
│  └─ Lines 392-399 (sketch replacement)
│  └─ Lines 424-436 (heading gradient)
│  └─ Lines 458-463 (button enhancements)
│
├─ app/globals.css
│  └─ Add: .hero-sketch-image animation
│  └─ Add: .sketch-frame styles
│  └─ Add: Enhanced button states
│
└─ public/
   ├─ hero-sketch.png (existing)
   └─ hero-sketch.webp (to create)

New Files to Create:
└─ components/hero-sketch.tsx (optional)
   └─ Encapsulate sketch logic
```

---

## Success Metrics

### Visual Goals
- ✓ Sketch integration feels natural
- ✓ 40% opacity provides presence without overwhelming
- ✓ Corner frames add architectural elegance
- ✓ Overall impression: refined, sophisticated, luxurious

### Technical Goals
- ✓ Hero image loads in < 1 second
- ✓ Parallax maintains 60fps
- ✓ No cumulative layout shift
- ✓ Lighthouse score > 95

### User Experience Goals
- ✓ Clear visual hierarchy
- ✓ Smooth, fluid interactions
- ✓ Responsive across all devices
- ✓ Accessible to all users

---

**Quick Reference Guide**  
**Version**: 1.0  
**Date**: November 6, 2025  
**Ready for**: Implementation

