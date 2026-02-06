"use client"

import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Briefcase, Sparkles, Calendar, Package, FolderKanban, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Home,
      titleKey: "services.residential.title",
      descKey: "services.residential.desc",
      slug: "residential-cleaning",
    },
    {
      icon: Sparkles,
      titleKey: "services.deep.title",
      descKey: "services.deep.desc",
      slug: "deep-cleaning",
    },
    {
      icon: Briefcase,
      titleKey: "services.commercial.title",
      descKey: "services.commercial.desc",
      slug: "commercial-cleaning",
    },
    {
      icon: Package,
      titleKey: "services.moveInOut.title",
      descKey: "services.moveInOut.desc",
      slug: "move-in-out",
    },
    {
      icon: Calendar,
      titleKey: "services.specialOccasions.title",
      descKey: "services.specialOccasions.desc",
      slug: "special-occasions",
    },
    {
      icon: FolderKanban,
      titleKey: "services.organizing.title",
      descKey: "services.organizing.desc",
      slug: "organizing",
    },
  ]

  return (
    <section id="services" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t("services.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link key={index} href={`/servicios/${service.slug}`} className="group">
                <Card className="border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2 flex items-center justify-between">
                      <span>{t(service.titleKey)}</span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </CardTitle>
                    <CardDescription className="text-base">
                      {t(service.descKey)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
