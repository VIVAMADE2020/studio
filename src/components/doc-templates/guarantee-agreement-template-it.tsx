
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface GuaranteeAgreementDataIt {
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

interface GuaranteeAgreementTemplateItProps {
  data: GuaranteeAgreementDataIt;
}

export const GuaranteeAgreementTemplateIt: React.FC<GuaranteeAgreementTemplateItProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Atto di Fideiussione Solidale per un ${data.loanType || '[Tipo di Prestito]'}`}
      subHeader="Dipartimento Legale e Garanzie • Dipartimento Impegni • Unità di Formalizzazione delle Garanzie"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Atto N.:</strong> {data.actNumber || '[Numero Atto]'}</p>
        <p><strong>Data:</strong> {formatDate(data.actDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Tra i sottoscritti:</h2>
        <p><strong style={styles.label}>Il Creditore:</strong> FLEXFOND, in qualità di intermediario per i suoi partner finanziari, con sede legale in 123 Rue de la Finance, 75001 Parigi.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>Il Debitore (Mutuatario):</strong></p>
            <p><strong>Nome:</strong> {data.borrowerName || '[Nome del mutuatario]'}</p>
            <p><strong>Indirizzo:</strong> {data.borrowerAddress || '[Indirizzo del mutuatario]'}</p>
            <p><strong>Numero di Identificazione:</strong> {data.borrowerIdNumber || '[Numero di identificazione]'}</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 1: Oggetto dell'impegno</h2>
        <p>
            Con il presente atto, il Debitore si impegna a pagare al Creditore le somme dovute in base al contratto di {data.loanType || '[Tipo di prestito]'} di seguito indicato:
        </p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Numero del contratto di prestito:</strong> {data.contractNumber || '[Numero contratto]'}</li>
            <li><strong>Importo del capitale:</strong> {formatCurrency(data.loanAmount || 0)} (in lettere: {data.loanAmountInWords || '[Importo in lettere]'} euro).</li>
            <li><strong>Durata del prestito:</strong> {data.loanTerm || 0} mesi.</li>
        </ul>
        <p style={{marginTop: '10px'}}>Il Debitore dichiara di avere piena conoscenza della natura и dell'entità dei propri obblighi.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 2: Ambito della garanzia</h2>
        <p>
          L'impegno del Debitore copre il pagamento del capitale, degli interessi, delle commissioni, delle spese e degli accessori e, in generale, di tutte le somme che potrebbero essere dovute in base al suddetto contratto di prestito. L'impegno è prestato per l'intera durata del prestito.
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 3: Solidarietà e Indivisibilità</h2>
        <p>
          Il Debitore è l'unico responsabile del debito. In caso di inadempimento, il Creditore può richiedere l'intero debito al Debitore.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 4: Menzione Manoscritta Obbligatoria</h2>
        <p>
            Il Debitore deve ricopiare di proprio pugno la seguente menzione, conformemente alla legge: "Io, {data.borrowerName || '[Nome del mutuatario]'}, mi impegno a rimborsare al mutuante le somme dovute con i miei redditi e i miei beni."
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 5: Informazioni dovute</h2>
        <p>
            Il Creditore si impegna a informare il Debitore di qualsiasi modifica del contratto.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%', textAlign: 'center'}}>
            <p>Fatto a Parigi, il {formatDate(data.actDate)}</p>
            <div style={{...styles.signatureLine, marginTop: '40px'}}></div>
            <p style={{...styles.label, textAlign: 'center'}}>Firma del Debitore</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
