import * as React from 'react';

interface AdminEmailProps {
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
}

export const AdminEmail: React.FC<Readonly<AdminEmailProps>> = ({
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
}) => {
    const isEn = language === 'en';

    const labels = {
        title: isEn ? "New Contact Message" : "Nuevo Mensaje de Contacto",
        subtitle: isEn ? "You have received a new service request through the website." : "Has recibido una nueva solicitud de servicio a través del sitio web.",
        clientDetails: isEn ? "Client Details" : "Detalles del Cliente",
        name: isEn ? "Name:" : "Nombre:",
        email: isEn ? "Email:" : "Email:",
        phone: isEn ? "Phone:" : "Teléfono:",
        serviceDetails: isEn ? "Service Details" : "Detalles del Servicio",
        type: isEn ? "Service Type:" : "Tipo de Servicio:",
        location: isEn ? "Location:" : "Ubicación:",
        size: isEn ? "Size (sq ft):" : "Tamaño (pies²):",
        property: isEn ? "Property Type:" : "Tipo de Propiedad:",
        frequencyLabel: isEn ? "Frequency:" : "Frecuencia:",
        date: isEn ? "Preferred Date:" : "Fecha Preferida:",
        address: isEn ? "Address:" : "Dirección:",
        estimateTitle: isEn ? "Estimated Quote" : "Cotización Estimada",
        estimateDisclaimer: isEn ? "* Based on information provided by the client." : "* Basado en la información proporcionada por el cliente.",
        additionalMsg: isEn ? "Additional Message" : "Mensaje Adicional",
        footer: isEn ? "This is an automated email sent from thecleanharmony.com" : "Este es un correo automático enviado desde thecleanharmony.com",
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
                        color: #0d3a23 !important;
                        background-image: linear-gradient(#0d3a23, #0d3a23) !important;
                        -webkit-background-clip: text !important;
                        -webkit-text-fill-color: #0d3a23 !important;
                    }
                    .header-bg {
                        background-color: #ffffff !important;
                        background-image: linear-gradient(#ffffff, #ffffff) !important;
                    }
                }
                /* Higher specificity for Outlook and other tricky clients */
                [data-ogsc] .brand-green { 
                    color: #0d3a23 !important;
                    background-image: linear-gradient(#0d3a23, #0d3a23) !important;
                }
                [data-ogsb] .header-bg { background-color: #ffffff !important; background-image: linear-gradient(#ffffff, #ffffff) !important; }
                [data-ogsb] .main-container { background-color: #ffffff !important; background-image: linear-gradient(#ffffff, #ffffff) !important; }
                
                /* Prevent automatic color inversion by Gmail and others */
                u + .body .brand-green { 
                    color: #0d3a23 !important;
                    background-image: linear-gradient(#0d3a23, #0d3a23) !important;
                }
                u + .body .header-bg { background-color: #ffffff !important; background-image: linear-gradient(#ffffff, #ffffff) !important; }
            `}} />

            <div className="body-bg" style={{ maxWidth: '100%', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
                <div className="main-container" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                    <div className="header-bg" style={{ padding: '40px 40px 30px 40px', textAlign: 'center', backgroundColor: '#ffffff' }}>
                        <h1
                            className="brand-green notranslate"
                            translate="no"
                            style={{
                                margin: 0,
                                padding: 0,
                                fontFamily: '"EB Garamond", Georgia, "Times New Roman", Times, serif',
                                color: '#165b37',
                                fontSize: '48px',
                                fontWeight: '400',
                                letterSpacing: '-1px',
                                lineHeight: '1',
                                textTransform: 'none'
                            }}
                        >
                            Harmony
                        </h1>
                        <p className="brand-green" style={{
                            margin: '2px 0 0 0',
                            padding: 0,
                            fontFamily: '"EB Garamond", Georgia, "Times New Roman", Times, serif',
                            color: '#165b37',
                            fontSize: '16px',
                            fontStyle: 'italic',
                            letterSpacing: '0.5px'
                        }}>
                            Cleaning services
                        </p>
                    </div>

                    <div style={{ padding: '40px', borderTop: '1px solid #f3f4f6' }}>
                        <h1 className="brand-green" style={{ color: '#165b37', margin: '0 0 20px 0', fontSize: '26px', fontWeight: 'bold' }}>{labels.title}</h1>
                        <p style={{ color: '#6b7280', fontSize: '16px', margin: '0 0 30px 0' }}>{labels.subtitle}</p>

                        <div style={{ backgroundColor: '#ebf7ef', padding: '30px', borderRadius: '4px', border: '1px solid #c7e1d1' }}>
                            <h2 style={{ fontSize: '18px', marginTop: '0', color: '#165b37', borderBottom: '1px solid #b2d3c1', paddingBottom: '10px' }}>{labels.clientDetails}</h2>
                            <ul style={{ listStyleType: 'none', padding: '0', color: '#333', fontSize: '15px' }}>
                                <li style={{ marginBottom: '12px' }}><strong>{labels.name}</strong> {name}</li>
                                <li style={{ marginBottom: '12px' }}><strong>{labels.email}</strong> {email}</li>
                                <li style={{ marginBottom: '12px' }}><strong>{labels.phone}</strong> {phone}</li>
                            </ul>

                            <h2 style={{ fontSize: '18px', marginTop: '30px', color: '#165b37', borderBottom: '1px solid #b2d3c1', paddingBottom: '10px' }}>{labels.serviceDetails}</h2>
                            <ul style={{ listStyleType: 'none', padding: '0', color: '#333', fontSize: '15px' }}>
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
                                    <h2 style={{ fontSize: '18px', margin: '0 0 5px 0', color: 'white' }}>{labels.estimateTitle}</h2>
                                    <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0' }}>{estimatedPrice}</p>
                                    <p style={{ fontSize: '12px', margin: '8px 0 0 0', opacity: '0.9' }}>{labels.estimateDisclaimer}</p>
                                </div>
                            )}

                            {message && (
                                <div style={{ marginTop: '30px' }}>
                                    <h2 style={{ fontSize: '18px', color: '#165b37', borderBottom: '1px solid #b2d3c1', paddingBottom: '10px' }}>{labels.additionalMsg}</h2>
                                    <p style={{ whiteSpace: 'pre-wrap', backgroundColor: 'white', padding: '20px', borderRadius: '4px', border: '1px solid #c7e1d1', color: '#333', fontSize: '15px' }}>{message}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ padding: '25px', backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0' }}>{labels.footer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
