
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface DebtAcknowledgementData {
  docNumber: string;
  docDate: string;
  debtorName: string;
  debtorAddress: string;
  debtorIdNumber: string;
  loanType: string;
  loanAmount: number;
  loanAmountInWords: string;
  loanTerm: number;
  contractNumber: string;
}

interface DebtAcknowledgementTemplateProps {
  data: DebtAcknowledgementData;
}

export const DebtAcknowledgementTemplate: React.FC<DebtAcknowledgementTemplateProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Reconnaissance de Dette pour un ${data.loanType || '[Type de prêt]'}`}
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Document N°:</strong> {data.docNumber || '[Numéro de document]'}</p>
        <p><strong>Date:</strong> {formatDate(data.docDate)}</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Entre les soussignés :</h2>
        <p><strong style={styles.label}>Le Créancier :</strong> FLEXFOND, agissant en tant qu'intermédiaire pour ses partenaires financiers, dont le siège social est situé 123 Rue de la Finance, 75001 Paris.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>Le Débiteur :</strong></p>
            <p><strong>Nom :</strong> {data.debtorName || '[Nom du débiteur]'}</p>
            <p><strong>Adresse :</strong> {data.debtorAddress || '[Adresse du débiteur]'}</p>
            <p><strong>N° Pièce d'identité :</strong> {data.debtorIdNumber || '[Numéro de pièce d\'identité]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1 : Reconnaissance de la Dette</h2>
        <p>
          Je soussigné(e), <strong>{data.debtorName || '[Nom du débiteur]'}</strong>, demeurant au {data.debtorAddress || '[Adresse du débiteur]'}, reconnais par la présente devoir à FLEXFOND, agissant au nom de ses partenaires financiers, la somme de :
        </p>
        <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Montant en lettres]'} euros)
        </p>
        <p>
          Cette somme correspond au capital d'un {data.loanType || '[Type de prêt]'} qui m'a été accordé et dont j'ai reçu les fonds.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2 : Modalités de Remboursement</h2>
        <p>
          Je m'engage à rembourser cette somme en intégralité, ainsi que les intérêts et frais associés, conformément aux échéances et conditions définies dans le contrat de {data.loanType || '[Type de prêt]'} N° <strong>{data.contractNumber || '[Numéro de contrat]'}</strong> que j'ai signé séparément. La durée de remboursement convenue est de {data.loanTerm || '[Durée du prêt]'} mois, sauf en cas de remboursement anticipé ou d'incident de paiement modifiant l'échéancier.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3 : Clause de Défaut</h2>
        <p>
          En cas de non-paiement d'une ou plusieurs échéances, je reconnais que le Créancier pourra se prévaloir des clauses prévues dans le contrat de prêt, y compris l'exigibilité anticipée de la totalité du capital restant dû.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 4 : Mention Manuscrite Obligatoire</h2>
        <p>
          L'article L. 313-24 du Code de la consommation stipule l'importance de l'engagement. Le débiteur reconnaît avoir lu et compris l'intégralité du contrat de prêt auquel cette reconnaissance de dette se rapporte.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%'}}>
          <p style={{textAlign: 'right', marginBottom: '20px'}}>Fait à Paris, le {formatDate(data.docDate)}</p>
          <div style={styles.signatureLine}></div>
          <p style={{...styles.label, textAlign: 'left'}}>Signature du Débiteur</p>
          <p style={{textAlign: 'left', fontSize: '9pt', color: '#777', fontStyle: 'italic', marginTop: '5px'}}>
            Précédée de la mention manuscrite : "Lu et approuvé, bon pour reconnaissance de dette de la somme de {data.loanAmountInWords || '[montant en toutes lettres]'} euros."
          </p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
