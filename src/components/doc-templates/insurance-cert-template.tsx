
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';

export interface InsuranceCertificateData {
  policyholderName: string;
  policyholderAddress: string;
  policyNumber: string;
  effectiveDate: string;
  expirationDate: string;
  coverageDetails: string;
  certDate: string;
}

interface InsuranceCertificateTemplateProps {
  data: InsuranceCertificateData;
}

export const InsuranceCertificateTemplate: React.FC<InsuranceCertificateTemplateProps> = ({ data }) => {
  return (
    <DocumentWrapper title="Attestation d'Assurance">
      <div style={styles.section}>
        <p>FLEXFOND, agissant en qualité de gestionnaire, atteste que la personne désignée ci-dessous est couverte par un contrat d'assurance emprunteur.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Informations sur l'Assuré</h2>
        <p><strong style={styles.label}>Nom :</strong> {data.policyholderName}</p>
        <p><strong style={styles.label}>Adresse :</strong> {data.policyholderAddress}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Détails de la Police d'Assurance</h2>
        <p><strong style={styles.label}>Numéro de police :</strong> {data.policyNumber}</p>
        <p><strong style={styles.label}>Date d'effet :</strong> {formatDate(data.effectiveDate)}</p>
        <p><strong style={styles.label}>Date d'expiration :</strong> {formatDate(data.expirationDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Détails de la Couverture</h2>
        <p>{data.coverageDetails}</p>
      </div>
      
      <div style={{...styles.section, marginTop: '40px'}}>
        <p>Cette attestation est délivrée pour valoir ce que de droit et ne saurait engager FLEXFOND au-delà des termes et limites du contrat d'assurance susmentionné.</p>
        <p style={{marginTop: '20px'}}>Fait à Paris, le {formatDate(data.certDate)}</p>
        <div style={{marginTop: '60px', width: '50%'}}>
            <div style={styles.signatureLine}></div>
            <p>Pour FLEXFOND</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
