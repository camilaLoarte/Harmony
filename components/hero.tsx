"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import Promo from "@/components/promo"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Professional Cleaning Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              {t("hero.title")}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto lg:mx-0">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-base">
                <Link href="#contact">
                  {t("hero.cta")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                <Link href="#services">{t("hero.secondary")}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">{t("about.clients")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">{t("about.experience")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>

            <Promo />
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/20">
              <img
                src="/modern-clean-living-room-with-natural-light-and-or.jpg"
                alt="Clean and organized living space"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
