"use client"

import { Mail, MapPin } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useTranslation } from "@/hooks/use-translation"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const { t } = useTranslation()
  const contact = t.contact

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-screen shrink-0 snap-start items-center justify-center px-5 py-24 pt-28 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="flex flex-col items-center justify-center">
            <div
              className={`mb-8 transition-all duration-700 sm:mb-8 md:mb-10 lg:mb-12 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:mb-3 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                {contact.heading}
              </h2>
              <p className="font-mono text-xs text-foreground/60 sm:text-xs md:text-sm lg:text-base">{contact.subheading}</p>
            </div>

            <div className="space-y-6 sm:space-y-5 md:space-y-6 lg:space-y-8">
              <a
                href={`mailto:${contact.email}`}
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-2 flex items-center justify-center gap-2 sm:mb-1.5 sm:gap-2.5">
                  <Mail className="h-4 w-4 text-foreground/60 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                  <span className="font-mono text-xs text-foreground/60 sm:text-xs md:text-sm">Email</span>
                </div>
                <p className="text-xl text-foreground transition-colors group-hover:text-foreground/70 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                  {contact.email}
                </p>
              </a>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="mb-2 flex items-center justify-center gap-2 sm:mb-1.5 sm:gap-2.5">
                  <MapPin className="h-4 w-4 text-foreground/60 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                  <span className="font-mono text-xs text-foreground/60 sm:text-xs md:text-sm">Location</span>
                </div>
                <p className="text-base text-foreground sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">{contact.location}</p>
              </div>

              <div
                className={`flex flex-wrap justify-center gap-4 pt-4 transition-all duration-700 sm:gap-4 sm:pt-3 md:pt-4 lg:pt-6 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {contact.socials.map((social: string, i: number) => (
                  <a
                    key={social}
                    href="#"
                    className="border-b border-transparent py-2 font-mono text-sm text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90 sm:text-sm"
                  >
                    {social}
                  </a>
                ))}
              </div>

              {/* Footer */}
              {t.footer && (
                <div
                  className={`mt-16 border-t border-primary/10 pt-8 transition-all duration-700 sm:mt-20 sm:pt-10 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                >
                  {/* Footer Links */}
                  <div className="mb-6 flex flex-wrap justify-center gap-4 sm:gap-6">
                    {t.footer.links.map((link: any, i: number) => (
                      <a
                        key={i}
                        href={link.href}
                        className="font-mono text-xs text-foreground/50 transition-all hover:text-foreground/70 sm:text-sm"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  
                  {/* Copyright */}
                  <p className="font-mono text-xs text-foreground/40 sm:text-xs">
                    {t.footer.copyright}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }
