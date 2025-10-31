
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';

export interface InsuranceNoticeDataDe {
  noticeDate: string;
  borrowerName: string;
  contractNumber: string;
  groupPolicyNumber: string;
  guarantees: string;
  exclusions: string;
  claimProcedure: string;
}

interface InsuranceNoticeTemplateDeProps {
  data: InsuranceNoticeDataDe;
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

export const InsuranceNoticeTemplateDe: React.FC<InsuranceNoticeTemplateDeProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title="Informationsblatt zur Kreditnehmerversicherung"
      subHeader={`Gruppenversicherungsvertrag Nr. ${data.groupPolicyNumber || '[Policennummer]'}`}
    >
      <div style={{...styles.section, textAlign: 'right', marginBottom: '30px' }}>
        <p>Dokument ausgestellt am: {formatDate(data.noticeDate)}</p>
        <p>Empfänger: {data.borrowerName || '[Name des Mitglieds]'}</p>
        <p>Betreffend Kreditprojekt Nr.: {data.contractNumber || '[Vertragsnummer]'}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>1. Zweck dieses Informationsblattes</h2>
        <p>
          Dieses Informationsblatt soll Sie über die Bedingungen, Modalitäten, Garantien und Ausschlüsse des von VylsCapital bei seinem Versicherungspartner abgeschlossenen Gruppenversicherungsvertrags informieren, dem Sie beitreten möchten. <strong>Wir bitten Sie, es vor der Unterzeichnung Ihres Beitrittsantrags sorgfältig zu lesen und aufzubewahren.</strong> Es ist ein wesentliches Element Ihres finanziellen Schutzes.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>2. Vertragsgarantien</h2>
        <p>
          Vorbehaltlich der im Vertrag festgelegten Bedingungen deckt Ihre Mitgliedschaft Sie gegen die folgenden Risiken ab:
        </p>
        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
          {renderList(data.guarantees)}
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>3. Hauptausschlüsse</h2>
        <p>
          Bestimmte Situationen sind nicht durch den Vertrag gedeckt. Von der Garantie ausgeschlossen sind insbesondere:
        </p>
         <div style={{ padding: '15px', border: '1px solid #fee2e2', backgroundColor: '#fff7f7', borderRadius: '4px', marginTop: '15px' }}>
            {renderList(data.exclusions)}
            <p style={{marginTop: '15px', fontSize: '9pt', fontStyle: 'italic', color: '#777'}}>Diese Liste ist nicht erschöpfend. Für eine vollständige Aufzählung der Ausschlüsse verweisen wir auf die Allgemeinen Versicherungsbedingungen, die Ihnen ausgehändigt werden.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>4. Beitrittsformalitäten und Gesundheitsfragebogen</h2>
        <p>
          Ihr Beitritt unterliegt der Annahme durch den Versicherer, die sich insbesondere auf Ihre Antworten im Gesundheitsfragebogen stützt. Sie sind verpflichtet, alle gestellten Fragen genau und vollständig zu beantworten. Jede vorsätzlich falsche Angabe kann zur Nichtigkeit Ihres Beitritts und zur Verweigerung der Deckung im Schadensfall führen.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>5. Verfahren im Schadensfall</h2>
        <p>
          Tritt eines der versicherten Ereignisse ein, müssen Sie oder Ihre Anspruchsberechtigten dies so schnell wie möglich melden.
        </p>
         <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.claimProcedure || "Verfahren nicht angegeben."}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>6. Widerrufsrecht</h2>
        <p>
          Sie haben das Recht, binnen 30 Kalendertagen ab dem Datum der Unterzeichnung Ihres Beitrittsantrags ohne Angabe von Gründen diesen Vertrag zu widerrufen. Der Widerruf muss per Einschreiben mit Rückschein erfolgen und ist für Sie kostenlos und ohne Vertragsstrafe.
        </p>
      </div>

      <div style={{...styles.footer, borderTop: 'none', marginTop: '30px', textAlign: 'left', fontStyle: 'italic', color: '#555'}}>
        <p>
            Dieses Informationsblatt ersetzt nicht die Allgemeinen und Besonderen Bedingungen des Versicherungsvertrags, die im Streitfall Vorrang haben und Ihnen bei Ihrem endgültigen Beitritt ausgehändigt werden.
        </p>
      </div>
    </DocumentWrapper>
  );
};
