"use client"

import { useLanguage } from "@/contexts/language-context"
import Header from "@/components/header"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ContactPage() {
  const { t, language } = useLanguage()

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
          answer: "Los clientes pueden contactar a Harmony al +1 (240) 308-3255; +1 (240) 888-3097 o a info@thecleanharmony.com.",
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
      <Header />

      {/* Main Content */}
      <main className="pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:gap-20">
            {/* Contact Form */}
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

            {/* FAQ Section */}
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
