
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';

export interface InsuranceNoticeDataIt {
  noticeDate: string;
  borrowerName: string;
  contractNumber: string;
  groupPolicyNumber: string;
  guarantees: string;
  exclusions: string;
  claimProcedure: string;
}

interface InsuranceNoticeTemplateItProps {
  data: InsuranceNoticeDataIt;
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

export const InsuranceNoticeTemplateIt: React.FC<InsuranceNoticeTemplateItProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title="Avviso Informativo sull'Assicurazione del Mutuatario"
      subHeader={`Contratto di assicurazione collettiva n. ${data.groupPolicyNumber || '[Numero Polizza]'}`}
    >
      <div style={{...styles.section, textAlign: 'right', marginBottom: '30px' }}>
        <p>Documento emesso il: {formatDate(data.noticeDate)}</p>
        <p>Destinatario: {data.borrowerName || "[Nome dell'aderente]"}</p>
        <p>Riguardante il progetto di prestito n.: {data.contractNumber || '[Numero contratto]'}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>1. Oggetto del presente avviso</h2>
        <p>
          Il presente avviso ha lo scopo di informarla sulle condizioni, modalità, garanzie ed esclusioni del contratto di assicurazione collettiva sottoscritto da FLEXFOND con il suo partner assicurativo, al quale lei richiede l'adesione. <strong>La invitiamo a leggerlo attentamente prima di firmare la sua domanda di adesione e a conservarlo.</strong> È un elemento essenziale della sua protezione finanziaria.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>2. Garanzie del contratto</h2>
        <p>
          Fatte salve le condizioni definite nel contratto, la sua adesione la copre contro i seguenti rischi:
        </p>
        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
          {renderList(data.guarantees)}
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>3. Esclusioni principali</h2>
        <p>
          Alcune situazioni non sono coperte dal contratto. Sono in particolare escluse dalla garanzia:
        </p>
         <div style={{ padding: '15px', border: '1px solid #fee2e2', backgroundColor: '#fff7f7', borderRadius: '4px', marginTop: '15px' }}>
            {renderList(data.exclusions)}
            <p style={{marginTop: '15px', fontSize: '9pt', fontStyle: 'italic', color: '#777'}}>Questo elenco non è esaustivo. Per il dettaglio completo delle esclusioni, si prega di fare riferimento alle Condizioni Generali del contratto di assicurazione che le verranno consegnate.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>4. Formalità di adesione e questionario sanitario</h2>
        <p>
          La sua adesione è subordinata all'accettazione dell'assicuratore, che si basa in particolare sulle sue risposte al questionario sanitario. È tenuto a rispondere in modo esatto e completo a tutte le domande poste. Qualsiasi dichiarazione falsa intenzionale può comportare la nullità della sua adesione e il rifiuto della copertura di un sinistro.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>5. Procedura in caso di sinistro</h2>
        <p>
          Qualora si verifichi uno degli eventi garantiti, lei o i suoi aventi diritto dovete dichiararlo il prima possibile.
        </p>
         <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.claimProcedure || "Procedura non specificata."}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>6. Diritto di recesso</h2>
        <p>
          Dispone di un periodo di 30 giorni di calendario dalla data di firma della sua domanda di adesione per recedere, senza spese né penali, tramite lettera raccomandata сon ricevuta di ritorno.
        </p>
      </div>

      <div style={{...styles.footer, borderTop: 'none', marginTop: '30px', textAlign: 'left', fontStyle: 'italic', color: '#555'}}>
        <p>
            Il presente avviso informativo non sostituisce le Condizioni Generali e Particolari del contratto di assicurazione, che prevalgono in caso di controversia e che le saranno consegnate al momento della sua adesione definitiva.
        </p>
      </div>
    </DocumentWrapper>
  );
};
