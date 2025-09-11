
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface LoanContractData {
  borrowerName: string;
  borrowerAddress: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  startDate: string;
  contractDate: string;
}

interface LoanContractTemplateProps {
  data: LoanContractData;
}

export const LoanContractTemplate: React.FC<LoanContractTemplateProps> = ({ data }) => {
  return (
    <DocumentWrapper title="Offre de Contrat de Prêt">
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Parties au Contrat</h2>
        <p><strong style={styles.label}>Le Prêteur :</strong> FLEXFOND, SAS au capital de 1 000 000 €, dont le siège est au 123 Rue de la Finance, 75001 Paris, immatriculée au RCS de Paris sous le n° 123 456 789.</p>
        <p><strong style={styles.label}>L'Emprunteur :</strong> {data.borrowerName}, demeurant au {data.borrowerAddress}.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1 : Objet du Prêt</h2>
        <p>Le Prêteur accorde à l'Emprunteur, qui accepte, un prêt personnel amortissable aux conditions décrites ci-après.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2 : Conditions Financières du Prêt</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            <p><strong style={styles.label}>Montant du capital prêté :</strong><br/>{formatCurrency(data.loanAmount || 0)}</p>
            <p><strong style={styles.label}>Taux d'intérêt nominal annuel :</strong><br/>{data.interestRate || 0}%</p>
            <p><strong style={styles.label}>Durée du prêt :</strong><br/>{data.loanTerm || 0} mois</p>
            <p><strong style={styles.label}>Montant de la mensualité :</strong><br/>{formatCurrency(data.monthlyPayment || 0)}</p>
        </div>
        <p style={{marginTop: '15px'}}><strong style={styles.label}>Date de la première échéance :</strong> {formatDate(data.startDate)}</p>
        <p style={{marginTop: '5px'}}><strong style={styles.label}>Coût total du crédit (hors assurance) :</strong> {formatCurrency(((data.monthlyPayment * data.loanTerm) - data.loanAmount) || 0)}</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3 : Modalités de Remboursement</h2>
        <p>L'Emprunteur s'engage à rembourser le prêt en {data.loanTerm || 0} mensualités de {formatCurrency(data.monthlyPayment || 0)}, prélevées sur le compte bancaire de l'Emprunteur le 5 de chaque mois, à compter de la date de première échéance.</p>
         <p style={{marginTop: '10px'}}>Le remboursement anticipé, partiel ou total, est possible conformément à la législation en vigueur.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 4 : Droit Applicable et Litiges</h2>
        <p>Le présent contrat est soumis au droit français. Tout litige relatif à son exécution sera de la compétence exclusive des tribunaux de Paris.</p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p>Signature du Prêteur (FLEXFOND)</p>
        </div>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p>Signature de l'Emprunteur</p>
          <p>(Précédée de la mention "Lu et approuvé")</p>
        </div>
      </div>
      <p style={{textAlign: 'center', marginTop: '20px'}}>Fait en deux exemplaires originaux, à Paris, le {formatDate(data.contractDate)}</p>
    </DocumentWrapper>
  );
};
