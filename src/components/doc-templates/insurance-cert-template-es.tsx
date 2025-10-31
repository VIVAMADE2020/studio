
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface InsuranceCertificateDataEs {
  certNumber: string;
  certDate: string;
  insuredName: string;
  insuredDob: string;
  insuredAddress: string;
  insuredIdNumber: string;
  contractNumber: string;
  loanType: string;
  loanAmount: number;
  coverageDuration: number;
  monthlyPremium: number;
  groupPolicyNumber: string;
}

interface InsuranceCertificateTemplateEsProps {
  data: InsuranceCertificateDataEs;
}

export const InsuranceCertificateTemplateEs: React.FC<InsuranceCertificateTemplateEsProps> = ({ data }) => {
  const signer = teamMembers[3]; // Juliette Lambert

  return (
    <DocumentWrapper 
        title={`Certificado de Seguro de Prestatario para un ${data.loanType || '[Tipo de Préstamo]'}`}
        subHeader="Departamento de Seguros • Servicio de Adhesiones • Unidad de Certificación de Garantías del Prestatario"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Certificado N°:</strong> {data.certNumber || '[Número de Certificado]'}</p>
        <p><strong>Fecha de Emisión:</strong> {formatDate(data.certDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>El Asegurado:</h2>
         <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Nombre y Apellido:</strong> {data.insuredName || '[Nombre del Asegurado]'}</p>
            <p><strong>Fecha de Nacimiento:</strong> {formatDate(data.insuredDob)}</p>
            <p><strong>Dirección:</strong> {data.insuredAddress || '[Dirección del Asegurado]'}</p>
            <p><strong>N° de Documento de Identidad:</strong> {data.insuredIdNumber || '[Número de Identidad]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>El Beneficiario:</h2>
        <p>La entidad prestamista socia de VylsCapital, para el contrato de préstamo N° {data.contractNumber || '[Número de Contrato]'}.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Objeto del Certificado</h2>
        <p>Nosotros, los abajo firmantes, actuando en nombre de nuestro socio asegurador, certificamos por la presente que la persona asegurada mencionada anteriormente está cubierta por el contrato de seguro colectivo <strong>N° {data.groupPolicyNumber || '[Número de Póliza]'}</strong>, suscrito por VylsCapital, en el marco de su préstamo.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Detalles del Préstamo Asegurado</h2>
        <ul style={{listStyleType: 'none', paddingLeft: 0}}>
            <li><strong>Tipo de Préstamo:</strong> {data.loanType || '[Tipo de Préstamo]'}</li>
            <li><strong>Número de Préstamo Asociado:</strong> {data.contractNumber || '[Número de Contrato]'}</li>
            <li><strong>Capital Asegurado:</strong> {formatCurrency(data.loanAmount || 0)}</li>
            <li><strong>Duración de la Cobertura del Seguro:</strong> {data.coverageDuration || 0} meses, coincidiendo con la duración del préstamo.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Garantías Aplicables</h2>
        <p>Sujeto a los términos, condiciones y exclusiones estipuladas en la nota de información del contrato de seguro que se le ha entregado, el asegurado se beneficia de las siguientes garantías:</p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Fallecimiento:</strong> Pago del capital pendiente a la entidad prestamista.</li>
            <li><strong>Pérdida Total e Irreversible de Autonomía (PTIA):</strong> Pago del capital pendiente a la entidad prestamista.</li>
            <li><strong>Incapacidad Temporal Total para el Trabajo (ITT):</strong> Cobertura de las cuotas del préstamo después de un período de carencia.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Costo del Seguro</h2>
        <p><strong>Prima de seguro mensual:</strong> {formatCurrency(data.monthlyPremium || 0)} / mes. Este importe se paga mensualmente, además de la cuota de su préstamo.</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Fecha de Efecto y Validez</h2>
        <p>Este certificado se emite para que sirva y valga lo que en derecho proceda. Las garantías entrarán en vigor en la fecha del desembolso de los fondos del préstamo y cesarán con la amortización total del mismo.</p>
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
