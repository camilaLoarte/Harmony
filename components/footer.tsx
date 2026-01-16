"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">H</span>
              </div>
              <span className="font-bold text-2xl">Harmony</span>
            </div>
            <p className="text-background/70 text-sm text-pretty">{t("footer.tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2">
              <li className="text-background/70 text-sm">{t("footer.residential")}</li>
              <li className="text-background/70 text-sm">{t("footer.deepCleaning")}</li>
              <li className="text-background/70 text-sm">{t("footer.commercial")}</li>
              <li className="text-background/70 text-sm">Move In/Move Out</li>
              <li className="text-background/70 text-sm">Organizing Services</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("nav.contact")}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+12403083255"
                  className="flex items-center gap-2 text-background/70 hover:text-background text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 (240) 308-3255</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@harmony.com"
                  className="flex items-center gap-2 text-background/70 hover:text-background text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@harmony.com</span>
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
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
    </footer>
  )
}
