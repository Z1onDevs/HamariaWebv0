"use client"

import { useEffect, useState, memo, useMemo } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { useReveal } from "@/hooks/use-reveal"
import { X, Maximize2 } from "lucide-react"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { useTranslation } from "@/hooks/use-translation"
import { useSwipeToClose } from "@/hooks/use-swipe-to-close"
import { ImageCarousel } from "@/components/image-carousel"

type GalleryItem = {
  src: string
  title: string
  description?: string
}

function toTitleCase(input: string): string {
  return input
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export const GallerySection = memo(function GallerySection() {
  const { ref, isVisible } = useReveal(0.3)
  const { t } = useTranslation()
  const gallery = t.gallery || {}
  const folder = gallery.folder || "/gallery"
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showCarousel, setShowCarousel] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Swipe to close modal
  useSwipeToClose({ 
    onClose: () => setIsModalOpen(false), 
    enabled: isModalOpen && !showCarousel 
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement
      if (scrollContainer) {
        scrollContainer.style.overflow = "hidden"
      }
      document.body.style.overflow = "hidden"

      // Close on Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsModalOpen(false)
        }
      }
      window.addEventListener("keydown", handleEscape)

      return () => {
        window.removeEventListener("keydown", handleEscape)
      }
    } else {
      const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement
      if (scrollContainer) {
        scrollContainer.style.overflow = ""
      }
      document.body.style.overflow = ""
    }
  }, [isModalOpen])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/gallery?dir=${encodeURIComponent(folder)}`)
        if (!res.ok) {
          setGalleryItems([])
          return
        }
        const data = (await res.json()) as { files: string[] }
        
        // Define original images to show on main page
        const originalImages = [
          "Gym 1 (planta baja).jpeg",
          "Massage room.jpeg",
          "Salt & Magnesium Bath.jpeg",
          "Sauna & Ice plunge.jpeg",
          "Spa Entrance.jpeg",
          "Swimming Treadmill.jpeg",
        ]
        
        // Define specific order for new images in popup
        const newImagesOrder = [
          "Building Alfonso XII.png",
          "Mobility Room.jpg",
          "Sauna.png",
          "Red Light Bed.png",
          "HBOT.jpg",
          "Flotation Tank.jpg",
        ]
        
        // Separate: originals first, then new images in specific order
        const original = data.files.filter(file => originalImages.includes(file))
        const newImagesFiltered = newImagesOrder.filter(file => data.files.includes(file))
        const sortedFiles = [...original, ...newImagesFiltered]
        
        const items: GalleryItem[] = sortedFiles.map((file) => {
          const name = file.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ")
          const title = toTitleCase(name)
          const src = encodeURI(`${folder}/${file}`)
          return { src, title, description: "" }
        })
        setGalleryItems(items)
      } catch {
        setGalleryItems([])
      }
    }
    fetchImages()
  }, [folder])

  const hasMoreContent = galleryItems.length >= 6 || gallery.modalDescription

  return (
    <>
      <section
        ref={ref}
        className="flex min-h-screen w-screen shrink-0 snap-start items-center justify-center px-4 py-20 pt-24 sm:px-6 sm:py-24 sm:pt-28 md:px-8 md:py-28 md:pt-32 lg:px-12 lg:py-32 lg:pt-36 xl:pt-40"
        style={{
          paddingTop: 'max(6rem, calc(env(safe-area-inset-top) + 5rem))',
        }}
      >
        <div className="mx-auto w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:gap-5 xl:gap-6">
            {galleryItems.slice(0, 6).map((item, i) => (
              <div
                key={i}
                className={`group relative aspect-[3/4] cursor-pointer transition-all duration-700 sm:aspect-[3/4] md:aspect-[4/3] lg:aspect-[3/2] max-h-[28vh] sm:max-h-[30vh] md:max-h-[35vh] lg:max-h-none ${
                  isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-90"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={() => {
                  setSelectedImageIndex(i)
                  setShowCarousel(true)
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg shadow-sm transition-all duration-500 ease-out group-hover:scale-[1.08] group-hover:shadow-2xl group-hover:shadow-primary/30 group-hover:-translate-y-2 group-active:scale-[0.98] sm:rounded-xl md:rounded-2xl">
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill
                    loading="lazy"
                    quality={80}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-primary/0 transition-all duration-500 group-hover:bg-primary/5" />
                  {/* Tap hint icon - mobile only, first image */}
                  {i === 0 && (
                    <div className="absolute right-2 top-2 animate-pulse rounded-full bg-primary/90 p-2 md:hidden">
                      <Maximize2 className="h-4 w-4 text-white" />
                    </div>
                  )}
                  {/* Minimal gradient overlay - only at bottom for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />
                  {/* Title - always visible on mobile, hover on desktop */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-100 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 sm:p-3 md:p-4">
                    <h3 className="mb-0 font-mono text-xs font-light tracking-wide text-foreground sm:mb-0 sm:text-sm md:text-base">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More Link */}
          {hasMoreContent && (
            <div
              className={`mt-4 flex justify-center transition-all duration-700 sm:mt-6 md:mt-8 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <button
                onClick={() => {
                  setIsModalOpen(true)
                  if (typeof window !== "undefined" && (window as any).clarity) {
                    ;(window as any).clarity("event", "gallery_modal_open", {
                      source: "gallery_section"
                    })
                  }
                }}
                className="group border-b border-transparent font-sans text-sm text-foreground/70 transition-all hover:border-foreground/70 hover:text-foreground sm:text-base"
              >
                {gallery.moreLink || t.moreLink}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Image Carousel - Full Screen */}
      {mounted && showCarousel && createPortal(
        <ImageCarousel
          images={galleryItems}
          initialIndex={selectedImageIndex}
          onClose={() => setShowCarousel(false)}
        />,
        document.body
      )}

      {/* Modal - Additional Images Grid */}
      {mounted && isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Shader Background */}
          <div className="absolute inset-0 z-0">
            <ShaderWrapper />
            <div className="absolute inset-0 bg-background/40" />
          </div>
          <GrainOverlay />

          <div 
            className="relative z-10 h-full w-full sm:h-auto sm:max-w-5xl md:max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-20 rounded-full border border-primary/20 bg-background/60 p-3 text-foreground shadow-sm backdrop-blur-md transition-all hover:border-primary/30 hover:bg-background/80 hover:text-foreground sm:right-0 sm:top-0 sm:-right-12 sm:p-3"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6 sm:h-6 sm:w-6" />
            </button>

            {/* Modal Content */}
            <div className="relative h-full overflow-y-auto border-primary/10 bg-background/30 p-5 shadow-2xl backdrop-blur-md sm:max-h-[85vh] sm:rounded-2xl sm:border sm:p-5 md:p-7 lg:p-9">
              {/* Text Section */}
              {(gallery.modalTitle || gallery.modalDescription) && (
                <div className="mb-5 animate-in fade-in slide-in-from-top-4 sm:mb-7 md:mb-9">
                  {gallery.modalTitle && (
                    <h2 className="mb-2 font-sans text-xl font-light tracking-tight text-foreground sm:mb-3 sm:text-2xl md:text-3xl lg:text-4xl">
                      {gallery.modalTitle}
                    </h2>
                  )}
                  {gallery.modalDescription && (
                    <p className="max-w-4xl font-sans text-xs leading-relaxed text-foreground/80 sm:text-sm md:text-base lg:text-lg">
                      <span className="text-pretty">{gallery.modalDescription}</span>
                    </p>
                  )}
                  <div className="mt-3 h-px w-12 bg-primary/30 sm:mt-4 sm:w-16 md:mt-5 md:w-20" />
                </div>
              )}

              {/* Images Grid */}
              {galleryItems.length > 6 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
                  {galleryItems.slice(6, 12).map((item, i) => (
                  <div
                    key={i}
                    className="group relative aspect-[3/4] cursor-pointer animate-in fade-in slide-in-from-bottom-4 md:aspect-[4/3]"
                    style={{
                      animationDelay: `${i * 100}ms`,
                      animationFillMode: "backwards",
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsModalOpen(false)
                      setSelectedImageIndex(i + 6)
                      setShowCarousel(true)
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-md border border-primary/10 bg-background/20 shadow-sm backdrop-blur-sm transition-all duration-500 ease-out group-hover:scale-[1.05] group-hover:border-primary/20 group-hover:bg-background/40 group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-1 group-active:scale-[0.98] sm:rounded-lg md:rounded-xl">
                      <Image 
                        src={item.src} 
                        alt={item.title} 
                        fill
                        loading="lazy"
                        quality={75}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
                      />
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-primary/0 transition-all duration-500 group-hover:bg-primary/5" />
                      {/* Minimal gradient overlay - only at bottom for text readability */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />
                      {/* Title - always visible on mobile */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-100 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 sm:p-3 md:p-4">
                        <h3 className="mb-0 font-mono text-xs font-light tracking-wide text-foreground sm:mb-0 sm:text-sm md:text-base">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
})
