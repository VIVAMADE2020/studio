
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface GuaranteeAgreementDataEn {
  actNumber: string;
  actDate: string;
  borrowerName: string;
  borrowerAddress: string;
  borrowerIdNumber: string;
  loanType: string;
  loanAmount: number;
  loanAmountInWords: string;
  loanTerm: number;
  contractNumber: string;
}

interface GuaranteeAgreementTemplateEnProps {
  data: GuaranteeAgreementDataEn;
}

export const GuaranteeAgreementTemplateEn: React.FC<GuaranteeAgreementTemplateEnProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Joint and Several Guarantee Agreement for a ${data.loanType || '[Loan Type]'}`}
      subHeader="Legal and Guarantees Department • Commitments Department • Guarantees Formalization Unit"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Act No:</strong> {data.actNumber || '[Act Number]'}</p>
        <p><strong>Date:</strong> {formatDate(data.actDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Between the undersigned:</h2>
        <p><strong style={styles.label}>The Creditor:</strong> VylsCapital, acting as an intermediary for its financial partners, with its registered office at 123 Rue de la Finance, 75001 Paris.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>The Debtor (Borrower):</strong></p>
            <p><strong>Name:</strong> {data.borrowerName || '[Borrower Name]'}</p>
            <p><strong>Address:</strong> {data.borrowerAddress || '[Borrower Address]'}</p>
            <p><strong>ID Number:</strong> {data.borrowerIdNumber || '[ID Number]'}</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1: Subject of the Commitment</h2>
        <p>
            By this act, the Debtor undertakes to pay the Creditor the sums due under the {data.loanType || '[Loan Type]'} agreement referenced below:
        </p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Loan contract number:</strong> {data.contractNumber || '[Contract Number]'}</li>
            <li><strong>Principal amount:</strong> {formatCurrency(data.loanAmount || 0)} (in words: {data.loanAmountInWords || '[Amount in words]'} euros).</li>
            <li><strong>Loan term:</strong> {data.loanTerm || 0} months.</li>
        </ul>
        <p style={{marginTop: '10px'}}>The Debtor declares to have full knowledge of the nature and extent of their obligations.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2: Scope of the Guarantee</h2>
        <p>
          The Debtor's commitment covers the payment of the principal, interest, commissions, fees, and accessories, and generally, all sums that may be due under the aforementioned loan agreement. The commitment is made for the entire term of the loan.
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3: Joint and Several Liability and Indivisibility</h2>
        <p>
          The Debtor is solely responsible for the debt. In the event of default, the Creditor may claim the entire debt from the Debtor.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 4: Mandatory Handwritten Mention</h2>
        <p>
            The Debtor must handwrite the following statement, in accordance with the law: "I, {data.borrowerName || '[Borrower Name]'}, undertake to repay the lender the sums due from my income and my assets."
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 5: Information Due</h2>
        <p>
            The Creditor undertakes to inform the Debtor of any modification to the contract.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%', textAlign: 'center'}}>
            <p>Done in Paris, on {formatDate(data.actDate)}</p>
            <div style={{...styles.signatureLine, marginTop: '40px'}}></div>
            <p style={{...styles.label, textAlign: 'center'}}>Signature of the Debtor</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
