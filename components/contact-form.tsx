"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { submitContactForm } from "@/app/actions/contact-actions"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function ContactForm() {
    const { language } = useLanguage()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        propertyType: "",
        squareMeters: "",
        frequency: "",
        preferredDate: "",
        serviceLocation: "",
        addressDetails: "",
        message: "",
    })

    // State for form validation errors
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [showSuccess, setShowSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const serviceTypes =
        language === "es"
            ? [
                { value: "organizing", label: "Servicios de Organización" },
                { value: "residential", label: "Limpieza de Inmuebles" },
                { value: "commercial", label: "Limpieza Comercial" },
                { value: "deep", label: "Limpieza Profunda" },
                { value: "moveInOut", label: "Limpieza de Mudanza" },
                { value: "special", label: "Limpieza en fechas especiales" },
            ]
            : [
                { value: "organizing", label: "Organization Services" },
                { value: "residential", label: "Residential Cleaning" },
                { value: "commercial", label: "Commercial Cleaning" },
                { value: "deep", label: "Deep Cleaning" },
                { value: "moveInOut", label: "Move In/Out Cleaning" },
                { value: "special", label: "Special Occasions Cleaning" },
            ]

    const priceEstimate = useMemo(() => {
        const meters = Number.parseFloat(formData.squareMeters) || 0
        if (meters === 0) return null

        const basePrices: Record<string, number> = {
            organizing: 3.0,
            residential: 2.5,
            commercial: 2.0,
            deep: 4.0,
            moveInOut: 3.5,
            special: 3.5,
        }

        const frequencyMultiplier: Record<string, number> = {
            once: 1.0,
            weekly: 0.75,
            biweekly: 0.85,
            monthly: 0.9,
        }

        const basePrice = basePrices[formData.serviceType] || 2.5
        const frequencyDiscount = frequencyMultiplier[formData.frequency] || 1.0
        const estimatedPrice = meters * basePrice * frequencyDiscount
        const finalPrice = Math.max(estimatedPrice, 80)

        return {
            price: finalPrice.toFixed(2),
            priceRange: {
                min: (finalPrice * 0.9).toFixed(2),
                max: (finalPrice * 1.1).toFixed(2),
            },
        }
    }, [formData.squareMeters, formData.serviceType, formData.frequency])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formDataToSend = new FormData()
        formDataToSend.append("name", formData.name)
        formDataToSend.append("email", formData.email)
        formDataToSend.append("phone", formData.phone)
        formDataToSend.append("serviceType", formData.serviceType)
        formDataToSend.append("serviceLocation", formData.serviceLocation)
        formDataToSend.append("squareMeters", formData.squareMeters)
        formDataToSend.append("addressDetails", formData.addressDetails)
        // Note: The server action only reads these fields currently. 
        // If you need other fields on the server, you must update the action and schema.

        try {
            const result = await submitContactForm(null, formDataToSend)

            if (result.success) {
                toast.success(language === "es" ? "Solicitud enviada con éxito!" : "Request sent successfully!")
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    serviceType: "",
                    propertyType: "",
                    squareMeters: "",
                    frequency: "",
                    preferredDate: "",
                    serviceLocation: "",
                    addressDetails: "",
                    message: "",
                })
                setErrors({}) // Clear errors on success
                setShowSuccess(true)
            } else {
                if (result.errors) {
                    setErrors(result.errors)
                    toast.error(language === "es" ? "Por favor corrija los errores en el formulario." : "Please fix the errors in the form.")
                } else {
                    toast.error(result.message)
                }
            }
        } catch (error) {
            toast.error(language === "es" ? "Ocurrió un error al enviar el formulario." : "An error occurred while submitting the form.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Phone - Side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <Input
                            name="name"
                            placeholder={language === "es" ? "Nombre Completo: *" : "Full Name: *"}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-transparent border-0 border-b border-gray-400 rounded-none px-0 py-3 text-gray-700 placeholder:text-[#1a4d3a] focus-visible:ring-0 focus-visible:border-[#1a4d3a] transition-colors"
                        />
                    </div>
                    <div>
                        <Input
                            name="phone"
                            type="tel"
                            placeholder={language === "es" ? "Escribe tu número *" : "Phone Number *"}
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="bg-transparent border-0 border-b border-gray-400 rounded-none px-0 py-3 text-gray-700 placeholder:text-[#1a4d3a] focus-visible:ring-0 focus-visible:border-[#1a4d3a] transition-colors"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <Input
                        name="email"
                        type="email"
                        placeholder={language === "es" ? "Dirección de correo electrónico *" : "Email Address *"}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-transparent border-0 border-b border-gray-400 rounded-none px-0 py-3 text-gray-700 placeholder:text-[#1a4d3a] focus-visible:ring-0 focus-visible:border-[#1a4d3a] transition-colors"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Service Type - Select Dropdown */}
                <div className="pt-2">
                    <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                        {language === "es" ? "Tipo de Servicio" : "Service Type"}
                    </Label>
                    <Select
                        value={formData.serviceType}
                        onValueChange={(value) => handleSelectChange("serviceType", value)}
                    >
                        <SelectTrigger className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]">
                            <SelectValue placeholder={language === "es" ? "Selecciona un servicio" : "Select a service"} />
                        </SelectTrigger>
                        <SelectContent>
                            {serviceTypes.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                    {service.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
                </div>

                {/* Property Type - Radio Buttons */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-[#1a4d3a]">
                        {language === "es" ? "Tipo de Propiedad" : "Property Type"}
                    </Label>
                    <RadioGroup
                        value={formData.propertyType}
                        onValueChange={(value) => handleSelectChange("propertyType", value)}
                        className="flex flex-wrap gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="house" id="house-page" className="border-gray-400 text-[#1a4d3a]" />
                            <Label htmlFor="house-page" className="cursor-pointer text-sm text-gray-700">
                                {language === "es" ? "Casa" : "House"}
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="apartment" id="apartment-page" className="border-gray-400 text-[#1a4d3a]" />
                            <Label htmlFor="apartment-page" className="cursor-pointer text-sm text-gray-700">
                                {language === "es" ? "Apartamento" : "Apartment"}
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="office" id="office-page" className="border-gray-400 text-[#1a4d3a]" />
                            <Label htmlFor="office-page" className="cursor-pointer text-sm text-gray-700">
                                {language === "es" ? "Oficina" : "Office"}
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="commercial" id="commercial-page" className="border-gray-400 text-[#1a4d3a]" />
                            <Label htmlFor="commercial-page" className="cursor-pointer text-sm text-gray-700">
                                {language === "es" ? "Local Comercial" : "Commercial"}
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Area Size and Frequency - Side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                            {language === "es" ? "Tamaño del Área (pies²)" : "Area Size (sq ft)"}
                        </Label>
                        <Input
                            name="squareMeters"
                            type="number"
                            placeholder={language === "es" ? "Ingresa pies cuadrados" : "Enter square feet"}
                            value={formData.squareMeters}
                            onChange={handleChange}
                            min="1"
                            className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                            {language === "es" ? "Frecuencia de Limpieza" : "Cleaning Frequency"}
                        </Label>
                        <Select
                            value={formData.frequency}
                            onValueChange={(value) => handleSelectChange("frequency", value)}
                        >
                            <SelectTrigger className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]">
                                <SelectValue placeholder={language === "es" ? "Selecciona frecuencia" : "Select frequency"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="once">{language === "es" ? "Una vez" : "One time"}</SelectItem>
                                <SelectItem value="weekly">{language === "es" ? "Semanal (-25%)" : "Weekly (-25%)"}</SelectItem>
                                <SelectItem value="biweekly">{language === "es" ? "Quincenal (-15%)" : "Biweekly (-15%)"}</SelectItem>
                                <SelectItem value="monthly">{language === "es" ? "Mensual (-10%)" : "Monthly (-10%)"}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Service Location - Radio Buttons */}
                <div>
                    <Label className="text-sm font-medium mb-3 block text-[#1a4d3a]">
                        {language === "es" ? "Ubicación Del Servicio" : "Service Location"} *
                    </Label>
                    <RadioGroup
                        value={formData.serviceLocation}
                        onValueChange={(value) => handleSelectChange("serviceLocation", value)}
                        className="flex flex-wrap gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="maryland" id="maryland-page" className="border-gray-400 text-[#1a4d3a]" />
                            <Label htmlFor="maryland-page" className="cursor-pointer text-sm text-gray-700">Maryland</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="washington" id="washington-page" className="border-gray-400 text-[#1a4d3a]" />
                            <Label htmlFor="washington-page" className="cursor-pointer text-sm text-gray-700">Washington</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="virginia" id="virginia-page" className="border-gray-400 text-[#1a4d3a]" />
                            <Label htmlFor="virginia-page" className="cursor-pointer text-sm text-gray-700">Virginia</Label>
                        </div>
                    </RadioGroup>
                    {errors.serviceLocation && <p className="text-red-500 text-xs mt-1">{errors.serviceLocation}</p>}
                </div>

                {/* Address Details */}
                <div>
                    <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                        {language === "es" ? "Dirección Detallada" : "Detailed Address"}
                    </Label>
                    <Textarea
                        name="addressDetails"
                        placeholder={
                            language === "es"
                                ? "Número de casa, calles, referencias, etc."
                                : "House number, street name, references, etc."
                        }
                        value={formData.addressDetails}
                        onChange={handleChange}
                        rows={3}
                        className="resize-none bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                    />
                    {errors.addressDetails && <p className="text-red-500 text-xs mt-1">{errors.addressDetails}</p>}
                </div>

                {/* Preferred Date */}
                <div>
                    <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                        {language === "es" ? "Fecha Preferida" : "Preferred Date"}
                    </Label>
                    <Input
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                    />
                </div>

                {/* Additional Details */}
                <div>
                    <Textarea
                        name="message"
                        placeholder={
                            language === "es"
                                ? "Detalles Adicionales o Solicitudes Especiales"
                                : "Additional Details or Special Requests"
                        }
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="resize-none bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                    />
                </div>

                {/* Price Estimate */}
                {priceEstimate && (
                    <div className="p-5 bg-[#1a4d3a]/5 border border-[#1a4d3a]/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Calculator className="w-5 h-5 text-[#1a4d3a]" />
                            <span className="font-medium text-[#1a4d3a]">
                                {language === "es" ? "Precio Estimado" : "Estimated Price"}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-[#1a4d3a]">
                            ${priceEstimate.priceRange.min} - ${priceEstimate.priceRange.max}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {language === "es"
                                ? "El precio final puede variar según las condiciones reales"
                                : "Final price may vary based on actual conditions"}
                        </p>
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#1a4d3a] hover:bg-[#153d2e] text-white uppercase text-sm tracking-wider px-10 py-6"
                >
                    {isSubmitting
                        ? (language === "es" ? "Enviando..." : "Sending...")
                        : (language === "es" ? "Obtener Mi Cotización" : "Get My Quote")
                    }
                </Button>
            </form>

            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-[#1a4d3a]">
                            {language === "es" ? "¡Mensaje Enviado!" : "Message Sent!"}
                        </DialogTitle>
                        <DialogDescription>
                            {language === "es"
                                ? "Hemos recibido tu solicitud correctamente. Nos pondremos en contacto contigo pronto."
                                : "We have received your request successfully. We will contact you soon."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end mt-4">
                        <Button
                            onClick={() => setShowSuccess(false)}
                            className="bg-[#1a4d3a] hover:bg-[#153d2e] text-white"
                        >
                            {language === "es" ? "Cerrar" : "Close"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
