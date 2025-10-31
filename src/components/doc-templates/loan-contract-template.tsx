
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';
import Image from 'next/image';

export interface LoanContractData {
  contractNumber: string;
  contractDate: string;
  borrowerName: string;
  borrowerAddress: string;
  borrowerIdNumber: string;
  loanType: string;
  loanAmount: number;
  loanAmountInWords: string;
  interestRate: number;
  loanTerm: number;
  repaymentStartDate: string;
  repaymentEndDate: string;
  monthlyPayment: number;
  totalCreditCost: number;
  totalAmountDue: number;
}


interface LoanContractTemplateProps {
  data: LoanContractData;
}

export const LoanContractTemplate: React.FC<LoanContractTemplateProps> = ({ data }) => {
    const signer = teamMembers[1]; // Isabelle Dubois, Directrice Financière
  return (
    <DocumentWrapper 
        title={`Contrat de ${data.loanType || '[Type de Prêt]'}`}
        subHeader="Service Financier Européen • Département des crédits à la consommation • Bureau des Accords de Prêt • Unité de Vérification des Engagements"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Contrat N°:</strong> {data.contractNumber || '[Numéro de contrat]'}</p>
            <p><strong>Fait à Paris, le</strong> {formatDate(data.contractDate)}</p>
        </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Entre les soussignés :</h2>
        <p><strong style={styles.label}>Le Prêteur :</strong> VylsCapital, société intermédiaire, dont le siège social est situé 123 Rue de la Finance, 75001 Paris, ci-après dénommé "Le Prêteur".</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>L'Emprunteur :</strong> {data.borrowerName || '[Nom de l\'emprunteur]'}</p>
            <p>Demeurant au {data.borrowerAddress || '[Adresse de l\'emprunteur]'}</p>
            <p>N° Pièce d'identité : {data.borrowerIdNumber || '[Numéro de pièce d\'identité]'}</p>
            <p>ci-après dénommé "L'Emprunteur".</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1 : Objet du Contrat</h2>
        <p>Le Prêteur consent à l'Emprunteur, qui accepte, un {data.loanType || '[Type de prêt]'} amortissable pour un usage non-professionnel, régi par les dispositions du Code de la consommation et par les présentes conditions générales et particulières.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2 : Montant et Caractéristiques du Prêt</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px'}}>
            <p><strong style={styles.label}>Montant du capital prêté :</strong><br/>{formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Montant en lettres]'} euros).</p>
            <p><strong style={styles.label}>Taux d'intérêt Annuel Effectif Global (TAEG) fixe :</strong><br/>{data.interestRate || 0}%.</p>
            <p><strong style={styles.label}>Durée totale du remboursement :</strong><br/>{data.loanTerm || 0} mois.</p>
            <p><strong style={styles.label}>Date de mise à disposition des fonds :</strong><br/>Au plus tard 8 jours après l'expiration du délai de rétractation.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3 : Modalités de Remboursement</h2>
        <p>L'Emprunteur s'engage à rembourser le capital et les intérêts en {data.loanTerm || 0} mensualités constantes. La première échéance interviendra le {formatDate(data.repaymentStartDate)} et la dernière le {formatDate(data.repaymentEndDate)}.</p>
        <p style={{marginTop: '10px'}}><strong style={styles.label}>Mensualité (hors assurance) :</strong> {formatCurrency(data.monthlyPayment || 0)}. Ce montant sera prélevé le 5 de chaque mois.</p>
        <p><strong style={styles.label}>Coût total du crédit (intérêts) :</strong> {formatCurrency(data.totalCreditCost || 0)}</p>
        <p><strong style={styles.label}>Montant total dû :</strong> {formatCurrency(data.totalAmountDue || 0)} (Capital emprunté + coût total des intérêts).</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 4 : Droit de Rétractation</h2>
        <p>L'Emprunteur dispose d'un délai de rétractation de quatorze (14) jours calendaires à compter de la date de signature de l'offre de contrat de crédit. Pour se rétracter, l'Emprunteur doit renvoyer le bordereau de rétractation joint à l'offre par lettre recommandée avec accusé de réception.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 5 : Défaut de Paiement</h2>
        <p>En cas de non-paiement d'une échéance à sa date, Le Prêteur pourra exiger le remboursement immédiat du capital restant dû, majoré des intérêts échus et non payés. Des indemnités de retard pourront être appliquées conformément à la législation en vigueur.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 6 : Assurance Emprunteur Obligatoire</h2>
        <p>L'octroi de ce prêt est conditionné à la souscription préalable par l'Emprunteur d'une assurance couvrant les risques de Décès, Perte Totale et Irréversible d'Autonomie (PTIA), et Incapacité de Travail (IT). L'Emprunteur reconnaît avoir reçu, lu et accepté les conditions de cette assurance, qui font l'objet d'une attestation d'assurance distincte fournie par VylsCapital ou ses partenaires assureurs avant la signature du présent contrat.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 7 : Protection des Données Personnelles</h2>
        <p>Les informations recueillies sont nécessaires au traitement de la demande de prêt. Elles sont traitées informatiquement et sont destinées aux services du Prêteur et de ses partenaires. Conformément au RGPD, l'Emprunteur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles en contactant le Prêteur à l'adresse contact@vylscapital.com.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 8 : Droit Applicable et Litiges</h2>
        <p>Le présent contrat est soumis au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le tribunal compétent sera celui du lieu de domicile de l'Emprunteur.</p>
      </div>

      <div style={{ ...styles.section, textAlign: 'center', marginTop: '30px' }}>
          <p>Fait en deux exemplaires originaux, dont un pour chaque partie.</p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <img src={signer.signatureUrl} alt={`Signature de ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Signature du Prêteur (VylsCapital)</p>
          <p>{signer.name}, {signer.role}</p>
        </div>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Signature de l'Emprunteur</p>
          <p style={{fontSize: '9pt', color: '#777', fontStyle: 'italic'}}>(Précédée de la mention "Lu et approuvé")</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
