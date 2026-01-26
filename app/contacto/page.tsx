"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

    const basePrices: Record<string, number> = {
      organizing: 3.0,
      residential: 2.5,
      commercial: 2.0,
      deep: 4.0,
      moveInOut: 3.5,
      special: 3.5,
    }

    const frequencyMultiplier: Record<string, number> = {
      once: 1.0,
      weekly: 0.75,
      biweekly: 0.85,
      monthly: 0.9,
    }

    const basePrice = basePrices[formData.serviceType] || 2.5
    const frequencyDiscount = frequencyMultiplier[formData.frequency] || 1.0
    const estimatedPrice = meters * basePrice * frequencyDiscount
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
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl text-[#1a4d3a] font-serif tracking-wide">HARMONY</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-[#1a4d3a] transition-colors uppercase tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+12403083255"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a4d3a] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#1a4d3a]" />
                <span>+1 (240) 308-3255</span>
              </a>
              <LanguageSwitcher />
              <Button
                asChild
                className="bg-[#1a4d3a] hover:bg-[#163d2f] text-white uppercase text-xs tracking-wider px-6"
              >
                <Link href="/contacto">{language === "es" ? "Contáctame" : "Contact Me"}</Link>
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
            <div className="md:hidden py-4 border-t border-gray-200 bg-white">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-600 hover:text-[#1a4d3a] transition-colors py-2 uppercase"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                  href="tel:+12403083255"
                  className="flex items-center gap-2 text-base text-gray-600 hover:text-[#1a4d3a] transition-colors py-2"
                >
                  <Phone className="w-4 h-4 text-[#1a4d3a]" />
                  <span>+1 (240) 308-3255</span>
                </a>
                <div className="py-2">
                  <LanguageSwitcher />
                </div>
                <Button asChild className="w-full bg-[#1a4d3a] hover:bg-[#163d2f] text-white">
                  <Link href="/contacto" onClick={() => setMobileMenuOpen(false)}>
                    {language === "es" ? "Contáctame" : "Contact Me"}
                  </Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* FAQ Section - Left Side */}
            <div>
              <p className="text-xs text-[#1a4d3a] font-medium mb-3 uppercase tracking-[0.2em]">
                {language === "es" ? "PREGUNTAS DE INFORMACIÓN" : "INFORMATION QUESTIONS"}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1a4d3a] mb-10 tracking-tight">
                {language === "es" ? "PREGUNTAS FRECUENTES" : "FREQUENTLY ASKED QUESTIONS"}
              </h1>

              <Accordion type="single" collapsible className="w-full space-y-0">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-t border-gray-300 last:border-b">
                    <AccordionTrigger className="text-left text-[#1a4d3a] hover:text-[#153d2e] hover:no-underline py-5 text-base font-normal">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-5 text-sm leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact Form - Right Side */}
            <div>
              <p className="text-xs text-[#1a4d3a] font-medium mb-3 uppercase tracking-[0.2em]">
                {language === "es" ? "INFORMACIÓN ACERCA DE NOSOTROS" : "INFORMATION ABOUT US"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a4d3a] mb-10 tracking-tight leading-tight">
                {language === "es"
                  ? "PÓNGASE EN CONTACTO CON NOSOTROS PARA CUALQUIER PREGUNTA"
                  : "GET IN TOUCH WITH US FOR ANY QUESTIONS"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Phone - Side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Input
                      name="name"
                      placeholder={language === "es" ? "Nombre Completo: *" : "Full Name: *"}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-0 border-b border-gray-400 rounded-none px-0 py-3 text-gray-700 placeholder:text-[#1a4d3a] focus-visible:ring-0 focus-visible:border-[#1a4d3a] transition-colors"
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
                      className="bg-transparent border-0 border-b border-gray-400 rounded-none px-0 py-3 text-gray-700 placeholder:text-[#1a4d3a] focus-visible:ring-0 focus-visible:border-[#1a4d3a] transition-colors"
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
                    className="bg-transparent border-0 border-b border-gray-400 rounded-none px-0 py-3 text-gray-700 placeholder:text-[#1a4d3a] focus-visible:ring-0 focus-visible:border-[#1a4d3a] transition-colors"
                  />
                </div>

                {/* Service Type - Select Dropdown */}
                <div className="pt-2">
                  <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                    {language === "es" ? "Tipo de Servicio" : "Service Type"}
                  </Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => handleSelectChange("serviceType", value)}
                  >
                    <SelectTrigger className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]">
                      <SelectValue placeholder={language === "es" ? "Selecciona un servicio" : "Select a service"} />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Type - Radio Buttons */}
                <div>
                  <Label className="text-sm font-medium mb-3 block text-[#1a4d3a]">
                    {language === "es" ? "Tipo de Propiedad" : "Property Type"}
                  </Label>
                  <RadioGroup
                    value={formData.propertyType}
                    onValueChange={(value) => handleSelectChange("propertyType", value)}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="house" id="house-page" className="border-gray-400 text-[#1a4d3a]" />
                      <Label htmlFor="house-page" className="cursor-pointer text-sm text-gray-700">
                        {language === "es" ? "Casa" : "House"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="apartment" id="apartment-page" className="border-gray-400 text-[#1a4d3a]" />
                      <Label htmlFor="apartment-page" className="cursor-pointer text-sm text-gray-700">
                        {language === "es" ? "Apartamento" : "Apartment"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="office" id="office-page" className="border-gray-400 text-[#1a4d3a]" />
                      <Label htmlFor="office-page" className="cursor-pointer text-sm text-gray-700">
                        {language === "es" ? "Oficina" : "Office"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="commercial" id="commercial-page" className="border-gray-400 text-[#1a4d3a]" />
                      <Label htmlFor="commercial-page" className="cursor-pointer text-sm text-gray-700">
                        {language === "es" ? "Local Comercial" : "Commercial"}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Area Size and Frequency - Side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                      {language === "es" ? "Tamaño del Área (pies²)" : "Area Size (sq ft)"}
                    </Label>
                    <Input
                      name="squareMeters"
                      type="number"
                      placeholder={language === "es" ? "Ingresa pies cuadrados" : "Enter square feet"}
                      value={formData.squareMeters}
                      onChange={handleChange}
                      min="1"
                      className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                      {language === "es" ? "Frecuencia de Limpieza" : "Cleaning Frequency"}
                    </Label>
                    <Select
                      value={formData.frequency}
                      onValueChange={(value) => handleSelectChange("frequency", value)}
                    >
                      <SelectTrigger className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]">
                        <SelectValue placeholder={language === "es" ? "Selecciona frecuencia" : "Select frequency"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">{language === "es" ? "Una vez" : "One time"}</SelectItem>
                        <SelectItem value="weekly">{language === "es" ? "Semanal (-25%)" : "Weekly (-25%)"}</SelectItem>
                        <SelectItem value="biweekly">{language === "es" ? "Quincenal (-15%)" : "Biweekly (-15%)"}</SelectItem>
                        <SelectItem value="monthly">{language === "es" ? "Mensual (-10%)" : "Monthly (-10%)"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Service Location - Radio Buttons */}
                <div>
                  <Label className="text-sm font-medium mb-3 block text-[#1a4d3a]">
                    {language === "es" ? "Ubicación Del Servicio" : "Service Location"} *
                  </Label>
                  <RadioGroup
                    value={formData.serviceLocation}
                    onValueChange={(value) => handleSelectChange("serviceLocation", value)}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maryland" id="maryland-page" className="border-gray-400 text-[#1a4d3a]" />
                      <Label htmlFor="maryland-page" className="cursor-pointer text-sm text-gray-700">Maryland</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="washington" id="washington-page" className="border-gray-400 text-[#1a4d3a]" />
                      <Label htmlFor="washington-page" className="cursor-pointer text-sm text-gray-700">Washington</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="virginia" id="virginia-page" className="border-gray-400 text-[#1a4d3a]" />
                      <Label htmlFor="virginia-page" className="cursor-pointer text-sm text-gray-700">Virginia</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Address Details */}
                <div>
                  <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
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
                    className="resize-none bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                  />
                </div>

                {/* Preferred Date */}
                <div>
                  <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                    {language === "es" ? "Fecha Preferida" : "Preferred Date"}
                  </Label>
                  <Input
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                  />
                </div>

                {/* Additional Details */}
                <div>
                  <Textarea
                    name="message"
                    placeholder={
                      language === "es"
                        ? "Detalles Adicionales o Solicitudes Especiales"
                        : "Additional Details or Special Requests"
                    }
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="resize-none bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                  />
                </div>

                {/* Price Estimate */}
                {priceEstimate && (
                  <div className="p-5 bg-[#1a4d3a]/5 border border-[#1a4d3a]/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-5 h-5 text-[#1a4d3a]" />
                      <span className="font-medium text-[#1a4d3a]">
                        {language === "es" ? "Precio Estimado" : "Estimated Price"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-[#1a4d3a]">
                      ${priceEstimate.priceRange.min} - ${priceEstimate.priceRange.max}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {language === "es"
                        ? "El precio final puede variar según las condiciones reales"
                        : "Final price may vary based on actual conditions"}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-[#1a4d3a] hover:bg-[#153d2e] text-white uppercase text-sm tracking-wider px-10 py-6"
                >
                  {language === "es" ? "Obtener Mi Cotización" : "Get My Quote"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
