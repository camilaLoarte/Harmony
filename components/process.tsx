"use client"

import { useLanguage } from "@/contexts/language-context"

export default function Process() {
  const { t } = useLanguage()

  const steps = [
    {
      number: "01",
      titleKey: "process.step1.title",
      descKey: "process.step1.desc",
    },
    {
      number: "02",
      titleKey: "process.step2.title",
      descKey: "process.step2.desc",
    },
    {
      number: "03",
      titleKey: "process.step3.title",
      descKey: "process.step3.desc",
    },
    {
      number: "04",
      titleKey: "process.step4.title",
      descKey: "process.step4.desc",
    },
  ]

  return (
    <section id="process" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("process.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t("process.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary text-primary-foreground rounded-full mb-6 text-2xl md:text-3xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t(step.titleKey)}</h3>
                <p className="text-sm md:text-base text-muted-foreground text-pretty">{t(step.descKey)}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
