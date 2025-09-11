
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
        <h2 style={styles.sectionTitle}>Parties au contrat</h2>
        <p><strong style={styles.label}>La Caution :</strong> {data.guarantorName || '[Nom de la Caution]'}, demeurant au {data.guarantorAddress || '[Adresse de la Caution]'}.</p>
        <p><strong style={styles.label}>Le Créancier :</strong> FLEXFOND, 123 Rue de la Finance, 75001 Paris.</p>
        <p><strong style={styles.label}>Le Débiteur (Emprunteur) :</strong> {data.borrowerName || '[Nom de l\'Emprunteur]'}.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1 : Objet de l'engagement</h2>
        <p>
          Par la présente, je soussigné(e), {data.guarantorName}, déclare me porter caution solidaire du Débiteur, {data.borrowerName}, 
          pour le remboursement du prêt qui lui a été consenti par le Créancier.
        </p>
        <p style={{marginTop: '15px'}}>
          Ce cautionnement porte sur les obligations résultant du contrat de prêt n°[Numéro de contrat] pour un montant principal de <strong>{formatCurrency(data.loanAmount || 0)}</strong>, 
          destiné à financer : {data.loanPurpose || '[Objet du prêt]'}.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2 : Étendue de la garantie</h2>
        <p>
          Je m'engage à payer au Créancier, sur simple demande de sa part et en cas de défaillance du Débiteur, toutes les sommes dues par ce dernier en principal, intérêts, commissions, frais et accessoires.
        </p>
         <p style={{marginTop: '15px', fontWeight: 'bold'}}>
          En me portant caution solidaire, je renonce expressément au bénéfice de discussion (qui m'autoriserait à exiger que le Créancier poursuive d'abord le Débiteur) et au bénéfice de division (si plusieurs cautions existent). Je reconnais avoir été informé(e) que je peux être poursuivi(e) en paiement pour la totalité de la dette sans que le Débiteur ne le soit au préalable.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%'}}>
             <p style={{textAlign: 'right', marginBottom: '20px'}}>Fait à Paris, le {formatDate(data.agreementDate)}</p>
            <div style={styles.signatureLine}></div>
            <p style={{...styles.label, textAlign: 'left'}}>Signature de la Caution</p>
            <p style={{textAlign: 'left', fontSize: '9pt', color: '#777', fontStyle: 'italic', marginTop: '5px'}}>
                (Précédée de la mention manuscrite obligatoire et de la signature)
            </p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
