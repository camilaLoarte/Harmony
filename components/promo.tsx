"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { submitPromoPhone } from "@/app/actions/contact-actions"

const initialState = { success: false, message: "" }

export default function Promo() {
  const { t } = useLanguage()
  const [state, action] = useActionState(submitPromoPhone, initialState)

  return (
    //<div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-[#1a4d3a] to-[#22513c]">
    <div className="w-full py-12 px-6 bg-gradient-to-r from-[#1a4d3a] to-[#22513c]">
      <div className="text-center mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t("promo.title")}</h3>
        <p className="text-white/90 text-sm md:text-base">{t("promo.subtitle")}</p>
      </div>

      {/* ✅ OJO: ahora el form llama a la Server Action */}
      <form action={action} className="max-w-xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            name="phone"                 // ✅ clave: FormData usa este name
            type="tel"
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

        {/* Mensaje de estado */}
        {state.message ? (
          <p className="mt-3 text-sm text-white/90">
            {state.success ? "✅ " : "❌ "}
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  )
}

