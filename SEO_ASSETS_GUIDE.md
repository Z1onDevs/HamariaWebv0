# SEO Assets Creation Guide

Quick reference for creating the required SEO image assets for Hamaria Club.

---

## 🎨 Required Assets Overview

| Asset | Size | Format | Location | Priority |
|-------|------|--------|----------|----------|
| favicon.ico | 32×32px | ICO | `/app/favicon.ico` | HIGH |
| icon.png | 512×512px | PNG | `/app/icon.png` | HIGH |
| apple-icon.png | 180×180px | PNG | `/app/apple-icon.png` | HIGH |
| opengraph-image.png | 1200×630px | PNG/JPG | `/app/opengraph-image.png` | HIGH |

**Important:** Next.js 15 automatically detects and serves these files from the `/app/` directory. No code changes needed!

---

## 1. favicon.ico (32×32px)

### Purpose
- Browser tab icon
- Bookmarks icon
- Desktop shortcuts

### Specifications
- **Size:** 32×32 pixels
- **Format:** ICO (can include multiple sizes: 16×16, 32×32)
- **Colors:** Full color, transparent background recommended
- **Style:** Simple, recognizable icon

### Design Tips
- Use the "H" letter mark or simplified logo
- Ensure visibility at tiny sizes
- Test on light and dark backgrounds
- Keep it simple - details will be lost

### Creation Tools
- **Online:** [favicon.io](https://favicon.io/) - Generate from text/image
- **Photoshop:** Export as ICO using plugins
- **Figma:** Export as PNG then convert to ICO
- **GIMP:** Built-in ICO export support

### Example Design
```
Simple "H" lettermark in primary color
Background: Transparent or white
Border: Optional subtle border
```

---

## 2. icon.png (512×512px)

### Purpose
- PWA app icon
- Android home screen
- App launcher
- General branding

### Specifications
- **Size:** 512×512 pixels (square)
- **Format:** PNG with transparency
- **Safe zone:** Keep important content within center 80%
- **Colors:** Full color, match brand

### Design Tips
- Use full logo or symbol
- Ensure readability when scaled down
- Test at various sizes (192px, 384px, 512px)
- Consider adding subtle shadow or depth
- Background should work on any OS theme

### Recommended Design
```
Hamaria Club logo centered
Padding: 50-80px from edges
Background: Solid color or subtle gradient
Style: Clean, modern, luxury aesthetic
```

### Creation Process
1. Design in Figma/Illustrator at 1024×1024px
2. Export as PNG
3. Resize to 512×512px with high-quality resampling
4. Optimize file size (should be <100KB)

---

## 3. apple-icon.png (180×180px)

### Purpose
- iOS home screen icon
- iPad home screen
- Apple Touch Icon
- Safari pinned tabs

### Specifications
- **Size:** 180×180 pixels (square)
- **Format:** PNG
- **Corners:** iOS will automatically round corners
- **Safe zone:** 160×160px center area
- **Background:** Opaque (no transparency on iOS)

### Design Tips
- Design for square, iOS adds rounded corners
- Use solid background color (no transparency)
- Test how it looks with iOS rounded corners
- Consider iOS light/dark mode

### iOS Guidelines
- Keep important content in center
- Don't add rounded corners yourself
- Don't add gloss effects
- Use consistent branding with icon.png

### Example Layout
```
Background: Solid brand color (#XXXXXX)
Logo: Centered, white or contrasting color
Padding: 20-30px from edges
Style: Flat, modern design
```

---

## 4. opengraph-image.png (1200×630px)

### Purpose
- Social media previews (Facebook, LinkedIn, Twitter)
- Link sharing cards
- Open Graph protocol
- WhatsApp/Telegram previews

### Specifications
- **Size:** 1200×630 pixels (1.91:1 aspect ratio)
- **Format:** PNG or JPG
- **File size:** Keep under 300KB for fast loading
- **Safe zone:** Keep text/logo in center 1100×550px
- **Text:** Should be readable at small sizes

### Design Components
Include these elements:
1. **Logo** - Top left or centered
2. **Tagline** - "Luxury Wellness Center in Madrid"
3. **Visual** - Hero image or pattern
4. **Call-to-action** - "Opening Fall 2026" or "Apply for Membership"
5. **URL** - Optional: hamariaclub.com

### Design Tips
- Use high contrast for readability
- Keep text large and bold (minimum 60px)
- Test on mobile (preview is small on phones)
- Consider dark/light backgrounds
- Match brand colors and style

### Recommended Layout

```
┌─────────────────────────────────────┐
│  [Logo]                             │
│                                     │
│         HAMARIA CLUB                │
│   Luxury Wellness Center in Madrid  │
│                                     │
│    [Hero image or abstract visual]  │
│                                     │
│      Opening Fall 2026              │
└─────────────────────────────────────┘
```

### Text Hierarchy
- Main title: 72-96px, bold
- Subtitle: 36-48px, light/regular
- Details: 24-32px, light

### Background Options
1. **Subtle gradient** - Brand colors
2. **Hero image** - With overlay for text readability
3. **Abstract pattern** - Geometric shapes
4. **Minimal** - Solid color with logo and text

---

## 🎨 Brand Guidelines

Ensure all assets follow these brand principles:

### Colors
- Primary: [Add your primary color]
- Secondary: [Add your secondary color]
- Accent: [Add your accent color]
- Background: [Add your background color]

### Typography
- Primary font: Geist Sans
- Headings: Light/Regular weights
- Body: Regular weight

### Style
- **Aesthetic:** Luxury, modern, minimal
- **Mood:** Calm, sophisticated, premium
- **Vibe:** Wellness-focused, science-backed, exclusive

---

## 🔧 Technical Requirements

### File Naming (IMPORTANT)
```
/app/favicon.ico          ← Must be exactly this name
/app/icon.png            ← Must be exactly this name
/app/apple-icon.png      ← Must be exactly this name
/app/opengraph-image.png ← Must be exactly this name
```

**Do NOT rename these files!** Next.js looks for these specific names.

### File Size Optimization
- **favicon.ico:** < 50KB
- **icon.png:** < 100KB
- **apple-icon.png:** < 100KB
- **opengraph-image.png:** < 300KB

### Optimization Tools
- **TinyPNG:** https://tinypng.com/ - Compress PNG files
- **ImageOptim:** Mac app for compression
- **Squoosh:** https://squoosh.app/ - Web-based image optimizer
- **SVGOMG:** If using SVG (convert to PNG after)

---

## 📋 Quality Checklist

Before finalizing assets, verify:

### All Assets
- [ ] Correct dimensions
- [ ] Correct file format
- [ ] Correct filename (exact match)
- [ ] Optimized file size
- [ ] High quality (no pixelation)
- [ ] Matches brand guidelines

### favicon.ico
- [ ] Visible at 16×16px
- [ ] Works on light backgrounds
- [ ] Works on dark backgrounds
- [ ] Consistent with brand

### icon.png
- [ ] Centered composition
- [ ] Safe zone respected
- [ ] Readable when scaled
- [ ] Transparent background (if appropriate)

### apple-icon.png
- [ ] Solid background (no transparency)
- [ ] Looks good with rounded corners
- [ ] Centered composition
- [ ] High contrast

### opengraph-image.png
- [ ] Text is readable
- [ ] Logo is visible
- [ ] High contrast
- [ ] Tests well on social media
- [ ] Mobile preview looks good

---

## 🧪 Testing Your Assets

### After Creation

1. **Place files in `/app/` directory:**
```bash
/app/
  ├── favicon.ico
  ├── icon.png
  ├── apple-icon.png
  └── opengraph-image.png
```

2. **Rebuild your Next.js app:**
```bash
npm run build
npm run start
```

3. **Test favicon:**
- Open https://hamariaclub.com in browser
- Check browser tab icon
- Bookmark page and check bookmark icon

4. **Test Open Graph:**
- Use [OpenGraph.xyz](https://www.opengraph.xyz/)
- Enter: https://hamariaclub.com
- Verify image displays correctly

5. **Test Twitter Cards:**
- Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- Enter: https://hamariaclub.com
- Verify card preview

6. **Test on devices:**
- iOS: Add to home screen, check icon
- Android: Add to home screen, check icon
- Share on WhatsApp/iMessage, check preview

---

## 🎯 Quick Start Workflow

### If you have a designer:
1. Share this guide with them
2. Provide brand colors and logo
3. Request all 4 assets
4. Review and approve
5. Place in `/app/` directory
6. Test and deploy

### DIY approach:
1. Use [favicon.io](https://favicon.io/) for favicon
2. Use Canva for other assets (free templates)
3. Follow size specifications above
4. Download and optimize
5. Place in `/app/` directory
6. Test and deploy

### Urgent temporary solution:
1. Use a simple text-based favicon (favicon.io)
2. Create basic colored squares for icons
3. Create simple text-on-gradient for OG image
4. Replace with professional assets later

---

## 📦 Design Asset Templates

### Canva Templates
Search Canva for:
- "App Icon Template" (for icon.png)
- "iOS Icon Template" (for apple-icon.png)
- "Open Graph Image Template" (for opengraph-image.png)

Set custom dimensions and create!

### Figma Templates
Community templates available:
- "Favicon Template"
- "App Icon Design Kit"
- "Social Media Card Template"

---

## 🎨 Example Mockup

Based on your existing branding:

### Color Scheme
```css
--primary: Your gold/accent color
--background: Dark elegant tone
--foreground: Light text color
```

### Layout Suggestion for OG Image:
```
Background: Subtle gradient (dark to darker)
Top: Hamaria Club logo (white)
Center: "Luxury Wellness Center" (large, light)
        "Madrid, Spain" (smaller, light)
Center-Bottom: Abstract wellness icon or pattern
Bottom: "Opening Fall 2026" | hamariaclub.com
```

---

## 🔄 Future Iterations

Once live, consider creating variations:
- Seasonal themed images
- Event-specific OG images
- Membership-tier specific icons
- Dark mode variants
- Holiday editions

---

## 📞 Need Help?

Resources:
- **Fiverr:** Hire designer for $10-50
- **99designs:** Professional design services
- **Dribbble:** Find inspiration
- **Behance:** View wellness brand examples

---

**Last Updated:** November 12, 2025  
**Priority:** HIGH - Complete before website launch  
**Estimated Time:** 2-4 hours with a designer, 4-8 hours DIY

