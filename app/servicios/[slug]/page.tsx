"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Menu, X, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Promo from "@/components/promo"
import ImageComparison from "@/components/image-comparison"

interface ServiceData {
  slug: string
  image: string
  secondaryImage: string
  titleEn: string
  titleEs: string
  subtitleEn: string
  subtitleEs: string
  descriptionEn: string
  descriptionEs: string
}

const servicesData: ServiceData[] = [
  {
    slug: "residential-cleaning",
    image: "/services/DespuesDP.png",
    secondaryImage: "/services/AntesDP.png",
    titleEn: "Residential Cleaning",
    titleEs: "Limpieza Residencial",
    subtitleEn:
      "Your home deserves the best care. Our residential cleaning services bring comfort and cleanliness to every room.",
    subtitleEs:
      "Tu hogar merece el mejor cuidado. Nuestros servicios de limpieza residencial traen comodidad y limpieza a cada habitacion.",
    descriptionEn:
      "Our residential cleaning service covers every corner of your home, from kitchen countertops to bathroom tiles. We use eco-friendly products and proven techniques to ensure your living space is not just clean, but truly refreshed. Whether you need regular maintenance or a one-time thorough clean, our trained team delivers consistent, high-quality results that you can trust.",
    descriptionEs:
      "Nuestro servicio de limpieza residencial cubre cada rincon de tu hogar, desde las encimeras de la cocina hasta los azulejos del bano. Usamos productos ecologicos y tecnicas comprobadas para asegurar que tu espacio de vida no solo este limpio, sino verdaderamente renovado. Ya sea que necesites mantenimiento regular o una limpieza exhaustiva unica, nuestro equipo capacitado ofrece resultados consistentes y de alta calidad en los que puedes confiar.",
  },
  {
    slug: "deep-cleaning",
    image: "/services/DespuesDC.png",
    secondaryImage: "/services/AntesDC.png",
    titleEn: "Deep Cleaning",
    titleEs: "Limpieza Profunda",
    subtitleEn:
      "When it comes to a thorough cleaning, our meticulous attention to detail makes all the difference.",
    subtitleEs:
      "Cuando se trata de una limpieza a fondo, nuestra atencion meticulosa a los detalles marca la diferencia.",
    descriptionEn:
      "With our deep cleaning service, no corner will be left untreated. From removing dirt buildup to thorough disinfection, we leave your space rejuvenated and germ-free. Trust our team to revitalize your home or office with a deep clean that goes beyond the surface.",
    descriptionEs:
      "Con nuestro servicio de limpieza profunda, ningun rincon quedara sin tratar. Desde la eliminacion de acumulaciones de suciedad hasta la desinfeccion minuciosa, dejamos su espacio rejuvenecido y libre de germenes. Confie en nuestro equipo para revitalizar su hogar u oficina con una limpieza profunda que va mas alla de lo superficial.",
  },
  {
    slug: "commercial-cleaning",
    image: "/services/DespuesCC.png",
    secondaryImage: "/services/AntesCC.png",
    titleEn: "Commercial Cleaning",
    titleEs: "Limpieza Comercial",
    subtitleEn:
      "A clean workplace boosts productivity and morale. Let us handle the cleaning so you can focus on your business.",
    subtitleEs:
      "Un lugar de trabajo limpio aumenta la productividad y la moral. Dejanos encargarnos de la limpieza para que puedas concentrarte en tu negocio.",
    descriptionEn:
      "Our commercial cleaning services are tailored for offices, retail spaces, and business environments. We work around your schedule to minimize disruption, using professional-grade equipment and products. From daily maintenance to periodic deep cleans, we ensure your workspace always makes a great first impression on clients and employees alike.",
    descriptionEs:
      "Nuestros servicios de limpieza comercial estan disenados para oficinas, espacios comerciales y entornos empresariales. Trabajamos segun tu horario para minimizar las interrupciones, utilizando equipos y productos de grado profesional. Desde el mantenimiento diario hasta limpiezas profundas periodicas, nos aseguramos de que tu espacio de trabajo siempre cause una gran primera impresion en clientes y empleados.",
  },
  {
    slug: "move-in-out",
    image: "/services/DespuesMM.png",
    secondaryImage: "/services/AntesMM.png",
    titleEn: "Move In / Move Out",
    titleEs: "Mudanzas",
    subtitleEn:
      "Starting fresh in a new space? We make sure it is spotless before you move in or after you move out.",
    subtitleEs:
      "Empezando de nuevo en un espacio nuevo? Nos aseguramos de que este impecable antes de que te mudes o despues de que te vayas.",
    descriptionEn:
      "Moving is stressful enough without worrying about cleaning. Our move-in/move-out service ensures every surface, cabinet, and fixture is thoroughly cleaned. We handle the deep scrubbing, sanitizing, and polishing so you can focus on settling into your new home or leaving your old one in perfect condition for the next occupant.",
    descriptionEs:
      "Mudarse es suficientemente estresante sin preocuparse por la limpieza. Nuestro servicio de mudanza asegura que cada superficie, gabinete y accesorio este completamente limpio. Nos encargamos del fregado profundo, la desinfeccion y el pulido para que puedas concentrarte en instalarte en tu nuevo hogar o dejar el antiguo en perfectas condiciones para el proximo ocupante.",
  },
  {
    slug: "special-occasions",
    image: "/services/DespuesFE.png",
    secondaryImage: "/services/AntesFE.png",
    titleEn: "Special Occasions",
    titleEs: "Ocasiones Especiales",
    subtitleEn:
      "Hosting a party or special event? Let us handle the pre and post-event cleaning so you can enjoy the moment.",
    subtitleEs:
      "Organizas una fiesta o evento especial? Dejanos encargarnos de la limpieza previa y posterior al evento para que puedas disfrutar del momento.",
    descriptionEn:
      "Whether it is a birthday party, holiday gathering, or corporate event, our special occasions cleaning service ensures your space looks its best before guests arrive and is restored to perfection after they leave. We handle everything from pre-event staging to post-event cleanup, giving you one less thing to worry about.",
    descriptionEs:
      "Ya sea una fiesta de cumpleaños, una reunion festiva o un evento corporativo, nuestro servicio de limpieza para ocasiones especiales asegura que tu espacio luzca perfecto antes de que lleguen los invitados y se restaure a la perfeccion despues de que se vayan. Nos encargamos de todo, desde la preparacion previa al evento hasta la limpieza posterior, dandote una preocupacion menos.",
  },
  {
    slug: "organizing",
    image: "/services/DespuesOS.png",
    secondaryImage: "/services/AntesOS.png",
    titleEn: "Organizing Services",
    titleEs: "Servicios de Organizacion",
    subtitleEn:
      "A well-organized space brings peace of mind. Our professional organizers transform chaos into order.",
    subtitleEs:
      "Un espacio bien organizado trae paz mental. Nuestros organizadores profesionales transforman el caos en orden.",
    descriptionEn:
      "Our professional organizing service goes beyond simple tidying. We work with you to create customized systems for closets, kitchens, garages, and more. Our organizers help you declutter, categorize, and optimize your space so that everything has its place. The result is a home or office that functions efficiently and feels calm and inviting.",
    descriptionEs:
      "Nuestro servicio de organización profesional va mas alla del simple orden. Trabajamos contigo para crear sistemas personalizados para armarios, cocinas, garajes y mas. Nuestros organizadores te ayudan a despejar, categorizar y optimizar tu espacio para que todo tenga su lugar. El resultado es un hogar u oficina que funciona eficientemente y se siente tranquilo y acogedor.",
  },
]

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { language, t } = useLanguage()
  const [phone, setPhone] = useState("")

  const service = servicesData.find((s) => s.slug === slug)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/contacto"
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1a4d3a] mb-4">
            {language === "es" ? "Servicio no encontrado" : "Service not found"}
          </h1>
          <Button asChild className="bg-[#1a4d3a] hover:bg-[#163d2f] text-white">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "es" ? "Volver al inicio" : "Back to home"}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const title = language === "es" ? service.titleEs : service.titleEn
  const subtitle = language === "es" ? service.subtitleEs : service.subtitleEn
  const description = language === "es" ? service.descriptionEs : service.descriptionEn

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-24 md:pt-32">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 text-balance uppercase tracking-wide">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Images */}
            {/* Before/After Comparison */}
            <div className="w-full">
              <ImageComparison
                beforeImage={service.secondaryImage}
                afterImage={service.image}
                beforeLabel={language === "es" ? "Antes" : "Before"}
                afterLabel={language === "es" ? "Después" : "After"}
                alt={title}
              />
            </div>

            {/* Text Content - Ajustado a Justificado y Centrado verticalmente */}
            <div className="flex flex-col justify-center">
              <p className="text-lg md:text-xl font-semibold text-[#1a4d3a] mb-6 text-justify text-pretty">
                {subtitle}
              </p>
              <p className="text-base text-gray-600 leading-relaxed text-justify text-pretty">
                {description}
              </p>

              <div className="mt-8">
                <Button asChild size="lg" className="bg-[#1a4d3a] hover:bg-[#163d2f] text-white uppercase tracking-wider">
                  <Link href="/contacto">
                    {t("nav.getQuote")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Phone Section */}
      <Promo />
      {/* <section className="py-12 md:py-16 bg-[#1a4d3a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("promo.title")}</h2>
            <p className="text-white/85 mb-8 text-pretty">
              {language === "es"
                ? "Deje su número de teléfono móvil y le devolveremos la llamada."
                : "Leave your mobile phone number and we'll call you back."}
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={
                    language === "es"
                      ? "Escribe tu numero *"
                      : "Enter your phone number *"
                  }
                  className="flex-1 h-12 bg-white border-white/50 text-gray-700 placeholder:text-gray-500"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-6 font-semibold bg-white text-[#1a4d3a] hover:bg-gray-100 uppercase text-xs tracking-wider"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {language === "es" ? "Timbrame" : "Call Me"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  )
}