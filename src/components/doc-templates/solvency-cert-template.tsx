
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
    <DocumentWrapper title="Attestation de Solvabilité Bancaire">
      <div style={styles.section}>
        <p>Nous soussignés, FLEXFOND, agissant en qualité d'établissement financier, certifions par la présente que :</p>
        <div style={{ margin: '30px 0', padding: '20px', border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#fcfcfc' }}>
            <p><strong style={styles.label}>M./Mme :</strong> {data.clientName || '[Nom du Client]'}</p>
            <p><strong style={styles.label}>Demeurant :</strong> {data.clientAddress || '[Adresse du Client]'}</p>
        </div>
        <p>
          Est titulaire du compte courant numéro <strong>{data.accountNumber || '[Numéro de compte]'}</strong> dans nos livres.
        </p>
        <p style={{ marginTop: '20px' }}>
          À la date de la présente attestation, le solde créditeur de ce compte s'élève à :
        </p>
        <p style={{ fontSize: '18pt', fontWeight: 'bold', textAlign: 'center', margin: '30px 0', color: '#333' }}>
          {formatCurrency(data.balance || 0)}
        </p>
        <p>
          Ce client gère son compte de manière satisfaisante et n'a, à notre connaissance, aucun incident de paiement non régularisé à ce jour.
        </p>
        <p style={{ marginTop: '10px' }}>
          Cette attestation est délivrée à la demande de l'intéressé(e) pour servir et valoir ce que de droit et ne constitue en aucun cas une garantie de paiement ou un engagement de notre part.
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
