"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useReveal } from "@/hooks/use-reveal"
import { X } from "lucide-react"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { useTranslation } from "@/hooks/use-translation"

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

export function GallerySection() {
  const { ref, isVisible } = useReveal(0.3)
  const { t } = useTranslation()
  const gallery = t.gallery || {}
  const folder = gallery.folder || "/gallery"
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

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
        className="flex min-h-screen w-screen shrink-0 snap-start items-center justify-center px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:px-12 lg:py-32"
      >
        <div className="mx-auto w-full max-w-5xl pt-24 sm:pt-16 md:pt-8 lg:max-w-6xl xl:max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
            {galleryItems.slice(0, 6).map((item, i) => (
              <div
                key={i}
                className={`group relative aspect-[4/3] transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.01] sm:rounded-xl md:rounded-2xl">
                  <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4 md:p-5">
                    <h3 className="mb-1 font-sans text-sm font-light text-foreground sm:mb-1 sm:text-base md:text-lg lg:text-xl">{item.title}</h3>
                    {item.description ? (
                      <p className="font-mono text-xs text-foreground/70 sm:text-xs">{item.description}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More Link */}
          {hasMoreContent && (
            <div
              className={`mt-6 flex justify-center transition-all duration-700 sm:mt-8 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group border-b border-transparent font-sans text-sm text-foreground/70 transition-all hover:border-foreground/70 hover:text-foreground sm:text-base"
              >
                {t.moreLink}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {mounted && isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Shader Background */}
          <div className="absolute inset-0 z-0">
            <ShaderWrapper />
            <div className="absolute inset-0 bg-background/60" />
          </div>
          <GrainOverlay />

          <div 
            className="relative z-10 h-full w-full sm:h-auto sm:max-w-5xl md:max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-20 rounded-full border border-primary/30 bg-background/90 p-3 text-foreground shadow-sm backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-background hover:text-foreground sm:right-0 sm:top-0 sm:-right-12 sm:p-3"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6 sm:h-6 sm:w-6" />
            </button>

            {/* Modal Content */}
            <div className="relative h-full overflow-y-auto border-primary/20 bg-background/95 p-5 shadow-2xl backdrop-blur-sm sm:max-h-[85vh] sm:rounded-2xl sm:border sm:p-5 md:p-7 lg:p-9">
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
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
                  {galleryItems.slice(6, 12).map((item, i) => (
                  <div
                    key={i}
                    className="group relative aspect-[4/3] animate-in fade-in slide-in-from-bottom-4"
                    style={{
                      animationDelay: `${i * 100}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-md border border-primary/10 shadow-md transition-all duration-500 ease-out group-hover:scale-[1.01] group-hover:border-primary/20 group-hover:shadow-lg sm:rounded-lg md:rounded-xl">
                      <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-3 md:p-4">
                        <h3 className="mb-1 font-sans text-sm font-light text-foreground sm:mb-1 sm:text-sm md:text-base lg:text-lg">{item.title}</h3>
                        {item.description ? (
                          <p className="font-mono text-xs text-foreground/70 sm:text-xs md:text-xs">{item.description}</p>
                        ) : null}
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
}
