
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface GuaranteeAgreementDataDe {
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

interface GuaranteeAgreementTemplateDeProps {
  data: GuaranteeAgreementDataDe;
}

export const GuaranteeAgreementTemplateDe: React.FC<GuaranteeAgreementTemplateDeProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Selbstschuldnerische Bürgschaft für ein ${data.loanType || '[Kreditart]'}`}
      subHeader="Rechts- und Garantieabteilung • Abteilung für Verbindlichkeiten • Einheit für die Formalisierung von Garantien"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Urkunde Nr.:</strong> {data.actNumber || '[Urkundennummer]'}</p>
        <p><strong>Datum:</strong> {formatDate(data.actDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Zwischen den Unterzeichnenden:</h2>
        <p><strong style={styles.label}>Der Gläubiger:</strong> FLEXFOND, handelnd als Vermittler für seine Finanzpartner, mit Sitz in 123 Rue de la Finance, 75001 Paris.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>Der Schuldner (Kreditnehmer):</strong></p>
            <p><strong>Name:</strong> {data.borrowerName || '[Name des Kreditnehmers]'}</p>
            <p><strong>Anschrift:</strong> {data.borrowerAddress || '[Anschrift des Kreditnehmers]'}</p>
            <p><strong>Ausweisnummer:</strong> {data.borrowerIdNumber || '[Ausweisnummer]'}</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 1: Gegenstand der Verpflichtung</h2>
        <p>
            Mit dieser Urkunde verpflichtet sich der Schuldner, dem Gläubiger die im Rahmen des nachstehend genannten {data.loanType || '[Kreditart]'}vertrags geschuldeten Beträge zu zahlen:
        </p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Kreditvertragsnummer:</strong> {data.contractNumber || '[Vertragsnummer]'}</li>
            <li><strong>Kapitalbetrag:</strong> {formatCurrency(data.loanAmount || 0)} (in Worten: {data.loanAmountInWords || '[Betrag in Worten]'} Euro).</li>
            <li><strong>Kreditlaufzeit:</strong> {data.loanTerm || 0} Monate.</li>
        </ul>
        <p style={{marginTop: '10px'}}>Der Schuldner erklärt, über die Art und den Umfang seiner Verpflichtungen vollständig informiert zu sein.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 2: Umfang der Bürgschaft</h2>
        <p>
          Die Verpflichtung des Schuldners erstreckt sich auf die Zahlung des Kapitals, der Zinsen, Provisionen, Gebühren und Nebenkosten sowie allgemein aller Beträge, die im Rahmen des vorgenannten Kreditvertrags geschuldet werden könnten. Die Verpflichtung wird für die gesamte Laufzeit des Kredits eingegangen.
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 3: Gesamtschuldnerische Haftung und Unteilbarkeit</h2>
        <p>
          Der Schuldner haftet allein für die Schuld. Im Falle eines Verzugs kann der Gläubiger die gesamte Schuld vom Schuldner einfordern.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 4: Obligatorischer handschriftlicher Vermerk</h2>
        <p>
            Der Schuldner muss den folgenden Vermerk gemäß dem Gesetz handschriftlich niederschreiben: "Ich, {data.borrowerName || '[Name des Kreditnehmers]'}, verpflichte mich, dem Kreditgeber die geschuldeten Beträge aus meinen Einkünften und meinem Vermögen zurückzuzahlen."
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 5: Informationspflicht</h2>
        <p>
            Der Gläubiger verpflichtet sich, den Schuldner über jede Vertragsänderung zu informieren.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%', textAlign: 'center'}}>
            <p>Ausgestellt in Paris, am {formatDate(data.actDate)}</p>
            <div style={{...styles.signatureLine, marginTop: '40px'}}></div>
            <p style={{...styles.label, textAlign: 'center'}}>Unterschrift des Schuldners</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
