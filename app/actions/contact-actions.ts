"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { resend } from "@/lib/resend"
import { AdminEmail } from "@/components/emails/admin-email"
import { UserEmail } from "@/components/emails/user-email"

/* -------------------------------------------------------------------------- */
/*  CONTACT FORM                                                              */
/* -------------------------------------------------------------------------- */

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  serviceType: z.string().min(1, "Service type is required"),
  serviceLocation: z.string().min(1, "Service location is required"),
  squareMeters: z.number().positive("Area size must be positive"),
  addressDetails: z.string().optional(),
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
      squareMeters: Number(formData.get("squareMeters") ?? 0),
      addressDetails: (formData.get("addressDetails") as string) || "",
      propertyType: (formData.get("propertyType") as string) || "",
      frequency: (formData.get("frequency") as string) || "",
      preferredDate: (formData.get("preferredDate") as string) || "",
      message: (formData.get("message") as string) || "",
    }

    const validatedData = contactSchema.parse(rawData)

    await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        serviceType: validatedData.serviceType,
        serviceLocation: validatedData.serviceLocation,
        squareMeters: validatedData.squareMeters,
        addressDetails: validatedData.addressDetails,
      },
    })

    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: "Harmony <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL,
        subject: "Nueva Solicitud de Servicio - Harmony",
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
    }

    await resend.emails.send({
      from: "Harmony <onboarding@resend.dev>",
      to: validatedData.email,
      subject: "Hemos recibido tu solicitud - Harmony",
      react: UserEmail({ name: validatedData.name }) as any,
    })

    revalidatePath("/contacto")
    return { success: true, message: "Request received successfully!" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {}
      error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message
      })
      return { success: false, message: "Validation failed", errors: fieldErrors }
    }

    return { success: false, message: "Failed to submit request. Please try again." }
  }
}

/* -------------------------------------------------------------------------- */
/*  PROMO (solo teléfono)                                                      */
/* -------------------------------------------------------------------------- */

const promoPhoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone is required")
    .transform((val) => val.trim().replace(/[^\d+]/g, ""))
    .refine((val) => /^\+?\d{8,15}$/.test(val), {
      message: "Invalid phone. Use 8-15 digits (optional +).",
    }),
})

export async function submitPromoPhone(prevState: any, formData: FormData) {
  try {
    const rawData = { phone: formData.get("phone") }
    const { phone } = promoPhoneSchema.parse(rawData)

    // ✅ AQUÍ va el create()
    await prisma.promoLead.create({
      data: {
        phone,
        source: "PROMO",
      },
    })

    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: "Harmony <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL,
        subject: "Nuevo teléfono desde Promo - Harmony",
        text: `Nuevo lead desde Promo:\nTeléfono: ${phone}`,
      })
    }

    return { success: true, message: "Phone received!" }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message ?? "Validation failed",
      }
    }
    return { success: false, message: "Failed to submit phone. Please try again." }
  }
}
