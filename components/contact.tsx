"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ContactForm from "@/components/contact-form"

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="pt-8 md:pt-12 pb-16 md:pb-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">{t("contact.subtitle")}</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1a4d3a]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#1a4d3a]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.info.phone")}</h3>
                  <a href="tel:+12403083255" className="text-muted-foreground hover:text-[#1a4d3a] transition-colors">
                    +1 (240) 308-3255
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1a4d3a]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#1a4d3a]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.info.email")}</h3>
                  <a
                    href="mailto:info@harmony.com"
                    className="text-muted-foreground hover:text-[#1a4d3a] transition-colors"
                  >
                    info@harmony.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1a4d3a]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#1a4d3a]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.info.address")}</h3>
                  <p className="text-muted-foreground">Maryland & Surrounding Areas</p>
                </div>
              </div>
            </div>
            {/* Price estimate is now included in the ContactForm component */}
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>{t("contact.title")}</CardTitle>
              <CardDescription>{t("contact.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
