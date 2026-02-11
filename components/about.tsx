"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

const benefitKeys = [
  "about.benefit1",
  "about.benefit2",
  "about.benefit3",
  "about.benefit4",
  "about.benefit5",
  "about.benefit6",
]

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/20">
              <img
                src="/professional-cleaner-organizing-and-cleaning-a-mod.jpg"
                alt="Professional cleaning service"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {t("about.title")}
            </h2>

            <p className="text-lg text-muted-foreground mb-4 text-pretty">{t("about.subtitle")}</p>

            <p className="text-base text-muted-foreground mb-6 text-pretty">{t("about.description")}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {benefitKeys.map((key, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{t(key)}</span>
                </div>
              ))}
            </div>

            <Button asChild size="lg">
              <Link href="#contact">{t("about.cta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
