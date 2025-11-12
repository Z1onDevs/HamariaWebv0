import type { Metadata } from 'next'

/**
 * Membership SEO Metadata Configuration
 * Provides metadata for dynamic membership pages
 */

export interface MembershipMetadataConfig {
  id: string
  title: string
  description: string
  price: number
  keywords: string[]
}

export const membershipConfigs: Record<string, MembershipMetadataConfig> = {
  wellness: {
    id: 'wellness',
    title: 'Wellness Membership',
    description: 'Essential wellness therapies for balance and recovery. Includes massage therapy, sauna, cryotherapy, float therapy and more. Perfect for those starting their wellness journey. €200/month.',
    price: 200,
    keywords: [
      'wellness membership Madrid',
      'spa membership Madrid',
      'massage membership Madrid',
      'sauna membership Madrid',
      'cryotherapy membership Madrid',
      'float therapy Madrid',
      'wellness program Madrid',
      'monthly wellness membership',
      'affordable wellness Madrid',
      'recovery center membership',
    ],
  },
  focus: {
    id: 'focus',
    title: 'Focus Membership',
    description: 'Advanced cognitive and performance therapies. Optimize your mind and body with red light therapy, HBOT, recovery protocols and comprehensive wellness access. €395/month.',
    price: 395,
    keywords: [
      'focus membership Madrid',
      'performance wellness Madrid',
      'cognitive enhancement Madrid',
      'biohacking membership Madrid',
      'red light therapy Madrid',
      'HBOT Madrid',
      'hyperbaric oxygen therapy membership',
      'performance optimization Madrid',
      'advanced wellness Madrid',
      'executive wellness program',
    ],
  },
  longevity: {
    id: 'longevity',
    title: 'Longevity Membership',
    description: 'Comprehensive longevity and biohacking program with unlimited access to all therapies. The ultimate investment in your health and longevity. €595/month.',
    price: 595,
    keywords: [
      'longevity membership Madrid',
      'longevity clinic Madrid',
      'biohacking program Madrid',
      'unlimited wellness Madrid',
      'longevity optimization',
      'anti-aging membership Madrid',
      'comprehensive wellness Madrid',
      'VIP wellness membership',
      'luxury wellness membership Madrid',
      'unlimited spa membership',
    ],
  },
}

export function generateMembershipMetadata(
  membershipId: string,
  language: 'en' | 'es' = 'en'
): Metadata {
  const config = membershipConfigs[membershipId]
  
  if (!config) {
    return {
      title: 'Membership Not Found',
      description: 'The requested membership page could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const baseUrl = 'https://hamariaclub.com'
  const canonicalUrl = `${baseUrl}/membership/${membershipId}`
  const spanishUrl = `${baseUrl}/es/membership/${membershipId}`

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: 'Hamaria Club' }],
    openGraph: {
      type: 'website',
      locale: language === 'en' ? 'en_US' : 'es_ES',
      alternateLocale: language === 'en' ? ['es_ES'] : ['en_US'],
      url: language === 'en' ? canonicalUrl : spanishUrl,
      title: `${config.title} | Hamaria Club`,
      description: config.description,
      siteName: 'Hamaria Club',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: `${config.title} - Hamaria Club Madrid`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${config.title} | Hamaria Club`,
      description: config.description,
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
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
        'es-ES': spanishUrl,
      },
    },
  }
}

// Spanish translations for membership metadata
export const membershipConfigsES: Record<string, MembershipMetadataConfig> = {
  wellness: {
    id: 'wellness',
    title: 'Membresía Wellness',
    description: 'Terapias esenciales de bienestar para equilibrio y recuperación. Incluye masajes, sauna, crioterapia, flotación y más. Perfecto para comenzar tu viaje de bienestar. €200/mes.',
    price: 200,
    keywords: [
      'membresía wellness Madrid',
      'membresía spa Madrid',
      'membresía masajes Madrid',
      'membresía sauna Madrid',
      'membresía crioterapia Madrid',
      'terapia de flotación Madrid',
      'programa de bienestar Madrid',
      'membresía mensual bienestar',
      'bienestar asequible Madrid',
      'membresía centro recuperación',
    ],
  },
  focus: {
    id: 'focus',
    title: 'Membresía Focus',
    description: 'Terapias avanzadas cognitivas y de rendimiento. Optimiza tu mente y cuerpo con terapia de luz roja, HBOT, protocolos de recuperación y acceso integral. €395/mes.',
    price: 395,
    keywords: [
      'membresía focus Madrid',
      'bienestar rendimiento Madrid',
      'mejora cognitiva Madrid',
      'membresía biohacking Madrid',
      'terapia luz roja Madrid',
      'HBOT Madrid',
      'membresía oxigenoterapia hiperbárica',
      'optimización rendimiento Madrid',
      'bienestar avanzado Madrid',
      'programa wellness ejecutivo',
    ],
  },
  longevity: {
    id: 'longevity',
    title: 'Membresía Longevity',
    description: 'Programa integral de longevidad y biohacking con acceso ilimitado a todas las terapias. La inversión definitiva en tu salud y longevidad. €595/mes.',
    price: 595,
    keywords: [
      'membresía longevidad Madrid',
      'clínica longevidad Madrid',
      'programa biohacking Madrid',
      'wellness ilimitado Madrid',
      'optimización longevidad',
      'membresía anti-aging Madrid',
      'bienestar integral Madrid',
      'membresía wellness VIP',
      'membresía wellness lujo Madrid',
      'membresía spa ilimitada',
    ],
  },
}

