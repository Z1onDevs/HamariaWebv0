# Translation Updates - November 6, 2025

## Changes Made

### 1. ✅ Mindfulness - Keep in Spanish
**Change**: Keep "Mindfulness" as-is in Spanish version (don't translate to "Atención plena")

**Files Modified**:
- `/lib/therapy-matrix.ts` - Line 82: `nameES: "Mindfulness"`
- `/content/site.json` - Line 1089: `"name": "Mindfulness"`

**Reason**: Brand/terminology preference to keep "Mindfulness" consistent across languages.

---

### 2. ✅ Body Wraps (Envolturas) - Remove Optional, Add to Aesthetics Only
**Change**: Changed from "Optional" to 1 session per year for Aesthetics program only

**Before**:
```typescript
allocations: { 
  longevity: "Optional", 
  performance: "Optional", 
  aesthetics: "Optional" 
}
```

**After**:
```typescript
allocations: { 
  longevity: 0, 
  performance: 0, 
  aesthetics: 1 
}
```

**File Modified**:
- `/lib/therapy-matrix.ts` - Line 219

**Impact**: 
- Body wraps now appears ONLY in Aesthetics + membership
- Shows as "1/year" in membership tables
- Removed from Longevity + and Performance + tiers

---

### 3. ✅ Back Navigation from Membership Detail Pages
**Change**: Smart back button that returns to previous page instead of always going to home screen

**Before**:
```typescript
onClick={() => {
  router.push("/?section=membership")
}
```

**After**:
```typescript
onClick={() => {
  // Navigate back to membership section or previous page
  if (window.history.length > 1 && document.referrer.includes(window.location.origin)) {
    router.back()
  } else {
    router.push("/?section=membership")
  }
}
```

**File Modified**:
- `/app/membership/[id]/page.tsx` - Lines 98-104

**Behavior**:
- If user came from within the site → Goes back to previous page (likely membership section)
- If user came from external link or direct URL → Goes to home screen with membership section
- Desktop experience improved: stays on membership section when comparing plans

---

## Build Status

✅ **Build Successful**
- No errors
- No warnings  
- All routes generated correctly
- Build time: 1069ms

## Testing Checklist

- [ ] Verify "Mindfulness" displays same in both EN/ES
- [ ] Check Body wraps appears ONLY in Aesthetics + tier
- [ ] Test back button from membership detail pages
- [ ] Verify navigation works on desktop
- [ ] Confirm membership comparison shows correct allocations

## Files Changed

```
Modified:
  - lib/therapy-matrix.ts                    (2 changes: Mindfulness, Body wraps)
  - content/site.json                        (1 change: Mindfulness)
  - app/membership/[id]/page.tsx            (1 change: Back navigation)
```

---

**Status**: ✅ COMPLETE
**Build**: ✅ SUCCESSFUL  
**Ready for**: Testing & Deployment

