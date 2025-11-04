# Services Filter - Categorization & Logic Documentation

## 📊 Overview

The services filter system is designed to help users navigate **70+ services** across **4 main categories** and **21 specialized subcategories**. The system uses flexible, multi-tag categorization allowing services to belong to multiple categories simultaneously.

---

## 🎯 Main Categories (4)

Each category has a distinct color and purpose:

| Category | Color | Hex | Purpose | Service Count |
|----------|-------|-----|---------|---------------|
| **Diagnostics** | Blue | `#3b82f6` | Testing, analysis, assessments | ~20 services |
| **Performance** | Green | `#10b981` | Athletic optimization, recovery | ~25 services |
| **Wellness** | Purple | `#8b5cf6` | Holistic health, stress management | ~35 services |
| **Aesthetics** | Amber | `#f59e0b` | Beauty, anti-aging, body contouring | ~15 services |

### Category Philosophy:

**Diagnostics** - *Know Your Baseline*
- Blood panels, genetic testing, body composition
- Baseline assessments, biomarker tracking
- Performance testing (VO₂ max, etc.)

**Performance** - *Optimize Your Peak*
- Recovery therapies (HBOT, cryotherapy)
- Training modalities (movement, strength)
- Energy optimization (NAD+, IHHT)

**Wellness** - *Balance & Restore*
- Stress management (sauna, massage)
- Mental health (mindfulness, sleep)
- Detoxification and nutrition

**Aesthetics** - *Regenerative Beauty*
- Facial treatments and skin care
- Body sculpting and contouring
- Hair and scalp therapies

---

## 🔍 Subcategories (21)

Subcategories are **cross-categorical** - they can belong to multiple parent categories. This reflects real-world therapy applications.

### Diagnostics Subcategories:
1. **Metabolic Analysis** - `[diagnostics]`
   - Glucose, insulin, lipid panels
   
2. **Hormonal & Endocrine** - `[diagnostics, performance]`
   - Hormone panels, thyroid, sex hormones
   
3. **Inflammation & Immunity** - `[diagnostics, wellness]`
   - CRP, cytokines, immune markers
   
4. **Genetics & Epigenetics** - `[diagnostics]`
   - DNA sequencing, biological age, telomeres
   
5. **Cardiovascular Health** - `[diagnostics, performance]`
   - VO₂ max, ECG, vascular testing

6. **Body Composition** - `[diagnostics, performance, aesthetics]`
   - 3D body scans, movement analysis

### Performance Subcategories:
7. **Regeneration & Recovery** - `[performance, wellness]`
   - HBOT, PEMF, red light therapy
   
8. **Oxygenation Therapy** - `[performance, wellness]`
   - HBOT, Oxyven, IHHT
   
9. **Electromagnetic Therapy** - `[performance, wellness]`
   - PEMF, EMS, Emsculpt NEO
   
10. **Movement & Training** - `[performance]`
    - Personal training, Pilates, yoga

### Wellness Subcategories:
11. **Manual Therapy** - `[wellness, performance]`
    - Massages, physiotherapy, osteopathy
    
12. **Hydrotherapy** - `[wellness]`
    - Saunas, baths, floatation
    
13. **Detoxification** - `[wellness]`
    - Liver cleanse, body wraps, lymphatic drainage
    
14. **Nutrition & Supplementation** - `[wellness, performance]`
    - IV therapy, NAD+, supplements
    
15. **Mental Wellness** - `[wellness]`
    - Assessments, breathwork, mindfulness

### Aesthetics Subcategories:
16. **Facial Treatments** - `[aesthetics]`
    - HydraFacial, peels, RF treatments
    
17. **Body Sculpting** - `[aesthetics]`
    - Cryolipolysis, Emsculpt, pressotherapy
    
18. **Skin Rejuvenation** - `[aesthetics]`
    - Lasers, peels, light therapy
    
19. **Hair & Scalp** - `[aesthetics]`
    - Red light therapy for hair growth

### Cross-Category Subcategories:
20. **Light Therapy (Photobiomodulation)** - `[performance, wellness, aesthetics]`
    - Red/NIR light, UV therapy, facial LED
    
21. **Cryotherapy** - `[performance, wellness, aesthetics]`
    - Whole body cryo, localized cryo, ice plunge

---

## 🧠 Filtering Logic

### 1. **Search Filter** (Text-based)
```javascript
searchQuery.toLowerCase() matches:
  - therapy.name (e.g., "NAD+", "Massage", "HBOT")
  - therapy.description (e.g., "oxygen", "anti-aging", "recovery")
```

**Behavior:**
- Real-time as user types
- Case-insensitive
- Searches both name and description
- Works independently or combined with category filters

### 2. **Category Filter** (Multi-select OR)

**Logic Type:** OR (ANY)
- If user selects "Wellness" → Shows ALL wellness services
- If user selects "Wellness" + "Performance" → Shows services tagged with Wellness OR Performance

**Example:**
```
Selected: [Wellness, Performance]
Shows: 
  - Pure wellness services
  - Pure performance services  
  - Services tagged with both
```

### 3. **Subcategory Filter** (Multi-select OR)

**Logic Type:** OR (ANY)
- Works same as categories
- Multiple selections show combined results

**Dynamic Visibility:**
- When NO categories selected → Show ALL subcategories
- When categories selected → Show ONLY related subcategories

**Example:**
```
Selected Category: [Performance]
Visible Subcategories:
  - Hormonal & Endocrine ✓
  - Cardiovascular Health ✓
  - Body Composition ✓
  - Regeneration & Recovery ✓
  - Oxygenation Therapy ✓
  - Electromagnetic Therapy ✓
  - Movement & Training ✓
  - Manual Therapy ✓
  - Nutrition & Supplementation ✓

Hidden:
  - Metabolic Analysis (diagnostics only)
  - Facial Treatments (aesthetics only)
  - etc.
```

### 4. **Combined Filtering**

**Priority Order:**
1. Search filter (if query exists)
2. Category/Subcategory filters (if any selected)
3. Both combined (intersection)

**Code Logic:**
```javascript
1. Start with all therapies
2. If search query → filter by text match
3. If categories/subcategories selected → filter by tags
4. Return filtered results
```

---

## 🎨 Visual Feedback

### Category Buttons:
- **Unselected**: Light gray background, subtle border
- **Selected**: Category color (15% background, 40% border)
- **Count Badge**: Shows number of services in category
  - Unselected: Sage green
  - Selected: Category color (25% background)

### Subcategory Buttons:
- **Unselected**: Light background, border
- **Selected**: Primary color (10% background, 40% border)

### Active Filter Chips:
- Display above results
- Color-coded by category
- Click to remove individual filters
- Show which filters are active

### Service Cards:
- **Category Tags**: Color-coded pills
- **Desktop**: Tags on right side (max 2 shown)
- **Mobile**: Tags in expanded view
- **Stagger Animation**: 20ms delay per card

---

## 🔢 Service Distribution

Based on current data structure:

**By Main Category:**
- Diagnostics: 20 services
- Performance: 25 services  
- Wellness: 35 services
- Aesthetics: 15 services

**Multi-category Services:** ~30 services
- Example: "Red Light Therapy" → Performance, Wellness, Aesthetics
- Example: "VO₂ Max Testing" → Diagnostics, Performance

**Total Unique Services:** 67 services

---

## 🎯 User Journey Examples

### Journey 1: Looking for Recovery
```
1. User clicks "Performance" category
2. Subcategories filter to show: Regeneration & Recovery, Oxygenation, etc.
3. User clicks "Regeneration & Recovery"
4. Results: HBOT, PEMF, Red Light, Cryotherapy, NAD+ IV, etc.
5. User can further search "oxygen" to narrow down
```

### Journey 2: Exploring Wellness
```
1. User clicks "Wellness" category
2. Sees 35+ wellness services
3. Clicks "Manual Therapy" subcategory
4. Results: All massage types, physiotherapy, osteopathy
5. Can search "Thai" to find Thai Massage specifically
```

### Journey 3: Direct Search
```
1. User types "NAD" in search
2. Results: NAD+ IV, NMN Supplement, NR Supplement
3. Can add "Performance" category to narrow
4. Shows only performance-related NAD services
```

---

## 💡 Logic Benefits

### 1. **Flexibility**
- Services can be tagged with multiple categories
- Reflects real-world multi-purpose therapies
- No artificial restrictions

### 2. **Discoverability**
- Users find services through different paths
- Search + browse combination
- Visual category organization

### 3. **User-Friendly**
- OR logic is intuitive (show MORE, not less)
- Dynamic subcategories reduce clutter
- Clear visual feedback

### 4. **Scalability**
- Easy to add new services
- Simple to create new categories/subcategories
- Flexible tag system

---

## 🛠️ Technical Implementation

### Data Structure:
```json
{
  "categories": [
    { "id": "diagnostics", "name": "Diagnostics", "color": "#3b82f6" }
  ],
  "subcategories": [
    { 
      "id": "hormonal",
      "name": "Hormonal & Endocrine",
      "parentCategories": ["diagnostics", "performance"]
    }
  ],
  "items": [
    {
      "id": "hormone-panel",
      "name": "Comprehensive Hormone Panel",
      "description": "TSH, T3, T4, cortisol...",
      "categories": ["diagnostics"],
      "subcategories": ["hormonal"]
    }
  ]
}
```

### Filter Algorithm:
```typescript
// 1. Search Filter
if (searchQuery) {
  results = results.filter(item => 
    item.name.includes(query) || 
    item.description.includes(query)
  )
}

// 2. Category/Subcategory Filter (OR logic)
if (hasFilters) {
  results = results.filter(item => {
    const matchesCategory = item.categories.some(cat => 
      selectedCategories.includes(cat)
    )
    const matchesSubcategory = item.subcategories.some(sub => 
      selectedSubcategories.includes(sub)
    )
    return matchesCategory || matchesSubcategory
  })
}
```

### Dynamic Subcategory Visibility:
```typescript
if (selectedCategories.length === 0) {
  // Show all subcategories
  visibleSubcategories = allSubcategories
} else {
  // Show only subcategories belonging to selected categories
  visibleSubcategories = subcategories.filter(sub =>
    sub.parentCategories.some(cat => 
      selectedCategories.includes(cat)
    )
  )
}
```

---

## 📈 Future Enhancements

### Possible Additions:
1. **Save Filters** - Remember user's last filter selection
2. **Popular Filters** - Show most-used filter combinations
3. **Recommended For You** - Based on membership tier
4. **Price Range Filter** - If pricing added to services
5. **Duration Filter** - Short (<30min) vs Long (>60min) sessions
6. **Availability** - Filter by what's available today/this week

### Analytics Opportunities:
- Track most-used categories
- Monitor search queries
- Identify popular service combinations
- Optimize category naming based on user behavior

---

## 🎓 Best Practices

### For Adding New Services:
1. Choose appropriate categories (1-3 maximum)
2. Select relevant subcategories (1-3 recommended)
3. Write clear, searchable descriptions
4. Use consistent naming conventions

### For Category Management:
1. Keep categories broad (4-6 max)
2. Subcategories more specific (15-25 ideal)
3. Allow cross-category subcategories
4. Maintain color consistency

---

**Status**: ✅ Fully Implemented  
**Last Updated**: November 4, 2025  
**Version**: 1.0

