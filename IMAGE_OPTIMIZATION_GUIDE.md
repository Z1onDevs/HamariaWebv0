# Hero Sketch Image Optimization Guide

## Current Image
- **File**: `public/hero sketch.png`
- **Status**: Present in project

## Optimization Steps

### Option 1: Using Online Tool (Recommended - Easy)

1. **Go to**: https://squoosh.app
2. **Upload**: `public/hero sketch.png`
3. **Settings**:
   - Format: WebP
   - Quality: 85
   - Resize: Keep original dimensions or optimize to 1200×1600px
4. **Download** as: `hero-sketch.webp`
5. **Place** in: `public/` directory

**Target**: < 100KB for WebP

### Option 2: Using Command Line (ImageMagick)

```bash
cd public

# Create WebP version
magick "hero sketch.png" -quality 85 -define webp:method=6 hero-sketch.webp

# Optional: Optimize PNG
pngquant --quality=85-95 "hero sketch.png" -o hero-sketch-optimized.png
```

### Option 3: Using Sharp (Node.js)

```bash
npm install sharp --save-dev
```

Create `scripts/optimize-hero.js`:
```javascript
const sharp = require('sharp');

sharp('public/hero sketch.png')
  .webp({ quality: 85 })
  .toFile('public/hero-sketch.webp')
  .then(() => console.log('✓ WebP created'))
  .catch(err => console.error(err));
```

Run: `node scripts/optimize-hero.js`

## Note for Implementation

The code will work with the existing PNG file. WebP optimization is recommended but optional for enhanced performance. The implementation will include fallback for browsers that don't support WebP.

**Status**: Image optimization is optional - proceeding with code implementation using existing PNG.

