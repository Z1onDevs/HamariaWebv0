"use client"

/**
 * Structured Data Component
 * Provides JSON-LD structured data for SEO
 * Implements LocalBusiness, Service, and other schemas
 */

interface StructuredDataProps {
  type?: 'home' | 'membership' | 'service'
  data?: Record<string, any>
}

export function StructuredData({ type = 'home', data }: StructuredDataProps) {
  // LocalBusiness Schema - for home page
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': 'https://hamariaclub.com',
    name: 'Hamaria Club',
    description: 'Luxury wellness center offering advanced therapies for holistic health and longevity in Madrid, Spain',
    url: 'https://hamariaclub.com',
    telephone: '+34-XXX-XXX-XXX', // TODO: Add actual phone number
    email: 'info@hamariaclub.com', // TODO: Add actual email
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle del Retiro', // TODO: Add actual address
      addressLocality: 'Madrid',
      addressRegion: 'Madrid',
      postalCode: '28009', // TODO: Add actual postal code
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.4168', // TODO: Add actual coordinates
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
    image: 'https://hamariaclub.com/opengraph-image.png',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '1',
    },
  }

  // Service Schema - for services section
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Wellness and Spa Services',
    provider: {
      '@type': 'HealthAndBeautyBusiness',
      name: 'Hamaria Club',
      '@id': 'https://hamariaclub.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Madrid',
      '@id': 'https://www.wikidata.org/wiki/Q2807',
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
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sauna Therapy',
            description: 'Traditional and infrared sauna sessions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Flotation Therapy',
            description: 'Sensory deprivation tank therapy for deep relaxation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Red Light Therapy',
            description: 'Advanced photobiomodulation therapy',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hyperbaric Oxygen Therapy',
            description: 'HBOT for enhanced recovery and wellness',
          },
        },
      ],
    },
  }

  // Membership Offer Schema
  const membershipSchema = data ? {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: data.name || 'Membership',
    description: data.description || 'Wellness membership offering',
    price: data.price || '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/PreOrder', // Since opening Fall 2026
    validFrom: '2025-11-12',
    priceValidUntil: '2026-12-31',
    seller: {
      '@type': 'Organization',
      name: 'Hamaria Club',
      '@id': 'https://hamariaclub.com',
    },
    category: 'Health & Wellness',
  } : null

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://hamariaclub.com',
    name: 'Hamaria Club',
    url: 'https://hamariaclub.com',
    logo: 'https://hamariaclub.com/icon.png',
    description: 'Madrid\'s premier luxury wellness center',
    foundingDate: '2026',
    founders: [
      {
        '@type': 'Person',
        name: 'Hamaria Team',
      },
    ],
    sameAs: [
      'https://www.instagram.com/hamariaclub',
      'https://www.facebook.com/hamariaclub',
      'https://twitter.com/hamariaclub',
    ],
  }

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://hamariaclub.com/#website',
    url: 'https://hamariaclub.com',
    name: 'Hamaria Club',
    description: 'Luxury wellness center in Madrid',
    publisher: {
      '@id': 'https://hamariaclub.com',
    },
    inLanguage: ['en', 'es'],
  }

  // Select appropriate schema based on type
  let schema = localBusinessSchema
  
  if (type === 'home') {
    // Combine multiple schemas for home page
    schema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        websiteSchema,
        localBusinessSchema,
        serviceSchema,
      ],
    }
  } else if (type === 'membership' && membershipSchema) {
    schema = membershipSchema
  } else if (type === 'service') {
    schema = serviceSchema
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  )
}

