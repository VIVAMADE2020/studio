
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface GuaranteeAgreementData {
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

interface GuaranteeAgreementTemplateProps {
  data: GuaranteeAgreementData;
}

export const GuaranteeAgreementTemplate: React.FC<GuaranteeAgreementTemplateProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Acte de Cautionnement Solidaire pour un ${data.loanType || '[Type de Prêt]'}`}
      subHeader="Service Juridique et des Garanties • Département des Engagements • Unité de Formalisation des Garanties"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Acte N°:</strong> {data.actNumber || '[Numéro d\'acte]'}</p>
        <p><strong>Date:</strong> {formatDate(data.actDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Entre les soussignés :</h2>
        <p><strong style={styles.label}>Le Créancier :</strong> VylsCapital, agissant en tant qu'intermédiaire pour ses partenaires financiers, dont le siège social est situé 123 Rue de la Finance, 75001 Paris.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>Le Débiteur (Emprunteur) :</strong></p>
            <p><strong>Nom :</strong> {data.borrowerName || '[Nom de l\'emprunteur]'}</p>
            <p><strong>Adresse :</strong> {data.borrowerAddress || '[Adresse de l\'emprunteur]'}</p>
            <p><strong>N° Pièce d'identité :</strong> {data.borrowerIdNumber || '[Numéro de pièce d\'identité]'}</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1 : Objet de l'engagement</h2>
        <p>
            Par le présent acte, le Débiteur s'engage à régler au Créancier les sommes dues au titre du contrat de {data.loanType || '[Type de prêt]'} référencé ci-dessous :
        </p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Numéro du contrat de prêt :</strong> {data.contractNumber || '[Numéro de contrat]'}</li>
            <li><strong>Montant du capital :</strong> {formatCurrency(data.loanAmount || 0)} (en lettres : {data.loanAmountInWords || '[Montant en lettres]'} euros).</li>
            <li><strong>Durée du prêt :</strong> {data.loanTerm || 0} mois.</li>
        </ul>
        <p style={{marginTop: '10px'}}>Le Débiteur déclare avoir une parfaite connaissance de la nature et de l'étendue de ses obligations.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2 : Étendue de la garantie</h2>
        <p>
          L'engagement du Débiteur porte sur le paiement du principal, des intérêts, des commissions, des frais et accessoires, et de manière générale, de toutes les sommes qui pourraient être dues au titre du contrat de prêt susmentionné. L'engagement est consenti pour la durée totale du prêt.
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3 : Solidarité et Indivisibilité</h2>
        <p>
          Le Débiteur est seul responsable de la dette. En cas de défaillance, le Créancier pourra réclamer la totalité de la dette au Débiteur.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 4 : Mention Manuscrite Obligatoire</h2>
        <p>
            Le Débiteur doit recopier de sa main la mention suivante, conformément à la loi : "Je, {data.borrowerName || '[Nom de l\'emprunteur]'}, m'engage à rembourser au prêteur les sommes dues sur mes revenus et mes biens."
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 5 : Informations dues</h2>
        <p>
            Le Créancier s'engage à informer le Débiteur de toute modification du contrat.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%', textAlign: 'center'}}>
            <p>Fait à Paris, le {formatDate(data.actDate)}</p>
            <div style={{...styles.signatureLine, marginTop: '40px'}}></div>
            <p style={{...styles.label, textAlign: 'center'}}>Signature du Débiteur</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
