import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hamariaclub.com'
  const currentDate = new Date()
  
  // Main pages (English only until i18n routes are implemented)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]
  
  // Membership pages - three tiers (English only until i18n routes exist)
  const membershipIds = ['wellness', 'focus', 'longevity']
  const membershipPages: MetadataRoute.Sitemap = membershipIds.map(id => ({
    url: `${baseUrl}/membership/${id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  
  // TODO: Add Spanish URLs when i18n routing is implemented
  // Example: /es, /es/membresia/bienestar, /es/membresia/enfoque, /es/membresia/longevidad
  
  return [...staticPages, ...membershipPages]
}

