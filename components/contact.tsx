"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Phone, Mail, MapPin, Calculator } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    propertyType: "",
    squareMeters: "",
    frequency: "",
    preferredDate: "",
    serviceLocation: "",
    addressDetails: "",
    message: "",
  })

  const priceEstimate = useMemo(() => {
    const meters = Number.parseFloat(formData.squareMeters) || 0
    if (meters === 0) return null

    // Base prices per square meter by service type
    const basePrices: Record<string, number> = {
      residential: 2.5,
      commercial: 2.0,
      deep: 4.0,
      moveInOut: 3.5,
      organizing: 3.0,
    }

    // Frequency discounts
    const frequencyMultiplier: Record<string, number> = {
      once: 1.0,
      weekly: 0.75,
      biweekly: 0.85,
      monthly: 0.9,
    }

    const basePrice = basePrices[formData.serviceType] || 2.5
    const frequencyDiscount = frequencyMultiplier[formData.frequency] || 1.0
    const estimatedPrice = meters * basePrice * frequencyDiscount

    // Minimum price
    const finalPrice = Math.max(estimatedPrice, 80)

    return {
      price: finalPrice.toFixed(2),
      priceRange: {
        min: (finalPrice * 0.9).toFixed(2),
        max: (finalPrice * 1.1).toFixed(2),
      },
    }
  }, [formData.squareMeters, formData.serviceType, formData.frequency])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData, "Estimated price:", priceEstimate)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
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
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.info.phone")}</h3>
                  <a href="tel:+12403083255" className="text-muted-foreground hover:text-primary transition-colors">
                    +1 (240) 308-3255
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.info.email")}</h3>
                  <a
                    href="mailto:info@harmony.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    info@harmony.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.info.address")}</h3>
                  <p className="text-muted-foreground">Maryland & Surrounding Areas</p>
                </div>
              </div>
            </div>

            {priceEstimate && (
              <Card className="mt-8 border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="w-5 h-5 text-primary" />
                    {t("contact.estimate.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    ${priceEstimate.priceRange.min} - ${priceEstimate.priceRange.max}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t("contact.estimate.disclaimer")}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>{t("contact.title")}</CardTitle>
              <CardDescription>{t("contact.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder={t("contact.name")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder={t("contact.phone")}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder={t("contact.email")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">{t("contact.serviceType")}</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => handleSelectChange("serviceType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("contact.serviceType.placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">{t("contact.service.residential")}</SelectItem>
                      <SelectItem value="commercial">{t("contact.service.commercial")}</SelectItem>
                      <SelectItem value="deep">{t("contact.service.deep")}</SelectItem>
                      <SelectItem value="moveInOut">{t("contact.service.moveInOut")}</SelectItem>
                      <SelectItem value="organizing">{t("contact.service.organizing")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">{t("contact.propertyType")}</Label>
                  <RadioGroup
                    value={formData.propertyType}
                    onValueChange={(value) => handleSelectChange("propertyType", value)}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="house" id="house" />
                      <Label htmlFor="house" className="cursor-pointer">
                        {t("contact.property.house")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="apartment" id="apartment" />
                      <Label htmlFor="apartment" className="cursor-pointer">
                        {t("contact.property.apartment")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="office" id="office" />
                      <Label htmlFor="office" className="cursor-pointer">
                        {t("contact.property.office")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="commercial" id="commercial-property" />
                      <Label htmlFor="commercial-property" className="cursor-pointer">
                        {t("contact.property.commercial")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{t("contact.squareMeters")}</Label>
                    <Input
                      name="squareMeters"
                      type="number"
                      placeholder={t("contact.squareMeters.placeholder")}
                      value={formData.squareMeters}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{t("contact.frequency")}</Label>
                    <Select
                      value={formData.frequency}
                      onValueChange={(value) => handleSelectChange("frequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("contact.frequency.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">{t("contact.frequency.once")}</SelectItem>
                        <SelectItem value="weekly">{t("contact.frequency.weekly")}</SelectItem>
                        <SelectItem value="biweekly">{t("contact.frequency.biweekly")}</SelectItem>
                        <SelectItem value="monthly">{t("contact.frequency.monthly")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Service Location */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">{t("contact.serviceLocation")} *</Label>
                  <RadioGroup
                    value={formData.serviceLocation}
                    onValueChange={(value) => handleSelectChange("serviceLocation", value)}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maryland" id="maryland" />
                      <Label htmlFor="maryland" className="cursor-pointer">
                        Maryland
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="washington" id="washington" />
                      <Label htmlFor="washington" className="cursor-pointer">
                        Washington
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="virginia" id="virginia" />
                      <Label htmlFor="virginia" className="cursor-pointer">
                        Virginia
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Address Details */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">{t("contact.addressDetails")}</Label>
                  <Textarea
                    name="addressDetails"
                    placeholder={t("contact.addressDetails.placeholder")}
                    value={formData.addressDetails}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">{t("contact.preferredDate")}</Label>
                  <Input name="preferredDate" type="date" value={formData.preferredDate} onChange={handleChange} />
                </div>

                {/* Message */}
                <div>
                  <Textarea
                    name="message"
                    placeholder={t("contact.message")}
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full">
                  {t("contact.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
