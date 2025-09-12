
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface InsuranceCertificateDataDe {
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

interface InsuranceCertificateTemplateDeProps {
  data: InsuranceCertificateDataDe;
}

export const InsuranceCertificateTemplateDe: React.FC<InsuranceCertificateTemplateDeProps> = ({ data }) => {
  const signer = teamMembers[3]; // Juliette Lambert

  return (
    <DocumentWrapper 
        title={`Versicherungsbestätigung für ein ${data.loanType || '[Kreditart]'}`}
        subHeader="Versicherungsabteilung • Mitgliederservice • Einheit für die Zertifizierung von Kreditnehmergarantien"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Bestätigungs-Nr:</strong> {data.certNumber || '[Bestätigungsnummer]'}</p>
        <p><strong>Ausstellungsdatum:</strong> {formatDate(data.certDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Der Versicherte:</h2>
         <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Vollständiger Name:</strong> {data.insuredName || '[Name des Versicherten]'}</p>
            <p><strong>Geburtsdatum:</strong> {formatDate(data.insuredDob)}</p>
            <p><strong>Anschrift:</strong> {data.insuredAddress || '[Anschrift des Versicherten]'}</p>
            <p><strong>Ausweisnummer:</strong> {data.insuredIdNumber || '[Ausweisnummer]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Der Begünstigte:</h2>
        <p>Die Partner-Kreditinstitution von FLEXFOND, für den Kreditvertrag Nr. {data.contractNumber || '[Vertragsnummer]'}.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Zweck der Bestätigung</h2>
        <p>Wir, die Unterzeichnenden, handeln im Namen unseres Versicherungspartners und bestätigen hiermit, dass die oben genannte versicherte Person durch den von FLEXFOND im Rahmen ihres Kredits abgeschlossenen Gruppenversicherungsvertrag <strong>Nr. {data.groupPolicyNumber || '[Policennummer]'}</strong> abgesichert ist.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Details des versicherten Kredits</h2>
        <ul style={{listStyleType: 'none', paddingLeft: 0}}>
            <li><strong>Kreditart:</strong> {data.loanType || '[Kreditart]'}</li>
            <li><strong>Zugehörige Kreditnummer:</strong> {data.contractNumber || '[Vertragsnummer]'}</li>
            <li><strong>Versichertes Kapital:</strong> {formatCurrency(data.loanAmount || 0)}</li>
            <li><strong>Dauer des Versicherungsschutzes:</strong> {data.coverageDuration || 0} Monate, entsprechend der Kreditlaufzeit.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Anwendbare Garantien</h2>
        <p>Vorbehaltlich der Bestimmungen, Bedingungen und Ausschlüsse, die in der Ihnen ausgehändigten Informationsbroschüre zum Versicherungsvertrag aufgeführt sind, profitiert der Versicherte von den folgenden Garantien:</p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Tod:</strong> Zahlung des Restkapitals an die Kreditinstitution.</li>
            <li><strong>Totaler und unwiderruflicher Autonomieverlust (PTIA):</strong> Zahlung des Restkapitals an die Kreditinstitution.</li>
            <li><strong>Vollständige vorübergehende Arbeitsunfähigkeit (ITT):</strong> Übernahme der Kreditraten nach einer Karenzzeit.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Versicherungskosten</h2>
        <p><strong>Monatliche Versicherungsprämie:</strong> {formatCurrency(data.monthlyPremium || 0)} / Monat. Dieser Betrag ist monatlich zusätzlich zu Ihrer Kreditrate zu zahlen.</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Wirksamkeitsdatum und Gültigkeit</h2>
        <p>Diese Bestätigung wird zur Vorlage bei Bedarf ausgestellt. Die Garantien treten am Tag der Auszahlung der Kreditmittel in Kraft und enden mit der vollständigen Rückzahlung des Kredits.</p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '50px'}}>
        <div style={{...styles.signatureBox, width: '50%'}}>
            <p style={{marginBottom: '20px'}}>Ausgestellt in Paris, am {formatDate(data.certDate)}</p>
            <img src={signer.signatureUrl} alt={`Unterschrift von ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
            <div style={styles.signatureLine}></div>
            <p>Für FLEXFOND,</p>
            <p>{signer.name},<br/>{signer.role}</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
