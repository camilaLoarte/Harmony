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

// Configuración del logo en Base64 para evitar el recuadro de adjuntos
const logoPath = path.resolve(process.cwd(), 'public', 'logo_mail.png');
let logoUrl = '';
try {
  if (fs.existsSync(logoPath)) {
    const logoBuffer = fs.readFileSync(logoPath);
    const base64Logo = logoBuffer.toString('base64');
    logoUrl = `data:image/png;base64,${base64Logo}`;
  } else {
    console.error('ERROR: Logo file not found at:', logoPath);
  }
} catch (err) {
  console.error('ERROR reading logo file:', err);
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

    // ENVÍO AL ADMINISTRADOR
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: SENDER_EMAIL,
        to: process.env.ADMIN_EMAIL,
        replyTo: validatedData.email,
        subject: lang === "es"
          ? `Nueva Solicitud de Servicio de ${validatedData.name}`
          : `New Service Request from ${validatedData.name}`,
        react: AdminEmail({
          ...validatedData,
          language: lang,
          logoUrl,
        }) as any,
      })
    }

    // ENVÍO DE CONFIRMACIÓN AL USUARIO
    await resend.emails.send({
      from: SENDER_EMAIL,
      to: validatedData.email,
      subject: lang === "es" ? "Hemos recibido tu solicitud - Harmony" : "We have received your request - Harmony",
      react: UserEmail({
        ...validatedData,
        language: lang,
        logoUrl
      }) as any,
    })

    revalidatePath("/contacto")
    return { success: true, message: "Request received successfully!" }
  } catch (error) {
    console.error("Error sending email:", error);
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
    console.log("Starting submitPromoPhone...");
    const rawData = {
      phone: formData.get("phone"),
      language: formData.get("language") as string || "es",
    }

    const validatedData = promoSchema.parse(rawData)

    // 1. Guardar en Base de Datos (PRIORIDAD)
    try {
      await prisma.promoLead.create({
        data: {
          phone: validatedData.phone,
        },
      })
      console.log("Promo lead saved to DB successfully.");
    } catch (dbError) {
      console.error("Critical error saving PromoLead to DB:", dbError);
      return {
        success: false,
        message: rawData.language === "es"
          ? "Error al guardar en la base de datos. Por favor intenta de nuevo."
          : "Error saving to database. Please try again."
      }
    }

    const lang = validatedData.language as "en" | "es";

    // 2. Enviar Correo al Administrador (Aislado)
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
              <meta name="color-scheme" content="light dark" />
              <meta name="supported-color-schemes" content="light dark" />
              <div class="main-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 4px; overflow: hidden; border: 1px solid #e5e7eb;">
                <div style="padding: 40px; border-top: 1px solid #f3f4f6;">
                  <h1 style="color: #165b37; margin: 0 0 10px 0; font-size: 26px; border-bottom: 2px solid #165b37; padding-bottom: 10px;">
                    ${lang === "es" ? "Nueva Solicitud de Promo" : "New Promo Request"}
                  </h1>
                  <p style="margin-bottom: 12px;"><strong>${lang === "es" ? "Teléfono" : "Phone"}:</strong> ${validatedData.phone}</p>
                </div>
              </div>
            </div>
          `,
        })
        console.log("Admin notification email sent.");
      } catch (emailError) {
        // Logeamos el error pero NO fallamos la petición para el usuario
        console.error("Non-critical error sending admin email for promo:", emailError)
      }
    }

    return {
      success: true,
      message: lang === "es" ? "¡Gracias! Te contactaremos pronto." : "Thank you! We will contact you soon."
    }
  } catch (error) {
    console.error("Error in submitPromoPhone (Validation/General):", error)
    if (error instanceof z.ZodError) {
      return { success: false, message: "Por favor ingresa un teléfono válido." }
    }
    return {
      success: false,
      message: "Ocurrió un error inesperado. Por favor intenta de nuevo."
    }
  }
}
