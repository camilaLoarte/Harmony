"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-72 h-20 overflow-hidden">
                <Image
                  src="/harmony_logo.png"
                  alt="Harmony Logo"
                  fill
                  className="scale-[3.2] transform object-contain brightness-0 invert"
                  priority
                />
              </div>
            </div>
            <p className="text-background/70 text-sm text-center lg:text-left text-pretty">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#home" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios/residential-cleaning" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("footer.residential")}
                </Link>
              </li>
              <li>
                <Link href="/servicios/deep-cleaning" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("footer.deepCleaning")}
                </Link>
              </li>
              <li>
                <Link href="/servicios/commercial-cleaning" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("footer.commercial")}
                </Link>
              </li>
              <li>
                <Link href="/servicios/move-in-out" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("services.moveInOut.title")}
                </Link>
              </li>
              <li>
                <Link href="/servicios/special-occasions" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("services.specialOccasions.title")}
                </Link>
              </li>
              <li>
                <Link href="/servicios/organizing" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("services.organizing.title")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("nav.contact")}</h3>
            <ul className="space-y-3">
              <li>
                <div className="flex items-center gap-2 text-background/70 text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span>+1 (240) 308-3255</span>
                    <span>+1 (240) 888-3097</span>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="mailto:info@thecleanharmony.com"
                  className="flex items-center gap-2 text-background/70 hover:text-background text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@thecleanharmony.com</span>
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61561817236173"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/the.clean.harmony/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="text-center text-background/70 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Harmony Cleaning Services. {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer >
  )
}
