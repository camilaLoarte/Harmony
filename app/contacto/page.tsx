"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calculator, Phone, Menu, X } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, language } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    squareMeters: "",
    serviceLocation: "",
    addressDetails: "",
  })

  const priceEstimate = useMemo(() => {
    const meters = Number.parseFloat(formData.squareMeters) || 0
    if (meters === 0) return null

    const basePrices: Record<string, number> = {
      organizing: 3.0,
      residential: 2.5,
      commercial: 2.0,
      deep: 4.0,
      moveInOut: 3.5,
      special: 3.5,
    }

    const basePrice = basePrices[formData.serviceType] || 2.5
    const estimatedPrice = meters * basePrice
    const finalPrice = Math.max(estimatedPrice, 80)

    return {
      price: finalPrice.toFixed(2),
      priceRange: {
        min: (finalPrice * 0.9).toFixed(2),
        max: (finalPrice * 1.1).toFixed(2),
      },
    }
  }, [formData.squareMeters, formData.serviceType])

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

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "/#services" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.contact"), href: "/contacto" },
  ]

  const faqItems =
    language === "es"
      ? [
          {
            question: "¿Qué servicios ofrece Harmony?",
            answer:
              "Harmony ofrece servicios de organización para crear espacios ordenados, limpieza de casas y apartamentos con un enfoque en resultados de alta calidad, limpieza comercial adaptada para entornos profesionales, limpieza profunda con un enfoque minucioso y limpieza de entrada y salida para transiciones sin complicaciones.",
          },
          {
            question: "¿Cómo destaca Harmony en el servicio de la organización?",
            answer:
              "La nueva experiencia de Harmony ofrece soluciones personalizadas para diversos espacios, desde cocinas hasta armarios, asegurando que cada detalle sea atendido para brindar paz y eficiencia a tu hogar.",
          },
          {
            question: "¿Harmony ofrece servicios de calidad?",
            answer:
              "Los servicios de limpieza de Harmony prometen resultados impecables, gracias a un equipo altamente capacitado equipado con productos de limpieza de alta calidad y eco-amigables. Ya sea limpieza regular, profunda u organización, Harmony supera las expectativas.",
          },
          {
            question: "¿En qué regiones opera Harmony?",
            answer:
              "Harmony orgullosamente sirve a Maryland, Washington y Virginia, atendiendo tanto a clientes residenciales como comerciales con un compromiso con la excelencia.",
          },
          {
            question: "¿Cómo puedo contactar con Harmony?",
            answer: "Los clientes pueden contactar a Harmony al +1 (240) 308-3255.",
          },
        ]
      : [
          {
            question: "What services does Harmony offer?",
            answer:
              "Harmony offers organization services to create orderly spaces, house and apartment cleaning with a focus on high-quality results, commercial cleaning adapted for professional environments, deep cleaning with a meticulous approach, and move-in/move-out cleaning for smooth transitions.",
          },
          {
            question: "How does Harmony stand out in organization services?",
            answer:
              "Harmony's new experience offers personalized solutions for diverse spaces, from kitchens to closets, ensuring every detail is attended to bring peace and efficiency to your home.",
          },
          {
            question: "Does Harmony offer quality services?",
            answer:
              "Harmony's cleaning services promise impeccable results, thanks to a highly trained team equipped with high-quality and eco-friendly cleaning products. Whether regular cleaning, deep cleaning, or organization, Harmony exceeds expectations.",
          },
          {
            question: "In which regions does Harmony operate?",
            answer:
              "Harmony proudly serves Maryland, Washington, and Virginia, serving both residential and commercial clients with a commitment to excellence.",
          },
          {
            question: "How can I contact Harmony?",
            answer: "Customers can contact Harmony at +1 (240) 308-3255.",
          },
        ]

  const serviceTypes =
    language === "es"
      ? [
          { value: "organizing", label: "Servicios de Organización" },
          { value: "residential", label: "Limpieza de Inmuebles" },
          { value: "commercial", label: "Limpieza Comercial" },
          { value: "deep", label: "Limpieza Profunda" },
          { value: "moveInOut", label: "Limpieza de Mudanza" },
          { value: "special", label: "Limpieza en fechas especiales" },
        ]
      : [
          { value: "organizing", label: "Organization Services" },
          { value: "residential", label: "Residential Cleaning" },
          { value: "commercial", label: "Commercial Cleaning" },
          { value: "deep", label: "Deep Cleaning" },
          { value: "moveInOut", label: "Move In/Out Cleaning" },
          { value: "special", label: "Special Occasions Cleaning" },
        ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <span className="text-2xl md:text-3xl text-primary font-semibold tracking-wide">HARMONY</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2"
                  viewBox="0 0 120 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6C20 2 40 1 60 2C80 3 100 4 118 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="text-primary"
                  />
                </svg>
              </div>
            </Link>

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

            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+12403083255"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (240) 308-3255</span>
              </a>
              <LanguageSwitcher />
              <Button asChild>
                <Link href="/contacto">{t("nav.getQuote")}</Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

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

      {/* Main Content */}
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* FAQ Section */}
            <div>
              <p className="text-sm text-primary font-medium mb-2 uppercase tracking-wide">
                {language === "es" ? "PREGUNTAS DE INFORMACIÓN" : "INFORMATION QUESTIONS"}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-8">
                {language === "es" ? "PREGUNTAS FRECUENTES" : "FREQUENTLY ASKED QUESTIONS"}
              </h1>

              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                    <AccordionTrigger className="text-left text-primary hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact Form */}
            <div>
              <p className="text-sm text-primary font-medium mb-2 uppercase tracking-wide">
                {language === "es" ? "INFORMACIÓN ACERCA DE NOSOTROS" : "INFORMATION ABOUT US"}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-8">
                {language === "es"
                  ? "PÓNGASE EN CONTACTO CON NOSOTROS PARA CUALQUIER PREGUNTA"
                  : "GET IN TOUCH WITH US FOR ANY QUESTIONS"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder={language === "es" ? "Nombre Completo: *" : "Full Name: *"}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                  <div>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder={language === "es" ? "Escribe tu número *" : "Phone Number *"}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder={language === "es" ? "Dirección de correo electrónico *" : "Email Address *"}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>

                {/* Service Type and Service Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div>
                    <Label className="text-sm font-medium mb-3 block text-primary">
                      {language === "es" ? "Tipo de Servicio Requerido:" : "Service Type Required:"} *
                    </Label>
                    <RadioGroup
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                      className="space-y-2"
                    >
                      {serviceTypes.map((service) => (
                        <div key={service.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={service.value} id={service.value} />
                          <Label htmlFor={service.value} className="cursor-pointer text-sm">
                            {service.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block text-primary">
                      {language === "es" ? "Ubicación Del Servicio:" : "Service Location:"} *
                    </Label>
                    <RadioGroup
                      value={formData.serviceLocation}
                      onValueChange={(value) => setFormData({ ...formData, serviceLocation: value })}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maryland" id="maryland" />
                        <Label htmlFor="maryland" className="cursor-pointer text-sm">
                          Maryland
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="washington" id="washington" />
                        <Label htmlFor="washington" className="cursor-pointer text-sm">
                          Washington
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="virginia" id="virginia" />
                        <Label htmlFor="virginia" className="cursor-pointer text-sm">
                          Virginia
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Address Details */}
                <div className="pt-2">
                  <Label className="text-sm font-medium mb-2 block">
                    {language === "es" ? "Dirección Detallada" : "Detailed Address"}
                  </Label>
                  <Textarea
                    name="addressDetails"
                    placeholder={
                      language === "es"
                        ? "Número de casa, calles, referencias, etc."
                        : "House number, street name, references, etc."
                    }
                    value={formData.addressDetails}
                    onChange={handleChange}
                    rows={3}
                    className="resize-none"
                  />
                </div>

                {/* Area Size */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {language === "es" ? "Tamaño del Área (pies²)" : "Area Size (sq ft)"}
                  </Label>
                  <Input
                    name="squareMeters"
                    type="number"
                    placeholder={language === "es" ? "Ingresa pies cuadrados" : "Enter square feet"}
                    value={formData.squareMeters}
                    onChange={handleChange}
                    min="1"
                  />
                </div>

                {/* Price Estimate */}
                {priceEstimate && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-5 h-5 text-primary" />
                      <span className="font-medium text-primary">
                        {language === "es" ? "Precio Estimado" : "Estimated Price"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      ${priceEstimate.priceRange.min} - ${priceEstimate.priceRange.max}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === "es"
                        ? "El precio final puede variar según las condiciones reales"
                        : "Final price may vary based on actual conditions"}
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  {language === "es" ? "ENVIAR" : "SUBMIT"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
