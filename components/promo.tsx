"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Promo() {
  const { t } = useLanguage()
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Phone submitted:", phone)
    // Handle phone submission
  }

  return (
    //<div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-[#1a4d3a] to-[#22513c]">
    <div className="w-full py-12 px-6 bg-gradient-to-r from-[#1a4d3a] to-[#22513c]">
      <div className="text-center mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t("promo.title")}</h3>
        <p className="text-white/90 text-sm md:text-base">{t("promo.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("promo.placeholder")}
            className="flex-1 h-12 bg-white/95 backdrop-blur border-white/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-white focus-visible:border-white"
            required
          />
          <Button
            type="submit"
            size="lg"
            className="h-12 px-6 bg-white text-[#1a4d3a] hover:bg-white/95 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Phone className="w-4 h-4 mr-2" />
            {t("promo.cta")}
          </Button>
        </div>
      </form>
    </div>
  )
}

