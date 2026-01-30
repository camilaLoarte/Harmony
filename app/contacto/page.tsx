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
import { submitContactForm } from "@/app/actions/contact-actions"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

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

  // State for form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("email", formData.email)
    formDataToSend.append("phone", formData.phone)
    formDataToSend.append("serviceType", formData.serviceType)
    formDataToSend.append("serviceLocation", formData.serviceLocation)
    formDataToSend.append("squareMeters", formData.squareMeters)
    formDataToSend.append("addressDetails", formData.addressDetails)

    const result = await submitContactForm(null, formDataToSend)

    if (result.success) {
      toast.success(language === "es" ? "Solicitud enviada con éxito!" : "Request sent successfully!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        squareMeters: "",
        serviceLocation: "",
        addressDetails: "",
      })
      setErrors({}) // Clear errors on success
      setShowSuccess(true)
    } else {
      if (result.errors) {
        setErrors(result.errors)
        toast.error(language === "es" ? "Por favor corrija los errores en el formulario." : "Please fix the errors in the form.")
      } else {
        toast.error(result.message)
      }
    }
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
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Service Type and Service Location - Side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  <div>
                    <Label className="text-sm font-medium mb-4 block text-[#1a4d3a]">
                      {language === "es" ? "Tipo de Servicio Requerido:" : "Service Type Required:"} *
                    </Label>
                    <RadioGroup
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                      className="space-y-3"
                    >
                      {serviceTypes.map((service) => (
                        <div key={service.value} className="flex items-center space-x-3">
                          <RadioGroupItem
                            value={service.value}
                            id={service.value}
                            className="border-gray-400 text-[#1a4d3a] focus:ring-[#1a4d3a]"
                          />
                          <Label htmlFor={service.value} className="cursor-pointer text-sm text-gray-700 font-normal">
                            {service.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-4 block text-[#1a4d3a]">
                      {language === "es" ? "Ubicación Del Servicio:" : "Service Location:"} *
                    </Label>
                    <RadioGroup
                      value={formData.serviceLocation}
                      onValueChange={(value) => setFormData({ ...formData, serviceLocation: value })}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="maryland"
                          id="maryland-page"
                          className="border-gray-400 text-[#1a4d3a] focus:ring-[#1a4d3a]"
                        />
                        <Label htmlFor="maryland-page" className="cursor-pointer text-sm text-gray-700 font-normal">
                          Maryland
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="washington"
                          id="washington-page"
                          className="border-gray-400 text-[#1a4d3a] focus:ring-[#1a4d3a]"
                        />
                        <Label htmlFor="washington-page" className="cursor-pointer text-sm text-gray-700 font-normal">
                          Washington
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="virginia"
                          id="virginia-page"
                          className="border-gray-400 text-[#1a4d3a] focus:ring-[#1a4d3a]"
                        />
                        <Label htmlFor="virginia-page" className="cursor-pointer text-sm text-gray-700 font-normal">
                          Virginia
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.serviceLocation && <p className="text-red-500 text-xs mt-1">{errors.serviceLocation}</p>}
                  </div>
                </div>

                {/* Address Details */}
                <div className="pt-2">
                  <Label className="text-sm font-medium mb-3 block text-[#1a4d3a]">
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
                  {errors.addressDetails && <p className="text-red-500 text-xs mt-1">{errors.addressDetails}</p>}
                </div>

                {/* Area Size */}
                <div>
                  <Label className="text-sm font-medium mb-3 block text-[#1a4d3a]">
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
                  {errors.squareMeters && <p className="text-red-500 text-xs mt-1">{errors.squareMeters}</p>}
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
                  {language === "es" ? "ENVIAR" : "SEND"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1a4d3a]">
              {language === "es" ? "¡Mensaje Enviado!" : "Message Sent!"}
            </DialogTitle>
            <DialogDescription>
              {language === "es"
                ? "Hemos recibido tu solicitud correctamente. Nos pondremos en contacto contigo pronto."
                : "We have received your request successfully. We will contact you soon."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => setShowSuccess(false)}
              className="bg-[#1a4d3a] hover:bg-[#153d2e] text-white"
            >
              {language === "es" ? "Cerrar" : "Close"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
