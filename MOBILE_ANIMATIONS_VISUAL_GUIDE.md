# Mobile Luxury Animations - Visual Guide
## Visual Mockups & Animation Sequences

**Created:** November 7, 2025  
**Companion to:** MOBILE_LUXURY_ANIMATIONS_PLAN.md

---

## 📱 Screen-by-Screen Animation Breakdown

## 1. Loading Experience

### Initial App Load
```
┌─────────────────────────┐
│                         │
│         H               │  ← Letter fades in + bounces (0ms)
│         HA              │  ← (80ms)
│         HAM             │  ← (160ms)
│         HAMA            │  ← (240ms)
│         HAMAR           │  ← (320ms)
│         HAMARI          │  ← (400ms)
│         HAMARIA         │  ← (480ms)
│         ───────         │  ← Line expands (700ms)
│            ●            │  ← Dot pulses (1000ms)
│                         │
└─────────────────────────┘

Animation Flow:
0-480ms:  Letters cascade in
700-1200ms: Underline expands
1000ms+:  Dot pulses continuously
1500ms:   Fade to main content
```

---

## 2. Hero Section (Mobile)

### Scroll Interaction
```
SCROLL POSITION 0 (TOP)
┌─────────────────────────┐
│  [HAMARIA]      EN|ES   │  ← Nav (opacity: 1)
│                         │
│    ┌─────────────┐      │
│    │  [Sketch]   │      │  ← Image (opacity: 0.9, y: 0)
│    └─────────────┘      │
│                         │
│  "Where science"        │  ← Title (opacity: 1, y: 0, scale: 1)
│  "meets serenity"       │
│                         │
│  Your personal...       │  ← Description (opacity: 1, y: 0)
│                         │
│  [Apply] [Learn More]   │  ← Buttons (opacity: 1, y: 0, scale: 1)
│                         │
└─────────────────────────┘

↓ USER SCROLLS DOWN ↓

SCROLL POSITION 200px
┌─────────────────────────┐
│  [HAMARIA]      EN|ES   │  ← Nav (same)
│                         │
│       ┌─────────┐       │
│       │[Sketch] │       │  ← Image (y: -30px) - moves up slower
│       └─────────┘       │
│                         │
│  "Where science"        │  ← Title (y: 20px, scale: 0.96) - moves down
│  "meets serenity"       │     Slightly smaller
│                         │
│  Your personal...       │  ← Description (y: 40px, opacity: 0.6)
│                         │     Fading out, moving faster
│  [Apply] [Learn More]   │  ← Buttons (y: 50px, opacity: 0.3, scale: 0.95)
│                         │     Almost gone
└─────────────────────────┘

Animation Details:
- Image moves at 0.15x scroll speed (parallax slow)
- Title moves at 0.15x + scales down (0.0002x per px)
- Description moves at 0.2x + fades (0.002x per px)
- Buttons move at 0.25x + fade + scale (fastest)

Creates depth hierarchy: Image → Title → Description → Buttons
```

---

## 3. Section Transitions

### Section Reveal Choreography
```
SECTION ENTERING VIEWPORT

Frame 1 (Section at 20% visible):
┌─────────────────────────┐
│         ···             │  ← Previous section
│                         │
├─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤  ← Threshold
│                         │
│                         │  ← New section (opacity: 0)
│                         │     (translateY: 48px)
│                         │
└─────────────────────────┘

↓ 0ms - Title starts

Frame 2 (100ms):
┌─────────────────────────┐
│                         │
│   Our Services          │  ← Title (opacity: 0.5, y: 24px)
│                         │     Sliding up + fading in
│                         │
│                         │  ← Subtitle (opacity: 0, y: 48px)
│                         │     Waiting
│                         │
└─────────────────────────┘

↓ 100ms - Subtitle starts

Frame 3 (200ms):
┌─────────────────────────┐
│                         │
│   Our Services          │  ← Title (opacity: 1, y: 0)
│   Explore our offerings │  ← Subtitle (opacity: 0.5, y: 24px)
│                         │
│                         │  ← Content (opacity: 0, scale: 0.95)
│                         │     Waiting
└─────────────────────────┘

↓ 200ms - Content starts

Frame 4 (400ms):
┌─────────────────────────┐
│   Our Services          │  ← Title (complete)
│   Explore our offerings │  ← Subtitle (complete)
│                         │
│   ┌────────────────┐    │
│   │   [Content]    │    │  ← Content (opacity: 1, scale: 1)
│   └────────────────┘    │     Scaling up to full size
│                         │
└─────────────────────────┘

Timing:
0ms:    Title starts (duration: 400ms)
100ms:  Subtitle starts (duration: 400ms)
200ms:  Main content starts (duration: 400ms)
400ms:  Secondary elements cascade

Easing: cubic-bezier(0.16, 1, 0.3, 1) - smooth deceleration
```

---

## 4. Service Tags (Mobile Grid)

### Initial Reveal with Stagger
```
SEQUENCE: Diagonal cascade reveal

┌─────────────────────────┐
│                         │
│   ┌──────┐  ┌──────┐   │
│   │ Long │  │ Well │   │  ← Row 1
│   │  + 42│  │  + 38│   │
│   └──────┘  └──────┘   │
│                         │
│   ┌──────┐  ┌──────┐   │
│   │ Aest │  │ Diag │   │  ← Row 2
│   │  + 31│  │  + 24│   │
│   └──────┘  └──────┘   │
│                         │
└─────────────────────────┘

Animation Delays:
┌──────────────────────────────┐
│  Card 1      Card 2          │
│  (200ms)     (300ms)         │  ← Row 1 starts first
│                              │
│  Card 3      Card 4          │
│  (400ms)     (500ms)         │  ← Row 2 follows
└──────────────────────────────┘

Animation for each card:
From:  opacity: 0, scale: 0.9, translateY: 20px
To:    opacity: 1, scale: 1, translateY: 0
Duration: 400ms
Easing: cubic-bezier(0.34, 1.56, 0.64, 1) - bouncy spring
```

### Tap Interaction
```
NORMAL STATE:
┌──────────────┐
│  Longevity   │  ← Border: #6B8E2360 (60% opacity)
│  + 42        │     Background: #6B8E2310 (10% opacity)
└──────────────┘     Shadow: 0 2px 8px rgba(0,0,0,0.1)
                     Scale: 1

↓ USER TOUCHES ↓ (0ms)

TOUCH START:
┌──────────────┐
│  Longevity   │  ← Border: #6B8E23 (100% opacity) GLOW
│  + 42        │     Background: #6B8E2320 (20% opacity)
└──────────────┘     Shadow: 0 0 20px #6B8E2340, 0 4px 15px rgba(0,0,0,0.15)
   ╲        ╱        Scale: 0.95
    ╲  ●  ╱         ← Ripple starts from touch point
     ╲  ╱
      ╲╱

TOUCH RELEASE (100ms):
┌──────────────┐
│  Longevity   │  ← Ripple expands and fades
│  + 42        │     Card springs back to scale: 1
└──────────────┘     Border transitions back to 60% opacity
    ┌─────────┐      Shadow reduces
    │    ○    │      Duration: 200ms spring easing
    └─────────┘

Animation specs:
- Touch down: 80ms cubic-bezier(0.4, 0, 0.2, 1)
- Release: 200ms cubic-bezier(0.34, 1.56, 0.64, 1)
- Ripple: 600ms expand + fade
```

---

## 5. Typing Therapies Animation

### Current State (Enhanced)
```
TIME: 0s
┌─────────────────────────────────┐
│ [                           ]│  │  ← Empty box, breathing cursor
└─────────────────────────────────┘

TIME: 0.5s
┌─────────────────────────────────┐
│ [H                          ]│  │  ← First character appears
└─────────────────────────────────┘     Typing speed: 35ms/char

TIME: 2s
┌─────────────────────────────────┐
│ [Hyperbaric Oxygen Therapy  ]│  │  ← Full therapy name
└─────────────────────────────────┘     Cursor still blinking

TIME: 2.5s (at word boundary)
┌─────────────────────────────────┐
│ [Hyperbaric Oxygen Therapy •]│  │  ← Bullet added (60ms pause)
└─────────────────────────────────┘

TIME: 4s
┌─────────────────────────────────┐
│ [Hyperbaric...• Cryotherapy ]│  │  ← Second therapy types in
└─────────────────────────────────┘

TIME: 7s (display complete)
┌─────────────────────────────────┐
│ [HBOT • Cryotherapy • Red...]│  │  ← Showing 2 therapies
└─────────────────────────────────┘     Holds for 3 seconds

TIME: 7s-10s (fade out)
┌─────────────────────────────────┐
│ [HBOT • Cryotherapy • R     ]│  │  ← Erasing backwards (15ms/char)
└─────────────────────────────────┘     Faster than typing

TIME: 10s (cycle repeats)
┌─────────────────────────────────┐
│ [                           ]│  │  ← Back to empty, new therapies
└─────────────────────────────────┘

Cursor Animation:
- Breathing effect: scale-y oscillates between 0.9-1.0
- Frequency: 50ms updates
- Glow: 0 0 8px rgba(107, 142, 35, 0.4)
```

---

## 6. Membership Cards

### Mobile Card Expansion
```
COLLAPSED STATE:
┌────────────────────────────────┐
│  Longevity +                   │  ← Title
│  Foundational therapies...     │  ← Description
│                                │
│  42 therapies included         │  ← Summary
│                                │
│  ┌──────────────────────────┐ │
│  │  ▼ View Details          │ │  ← Expand button
│  └──────────────────────────┘ │
│                                │
│  ┌──────────────────────────┐ │
│  │  Learn More              │ │
│  └──────────────────────────┘ │
│  ┌──────────────────────────┐ │
│  │  Apply Now               │ │
│  └──────────────────────────┘ │
└────────────────────────────────┘
   Shadow: subtle
   Border: primary/20

↓ USER TAPS "VIEW DETAILS" ↓

TRANSITION (0-400ms):
┌────────────────────────────────┐
│  Longevity +                   │
│  Foundational therapies...     │
│                                │
│  42 therapies included         │
│                                │
│  ┌──────────────────────────┐ │
│  │  ▲ Hide Details  [spin] │ │  ← Arrow rotates 180°
│  └──────────────────────────┘ │     Duration: 500ms spring
│  ╔══════════════════════════╗ │
│  ║ [Details expanding...]   ║ │  ← New content area
│  ║                          ║ │     scaleY: 0 → 1
│  ╚══════════════════════════╝ │     opacity: 0 → 1
│  ┌──────────────────────────┐ │     Duration: 400ms
│  │  Learn More              │ │
└────────────────────────────────┘

EXPANDED STATE:
┌────────────────────────────────┐
│  Longevity +                   │
│  Foundational therapies...     │
│                                │
│  42 therapies included         │
│                                │
│  ┌──────────────────────────┐ │
│  │  ▲ Hide Details          │ │  ← Arrow fully rotated
│  └──────────────────────────┘ │
│  ┌──────────────────────────┐ │
│  │ Therapy      │ Sessions  │ │  ← Table header (sticky)
│  ├──────────────┼───────────┤ │
│  │ HBOT         │ 2/month   │ │  ← Row 1 (stagger: 0ms)
│  │ Cryotherapy  │ Unlimited │ │  ← Row 2 (stagger: 30ms)
│  │ Red Light    │ Unlimited │ │  ← Row 3 (stagger: 60ms)
│  │ Massage      │ 4/month   │ │  ← etc...
│  │ Sauna        │ Unlimited │ │
│  │ ... (scroll) ...         │ │  ← Scrollable area
│  │              ↓ Scroll    │ │  ← Scroll hint
│  └──────────────────────────┘ │
│                                │
│  ┌──────────────────────────┐ │
│  │  Learn More              │ │
│  └──────────────────────────┘ │
└────────────────────────────────┘
   Shadow: enhanced
   Border: primary/30 (glowing)

Stagger Details:
- Each row: 30ms delay
- Max 16 rows animated (rest instant)
- Animation: translateY(10px) + opacity 0 → 1
- Duration per row: 300ms
- Easing: cubic-bezier(0.16, 1, 0.3, 1)
```

### Card Hover Effect (Mobile "Active" State)
```
NORMAL:
┌────────────────────────────────┐
│  Performance +                 │
│                                │
│  ...content...                 │
│                                │
└────────────────────────────────┘
  ↑ 0px from baseline
  Shadow: 0 2px 8px rgba(0,0,0,0.1)
  Scale: 1

ACTIVE (during touch):
┌────────────────────────────────┐
│  Performance +                 │
│                                │
│  ...content...                 │ ╲
│                                │  ╲ Glow effect
└────────────────────────────────┘  ╱
  ↑ -8px from baseline (lifted)    ╱
  Shadow: 0 8px 24px rgba(107,142,35,0.25)
  Scale: 1.02 (desktop) / 0.95 (mobile on tap)
  Border: enhanced glow
  
Animation:
- Duration: 250ms
- Easing: ease-out
- GPU-accelerated (transform + opacity)
```

---

## 7. Modal Animations

### Modal Entry Sequence
```
CLOSED STATE (Modal not visible):
┌─────────────────────────┐
│                         │
│   [Main Content]        │  ← User taps "Explore All Services"
│                         │
│   [Button]  ← tap       │
│                         │
└─────────────────────────┘

↓ 0ms - Backdrop starts ↓

FRAME 1 (100ms):
┌─────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░│  ← Backdrop (opacity: 0.2, blur: 4px)
│░░░░░░░░░░░░░░░░░░░░░░░░░│     Fading in + blur increasing
│░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────┘

↓ 150ms - Modal starts ↓

FRAME 2 (250ms):
┌─────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← Backdrop (opacity: 0.5, blur: 10px)
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓    ┌─────────┐   ▓▓▓│
│▓▓▓    │         │   ▓▓▓│  ← Modal (opacity: 0.5, scale: 0.95, y: 20px)
│▓▓▓    │ Modal   │   ▓▓▓│     Appearing from below
│▓▓▓    │         │   ▓▓▓│
│▓▓▓    └─────────┘   ▓▓▓│
└─────────────────────────┘

↓ 400ms - Complete ↓

FRAME 3 (FINAL):
┌─────────────────────────┐
│█████████████████████████│  ← Backdrop (opacity: 0.6, blur: 12px)
│█████████████████████████│     Shader visible through backdrop
│███  ┌─────────────┐  ██│
│███  │  [X Close]  │  ██│
│███  │             │  ██│  ← Modal (opacity: 1, scale: 1, y: 0)
│███  │  Services   │  ██│     Fully visible
│███  │  [Content]  │  ██│
│███  │  [...rows]  │  ██│
│███  └─────────────┘  ██│
└─────────────────────────┘

THEN: Content stagger reveals inside modal (100ms after modal settles)

Timing Breakdown:
0ms:      Backdrop fade starts (300ms duration)
150ms:    Modal slide + scale starts (400ms duration)
550ms:    Modal fully visible, content stagger begins
600ms:    First content row appears
650ms:    Second row
700ms:    Third row
...       (50ms stagger per row)

Easing:
- Backdrop: ease-out
- Modal: cubic-bezier(0.34, 1.56, 0.64, 1) - spring
```

### Modal Exit Sequence
```
OPEN STATE:
┌─────────────────────────┐
│█████████████████████████│
│███  ┌─────────────┐  ██│
│███  │  [X Close]  │  ██│  ← User taps X or backdrop
│███  │   Modal     │  ██│
│███  │  [Content]  │  ██│
│███  └─────────────┘  ██│
└─────────────────────────┘

↓ 0ms - Content fades immediately ↓

FRAME 1 (100ms):
┌─────────────────────────┐
│█████████████████████████│
│███  ┌─────────────┐  ██│
│███  │  [X Close]  │  ██│
│███  │             │  ██│  ← Content (opacity: 0.3)
│███  │   [fading]  │  ██│     Fading fast
│███  └─────────────┘  ██│
└─────────────────────────┘

↓ 150ms - Modal starts shrinking ↓

FRAME 2 (250ms):
┌─────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← Backdrop (opacity: 0.3, blur: 6px)
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│     Fading out
│▓▓▓      ┌─────┐     ▓▓▓│
│▓▓▓      │     │     ▓▓▓│  ← Modal (opacity: 0.5, scale: 0.96, y: 15px)
│▓▓▓      └─────┘     ▓▓▓│     Shrinking + sliding down
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└─────────────────────────┘

↓ 400ms - Gone ↓

FRAME 3 (FINAL):
┌─────────────────────────┐
│                         │
│                         │
│   [Main Content]        │  ← Back to main page
│                         │     Modal removed from DOM
│                         │
└─────────────────────────┘

Exit Timing:
0ms:      Content fade starts (150ms)
150ms:    Modal shrink + slide starts (250ms)
150ms:    Backdrop fade starts (250ms)
400ms:    All animations complete, unmount
```

---

## 8. Form Interactions

### Input Field States
```
EMPTY STATE:
┌──────────────────────────┐
│  Name                    │  ← Label (inside, gray)
│                          │
└──────────────────────────┘
   Border: thin, gray (#E5E5E5)
   Background: subtle (#FAFAFA)

↓ USER TAPS FIELD ↓

FOCUSED STATE (200ms transition):
┌──────────────────────────┐
│  Name ↑                  │  ← Label (floats up, scales to 0.85)
├──────────────────────────┤     Color: primary
│  |                       │  ← Cursor appears
└──────────────────────────┘
   Border: thicker, primary color
   Border glow: 0 0 0 3px rgba(107,142,35,0.1)
   Background: white

↓ USER TYPES ↓

FILLED STATE:
┌──────────────────────────┐
│  Name ↑                  │  ← Label (stays up)
├──────────────────────────┤
│  John Smith|             │  ← Text being typed
└──────────────────────────┘
   Border: primary (while focused)

↓ USER BLURS (unfocus) ↓

FILLED + UNFOCUSED:
┌──────────────────────────┐
│  Name ↑                  │  ← Label (stays up)
├──────────────────────────┤
│  John Smith              │  ← Text remains
└──────────────────────────┘
   Border: back to gray
   Glow: removed

Animation specs:
- Label float: translateY(-24px) scale(0.85)
- Duration: 200ms
- Easing: ease-out
- Border glow: 300ms ease-out
```

### Form Validation
```
ERROR STATE:
┌──────────────────────────┐
│  Email ↑                 │  ← Label (red)
├──────────────────────────┤
│  invalid-email           │  ← Invalid text (red tint)
└──────────────────────────┘
   ⚠ Please enter valid email  ← Error message fades in
   
   Border: red (#DC2626)
   Background: red tint (#FEF2F2)
   Shake animation on error detection:
   - translateX: [0, -10px, 10px, -10px, 0]
   - Duration: 400ms
   - Easing: cubic-bezier(0.36, 0.07, 0.19, 0.97)

SUCCESS STATE:
┌──────────────────────────┐
│  Email ↑                 │  ← Label (green)
├──────────────────────────┤
│  john@example.com    ✓   │  ← Valid text + checkmark
└──────────────────────────┘
   
   Border: green (#22C55E)
   Background: green tint (#F0FDF4)
   Checkmark animation:
   - Scale: 0 → 1.2 → 1
   - Duration: 500ms
   - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) - bouncy spring
```

### Submit Button States
```
NORMAL STATE:
┌─────────────────────┐
│   Submit Application│  ← Ready to tap
└─────────────────────┘
   Background: primary color
   Shadow: subtle
   Scale: 1

LOADING STATE (after tap):
┌─────────────────────┐
│   ⟳ Submitting...   │  ← Spinner rotates
└─────────────────────┘
   Disabled: true
   Opacity: 0.7
   Spinner animation:
   - Rotate: 0deg → 360deg
   - Duration: 1s
   - Iteration: infinite
   - Easing: linear

SUCCESS STATE (after 200ms):
┌─────────────────────┐
│   ✓ Submitted!      │  ← Checkmark scales in
└─────────────────────┘
   Background: green
   Checkmark animation:
   - Scale: 0 → 1.2 → 1
   - Duration: 600ms
   - Then hold for 2s
   - Then fade out modal

Sequence:
Normal → Loading (instant) → Success (after API) → Modal close (2s delay)
```

---

## 9. Pull-to-Refresh (Advanced)

```
NORMAL SCROLL:
┌─────────────────────────┐
│  [HAMARIA]      EN|ES   │  ← Top of page
│                         │
│  "Where science"        │
│  "meets serenity"       │
└─────────────────────────┘
   Scroll position: 0
   No indicator

↓ USER PULLS DOWN FROM TOP ↓

PULLING (Distance: 40px):
       ┌─────┐
       │  ○  │               ← Refresh indicator appears
       └─────┘                  Opacity scales with pull (40% at 40px)
┌─────────────────────────┐     Size: small
│  [HAMARIA]      EN|ES   │
│                         │  ← Content pulled down 40px
│  "Where science"        │     Rubber-band resistance
│  "meets serenity"       │
└─────────────────────────┘

PULLING (Distance: 80px - THRESHOLD):
       ┌─────┐
       │  ◉  │               ← Indicator grows + pulses
       └─────┘                  Opacity: 100%
┌─────────────────────────┐     Color changes to primary
│  [HAMARIA]      EN|ES   │     Haptic-like pulse animation
│                         │
│  "Where science"        │  ← Content pulled down 80px
│  "meets serenity"       │     Max pull (harder to pull further)
└─────────────────────────┘

↓ USER RELEASES ↓

REFRESHING:
       ┌─────┐
       │  ⟳  │               ← Spinner rotates
       └─────┘                  Duration: stays until refresh complete
┌─────────────────────────┐
│  [HAMARIA]      EN|ES   │  ← Content snaps back with spring
│                         │     Duration: 400ms
│  "Where science"        │     Easing: spring bounce
│  "meets serenity"       │
└─────────────────────────┘

COMPLETE:
       ┌─────┐
       │  ✓  │               ← Checkmark briefly
       └─────┘                  Then fades out (300ms)
┌─────────────────────────┐
│  [HAMARIA]      EN|ES   │
│                         │
│  "Where science"        │  ← Updated content
│  "meets serenity"       │
└─────────────────────────┘

Animation Details:
- Pull resistance: linear up to 60px, exponential after
- Threshold: 80px
- Snap back: 400ms spring
- Spinner rotation: 1.2s per revolution
- Success checkmark: 300ms scale bounce, hold 500ms, fade 300ms
```

---

## 10. Scroll Progress Indicator

```
TOP OF PAGE:
┌─────────────────────────┐
│  [HAMARIA]      EN|ES   │  ← No progress bar visible
│                         │
│  "Where science"        │
│  "meets serenity"       │
└─────────────────────────┘

SCROLLING (25% down page):
┼─────────────────────────┤  ← Progress bar (2px height)
├─────────────────────────┤     Color: primary
│█████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│     Fill: 25%
├─────────────────────────┤     Gradient: left (bright) to right (fade)
│                         │
│   [Concept Section]     │
│                         │
└─────────────────────────┘

SCROLLING (50% down page):
┼─────────────────────────┤
├─────────────────────────┤
│██████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒│  ← Fill: 50%
├─────────────────────────┤     Color transition to services color
│                         │
│   [Services Section]    │
│                         │
└─────────────────────────┘

Animation:
- Width: smooth interpolation based on scroll
- Transition: 100ms ease-out (feels instant but smooth)
- Color: cross-fade between section theme colors
  - Hero → Concept: sage green
  - Concept → Services: olive green  
  - Services → Gallery: warm amber
  - Gallery → Membership: sage green
  - Membership → Contact: soft blue
```

---

## 11. List Stagger Animations

### Therapy Grid in Modal
```
MODAL JUST OPENED (Content starts revealing):

FRAME 1 (0ms):
┌─────────────────────────────────┐
│  All Therapies                  │  ← Title (visible)
│  ────────────                   │
│                                 │
│  [Filters: All ▼]              │  ← Filters (visible)
│                                 │
│  ┌─────────────┐               │
│  │             │               │  ← Item 1 (opacity: 0, y: 20px)
│  └─────────────┘               │
│  ┌─────────────┐               │
│  │             │               │  ← Item 2 (opacity: 0, y: 20px)
│  └─────────────┘               │
│  ... (all hidden)               │
└─────────────────────────────────┘

↓ Stagger begins (50ms intervals) ↓

FRAME 2 (50ms):
┌─────────────────────────────────┐
│  All Therapies                  │
│  ────────────                   │
│                                 │
│  [Filters: All ▼]              │
│                                 │
│  ┌─────────────┐               │
│  │ HBOT        │               │  ← Item 1 (opacity: 1, y: 0)
│  └─────────────┘               │     VISIBLE
│  ┌─────────────┐               │
│  │             │               │  ← Item 2 (opacity: 0.5, y: 10px)
│  └─────────────┘               │     ANIMATING
│  ┌─────────────┐               │
│  │             │               │  ← Item 3 (opacity: 0, y: 20px)
│  └─────────────┘               │     WAITING
└─────────────────────────────────┘

FRAME 3 (100ms):
┌─────────────────────────────────┐
│  All Therapies                  │
│  ────────────                   │
│                                 │
│  [Filters: All ▼]              │
│                                 │
│  ┌─────────────┐               │
│  │ HBOT        │               │  ← Item 1 ✓
│  └─────────────┘               │
│  ┌─────────────┐               │
│  │ Cryotherapy │               │  ← Item 2 ✓
│  └─────────────┘               │
│  ┌─────────────┐               │
│  │             │               │  ← Item 3 (animating)
│  └─────────────┘               │
│  ┌─────────────┐               │
│  │             │               │  ← Item 4 (waiting)
│  └─────────────┘               │
└─────────────────────────────────┘

... continues for all visible items (max 16 animated)

FINAL STATE (800ms):
┌─────────────────────────────────┐
│  All Therapies                  │
│  ────────────                   │
│                                 │
│  [Filters: All ▼]              │
│                                 │
│  ┌─────────────┐               │
│  │ HBOT        │               │  ← All items visible
│  └─────────────┘               │
│  ┌─────────────┐               │
│  │ Cryotherapy │               │
│  └─────────────┘               │
│  ┌─────────────┐               │
│  │ Red Light   │               │
│  └─────────────┘               │
│  ┌─────────────┐               │
│  │ Massage     │               │
│  └─────────────┘               │
│  ... (scroll for more)          │
└─────────────────────────────────┘

Timing formula:
delay(index) = Math.min(index * 50, 800)

This means:
- Item 1: 0ms
- Item 2: 50ms
- Item 3: 100ms
- ...
- Item 16: 750ms
- Item 17+: 800ms (instant, no more stagger)

Animation per item:
- translateY: 20px → 0
- opacity: 0 → 1
- duration: 300ms
- easing: cubic-bezier(0.16, 1, 0.3, 1)
```

---

## 12. Number Counting Animation

### Therapy Count Animation
```
SECTION REVEALS:

FRAME 1 (0ms):
┌──────────────┐
│  Longevity   │
│  + 0         │  ← Count starts at 0
└──────────────┘

FRAME 2 (100ms):
┌──────────────┐
│  Longevity   │
│  + 11        │  ← Counting up (using easing)
└──────────────┘

FRAME 3 (300ms):
┌──────────────┐
│  Longevity   │
│  + 31        │  ← Still counting (slower now)
└──────────────┘

FRAME 4 (600ms):
┌──────────────┐
│  Longevity   │
│  + 40        │  ← Almost there (very slow)
└──────────────┘

FRAME 5 (800ms):
┌──────────────┐
│  Longevity   │
│  + 42        │  ← Final value
└──────────────┘

Easing curve:
- Fast at start (0-30%)
- Medium in middle (30-70%)
- Slow at end (70-100%)
- Creates excitement and anticipation
- Duration: 800ms for counts up to 100

Implementation:
const progress = easeOutCubic(elapsed / duration)
const current = Math.floor(start + (end - start) * progress)
```

---

## 🎨 Color & Effect Specifications

### Glassmorphism Effects
```
Typing Therapies Container:
┌─────────────────────────────────┐
│ [Text content here]             │
└─────────────────────────────────┘

CSS:
background: linear-gradient(135deg, 
  rgba(107, 142, 35, 0.03) 0%,
  rgba(107, 142, 35, 0.01) 100%
)
border: 1px solid rgba(107, 142, 35, 0.12)
box-shadow: 
  0 0 20px rgba(107, 142, 35, 0.06),
  inset 0 0 20px rgba(107, 142, 35, 0.02)
backdrop-filter: blur(4px)

Ambient Glow (on hover):
background: radial-gradient(
  circle at 50% 50%,
  rgba(107, 142, 35, 0.08) 0%,
  transparent 70%
)
animation: pulse 3s ease-in-out infinite
```

### Shadow Dynamics
```
Button Press Shadow:
Normal:     0 4px 12px rgba(0, 0, 0, 0.1)
Hover:      0 6px 16px rgba(0, 0, 0, 0.15)
Active:     0 2px 8px rgba(0, 0, 0, 0.2)  ← Compressed
Duration:   200ms

Card Lift Shadow:
Normal:     0 2px 8px rgba(0, 0, 0, 0.1)
Lifted:     0 12px 32px rgba(107, 142, 35, 0.2),
            0 4px 12px rgba(0, 0, 0, 0.15)
Duration:   250ms
Easing:     ease-out
```

### Ripple Effect Specs
```
Touch Ripple:
- Start: 0px radius, opacity 0.5
- End: 200px radius, opacity 0
- Duration: 600ms
- Easing: cubic-bezier(0, 0, 0.2, 1)
- Color: rgba(255, 255, 255, 0.3)

CSS Animation:
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
```

---

## ⚡ Performance Considerations

### Will-Change Usage
```
BEFORE ANIMATION:
element.style.willChange = 'transform, opacity'

DURING ANIMATION:
// Browser optimizes for these properties

AFTER ANIMATION (1s later):
element.style.willChange = 'auto'

Why:
- Prevents constant GPU layer creation
- Only optimizes when needed
- Saves memory on mobile
```

### Animation Frames
```
GOOD (60fps):
┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐  ← Consistent 16.67ms per frame
│ │ │ │ │ │ │ │ │ │ │ │ │
└─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
0ms              200ms

BAD (Janky):
┌──┬┬───┬┬──┬───┬┬─┬────┐  ← Inconsistent frames
│  ││   ││  │   ││ │    │
└──┴┴───┴┴──┴───┴┴─┴────┘
0ms              200ms

Causes of jank:
- Animating non-GPU properties (width, height, top, left)
- Too many elements animating at once
- Heavy JavaScript during animation
- Not using requestAnimationFrame
```

---

## 📱 Device-Specific Optimizations

### Low-End Devices
```
IF (deviceMemory < 4GB OR hardwareConcurrency < 4):
  ✓ Disable backdrop blur
  ✓ Reduce shadow complexity
  ✓ Skip parallax effects
  ✓ Use simpler easing (linear or ease)
  ✓ Reduce stagger item count (8 instead of 16)
  ✓ Disable shimmer/shine effects
  ✓ Instant modals (no animation)

ELSE:
  ✓ Full luxury animations
```

### High-End Devices (Optional Enhancements)
```
IF (deviceMemory >= 8GB AND hardwareConcurrency >= 8):
  ✓ Enable advanced blur effects
  ✓ Add particle effects (optional)
  ✓ More complex shader backgrounds
  ✓ Higher quality shadows
  ✓ Longer stagger sequences
```

---

## 🎯 Animation Testing Checklist

### Visual Tests
- [ ] Animations complete fully (no cut-off)
- [ ] No content jump or layout shift
- [ ] Colors transition smoothly
- [ ] Shadows render correctly
- [ ] Blur effects work on all browsers
- [ ] Text remains readable during animations
- [ ] Images don't distort

### Performance Tests
- [ ] Consistent 60fps during animations
- [ ] No memory leaks after repeated animations
- [ ] Touch response <100ms
- [ ] Scroll feels smooth
- [ ] Modal opens in <400ms
- [ ] Page transitions <600ms

### Accessibility Tests
- [ ] Animations respect prefers-reduced-motion
- [ ] Keyboard navigation still works
- [ ] Screen reader announces changes
- [ ] Focus indicators visible during animations
- [ ] No seizure-inducing flashing

---

**End of Visual Guide**

This document provides visual references for all animations in the Mobile Luxury Animations Plan. Use these mockups as design specs during implementation.

**Related Documents:**
- MOBILE_LUXURY_ANIMATIONS_PLAN.md (Implementation details)
- ANIMATION_ENHANCEMENT_README.md (Desktop animations)
- ANIMATION_VISUAL_MOCKUPS.md (Services section specifics)

