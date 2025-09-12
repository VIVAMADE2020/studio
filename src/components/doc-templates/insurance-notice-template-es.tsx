
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';

export interface InsuranceNoticeDataEs {
  noticeDate: string;
  borrowerName: string;
  contractNumber: string;
  groupPolicyNumber: string;
  guarantees: string;
  exclusions: string;
  claimProcedure: string;
}

interface InsuranceNoticeTemplateEsProps {
  data: InsuranceNoticeDataEs;
}

const renderList = (text: string) => {
    if (!text) return null;
    return (
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
            {text.split('\n').map((item, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{item.replace(/^- /, '')}</li>
            ))}
        </ul>
    );
}

export const InsuranceNoticeTemplateEs: React.FC<InsuranceNoticeTemplateEsProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title="Noticia de Información del Seguro de Prestatario"
      subHeader={`Contrato de seguro colectivo n° ${data.groupPolicyNumber || '[Número de Póliza]'}`}
    >
      <div style={{...styles.section, textAlign: 'right', marginBottom: '30px' }}>
        <p>Documento emitido el: {formatDate(data.noticeDate)}</p>
        <p>Destinatario: {data.borrowerName || '[Nombre del adherente]'}</p>
        <p>Referente al proyecto de préstamo n°: {data.contractNumber || '[Número de contrato]'}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>1. Objeto de la presente noticia</h2>
        <p>
          La presente noticia tiene por objeto informarle de las condiciones, modalidades, garantías y exclusiones del contrato de seguro colectivo suscrito por FLEXFOND con su socio asegurador, al que usted solicita su adhesión. <strong>Le invitamos a leerla atentamente antes de firmar su solicitud de adhesión y a conservarla.</strong> Es un elemento esencial de su protección financiera.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>2. Garantías del contrato</h2>
        <p>
          Sujeto a los términos y condiciones definidos en el contrato, su adhesión le cubre contra los siguientes riesgos:
        </p>
        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
          {renderList(data.guarantees)}
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>3. Principales exclusiones</h2>
        <p>
          Ciertas situaciones no están cubiertas por el contrato. Quedan excluidas de la garantía, en particular:
        </p>
         <div style={{ padding: '15px', border: '1px solid #fee2e2', backgroundColor: '#fff7f7', borderRadius: '4px', marginTop: '15px' }}>
            {renderList(data.exclusions)}
            <p style={{marginTop: '15px', fontSize: '9pt', fontStyle: 'italic', color: '#777'}}>Esta lista no es exhaustiva. Para el detalle completo de las exclusiones, por favor, consulte las Condiciones Generales del contrato de seguro que se le entregarán.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>4. Formalidades de adhesión y cuestionario de salud</h2>
        <p>
          Su adhesión está sujeta a la aceptación de la aseguradora, que se basa, en particular, en sus respuestas al cuestionario de salud. Usted está obligado a responder de manera exacta y completa a todas las preguntas formuladas. Cualquier declaración falsa intencionada puede acarrear la nulidad de su adhesión y el rechazo de la cobertura de un siniestro.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>5. Procedimiento en caso de siniestro</h2>
        <p>
          Si se produce uno de los eventos garantizados, usted o sus derechohabientes deben declararlo lo antes posible.
        </p>
         <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.claimProcedure || "Procedimiento no especificado."}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>6. Derecho de desistimiento</h2>
        <p>
          Dispone de un plazo de 30 días naturales a partir de la fecha de firma de su solicitud de adhesión para desistir, sin gastos ni penalizaciones, mediante carta certificada con acuse de recibo.
        </p>
      </div>

      <div style={{...styles.footer, borderTop: 'none', marginTop: '30px', textAlign: 'left', fontStyle: 'italic', color: '#555'}}>
        <p>
            Esta noticia de información no sustituye a las Condiciones Generales y Particulares del contrato de seguro, que prevalecen en caso de litigio y que se le entregarán en el momento de su adhesión definitiva.
        </p>
      </div>
    </DocumentWrapper>
  );
};
