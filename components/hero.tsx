"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import Promo from "@/components/promo"

export default function Hero() {
  const { t } = useLanguage()

  const whatsappUrl = "https://api.whatsapp.com/send?phone=12403083255&text=Hi%20Harmony,%20%20I%20need%20information%20about%20your%20services."

  return (
    <section id="home" className="relative pt-24 md:pt-32 pb-0 overflow-hidden bg-[#f8f6f3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/professional-cleaner-organizing-and-cleaning-a-mod.jpg"
                alt="Professional cleaner in white protective suit"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="text-left order-1 lg:order-2">
            <p className="text-lg md:text-xl italic text-[#1a4d3a] mb-4">
              {t("hero.tagline")}
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a4d3a] mb-8 leading-tight">
              {t("hero.mainTitle")}
            </h1>

            {/* Styled Buttons with Corner Brackets */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {/* Request Estimate Button */}
              <Link href="/contacto" className="group">
                <div className="relative bg-white border border-gray-200 px-8 py-5 hover:bg-gray-50 transition-colors">
                  {/* Top-left corner bracket */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#1a4d3a]"></div>
                  {/* Top-right corner bracket */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#1a4d3a]"></div>
                  
                  <span className="text-base font-medium text-[#1a4d3a] block">{t("hero.requestEstimate")}</span>
                  <span className="text-base font-medium text-[#1a4d3a] block">{t("hero.estimation")}</span>
                </div>
              </Link>

              {/* Schedule Now Button */}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group">
                <div className="relative bg-white border border-gray-200 px-8 py-5 hover:bg-gray-50 transition-colors">
                  {/* Top-left corner bracket */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#1a4d3a]"></div>
                  {/* Top-right corner bracket */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#1a4d3a]"></div>
                  
                  <span className="text-base font-medium text-[#1a4d3a] block">{t("hero.schedule")}</span>
                  <span className="text-base font-medium text-[#1a4d3a] block">{t("hero.now")}</span>
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
