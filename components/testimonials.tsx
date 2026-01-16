"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Testimonials() {
  const { t } = useLanguage()

  const testimonials = [
    {
      textKey: "testimonials.1.text",
      nameKey: "testimonials.1.name",
      roleKey: "testimonials.1.role",
      rating: 5,
    },
    {
      textKey: "testimonials.2.text",
      nameKey: "testimonials.2.name",
      roleKey: "testimonials.2.role",
      rating: 5,
    },
    {
      textKey: "testimonials.3.text",
      nameKey: "testimonials.3.name",
      roleKey: "testimonials.3.role",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t("testimonials.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-pretty">{t(testimonial.textKey)}</p>
                <div>
                  <div className="font-semibold text-foreground">{t(testimonial.nameKey)}</div>
                  <div className="text-sm text-muted-foreground">{t(testimonial.roleKey)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
