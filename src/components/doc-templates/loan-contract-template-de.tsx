
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface LoanContractDataDe {
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

interface LoanContractTemplateDeProps {
  data: LoanContractDataDe;
}

export const LoanContractTemplateDe: React.FC<LoanContractTemplateDeProps> = ({ data }) => {
    const signer = teamMembers[1]; // Isabelle Dubois
  return (
    <DocumentWrapper 
        title={`${data.loanType || '[Kreditart]'}vertrag`}
        subHeader="Europäischer Finanzdienst • Abteilung für Verbraucherkredite • Büro für Kreditvereinbarungen • Einheit zur Überprüfung von Verpflichtungen"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Vertrag Nr.:</strong> {data.contractNumber || '[Vertragsnummer]'}</p>
            <p><strong>Abgeschlossen in Paris, am</strong> {formatDate(data.contractDate)}</p>
        </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Zwischen den Unterzeichnenden:</h2>
        <p><strong style={styles.label}>Der Kreditgeber:</strong> FLEXFOND, eine Vermittlungsgesellschaft mit Sitz in 123 Rue de la Finance, 75001 Paris, nachstehend "Der Kreditgeber" genannt.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>Der Kreditnehmer:</strong> {data.borrowerName || '[Name des Kreditnehmers]'}</p>
            <p>Wohnhaft in {data.borrowerAddress || '[Anschrift des Kreditnehmers]'}</p>
            <p>Ausweisnummer: {data.borrowerIdNumber || '[Ausweisnummer]'}</p>
            <p>nachstehend "Der Kreditnehmer" genannt.</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 1: Vertragsgegenstand</h2>
        <p>Der Kreditgeber gewährt dem Kreditnehmer, der dies annimmt, ein tilgbares {data.loanType || '[Kreditart]'} zur nicht-gewerblichen Nutzung, das den Bestimmungen des Verbrauchergesetzbuchs sowie diesen allgemeinen und besonderen Bedingungen unterliegt.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 2: Kreditbetrag und Merkmale</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px'}}>
            <p><strong style={styles.label}>Nettokreditbetrag:</strong><br/>{formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Betrag in Worten]'} Euro).</p>
            <p><strong style={styles.label}>Fester effektiver Jahreszins:</strong><br/>{data.interestRate || 0}%.</p>
            <p><strong style={styles.label}>Gesamtlaufzeit der Rückzahlung:</strong><br/>{data.loanTerm || 0} Monate.</p>
            <p><strong style={styles.label}>Datum der Mittelbereitstellung:</strong><br/>Spätestens 8 Tage nach Ablauf der Widerrufsfrist.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 3: Rückzahlungsmodalitäten</h2>
        <p>Der Kreditnehmer verpflichtet sich, das Kapital und die Zinsen in {data.loanTerm || 0} gleichbleibenden monatlichen Raten zurückzuzahlen. Die erste Rate wird am {formatDate(data.repaymentStartDate)} und die letzte am {formatDate(data.repaymentEndDate)} fällig.</p>
        <p style={{marginTop: '10px'}}><strong style={styles.label}>Monatliche Rate (ohne Versicherung):</strong> {formatCurrency(data.monthlyPayment || 0)}. Dieser Betrag wird am 5. jedes Monats abgebucht.</p>
        <p><strong style={styles.label}>Gesamtkosten des Kredits (Zinsen):</strong> {formatCurrency(data.totalCreditCost || 0)}</p>
        <p><strong style={styles.label}>Gesamtbetrag:</strong> {formatCurrency(data.totalAmountDue || 0)} (Geliehenes Kapital + Gesamtkosten der Zinsen).</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 4: Widerrufsrecht</h2>
        <p>Der Kreditnehmer hat eine Widerrufsfrist von vierzehn (14) Kalendertagen ab dem Datum der Unterzeichnung des Kreditvertragsangebots. Um zu widerrufen, muss der Kreditnehmer das dem Angebot beigefügte Widerrufsformular per Einschreiben mit Rückschein zurücksenden.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 5: Zahlungsverzug</h2>
        <p>Bei Nichtzahlung einer Rate zum Fälligkeitsdatum kann der Kreditgeber die sofortige Rückzahlung des ausstehenden Kapitals zuzüglich der aufgelaufenen und unbezahlten Zinsen verlangen. Verzugszinsen können gemäß der geltenden Gesetzgebung erhoben werden.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 6: Obligatorische Kreditnehmerversicherung</h2>
        <p>Die Gewährung dieses Kredits ist an den vorherigen Abschluss einer Versicherung durch den Kreditnehmer gebunden, die die Risiken Tod, Totaler und unwiderruflicher Autonomieverlust (PTIA) und Arbeitsunfähigkeit (IT) abdeckt. Der Kreditnehmer bestätigt, die Bedingungen dieser Versicherung erhalten, gelesen und akzeptiert zu haben, die Gegenstand einer separaten Versicherungsbescheinigung sind, die von FLEXFOND oder seinen Versicherungspartnern vor Unterzeichnung dieses Vertrags bereitgestellt wird.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 7: Datenschutz</h2>
        <p>Die erhobenen Daten sind für die Bearbeitung des Kreditantrags erforderlich. Sie werden elektronisch verarbeitet und sind für die Abteilungen des Kreditgebers und seiner Partner bestimmt. Gemäß der DSGVO hat der Kreditnehmer das Recht auf Zugang, Berichtigung und Löschung seiner personenbezogenen Daten, indem er sich an den Kreditgeber unter contact@flexfond.com wendet.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 8: Anwendbares Recht und Streitigkeiten</h2>
        <p>Dieser Vertrag unterliegt dem französischen Recht. Im Falle eines Rechtsstreits verpflichten sich die Parteien, eine gütliche Einigung anzustreben. Andernfalls ist das zuständige Gericht das am Wohnsitz des Kreditnehmers.</p>
      </div>

      <div style={{ ...styles.section, textAlign: 'center', marginTop: '30px' }}>
          <p>Ausgefertigt in zwei Originalexemplaren, eines für jede Partei.</p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <img src={signer.signatureUrl} alt={`Unterschrift von ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Unterschrift des Kreditgebers (FLEXFOND)</p>
          <p>{signer.name}, {signer.role}</p>
        </div>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Unterschrift des Kreditnehmers</p>
          <p style={{fontSize: '9pt', color: '#777', fontStyle: 'italic'}}>(Mit dem Vermerk "Gelesen und genehmigt")</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
