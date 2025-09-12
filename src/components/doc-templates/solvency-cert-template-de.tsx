
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface SolvencyCertificateDataDe {
  clientName: string;
  clientAddress: string;
  clientIdNumber: string;
  accountNumber: string;
  balance: number;
  certDate: string;
}

interface SolvencyCertificateTemplateDeProps {
  data: SolvencyCertificateDataDe;
}

export const SolvencyCertificateTemplateDe: React.FC<SolvencyCertificateTemplateDeProps> = ({ data }) => {
    const expirationDate = new Date(data.certDate || new Date());
    expirationDate.setDate(expirationDate.getDate() + 30);
    const signer = teamMembers[4]; // David Moreau
    
  return (
    <DocumentWrapper 
        title="Vorläufiges Bonitätszertifikat"
        subHeader="Abteilung für Finanzanalyse • Einheit für Bonitätszertifizierung"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Zertifikat Nr.:</strong> {`CS-${data.accountNumber || 'XXXX'}`}</p>
            <p><strong>Gültig bis:</strong> {formatDate(expirationDate.toISOString())}</p>
        </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Zertifikatsempfänger:</h2>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Name:</strong> {data.clientName || '[Name des Empfängers]'}</p>
            <p><strong>Ausweisnummer:</strong> {data.clientIdNumber || '[Ausweisnummer]'}</p>
            <p><strong>Anschrift:</strong> {data.clientAddress || '[Anschrift des Empfängers]'}</p>
            <p><strong>Inhaber des FLEXFOND-Kontos Nr.:</strong> {data.accountNumber || '[Kontonummer]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 1: Zweck des Zertifikats</h2>
        <p>
          FLEXFOND, als Finanzintermediär handelnd, bestätigt hiermit, eine gründliche Analyse der finanziellen Situation des oben genannten Empfängers durchgeführt zu haben. Basierend auf den vorgelegten Unterlagen und durchgeführten Überprüfungen wird der Empfänger für eine Finanzierung bis zu einem maximalen Betrag von:
        </p>
         <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.balance || 0)}
        </p>
         <p>
          als förderfähig erachtet. Dieser Betrag wurde für ein nicht spezifiziertes Projekt festgelegt und kann als Nachweis der Finanzierungsfähigkeit in vorbereitenden Schritten (z. B. Unterzeichnung eines Vorverkaufsvertrags, Geschäftsverhandlungen) verwendet werden.
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 2: Umfang und Abschluss</h2>
        <p>
          Dieses Zertifikat bestätigt die Vorabgenehmigung Ihrer Finanzierungsakte durch FLEXFOND und ist ein wesentliches Dokument im Prozess der Kreditvergabe. Es bezeugt die erfolgreiche Analyse Ihrer Bonität.
        </p>
        <p>
          Der letzte Schritt zur Auszahlung der Mittel ist die Unterzeichnung des <strong>offiziellen Kreditvertrags</strong>, der alle Bedingungen und den Tilgungsplan formalisiert. FLEXFOND verpflichtet sich, Sie bei diesem letzten Schritt zu begleiten.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artikel 3: Gültigkeit</h2>
        <p>
          Dieses Zertifikat ist 30 Kalendertage ab Ausstellungsdatum gültig, d.h. bis zum {formatDate(expirationDate.toISOString())}. Dieser Zeitraum gewährleistet die Relevanz der analysierten Bedingungen. Nach Ablauf dieser Frist ist eine einfache Aktualisierung erforderlich, um Ihre fortgesetzte Förderfähigkeit zu bestätigen.
        </p>
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
