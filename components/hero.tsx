"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import Promo from "@/components/promo"

export default function Hero() {
  const { t } = useLanguage()

  const whatsappUrl = "https://api.whatsapp.com/send?phone=12403083255&text=Hi%20Harmony,%20%20I%20need%20information%20about%20your%20services."

  return (
    <section id="home" className="relative pt-4 md:pt-4 pb-0 overflow-hidden bg-[#f8f6f3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-8 lg:mt-0">
          {/* Left Image */}
          <div className="relative order-2 lg:order-1 flex items-start justify-center lg:justify-start">
            <div className="relative aspect-square lg:aspect-[4/5] lg:max-h-[600px] w-full max-w-[500px] lg:max-w-none overflow-hidden shadow-xl">
              <img
                src="/limpieza.jpg"
                alt="Professional cleaner in white protective suit"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="text-left order-1 lg:order-2 lg:pt-24 pb-2">
            <p className="text-lg md:text-xl italic text-[#1a4d3a] mb-1">
              {t("hero.tagline")}
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a4d3a] mb-8 leading-tight whitespace-pre-wrap">
              {t("hero.mainTitle")}
            </h1>

            {/* Styled Buttons with Elegant Corner Brackets */}
            <div className="flex flex-col sm:flex-row gap-10 mb-8">
              {/* Request Estimate Button */}
              <Link href="/contacto" className="group">
                <div className="relative bg-white px-8 py-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Top-left corner bracket */}
                  <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-[6px] border-l-[6px] border-[#1a4d3a] transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:-top-2 group-hover:-left-2"></div>
                  {/* Top-right corner bracket */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-[6px] border-r-[6px] border-[#1a4d3a] transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:-top-2 group-hover:-right-2"></div>
                  {/* Bottom-left corner bracket */}
                  <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-[6px] border-l-[6px] border-[#1a4d3a] transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:-bottom-2 group-hover:-left-2"></div>
                  {/* Bottom-right corner bracket */}
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-[6px] border-r-[6px] border-[#1a4d3a] transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:-bottom-2 group-hover:-right-2"></div>

                  <span className="text-lg font-semibold text-[#1a4d3a] block tracking-wide">{t("hero.requestEstimate")}</span>
                  <span className="text-lg font-semibold text-[#1a4d3a] block tracking-wide">{t("hero.estimation")}</span>
                </div>
              </Link>

              {/* Schedule Now Button */}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group">
                <div className="relative bg-white px-8 py-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Top-left corner bracket */}
                  <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-[6px] border-l-[6px] border-[#1a4d3a] transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:-top-2 group-hover:-left-2"></div>
                  {/* Top-right corner bracket */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-[6px] border-r-[6px] border-[#1a4d3a] transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:-top-2 group-hover:-right-2"></div>
                  {/* Bottom-left corner bracket */}
                  <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-[6px] border-l-[6px] border-[#1a4d3a] transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:-bottom-2 group-hover:-left-2"></div>
                  {/* Bottom-right corner bracket */}
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-[6px] border-r-[6px] border-[#1a4d3a] transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:-bottom-2 group-hover:-right-2"></div>

                  <span className="text-lg font-semibold text-[#1a4d3a] block tracking-wide">{t("hero.schedule")}</span>
                  <span className="text-lg font-semibold text-[#1a4d3a] block tracking-wide">{t("hero.now")}</span>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1a4d3a]/20">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#1a4d3a] mb-1">500+</div>
                <div className="text-sm text-[#1a4d3a]/70">{t("about.clients")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#1a4d3a] mb-1">10+</div>
                <div className="text-sm text-[#1a4d3a]/70">{t("about.experience")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#1a4d3a] mb-1">100%</div>
                <div className="text-sm text-[#1a4d3a]/70">{t("hero.satisfaction")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Section */}
      <Promo />
    </section>
  )
}
