
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface SolvencyCertificateDataEs {
  clientName: string;
  clientAddress: string;
  clientIdNumber: string;
  accountNumber: string;
  balance: number;
  certDate: string;
}

interface SolvencyCertificateTemplateEsProps {
  data: SolvencyCertificateDataEs;
}

export const SolvencyCertificateTemplateEs: React.FC<SolvencyCertificateTemplateEsProps> = ({ data }) => {
    const expirationDate = new Date(data.certDate || new Date());
    expirationDate.setDate(expirationDate.getDate() + 30);
    const signer = teamMembers[4]; // David Moreau
    
  return (
    <DocumentWrapper 
        title="Certificado de Solvencia Pre-aprobada"
        subHeader="Departamento de Análisis Financiero • Unidad de Certificación de Solvencia"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Certificado N°:</strong> {`CS-${data.accountNumber || 'XXXX'}`}</p>
            <p><strong>Válido hasta:</strong> {formatDate(expirationDate.toISOString())}</p>
        </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Beneficiario del certificado:</h2>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Nombre:</strong> {data.clientName || '[Nombre del Beneficiario]'}</p>
            <p><strong>N° de Identificación:</strong> {data.clientIdNumber || '[Número de Identificación]'}</p>
            <p><strong>Dirección:</strong> {data.clientAddress || '[Dirección del Beneficiario]'}</p>
            <p><strong>Titular de la cuenta VylsCapital N°:</strong> {data.accountNumber || '[Número de Cuenta]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 1: Objeto del Certificado</h2>
        <p>
          VylsCapital, actuando como intermediario financiero, certifica por la presente haber realizado un análisis exhaustivo de la situación financiera del beneficiario antes mencionado. Con base en los documentos proporcionados y las verificaciones realizadas, se considera al beneficiario elegible para un financiamiento por un monto máximo de:
        </p>
         <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.balance || 0)}
        </p>
         <p>
          Este monto se ha establecido para un proyecto no especificado y puede ser utilizado como prueba de capacidad de financiamiento en trámites preliminares (por ejemplo, firma de un contrato de arras, negociación comercial).
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 2: Alcance y Finalización</h2>
        <p>
          Este certificado acredita la pre-aprobación de su expediente de financiamiento por parte de VylsCapital y constituye un documento esencial en el proceso de concesión de su préstamo. Testimonia el éxito del análisis de su solvencia.
        </p>
        <p>
          El paso final para el desembolso de los fondos será la firma del <strong>contrato de préstamo oficial</strong>, que formalizará todas las condiciones y el calendario de pagos. VylsCapital se compromete a acompañarle en este último trámite.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 3: Validez</h2>
        <p>
          El presente certificado es válido por 30 días naturales a partir de su fecha de emisión, es decir, hasta el {formatDate(expirationDate.toISOString())}. Este período garantiza la pertinencia de las condiciones analizadas. Pasado este plazo, será necesaria una simple actualización para confirmar el mantenimiento de su elegibilidad.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '50px'}}>
        <div style={{...styles.signatureBox, width: '50%'}}>
            <p style={{marginBottom: '20px'}}>Emitido en París, el {formatDate(data.certDate)}</p>
            <img src={signer.signatureUrl} alt={`Firma de ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
            <div style={styles.signatureLine}></div>
            <p>Por VylsCapital,</p>
            <p>{signer.name},<br/>{signer.role}</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
