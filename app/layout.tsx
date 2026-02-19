import type React from "react"
import type { Metadata } from "next"
import { EB_Garamond, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif"
})
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Harmony - Professional Cleaning Services",
  description:
    "Transform your space into a sanctuary of peace and cleanliness with Harmony's professional cleaning services.",
  generator: "v0.app",
  icons: {
    icon: "/Harmony icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable}`}>
      <body className={`font-serif antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
