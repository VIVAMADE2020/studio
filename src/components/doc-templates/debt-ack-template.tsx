
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
        <div style={{ margin: '15px 0', paddingLeft: '20px' }}>
            <p><strong>{data.debtorName}</strong></p>
            <p>Demeurant au {data.debtorAddress}</p>
        </div>
        <p>
          reconnais par la présente devoir à <strong>{data.creditorName}</strong> (ci-après "le Créancier"), la somme de :
        </p>
        <p style={{ fontSize: '18pt', fontWeight: 'bold', textAlign: 'center', margin: '30px 0' }}>
          {formatCurrency(data.debtAmount || 0)}
        </p>
        <p>
          Cette somme correspond au capital dû dans le cadre d'un accord de financement pour lequel un échéancier de paiement a été convenu.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Modalités de remboursement</h2>
        <p>
          Je m'engage à rembourser cette somme au Créancier selon les modalités suivantes : {data.repaymentTerms}.
        </p>
        <p style={{marginTop: '10px'}}>
            Toute somme non payée à son échéance portera de plein droit intérêt au taux légal en vigueur, sans qu'il soit besoin d'une mise en demeure.
        </p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p>Signature du Débiteur</p>
          <p>(Précédée de la mention manuscrite : "Lu et approuvé, bon pour reconnaissance de dette de la somme de [montant en toutes lettres] euros.")</p>
        </div>
      </div>
      <p style={{textAlign: 'center', marginTop: '20px'}}>Fait à Paris, le {formatDate(data.ackDate)}</p>
    </DocumentWrapper>
  );
};
