
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
    <DocumentWrapper title="Attestation d'Assurance Emprunteur">
      <div style={styles.section}>
        <p>FLEXFOND, agissant en qualité de gestionnaire et bénéficiaire du contrat d'assurance groupe n°[Numéro du contrat groupe], souscrit auprès de [Nom de la compagnie d'assurance], atteste par la présente que la personne désignée ci-dessous est couverte au titre du prêt auquel cette assurance est adossée.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Informations sur l'Assuré</h2>
        <p><strong style={styles.label}>Nom et Prénom :</strong> {data.policyholderName || '[Nom de l\'Assuré]'}</p>
        <p><strong style={styles.label}>Adresse :</strong> {data.policyholderAddress || '[Adresse de l\'Assuré]'}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Détails de la Police d'Assurance</h2>
        <p><strong style={styles.label}>Numéro d'adhésion individuel :</strong> {data.policyNumber || '[Numéro de police]'}</p>
        <p><strong style={styles.label}>Date d'effet de l'adhésion :</strong> {formatDate(data.effectiveDate)}</p>
        <p><strong style={styles.label}>Date d'expiration (fin du prêt) :</strong> {formatDate(data.expirationDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Garanties Souscrites</h2>
        <p>L'assuré bénéficie des garanties suivantes, conformément aux conditions générales et particulières du contrat d'assurance groupe :</p>
        <div style={{whiteSpace: 'pre-wrap', marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px'}}>
          {data.coverageDetails || 'Aucun détail de couverture fourni.'}
        </div>
      </div>
      
      <div style={{...styles.section, marginTop: '40px'}}>
        <p>Cette attestation est délivrée pour valoir ce que de droit et ne saurait engager FLEXFOND ou l'assureur au-delà des termes, limites et exclusions du contrat d'assurance susmentionné.</p>
        <p style={{marginTop: '20px'}}>Fait à Paris, le {formatDate(data.certDate)}</p>
        <div style={{marginTop: '60px', width: '50%'}}>
            <div style={styles.signatureLine}></div>
            <p>Pour FLEXFOND</p>
            <p>Le service des assurances</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
