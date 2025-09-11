
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';

export interface InsuranceNoticeData {
  noticeDate: string;
  borrowerName: string;
  contractNumber: string;
  groupPolicyNumber: string;
  guarantees: string;
  exclusions: string;
  claimProcedure: string;
}

interface InsuranceNoticeTemplateProps {
  data: InsuranceNoticeData;
}

const renderList = (text: string) => {
    if (!text) return null;
    return (
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
            {text.split('\n').map((item, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{item.replace(/^- /, '')}</li>
            ))}
        </ul>
    );
}

export const InsuranceNoticeTemplate: React.FC<InsuranceNoticeTemplateProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title="Notice d'Information de l'Assurance Emprunteur"
      subHeader={`Contrat d'assurance collectif de groupe n° ${data.groupPolicyNumber || '[Numéro Police]'}`}
    >
      <div style={{...styles.section, textAlign: 'right', marginBottom: '30px' }}>
        <p>Document établi le : {formatDate(data.noticeDate)}</p>
        <p>Destinataire : {data.borrowerName || '[Nom de l\'adhérent]'}</p>
        <p>Concerne le projet de prêt n° : {data.contractNumber || '[Numéro de contrat]'}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>1. Objet de la présente notice</h2>
        <p>
          La présente notice a pour objet de vous informer des conditions, modalités, garanties et exclusions du contrat d'assurance collectif souscrit par FLEXFOND auprès de son partenaire assureur, auquel vous demandez votre adhésion. <strong>Nous vous invitons à la lire attentivement avant de signer votre demande d'adhésion et à la conserver.</strong> Elle constitue un élément essentiel de votre protection financière.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>2. Garanties du contrat</h2>
        <p>
          Sous réserve des conditions définies au contrat, votre adhésion vous couvre contre les risques suivants :
        </p>
        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
          {renderList(data.guarantees)}
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>3. Principales exclusions</h2>
        <p>
          Certaines situations ne sont pas couvertes par le contrat. Sont notamment exclus de la garantie :
        </p>
         <div style={{ padding: '15px', border: '1px solid #fee2e2', backgroundColor: '#fff7f7', borderRadius: '4px', marginTop: '15px' }}>
            {renderList(data.exclusions)}
            <p style={{marginTop: '15px', fontSize: '9pt', fontStyle: 'italic', color: '#777'}}>Cette liste n'est pas exhaustive. Pour le détail complet des exclusions, veuillez vous référer aux Conditions Générales du contrat d'assurance qui vous seront remises.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>4. Formalités d'adhésion et questionnaire de santé</h2>
        <p>
          Votre adhésion est subordonnée à l'acceptation de l'assureur, qui se base notamment sur vos réponses au questionnaire de santé. Vous êtes tenu(e) de répondre de manière exacte et complète à toutes les questions posées. Toute fausse déclaration intentionnelle peut entraîner la nullité de votre adhésion et le refus de prise en charge d'un sinistre.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>5. Procédure en cas de sinistre</h2>
        <p>
          Si l'un des événements garantis survient, vous ou vos ayants droit devez le déclarer dans les plus brefs délais.
        </p>
         <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.claimProcedure || "Procédure non spécifiée."}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>6. Droit de renonciation</h2>
        <p>
          Vous disposez d'un délai de 30 jours calendaires à compter de la date de signature de votre demande d'adhésion pour y renoncer, sans frais ni pénalités, par lettre recommandée avec accusé de réception.
        </p>
      </div>

      <div style={{...styles.footer, borderTop: 'none', marginTop: '30px', textAlign: 'left', fontStyle: 'italic', color: '#555'}}>
        <p>
            Cette notice d'information ne remplace pas les Conditions Générales et Particulières du contrat d'assurance, qui prévalent en cas de litige et qui vous seront remises lors de votre adhésion définitive.
        </p>
      </div>
    </DocumentWrapper>
  );
};
