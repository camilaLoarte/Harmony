"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { resend } from "@/lib/resend"
import { AdminEmail } from "@/components/emails/admin-email"
import { UserEmail } from "@/components/emails/user-email"
import fs from 'fs';
import path from 'path';

// 1. Definimos el remitente oficial de tu dominio para evitar bloqueos
const SENDER_EMAIL = "Harmony <notificaciones@thecleanharmony.com>";

// Logo paths and data for attachments
const LOGO_PATH = path.join(process.cwd(), 'public', 'harmony_logo.png');
let logoAttachment: { filename: string; content: Buffer; cid: string } | null = null;

try {
  if (fs.existsSync(LOGO_PATH)) {
    const logoBuffer = fs.readFileSync(LOGO_PATH);
    logoAttachment = {
      filename: 'harmony_logo.png',
      content: logoBuffer,
      cid: 'logo',
    };
  }
} catch (error) {
  console.error("Error loading logo for email:", error);
}

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
  estimatedPrice: z.string().optional(),
  language: z.string().optional().default("es"),
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
      estimatedPrice: (formData.get("estimatedPrice") as string) || "",
      language: (formData.get("language") as string) || "es",
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

    const lang = validatedData.language as "en" | "es";

    // ENVÍO AL ADMINISTRADOR (A tu correo de prueba@...)
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: SENDER_EMAIL, // USAMOS TU DOMINIO VERIFICADO
        to: process.env.ADMIN_EMAIL,
        reply_to: validatedData.email, // PERMITE RESPONDER AL CLIENTE DIRECTAMENTE
        subject: lang === "es"
          ? `Nueva Solicitud de Servicio de ${validatedData.name}`
          : `New Service Request from ${validatedData.name}`,
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
          estimatedPrice: validatedData.estimatedPrice,
          language: lang,
        }) as any,
        attachments: logoAttachment ? [logoAttachment] : [],
      })
    }

    // ENVÍO DE CONFIRMACIÓN AL USUARIO
    await resend.emails.send({
      from: SENDER_EMAIL, // USAMOS TU DOMINIO VERIFICADO
      to: validatedData.email,
      subject: lang === "es" ? "Hemos recibido tu solicitud - Harmony" : "We have received your request - Harmony",
      react: UserEmail({ name: validatedData.name, language: lang }) as any,
      attachments: logoAttachment ? [logoAttachment] : [],
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
  language: z.string().optional().default("es"),
})

export async function submitPromoPhone(prevState: any, formData: FormData) {
  try {
    const rawData = {
      phone: formData.get("phone"),
      language: formData.get("language") as string || "es",
    }

    const validatedData = promoSchema.parse(rawData)

    await prisma.promoLead.create({
      data: {
        phone: validatedData.phone,
      },
    })

    const lang = validatedData.language as "en" | "es";

    // ENVÍO AL ADMINISTRADOR
    if (process.env.ADMIN_EMAIL) {
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: process.env.ADMIN_EMAIL,
          subject: lang === "es"
            ? `Nueva Solicitud PROMO - Teléfono: ${validatedData.phone}`
            : `New PROMO Request - Phone: ${validatedData.phone}`,
          html: `
            <div style="font-family: serif; color: #333; background-color: #f9fafb; padding: 40px 20px;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 4px; overflow: hidden; border: 1px solid #e5e7eb;">
                <div style="background-color: #ffffff; padding: 25px 40px; text-align: center;">
                  <img src="cid:logo" alt="Harmony" style="width: 220px; height: auto;" />
                </div>
                <div style="padding: 40px; border-top: 1px solid #f3f4f6;">
                  <h1 style="color: #165b37; margin: 0 0 10px 0; font-size: 26px; border-bottom: 2px solid #165b37; padding-bottom: 10px;">
                    ${lang === "es" ? "Nueva Solicitud de Promo" : "New Promo Request"}
                  </h1>
                  <p style="color: #6b7280; font-size: 16px; margin: 0 0 30px 0;">
                    ${lang === "es"
              ? "Se ha recibido un nuevo número de teléfono a través de la sección de promoción:"
              : "A new phone number has been received through the promotion section:"}
                  </p>
                  <div style="background-color: #ebf7ef; padding: 30px; border-radius: 4px; border: 1px solid #c7e1d1;">
                    <p style="margin-bottom: 12px;"><strong>${lang === "es" ? "Teléfono" : "Phone"}:</strong> ${validatedData.phone}</p>
                    <p style="margin: 0;"><strong>${lang === "es" ? "Fecha" : "Date"}:</strong> ${new Date().toLocaleString()}</p>
                  </div>
                </div>
                <div style="padding: 25px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center;">
                  <p style="font-size: 12px; color: #9ca3af; margin: 0;">thecleanharmony.com</p>
                </div>
              </div>
            </div>
          `,
          attachments: logoAttachment ? [logoAttachment] : [],
        })
      } catch (emailError) {
        console.error("Error sending admin email for promo:", emailError)
        // No bloqueamos el éxito de la operación si falla el email del admin
      }
    }

    return {
      success: true,
      message: lang === "es" ? "¡Gracias! Te contactaremos pronto." : "Thank you! We will contact you soon."
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
