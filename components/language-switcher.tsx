"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button variant="ghost" size="sm" onClick={() => setLanguage(language === "en" ? "es" : "en")} className="gap-2">
      <Languages className="h-4 w-4" />
      <span className="font-medium">{language === "en" ? "ES" : "EN"}</span>
    </Button>
  )
}
