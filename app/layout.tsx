import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/language-context"
import { LoadingScreen } from "@/components/loading-screen"
import { StructuredData } from "@/components/structured-data"
import Script from "next/script"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Prevent invisible text while loading
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true, // Prevent CLS
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false, // Only load when needed
  fallback: ['monospace'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hamariaclub.com'),
  title: {
    default: 'Hamaria Club - Luxury Wellness Center in Madrid',
    template: '%s | Hamaria Club'
  },
  description: 'Experience holistic wellness and rejuvenation at Madrid\'s premier luxury wellness center. Advanced therapies, personalized care, and transformative results. Opening Fall 2026.',
  keywords: [
    'luxury wellness center Madrid',
    'holistic wellness Madrid',
    'spa Madrid',
    'wellness retreat Spain',
    'longevity clinic Madrid',
    'biohacking Madrid',
    'recovery center Madrid',
    'float therapy Madrid',
    'cryotherapy Madrid',
    'red light therapy Madrid',
    'massage therapy Madrid',
    'wellness membership Madrid',
    'luxury spa membership',
    'holistic health Madrid',
    'wellness club Madrid',
    'hyperbaric oxygen therapy Madrid',
    'sauna Madrid',
    'ice bath Madrid',
    'cold plunge Madrid'
  ],
  authors: [{ name: 'Hamaria Club' }],
  creator: 'Hamaria Club',
  publisher: 'Hamaria Club',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    url: 'https://hamariaclub.com',
    title: 'Hamaria Club - Luxury Wellness Center in Madrid',
    description: 'Experience holistic wellness and rejuvenation at Madrid\'s premier luxury wellness center. Advanced therapies, personalized care, and transformative results.',
    siteName: 'Hamaria Club',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Hamaria Club - Luxury Wellness Center in Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamaria Club - Luxury Wellness Center in Madrid',
    description: 'Experience holistic wellness and rejuvenation at Madrid\'s premier luxury wellness center. Advanced therapies, personalized care, transformative results.',
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
    canonical: 'https://hamariaclub.com',
    languages: {
      'en-US': 'https://hamariaclub.com',
      'es-ES': 'https://hamariaclub.com/es',
    },
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://t.contentsquare.net" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://t.contentsquare.net" />
        <link rel="dns-prefetch" href="https://vercel-analytics.com" />
        
        {/* Preload critical hero image */}
        <link
          rel="preload"
          as="image"
          href="/hero-sketch.png"
          // @ts-ignore
          imageSizes="(max-width: 768px) 65vw, 50vw"
        />
        
        {/* Dynamic language attribute script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const lang = localStorage.getItem('language') || 'en';
                  document.documentElement.lang = lang;
                } catch (e) {
                  console.error('Error setting language:', e);
                }
              })();
            `,
          }}
        />
        
        {/* Structured Data for SEO */}
        <StructuredData type="home" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Script 
          src="https://t.contentsquare.net/uxa/afe552b50f599.js" 
          strategy="lazyOnload"
        />
        <Script
          id="clarity-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "u0fsfkuiyo");
            `,
          }}
        />
        <LoadingScreen />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
