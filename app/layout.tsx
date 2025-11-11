import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/language-context"
import { LoadingScreen } from "@/components/loading-screen"
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
  title: "Hamaria Club - Luxury Wellness Center in Madrid",
  description: "Experience holistic wellness and rejuvenation at Madrid's premier luxury wellness center",
  generator: "v0.app",
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
    <html lang="en">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://t.contentsquare.net" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://t.contentsquare.net" />
        
        {/* Preload critical hero image */}
        <link
          rel="preload"
          as="image"
          href="/hero-sketch.png"
          // @ts-ignore
          imageSizes="(max-width: 768px) 65vw, 50vw"
        />
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
