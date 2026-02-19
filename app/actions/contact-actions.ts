"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { resend } from "@/lib/resend"
import { AdminEmail } from "@/components/emails/admin-email"
import { UserEmail } from "@/components/emails/user-email"

// 1. Definimos el remitente oficial de tu dominio para evitar bloqueos
const SENDER_EMAIL = "Harmony <notificaciones@thecleanharmony.com>";

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

    // ENVÍO AL ADMINISTRADOR (A tu correo de prueba@...)
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: SENDER_EMAIL, // USAMOS TU DOMINIO VERIFICADO
        to: process.env.ADMIN_EMAIL,
        reply_to: validatedData.email, // PERMITE RESPONDER AL CLIENTE DIRECTAMENTE
        subject: `Nueva Solicitud de Servicio de ${validatedData.name}`,
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

    // ENVÍO DE CONFIRMACIÓN AL USUARIO
    await resend.emails.send({
      from: SENDER_EMAIL, // USAMOS TU DOMINIO VERIFICADO
      to: validatedData.email,
      subject: "Hemos recibido tu solicitud - Harmony",
      react: UserEmail({ name: validatedData.name }) as any,
    })

    revalidatePath("/contacto")
    return { success: true, message: "Request received successfully!" }
  } catch (error) {
    console.error("Error sending email:", error); // Añadido para que veas errores en consola
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
/* PROMO (solo teléfono)                                                     */
/* -------------------------------------------------------------------------- */

const promoSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
})

export async function submitPromoPhone(prevState: any, formData: FormData) {
  try {
    const rawData = {
      phone: formData.get("phone"),
    }

    const validatedData = promoSchema.parse(rawData)

    await prisma.promoLead.create({
      data: {
        phone: validatedData.phone,
      },
    })

    // ENVÍO AL ADMINISTRADOR
    if (process.env.ADMIN_EMAIL) {
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: process.env.ADMIN_EMAIL,
          subject: `Nueva Solicitud PROMO - Teléfono: ${validatedData.phone}`,
          html: `
            <div style="font-family: sans-serif; color: #1a4d3a;">
              <h1 style="border-bottom: 2px solid #1a4d3a; padding-bottom: 10px;">Nueva Solicitud de Promo</h1>
              <p>Se ha recibido un nuevo número de teléfono a través de la sección de promoción:</p>
              <div style="background-color: #f8f6f3; padding: 20px; borderRadius: 8px;">
                <p><strong>Teléfono:</strong> ${validatedData.phone}</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
              </div>
            </div>
          `,
        })
      } catch (emailError) {
        console.error("Error sending admin email for promo:", emailError)
        // No bloqueamos el éxito de la operación si falla el email del admin
      }
    }

    return {
      success: true,
      message: "¡Gracias! Te contactaremos pronto."
    }
  } catch (error) {
    console.error("Error in submitPromoPhone:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Por favor ingresa un teléfono válido."
      }
    }

    return {
      success: false,
      message: "Hubo un error al procesar tu solicitud. Por favor intenta de nuevo."
    }
  }
}
