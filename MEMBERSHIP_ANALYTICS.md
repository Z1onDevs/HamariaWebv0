# Membership Analytics & Tracking

This document explains the analytics and tracking implementation for the membership detail pages.

## Overview

The membership pages have been built with comprehensive analytics tracking using **Microsoft Clarity** to help you:
- Track user behavior and preferences
- Test different pricing strategies
- Understand which therapies users find most valuable
- Optimize conversion rates

## Analytics Events Tracked

### Page Views
- **Event**: `membership_page_view`
- **Data**: `membershipId` (longevity, performance, aesthetics)
- **Trigger**: When user lands on any membership detail page

### User Interactions

#### 1. Apply Now Button
- **Event**: `membership_apply_now`
- **Data**: 
  - `membership`: tier name
  - `price`: monthly price
- **Trigger**: When user clicks "Apply Now" button

#### 2. Comparison Tool Toggle
- **Event**: `membership_comparison_toggle`
- **Data**: 
  - `membership`: current tier
  - `price`: monthly price
- **Trigger**: When user opens/closes the comparison table

#### 3. View Comparison
- **Event**: `membership_view_comparison`
- **Data**:
  - `membership`: current tier
  - `price`: monthly price
- **Trigger**: When user clicks "Compare Memberships" button

## Pricing Testing

### Current Pricing Structure

| Tier | Monthly | Yearly | Weekly Minutes | PVP | Savings |
|------|---------|--------|----------------|-----|---------|
| **Longevity +** | €950 | €10,450 | 240 min | €3,200 | 70% |
| **Performance +** | €1,450 | €15,950 | 360 min | €5,400 | 73% |
| **Aesthetics +** | €1,650 | €18,150 | 400 min | €6,800 | 76% |

### A/B Testing Recommendations

You can easily test different pricing by modifying the values in `/content/site.json`:

```json
{
  "memberships": {
    "tiers": {
      "longevity": {
        "monthlyPrice": 950,     // Test: 900, 1000, 1050
        "yearlyPrice": 10450,    // Test: 10000, 11000
        "monthlyPerceivedValue": 3200  // Adjust to test different savings %
      }
    }
  }
}
```

## Viewing Analytics

### In Microsoft Clarity Dashboard:

1. **Heatmaps**: See where users click most
   - Which pricing cards get the most attention
   - Where users spend time on therapy lists

2. **Session Recordings**: Watch real user sessions
   - How users interact with comparison tool
   - What therapies they review most

3. **Custom Events**: Filter by tracked events
   - `membership_page_view` - See which tiers get most visits
   - `membership_apply_now` - Track conversion by tier
   - `membership_comparison_toggle` - See how many compare tiers

4. **Segments**: Create user segments
   - Users who viewed multiple tiers
   - Users who compared tiers before applying
   - Users who spent >2 min on a tier page

## Key Metrics to Track

### Conversion Funnel
1. **Visits** to tier page
2. **Engagement** with therapy list (scroll depth)
3. **Comparison** tool usage
4. **Application** button clicks

### User Preferences
- **Most viewed tier**: Track which gets most page views
- **Longest session**: Which tier holds attention
- **Comparison patterns**: Which tiers are compared most
- **Therapy interest**: Scroll depth on therapy tables

### Pricing Sensitivity
- **Time on pricing section**: Heatmap data
- **Comparison frequency**: How often users check other tiers
- **Application drop-off**: Where users abandon

## Testing Strategy

### Week 1-2: Baseline Data
- Keep current pricing
- Collect data on user behavior
- Identify patterns

### Week 3-4: Price Test A
- Adjust one tier's pricing
- Compare conversion rates
- Track comparison tool usage

### Week 5-6: Price Test B
- Try different price point
- Monitor user engagement
- Compare against baseline

## URLs for Testing

- **Longevity +**: `/membership/longevity`
- **Performance +**: `/membership/performance`
- **Aesthetics +**: `/membership/aesthetics`

## Important Notes

1. **Clarity Integration**: Already integrated via `/app/layout.tsx`
2. **Environment Variable**: Set `NEXT_PUBLIC_CLARITY_ID` in `.env.local`
3. **Privacy**: Clarity automatically respects user privacy settings
4. **Real-time**: Data appears in Clarity dashboard within minutes

## Customization

### To add more tracking events:

```typescript
if (typeof window !== "undefined" && (window as any).clarity) {
  (window as any).clarity("event", "custom_event_name", {
    key: "value"
  })
}
```

### To track specific therapies:

Add click handlers on therapy rows to track which therapies users are most interested in.

## Support

For questions about:
- **Analytics setup**: Check Clarity documentation
- **Code implementation**: Review `/app/membership/[id]/page.tsx`
- **Data analysis**: Use Clarity's built-in tools and AI insights

---

**Last Updated**: November 4, 2025
**Version**: 1.0

