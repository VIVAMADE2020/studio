
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
    <DocumentWrapper title="Offre de Contrat de Prêt Personnel">
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Parties au Contrat</h2>
        <p><strong style={styles.label}>Le Prêteur :</strong> FLEXFOND, SAS au capital de 1 000 000 €, dont le siège est au 123 Rue de la Finance, 75001 Paris, immatriculée au RCS de Paris sous le n° 123 456 789.</p>
        <p style={{marginTop: '10px'}}><strong style={styles.label}>L'Emprunteur :</strong> {data.borrowerName || '[Nom de l\'Emprunteur]'}, demeurant au {data.borrowerAddress || '[Adresse de l\'Emprunteur]'}.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1 : Objet du Prêt</h2>
        <p>Le Prêteur consent à l'Emprunteur, qui accepte, un prêt personnel amortissable aux conditions décrites dans la présente offre. Après signature, cette offre deviendra le contrat de prêt liant les deux parties.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2 : Conditions Financières du Prêt</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px'}}>
            <p><strong style={styles.label}>Montant du capital prêté :</strong><br/>{formatCurrency(data.loanAmount || 0)}</p>
            <p><strong style={styles.label}>Taux d'intérêt nominal annuel :</strong><br/>{data.interestRate || 0}%</p>
            <p><strong style={styles.label}>Durée du prêt :</strong><br/>{data.loanTerm || 0} mois</p>
            <p><strong style={styles.label}>Montant de la mensualité (hors assurance) :</strong><br/>{formatCurrency(data.monthlyPayment || 0)}</p>
        </div>
        <p style={{marginTop: '15px'}}><strong style={styles.label}>Date de la première échéance :</strong> {formatDate(data.startDate)}</p>
        <p style={{marginTop: '5px'}}><strong style={styles.label}>Coût total du crédit (hors assurance) :</strong> {formatCurrency(((data.monthlyPayment * data.loanTerm) - data.loanAmount) || 0)}</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3 : Modalités de Remboursement</h2>
        <p>L'Emprunteur s'engage à rembourser le prêt en {data.loanTerm || 0} mensualités constantes de {formatCurrency(data.monthlyPayment || 0)}, qui seront prélevées sur le compte bancaire de l'Emprunteur (IBAN à fournir) le 5 de chaque mois, à compter de la date de première échéance.</p>
         <p style={{marginTop: '10px'}}>Le remboursement anticipé, partiel ou total, est possible à tout moment et sans frais, conformément à la législation en vigueur.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 4 : Droit de Rétractation</h2>
        <p>L'Emprunteur dispose d'un délai de rétractation de 14 jours calendaires à compter de la date de signature de la présente offre, sans avoir à justifier de motifs ni à payer de pénalités.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 5 : Droit Applicable et Litiges</h2>
        <p>Le présent contrat est soumis au droit français. Tout litige relatif à son exécution sera de la compétence exclusive des tribunaux du ressort du domicile de l'Emprunteur.</p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Signature du Prêteur (FLEXFOND)</p>
        </div>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Signature de l'Emprunteur</p>
          <p style={{fontSize: '9pt', color: '#777', fontStyle: 'italic'}}>(Précédée de la mention "Lu et approuvé")</p>
        </div>
      </div>
      <p style={{textAlign: 'center', marginTop: '20px'}}>Fait en deux exemplaires originaux, à Paris, le {formatDate(data.contractDate)}</p>
    </DocumentWrapper>
  );
};
