# Translation Guide for Hamaria Club

Quick reference guide for maintaining bilingual content across the Hamaria Club website.

## Adding a New Therapy

When adding a new therapy, you need to update **TWO** locations:

### 1. For Membership Therapies (Included in Plans)

Update `/lib/therapy-matrix.ts`:

```typescript
{
  name: "English Therapy Name",
  nameES: "Nombre de la terapia en español",
  allocations: { 
    longevity: 0,      // Number of sessions or "Unlimited"
    performance: 2, 
    aesthetics: 1 
  },
  duration: 60,        // Session duration in minutes
  isYearly: false,     // true for yearly therapies
}
```

### 2. For All Services (Full Catalog)

Update `/content/site.json` in **BOTH** English and Spanish sections:

**English Section** (around line 318):
```json
{
  "id": "therapy-id-slug",
  "name": "English Therapy Name",
  "description": "English description of the therapy and its benefits.",
  "categories": ["wellness", "performance"],
  "subcategories": ["regeneration", "stress"]
}
```

**Spanish Section** (around line 1018):
```json
{
  "id": "therapy-id-slug",  // SAME ID as English
  "name": "Nombre de la terapia en español",
  "description": "Descripción en español de la terapia y sus beneficios.",
  "categories": ["wellness", "performance"],  // SAME categories
  "subcategories": ["regeneration", "stress"]  // SAME subcategories
}
```

## Translation Checklist

When adding or modifying therapies:

- [ ] Add English name in therapy-matrix.ts (if membership therapy)
- [ ] Add Spanish name (nameES) in therapy-matrix.ts
- [ ] Add English entry in site.json (around line 318)
- [ ] Add Spanish entry in site.json (around line 1018)
- [ ] Ensure IDs match exactly between English and Spanish
- [ ] Ensure categories/subcategories match exactly
- [ ] Run `npm run build` to verify no errors
- [ ] Test language switcher on the website

## Common Categories

```typescript
categories: [
  "diagnostics",   // Diagnostic tests and assessments
  "performance",   // Athletic and physical performance
  "wellness",      // Holistic wellness and recovery
  "aesthetics"     // Aesthetic and beauty treatments
]
```

## Common Subcategories

```typescript
subcategories: [
  "aesthetics-sub",        // Aesthetic treatments
  "energy",                // Energy optimization
  "information-medicine",  // Diagnostics and data
  "detox",                 // Detoxification
  "regeneration",          // Tissue regeneration
  "sleep",                 // Sleep optimization
  "biorhythms",           // Circadian rhythm
  "stress",               // Stress management
  "physical-medicine",    // Physical therapy
  "movement",             // Movement and training
  "psyche"                // Mental/cognitive
]
```

## Translation Best Practices

### 1. Brand Names (DON'T Translate)
Keep these in original form:
- HydraFacial®
- Ultherapy®
- Emsculpt NEO
- Sofwave
- PEMF, HBOT, HIFU

### 2. Technical Terms (DON'T Translate)
- VO₂ max / VO₂ máx
- NAD+
- DNA
- Body Lab

### 3. Common Therapy Translations

| English | Spanish |
|---------|---------|
| Personal training | Entrenamiento personal |
| Massage | Masaje |
| Therapy | Terapia |
| Protocol | Protocolo |
| Analysis | Análisis |
| Assessment | Evaluación |
| Treatment | Tratamiento |
| Session | Sesión |
| Coaching | Coaching (often kept) |
| Wellness | Bienestar |
| Recovery | Recuperación |

### 4. Description Guidelines

**English descriptions** should:
- Be concise but informative
- Highlight key benefits
- Use technical terms appropriately
- Be 1-2 sentences

**Spanish descriptions** should:
- Mirror the English structure
- Use natural Spanish phrasing
- Maintain the same technical level
- Keep similar length

## Component Usage

All components automatically switch languages when using:

```tsx
import { useTranslation } from "@/hooks/use-translation"

function Component() {
  const { t, language } = useTranslation()
  
  // For therapy-matrix data:
  {language === "es" ? therapy.nameES : therapy.name}
  
  // For site.json data:
  // Automatically switches based on language context
  {t.therapies.items.map(therapy => therapy.name)}
}
```

## Testing After Changes

1. **Build test**: `npm run build`
   - Should complete with no errors

2. **Visual test**: `npm run dev`
   - Toggle language switcher
   - Check services modal
   - Check membership cards
   - Check membership detail pages

3. **Data consistency**:
   - Verify therapy IDs match in English/Spanish
   - Verify categories are identical
   - Verify all references work

## File Structure

```
/lib/
  therapy-matrix.ts          # Membership therapies (30+ therapies)

/content/
  site.json                  # All services + UI text (50+ therapies)
    ├── en: {...}           # English section
    └── es: {...}           # Spanish section

/components/
  sections/
    membership-section.tsx   # Uses therapy-matrix
    services-section.tsx     # Uses site.json
  membership-comparison.tsx  # Uses therapy-matrix
  filtered-services.tsx      # Uses site.json
```

## Common Issues

### Issue: Therapy not appearing in membership card
**Solution**: Add to therapy-matrix.ts with correct allocations

### Issue: Therapy not in services modal
**Solution**: Add to site.json in both English and Spanish sections

### Issue: Spanish translation not showing
**Solution**: 
1. Check nameES is filled in therapy-matrix.ts
2. Check Spanish section in site.json has matching ID
3. Clear browser cache and reload

### Issue: Build error after adding therapy
**Solution**: 
1. Check for TypeScript errors
2. Verify JSON syntax in site.json
3. Ensure all required fields are present

## Quick Commands

```bash
# Build to check for errors
npm run build

# Run development server
npm run dev

# Check git status
git status

# Check for linting issues
npm run lint
```

## Support

For questions about translations:
1. Check TRANSLATION_COMPLETION_SUMMARY.md for examples
2. Look at existing therapies as templates
3. Ensure consistency with existing naming patterns

---

**Last Updated**: November 6, 2025

