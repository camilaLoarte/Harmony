
import * as React from 'react';

interface UserEmailProps {
    name: string;
}

export const UserEmail: React.FC<Readonly<UserEmailProps>> = ({ name }) => (
    <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ color: '#1a4d3a' }}>Harmony</h1>
        </div>

        <p>Hola {name},</p>
        <p>Gracias por contactar a <strong>Harmony</strong>. Hemos recibido tu solicitud de servicio correctamente.</p>
        <p>Nuestro equipo revisará tu información y nos pondremos en contacto contigo lo antes posible para confirmar los detalles y proporcionarte una cotización más precisa si es necesario.</p>

        <p>Si tienes alguna pregunta urgente, no dudes en llamarnos al <strong>+1 (240) 308-3255</strong>.</p>

        <br />
        <p style={{ fontSize: '14px', color: '#666' }}>
            Atentamente,<br />
            El equipo de Harmony
        </p>

        <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '10px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
            <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
        </div>
    </div>
);
