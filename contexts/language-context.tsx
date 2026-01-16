"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.process": "Process",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.getQuote": "Get a Quote",

    // Hero
    "hero.title": "Transform Your Space Into a Sanctuary of Peace",
    "hero.subtitle": "Professional cleaning services that bring harmony and cleanliness to your home or business",
    "hero.cta": "Get Your Free Quote",
    "hero.secondary": "Learn More",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive cleaning solutions tailored to your needs",
    "services.residential.title": "Residential Cleaning",
    "services.residential.desc":
      "Complete home cleaning services including deep cleaning, regular maintenance, and move-in/move-out cleaning.",
    "services.commercial.title": "Commercial Cleaning",
    "services.commercial.desc":
      "Professional office and business cleaning to maintain a pristine work environment for your team.",
    "services.deep.title": "Deep Cleaning",
    "services.deep.desc":
      "Thorough detailed cleaning reaching every corner, perfect for seasonal cleaning or special occasions.",
    "services.moveInOut.title": "Move In/Out",
    "services.moveInOut.desc":
      "Thorough cleaning for moving transitions, ensuring your space is pristine for new beginnings.",
    "services.specialOccasions.title": "Special Occasions",
    "services.specialOccasions.desc":
      "Pre and post-event cleaning to make your special occasions stress-free and memorable.",
    "services.organizing.title": "Organizing Services",
    "services.organizing.desc":
      "Professional organization solutions to declutter and optimize your living or working space.",
    "services.eco.title": "Eco-Friendly Options",
    "services.eco.desc": "Environmentally conscious cleaning using sustainable products and practices.",

    // About
    "about.title": "About Harmony",
    "about.subtitle": "Your trusted partner in cleanliness",
    "about.description":
      "At Harmony, we believe that a clean space is the foundation of a peaceful life. With over 10 years of experience, our dedicated team of professionals delivers exceptional cleaning services with attention to detail and a commitment to your satisfaction.",
    "about.benefit1": "Professionally trained cleaning experts",
    "about.benefit2": "Eco-friendly cleaning products",
    "about.benefit3": "Customized cleaning plans",
    "about.benefit4": "Affordable pricing packages",
    "about.benefit5": "Fully insured and bonded",
    "about.benefit6": "Satisfaction guaranteed",
    "about.cta": "Schedule Now",
    "about.experience": "Years of Experience",
    "about.clients": "Happy Clients",
    "about.team": "Professional Team Members",

    // Process
    "process.title": "How It Works",
    "process.subtitle": "Simple steps to a cleaner space",
    "process.step1.title": "Book Online",
    "process.step1.desc": "Schedule your service through our easy online booking system.",
    "process.step2.title": "We Arrive",
    "process.step2.desc": "Our professional team arrives on time with all necessary equipment.",
    "process.step3.title": "We Clean",
    "process.step3.desc": "We perform thorough cleaning according to your specific requirements.",
    "process.step4.title": "You Relax",
    "process.step4.desc": "Enjoy your spotlessly clean space with complete peace of mind.",

    // Testimonials
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle": "Real feedback from satisfied customers",
    "testimonials.1.text":
      "Harmony has been cleaning our office for over a year. Their attention to detail is impeccable, and the staff is always professional and courteous.",
    "testimonials.1.name": "Sarah Johnson",
    "testimonials.1.role": "Office Manager",
    "testimonials.2.text":
      "I love coming home to a clean house! The team is reliable, thorough, and uses eco-friendly products which is very important to me.",
    "testimonials.2.name": "Michael Chen",
    "testimonials.2.role": "Homeowner",
    "testimonials.3.text":
      "Best cleaning service I have ever used. They transformed my apartment before I moved in. Highly recommend!",
    "testimonials.3.name": "Emily Rodriguez",
    "testimonials.3.role": "Satisfied Customer",

    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "Ready to experience the harmony of a clean space?",
    "contact.name": "Full Name",
    "contact.email": "Email",
    "contact.phone": "Phone Number",
    "contact.serviceType": "Service Type",
    "contact.serviceType.placeholder": "Select a service",
    "contact.service.residential": "Residential Cleaning",
    "contact.service.commercial": "Commercial Cleaning",
    "contact.service.deep": "Deep Cleaning",
    "contact.service.moveInOut": "Move In/Out Cleaning",
    "contact.service.organizing": "Organizing Services",
    "contact.service.other": "Other",
    "contact.propertyType": "Property Type",
    "contact.property.house": "House",
    "contact.property.apartment": "Apartment",
    "contact.property.office": "Office",
    "contact.property.commercial": "Commercial Space",
    "contact.squareMeters": "Area Size (sq ft)",
    "contact.squareMeters.placeholder": "Enter square feet",
    "contact.frequency": "Cleaning Frequency",
    "contact.frequency.placeholder": "Select frequency",
    "contact.frequency.once": "One-time",
    "contact.frequency.weekly": "Weekly (25% off)",
    "contact.frequency.biweekly": "Bi-weekly (15% off)",
    "contact.frequency.monthly": "Monthly (10% off)",
    "contact.serviceLocation": "Service Location",
    "contact.addressDetails": "Detailed Address",
    "contact.addressDetails.placeholder": "House number, street name, references, etc.",
    "contact.preferredDate": "Preferred Date",
    "contact.message": "Additional Details or Special Requests",
    "contact.submit": "Get My Quote",
    "contact.estimate.title": "Estimated Price",
    "contact.estimate.disclaimer": "Final price may vary based on actual conditions",
    "contact.info.title": "Contact Information",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.address": "Address",
    "contact.info.hours": "Business Hours",
    "contact.info.hoursValue": "Monday - Saturday: 8am - 6pm",

    // Footer
    "footer.tagline": "Professional cleaning services that bring harmony to your space",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.residential": "Residential",
    "footer.commercial": "Commercial",
    "footer.deepCleaning": "Deep Cleaning",
    "footer.ecoFriendly": "Eco-Friendly",
    "footer.followUs": "Follow Us",
    "footer.rights": "All rights reserved.",

    // Promo
    "promo.title": "Get Our Special Offers!",
    "promo.subtitle": "Leave your number and receive exclusive discounts and promotions",
    "promo.placeholder": "Enter your phone number",
    "promo.cta": "Call Me",
    "promo.benefit1": "First Service Discount",
    "promo.benefit2": "Special Packages",
    "promo.benefit3": "Fast Response",
  },
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.about": "Nosotros",
    "nav.process": "Proceso",
    "nav.testimonials": "Testimonios",
    "nav.contact": "Contacto",
    "nav.getQuote": "Obtener Cotización",

    // Hero
    "hero.title": "Transforma Tu Espacio en un Santuario de Paz",
    "hero.subtitle": "Servicios profesionales de limpieza que traen armonía y limpieza a tu hogar o negocio",
    "hero.cta": "Obtén Tu Cotización Gratis",
    "hero.secondary": "Conoce Más",

    // Services
    "services.title": "Nuestros Servicios",
    "services.subtitle": "Soluciones integrales de limpieza adaptadas a tus necesidades",
    "services.residential.title": "Limpieza Residencial",
    "services.residential.desc":
      "Servicios completos de limpieza del hogar incluyendo limpieza profunda, mantenimiento regular y limpieza de mudanzas.",
    "services.commercial.title": "Limpieza Comercial",
    "services.commercial.desc":
      "Limpieza profesional de oficinas y negocios para mantener un ambiente de trabajo impecable para tu equipo.",
    "services.deep.title": "Limpieza Profunda",
    "services.deep.desc":
      "Limpieza detallada y exhaustiva llegando a cada rincón, perfecta para limpieza estacional u ocasiones especiales.",
    "services.moveInOut.title": "Mudanzas",
    "services.moveInOut.desc":
      "Limpieza exhaustiva para transiciones de mudanza, asegurando que tu espacio esté impecable para nuevos comienzos.",
    "services.specialOccasions.title": "Ocasiones Especiales",
    "services.specialOccasions.desc":
      "Limpieza previa y posterior a eventos para que tus ocasiones especiales sean libres de estrés y memorables.",
    "services.organizing.title": "Servicios de Organización",
    "services.organizing.desc":
      "Soluciones profesionales de organización para ordenar y optimizar tu espacio de vida o trabajo.",
    "services.eco.title": "Opciones Ecológicas",
    "services.eco.desc": "Limpieza consciente con el medio ambiente utilizando productos y prácticas sostenibles.",

    // About
    "about.title": "Acerca de Harmony",
    "about.subtitle": "Tu socio de confianza en limpieza",
    "about.description":
      "En Harmony, creemos que un espacio limpio es la base de una vida tranquila. Con más de 10 años de experiencia, nuestro dedicado equipo de profesionales ofrece servicios excepcionales de limpieza con atención al detalle y un compromiso con tu satisfacción.",
    "about.benefit1": "Expertos en limpieza profesionalmente capacitados",
    "about.benefit2": "Productos de limpieza ecológicos",
    "about.benefit3": "Planes de limpieza personalizados",
    "about.benefit4": "Paquetes de precios asequibles",
    "about.benefit5": "Totalmente asegurados y garantizados",
    "about.benefit6": "Satisfacción garantizada",
    "about.cta": "Programar Ahora",
    "about.experience": "Años de Experiencia",
    "about.clients": "Clientes Satisfechos",
    "about.team": "Miembros del Equipo Profesional",

    // Process
    "process.title": "Cómo Funciona",
    "process.subtitle": "Pasos simples hacia un espacio más limpio",
    "process.step1.title": "Reserva en Línea",
    "process.step1.desc": "Programa tu servicio a través de nuestro fácil sistema de reservas en línea.",
    "process.step2.title": "Llegamos",
    "process.step2.desc": "Nuestro equipo profesional llega puntualmente con todo el equipo necesario.",
    "process.step3.title": "Limpiamos",
    "process.step3.desc": "Realizamos una limpieza exhaustiva según tus requisitos específicos.",
    "process.step4.title": "Tú Descansas",
    "process.step4.desc": "Disfruta de tu espacio impecablemente limpio con total tranquilidad.",

    // Testimonials
    "testimonials.title": "Lo Que Dicen Nuestros Clientes",
    "testimonials.subtitle": "Comentarios reales de clientes satisfechos",
    "testimonials.1.text":
      "Harmony ha estado limpiando nuestra oficina por más de un año. Su atención al detalle es impecable, y el personal siempre es profesional y cortés.",
    "testimonials.1.name": "Sarah Johnson",
    "testimonials.1.role": "Gerente de Oficina",
    "testimonials.2.text":
      "Me encanta llegar a casa y encontrarla limpia! El equipo es confiable, minucioso y usa productos ecológicos, lo cual es muy importante para mí.",
    "testimonials.2.name": "Michael Chen",
    "testimonials.2.role": "Propietario",
    "testimonials.3.text":
      "El mejor servicio de limpieza que he usado. Transformaron mi apartamento antes de mudarme. ¡Altamente recomendado!",
    "testimonials.3.name": "Emily Rodríguez",
    "testimonials.3.role": "Cliente Satisfecha",

    // Contact
    "contact.title": "Contáctanos",
    "contact.subtitle": "¿Listo para experimentar la armonía de un espacio limpio?",
    "contact.name": "Nombre Completo",
    "contact.email": "Correo Electrónico",
    "contact.phone": "Número de Teléfono",
    "contact.serviceType": "Tipo de Servicio",
    "contact.serviceType.placeholder": "Selecciona un servicio",
    "contact.service.residential": "Limpieza Residencial",
    "contact.service.commercial": "Limpieza Comercial",
    "contact.service.deep": "Limpieza Profunda",
    "contact.service.moveInOut": "Limpieza de Mudanza",
    "contact.service.organizing": "Servicios de Organización",
    "contact.service.other": "Otro",
    "contact.propertyType": "Tipo de Propiedad",
    "contact.property.house": "Casa",
    "contact.property.apartment": "Apartamento",
    "contact.property.office": "Oficina",
    "contact.property.commercial": "Local Comercial",
    "contact.squareMeters": "Tamaño del Área (pies²)",
    "contact.squareMeters.placeholder": "Ingresa pies cuadrados",
    "contact.frequency": "Frecuencia de Limpieza",
    "contact.frequency.placeholder": "Selecciona frecuencia",
    "contact.frequency.once": "Una vez",
    "contact.frequency.weekly": "Semanal (25% desc.)",
    "contact.frequency.biweekly": "Quincenal (15% desc.)",
    "contact.frequency.monthly": "Mensual (10% desc.)",
    "contact.serviceLocation": "Ubicación Del Servicio",
    "contact.addressDetails": "Dirección Detallada",
    "contact.addressDetails.placeholder": "Número de casa, calles, referencias, etc.",
    "contact.preferredDate": "Fecha Preferida",
    "contact.message": "Detalles Adicionales o Solicitudes Especiales",
    "contact.submit": "Obtener Mi Cotización",
    "contact.estimate.title": "Precio Estimado",
    "contact.estimate.disclaimer": "El precio final puede variar según las condiciones reales",
    "contact.info.title": "Información de Contacto",
    "contact.info.phone": "Teléfono",
    "contact.info.email": "Correo",
    "contact.info.address": "Dirección",
    "contact.info.hours": "Horario de Atención",
    "contact.info.hoursValue": "Lunes - Sábado: 8am - 6pm",

    // Footer
    "footer.tagline": "Servicios profesionales de limpieza que traen armonía a tu espacio",
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.services": "Servicios",
    "footer.residential": "Residencial",
    "footer.commercial": "Comercial",
    "footer.deepCleaning": "Limpieza Profunda",
    "footer.ecoFriendly": "Ecológico",
    "footer.followUs": "Síguenos",
    "footer.rights": "Todos los derechos reservados.",

    // Promo
    "promo.title": "¡Obtén Nuestras Ofertas!",
    "promo.subtitle": "Deja tu número y recibe descuentos y promociones exclusivas",
    "promo.placeholder": "Escribe tu número",
    "promo.cta": "Tímbrame",
    "promo.benefit1": "Descuento Primer Servicio",
    "promo.benefit2": "Paquetes Especiales",
    "promo.benefit3": "Respuesta Rápida",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("harmony-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("harmony-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
