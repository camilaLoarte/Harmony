import * as React from 'react';

interface UserEmailProps {
    name: string;
    language?: 'en' | 'es';
}

export const UserEmail: React.FC<Readonly<UserEmailProps>> = ({ name, language = 'es' }) => {
    const isEn = language === 'en';

    const content = {
        greeting: isEn ? `Hello ${name},` : `Hola ${name},`,
        thanks: isEn
            ? `Thank you for contacting <strong>Harmony</strong>. We have successfully received your service request.`
            : `Gracias por contactar a <strong>Harmony</strong>. Hemos recibido tu solicitud de servicio correctamente.`,
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

    return (
        <div style={{ fontFamily: 'serif', color: '#333', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                {/* Header with Logo */}
                <div style={{ backgroundColor: '#ffffff', padding: '25px 40px', textAlign: 'center' }}>
                    <img
                        src="cid:logo"
                        alt="Harmony"
                        style={{ width: '220px', height: 'auto' }}
                    />
                </div>

                <div style={{ padding: '40px', borderTop: '1px solid #f3f4f6' }}>
                    <h1 style={{ color: '#165b37', margin: '0 0 20px 0', fontSize: '26px' }}>{content.greeting}</h1>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#4b5563' }} dangerouslySetInnerHTML={{ __html: content.thanks }} />
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#4b5563' }}>{content.process}</p>

                    <div style={{ marginTop: '30px', padding: '30px', backgroundColor: '#ebf7ef', borderRadius: '4px', borderLeft: '4px solid #165b37' }}>
                        <p style={{ margin: '0', color: '#165b37', fontWeight: '500', fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: content.urgent }} />
                    </div>

                    <div style={{ marginTop: '40px', borderTop: '1px solid #f3f4f6', paddingTop: '30px' }}>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                            {content.signature}<br />
                            <strong style={{ color: '#165b37', fontSize: '18px' }}>{content.team}</strong>
                        </p>
                    </div>
                </div>

                <div style={{ padding: '25px', backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0' }}>{content.automated}</p>
                </div>
            </div>
        </div>
    );
};
