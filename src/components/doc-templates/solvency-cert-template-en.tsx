
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface SolvencyCertificateDataEn {
  clientName: string;
  clientAddress: string;
  clientIdNumber: string;
  accountNumber: string;
  balance: number;
  certDate: string;
}

interface SolvencyCertificateTemplateEnProps {
  data: SolvencyCertificateDataEn;
}

export const SolvencyCertificateTemplateEn: React.FC<SolvencyCertificateTemplateEnProps> = ({ data }) => {
    const expirationDate = new Date(data.certDate || new Date());
    expirationDate.setDate(expirationDate.getDate() + 30);
    const signer = teamMembers[4]; // David Moreau, Head of Financial Analysis
    
  return (
    <DocumentWrapper 
        title="Pre-Approved Solvency Certificate"
        subHeader="Financial Analysis Department • Solvency Certification Unit"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Certificate No:</strong> {`CS-${data.accountNumber || 'XXXX'}`}</p>
            <p><strong>Valid until:</strong> {formatDate(expirationDate.toISOString())}</p>
        </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Certificate Beneficiary:</h2>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Name:</strong> {data.clientName || '[Beneficiary Name]'}</p>
            <p><strong>ID Number:</strong> {data.clientIdNumber || '[ID Number]'}</p>
            <p><strong>Address:</strong> {data.clientAddress || '[Beneficiary Address]'}</p>
            <p><strong>Holder of VylsCapital Account No:</strong> {data.accountNumber || '[Account Number]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1: Purpose of the Certificate</h2>
        <p>
          VylsCapital, acting as a financial intermediary, hereby certifies to have conducted a thorough analysis of the financial situation of the above-mentioned beneficiary. Based on the documents provided and verifications carried out, the beneficiary is deemed eligible for financing up to a maximum amount of:
        </p>
         <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.balance || 0)}
        </p>
         <p>
          This amount has been established for an unspecified project and can be used as proof of financing capacity in preliminary steps (e.g., signing a pre-sale agreement, commercial negotiation).
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2: Scope and Finalization</h2>
        <p>
          This certificate attests to the pre-approval of your financing file by VylsCapital and constitutes an essential document in the loan granting process. It testifies to the successful analysis of your solvency.
        </p>
        <p>
          The final step for the disbursement of funds will be the signing of the <strong>official loan agreement</strong>, which will formalize all the conditions and the repayment schedule. VylsCapital is committed to assisting you in this final step.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3: Validity</h2>
        <p>
          This certificate is valid for 30 calendar days from its date of issue, i.e., until {formatDate(expirationDate.toISOString())}. This period ensures the relevance of the analyzed conditions. After this period, a simple update will be necessary to confirm your continued eligibility.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '50px'}}>
        <div style={{...styles.signatureBox, width: '50%'}}>
            <p style={{marginBottom: '20px'}}>Issued in Paris, on {formatDate(data.certDate)}</p>
            <img src={signer.signatureUrl} alt={`Signature of ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
            <div style={styles.signatureLine}></div>
            <p>For VylsCapital,</p>
            <p>{signer.name},<br/>{signer.role}</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
