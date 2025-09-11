
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface DebtAcknowledgementData {
  debtorName: string;
  debtorAddress: string;
  creditorName: string;
  debtAmount: number;
  repaymentTerms: string;
  ackDate: string;
}

interface DebtAcknowledgementTemplateProps {
  data: DebtAcknowledgementData;
}

export const DebtAcknowledgementTemplate: React.FC<DebtAcknowledgementTemplateProps> = ({ data }) => {
  return (
    <DocumentWrapper title="Reconnaissance de Dette">
      <div style={styles.section}>
        <p>Je soussigné(e),</p>
        <div style={{ margin: '15px 0', padding: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>{data.debtorName || '[Nom du Débiteur]'}</strong></p>
            <p style={{color: '#555'}}>Demeurant au {data.debtorAddress || '[Adresse du Débiteur]'}</p>
        </div>
        <p>
          reconnais par la présente devoir à <strong>{data.creditorName || 'FLEXFOND'}</strong> (ci-après "le Créancier"), la somme de :
        </p>
        <p style={{ fontSize: '18pt', fontWeight: 'bold', textAlign: 'center', margin: '30px 0', color: '#333' }}>
          {formatCurrency(data.debtAmount || 0)}
        </p>
        <p>
          Cette somme correspond au capital dû au titre d'un accord de financement entre les parties, pour lequel un échéancier de paiement a été convenu et accepté.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1 : Modalités de remboursement</h2>
        <p>
          Je m'engage formellement à rembourser l'intégralité de cette somme au Créancier selon les modalités suivantes : {data.repaymentTerms || '[Modalités de remboursement à préciser]'}.
        </p>
        <p style={{marginTop: '10px'}}>
            Toute somme non payée à son échéance portera de plein droit intérêt au taux légal en vigueur, sans qu'il soit besoin d'une mise en demeure préalable.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2 : Loi applicable et juridiction</h2>
        <p>
            La présente reconnaissance de dette est soumise au droit français. Tout litige relatif à son interprétation ou à son exécution sera de la compétence exclusive des tribunaux du ressort du siège social du Créancier.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%'}}>
          <p style={{textAlign: 'right', marginBottom: '20px'}}>Fait à Paris, le {formatDate(data.ackDate)}</p>
          <div style={styles.signatureLine}></div>
          <p style={{...styles.label, textAlign: 'left'}}>Signature du Débiteur</p>
          <p style={{textAlign: 'left', fontSize: '9pt', color: '#777', fontStyle: 'italic', marginTop: '5px'}}>
            Précédée de la mention manuscrite : "Lu et approuvé, bon pour reconnaissance de dette de la somme de [montant en toutes lettres] euros."
          </p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
