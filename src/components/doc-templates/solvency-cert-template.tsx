
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';
import Image from 'next/image';

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
    const signer = teamMembers[4]; // David Moreau, Responsable Analyse Financière
    
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
          FLEXFOND, agissant en tant qu'intermédiaire financier, certifie par la présente avoir procédé à une analyse approfondie de la situation financière du bénéficiaire susmentionné. Sur la base des documents fournis et des vérifications effectuées, le bénéficiaire est jugé éligible à un financement pour un montant maximum de :
        </p>
         <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.balance || 0)}
        </p>
         <p>
          Ce montant a été établi pour un projet non spécifié et peut être utilisé comme preuve de capacité de financement dans le cadre de démarches préliminaires (ex: signature d'un compromis de vente, négociation commerciale).
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2 : Portée et Finalisation</h2>
        <p>
          Ce certificat atteste de la pré-approbation de votre dossier de financement par FLEXFOND et constitue un document essentiel dans la procédure d'octroi de votre prêt. Il témoigne du succès de l'analyse de votre solvabilité.
        </p>
        <p>
          L'étape finale pour le déblocage des fonds consistera en la signature du <strong>contrat de prêt officiel</strong>, qui formalisera l'ensemble des conditions et l'échéancier de remboursement. FLEXFOND s'engage à vous accompagner dans cette dernière démarche.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3 : Validité</h2>
        <p>
          Le présent certificat est valable 30 jours calendaires à compter de sa date d'émission, soit jusqu'au {formatDate(expirationDate.toISOString())}. Cette période garantit la pertinence des conditions analysées. Passé ce délai, une simple mise à jour sera nécessaire pour confirmer le maintien de votre éligibilité.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '50px'}}>
        <div style={{...styles.signatureBox, width: '50%'}}>
            <p style={{marginBottom: '20px'}}>Fait à Paris, le {formatDate(data.certDate)}</p>
            <img src={signer.signatureUrl} alt={`Signature de ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
            <div style={styles.signatureLine}></div>
            <p>Pour FLEXFOND,</p>
            <p>{signer.name},<br/>{signer.role}</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
