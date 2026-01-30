
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
}) => (
    <div style={{ fontFamily: 'sans-serif', color: '#1a4d3a' }}>
        <h1 style={{ borderBottom: '2px solid #1a4d3a', paddingBottom: '10px' }}>Nuevo Mensaje de Contacto</h1>
        <p>Has recibido una nueva solicitud de servicio a través del sitio web.</p>

        <div style={{ backgroundColor: '#f8f6f3', padding: '20px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '18px', marginTop: '0' }}>Detalles del Cliente</h2>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                <li style={{ marginBottom: '10px' }}><strong>Nombre:</strong> {name}</li>
                <li style={{ marginBottom: '10px' }}><strong>Email:</strong> {email}</li>
                <li style={{ marginBottom: '10px' }}><strong>Teléfono:</strong> {phone}</li>
            </ul>

            <h2 style={{ fontSize: '18px', borderTop: '1px solid #ddd', paddingTop: '15px' }}>Detalles del Servicio</h2>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                <li style={{ marginBottom: '10px' }}><strong>Tipo de Servicio:</strong> {serviceType}</li>
                <li style={{ marginBottom: '10px' }}><strong>Ubicación:</strong> {serviceLocation}</li>
                <li style={{ marginBottom: '10px' }}><strong>Tamaño (sq ft):</strong> {squareMeters}</li>
                {propertyType && <li style={{ marginBottom: '10px' }}><strong>Tipo de Propiedad:</strong> {propertyType}</li>}
                {frequency && <li style={{ marginBottom: '10px' }}><strong>Frecuencia:</strong> {frequency}</li>}
                {preferredDate && <li style={{ marginBottom: '10px' }}><strong>Fecha Preferida:</strong> {preferredDate}</li>}
                {addressDetails && <li style={{ marginBottom: '10px' }}><strong>Dirección:</strong> {addressDetails}</li>}
            </ul>

            {message && (
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px' }}>
                    <h2 style={{ fontSize: '18px' }}>Mensaje Adicional</h2>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
                </div>
            )}
        </div>
    </div>
);
