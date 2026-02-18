"use client"

import React, { useState, useMemo, useRef } from "react"
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

    // Refs for scrolling to elements with errors
    const fieldRefs = {
        name: useRef<HTMLInputElement>(null),
        email: useRef<HTMLInputElement>(null),
        phone: useRef<HTMLInputElement>(null),
        serviceType: useRef<HTMLButtonElement>(null),
        propertyType: useRef<HTMLDivElement>(null),
        squareMeters: useRef<HTMLInputElement>(null),
        frequency: useRef<HTMLButtonElement>(null),
        serviceLocation: useRef<HTMLDivElement>(null),
        addressDetails: useRef<HTMLTextAreaElement>(null),
    }

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
            weekly: 0.95,
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

    const scrollToField = (fieldName: string) => {
        const ref = fieldRefs[fieldName as keyof typeof fieldRefs]
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
            if ('focus' in ref.current) {
                (ref.current as any).focus()
            }
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        const requiredFields = ["name", "email", "phone", "serviceType", "serviceLocation", "addressDetails"]

        requiredFields.forEach(field => {
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = language === "es" ? "Este campo es obligatorio" : "This field is required"
            }
        })

        // Basic email validation
        if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = language === "es" ? "Email inválido" : "Invalid email"
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            // Find the first field with an error and scroll to it
            const firstErrorField = requiredFields.find(field => newErrors[field])
            if (firstErrorField) {
                scrollToField(firstErrorField)
            }
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error(language === "es" ? "Por favor complete los campos obligatorios." : "Please fill in the required fields.")
            return
        }

        setIsSubmitting(true)

        const formDataToSend = new FormData()
        formDataToSend.append("name", formData.name)
        formDataToSend.append("email", formData.email)
        formDataToSend.append("phone", formData.phone)
        formDataToSend.append("serviceType", formData.serviceType)
        formDataToSend.append("serviceLocation", formData.serviceLocation)
        formDataToSend.append("squareMeters", formData.squareMeters)
        formDataToSend.append("addressDetails", formData.addressDetails)

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
                    // Find first server-side error and scroll
                    const firstErrorField = Object.keys(result.errors)[0]
                    scrollToField(firstErrorField)
                    toast.error(language === "es" ? "Por favor corrija los errores." : "Please fix the errors.")
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
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Selection Fields */}
                    <div className="space-y-6">
                        <div className="border-b border-[#1a4d3a]/20 pb-2 mb-4">
                            <h3 className="text-xl font-serif font-bold text-[#1a4d3a]">
                                {language === "es" ? "Detalles del Servicio" : "Service Details"}
                            </h3>
                        </div>

                        {/* Service Type - Select Dropdown */}
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                                {language === "es" ? "Tipo de Servicio" : "Service Type"}
                            </Label>
                            <Select
                                value={formData.serviceType}
                                onValueChange={(value) => handleSelectChange("serviceType", value)}
                            >
                                <SelectTrigger ref={fieldRefs.serviceType} className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]">
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
                                className="flex flex-col space-y-2"
                                ref={fieldRefs.propertyType}
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

                        {/* Frequency */}
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                                {language === "es" ? "Frecuencia de Limpieza" : "Cleaning Frequency"}
                            </Label>
                            <Select
                                value={formData.frequency}
                                onValueChange={(value) => handleSelectChange("frequency", value)}
                            >
                                <SelectTrigger ref={fieldRefs.frequency} className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]">
                                    <SelectValue placeholder={language === "es" ? "Una vez" : "One Time"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="once">{language === "es" ? "Una vez" : "One time"}</SelectItem>
                                    <SelectItem value="weekly">{language === "es" ? "Semanal (-5%)" : "Weekly (-5%)"}</SelectItem>
                                    <SelectItem value="monthly">{language === "es" ? "Mensual (-10%)" : "Monthly (-10%)"}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Service Location - Radio Buttons */}
                        <div>
                            <Label className="text-sm font-medium mb-3 block text-[#1a4d3a]">
                                {language === "es" ? "Ubicación Del Servicio" : "Service Location"} *
                            </Label>
                            <RadioGroup
                                value={formData.serviceLocation}
                                onValueChange={(value) => handleSelectChange("serviceLocation", value)}
                                className="flex flex-col space-y-2"
                                ref={fieldRefs.serviceLocation}
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
                    </div>

                    {/* Right Column - Writing Fields */}
                    <div className="space-y-6">
                        <div className="border-b border-[#1a4d3a]/20 pb-2 mb-4">
                            <h3 className="text-xl font-serif font-bold text-[#1a4d3a]">
                                {language === "es" ? "Información Personal" : "Personal Information"}
                            </h3>
                        </div>

                        {/* Name */}
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                                {language === "es" ? "Nombre Completo" : "Full Name"} *
                            </Label>
                            <Input
                                name="name"
                                ref={fieldRefs.name}
                                placeholder={language === "es" ? "Escribe tu nombre completo" : "Enter your full name"}
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                                {language === "es" ? "Número de Teléfono" : "Phone Number"} *
                            </Label>
                            <Input
                                name="phone"
                                ref={fieldRefs.phone}
                                type="tel"
                                placeholder={language === "es" ? "Escribe tu número" : "Enter your phone number"}
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                                {language === "es" ? "Correo Electrónico" : "Email Address"} *
                            </Label>
                            <Input
                                name="email"
                                ref={fieldRefs.email}
                                type="email"
                                placeholder={language === "es" ? "tucorreo@ejemplo.com" : "youremail@example.com"}
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Area Size */}
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                                {language === "es" ? "Tamaño del Área (pies²)" : "Area Size (sq ft)"}
                            </Label>
                            <Input
                                name="squareMeters"
                                ref={fieldRefs.squareMeters}
                                type="number"
                                placeholder={language === "es" ? "Ingresa pies cuadrados" : "Enter square feet"}
                                value={formData.squareMeters}
                                onChange={handleChange}
                                min="1"
                                className="bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {language === "es"
                                    ? "Requerido para calcular el estimado"
                                    : "Required to calculate estimate"}
                            </p>
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

                        {/* Address Details */}
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                                {language === "es" ? "Dirección Detallada" : "Detailed Address"}
                            </Label>
                            <Textarea
                                name="addressDetails"
                                ref={fieldRefs.addressDetails}
                                placeholder={
                                    language === "es"
                                        ? "Número de casa, calles, referencias, etc."
                                        : "House number, street name, references, etc."
                                }
                                value={formData.addressDetails}
                                onChange={handleChange}
                                rows={2}
                                className="resize-none bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                            />
                            {errors.addressDetails && <p className="text-red-500 text-xs mt-1">{errors.addressDetails}</p>}
                        </div>

                        {/* Additional Details */}
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-[#1a4d3a]">
                                {language === "es" ? "Detalles Adicionales" : "Additional Details"}
                            </Label>
                            <Textarea
                                name="message"
                                placeholder={
                                    language === "es"
                                        ? "Instrucciones especiales, dudas, etc."
                                        : "Special instructions, questions, etc."
                                }
                                value={formData.message}
                                onChange={handleChange}
                                rows={2}
                                className="resize-none bg-white border-gray-300 focus:border-[#1a4d3a] focus:ring-[#1a4d3a]"
                            />
                        </div>
                    </div>
                </div>

                {/* Price Estimate and Submit */}
                <div className="pt-6 border-t border-[#1a4d3a]/20">
                    {priceEstimate && (
                        <div className="p-5 bg-[#1a4d3a]/5 border border-[#1a4d3a]/20 rounded-lg mb-6">
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

                    <div className="flex justify-end">
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
                    </div>
                </div>
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
