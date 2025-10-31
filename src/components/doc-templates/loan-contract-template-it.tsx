
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface LoanContractDataIt {
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

interface LoanContractTemplateItProps {
  data: LoanContractDataIt;
}

export const LoanContractTemplateIt: React.FC<LoanContractTemplateItProps> = ({ data }) => {
    const signer = teamMembers[1]; // Isabelle Dubois
  return (
    <DocumentWrapper 
        title={`Contratto di ${data.loanType || '[Tipo di Prestito]'}`}
        subHeader="Servizio Finanziario Europeo • Dipartimento Credito al Consumo • Ufficio Accordi di Prestito • Unità di Verifica degli Impegni"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Contratto N.:</strong> {data.contractNumber || '[Numero Contratto]'}</p>
            <p><strong>Fatto a Parigi, il</strong> {formatDate(data.contractDate)}</p>
        </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Tra i sottoscritti:</h2>
        <p><strong style={styles.label}>Il Mutuante:</strong> VylsCapital, società di intermediazione, con sede legale in 123 Rue de la Finance, 75001 Parigi, di seguito "Il Mutuante".</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>Il Mutuatario:</strong> {data.borrowerName || '[Nome del Mutuatario]'}</p>
            <p>Residente a {data.borrowerAddress || '[Indirizzo del Mutuatario]'}</p>
            <p>Numero di Identificazione: {data.borrowerIdNumber || '[Numero di Identificazione]'}</p>
            <p>di seguito "Il Mutuatario".</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 1: Oggetto del Contratto</h2>
        <p>Il Mutuante concede al Mutuatario, che accetta, un {data.loanType || '[Tipo di Prestito]'} ammortizzabile per uso non professionale, regolato dalle disposizioni del Codice del Consumo e dalle presenti condizioni generali e particolari.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 2: Importo e Caratteristiche del Prestito</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px'}}>
            <p><strong style={styles.label}>Importo del capitale prestato:</strong><br/>{formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Importo in lettere]'} euro).</p>
            <p><strong style={styles.label}>Tasso Annuo Effettivo Globale (TAEG) fisso:</strong><br/>{data.interestRate || 0}%.</p>
            <p><strong style={styles.label}>Durata totale del rimborso:</strong><br/>{data.loanTerm || 0} mesi.</p>
            <p><strong style={styles.label}>Data di messa a disposizione dei fondi:</strong><br/>Al più tardi 8 giorni dopo la scadenza del periodo di recesso.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 3: Modalità di Rimborso</h2>
        <p>Il Mutuatario si impegna a rimborsare il capitale e gli interessi in {data.loanTerm || 0} rate mensili costanti. La prima rata scadrà il {formatDate(data.repaymentStartDate)} e l'ultima il {formatDate(data.repaymentEndDate)}.</p>
        <p style={{marginTop: '10px'}}><strong style={styles.label}>Rata mensile (esclusa assicurazione):</strong> {formatCurrency(data.monthlyPayment || 0)}. Tale importo sarà addebitato il 5 di ogni mese.</p>
        <p><strong style={styles.label}>Costo totale del credito (interessi):</strong> {formatCurrency(data.totalCreditCost || 0)}</p>
        <p><strong style={styles.label}>Importo totale dovuto:</strong> {formatCurrency(data.totalAmountDue || 0)} (Capitale prestato + costo totale degli interessi).</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 4: Diritto di Recesso</h2>
        <p>Il Mutuatario dispone di un periodo di recesso di quattordici (14) giorni di calendario a decorrere dalla data di firma dell'offerta di contratto di credito. Per recedere, il Mutuatario deve restituire il modulo di recesso allegato all'offerta tramite lettera raccomandata con avviso di ricevimento.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 5: Inadempimento</h2>
        <p>In caso di mancato pagamento di una rata alla sua scadenza, il Mutuante potrà esigere il rimborso immediato del capitale residuo, maggiorato degli interessi maturati e non pagati. Potranno essere applicate penali di mora in conformità con la legislazione vigente.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 6: Assicurazione Obbligatoria del Mutuatario</h2>
        <p>La concessione di questo prestito è subordinata alla preventiva sottoscrizione da parte del Mutuatario di una polizza assicurativa che copra i rischi di Decesso, Perdita Totale e Irreversibile di Autonomia (PTIA) e Incapacità Lavorativa (IT). Il Mutuatario dichiara di aver ricevuto, letto e accettato le condizioni di tale assicurazione, che sono oggetto di un certificato di assicurazione separato fornito da VylsCapital o dai suoi partner assicurativi prima della firma del presente contratto.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 7: Protezione dei Dati Personali</h2>
        <p>Le informazioni raccolte sono necessarie per l'elaborazione della richiesta di prestito. Sono trattate elettronicamente e sono destinate ai servizi del Mutuante e dei suoi partner. In conformità al GDPR, il Mutuatario ha il diritto di accedere, rettificare e cancellare i propri dati personali contattando il Mutuante all'indirizzo contact@vylscapital.com.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 8: Legge Applicabile e Controversie</h2>
        <p>Il presente contratto è soggetto alla legge francese. In caso di controversia, le parti si impegnano a cercare una soluzione amichevole. In caso contrario, il tribunale competente sarà quello del luogo di residenza del Mutuatario.</p>
      </div>

      <div style={{ ...styles.section, textAlign: 'center', marginTop: '30px' }}>
          <p>Fatto in due copie originali, una per ciascuna parte.</p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <img src={signer.signatureUrl} alt={`Firma di ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Firma del Mutuante (VylsCapital)</p>
          <p>{signer.name}, {signer.role}</p>
        </div>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Firma del Mutuatario</p>
          <p style={{fontSize: '9pt', color: '#777', fontStyle: 'italic'}}>(Preceduta dalla dicitura "Letto e approvato")</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
