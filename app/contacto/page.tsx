"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, language } = useLanguage()

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

              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
