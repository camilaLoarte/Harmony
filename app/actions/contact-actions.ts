"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone is required"),
    serviceType: z.string().min(1, "Service type is required"),
    serviceLocation: z.string().min(1, "Service location is required"),
    squareMeters: z.number().positive("Area size must be positive"),
    addressDetails: z.string().optional(),
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
        }

        const validatedData = contactSchema.parse(rawData)

        await prisma.contactSubmission.create({
            data: validatedData,
        })

        revalidatePath("/contacto")
        return { success: true, message: "Request received successfully!" }
    } catch (error) {
        console.error("Failed to submit contact form:", error)
        if (error instanceof z.ZodError) {
            // Return structured field errors: { fieldName: errorMessage }
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
