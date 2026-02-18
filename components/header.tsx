"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Phone, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { name: t("nav.home"), href: "/#home" },
    { name: t("nav.services"), href: "/#services" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.process"), href: "/#process" },
    { name: t("nav.contact"), href: "/contacto" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/#home" className="flex items-center justify-center overflow-hidden w-56 h-16 md:w-64 md:h-20 relative">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/harmony_logo.png"
                alt="Harmony Logo"
                fill
                className="scale-[2.5] transform object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+12403083255"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span> +1 (240) 888-3097</span>
            </a>
            <LanguageSwitcher />
            <Button asChild>
              <Link href="/contacto">{t("nav.getQuote")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:+12403083255"
                className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (240) 308-3255</span>
              </a>
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <Button asChild className="w-full">
                <Link href="/contacto" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.getQuote")}
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
