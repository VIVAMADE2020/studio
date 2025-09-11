
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
        <p style={{ margin: '15px 0' }}>
            <strong>{data.debtorName}</strong><br/>
            Demeurant au {data.debtorAddress}
        </p>
        <p>
          reconnais devoir à <strong>{data.creditorName}</strong> la somme de :
        </p>
        <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '30px 0' }}>
          {formatCurrency(data.debtAmount)}
        </p>
        <p>
          Cette somme correspond au capital dû dans le cadre d'un accord de financement.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Modalités de remboursement</h2>
        <p>
          Je m'engage à rembourser cette somme selon les modalités suivantes : {data.repaymentTerms}.
        </p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p>Signature du Débiteur</p>
          <p>(Précédée de la mention "Lu et approuvé, bon pour reconnaissance de dette")</p>
        </div>
      </div>
      <p style={{textAlign: 'center', marginTop: '20px'}}>Fait à Paris, le {formatDate(data.ackDate)}</p>
    </DocumentWrapper>
  );
};
