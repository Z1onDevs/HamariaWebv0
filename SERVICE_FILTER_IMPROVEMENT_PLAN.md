# Service Filter Improvement Plan
**Date:** November 6, 2025  
**Status:** 📋 PLANNING PHASE

---

## 🔍 Current Issues Identified

### Issue 1: OR Logic Confusion ⚠️
**Problem:** Lines 71-82 in `filtered-services.tsx`
```typescript
// Current logic uses OR between category AND subcategory
return matchesCategory || matchesSubcategory
```
**Impact:** 
- If user selects "Performance" category + "Movement" subcategory
- Shows ALL Performance therapies + ALL Movement therapies
- Expected: Show ONLY Performance therapies that are ALSO Movement
- **This is the main reason it feels broken**

### Issue 2: No Subcategory Counts 📊
**Problem:** Subcategories don't show therapy counts
**Impact:** Users don't know how many therapies each subcategory has

### Issue 3: No Visual Feedback When Subcategories Are Filtered
**Problem:** When categories are selected, subcategories appear/disappear but no indication
**Impact:** Users don't understand why subcategories changed

### Issue 4: No Filter Mode Toggle
**Problem:** Can't switch between AND/OR logic
**Impact:** Power users can't customize filtering behavior

### Issue 5: Limited Sorting Options
**Problem:** Only alphabetical sorting available
**Impact:** Can't sort by relevance, category, or other criteria

### Issue 6: No Active Subcategory Chips
**Problem:** Selected subcategories don't appear as removable chips in results
**Impact:** Users forget what subcategories are active

### Issue 7: No Quick Filter Presets
**Problem:** No shortcuts like "Most Popular", "Recovery", "Anti-Aging", etc.
**Impact:** Users must manually select multiple filters for common searches

---

## 🎯 Improvement Plan

### Phase 1: Fix Core Filtering Logic ✅ CRITICAL

#### 1.1 Fix AND/OR Logic
**Priority:** HIGH  
**Complexity:** MEDIUM

**Changes needed:**
```typescript
// NEW: When both categories AND subcategories are selected, use AND logic
if (selectedCategories.length > 0 && selectedSubcategories.length > 0) {
  result = result.filter(therapy => {
    const matchesCategory = therapy.categories.some(cat => 
      selectedCategories.includes(cat)
    )
    const matchesSubcategory = therapy.subcategories.some(sub => 
      selectedSubcategories.includes(sub)
    )
    // AND logic: must match BOTH
    return matchesCategory && matchesSubcategory
  })
}
// When only categories selected
else if (selectedCategories.length > 0) {
  result = result.filter(therapy => 
    therapy.categories.some(cat => selectedCategories.includes(cat))
  )
}
// When only subcategories selected
else if (selectedSubcategories.length > 0) {
  result = result.filter(therapy => 
    therapy.subcategories.some(sub => selectedSubcategories.includes(sub))
  )
}
```

**Expected Behavior:**
- **Category only**: Shows all therapies in that category
- **Subcategory only**: Shows all therapies with that subcategory (from any category)
- **Both**: Shows therapies that match BOTH the category AND subcategory
- **Multiple categories**: Shows therapies in ANY of those categories (OR logic within categories)
- **Multiple subcategories**: Shows therapies with ANY of those subcategories (OR within subcategories)

---

#### 1.2 Add Subcategory Counts
**Priority:** HIGH  
**Complexity:** LOW

**Changes needed:**
```typescript
// Add function to count therapies per subcategory
const getSubcategoryCount = (subcategoryId: string) => {
  // If categories are selected, count only within those categories
  if (selectedCategories.length > 0) {
    return therapies.filter(therapy => 
      therapy.subcategories.includes(subcategoryId) &&
      therapy.categories.some(cat => selectedCategories.includes(cat))
    ).length
  }
  // Otherwise count all therapies with this subcategory
  return therapies.filter(therapy => 
    therapy.subcategories.includes(subcategoryId)
  ).length
}
```

**UI Update:**
```tsx
{visibleSubcategories.map((subcategory) => {
  const count = getSubcategoryCount(subcategory.id)
  return (
    <button key={subcategory.id}>
      <span>{subcategory.name}</span>
      <span className="count-badge">{count}</span>
    </button>
  )
})}
```

---

#### 1.3 Show Active Subcategory Chips
**Priority:** MEDIUM  
**Complexity:** LOW

**Changes needed:**
In the results header (lines 285-304), add subcategory chips:

```tsx
{/* Active subcategory chips */}
{selectedSubcategories.map((subId) => {
  const sub = subcategories.find(s => s.id === subId)
  if (!sub) return null
  return (
    <button
      key={subId}
      onClick={() => toggleSubcategory(subId)}
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/30"
    >
      {sub.name}
      <X className="h-3 w-3" />
    </button>
  )
})}
```

---

### Phase 2: Enhanced UX Features 🎨

#### 2.1 Add Filter Mode Toggle (AND vs OR)
**Priority:** MEDIUM  
**Complexity:** MEDIUM

**New State:**
```typescript
const [filterMode, setFilterMode] = useState<'AND' | 'OR'>('AND')
```

**UI Component:**
```tsx
<div className="flex items-center gap-2 text-xs text-foreground/50">
  <span>Filter mode:</span>
  <button
    onClick={() => setFilterMode(filterMode === 'AND' ? 'OR' : 'AND')}
    className={`toggle-button ${filterMode === 'AND' ? 'active' : ''}`}
  >
    AND
  </button>
  <button
    onClick={() => setFilterMode(filterMode === 'OR' ? 'AND' : 'OR')}
    className={`toggle-button ${filterMode === 'OR' ? 'active' : ''}`}
  >
    OR
  </button>
</div>
```

**Logic:**
- **AND mode** (default): Category AND Subcategory must both match
- **OR mode**: Category OR Subcategory can match (current behavior)

---

#### 2.2 Add Sorting Options
**Priority:** MEDIUM  
**Complexity:** LOW

**New State:**
```typescript
type SortOption = 'alphabetical' | 'category' | 'relevance'
const [sortBy, setSortBy] = useState<SortOption>('alphabetical')
```

**Sorting Logic:**
```typescript
// Sort based on selected option
switch (sortBy) {
  case 'alphabetical':
    result.sort((a, b) => a.name.localeCompare(b.name))
    break
  case 'category':
    result.sort((a, b) => {
      // Sort by first category, then by name
      const catA = a.categories[0] || ''
      const catB = b.categories[0] || ''
      return catA.localeCompare(catB) || a.name.localeCompare(b.name)
    })
    break
  case 'relevance':
    // If search query exists, sort by match quality
    // Otherwise, sort by number of matching categories/subcategories
    if (searchQuery.trim()) {
      result.sort((a, b) => {
        const scoreA = calculateRelevanceScore(a, searchQuery)
        const scoreB = calculateRelevanceScore(b, searchQuery)
        return scoreB - scoreA
      })
    }
    break
}
```

**UI Dropdown:**
```tsx
<select 
  value={sortBy} 
  onChange={(e) => setSortBy(e.target.value as SortOption)}
  className="sort-dropdown"
>
  <option value="alphabetical">A-Z</option>
  <option value="category">By Category</option>
  <option value="relevance">Most Relevant</option>
</select>
```

---

#### 2.3 Quick Filter Presets
**Priority:** LOW  
**Complexity:** MEDIUM

**Preset Definitions:**
```typescript
const filterPresets = [
  {
    id: 'recovery',
    name: 'Recovery & Regeneration',
    icon: '🔄',
    categories: ['performance', 'wellness'],
    subcategories: ['regeneration', 'physical-medicine']
  },
  {
    id: 'anti-aging',
    name: 'Anti-Aging',
    icon: '✨',
    categories: ['aesthetics', 'wellness'],
    subcategories: ['aesthetics-sub', 'regeneration']
  },
  {
    id: 'stress-relief',
    name: 'Stress Relief',
    icon: '🧘',
    categories: ['wellness'],
    subcategories: ['stress', 'psyche', 'sleep']
  },
  {
    id: 'energy-boost',
    name: 'Energy Boost',
    icon: '⚡',
    categories: ['performance', 'wellness'],
    subcategories: ['energy']
  },
  {
    id: 'detox',
    name: 'Detoxification',
    icon: '🌿',
    categories: ['wellness'],
    subcategories: ['detox']
  },
  {
    id: 'fitness',
    name: 'Fitness & Movement',
    icon: '💪',
    categories: ['performance'],
    subcategories: ['movement']
  }
]
```

**UI Component:**
```tsx
<div className="mb-4">
  <h4 className="text-xs font-medium uppercase text-foreground/50 mb-2">
    Quick Filters
  </h4>
  <div className="flex flex-wrap gap-2">
    {filterPresets.map(preset => (
      <button
        key={preset.id}
        onClick={() => applyPreset(preset)}
        className="preset-button"
      >
        <span>{preset.icon}</span>
        <span>{preset.name}</span>
      </button>
    ))}
  </div>
</div>
```

---

#### 2.4 Enhanced Search with Highlights
**Priority:** LOW  
**Complexity:** MEDIUM

**Feature:** Highlight matching text in results

```typescript
const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() 
      ? <mark key={index} className="bg-primary/20">{part}</mark>
      : part
  )
}
```

**Usage:**
```tsx
<h4>{highlightText(therapy.name, searchQuery)}</h4>
<p>{highlightText(therapy.description, searchQuery)}</p>
```

---

#### 2.5 Filter Stats Panel
**Priority:** LOW  
**Complexity:** LOW

**UI Component:**
```tsx
<div className="filter-stats-panel">
  <div className="stat">
    <span className="value">{filteredTherapies.length}</span>
    <span className="label">Results</span>
  </div>
  <div className="stat">
    <span className="value">
      {filteredTherapies.filter(t => t.categories.includes('wellness')).length}
    </span>
    <span className="label">Wellness</span>
  </div>
  <div className="stat">
    <span className="value">
      {filteredTherapies.filter(t => t.categories.includes('performance')).length}
    </span>
    <span className="label">Performance</span>
  </div>
  {/* More stats... */}
</div>
```

---

### Phase 3: Advanced Features 🚀

#### 3.1 Save Favorite Filters
**Priority:** LOW  
**Complexity:** HIGH

**Implementation:**
- Use localStorage to save user's favorite filter combinations
- Show "Save current filters" button
- Quick access to saved filters

---

#### 3.2 Compare Therapies
**Priority:** LOW  
**Complexity:** HIGH

**Implementation:**
- Add checkbox to each therapy card
- "Compare selected" button
- Side-by-side comparison modal

---

#### 3.3 Filter by Membership Tier
**Priority:** MEDIUM  
**Complexity:** MEDIUM

**New Filter Option:**
```tsx
<div className="membership-filter">
  <h4>Available in:</h4>
  <label>
    <input type="checkbox" value="longevity" />
    Longevity+
  </label>
  <label>
    <input type="checkbox" value="performance" />
    Performance+
  </label>
  <label>
    <input type="checkbox" value="aesthetics" />
    Aesthetics+
  </label>
</div>
```

**Note:** This requires cross-referencing with membership-section therapyMatrix

---

#### 3.4 "Related Therapies" Suggestions
**Priority:** LOW  
**Complexity:** MEDIUM

**Feature:** When viewing a therapy, show related therapies
- Based on shared subcategories
- Based on category similarity
- "People also viewed" style

---

## 📊 Implementation Priority Matrix

| Feature | Priority | Complexity | Impact | Order |
|---------|----------|------------|--------|-------|
| Fix AND/OR Logic | HIGH | MEDIUM | 🔥 Critical | 1 |
| Add Subcategory Counts | HIGH | LOW | 🔥 High | 2 |
| Show Active Subcategory Chips | MEDIUM | LOW | ⭐ Medium | 3 |
| Sorting Options | MEDIUM | LOW | ⭐ Medium | 4 |
| Filter Mode Toggle | MEDIUM | MEDIUM | ⭐ Medium | 5 |
| Quick Filter Presets | LOW | MEDIUM | ✨ Nice | 6 |
| Enhanced Search Highlights | LOW | MEDIUM | ✨ Nice | 7 |
| Filter Stats Panel | LOW | LOW | ✨ Nice | 8 |
| Filter by Membership Tier | MEDIUM | MEDIUM | ⭐ Medium | 9 |

---

## 🎨 UI/UX Improvements

### Visual Hierarchy
1. **Most Important** (always visible):
   - Search bar
   - Main category filters with counts
   - Results count
   - Therapy cards

2. **Secondary** (visible when relevant):
   - Subcategory filters (when category selected)
   - Active filter chips
   - Clear filters button

3. **Tertiary** (optional/advanced):
   - Sort dropdown
   - Filter mode toggle
   - Quick filter presets
   - Stats panel

### Mobile Optimization
- Sticky "View X Results" button when filters active ✅ (already exists)
- Collapsible filter sections to save space
- Swipe to remove filter chips
- Bottom sheet for sort/filter options

### Accessibility
- Keyboard navigation for all filters
- Screen reader announcements for result count changes
- Focus management when modal opens/closes
- High contrast mode support

---

## 🔧 Technical Implementation Steps

### Step 1: Fix Core Logic (Essential) ⚡
**Files to modify:**
- `components/filtered-services.tsx` (lines 50-88)

**Changes:**
1. Replace OR logic with AND logic (lines 71-82)
2. Add `getSubcategoryCount` function
3. Update subcategory buttons to show counts
4. Add subcategory chips to results header

**Testing:**
- Select "Performance" → Should show ~25 therapies
- Select "Movement" → Should show ~12 therapies
- Select both → Should show ~8 therapies (intersection)
- Verify counts are accurate

---

### Step 2: Add Sorting (Quick Win) ⚡
**Files to modify:**
- `components/filtered-services.tsx`

**Changes:**
1. Add `sortBy` state
2. Add sort logic after filtering (line 84)
3. Add UI dropdown above results

**Testing:**
- Sort A-Z → Verify alphabetical
- Sort by Category → Verify grouped by category
- Switch between sorts maintains filters

---

### Step 3: Add Quick Presets (Enhancement) ✨
**Files to modify:**
- `components/filtered-services.tsx`

**Changes:**
1. Define preset objects
2. Add `applyPreset` function
3. Add UI section above category filters

**Testing:**
- Click "Recovery" → Selects Performance + Regeneration
- Click "Anti-Aging" → Selects Aesthetics + Regeneration
- Presets work with existing filters

---

### Step 4: Add Filter Mode Toggle (Advanced) 🚀
**Files to modify:**
- `components/filtered-services.tsx`

**Changes:**
1. Add `filterMode` state
2. Add conditional logic for AND vs OR
3. Add toggle UI in filters header

**Testing:**
- AND mode: stricter filtering
- OR mode: broader filtering
- Mode persists through filter changes

---

## 📝 Pseudo Code for Fixed Logic

```typescript
// FIXED FILTERING LOGIC
const filteredTherapies = useMemo(() => {
  let result = therapies

  // 1. Apply search filter FIRST (highest priority)
  if (searchQuery.trim()) {
    result = applySearchFilter(result, searchQuery)
  }

  // 2. Apply category + subcategory filters with AND logic
  const hasCategoryFilters = selectedCategories.length > 0
  const hasSubcategoryFilters = selectedSubcategories.length > 0

  if (hasCategoryFilters && hasSubcategoryFilters) {
    // BOTH selected: Must match category AND subcategory
    result = result.filter(therapy => {
      const matchesCategory = therapy.categories.some(cat => 
        selectedCategories.includes(cat)
      )
      const matchesSubcategory = therapy.subcategories.some(sub => 
        selectedSubcategories.includes(sub)
      )
      return matchesCategory && matchesSubcategory
    })
  } else if (hasCategoryFilters) {
    // Only categories: Match ANY selected category
    result = result.filter(therapy =>
      therapy.categories.some(cat => selectedCategories.includes(cat))
    )
  } else if (hasSubcategoryFilters) {
    // Only subcategories: Match ANY selected subcategory
    result = result.filter(therapy =>
      therapy.subcategories.some(sub => selectedSubcategories.includes(sub))
    )
  }

  // 3. Apply sorting
  switch (sortBy) {
    case 'alphabetical':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'category':
      result.sort(sortByCategory)
      break
    case 'relevance':
      result.sort(sortByRelevance)
      break
  }

  return result
}, [therapies, selectedCategories, selectedSubcategories, searchQuery, sortBy])
```

---

## ✅ Success Criteria

### Must Have (Phase 1):
- [x] AND logic works correctly
- [x] Subcategory counts display
- [x] Active subcategory chips show
- [x] Filtering is intuitive and predictable
- [x] No bugs or console errors

### Should Have (Phase 2):
- [ ] Sorting options work
- [ ] Filter mode toggle (AND/OR)
- [ ] Quick filter presets functional
- [ ] Mobile experience excellent

### Nice to Have (Phase 3):
- [ ] Search text highlighting
- [ ] Filter stats panel
- [ ] Membership tier filter
- [ ] Save favorite filters

---

## 🧪 Testing Plan

### Manual Testing Scenarios:

1. **Basic Filtering:**
   - Select "Wellness" → Should show 30+ therapies
   - Select "Performance" → Should show 25+ therapies
   - Clear → Should show all 52 therapies

2. **Subcategory Filtering:**
   - Select "Performance" → Subcategories update to show Movement, Energy, etc.
   - Then select "Movement" → Should show only Performance + Movement therapies
   - Count next to "Movement" should match result count

3. **Combined Filtering:**
   - Select "Wellness" + "Aesthetics" → Should show therapies in EITHER category
   - Add "Regeneration" subcategory → Should narrow to therapies with Regeneration in Wellness OR Aesthetics
   - Verify counts are logical

4. **Search + Filter:**
   - Search "massage" → Shows 3 therapies
   - Add "Wellness" category → Still shows matching massages in Wellness
   - Clear search → Shows all Wellness therapies

5. **Edge Cases:**
   - Select category with 0 therapies → Should show "No results"
   - Select all categories → Should show all therapies
   - Rapid filter toggling → Should not crash or show incorrect counts

---

## 🚀 Rollout Plan

### Week 1: Core Fixes
- Day 1-2: Fix AND/OR logic
- Day 3: Add subcategory counts
- Day 4: Add active chips
- Day 5: Testing & bug fixes

### Week 2: Enhancements
- Day 1-2: Add sorting options
- Day 3: Add filter mode toggle
- Day 4-5: Testing & refinement

### Week 3: Advanced Features
- Day 1-3: Quick filter presets
- Day 4-5: Polish & final testing

---

## 📌 Notes & Considerations

### Performance:
- All filtering is client-side, so performance is good up to ~500 therapies
- Current 52 therapies = no performance concerns
- useMemo already implemented ✅

### Accessibility:
- All filter buttons need proper ARIA labels
- Results count changes should announce to screen readers
- Focus trap in modal already works ✅

### Internationalization:
- All text uses translation system ✅
- Filter presets need i18n strings
- Sorting options need translation

### Future Scalability:
- If therapy count grows significantly, consider:
  - Server-side filtering
  - Pagination
  - Virtual scrolling
  - Lazy loading

---

## 🎯 Immediate Next Steps

1. **Fix the AND/OR logic** (30 minutes)
2. **Add subcategory counts** (20 minutes)
3. **Add active subcategory chips** (15 minutes)
4. **Test thoroughly** (30 minutes)

**Total time for Phase 1: ~2 hours**

This will immediately make the filter functional and useful! 🎉


