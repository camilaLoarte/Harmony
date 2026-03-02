import * as React from 'react';

interface UserEmailProps {
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    serviceLocation: string;
    squareMeters: number;
    message?: string;
    frequency?: string;
    preferredDate?: string;
    propertyType?: string;
    addressDetails?: string;
    estimatedPrice?: string;
    language?: 'en' | 'es';
    logoUrl?: string;
}

export const UserEmail: React.FC<Readonly<UserEmailProps>> = ({
    name,
    email,
    phone,
    serviceType,
    serviceLocation,
    squareMeters,
    message,
    frequency,
    preferredDate,
    propertyType,
    addressDetails,
    estimatedPrice,
    language = 'es',
    logoUrl = 'cid:logo'
}) => {
    const isEn = language === 'en';

    const content = {
        greeting: isEn ? `Hello ${name},` : `Hola ${name},`,
        thanks: isEn
            ? `Thank you for contacting <strong>Harmony</strong>. We have successfully received your service request.`
            : `Gracias por contactar a <strong>Harmony</strong>. Hemos recibido tu solicitud de servicio correctamente.`,
        summaryTitle: isEn ? "Summary of your request" : "Resumen de tu solicitud",
        clientDetails: isEn ? "Your Details" : "Tus Datos",
        serviceDetails: isEn ? "Service Requested" : "Detalles del Servicio",
        process: isEn
            ? `Our team will review your information and contact you as soon as possible to confirm details and provide a more accurate quote if necessary.`
            : `Nuestro equipo revisará tu información y nos pondremos en contacto contigo lo antes posible para confirmar los detalles y proporcionarte una cotización más precisa si es necesario.`,
        urgent: isEn
            ? `If you have any urgent questions, feel free to call us at <strong>+1 (240) 308-3255</strong>.`
            : `Si tienes alguna pregunta urgente, no dudes en llamarnos al <strong>+1 (240) 308-3255</strong>.`,
        signature: isEn ? "Sincerely," : "Atentamente,",
        team: isEn ? "The Harmony team" : "El equipo de Harmony",
        automated: isEn
            ? "This is an automated message, please do not reply to this email."
            : "Este es un mensaje automático, por favor no respondas a este correo.",
    };

    const labels = {
        name: isEn ? "Name:" : "Nombre:",
        email: isEn ? "Email:" : "Email:",
        phone: isEn ? "Phone:" : "Teléfono:",
        type: isEn ? "Service Type:" : "Tipo de Servicio:",
        location: isEn ? "Location:" : "Ubicación:",
        size: isEn ? "Size (sq ft):" : "Tamaño (pies²):",
        property: isEn ? "Property Type:" : "Tipo de Propiedad:",
        frequencyLabel: isEn ? "Frequency:" : "Frecuencia:",
        date: isEn ? "Preferred Date:" : "Fecha Preferida:",
        address: isEn ? "Address:" : "Dirección:",
        estimateTitle: isEn ? "Estimated Quote" : "Cotización Estimada",
        additionalMsg: isEn ? "Your Message" : "Tu Mensaje",
    };

    const valueLabels = {
        serviceType: {
            organizing: isEn ? "Organization Services" : "Servicios de Organización",
            residential: isEn ? "Residential Cleaning" : "Limpieza de Inmuebles",
            commercial: isEn ? "Commercial Cleaning" : "Limpieza Comercial",
            deep: isEn ? "Deep Cleaning" : "Limpieza Profunda",
            moveInOut: isEn ? "Move In/Out Cleaning" : "Limpieza de Mudanza",
            special: isEn ? "Special Occasions Cleaning" : "Limpieza en fechas especiales",
        },
        serviceLocation: {
            maryland: "Maryland",
            washington: "Washington",
            virginia: "Virginia",
        },
        propertyType: {
            house: isEn ? "House" : "Casa",
            apartment: isEn ? "Apartment" : "Apartamento",
            office: isEn ? "Office" : "Oficina",
            commercial: isEn ? "Commercial" : "Local Comercial",
        },
        frequency: {
            once: isEn ? "One time" : "Una vez",
            weekly: isEn ? "Weekly (-5%)" : "Semanal (-5%)",
            monthly: isEn ? "Monthly (-10%)" : "Mensual (-10%)",
        }
    };

    const getMappedValue = (category: keyof typeof valueLabels, value: string | undefined) => {
        if (!value) return "";
        const mapping = valueLabels[category] as Record<string, string>;
        return mapping[value] || value;
    };

    return (
        <div style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color: '#333', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
            {/* Meta tags for Dark Mode support */}
            <meta name="color-scheme" content="light dark" />
            <meta name="supported-color-schemes" content="light dark" />

            {/* Link to EB Garamond for compatible email clients */}
            <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />

            <style dangerouslySetInnerHTML={{
                __html: `
                :root {
                    color-scheme: light dark;
                    supported-color-schemes: light dark;
                }
                @media (prefers-color-scheme: dark) {
                    .body-bg {
                        background-color: #f9fafb !important;
                    }
                    .main-container {
                        background-color: #ffffff !important;
                        background-image: linear-gradient(#ffffff, #ffffff) !important;
                    }
                    .brand-green {
                        color: #165b37 !important;
                        background-image: linear-gradient(#165b37, #165b37) !important;
                        -webkit-background-clip: text !important;
                        -webkit-text-fill-color: #165b37 !important;
                    }
                    .header-bg {
                        background-color: #ffffff !important;
                        background-image: linear-gradient(#ffffff, #ffffff) !important;
                    }
                    .content-section {
                        background-color: #ffffff !important;
                        background-image: linear-gradient(#ffffff, #ffffff) !important;
                    }
                    .detail-box {
                        background-color: #ebf7ef !important;
                        background-image: linear-gradient(#ebf7ef, #ebf7ef) !important;
                    }
                    .detail-text {
                        color: #333333 !important;
                    }
                    .footer-bg {
                        background-color: #f9fafb !important;
                        background-image: linear-gradient(#f9fafb, #f9fafb) !important;
                    }
                }
                /* Higher specificity for Outlook and other tricky clients */
                [data-ogsc] .brand-green { 
                    color: #165b37 !important;
                    background-image: linear-gradient(#165b37, #165b37) !important;
                }
                [data-ogsb] .header-bg { background-color: #ffffff !important; background-image: linear-gradient(#ffffff, #ffffff) !important; }
                [data-ogsb] .main-container { background-color: #ffffff !important; background-image: linear-gradient(#ffffff, #ffffff) !important; }
                [data-ogsb] .detail-box { background-color: #ebf7ef !important; background-image: linear-gradient(#ebf7ef, #ebf7ef) !important; }
                
                /* Prevent automatic color inversion by Gmail and others */
                u + .body .brand-green { 
                    color: #165b37 !important;
                    background-image: linear-gradient(#165b37, #165b37) !important;
                }
                u + .body .header-bg { background-color: #ffffff !important; background-image: linear-gradient(#ffffff, #ffffff) !important; }
                u + .body .detail-box { background-color: #ebf7ef !important; background-image: linear-gradient(#ebf7ef, #ebf7ef) !important; }
            `}} />

            <div className="main-container" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div className="header-bg" style={{ padding: '40px 40px 30px 40px', textAlign: 'center', backgroundColor: '#ffffff' }}>
                    <img
                        src={logoUrl}
                        alt="Harmony Logo"
                        style={{
                            display: 'block',
                            margin: '0 auto',
                            maxWidth: '200px',
                            height: 'auto'
                        }}
                    />
                </div>

                <div className="content-section" style={{ padding: '40px', borderTop: '1px solid #f3f4f6' }}>
                    <h1 className="brand-green" style={{ color: '#165b37', margin: '0 0 20px 0', fontSize: '26px', fontWeight: 'bold' }}>{content.greeting}</h1>
                    <p className="detail-text" style={{ fontSize: '16px', lineHeight: '1.6', color: '#4b5563' }} dangerouslySetInnerHTML={{ __html: content.thanks }} />
                    <p className="detail-text" style={{ fontSize: '16px', lineHeight: '1.6', color: '#4b5563' }}>{content.process}</p>
                    <p className="brand-green" style={{ margin: '20px 0', color: '#165b37', fontWeight: '500', fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: content.urgent }} />

                    <div className="detail-box" style={{ marginTop: '30px', padding: '30px', backgroundColor: '#ebf7ef', borderRadius: '4px', border: '1px solid #c7e1d1' }}>
                        <h2 className="brand-green" style={{ fontSize: '18px', marginTop: '0', color: '#165b37', borderBottom: '1px solid #b2d3c1', paddingBottom: '10px' }}>{content.serviceDetails}</h2>
                        <ul className="detail-text" style={{ listStyleType: 'none', padding: '0', color: '#333', fontSize: '15px' }}>
                            <li style={{ marginBottom: '12px' }}><strong>{labels.type}</strong> {getMappedValue('serviceType', serviceType)}</li>
                            <li style={{ marginBottom: '12px' }}><strong>{labels.location}</strong> {getMappedValue('serviceLocation', serviceLocation)}</li>
                            <li style={{ marginBottom: '12px' }}><strong>{labels.size}</strong> {squareMeters}</li>
                            {propertyType && <li style={{ marginBottom: '12px' }}><strong>{labels.property}</strong> {getMappedValue('propertyType', propertyType)}</li>}
                            {frequency && <li style={{ marginBottom: '12px' }}><strong>{labels.frequencyLabel}</strong> {getMappedValue('frequency', frequency)}</li>}
                            {preferredDate && <li style={{ marginBottom: '12px' }}><strong>{labels.date}</strong> {preferredDate}</li>}
                            {addressDetails && <li style={{ marginBottom: '12px' }}><strong>{labels.address}</strong> {addressDetails}</li>}
                        </ul>

                        {estimatedPrice && (
                            <div style={{ marginTop: '30px', padding: '25px', backgroundColor: '#165b37', color: 'white', borderRadius: '4px', textAlign: 'center' }}>
                                <p style={{ fontSize: '18px', margin: '0 0 5px 0', color: 'white' }}>{labels.estimateTitle}</p>
                                <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0' }}>{estimatedPrice}</p>
                            </div>
                        )}

                        {message && (
                            <div style={{ marginTop: '30px' }}>
                                <h2 className="brand-green" style={{ fontSize: '18px', color: '#165b37', borderBottom: '1px solid #b2d3c1', paddingBottom: '10px' }}>{labels.additionalMsg}</h2>
                                <p className="detail-text" style={{ whiteSpace: 'pre-wrap', backgroundColor: 'white', padding: '20px', borderRadius: '4px', border: '1px solid #c7e1d1', color: '#333', fontSize: '15px', margin: '0' }}>{message}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: '50px', borderTop: '1px solid #f3f4f6', paddingTop: '40px', textAlign: 'center' }}>
                    <p className="detail-text" style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 10px 0', fontStyle: 'italic', fontWeight: '400' }}>
                        {content.signature}
                    </p>
                    <p className="brand-green" style={{ color: '#165b37', fontSize: '22px', fontWeight: 'bold', margin: '0' }}>
                        {content.team}
                    </p>
                </div>
            </div>

            <div className="footer-bg" style={{ padding: '25px', backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0' }}>{content.automated}</p>
            </div>
        </div>
    );
};
