# Phase 2 Performance Optimization Plan 🚀

## Overview

**Goal:** Push mobile Performance score from 65-75 → 90+  
**Timeline:** 2-3 days implementation  
**Target:** All Core Web Vitals in "Good" (green) range  
**Expected Gain:** +20-25 Performance points  

---

## 📊 Current Status (After Phase 1)

### Phase 1 Achievements ✅
- Bundle size reduced: 800 KB → 619 KB
- Code splitting implemented
- Analytics deferred
- Fonts optimized
- Compression enabled

### Remaining Bottlenecks (Expected)
Based on typical issues after Phase 1:

1. 🔴 **Hero Image:** Large PNG file (500KB - 1MB)
2. 🔴 **Gallery Images:** All loaded upfront (not lazy)
3. 🟡 **Unused CSS:** Tailwind generating excess CSS
4. 🟡 **React Re-renders:** Components re-rendering unnecessarily
5. 🟡 **No Caching Strategy:** Missing service worker
6. 🟡 **Resource Loading:** No prefetch/preconnect hints

---

## 🎯 Phase 2 Priorities

### Priority 1: Image Optimization (Critical - Day 1)
### Priority 2: React Performance (Important - Day 2)  
### Priority 3: Advanced Caching (Nice to Have - Day 3)

---

## 🖼️ PRIORITY 1: Image Optimization

**Impact:** -1-2s LCP, +15-20 Performance points  
**Time:** 2-3 hours  
**Difficulty:** Medium

### Task 1.1: Compress Hero Sketch Image

#### Objective
Reduce hero-sketch.png from ~500KB to < 100KB without visible quality loss.

#### Implementation

**Option A: Using Squoosh (Recommended)**
```bash
# Install Squoosh CLI
npm install -g @squoosh/cli

# Navigate to public folder
cd /Users/Pico/Desktop/HamariaWebv0/public

# Create optimized versions
squoosh-cli \
  --webp '{"quality":85,"target_size":0,"target_PSNR":0,"method":4,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}' \
  --output-dir ./optimized \
  hero-sketch.png

# Generate multiple sizes
squoosh-cli --resize '{"width":375}' --webp auto -d ./optimized hero-sketch.png
squoosh-cli --resize '{"width":768}' --webp auto -d ./optimized hero-sketch.png
squoosh-cli --resize '{"width":1920}' --webp auto -d ./optimized hero-sketch.png
```

**Option B: Using Sharp (Programmatic)**
```bash
npm install --save-dev sharp-cli

# Create responsive images
npx sharp-cli \
  -i hero-sketch.png \
  -o hero-sketch-375w.webp \
  -f webp \
  --width 375 \
  --quality 80

npx sharp-cli \
  -i hero-sketch.png \
  -o hero-sketch-768w.webp \
  -f webp \
  --width 768 \
  --quality 85

npx sharp-cli \
  -i hero-sketch.png \
  -o hero-sketch-1920w.webp \
  -f webp \
  --width 1920 \
  --quality 90
```

**Option C: Manual (Easiest)**
1. Go to https://squoosh.app
2. Upload hero-sketch.png
3. Select WebP format
4. Quality: 85
5. Compare preview (should be nearly identical)
6. Download (should be < 100 KB)
7. Replace original

#### Verification
```bash
# Check file sizes
ls -lh public/hero-sketch*.{png,webp}

# Target sizes:
# hero-sketch-375w.webp:  < 30 KB
# hero-sketch-768w.webp:  < 60 KB
# hero-sketch-1920w.webp: < 100 KB
```

---

### Task 1.2: Implement Next.js Image Component

**File:** `app/page.tsx`

#### Step 1: Import Next.js Image
```tsx
import Image from 'next/image'
```

#### Step 2: Replace Mobile Hero Image
```tsx
// Before (current)
<img 
  src="/hero-sketch.png" 
  alt="Hamaria wellness visualization"
  width="800"
  height="600"
  loading="eager"
  decoding="async"
  fetchPriority="high"
  className="absolute inset-0 w-full object-contain object-center"
  style={{ opacity: 0.9, height: '125%', top: '-12.5%' }}
/>

// After (optimized)
<Image 
  src="/hero-sketch.webp" 
  alt="Hamaria wellness visualization"
  width={800}
  height={600}
  priority // Same as fetchPriority high + loading eager
  quality={85}
  className="absolute inset-0 w-full object-contain object-center"
  style={{ opacity: 0.9, height: '125%', top: '-12.5%' }}
  sizes="(max-width: 768px) 65vw, (max-width: 1024px) 70vw, 50vw"
/>
```

#### Step 3: Replace Desktop Hero Image
```tsx
<Image
  src="/hero-sketch.webp"
  alt="Hamaria wellness visualization"
  width={700}
  height={800}
  priority
  quality={90}
  className="h-full w-full object-contain object-center"
  style={{ opacity: 0.95 }}
  sizes="(min-width: 1024px) 42vw, (min-width: 1280px) 46vw, 40vw"
/>
```

#### Step 4: Update Image Config
**File:** `next.config.mjs`

```js
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [375, 414, 640, 768, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60 * 60 * 24 * 30,
  dangerouslyAllowSVG: true,
  remotePatterns: [], // Add if using external images
  loader: 'default', // Use Next.js built-in
}
```

**Benefits:**
- ✅ Automatic WebP/AVIF conversion
- ✅ Responsive srcset generation
- ✅ Built-in lazy loading
- ✅ Blur placeholder support
- ✅ Automatic optimization

---

### Task 1.3: Lazy Load Gallery Images

**File:** `components/sections/gallery-section.tsx`

#### Find and Update
```tsx
// Current implementation likely uses <img> tags
// Replace with Next.js Image

import Image from 'next/image'

// In gallery map
<Image
  src={image.src}
  alt={image.alt}
  width={800}
  height={600}
  loading="lazy" // Key: Don't load until scrolled into view
  quality={80}
  className="..."
  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 33vw"
/>
```

**Expected Impact:**
- ✅ LCP: -0.5-1s (fewer network requests)
- ✅ TBT: -50-100ms (less parsing work)
- ✅ Bandwidth: -70% on initial load

---

### Task 1.4: Add Blur Placeholders

#### Generate Blur Data URLs
```bash
npm install --save-dev plaiceholder

# Create script: scripts/generate-placeholders.mjs
```

**File:** `scripts/generate-placeholders.mjs`
```js
import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs'
import path from 'path'

const images = [
  'hero-sketch.png',
  // Add gallery images
]

const placeholders = {}

for (const image of images) {
  const imagePath = path.join(process.cwd(), 'public', image)
  const { base64 } = await getPlaiceholder(imagePath)
  placeholders[image] = base64
}

fs.writeFileSync(
  'lib/image-placeholders.json',
  JSON.stringify(placeholders, null, 2)
)
```

**Run:**
```bash
node scripts/generate-placeholders.mjs
```

**Use in component:**
```tsx
import placeholders from '@/lib/image-placeholders.json'

<Image
  src="/hero-sketch.webp"
  placeholder="blur"
  blurDataURL={placeholders['hero-sketch.png']}
  {...otherProps}
/>
```

**Benefits:**
- ✅ Perceived performance: Instant preview
- ✅ CLS: Prevented during image load
- ✅ UX: Professional loading experience

---

## ⚛️ PRIORITY 2: React Performance Optimization

**Impact:** -0.5-1s TTI, -50-100ms TBT  
**Time:** 3-4 hours  
**Difficulty:** Medium-High

### Task 2.1: Memoize Heavy Components

**File:** `components/sections/services-section.tsx`

```tsx
import { memo, useMemo, useCallback } from 'react'

// Memoize expensive calculations
const serviceTags = useMemo(() => [
  { id: "longevity-tech", label: "...", ... },
  // ... rest of tags
], []) // Empty deps = calculate once

// Memoize event handlers
const handleTagHover = useCallback((tagId: string | null) => {
  setHoveredTag(tagId)
}, [])

// Memoize filter function
const filteredTherapies = useMemo(() => {
  return therapies.filter(therapy => {
    // filter logic
  })
}, [therapies, activeFilters])

// Memoize component
export const ServicesSection = memo(function ServicesSection() {
  // component code
})
```

**Apply to:**
- `services-section.tsx`
- `membership-section.tsx`
- `gallery-section.tsx`
- `concept-section.tsx`

**Benefits:**
- ✅ TTI: -0.3-0.5s
- ✅ TBT: -30-50ms
- ✅ Smoother scrolling
- ✅ Better battery life

---

### Task 2.2: Optimize Animation Performance

**File:** `hooks/use-device-capabilities.ts`

```tsx
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isLowEnd: false,
    prefersReducedMotion: false,
    connectionSpeed: 'fast',
  })

  useEffect(() => {
    // Detect device capabilities
    const connection = (navigator as any).connection
    const effectiveType = connection?.effectiveType || '4g'
    
    const isLowEnd = 
      navigator.hardwareConcurrency <= 4 ||
      (performance as any).memory?.jsHeapSizeLimit < 1000000000 ||
      effectiveType === '2g' || effectiveType === '3g'

    const prefersReducedMotion = 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setCapabilities({
      isLowEnd,
      prefersReducedMotion,
      connectionSpeed: effectiveType,
    })
  }, [])

  return {
    ...capabilities,
    // Derived flags
    shouldRenderShader: !capabilities.isLowEnd && !capabilities.prefersReducedMotion,
    shouldEnableComplexAnimations: !capabilities.isLowEnd,
    imageQuality: capabilities.isLowEnd ? 70 : 85,
  }
}
```

**Update components to use:**
```tsx
const { shouldEnableComplexAnimations } = useDeviceCapabilities()

// Conditional animation
<motion.div
  animate={shouldEnableComplexAnimations ? complexAnimation : simpleAnimation}
>
```

**Benefits:**
- ✅ TBT: -50-100ms on low-end devices
- ✅ Battery: Significantly better
- ✅ Smooth: 60fps on all devices

---

### Task 2.3: Add Skeleton Screens

**File:** `components/skeleton.tsx` (already exists)

**Enhance existing skeleton:**
```tsx
export function HeroSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-48 bg-muted rounded" />
      <div className="h-20 w-full max-w-3xl bg-muted rounded" />
      <div className="h-6 w-96 bg-muted rounded" />
      <div className="flex gap-3">
        <div className="h-12 w-40 bg-muted rounded" />
        <div className="h-12 w-40 bg-muted rounded" />
      </div>
    </div>
  )
}

export function ServicesSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="h-32 bg-muted animate-pulse rounded" />
      ))}
    </div>
  )
}
```

**Use in sections:**
```tsx
const [isLoading, setIsLoading] = useState(true)

return (
  <section>
    {isLoading ? <ServicesSkeleton /> : <ServicesContent />}
  </section>
)
```

**Benefits:**
- ✅ Perceived performance: Feels instant
- ✅ CLS: Prevented during loading
- ✅ UX: Users know something is happening

---

## 📦 PRIORITY 2B: Bundle Size Reduction

**Impact:** -50-100 KB, -0.2-0.5s TTI  
**Time:** 2-3 hours  
**Difficulty:** Medium

### Task 2.4: Analyze Bundle Composition

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Update next.config.mjs
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig = {
  // ... existing config
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

This opens an interactive visualization showing:
- Largest packages
- Duplicate dependencies
- Unused code

**Take action based on findings:**
- Remove unused dependencies
- Replace heavy libraries with lighter alternatives
- Further code split large modules

---

### Task 2.5: Optimize Tailwind CSS

**File:** `tailwind.config.ts` or `tailwind.config.js`

```ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  // Remove unused utilities
  safelist: [
    // Only safelist classes used dynamically
    'text-[#6B8E23]',
    'bg-[#6B8E23]',
  ],
  
  theme: {
    extend: {
      // Keep only what you use
    },
  },
  
  plugins: [],
  
  // Optimize for production
  mode: 'jit',
  corePlugins: {
    // Disable unused features
    preflight: true,
    container: false, // If not using
    float: false, // If not using
  },
}

export default config
```

**Add PurgeCSS:**
```bash
npm install --save-dev @fullhuman/postcss-purgecss
```

**File:** `postcss.config.mjs`
```js
import purgecss from '@fullhuman/postcss-purgecss'

export default {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    ...(process.env.NODE_ENV === 'production' 
      ? [purgecss({
          content: [
            './app/**/*.{js,ts,jsx,tsx}',
            './components/**/*.{js,ts,jsx,tsx}',
          ],
          safelist: ['html', 'body'],
        })]
      : []),
  ],
}
```

**Benefits:**
- ✅ CSS size: -30-50%
- ✅ FCP: -0.1-0.2s
- ✅ Transfer: -20-30 KB

---

### Task 2.6: Tree Shake Unused Exports

**File:** `components/index.ts` (create barrel export)

```ts
// Don't export everything from one file
// Instead, import directly where needed

// BAD (causes larger bundles)
export * from './custom-cursor'
export * from './shader-wrapper'
export * from './dna-helix'

// GOOD (allows tree shaking)
// Import directly:
// import { CustomCursor } from '@/components/custom-cursor'
```

**Update imports:**
```tsx
// Keep specific imports (current approach is good)
import { CustomCursor } from "@/components/custom-cursor"
import { MagneticButton } from "@/components/magnetic-button"
```

**Benefits:**
- ✅ Bundle: -20-40 KB
- ✅ Build time: Faster
- ✅ Better tree shaking

---

## 🎨 PRIORITY 3: CSS & Rendering Optimization

**Impact:** -0.3-0.5s FCP, -50ms TBT  
**Time:** 2-3 hours  
**Difficulty:** Medium

### Task 2.7: Extract Critical CSS

**File:** `app/layout.tsx`

```tsx
// Critical CSS for above-the-fold content
const criticalCSS = `
  :root { 
    --background: oklch(0.96 0.01 85);
    --foreground: oklch(0.25 0.02 85);
    --primary: oklch(0.45 0.08 145);
  }
  
  body {
    background: var(--background);
    color: var(--foreground);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  
  /* Hero section basics */
  .hero-heading {
    font-size: clamp(2rem, 5vw, 6rem);
    line-height: 1.1;
  }
  
  /* Above-the-fold only */
  nav { /* critical nav styles */ }
`

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Inline critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

**Benefits:**
- ✅ FCP: -0.2-0.4s
- ✅ No render-blocking CSS
- ✅ Progressive rendering

---

### Task 2.8: Optimize Custom Cursor for Mobile

**File:** `components/custom-cursor.tsx`

```tsx
import { useMediaQuery } from '@/hooks/use-media-query'

export function CustomCursor() {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const hasHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  
  // Don't render on mobile/touch devices
  if (isMobile || !hasHover) {
    return null
  }
  
  // Rest of cursor logic
}
```

**Benefits:**
- ✅ Mobile bundle: -15-20 KB
- ✅ Mobile CPU: Less work
- ✅ Better touch experience

---

## 💾 PRIORITY 3: Caching & Service Worker

**Impact:** Instant repeat visits, offline support  
**Time:** 2-3 hours  
**Difficulty:** Medium-High

### Task 2.9: Implement Service Worker

**File:** `public/sw.js`

```js
const CACHE_NAME = 'hamaria-v1'
const STATIC_ASSETS = [
  '/',
  '/globals.css',
  '/hero-sketch.webp',
  // Add critical assets
]

// Install - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
})

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
})
```

**File:** `app/layout.tsx` (register service worker)

```tsx
useEffect(() => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('SW registered:', reg))
      .catch((err) => console.log('SW failed:', err))
  }
}, [])
```

**Benefits:**
- ✅ Repeat visits: < 1 second
- ✅ Offline support: Basic functionality
- ✅ Bandwidth: 90% savings on repeat
- ✅ UX: Near-instant for returning users

---

### Task 2.10: Add Resource Hints

**File:** `app/layout.tsx`

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://t.contentsquare.net" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          as="image"
          href="/hero-sketch.webp"
          imageSrcSet="/hero-sketch-375w.webp 375w, /hero-sketch-768w.webp 768w"
          imageSizes="(max-width: 768px) 65vw, 50vw"
        />
        
        {/* Prefetch next likely navigation */}
        <link rel="prefetch" href="/membership" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Benefits:**
- ✅ LCP: -0.2-0.4s (earlier image load)
- ✅ Navigation: Instant feel
- ✅ Third-party: Faster connection

---

## 🔧 PRIORITY 4: Advanced Optimizations

**Impact:** -0.2-0.5s overall, polish  
**Time:** 2-3 hours  
**Difficulty:** High

### Task 2.11: Implement Virtual Scrolling

For long lists (therapies, etc.):

```bash
npm install react-window
```

**File:** `components/filtered-services.tsx`

```tsx
import { FixedSizeList } from 'react-window'

<FixedSizeList
  height={600}
  itemCount={filteredTherapies.length}
  itemSize={100}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <TherapyCard therapy={filteredTherapies[index]} />
    </div>
  )}
</FixedSizeList>
```

**Benefits:**
- ✅ TBT: -20-40ms
- ✅ Memory: Less DOM nodes
- ✅ Scrolling: Smooth even with 100+ items

---

### Task 2.12: Optimize Intersection Observer

**File:** `hooks/use-reveal.ts`

```tsx
export function useReveal(threshold = 0.3) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Optimize observer options
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing after first reveal
        }
      },
      { 
        threshold,
        rootMargin: '50px', // Load slightly before visible
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
```

**Benefits:**
- ✅ Performance: Less observer overhead
- ✅ Battery: Disconnects when done
- ✅ Smooth: Earlier loading

---

### Task 2.13: Reduce Third-Party Impact

**File:** `app/layout.tsx`

```tsx
// Load analytics only after user interaction
const [analyticsEnabled, setAnalyticsEnabled] = useState(false)

useEffect(() => {
  // Enable after first scroll or click
  const enableAnalytics = () => {
    setAnalyticsEnabled(true)
    window.removeEventListener('scroll', enableAnalytics)
    window.removeEventListener('click', enableAnalytics)
  }
  
  window.addEventListener('scroll', enableAnalytics, { once: true })
  window.addEventListener('click', enableAnalytics, { once: true })
  
  // Or after 3 seconds
  setTimeout(enableAnalytics, 3000)
}, [])

return (
  <>
    {analyticsEnabled && (
      <>
        <Script src="https://www.clarity.ms/..." strategy="lazyOnload" />
        <Script src="https://t.contentsquare.net/..." strategy="lazyOnload" />
      </>
    )}
  </>
)
```

**Benefits:**
- ✅ TBT: -50-80ms
- ✅ TTI: -0.3-0.5s
- ✅ Bandwidth: Saved for non-interactive users

---

## 🎨 CSS Optimization Deep Dive

### Task 2.14: Remove Unused Tailwind Classes

**Create:** `.purgecss-safelist.txt`
```
text-\[#6B8E23\]
bg-\[#6B8E23\]
border-\[#6B8E23\]
// Add dynamically used classes
```

**Update:** `postcss.config.mjs`
```js
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  plugins: [
    tailwindcss,
    autoprefixer,
    ...(process.env.NODE_ENV === 'production' 
      ? [cssnano({ preset: 'default' })]
      : []),
  ],
}
```

**Benefits:**
- ✅ CSS: -30-40%
- ✅ FCP: -0.1-0.2s

---

### Task 2.15: Inline Critical CSS

**File:** `app/layout.tsx`

```tsx
const criticalCSS = `
  /* Only essential above-the-fold styles */
  :root{--background:oklch(0.96 0.01 85);--foreground:oklch(0.25 0.02 85)}
  body{background:var(--background);color:var(--foreground);margin:0;padding:0}
  .hero-heading{font-size:clamp(2rem,5vw,6rem);line-height:1.1;font-weight:300}
  nav{position:fixed;top:0;left:0;right:0;z-index:50;backdrop-filter:blur(12px)}
`

<head>
  <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
  {/* Main CSS loads async */}
</head>
```

**Benefits:**
- ✅ FCP: -0.2-0.3s
- ✅ No render blocking CSS
- ✅ Progressive rendering

---

## 🧪 Testing Strategy

### After Each Task

1. **Local test:**
   ```bash
   npm run build
   npm start
   ```

2. **Lighthouse audit:**
   - Chrome DevTools → Lighthouse
   - Mobile + Performance
   - Compare scores

3. **Real device test:**
   - Test on actual iPhone/Android
   - Use slow network throttling

4. **Deploy & verify:**
   ```bash
   git commit -m "perf: [task description]"
   git push
   # Wait for Netlify
   # Run PageSpeed Insights
   ```

---

## 📈 Progressive Score Targets

### After Image Optimization (Tasks 1.1-1.4)
- **Target:** 75-85
- **LCP:** < 3s
- **Key improvement:** Hero image

### After React Optimization (Tasks 2.1-2.3)
- **Target:** 85-90
- **TTI:** < 3.5s
- **Key improvement:** Interactivity

### After Bundle Optimization (Tasks 2.4-2.6)
- **Target:** 90-93
- **TBT:** < 150ms
- **Key improvement:** JavaScript execution

### After Advanced Optimization (Tasks 2.7-2.15)
- **Target:** 93-97
- **All metrics:** Green
- **Key improvement:** Polish and fine-tuning

---

## 📋 Implementation Checklist

### Day 1: Image Optimization
- [ ] Compress hero-sketch.png to WebP (< 100 KB)
- [ ] Generate responsive image sizes (375w, 768w, 1920w)
- [ ] Convert to Next.js Image component (hero)
- [ ] Add blur placeholders
- [ ] Lazy load gallery images
- [ ] Test & deploy
- [ ] Run PageSpeed (expect 75-85)

### Day 2: React & Bundle Optimization
- [ ] Add memoization to sections
- [ ] Optimize animation based on device
- [ ] Add skeleton screens
- [ ] Run bundle analyzer
- [ ] Optimize Tailwind CSS
- [ ] Test & deploy
- [ ] Run PageSpeed (expect 85-90)

### Day 3: Advanced & Polish
- [ ] Implement service worker
- [ ] Add resource hints
- [ ] Virtual scrolling for lists
- [ ] Optimize Intersection Observer
- [ ] Inline critical CSS
- [ ] Test & deploy
- [ ] Run PageSpeed (expect 90-95+)

---

## 🎯 Success Metrics

### Technical KPIs
| Metric | Phase 1 | Phase 2 Target | Stretch Goal |
|--------|---------|----------------|--------------|
| Performance Score | 65-75 | **90+** | 95+ |
| LCP | 3-4s | **< 2.5s** | < 1.8s |
| TBT | 300-400ms | **< 200ms** | < 100ms |
| CLS | 0.1-0.15 | **< 0.1** | < 0.05 |
| FCP | 2-3s | **< 1.8s** | < 1.2s |
| Speed Index | 4-5s | **< 3.4s** | < 2.5s |

### Business KPIs
- **Bounce Rate:** < 40%
- **Time on Site:** > 2 minutes
- **Pages per Session:** > 3
- **Conversion Rate:** > 2%
- **Mobile Traffic:** Increasing

---

## 🛠️ Tools & Resources

### Essential Tools
1. **Squoosh** - https://squoosh.app (image compression)
2. **Sharp** - https://sharp.pixelplumbing.com (programmatic images)
3. **Bundle Analyzer** - Visual bundle analysis
4. **Lighthouse** - Chrome DevTools performance
5. **WebPageTest** - https://webpagetest.org (alternative testing)

### npm Packages Needed
```bash
npm install --save-dev @next/bundle-analyzer
npm install --save-dev sharp-cli
npm install --save-dev plaiceholder
npm install --save-dev cssnano
npm install react-window # For virtual scrolling
```

### Testing URLs
- PageSpeed: https://pagespeed.web.dev
- GTmetrix: https://gtmetrix.com
- WebPageTest: https://webpagetest.org
- Lighthouse: Chrome DevTools

---

## 🎬 Quick Start Guide

### Start Phase 2 Today

**Step 1: Compress Hero Image (15 min)**
```bash
# Option 1: Manual (easiest)
1. Go to https://squoosh.app
2. Upload /public/hero-sketch.png
3. Select WebP, quality 85
4. Download, rename to hero-sketch.webp
5. Replace in /public folder

# Option 2: CLI (automated)
npm install -g @squoosh/cli
cd public
squoosh-cli --webp '{"quality":85}' hero-sketch.png
```

**Step 2: Update Image Reference (5 min)**
```tsx
// In app/page.tsx
// Change src="/hero-sketch.png" 
// to src="/hero-sketch.webp"
```

**Step 3: Test & Deploy (10 min)**
```bash
npm run build # Verify works
git add .
git commit -m "perf: compress hero image to WebP"
git push
```

**Step 4: Re-test (5 min)**
Wait for deploy, then run PageSpeed again.

**Expected: +5-8 point improvement just from this!**

---

## 📊 Tracking Progress

### Create Baseline
After each optimization:

```markdown
## Performance Log

### Baseline (Phase 1)
- Date: Nov 11, 2025
- Performance: 65-75
- LCP: 3-4s
- Notes: Code splitting applied

### After Image Optimization
- Date: Nov 12, 2025
- Performance: 78-82 (+10-15)
- LCP: 2.5-3s (-0.5-1s)
- Notes: Hero WebP, lazy gallery

### After React Optimization
- Date: Nov 13, 2025
- Performance: 88-92 (+10)
- TTI: 3s (-1s)
- Notes: Memoization, skeletons

### Final (Phase 2 Complete)
- Date: Nov 14, 2025
- Performance: 93-97
- All metrics: Green ✅
- Notes: All optimizations applied
```

---

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Over-Optimization
**Problem:** Breaking UX for marginal gains

**Solution:** Test on real devices, prioritize UX over scores

### Pitfall 2: Premature Optimization
**Problem:** Optimizing before measuring

**Solution:** Always run PageSpeed first, target biggest issues

### Pitfall 3: Image Quality Loss
**Problem:** Over-compressing images

**Solution:** Compare side-by-side, maintain quality > 80

### Pitfall 4: Breaking Features
**Problem:** Lazy loading breaks interaction

**Solution:** Test thoroughly, use feature flags

### Pitfall 5: Cache Invalidation
**Problem:** Users see old content

**Solution:** Version assets, use service worker wisely

---

## 🎯 Phase 2 vs Phase 3

### Phase 2 (This Plan) - Target 90+
**Focus:** Core optimizations that matter
- Image optimization
- React performance
- Bundle size
- Basic caching

**Effort:** 6-9 hours over 2-3 days  
**Gain:** +20-25 points  
**ROI:** Excellent  

### Phase 3 (Advanced) - Target 95+
**Focus:** Fine-tuning and edge cases
- Web Workers
- Advanced caching
- HTTP/3 and Early Hints
- Micro-optimizations

**Effort:** 10-15 hours over 1 week  
**Gain:** +5-10 points  
**ROI:** Moderate (diminishing returns)

**Recommendation:** Complete Phase 2, assess if Phase 3 needed

---

## 📈 Expected Timeline

### Week 1 (Now)
- ✅ Phase 1 complete (quick wins)
- ⏳ Phase 1 deployed
- ⏳ Baseline PageSpeed results

### Week 2 (Next Week)
- Day 1: Image optimization
- Day 2: React optimization
- Day 3: Advanced features
- End of week: Score 90+

### Week 3 (Optional)
- Monitor real user metrics
- Fine-tune based on data
- Implement Phase 3 if needed
- Achieve 95+ if targeting perfection

---

## 🏆 Definition of Success

### Minimum Viable (Deploy Phase 2)
- [ ] Performance score > 85
- [ ] No functionality broken
- [ ] All images load properly
- [ ] No console errors

### Target Success (Phase 2 Complete)
- [ ] Performance score > 90
- [ ] All Core Web Vitals: Green
- [ ] LCP < 2.5s
- [ ] TBT < 200ms
- [ ] CLS < 0.1

### Stretch Goal (Beyond Phase 2)
- [ ] Performance score > 95
- [ ] LCP < 1.8s
- [ ] All metrics optimal
- [ ] Real user monitoring shows improvement

---

## 💡 Strategic Recommendations

### Do First (Highest ROI)
1. ✅ Compress hero image (15 min, +8 points)
2. ✅ Add Next.js Image (30 min, +5 points)
3. ✅ Lazy load gallery (20 min, +3 points)
4. ✅ Memoize components (1 hour, +5 points)

### Do Second (Good ROI)
5. Add skeleton screens (1 hour, +3 points)
6. Optimize CSS (1 hour, +2 points)
7. Resource hints (30 min, +2 points)

### Do Last (Polish)
8. Service worker (2 hours, +2 points repeat visits)
9. Virtual scrolling (1 hour, +1 point)
10. Advanced optimizations (2 hours, +1-2 points)

---

## 📞 Communication Plan

### After Each Major Task
Share:
1. What was implemented
2. PageSpeed results
3. Any issues encountered
4. Next task to tackle

### Weekly Summary
- Total points gained
- Remaining targets
- Blockers/challenges
- Adjusted timeline

---

## 🎁 Bonus Optimizations

### If Time Permits
1. **Implement blur-up loading** for premium feel
2. **Add loading states** for all interactions
3. **Optimize SVG files** (yoga icon, etc.)
4. **Implement request batching** for API calls
5. **Add error boundaries** for resilience
6. **Setup monitoring dashboard** for ongoing tracking

---

## 📝 Files to Create/Modify

### Create New
- [ ] `scripts/generate-placeholders.mjs` - Blur placeholders
- [ ] `lib/image-placeholders.json` - Blur data
- [ ] `public/sw.js` - Service worker
- [ ] `.lighthouserc.json` - Performance budget

### Modify Existing
- [ ] `app/page.tsx` - Next.js Image, optimizations
- [ ] `app/layout.tsx` - Resource hints, critical CSS
- [ ] `next.config.mjs` - Fine-tune image config
- [ ] `components/sections/*.tsx` - Memoization
- [ ] `hooks/use-device-capabilities.ts` - Enhanced detection
- [ ] `tailwind.config.ts` - Purge unused
- [ ] `postcss.config.mjs` - Add cssnano

---

## 🔄 Iteration Strategy

### Optimize → Test → Deploy → Measure → Repeat

```
1. Implement optimization
   ↓
2. Test locally (npm run build)
   ↓
3. Lighthouse audit (DevTools)
   ↓
4. Fix any issues
   ↓
5. Commit & push
   ↓
6. Wait for deploy (5 min)
   ↓
7. Run PageSpeed Insights
   ↓
8. Record scores
   ↓
9. Identify next bottleneck
   ↓
10. Repeat
```

**Continue until:** All metrics green OR diminishing returns

---

## 🎯 Final Target (End of Phase 2)

### Mobile Performance
```
Performance:  92-95 ✅
Accessibility: 95+ ✅
Best Practices: 100 ✅
SEO: 100 ✅

Core Web Vitals:
├─ LCP: 2.2s ✅ (Good)
├─ FID: 45ms ✅ (Good)
├─ CLS: 0.06 ✅ (Good)
├─ FCP: 1.5s ✅
├─ TTI: 3.2s ✅
└─ Speed Index: 2.8s ✅
```

### Desktop Performance
```
Performance: 95-98 ✅
LCP: 1.5s ✅
TBT: 50ms ✅
CLS: 0.03 ✅
```

---

## 🚀 Ready to Execute

Phase 2 is ready to implement. The plan is comprehensive, actionable, and proven.

**Estimated Timeline:**
- **Fastest:** 1 day (full focus)
- **Realistic:** 2-3 days (normal pace)
- **Comfortable:** 1 week (thorough testing)

**Start with:** Image compression (15 minutes, highest ROI)

**End with:** 90+ Performance score, all green metrics! 🎉

---

## 📞 Let's Begin!

Once you share the Phase 1 PageSpeed results, we'll:
1. Confirm baseline scores
2. Identify actual bottlenecks
3. Start with highest-impact optimizations
4. Work systematically through the checklist
5. Achieve 90+ Performance score

**The foundation is solid (Phase 1 complete). Phase 2 will take us to excellence!** ✨

