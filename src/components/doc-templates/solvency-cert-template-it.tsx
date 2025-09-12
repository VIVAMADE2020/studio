
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface SolvencyCertificateDataIt {
  clientName: string;
  clientAddress: string;
  clientIdNumber: string;
  accountNumber: string;
  balance: number;
  certDate: string;
}

interface SolvencyCertificateTemplateItProps {
  data: SolvencyCertificateDataIt;
}

export const SolvencyCertificateTemplateIt: React.FC<SolvencyCertificateTemplateItProps> = ({ data }) => {
    const expirationDate = new Date(data.certDate || new Date());
    expirationDate.setDate(expirationDate.getDate() + 30);
    const signer = teamMembers[4]; // David Moreau
    
  return (
    <DocumentWrapper 
        title="Certificato di Solvibilità Pre-approvata"
        subHeader="Dipartimento di Analisi Finanziaria • Unità di Certificazione della Solvibilità"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Certificato N.:</strong> {`CS-${data.accountNumber || 'XXXX'}`}</p>
            <p><strong>Valido fino al:</strong> {formatDate(expirationDate.toISOString())}</p>
        </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Beneficiario del certificato:</h2>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Nome:</strong> {data.clientName || '[Nome del Beneficiario]'}</p>
            <p><strong>Numero di Identificazione:</strong> {data.clientIdNumber || '[Numero di Identificazione]'}</p>
            <p><strong>Indirizzo:</strong> {data.clientAddress || '[Indirizzo del Beneficiario]'}</p>
            <p><strong>Titolare del conto FLEXFOND N.:</strong> {data.accountNumber || '[Numero di Conto]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 1: Oggetto del Certificato</h2>
        <p>
          FLEXFOND, in qualità di intermediario finanziario, certifica con la presente di aver condotto un'analisi approfondita della situazione finanziaria del suddetto beneficiario. Sulla base dei documenti forniti e delle verifiche effettuate, il beneficiario è ritenuto idoneo a un finanziamento per un importo massimo di:
        </p>
         <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.balance || 0)}
        </p>
         <p>
          Tale importo è stato stabilito per un progetto non specificato e può essere utilizzato come prova di capacità di finanziamento in fasi preliminari (es. firma di un contratto preliminare di vendita, negoziazione commerciale).
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 2: Ambito e Finalizzazione</h2>
        <p>
          Questo certificato attesta la pre-approvazione della sua pratica di finanziamento da parte di FLEXFOND e costituisce un documento essenziale nel processo di concessione del prestito. Esso testimonia il successo dell'analisi della sua solvibilità.
        </p>
        <p>
          Il passo finale per l'erogazione dei fondi sarà la firma del <strong>contratto di prestito ufficiale</strong>, che formalizzerà tutte le condizioni e il piano di ammortamento. FLEXFOND si impegna ad assisterla in quest'ultima fase.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Articolo 3: Validità</h2>
        <p>
          Il presente certificato è valido per 30 giorni di calendario dalla sua data di emissione, ovvero fino al {formatDate(expirationDate.toISOString())}. Questo periodo garantisce la pertinenza delle condizioni analizzate. Dopo tale data, sarà necessario un semplice aggiornamento per confermare il mantenimento della sua idoneità.
        </p>
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
