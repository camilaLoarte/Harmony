"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { resend } from "@/lib/resend"
import { AdminEmail } from "@/components/emails/admin-email"
import { UserEmail } from "@/components/emails/user-email"

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone is required"),
    serviceType: z.string().min(1, "Service type is required"),
    serviceLocation: z.string().min(1, "Service location is required"),
    squareMeters: z.number().positive("Area size must be positive"),
    addressDetails: z.string().optional(),
    // Add optional fields that might be coming from the form
    propertyType: z.string().optional(),
    frequency: z.string().optional(),
    preferredDate: z.string().optional(),
    message: z.string().optional(),
})

export async function submitContactForm(prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            serviceType: formData.get("serviceType"),
            serviceLocation: formData.get("serviceLocation"),
            squareMeters: Number(formData.get("squareMeters")),
            addressDetails: formData.get("addressDetails") || "",
            propertyType: formData.get("propertyType") || "",
            frequency: formData.get("frequency") || "",
            preferredDate: formData.get("preferredDate") || "",
            message: formData.get("message") || "",
        }

        const validatedData = contactSchema.parse(rawData)

        // Save to database
        await prisma.contactSubmission.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone,
                serviceType: validatedData.serviceType,
                serviceLocation: validatedData.serviceLocation,
                squareMeters: validatedData.squareMeters,
                addressDetails: validatedData.addressDetails,
                // Map other fields if your schema supports them, or update schema accordingly.
                // For now, we'll store them if the DB has columns, or ignore if not.
                // Assuming the DB schema only has the fields from previous step, we might miss saving some new fields.
                // However, for EMAIL notifications (the requested task), we use 'validatedData' directly.
            },
        })

        // Send Email to Admin
        if (process.env.ADMIN_EMAIL) {
            try {
                await resend.emails.send({
                    from: 'Harmony <onboarding@resend.dev>', // Use your verified domain or default resend.dev for testing
                    to: process.env.ADMIN_EMAIL,
                    subject: 'Nueva Solicitud de Servicio - Harmony',
                    react: AdminEmail({
                        name: validatedData.name,
                        email: validatedData.email,
                        phone: validatedData.phone,
                        serviceType: validatedData.serviceType,
                        serviceLocation: validatedData.serviceLocation,
                        squareMeters: validatedData.squareMeters,
                        message: validatedData.message,
                        frequency: validatedData.frequency,
                        preferredDate: validatedData.preferredDate,
                        propertyType: validatedData.propertyType,
                        addressDetails: validatedData.addressDetails,
                    }) as any,
                })
            } catch (emailError) {
                console.error("Failed to send admin email:", emailError)
            }
        }

        // Send Confirmation to User
        if (validatedData.email) {
            try {
                await resend.emails.send({
                    from: 'Harmony <onboarding@resend.dev>',
                    to: validatedData.email,
                    subject: 'Hemos recibido tu solicitud - Harmony',
                    react: UserEmail({ name: validatedData.name }) as any,
                })
            } catch (emailError) {
                console.error("Failed to send user email:", emailError)
            }
        }

        revalidatePath("/contacto")
        return { success: true, message: "Request received successfully!" }
    } catch (error) {
        console.error("Failed to submit contact form:", error)
        if (error instanceof z.ZodError) {
            const fieldErrors: Record<string, string> = {}
            error.errors.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0] as string] = err.message
                }
            })
            return { success: false, message: "Validation failed", errors: fieldErrors }
        }
        return { success: false, message: "Failed to submit request. Please try again." }
    }
}
