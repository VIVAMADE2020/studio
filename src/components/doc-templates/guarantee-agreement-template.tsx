
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface GuaranteeAgreementData {
  guarantorName: string;
  guarantorAddress: string;
  borrowerName: string;
  loanAmount: number;
  loanPurpose: string;
  agreementDate: string;
}

interface GuaranteeAgreementTemplateProps {
  data: GuaranteeAgreementData;
}

export const GuaranteeAgreementTemplate: React.FC<GuaranteeAgreementTemplateProps> = ({ data }) => {
  return (
    <DocumentWrapper title="Acte de Cautionnement Solidaire">
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Parties</h2>
        <p><strong style={styles.label}>La Caution :</strong> {data.guarantorName}, demeurant au {data.guarantorAddress}.</p>
        <p><strong style={styles.label}>Le Créancier :</strong> FLEXFOND, 123 Rue de la Finance, 75001 Paris.</p>
        <p><strong style={styles.label}>Le Débiteur (Emprunteur) :</strong> {data.borrowerName}.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Engagement de la Caution</h2>
        <p>
          Par la présente, je soussigné(e), {data.guarantorName}, déclare me porter caution solidaire du Débiteur, {data.borrowerName}, 
          pour le remboursement du prêt contracté auprès de FLEXFOND.
        </p>
        <p style={{marginTop: '15px'}}>
          Ce cautionnement porte sur le prêt d'un montant de <strong>{formatCurrency(data.loanAmount)}</strong>, 
          destiné à financer : {data.loanPurpose}.
        </p>
        <p style={{marginTop: '15px'}}>
          Je m'engage à rembourser au Créancier les sommes dues par le Débiteur en cas de défaillance de ce dernier,
          dans la limite du montant du prêt, augmenté des intérêts, frais et accessoires.
        </p>
         <p style={{marginTop: '15px'}}>
          Je reconnais avoir été informé(e) que je peux être poursuivi(e) en paiement sans que le Débiteur ne le soit au préalable.
        </p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p>Signature de la Caution</p>
          <p>(Précédée de la mention "Lu et approuvé, bon pour caution solidaire")</p>
        </div>
      </div>
      <p style={{textAlign: 'center', marginTop: '20px'}}>Fait à Paris, le {formatDate(data.agreementDate)}</p>
    </DocumentWrapper>
  );
};
