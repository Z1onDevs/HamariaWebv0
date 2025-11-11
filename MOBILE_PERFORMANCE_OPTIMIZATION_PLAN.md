# Mobile Performance Optimization Plan 📱⚡

## Current Status
PageSpeed Insights test encountered a timeout error, indicating potential performance issues that need addressing.

**Error:** `RPC::DEADLINE_EXCEEDED: context deadline exceeded`  
**Chrome UX Report:** No real-world data available yet (new domain)

---

## 🎯 Optimization Strategy

Based on the site architecture (Next.js 15 + WebGL shaders + animations + images), here's a comprehensive plan to achieve optimal PageSpeed scores.

---

## 1. Critical Performance Metrics to Optimize

### Core Web Vitals Targets
| Metric | Target (Mobile) | Current | Priority |
|--------|----------------|---------|----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Unknown | 🔴 Critical |
| **FID** (First Input Delay) | < 100ms | Unknown | 🔴 Critical |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Unknown | 🔴 Critical |
| **FCP** (First Contentful Paint) | < 1.8s | Unknown | 🟡 Important |
| **TTI** (Time to Interactive) | < 3.8s | Unknown | 🟡 Important |
| **TBT** (Total Blocking Time) | < 200ms | Unknown | 🟡 Important |

---

## 2. Image Optimization 🖼️

### Current Issues (Likely)
- ✗ Hero sketch image: Unoptimized PNG
- ✗ Gallery images: Not lazy loaded
- ✗ No responsive image sizes
- ✗ No modern image formats (WebP/AVIF)

### Solutions

#### A. Optimize Hero Sketch Image
```bash
# Current: hero-sketch.png (likely large)
# Target: < 100KB for mobile

# Generate WebP versions
npx @squoosh/cli --webp auto public/hero-sketch.png

# Generate multiple sizes
npx sharp-cli resize 375 --input hero-sketch.png --output hero-sketch-mobile.webp
npx sharp-cli resize 768 --input hero-sketch.png --output hero-sketch-tablet.webp
npx sharp-cli resize 1920 --input hero-sketch.png --output hero-sketch-desktop.webp
```

#### B. Implement Next.js Image Component
**File:** `app/page.tsx`

```tsx
// Replace current img tags with Next.js Image
import Image from 'next/image'

// Hero sketch - Mobile
<div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden">
  <div className="absolute left-1/2 top-[30%] ...">
    <Image
      src="/hero-sketch.png"
      alt=""
      width={800}
      height={600}
      priority // LCP element
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,..." // Add blur placeholder
      sizes="(max-width: 768px) 65vw, (max-width: 1024px) 70vw, 50vw"
    />
  </div>
</div>

// Desktop version
<div className="pointer-events-none absolute top-28 right-0 hidden lg:block">
  <Image
    src="/hero-sketch.png"
    alt=""
    width={700}
    height={800}
    priority // Above fold
    quality={90}
    sizes="(min-width: 1024px) 42vw, (min-width: 1280px) 46vw, 40vw"
  />
</div>
```

#### C. Gallery Images Optimization
```tsx
// Lazy load all gallery images
<Image
  src={imageSrc}
  alt={imageAlt}
  width={800}
  height={600}
  loading="lazy" // Not priority
  quality={80}
  placeholder="blur"
/>
```

**Impact:** 
- ✅ LCP improvement: 1-2 seconds
- ✅ FCP improvement: 0.5-1 second
- ✅ Bandwidth savings: 60-80%

---

## 3. JavaScript Bundle Optimization 📦

### Current Issues (Likely)
- ✗ Large initial bundle size
- ✗ Shader code not code-split
- ✗ All components loaded upfront
- ✗ No dynamic imports

### Solutions

#### A. Implement Dynamic Imports
**File:** `app/page.tsx`

```tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
const ShaderWrapper = dynamic(
  () => import('@/components/shader-wrapper'),
  { 
    ssr: false, // Don't render on server
    loading: () => <div className="animate-pulse bg-gradient-to-br from-background via-background to-primary/5" />
  }
)

const DNAHelix = dynamic(
  () => import('@/components/dna-helix'),
  { ssr: false }
)

const GrainOverlay = dynamic(
  () => import('@/components/grain-overlay'),
  { ssr: false }
)

// Use in component
{shouldRenderShader && <ShaderWrapper />}
```

#### B. Code Split Services Modal
```tsx
const FilteredServices = dynamic(
  () => import('@/components/filtered-services'),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

// Only load when modal opens
{isModalOpen && <FilteredServices />}
```

#### C. Optimize Font Loading
**File:** `app/layout.tsx`

```tsx
import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap", // FOUT instead of FOIT
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true, // Prevent CLS
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only load when needed
})
```

**Impact:**
- ✅ Initial bundle: -200-400 KB
- ✅ TTI improvement: 1-2 seconds
- ✅ TBT improvement: 100-200ms

---

## 4. Render Blocking Resources ⚡

### Current Issues (Likely)
- ✗ CSS not inlined for critical path
- ✗ Web fonts blocking render
- ✗ Multiple CSS files

### Solutions

#### A. Inline Critical CSS
**File:** `app/layout.tsx`

```tsx
// Extract critical CSS for above-the-fold content
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        {/* Other styles load async */}
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### B. Preload Key Resources
```tsx
<head>
  {/* Preload hero image */}
  <link
    rel="preload"
    as="image"
    href="/hero-sketch.webp"
    imageSrcSet="/hero-sketch-mobile.webp 375w, /hero-sketch-tablet.webp 768w"
  />
  
  {/* Preload critical fonts */}
  <link
    rel="preload"
    href="/fonts/geist.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  
  {/* Preconnect to external domains */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
</head>
```

**Impact:**
- ✅ FCP improvement: 0.3-0.5 seconds
- ✅ LCP improvement: 0.5-1 second

---

## 5. Third-Party Scripts 🔌

### Current Issues (Likely)
- ✗ Microsoft Clarity loaded synchronously
- ✗ Blocking main thread

### Solutions

#### A. Load Analytics Asynchronously
**File:** `app/layout.tsx`

```tsx
// Use Next.js Script component with optimal strategy
import Script from 'next/script'

<Script
  id="clarity-analytics"
  strategy="afterInteractive" // Load after page interactive
  dangerouslySetInnerHTML={{
    __html: `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window,document,"clarity","script","your-id");
    `
  }}
/>
```

**Impact:**
- ✅ TBT improvement: 50-100ms
- ✅ TTI improvement: 0.2-0.5 seconds

---

## 6. Cumulative Layout Shift (CLS) Prevention 🎨

### Current Issues (Likely)
- ✗ Images without dimensions
- ✗ Dynamic content causing shifts
- ✗ Font loading causing reflows

### Solutions

#### A. Reserve Space for Images
```tsx
// Always specify dimensions
<Image
  src="/hero-sketch.png"
  alt=""
  width={700}  // Actual dimensions
  height={800}
  // This reserves space, prevents CLS
/>
```

#### B. Font Display Swap with Fallback Metrics
```css
@font-face {
  font-family: 'Geist';
  font-display: swap;
  /* Use font-metrics override to match fallback */
  ascent-override: 95%;
  descent-override: 25%;
  line-gap-override: 0%;
  size-adjust: 100%;
}
```

#### C. Skeleton Screens
```tsx
// Add skeleton for loading states
{isLoading && <ServicesSkeleton />}
{!isLoading && <ServicesContent />}
```

**Impact:**
- ✅ CLS: 0.1 or less (optimal)
- ✅ Better perceived performance

---

## 7. Mobile-Specific Optimizations 📱

### A. Disable Expensive Features on Mobile

**File:** `hooks/use-device-capabilities.ts` (update)

```tsx
export function useDeviceCapabilities() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isSlowNetwork = useMediaQuery('(prefers-reduced-data: reduce)')
  
  return {
    shouldRenderShader: !isMobile && !isLowEnd && !prefersReducedMotion,
    shouldEnableAnimations: !isMobile || !prefersReducedMotion,
    imageQuality: isMobile ? 70 : 85,
    shouldPreload: !isMobile && !isSlowNetwork,
  }
}
```

### B. Reduce Animation Complexity
```tsx
// Simpler animations on mobile
const animationDuration = isMobile ? '0.3s' : '0.5s'
const shouldUseComplexAnimation = !isMobile
```

### C. Lazy Load Below-the-Fold Content
```tsx
// Use Intersection Observer
const { ref, isVisible } = useInView({ 
  threshold: 0,
  triggerOnce: true,
  rootMargin: '200px' // Load 200px before viewport
})

<section ref={ref}>
  {isVisible && <HeavyComponent />}
</section>
```

**Impact:**
- ✅ Initial load: 40-60% faster
- ✅ Battery life: Improved
- ✅ Data usage: Reduced

---

## 8. Server-Side Optimizations 🖥️

### A. Enable Compression
**File:** `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, // Enable gzip compression
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 414, 640, 768, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Optimize output
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
```

### B. Add Caching Headers
**File:** `next.config.mjs`

```js
async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ]
},
```

**Impact:**
- ✅ Repeat visits: 2-3x faster
- ✅ Server load: Reduced
- ✅ Bandwidth: 70-80% savings

---

## 9. Critical Rendering Path Optimization 🚀

### A. Reduce Main Thread Work

**Current:** WebGL shader + animations blocking main thread  
**Solution:** Offload to Web Worker

```tsx
// Move shader calculations to worker
const shaderWorker = new Worker(
  new URL('../workers/shader.worker.ts', import.meta.url)
)

// Communicate via postMessage
shaderWorker.postMessage({ type: 'calculate', data })
```

### B. Optimize React Rendering
```tsx
// Memoize expensive components
const MemoizedShader = memo(ShaderWrapper, (prev, next) => {
  return prev.scrollProgress === next.scrollProgress
})

// Use useMemo for heavy calculations
const processedData = useMemo(() => {
  return expensiveCalculation(data)
}, [data])

// Use useCallback for event handlers
const handleScroll = useCallback((e) => {
  // handler logic
}, [])
```

**Impact:**
- ✅ TBT: -100-200ms
- ✅ TTI: -0.5-1 second
- ✅ Smoother scrolling

---

## 10. Netlify-Specific Optimizations ☁️

### A. Enable Edge Functions
**File:** `netlify.toml`

```toml
[[edge_functions]]
  path = "/*"
  function = "transform"

[build]
  command = "npm run build"
  publish = ".next"
  
[build.environment]
  NODE_VERSION = "23.3.0"
  
# Asset optimization
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Redirect rules
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
  
# Enable Asset Optimization
[build.processing]
  skip_processing = false
  
[build.processing.css]
  bundle = true
  minify = true
  
[build.processing.js]
  bundle = true
  minify = true
  
[build.processing.images]
  compress = true
```

### B. Use Netlify Image CDN
```tsx
// Update image URLs to use Netlify CDN
<Image
  src="/.netlify/images?url=/hero-sketch.png&w=800&q=85&fm=webp"
  alt=""
  width={800}
  height={600}
/>
```

**Impact:**
- ✅ Global CDN: Faster worldwide
- ✅ Auto-optimization: WebP/AVIF
- ✅ Edge caching: Near-instant

---

## 11. Monitoring & Measurement 📊

### A. Add Performance Monitoring
**File:** `app/layout.tsx`

```tsx
// Web Vitals reporting
export function reportWebVitals(metric: any) {
  // Send to analytics
  if (window.clarity) {
    window.clarity('event', 'web_vital', {
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
    })
  }
  
  // Log to console in dev
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }
}
```

### B. Create Performance Budget
```json
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "preset": "mobile"
      }
    },
    "assert": {
      "assertions": {
        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }],
        "speed-index": ["error", { "maxNumericValue": 3400 }],
        "interactive": ["error", { "maxNumericValue": 3800 }]
      }
    }
  }
}
```

---

## 12. Implementation Priority 🎯

### Phase 1: Critical (Week 1)
**Goal:** Fix timeout issue, get initial score

1. ✅ Optimize hero image (WebP, responsive sizes)
2. ✅ Add Next.js Image component everywhere
3. ✅ Dynamic import for ShaderWrapper
4. ✅ Load Clarity async
5. ✅ Add image dimensions to prevent CLS

**Expected Impact:** 40-50 point improvement

### Phase 2: Important (Week 2)
**Goal:** Reach "Good" threshold (90+)

6. ✅ Code split all heavy components
7. ✅ Optimize font loading
8. ✅ Lazy load gallery images
9. ✅ Enable compression in next.config
10. ✅ Add caching headers

**Expected Impact:** 20-30 point improvement

### Phase 3: Optimization (Week 3)
**Goal:** Reach optimal (95+)

11. ✅ Implement Web Worker for shader
12. ✅ Add service worker for caching
13. ✅ Optimize React rendering (memo/useMemo)
14. ✅ Configure Netlify asset optimization
15. ✅ Setup performance monitoring

**Expected Impact:** 10-15 point improvement

---

## 13. Quick Wins (Implement Today) ⚡

### A. Hero Image Quick Fix
```bash
# Compress hero image
cd public
npx imageoptim-cli hero-sketch.png

# Or use online tool: squoosh.app
# Target: < 100KB for mobile
```

### B. Add Loading Attribute
```tsx
// Quick fix in page.tsx
<img 
  src="/hero-sketch.png" 
  alt=""
  loading="lazy"  // Add this
  decoding="async" // Add this
/>
```

### C. Defer Non-Critical Scripts
```tsx
// In layout.tsx
<Script
  src="https://www.clarity.ms/..."
  strategy="lazyOnload" // Change to this
/>
```

**Time:** 30 minutes  
**Impact:** 10-15 point improvement

---

## 14. Testing Checklist ✅

### Before Re-running PageSpeed

- [ ] Hero image optimized (< 100KB WebP)
- [ ] All images have width/height attributes
- [ ] ShaderWrapper loads conditionally/lazily
- [ ] Fonts use `font-display: swap`
- [ ] Analytics loaded with `strategy="afterInteractive"`
- [ ] Next.js Image component used for all images
- [ ] Compression enabled in next.config.mjs
- [ ] Build and deploy to production
- [ ] Wait 5 minutes after deploy
- [ ] Clear browser cache
- [ ] Re-run PageSpeed Insights

### Run Local Lighthouse Test
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run test
lighthouse https://hamaria.com --view --preset=mobile

# Or in Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to "Lighthouse" tab
# 3. Select "Mobile" + "Performance"
# 4. Click "Analyze page load"
```

---

## 15. Expected Results 🎯

### Before Optimization (Estimated)
- Performance: 40-60 (Poor)
- LCP: 4-6s
- TBT: 500-800ms
- CLS: 0.2-0.4
- Score: ⚠️ Needs Improvement

### After Phase 1
- Performance: 70-80 (Fair)
- LCP: 2.5-3.5s
- TBT: 200-400ms
- CLS: 0.1-0.15
- Score: ⚠️ Needs Improvement → 🟡 Fair

### After Phase 2
- Performance: 90-95 (Good)
- LCP: 1.8-2.5s
- TBT: 100-200ms
- CLS: 0.05-0.1
- Score: ✅ Good

### After Phase 3
- Performance: 95-100 (Excellent)
- LCP: < 1.8s
- TBT: < 100ms
- CLS: < 0.05
- Score: ✅ Excellent

---

## 16. Common Pitfalls to Avoid ⚠️

1. **Don't** load all images eagerly
2. **Don't** render heavy components on mobile
3. **Don't** use synchronous third-party scripts
4. **Don't** forget image dimensions (causes CLS)
5. **Don't** over-optimize at expense of UX
6. **Don't** block render with non-critical CSS
7. **Don't** skip testing on real devices
8. **Don't** forget about repeat visit performance

---

## 17. Resources & Tools 🛠️

### Testing Tools
- [PageSpeed Insights](https://pagespeed.web.dev)
- [Lighthouse CLI](https://github.com/GoogleChrome/lighthouse)
- [WebPageTest](https://www.webpagetest.org)
- [GTmetrix](https://gtmetrix.com)

### Image Optimization
- [Squoosh](https://squoosh.app)
- [ImageOptim](https://imageoptim.com)
- [Sharp CLI](https://sharp.pixelplumbing.com)

### Analysis
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance)

### Documentation
- [Next.js Performance](https://nextjs.org/docs/pages/building-your-application/optimizing/performance)
- [Web Vitals](https://web.dev/vitals/)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)

---

## 18. Next Steps 🚀

1. **Immediate (Today)**
   - Compress hero-sketch.png
   - Add loading="lazy" to images
   - Change Clarity to lazyOnload

2. **This Week**
   - Implement Next.js Image component
   - Add dynamic imports for heavy components
   - Optimize font loading

3. **Next Week**
   - Setup performance monitoring
   - Implement service worker
   - Configure Netlify optimization

4. **Ongoing**
   - Monitor real user metrics
   - Run monthly Lighthouse audits
   - Maintain performance budget

---

## Summary

The PageSpeed timeout indicates performance issues, but they're all fixable. By implementing this plan systematically, you should achieve:

✅ **Performance Score:** 95+ (Mobile)  
✅ **LCP:** < 1.8s  
✅ **FID/TBT:** < 100ms  
✅ **CLS:** < 0.05  
✅ **Overall:** Green across all metrics

**Start with Phase 1 quick wins today, and you'll see immediate improvements!**

