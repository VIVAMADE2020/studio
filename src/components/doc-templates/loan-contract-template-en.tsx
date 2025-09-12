
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface LoanContractDataEn {
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

interface LoanContractTemplateEnProps {
  data: LoanContractDataEn;
}

export const LoanContractTemplateEn: React.FC<LoanContractTemplateEnProps> = ({ data }) => {
    const signer = teamMembers[1]; // Isabelle Dubois, Chief Financial Officer
  return (
    <DocumentWrapper 
        title={`${data.loanType || '[Loan Type]'} Agreement`}
        subHeader="European Financial Service • Consumer Credit Department • Loan Agreement Office • Commitment Verification Unit"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Agreement No:</strong> {data.contractNumber || '[Contract Number]'}</p>
            <p><strong>Done in Paris, on</strong> {formatDate(data.contractDate)}</p>
        </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Between the undersigned:</h2>
        <p><strong style={styles.label}>The Lender:</strong> FLEXFOND, an intermediary company, with its registered office at 123 Rue de la Finance, 75001 Paris, hereinafter referred to as "The Lender".</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>The Borrower:</strong> {data.borrowerName || '[Borrower Name]'}</p>
            <p>Residing at {data.borrowerAddress || '[Borrower Address]'}</p>
            <p>ID Number: {data.borrowerIdNumber || '[ID Number]'}</p>
            <p>hereinafter referred to as "The Borrower".</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1: Purpose of the Agreement</h2>
        <p>The Lender grants to the Borrower, who accepts, a repayable {data.loanType || '[Loan Type]'} for non-professional use, governed by the provisions of the Consumer Code and by these general and specific conditions.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2: Loan Amount and Characteristics</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px'}}>
            <p><strong style={styles.label}>Principal loan amount:</strong><br/>{formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Amount in words]'} euros).</p>
            <p><strong style={styles.label}>Fixed Annual Percentage Rate (APR):</strong><br/>{data.interestRate || 0}%.</p>
            <p><strong style={styles.label}>Total repayment term:</strong><br/>{data.loanTerm || 0} months.</p>
            <p><strong style={styles.label}>Date of funds availability:</strong><br/>No later than 8 days after the expiry of the withdrawal period.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3: Repayment Terms</h2>
        <p>The Borrower undertakes to repay the principal and interest in {data.loanTerm || 0} constant monthly installments. The first installment will be due on {formatDate(data.repaymentStartDate)} and the last on {formatDate(data.repaymentEndDate)}.</p>
        <p style={{marginTop: '10px'}}><strong style={styles.label}>Monthly payment (excluding insurance):</strong> {formatCurrency(data.monthlyPayment || 0)}. This amount will be debited on the 5th of each month.</p>
        <p><strong style={styles.label}>Total cost of credit (interest):</strong> {formatCurrency(data.totalCreditCost || 0)}</p>
        <p><strong style={styles.label}>Total amount due:</strong> {formatCurrency(data.totalAmountDue || 0)} (Borrowed capital + total cost of interest).</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 4: Right of Withdrawal</h2>
        <p>The Borrower has a withdrawal period of fourteen (14) calendar days from the date of signing the credit agreement offer. To withdraw, the Borrower must return the withdrawal form attached to the offer by registered letter with acknowledgment of receipt.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 5: Default in Payment</h2>
        <p>In the event of non-payment of an installment on its due date, the Lender may demand immediate repayment of the outstanding principal, plus accrued and unpaid interest. Late payment penalties may be applied in accordance with current legislation.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 6: Mandatory Borrower's Insurance</h2>
        <p>The granting of this loan is conditional upon the Borrower's prior subscription to an insurance policy covering the risks of Death, Total and Irreversible Loss of Autonomy (TILA), and Work Incapacity (IT). The Borrower acknowledges having received, read, and accepted the terms of this insurance, which are the subject of a separate insurance certificate provided by FLEXFOND or its insurance partners before the signing of this agreement.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 7: Data Protection</h2>
        <p>The information collected is necessary for processing the loan application. It is processed electronically and is intended for the Lender's departments and its partners. In accordance with the GDPR, the Borrower has the right to access, rectify, and delete their personal data by contacting the Lender at contact@flexfond.com.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 8: Applicable Law and Disputes</h2>
        <p>This agreement is subject to French law. In the event of a dispute, the parties undertake to seek an amicable solution. Failing this, the competent court will be that of the Borrower's place of residence.</p>
      </div>

      <div style={{ ...styles.section, textAlign: 'center', marginTop: '30px' }}>
          <p>Done in two original copies, one for each party.</p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <img src={signer.signatureUrl} alt={`Signature of ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Signature of the Lender (FLEXFOND)</p>
          <p>{signer.name}, {signer.role}</p>
        </div>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Signature of the Borrower</p>
          <p style={{fontSize: '9pt', color: '#777', fontStyle: 'italic'}}>(Preceded by the words "Read and approved")</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
