
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface DebtAcknowledgementDataEs {
  docNumber: string;
  docDate: string;
  debtorName: string;
  debtorAddress: string;
  debtorIdNumber: string;
  loanType: string;
  loanAmount: number;
  loanAmountInWords: string;
  loanTerm: number;
  contractNumber: string;
}

interface DebtAcknowledgementTemplateEsProps {
  data: DebtAcknowledgementDataEs;
}

export const DebtAcknowledgementTemplateEs: React.FC<DebtAcknowledgementTemplateEsProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Reconocimiento de Deuda por un ${data.loanType || '[Tipo de Préstamo]'}`}
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Documento N°:</strong> {data.docNumber || '[Número de documento]'}</p>
        <p><strong>Fecha:</strong> {formatDate(data.docDate)}</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Entre los abajo firmantes:</h2>
        <p><strong style={styles.label}>El Acreedor:</strong> FLEXFOND, actuando como intermediario para sus socios financieros, con domicilio social en 123 Rue de la Finance, 75001 París.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>El Deudor:</strong></p>
            <p><strong>Nombre:</strong> {data.debtorName || '[Nombre del deudor]'}</p>
            <p><strong>Dirección:</strong> {data.debtorAddress || '[Dirección del deudor]'}</p>
            <p><strong>N° de Documento de Identidad:</strong> {data.debtorIdNumber || '[Número de documento de identidad]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 1: Reconocimiento de la Deuda</h2>
        <p>
          Yo, el abajo firmante, <strong>{data.debtorName || '[Nombre del deudor]'}</strong>, con domicilio en {data.debtorAddress || '[Dirección del deudor]'}, reconozco por la presente deber a FLEXFOND, actuando en nombre de sus socios financieros, la suma de:
        </p>
        <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Importe en letras]'} euros)
        </p>
        <p>
          Esta suma corresponde al capital de un {data.loanType || '[Tipo de Préstamo]'} que me ha sido concedido y cuyos fondos he recibido.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 2: Modalidades de Reembolso</h2>
        <p>
          Me comprometo a reembolsar esta suma en su totalidad, así como los intereses y gastos asociados, de acuerdo con el calendario y las condiciones definidas en el contrato de {data.loanType || '[Tipo de Préstamo]'} N° <strong>{data.contractNumber || '[Número de contrato]'}</strong> que he firmado por separado. El período de reembolso acordado es de {data.loanTerm || '[Plazo del préstamo]'} meses, salvo en caso de reembolso anticipado o incidente de pago que modifique el calendario.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 3: Cláusula de Incumplimiento</h2>
        <p>
          En caso de impago de una o más cuotas, reconozco que el Acreedor podrá invocar las cláusulas previstas en el contrato de préstamo, incluida la exigibilidad anticipada de la totalidad del capital pendiente.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 4: Mención Manuscrita Obligatoria</h2>
        <p>
          El artículo L. 313-24 del Código de Consumo estipula la importancia del compromiso. El deudor reconoce haber leído y comprendido la totalidad del contrato de préstamo al que se refiere este reconocimiento de deuda.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%'}}>
          <p style={{textAlign: 'right', marginBottom: '20px'}}>Hecho en París, el {formatDate(data.docDate)}</p>
          <div style={styles.signatureLine}></div>
          <p style={{...styles.label, textAlign: 'left'}}>Firma del Deudor</p>
          <p style={{textAlign: 'left', fontSize: '9pt', color: '#777', fontStyle: 'italic', marginTop: '5px'}}>
            Precedida de la mención manuscrita: "Leído y aprobado, bueno para reconocimiento de deuda por la suma de {data.loanAmountInWords || '[importe en letras]'} euros."
          </p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
