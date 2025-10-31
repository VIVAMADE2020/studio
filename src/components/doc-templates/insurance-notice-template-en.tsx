
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';

export interface InsuranceNoticeDataEn {
  noticeDate: string;
  borrowerName: string;
  contractNumber: string;
  groupPolicyNumber: string;
  guarantees: string;
  exclusions: string;
  claimProcedure: string;
}

interface InsuranceNoticeTemplateEnProps {
  data: InsuranceNoticeDataEn;
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

export const InsuranceNoticeTemplateEn: React.FC<InsuranceNoticeTemplateEnProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title="Borrower's Insurance Information Notice"
      subHeader={`Group Insurance Contract No. ${data.groupPolicyNumber || '[Policy Number]'}`}
    >
      <div style={{...styles.section, textAlign: 'right', marginBottom: '30px' }}>
        <p>Document issued on: {formatDate(data.noticeDate)}</p>
        <p>Recipient: {data.borrowerName || '[Member Name]'}</p>
        <p>Regarding loan project No.: {data.contractNumber || '[Contract Number]'}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>1. Purpose of this Notice</h2>
        <p>
          The purpose of this notice is to inform you of the terms, conditions, guarantees, and exclusions of the group insurance contract underwritten by VylsCapital with its insurance partner, to which you are applying for membership. <strong>We invite you to read it carefully before signing your membership application and to keep it.</strong> It is an essential element of your financial protection.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>2. Contract Guarantees</h2>
        <p>
          Subject to the terms and conditions defined in the contract, your membership covers you against the following risks:
        </p>
        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
          {renderList(data.guarantees)}
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>3. Main Exclusions</h2>
        <p>
          Certain situations are not covered by the contract. The following are notably excluded from the guarantee:
        </p>
         <div style={{ padding: '15px', border: '1px solid #fee2e2', backgroundColor: '#fff7f7', borderRadius: '4px', marginTop: '15px' }}>
            {renderList(data.exclusions)}
            <p style={{marginTop: '15px', fontSize: '9pt', fontStyle: 'italic', color: '#777'}}>This list is not exhaustive. For a complete detail of exclusions, please refer to the General Conditions of the insurance contract that will be provided to you.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>4. Membership Formalities and Health Questionnaire</h2>
        <p>
          Your membership is subject to the insurer's approval, which is based in particular on your answers to the health questionnaire. You are required to answer all questions accurately and completely. Any intentional false statement may lead to the nullity of your membership and the refusal of claim coverage.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>5. Claim Procedure</h2>
        <p>
          If one of the guaranteed events occurs, you or your beneficiaries must report it as soon as possible.
        </p>
         <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.claimProcedure || "Procedure not specified."}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>6. Right of Withdrawal</h2>
        <p>
          You have a period of 30 calendar days from the date of signing your membership application to withdraw, without fees or penalties, by registered letter with acknowledgment of receipt.
        </p>
      </div>

      <div style={{...styles.footer, borderTop: 'none', marginTop: '30px', textAlign: 'left', fontStyle: 'italic', color: '#555'}}>
        <p>
            This information notice does not replace the General and Specific Conditions of the insurance contract, which prevail in case of dispute and which will be provided to you upon your final membership.
        </p>
      </div>
    </DocumentWrapper>
  );
};
