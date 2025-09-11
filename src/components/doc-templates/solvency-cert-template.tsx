
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface SolvencyCertificateData {
  clientName: string;
  clientAddress: string;
  clientIdNumber: string;
  accountNumber: string;
  balance: number;
  certDate: string;
}

interface SolvencyCertificateTemplateProps {
  data: SolvencyCertificateData;
}

export const SolvencyCertificateTemplate: React.FC<SolvencyCertificateTemplateProps> = ({ data }) => {
    const expirationDate = new Date(data.certDate || new Date());
    expirationDate.setDate(expirationDate.getDate() + 30);
    
  return (
    <DocumentWrapper 
        title="Certificat de Solvabilité Pré-approuvée"
        subHeader="Département d'Analyse Financière • Unité de Certification de Solvabilité"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Certificat N°:</strong> {`CS-${data.accountNumber || 'XXXX'}`}</p>
            <p><strong>Valide jusqu'au:</strong> {formatDate(expirationDate.toISOString())}</p>
        </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Bénéficiaire du certificat :</h2>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Nom :</strong> {data.clientName || '[Nom du Bénéficiaire]'}</p>
            <p><strong>N° Pièce d'identité :</strong> {data.clientIdNumber || '[Numéro de pièce d\'identité]'}</p>
            <p><strong>Adresse :</strong> {data.clientAddress || '[Adresse du Bénéficiaire]'}</p>
            <p><strong>Titulaire du compte FLEXFOND N° :</strong> {data.accountNumber || '[Numéro de Compte]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1 : Objet du Certificat</h2>
        <p>
          FLEXFOND, agissant en tant qu'intermédiaire financier, certifie par la présente avoir procédé à une analyse préliminaire de la situation financière du bénéficiaire susmentionné. Sur la base des éléments déclaratifs fournis et en l'état actuel de nos critères d'évaluation des risques, le bénéficiaire est jugé éligible à un financement pour un montant maximum de :
        </p>
         <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.balance || 0)}
        </p>
         <p>
          Ce montant a été établi pour un projet non spécifié et peut être utilisé comme preuve de capacité de financement dans le cadre de démarches préliminaires (ex: signature d'un compromis de vente, négociation commerciale).
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2 : Portée et Limites</h2>
        <p>
          Ce certificat atteste d'une capacité de financement théorique et prévisionnelle au jour de son émission. <strong>Il ne constitue en aucun cas une offre de prêt ferme et définitive.</strong> L'octroi final de tout financement reste conditionné à la constitution d'un dossier de demande de prêt complet, à la vérification de l'ensemble des pièces justificatives (revenus, charges, identité, etc.), et à l'acceptation finale du dossier par nos partenaires prêteurs après une étude de solvabilité approfondie. FLEXFOND ne saurait être tenu responsable si un financement était refusé ultérieurement.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3 : Validité</h2>
        <p>
          Le présent certificat est valable 30 jours calendaires à compter de sa date d'émission, soit jusqu'au {formatDate(expirationDate.toISOString())}. Passé ce délai, les conditions économiques ou la situation personnelle du bénéficiaire ayant pu évoluer, une nouvelle évaluation sera impérativement nécessaire pour confirmer l'éligibilité.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '50px'}}>
        <div style={{...styles.signatureBox, width: '50%'}}>
            <p style={{marginBottom: '60px'}}>Fait à Paris, le {formatDate(data.certDate)}</p>
            <div style={styles.signatureLine}></div>
            <p>Pour FLEXFOND,</p>
            <p>Le service d'analyse financière.</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
