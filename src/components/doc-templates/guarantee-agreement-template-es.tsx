
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface GuaranteeAgreementDataEs {
  actNumber: string;
  actDate: string;
  borrowerName: string;
  borrowerAddress: string;
  borrowerIdNumber: string;
  loanType: string;
  loanAmount: number;
  loanAmountInWords: string;
  loanTerm: number;
  contractNumber: string;
}

interface GuaranteeAgreementTemplateEsProps {
  data: GuaranteeAgreementDataEs;
}

export const GuaranteeAgreementTemplateEs: React.FC<GuaranteeAgreementTemplateEsProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Acta de Fianza Solidaria para un ${data.loanType || '[Tipo de Préstamo]'}`}
      subHeader="Departamento Jurídico y de Garantías • Departamento de Compromisos • Unidad de Formalización de Garantías"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Acta N°:</strong> {data.actNumber || '[Número de acta]'}</p>
        <p><strong>Fecha:</strong> {formatDate(data.actDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Entre los abajo firmantes:</h2>
        <p><strong style={styles.label}>El Acreedor:</strong> FLEXFOND, actuando como intermediario para sus socios financieros, con domicilio social en 123 Rue de la Finance, 75001 París.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>El Deudor (Prestatario):</strong></p>
            <p><strong>Nombre:</strong> {data.borrowerName || '[Nombre del prestatario]'}</p>
            <p><strong>Dirección:</strong> {data.borrowerAddress || '[Dirección del prestatario]'}</p>
            <p><strong>N° de Identificación:</strong> {data.borrowerIdNumber || '[Número de identificación]'}</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 1: Objeto del compromiso</h2>
        <p>
            Mediante el presente acto, el Deudor se compromete a pagar al Acreedor las sumas adeudadas en virtud del contrato de {data.loanType || '[Tipo de préstamo]'} referenciado a continuación:
        </p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Número del contrato de préstamo:</strong> {data.contractNumber || '[Número de contrato]'}</li>
            <li><strong>Importe del capital:</strong> {formatCurrency(data.loanAmount || 0)} (en letras: {data.loanAmountInWords || '[Importe en letras]'} euros).</li>
            <li><strong>Duración del préstamo:</strong> {data.loanTerm || 0} meses.</li>
        </ul>
        <p style={{marginTop: '10px'}}>El Deudor declara tener pleno conocimiento de la naturaleza y el alcance de sus obligaciones.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 2: Alcance de la garantía</h2>
        <p>
          El compromiso del Deudor se extiende al pago del principal, intereses, comisiones, gastos y accesorios, y en general, de todas las sumas que pudieran adeudarse en virtud del contrato de préstamo antes mencionado. El compromiso se otorga por la duración total del préstamo.
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 3: Solidaridad e Indivisibilidad</h2>
        <p>
          El Deudor es el único responsable de la deuda. En caso de incumplimiento, el Acreedor podrá reclamar la totalidad de la deuda al Deudor.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 4: Mención Manuscrita Obligatoria</h2>
        <p>
            El Deudor debe escribir de su puño y letra la siguiente mención, de acuerdo con la ley: "Yo, {data.borrowerName || '[Nombre del prestatario]'}, me comprometo a reembolsar al prestamista las sumas adeudadas con mis ingresos y mis bienes."
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 5: Información debida</h2>
        <p>
            El Acreedor se compromete a informar al Deudor de cualquier modificación del contrato.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%', textAlign: 'center'}}>
            <p>Hecho en París, el {formatDate(data.actDate)}</p>
            <div style={{...styles.signatureLine, marginTop: '40px'}}></div>
            <p style={{...styles.label, textAlign: 'center'}}>Firma del Deudor</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
