
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface DebtAcknowledgementDataIt {
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

interface DebtAcknowledgementTemplateItProps {
  data: DebtAcknowledgementDataIt;
}

export const DebtAcknowledgementTemplateIt: React.FC<DebtAcknowledgementTemplateItProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Riconoscimento di Debito per un ${data.loanType || '[Tipo di Prestito]'}`}
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Documento N.:</strong> {data.docNumber || '[Numero documento]'}</p>
        <p><strong>Data:</strong> {formatDate(data.docDate)}</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Tra i sottoscritti:</h2>
        <p><strong style={styles.label}>Il Creditore:</strong> FLEXFOND, in qualità di intermediario per i suoi partner finanziari, con sede legale in 123 Rue de la Finance, 75001 Parigi.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>Il Debitore:</strong></p>
            <p><strong>Nome:</strong> {data.debtorName || '[Nome del debitore]'}</p>
            <p><strong>Indirizzo:</strong> {data.debtorAddress || '[Indirizzo del debitore]'}</p>
            <p><strong>Numero Documento d'Identità:</strong> {data.debtorIdNumber || "[Numero d'identità]"}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 1: Riconoscimento del Debito</h2>
        <p>
          Io sottoscritto, <strong>{data.debtorName || '[Nome del debitore]'}</strong>, residente a {data.debtorAddress || '[Indirizzo del debitore]'}, riconosco con la presente di dovere a FLEXFOND, in nome e per conto dei suoi partner finanziari, la somma di:
        </p>
        <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Importo in lettere]'} euro)
        </p>
        <p>
          Tale somma corrisponde al capitale di un {data.loanType || '[Tipo di Prestito]'} che mi è stato concesso e di cui ho ricevuto i fondi.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 2: Modalità di Rimborso</h2>
        <p>
          Mi impegno a rimborsare tale somma per intero, così come gli interessi e le spese associate, in conformità con il piano di ammortamento e le condizioni definite nel contratto di {data.loanType || '[Tipo di Prestito]'} N. <strong>{data.contractNumber || '[Numero contratto]'}</strong> che ho firmato separatamente. La durata di rimborso concordata è di {data.loanTerm || '[Durata prestito]'} mesi, salvo in caso di rimborso anticipato o di incidente di pagamento che modifichi il piano.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 3: Clausola di Inadempimento</h2>
        <p>
          In caso di mancato pagamento di una o più rate, riconosco che il Creditore potrà avvalersi delle clausole previste nel contratto di prestito, inclusa la richiesta di rimborso anticipato dell'intero capitale residuo.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 4: Menzione Manoscritta Obbligatoria</h2>
        <p>
          L'articolo L. 313-24 del Codice del Consumo sottolinea l'importanza dell'impegno. Il debitore dichiara di aver letto e compreso l'intero contratto di prestito a cui si riferisce il presente riconoscimento di debito.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%'}}>
          <p style={{textAlign: 'right', marginBottom: '20px'}}>Fatto a Parigi, il {formatDate(data.docDate)}</p>
          <div style={styles.signatureLine}></div>
          <p style={{...styles.label, textAlign: 'left'}}>Firma del Debitore</p>
          <p style={{textAlign: 'left', fontSize: '9pt', color: '#777', fontStyle: 'italic', marginTop: '5px'}}>
            Preceduta dalla menzione manoscritta: "Letto e approvato, buono per riconoscimento di debito per la somma di {data.loanAmountInWords || '[importo in lettere]'} euro."
          </p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
