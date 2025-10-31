
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';
import Image from 'next/image';

export interface InsuranceCertificateData {
  certNumber: string;
  certDate: string;
  insuredName: string;
  insuredDob: string;
  insuredAddress: string;
  insuredIdNumber: string;
  contractNumber: string;
  loanType: string;
  loanAmount: number;
  coverageDuration: number;
  monthlyPremium: number;
  groupPolicyNumber: string; // Ajout pour lier à la notice
}


interface InsuranceCertificateTemplateProps {
  data: InsuranceCertificateData;
}

export const InsuranceCertificateTemplate: React.FC<InsuranceCertificateTemplateProps> = ({ data }) => {
  const signer = teamMembers[3]; // Juliette Lambert, Directrice des Assurances
  return (
    <DocumentWrapper 
        title={`Attestation d'Assurance Emprunteur pour un ${data.loanType || '[Type de prêt]'}`}
        subHeader="Département des Assurances • Service des Adhésions • Unité de Certification des Garanties Emprunteur"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Certificat N°:</strong> {data.certNumber || '[Numéro de certificat]'}</p>
        <p><strong>Date d'émission:</strong> {formatDate(data.certDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>L'Assuré :</h2>
         <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Nom et Prénom :</strong> {data.insuredName || '[Nom de l\'assuré]'}</p>
            <p><strong>Date de Naissance :</strong> {formatDate(data.insuredDob)}</p>
            <p><strong>Adresse :</strong> {data.insuredAddress || '[Adresse de l\'assuré]'}</p>
            <p><strong>N° Pièce d'identité :</strong> {data.insuredIdNumber || '[Numéro de pièce d\'identité]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Le Bénéficiaire :</h2>
        <p>L'organisme prêteur partenaire de VylsCapital, pour le compte du contrat de prêt N° {data.contractNumber || '[Numéro de contrat]'}.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Objet de l'Attestation</h2>
        <p>Nous soussignés, agissant pour le compte de notre partenaire assureur, certifions par la présente que l'assuré(e) susmentionné(e) est couvert(e) par le contrat d'assurance groupe <strong>n°{data.groupPolicyNumber || '[Numéro Police]'}</strong>, souscrit par VylsCapital, dans le cadre de son prêt.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Détails du prêt assuré</h2>
        <ul style={{listStyleType: 'none', paddingLeft: 0}}>
            <li><strong>Nature du prêt :</strong> {data.loanType || '[Type de Prêt]'}</li>
            <li><strong>Numéro du prêt associé :</strong> {data.contractNumber || '[Numéro de contrat]'}</li>
            <li><strong>Montant du capital assuré :</strong> {formatCurrency(data.loanAmount || 0)}</li>
            <li><strong>Durée de la couverture d'assurance :</strong> {data.coverageDuration || 0} mois, coïncidant avec la durée du prêt.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Garanties applicables</h2>
        <p>Sous réserve des termes, conditions et exclusions stipulées dans la notice d'information du contrat d'assurance qui vous a été remise, l'assuré(e) bénéficie des garanties suivantes :</p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Décès :</strong> Versement du capital restant dû à l'organisme prêteur.</li>
            <li><strong>Perte Totale et Irréversible d'Autonomie (PTIA) :</strong> Versement du capital restant dû à l'organisme prêteur.</li>
            <li><strong>Incapacité Temporaire Totale de Travail (ITT) :</strong> Prise en charge des échéances du prêt après une période de franchise.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Coût de l'Assurance</h2>
        <p><strong>Prime d'assurance mensuelle :</strong> {formatCurrency(data.monthlyPremium || 0)} / mois. Ce montant est payable mensuellement, en supplément de votre échéance de prêt.</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Date d'effet et Validité</h2>
        <p>La présente attestation est établie pour faire valoir ce que de droit. Les garanties prendront effet à la date du déblocage des fonds du prêt et cesseront au terme du remboursement complet de celui-ci.</p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '50px'}}>
        <div style={{...styles.signatureBox, width: '50%'}}>
            <p style={{marginBottom: '20px'}}>Fait à Paris, le {formatDate(data.certDate)}</p>
            <img src={signer.signatureUrl} alt={`Signature de ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
            <div style={styles.signatureLine}></div>
            <p>Pour VylsCapital,</p>
            <p>{signer.name},<br/>{signer.role}</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
