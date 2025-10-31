
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface DebtAcknowledgementDataDe {
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

interface DebtAcknowledgementTemplateDeProps {
  data: DebtAcknowledgementDataDe;
}

export const DebtAcknowledgementTemplateDe: React.FC<DebtAcknowledgementTemplateDeProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Schuldanerkenntnis für ein ${data.loanType || '[Kreditart]'}`}
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Dokument Nr.:</strong> {data.docNumber || '[Dokumentennummer]'}</p>
        <p><strong>Datum:</strong> {formatDate(data.docDate)}</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Zwischen den Unterzeichnenden:</h2>
        <p><strong style={styles.label}>Der Gläubiger:</strong> VylsCapital, handelnd als Vermittler für seine Finanzpartner, mit Sitz in 123 Rue de la Finance, 75001 Paris.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>Der Schuldner:</strong></p>
            <p><strong>Name:</strong> {data.debtorName || '[Name des Schuldners]'}</p>
            <p><strong>Anschrift:</strong> {data.debtorAddress || '[Anschrift des Schuldners]'}</p>
            <p><strong>Ausweisnummer:</strong> {data.debtorIdNumber || '[Ausweisnummer]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 1: Schuldanerkenntnis</h2>
        <p>
          Ich, der Unterzeichnende, <strong>{data.debtorName || '[Name des Schuldners]'}</strong>, wohnhaft in {data.debtorAddress || '[Anschrift des Schuldners]'}, erkenne hiermit an, VylsCapital, handelnd im Namen seiner Finanzpartner, die Summe von:
        </p>
        <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Betrag in Worten]'} Euro)
        </p>
        <p>
          zu schulden. Diese Summe entspricht dem Kapital eines {data.loanType || '[Kreditart]'}, das mir gewährt wurde und dessen Mittel ich erhalten habe.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 2: Rückzahlungsmodalitäten</h2>
        <p>
          Ich verpflichte mich, diesen Betrag vollständig sowie die damit verbundenen Zinsen und Gebühren gemäß dem Zeitplan und den Bedingungen zurückzuzahlen, die im {data.loanType || '[Kreditart]'}vertrag Nr. <strong>{data.contractNumber || '[Vertragsnummer]'}</strong> festgelegt sind, den ich separat unterzeichnet habe. Die vereinbarte Rückzahlungsfrist beträgt {data.loanTerm || '[Laufzeit]'} Monate, außer im Falle einer vorzeitigen Rückzahlung oder eines Zahlungsereignisses, das den Zeitplan ändert.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 3: Verzugsklausel</h2>
        <p>
          Im Falle der Nichtzahlung einer oder mehrerer Raten erkenne ich an, dass der Gläubiger die im Kreditvertrag vorgesehenen Klauseln geltend machen kann, einschließlich der vorzeitigen Fälligstellung des gesamten ausstehenden Kapitals.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 4: Obligatorischer handschriftlicher Vermerk</h2>
        <p>
          Artikel L. 313-24 des Verbrauchergesetzbuchs betont die Wichtigkeit der Verpflichtung. Der Schuldner bestätigt, den gesamten Kreditvertrag, auf den sich dieses Schuldanerkenntnis bezieht, gelesen und verstanden zu haben.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%'}}>
          <p style={{textAlign: 'right', marginBottom: '20px'}}>Ausgestellt in Paris, am {formatDate(data.docDate)}</p>
          <div style={styles.signatureLine}></div>
          <p style={{...styles.label, textAlign: 'left'}}>Unterschrift des Schuldners</p>
          <p style={{textAlign: 'left', fontSize: '9pt', color: '#777', fontStyle: 'italic', marginTop: '5px'}}>
            Mit dem handschriftlichen Vermerk: "Gelesen und genehmigt, gut für Schuldanerkenntnis über die Summe von {data.loanAmountInWords || '[Betrag in Worten]'} Euro."
          </p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
