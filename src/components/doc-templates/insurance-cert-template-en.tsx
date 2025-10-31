
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface InsuranceCertificateDataEn {
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
  groupPolicyNumber: string;
}

interface InsuranceCertificateTemplateEnProps {
  data: InsuranceCertificateDataEn;
}

export const InsuranceCertificateTemplateEn: React.FC<InsuranceCertificateTemplateEnProps> = ({ data }) => {
  const signer = teamMembers[3]; // Juliette Lambert, Director of Insurance

  return (
    <DocumentWrapper 
        title={`Borrower's Insurance Certificate for a ${data.loanType || '[Loan Type]'}`}
        subHeader="Insurance Department • Membership Services • Borrower's Guarantee Certification Unit"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Certificate No:</strong> {data.certNumber || '[Certificate Number]'}</p>
        <p><strong>Issue Date:</strong> {formatDate(data.certDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>The Insured:</h2>
         <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Full Name:</strong> {data.insuredName || '[Insured Name]'}</p>
            <p><strong>Date of Birth:</strong> {formatDate(data.insuredDob)}</p>
            <p><strong>Address:</strong> {data.insuredAddress || '[Insured Address]'}</p>
            <p><strong>ID Number:</strong> {data.insuredIdNumber || '[ID Number]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>The Beneficiary:</h2>
        <p>The lending institution partner of VylsCapital, for the loan agreement No. {data.contractNumber || '[Contract Number]'}.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Purpose of the Certificate</h2>
        <p>We, the undersigned, acting on behalf of our insurance partner, hereby certify that the above-mentioned insured person is covered by the group insurance contract <strong>No. {data.groupPolicyNumber || '[Policy Number]'}</strong>, subscribed by VylsCapital, in the context of their loan.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Details of the Insured Loan</h2>
        <ul style={{listStyleType: 'none', paddingLeft: 0}}>
            <li><strong>Loan Type:</strong> {data.loanType || '[Loan Type]'}</li>
            <li><strong>Associated Loan Number:</strong> {data.contractNumber || '[Contract Number]'}</li>
            <li><strong>Insured Capital Amount:</strong> {formatCurrency(data.loanAmount || 0)}</li>
            <li><strong>Insurance Coverage Duration:</strong> {data.coverageDuration || 0} months, coinciding with the loan term.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Applicable Guarantees</h2>
        <p>Subject to the terms, conditions, and exclusions stipulated in the insurance contract information notice provided to you, the insured benefits from the following guarantees:</p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Death:</strong> Payment of the outstanding capital to the lending institution.</li>
            <li><strong>Total and Irreversible Loss of Autonomy (TILA):</strong> Payment of the outstanding capital to the lending institution.</li>
            <li><strong>Total Temporary Incapacity for Work (TTIW):</strong> Coverage of loan installments after a deductible period.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Cost of Insurance</h2>
        <p><strong>Monthly insurance premium:</strong> {formatCurrency(data.monthlyPremium || 0)} / month. This amount is payable monthly, in addition to your loan installment.</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Effective Date and Validity</h2>
        <p>This certificate is issued to serve as proof where required. The guarantees will take effect on the date of the loan funds disbursement and will cease upon full repayment of the loan.</p>
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
