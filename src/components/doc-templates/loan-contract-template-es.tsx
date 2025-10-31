
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface LoanContractDataEs {
  contractNumber: string;
  contractDate: string;
  borrowerName: string;
  borrowerAddress: string;
  borrowerIdNumber: string;
  loanType: string;
  loanAmount: number;
  loanAmountInWords: string;
  interestRate: number;
  loanTerm: number;
  repaymentStartDate: string;
  repaymentEndDate: string;
  monthlyPayment: number;
  totalCreditCost: number;
  totalAmountDue: number;
}

interface LoanContractTemplateEsProps {
  data: LoanContractDataEs;
}

export const LoanContractTemplateEs: React.FC<LoanContractTemplateEsProps> = ({ data }) => {
    const signer = teamMembers[1]; // Isabelle Dubois
  return (
    <DocumentWrapper 
        title={`Contrato de ${data.loanType || '[Tipo de Préstamo]'}`}
        subHeader="Servicio Financiero Europeo • Departamento de Crédito al Consumo • Oficina de Acuerdos de Préstamo • Unidad de Verificación de Compromisos"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Contrato Nº:</strong> {data.contractNumber || '[Número de Contrato]'}</p>
            <p><strong>Hecho en París, el</strong> {formatDate(data.contractDate)}</p>
        </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Entre los abajo firmantes:</h2>
        <p><strong style={styles.label}>El Prestamista:</strong> VylsCapital, sociedad intermediaria, con domicilio social en 123 Rue de la Finance, 75001 París, en adelante "El Prestamista".</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>El Prestatario:</strong> {data.borrowerName || '[Nombre del Prestatario]'}</p>
            <p>Con domicilio en {data.borrowerAddress || '[Dirección del Prestatario]'}</p>
            <p>Nº de Identificación: {data.borrowerIdNumber || '[Número de Identificación]'}</p>
            <p>en adelante "El Prestatario".</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 1: Objeto del Contrato</h2>
        <p>El Prestamista concede al Prestatario, quien acepta, un {data.loanType || '[Tipo de Préstamo]'} amortizable para uso no profesional, regido por las disposiciones del Código de Consumo y por las presentes condiciones generales y particulares.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 2: Importe y Características del Préstamo</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px'}}>
            <p><strong style={styles.label}>Importe del capital prestado:</strong><br/>{formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Importe en letras]'} euros).</p>
            <p><strong style={styles.label}>Tasa Anual Equivalente (TAE) fija:</strong><br/>{data.interestRate || 0}%.</p>
            <p><strong style={styles.label}>Plazo total de amortización:</strong><br/>{data.loanTerm || 0} meses.</p>
            <p><strong style={styles.label}>Fecha de disponibilidad de los fondos:</strong><br/>A más tardar 8 días después de la expiración del período de desistimiento.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 3: Modalidades de Amortización</h2>
        <p>El Prestatario se compromete a reembolsar el capital y los intereses en {data.loanTerm || 0} cuotas mensuales constantes. La primera cuota vencerá el {formatDate(data.repaymentStartDate)} y la última el {formatDate(data.repaymentEndDate)}.</p>
        <p style={{marginTop: '10px'}}><strong style={styles.label}>Cuota mensual (sin seguro):</strong> {formatCurrency(data.monthlyPayment || 0)}. Este importe se cargará el día 5 de cada mes.</p>
        <p><strong style={styles.label}>Coste total del crédito (intereses):</strong> {formatCurrency(data.totalCreditCost || 0)}</p>
        <p><strong style={styles.label}>Importe total adeudado:</strong> {formatCurrency(data.totalAmountDue || 0)} (Capital prestado + coste total de los intereses).</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 4: Derecho de Desistimiento</h2>
        <p>El Prestatario dispone de un plazo de desistimiento de catorce (14) días naturales a contar desde la fecha de firma de la oferta de contrato de crédito. Para desistir, el Prestatario debe devolver el formulario de desistimiento adjunto a la oferta por carta certificada con acuse de recibo.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 5: Incumplimiento de Pago</h2>
        <p>En caso de impago de una cuota en su fecha de vencimiento, el Prestamista podrá exigir el reembolso inmediato del capital pendiente, más los intereses devengados y no pagados. Podrán aplicarse penalizaciones por demora de acuerdo con la legislación vigente.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 6: Seguro de Prestatario Obligatorio</h2>
        <p>La concesión de este préstamo está condicionada a la suscripción previa por parte del Prestatario de un seguro que cubra los riesgos de Fallecimiento, Pérdida Total e Irreversible de Autonomía (PTIA) e Incapacidad Laboral (IT). El Prestatario reconoce haber recibido, leído y aceptado las condiciones de este seguro, que son objeto de un certificado de seguro separado proporcionado por VylsCapital o sus socios aseguradores antes de la firma de este contrato.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 7: Protección de Datos Personales</h2>
        <p>La información recopilada es necesaria para tramitar la solicitud de préstamo. Se procesa electrónicamente y está destinada a los departamentos del Prestamista y sus socios. De conformidad con el RGPD, el Prestatario tiene derecho de acceso, rectificación y supresión de sus datos personales contactando con el Prestamista en contact@vylscapital.com.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artículo 8: Ley Aplicable y Litigios</h2>
        <p>Este contrato está sujeto a la ley francesa. En caso de litigio, las partes se comprometen a buscar una solución amistosa. En su defecto, el tribunal competente será el del lugar de domicilio del Prestatario.</p>
      </div>

      <div style={{ ...styles.section, textAlign: 'center', marginTop: '30px' }}>
          <p>Hecho en dos ejemplares originales, uno para cada parte.</p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <img src={signer.signatureUrl} alt={`Firma de ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Firma del Prestamista (VylsCapital)</p>
          <p>{signer.name}, {signer.role}</p>
        </div>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Firma del Prestatario</p>
          <p style={{fontSize: '9pt', color: '#777', fontStyle: 'italic'}}>(Precedida de la mención "Leído y aprobado")</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
