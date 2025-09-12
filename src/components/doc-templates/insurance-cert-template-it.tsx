
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface InsuranceCertificateDataIt {
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

interface InsuranceCertificateTemplateItProps {
  data: InsuranceCertificateDataIt;
}

export const InsuranceCertificateTemplateIt: React.FC<InsuranceCertificateTemplateItProps> = ({ data }) => {
  const signer = teamMembers[3]; // Juliette Lambert

  return (
    <DocumentWrapper 
        title={`Certificato di Assicurazione del Mutuatario per un ${data.loanType || '[Tipo di Prestito]'}`}
        subHeader="Dipartimento Assicurazioni • Servizio Adesioni • Unità di Certificazione delle Garanzie del Mutuatario"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Certificato N.:</strong> {data.certNumber || '[Numero Certificato]'}</p>
        <p><strong>Data di Emissione:</strong> {formatDate(data.certDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>L'Assicurato:</h2>
         <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Nome e Cognome:</strong> {data.insuredName || "[Nome dell'Assicurato]"}</p>
            <p><strong>Data di Nascita:</strong> {formatDate(data.insuredDob)}</p>
            <p><strong>Indirizzo:</strong> {data.insuredAddress || "[Indirizzo dell'Assicurato]"}</p>
            <p><strong>Numero Documento d'Identità:</strong> {data.insuredIdNumber || '[Numero Identità]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Il Beneficiario:</h2>
        <p>L'istituto di credito partner di FLEXFOND, per il contratto di prestito N. {data.contractNumber || '[Numero Contratto]'}.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Oggetto del Certificato</h2>
        <p>Noi sottoscritti, in rappresentanza del nostro partner assicurativo, certifichiamo con la presente che la persona assicurata sopra menzionata è coperta dal contratto di assicurazione collettiva <strong>N. {data.groupPolicyNumber || '[Numero Polizza]'}</strong>, sottoscritto da FLEXFOND, nell'ambito del suo prestito.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Dettagli del Prestito Assicurato</h2>
        <ul style={{listStyleType: 'none', paddingLeft: 0}}>
            <li><strong>Natura del Prestito:</strong> {data.loanType || '[Tipo di Prestito]'}</li>
            <li><strong>Numero del Prestito Associato:</strong> {data.contractNumber || '[Numero Contratto]'}</li>
            <li><strong>Capitale Assicurato:</strong> {formatCurrency(data.loanAmount || 0)}</li>
            <li><strong>Durata della Copertura Assicurativa:</strong> {data.coverageDuration || 0} mesi, coincidente con la durata del prestito.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Garanzie Applicabili</h2>
        <p>Fatte salve le condizioni e le esclusioni stipulate nell'avviso informativo del contratto di assicurazione che vi è stato fornito, l'assicurato beneficia delle seguenti garanzie:</p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Decesso:</strong> Pagamento del capitale residuo all'istituto di credito.</li>
            <li><strong>Perdita Totale e Irreversibile di Autonomia (PTIA):</strong> Pagamento del capitale residuo all'istituto di credito.</li>
            <li><strong>Incapacità Temporanea Totale al Lavoro (ITT):</strong> Copertura delle rate del prestito dopo un periodo di franchigia.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Costo dell'Assicurazione</h2>
        <p><strong>Premio assicurativo mensile:</strong> {formatCurrency(data.monthlyPremium || 0)} / mese. Questo importo è pagabile mensilmente, in aggiunta alla rata del prestito.</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Data di Efficacia e Validità</h2>
        <p>Il presente certificato è rilasciato per far valere ciò che di diritto. Le garanzie avranno effetto dalla data di erogazione dei fondi del prestito e cesseranno al momento del rimborso completo dello stesso.</p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '50px'}}>
        <div style={{...styles.signatureBox, width: '50%'}}>
            <p style={{marginBottom: '20px'}}>Rilasciato a Parigi, il {formatDate(data.certDate)}</p>
            <img src={signer.signatureUrl} alt={`Firma di ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
            <div style={styles.signatureLine}></div>
            <p>Per FLEXFOND,</p>
            <p>{signer.name},<br/>{signer.role}</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
