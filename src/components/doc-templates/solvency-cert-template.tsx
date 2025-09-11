
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface SolvencyCertificateData {
  clientName: string;
  clientAddress: string;
  accountNumber: string;
  balance: number;
  certDate: string;
}

interface SolvencyCertificateTemplateProps {
  data: SolvencyCertificateData;
}

export const SolvencyCertificateTemplate: React.FC<SolvencyCertificateTemplateProps> = ({ data }) => {
  return (
    <DocumentWrapper title="Attestation de Solvabilité">
      <div style={styles.section}>
        <p>Nous soussignés, FLEXFOND, certifions par la présente que :</p>
        <div style={{ margin: '30px 0', padding: '20px', border: '1px solid #eee', borderRadius: '5px' }}>
            <p><strong>M./Mme {data.clientName}</strong></p>
            <p>Résidant au {data.clientAddress}</p>
        </div>
        <p>
          Est titulaire du compte numéro <strong>{data.accountNumber}</strong> dans nos livres.
        </p>
        <p style={{ marginTop: '20px' }}>
          À la date de ce certificat, le solde créditeur de ce compte s'élève à :
        </p>
        <p style={{ fontSize: '18pt', fontWeight: 'bold', textAlign: 'center', margin: '30px 0' }}>
          {formatCurrency(data.balance || 0)}
        </p>
        <p>
          Ce document est délivré à la demande de l'intéressé(e) pour servir et valoir ce que de droit.
        </p>
      </div>

      <div style={{...styles.section, marginTop: '50px'}}>
        <p>Fait à Paris, le {formatDate(data.certDate)}</p>
        <div style={{marginTop: '60px', width: '50%'}}>
            <div style={styles.signatureLine}></div>
            <p>Pour FLEXFOND,</p>
            <p>Le service client.</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
