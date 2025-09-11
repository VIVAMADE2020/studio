
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
    <DocumentWrapper title="Contrat de Prêt">
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Parties au Contrat</h2>
        <p><strong>Le Prêteur :</strong> FLEXFOND, 123 Rue de la Finance, 75001 Paris</p>
        <p><strong>L'Emprunteur :</strong> {data.borrowerName}, {data.borrowerAddress}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1 : Objet du Prêt</h2>
        <p>Le Prêteur accorde à l'Emprunteur un prêt d'un montant de <strong>{formatCurrency(data.loanAmount)}</strong>.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2 : Conditions du Prêt</h2>
        <p><strong style={styles.label}>Taux d'intérêt annuel :</strong> {data.interestRate}%</p>
        <p><strong style={styles.label}>Durée du prêt :</strong> {data.loanTerm} mois</p>
        <p><strong style={styles.label}>Mensualité :</strong> {formatCurrency(data.monthlyPayment)}</p>
        <p><strong style={styles.label}>Date de début du remboursement :</strong> {formatDate(data.startDate)}</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3 : Modalités de Remboursement</h2>
        <p>L'Emprunteur s'engage à rembourser le prêt en {data.loanTerm} mensualités de {formatCurrency(data.monthlyPayment)}, prélevées le 5 de chaque mois à partir de la date de début.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 4 : Droit Applicable</h2>
        <p>Le présent contrat est soumis au droit français.</p>
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
      <p style={{textAlign: 'center', marginTop: '20px'}}>Fait à Paris, le {formatDate(data.contractDate)}</p>
    </DocumentWrapper>
  );
};
