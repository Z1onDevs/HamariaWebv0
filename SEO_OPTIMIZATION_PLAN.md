# SEO Optimization Plan - Hamaria Club

## Executive Summary
This document outlines a comprehensive SEO optimization strategy for Hamaria Club's website. The plan addresses critical SEO gaps and provides a roadmap for implementation.

---

## Current State Analysis

### ✅ What's Working
- Next.js 15 with App Router (good foundation)
- Image optimization configured
- Performance optimizations (lazy loading, code splitting)
- Analytics integration (Clarity)
- Bilingual content (EN/ES)
- Responsive design

### ❌ Critical SEO Gaps
1. **No robots.txt** - Search engines have no crawling instructions
2. **No sitemap** - Search engines can't discover all pages
3. **No favicon/icons** - Poor brand recognition in search results
4. **Basic metadata** - Missing Open Graph, Twitter Cards, structured data
5. **Client-side rendering** - Main page is "use client", limiting SEO
6. **No dynamic metadata** - Membership pages lack unique meta tags
7. **Missing canonical URLs** - Risk of duplicate content issues
8. **No structured data** - Missing LocalBusiness, Service schema
9. **Lang attribute not dynamic** - Always "en" regardless of selected language
10. **No meta descriptions** - Search engines generate their own

---

## Phase 1: Critical SEO Foundations (Priority: HIGH)

### 1.1 Create robots.txt
**Location:** `/public/robots.txt`
**Purpose:** Control search engine crawling and indexing

```txt
# Allow all search engines
User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/

# Sitemap location
Sitemap: https://hamariaclub.com/sitemap.xml
```

**Estimated Time:** 5 minutes

---

### 1.2 Generate Dynamic Sitemap
**Location:** `/app/sitemap.ts`
**Purpose:** Help search engines discover all pages

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hamariaclub.com'
  const now = new Date()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]
  
  // Dynamic membership pages
  const membershipIds = ['wellness', 'focus', 'longevity']
  const membershipPages = membershipIds.flatMap(id => [
    {
      url: `${baseUrl}/membership/${id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/es/membership/${id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ])
  
  return [...staticPages, ...membershipPages]
}
```

**Estimated Time:** 15 minutes

---

### 1.3 Add Favicon and App Icons
**Location:** `/app/`
**Purpose:** Brand recognition in search results and browser tabs

Required files:
- `favicon.ico` (32x32)
- `icon.png` or `icon.svg` (used for PWA)
- `apple-icon.png` (180x180 for iOS)
- `opengraph-image.png` (1200x630 for social sharing)

**Next.js will automatically serve these from /app/ directory**

**Action Items:**
1. Create 32x32px favicon.ico with Hamaria logo
2. Create 512x512px icon.png (main app icon)
3. Create 180x180px apple-icon.png
4. Create 1200x630px opengraph-image.png (branded image with logo/tagline)

**Estimated Time:** 30 minutes (including design)

---

### 1.4 Enhanced Root Layout Metadata
**Location:** `/app/layout.tsx`
**Purpose:** Comprehensive metadata for home page

Update the metadata object to:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://hamariaclub.com'),
  title: {
    default: 'Hamaria Club - Luxury Wellness Center in Madrid',
    template: '%s | Hamaria Club'
  },
  description: 'Experience holistic wellness and rejuvenation at Madrid\'s premier luxury wellness center. Advanced therapies, personalized care, and transformative results. Opening Fall 2026.',
  keywords: [
    'luxury wellness center Madrid',
    'holistic wellness Madrid',
    'spa Madrid',
    'wellness retreat Spain',
    'longevity clinic Madrid',
    'biohacking Madrid',
    'recovery center Madrid',
    'float therapy Madrid',
    'cryotherapy Madrid',
    'red light therapy Madrid',
    'massage therapy Madrid',
    'wellness membership Madrid',
    'luxury spa membership',
    'holistic health Madrid',
    'wellness club Madrid'
  ],
  authors: [{ name: 'Hamaria Club' }],
  creator: 'Hamaria Club',
  publisher: 'Hamaria Club',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    url: 'https://hamariaclub.com',
    title: 'Hamaria Club - Luxury Wellness Center in Madrid',
    description: 'Experience holistic wellness and rejuvenation at Madrid\'s premier luxury wellness center. Advanced therapies, personalized care, and transformative results.',
    siteName: 'Hamaria Club',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Hamaria Club - Luxury Wellness Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamaria Club - Luxury Wellness Center in Madrid',
    description: 'Experience holistic wellness and rejuvenation at Madrid\'s premier luxury wellness center.',
    images: ['/opengraph-image.png'],
    creator: '@hamariaclub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}
```

**Estimated Time:** 20 minutes

---

### 1.5 Dynamic Language Support in HTML Tag
**Location:** `/app/layout.tsx`
**Issue:** HTML lang attribute is hardcoded to "en"

**Solution:** Make it dynamic based on language context

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Add script to set lang before hydration */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const lang = localStorage.getItem('language') || 'en';
                document.documentElement.lang = lang;
              })();
            `,
          }}
        />
      </head>
      {/* rest of component */}
    </html>
  )
}
```

**Alternative:** Create separate routes for languages (`/es/`, `/en/`)

**Estimated Time:** 30 minutes

---

## Phase 2: Dynamic Page Metadata (Priority: HIGH)

### 2.1 Metadata for Membership Detail Pages
**Location:** `/app/membership/[id]/page.tsx`
**Issue:** No metadata for dynamic pages

**Solution:** Add generateMetadata function

```typescript
import type { Metadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const membershipId = params.id
  
  // Get membership data (you'll need to import your translations)
  const membershipTitles = {
    wellness: 'Wellness Membership',
    focus: 'Focus Membership',
    longevity: 'Longevity Membership',
  }
  
  const membershipDescriptions = {
    wellness: 'Essential wellness therapies for balance and recovery. Massage, sauna, cryotherapy and more.',
    focus: 'Advanced cognitive and performance therapies. Optimize your mind and body.',
    longevity: 'Comprehensive longevity and biohacking program. Unlimited access to all therapies.',
  }
  
  const title = membershipTitles[membershipId] || 'Membership Details'
  const description = membershipDescriptions[membershipId] || 'Explore our membership options'
  
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Hamaria Club`,
      description,
      url: `https://hamariaclub.com/membership/${membershipId}`,
      images: ['/opengraph-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Hamaria Club`,
      description,
    },
    alternates: {
      canonical: `https://hamariaclub.com/membership/${membershipId}`,
      languages: {
        'en-US': `https://hamariaclub.com/membership/${membershipId}`,
        'es-ES': `https://hamariaclub.com/es/membership/${membershipId}`,
      },
    },
  }
}
```

**Estimated Time:** 45 minutes

---

## Phase 3: Structured Data Implementation (Priority: MEDIUM)

### 3.1 Add LocalBusiness Schema
**Location:** `/app/layout.tsx` or create `/components/structured-data.tsx`
**Purpose:** Help Google understand your business

```typescript
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  '@id': 'https://hamariaclub.com',
  name: 'Hamaria Club',
  description: 'Luxury wellness center offering advanced therapies for holistic health and longevity',
  url: 'https://hamariaclub.com',
  telephone: '+34-XXX-XXX-XXX',
  email: 'info@hamariaclub.com',
  priceRange: '€€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle del Retiro',
    addressLocality: 'Madrid',
    addressRegion: 'Madrid',
    postalCode: '28009',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '40.4168',
    longitude: '-3.7038',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/hamariaclub',
    'https://www.facebook.com/hamariaclub',
    'https://twitter.com/hamariaclub',
  ],
  hasMap: 'https://maps.google.com/?q=Hamaria+Club+Madrid',
}
```

Add to layout:
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
/>
```

**Estimated Time:** 30 minutes

---

### 3.2 Add Service Schema for Therapies
**Purpose:** Help Google understand your services

```typescript
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Wellness and Spa Services',
  provider: {
    '@type': 'HealthAndBeautyBusiness',
    name: 'Hamaria Club',
  },
  areaServed: {
    '@type': 'City',
    name: 'Madrid',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Wellness Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Massage Therapy',
          description: 'Professional massage therapy for relaxation and recovery',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cryotherapy',
          description: 'Advanced cryotherapy for recovery and wellness',
        },
      },
      // Add more services...
    ],
  },
}
```

**Estimated Time:** 45 minutes

---

### 3.3 Add Membership Offer Schema
**Location:** Membership pages
**Purpose:** Rich results for membership offerings

```typescript
const membershipSchema = {
  '@context': 'https://schema.org',
  '@type': 'MembershipOffer',
  name: 'Wellness Membership',
  description: 'Essential wellness therapies membership',
  price: '200',
  priceCurrency: 'EUR',
  billingDuration: 'P1M', // 1 month
  provider: {
    '@type': 'Organization',
    name: 'Hamaria Club',
  },
  category: 'Health & Wellness',
}
```

**Estimated Time:** 30 minutes

---

## Phase 4: Technical SEO Improvements (Priority: MEDIUM)

### 4.1 Implement Proper Canonical URLs
**Location:** All page components
**Purpose:** Prevent duplicate content issues

Add to metadata:
```typescript
alternates: {
  canonical: 'https://hamariaclub.com',
  languages: {
    'en-US': 'https://hamariaclub.com',
    'es-ES': 'https://hamariaclub.com/es',
  },
},
```

**Estimated Time:** 20 minutes

---

### 4.2 Add hreflang Tags for Multilingual SEO
**Purpose:** Tell Google about language variations

Already partially implemented in canonical section above, but ensure consistency across all pages.

**Estimated Time:** 15 minutes

---

### 4.3 Optimize Images for SEO
**Action Items:**
1. Audit all images for descriptive alt text
2. Update image filenames to be descriptive (e.g., `hamaria-massage-room.jpg`)
3. Ensure all images use Next.js Image component
4. Add loading="lazy" to non-critical images

**Current Issues:**
- `/hero-sketch.png` - needs better alt text
- Gallery images need descriptive alt text
- Image filenames in `/retiro render copia/` need better names

**Estimated Time:** 1 hour

---

### 4.4 Implement Breadcrumb Navigation
**Location:** Create `/components/breadcrumbs.tsx`
**Purpose:** Improve navigation and SEO

```typescript
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://hamariaclub.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Memberships',
      item: 'https://hamariaclub.com/#membership',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Wellness Membership',
      item: 'https://hamariaclub.com/membership/wellness',
    },
  ],
}
```

**Estimated Time:** 45 minutes

---

## Phase 5: Content Optimization (Priority: MEDIUM)

### 5.1 Keyword Research and Optimization
**Action Items:**
1. Research primary keywords:
   - "luxury wellness center Madrid"
   - "spa membership Madrid"
   - "holistic wellness Madrid"
   - "biohacking Madrid"
   - "longevity clinic Madrid"

2. Optimize content for target keywords:
   - Add keywords naturally to headings (H1, H2, H3)
   - Include keywords in meta descriptions
   - Use keywords in image alt text
   - Create keyword-rich content sections

**Estimated Time:** 2 hours

---

### 5.2 Create SEO-Optimized Content Sections
**Recommendations:**
1. Add FAQ section (good for featured snippets)
2. Add blog/articles section for content marketing
3. Add testimonials/reviews (when available)
4. Create detailed service pages

**Estimated Time:** 4+ hours (ongoing)

---

### 5.3 Optimize Meta Descriptions
**Action Items:**
1. Write compelling meta descriptions for all pages (155-160 characters)
2. Include call-to-action
3. Include target keywords naturally
4. Make each description unique

**Examples:**
- Home: "Discover Madrid's premier luxury wellness center. Advanced therapies, personalized care, transformative results. Apply for founding membership. Opens Fall 2026."
- Wellness: "Essential wellness membership with massage, sauna, cryotherapy & more. Start your journey to optimal health. €200/month."

**Estimated Time:** 1 hour

---

## Phase 6: Performance and Core Web Vitals (Priority: LOW-MEDIUM)

### 6.1 Optimize for Core Web Vitals
**Current Status:** Likely good due to Next.js optimizations

**Action Items:**
1. Test with Google PageSpeed Insights
2. Test with Lighthouse
3. Address any CLS (Cumulative Layout Shift) issues
4. Ensure LCP (Largest Contentful Paint) < 2.5s
5. Ensure FID (First Input Delay) < 100ms

**Estimated Time:** 2 hours

---

### 6.2 Implement Resource Hints
**Already done:** preconnect for external domains

**Additional recommendations:**
```html
<link rel="preload" as="font" href="/fonts/geist-sans.woff2" crossorigin />
<link rel="dns-prefetch" href="https://vercel-analytics.com" />
```

**Estimated Time:** 30 minutes

---

## Phase 7: Local SEO (Priority: MEDIUM)

### 7.1 Google Business Profile
**Action Items:**
1. Create/claim Google Business Profile
2. Add complete business information
3. Add high-quality photos
4. Add services with descriptions
5. Encourage customer reviews (when open)

**Estimated Time:** 1 hour (initial setup)

---

### 7.2 Local Citations
**Action Items:**
1. List business on Spanish directories
2. List on wellness/spa directories
3. Ensure NAP (Name, Address, Phone) consistency

**Examples:**
- Yelp Spain
- TripAdvisor
- Luxury spa directories
- Madrid business directories

**Estimated Time:** 2 hours

---

## Phase 8: Analytics and Monitoring (Priority: HIGH)

### 8.1 Google Search Console Setup
**Action Items:**
1. Add property to Google Search Console
2. Submit sitemap
3. Monitor indexing status
4. Monitor search performance
5. Fix any crawl errors

**Estimated Time:** 30 minutes

---

### 8.2 Track SEO Metrics
**Metrics to monitor:**
- Organic traffic
- Keyword rankings
- Click-through rate (CTR)
- Bounce rate
- Time on page
- Conversion rate

**Tools:**
- Google Search Console
- Google Analytics (already have Vercel Analytics)
- Microsoft Clarity (already implemented)

**Estimated Time:** Ongoing

---

## Phase 9: Advanced SEO Features (Priority: LOW)

### 9.1 Implement Video Schema (Future)
When adding video content about therapies/facilities

### 9.2 Implement Review Schema (Future)
When collecting customer reviews

### 9.3 Create Blog/Content Hub (Future)
Content marketing for organic traffic

### 9.4 International SEO Expansion (Future)
If expanding beyond Spain

---

## Implementation Priority Summary

### Week 1 (Critical - 6-8 hours)
✅ **Must Complete:**
1. ✓ Create robots.txt (5 min)
2. ✓ Create sitemap.ts (15 min)
3. ✓ Add favicons/icons (30 min)
4. ✓ Enhanced root metadata (20 min)
5. ✓ Dynamic lang attribute (30 min)
6. ✓ Membership page metadata (45 min)
7. ✓ LocalBusiness schema (30 min)
8. ✓ Google Search Console setup (30 min)

### Week 2 (High Priority - 4-6 hours)
1. ✓ Service schema (45 min)
2. ✓ Membership schema (30 min)
3. ✓ Canonical URLs (20 min)
4. ✓ Image optimization audit (1 hour)
5. ✓ Meta descriptions (1 hour)
6. ✓ Breadcrumbs (45 min)

### Week 3 (Medium Priority - 4-6 hours)
1. ⚡ Keyword research (2 hours)
2. ⚡ Content optimization (2 hours)
3. ⚡ Core Web Vitals testing (2 hours)

### Week 4+ (Ongoing)
1. 📈 Local SEO setup
2. 📈 Content creation
3. 📈 Performance monitoring
4. 📈 Continuous optimization

---

## Expected Results

### Short-term (1-3 months)
- ✅ Proper indexing of all pages
- ✅ Appearance in Google Search Console
- ✅ Better search result appearance (rich snippets)
- ✅ Local search visibility

### Medium-term (3-6 months)
- 📈 Ranking for brand name
- 📈 Ranking for location-based keywords
- 📈 Increased organic traffic
- 📈 Better click-through rates

### Long-term (6-12 months)
- 🚀 Top 10 rankings for target keywords
- 🚀 Significant organic traffic
- 🚀 High domain authority
- 🚀 Strong local SEO presence

---

## Tools and Resources Needed

### Required Tools
1. **Google Search Console** (Free) - For monitoring search performance
2. **Google Analytics** (Free) - For traffic analysis
3. **PageSpeed Insights** (Free) - For performance testing
4. **Schema.org validator** (Free) - For testing structured data
5. **Screaming Frog SEO Spider** (Free/Paid) - For site audits

### Design Resources Needed
1. Favicon (32x32px)
2. App icon (512x512px)
3. Apple touch icon (180x180px)
4. Open Graph image (1200x630px)

### Content Needed
1. Complete business address
2. Phone number
3. Business hours
4. Social media profiles
5. High-quality photos for Google Business Profile

---

## Next Steps

1. **Review this plan** with your team
2. **Prioritize phases** based on your launch timeline
3. **Assign resources** (developer time, design time, content time)
4. **Create verification accounts** (Google Search Console, etc.)
5. **Start with Week 1 tasks** - highest impact, lowest effort
6. **Track progress** using the checklist format

---

## Notes

- Opening Fall 2026 gives you plenty of time to build SEO authority
- Start SEO work NOW to build domain authority before launch
- Focus on quality over quantity for content
- Local SEO is crucial for a location-based business
- Mobile-first indexing: ensure mobile experience is excellent
- Page speed is a ranking factor: keep performance optimized

---

## Questions to Answer

Before implementation, clarify:
1. ✅ What is the final domain name? (assumed hamariaclub.com)
2. ❓ What is the exact business address?
3. ❓ What are business hours?
4. ❓ What social media profiles exist?
5. ❓ Do you have Google Business Profile already?
6. ❓ What are the exact membership prices? (for schema)
7. ❓ Who should be the content owner/contact?

---

**Document Version:** 1.0  
**Created:** November 12, 2025  
**Status:** Ready for Implementation  
**Estimated Total Time:** 25-35 hours (spread over 4+ weeks)

