"use client"

import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import Process from "@/components/process"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Promo from "@/components/promo"
import { LanguageProvider } from "@/contexts/language-context"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <Contact />
        <Promo />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
