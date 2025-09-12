
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface DebtAcknowledgementDataEn {
  docNumber: string;
  docDate: string;
  debtorName: string;
  debtorAddress: string;
  debtorIdNumber: string;
  loanType: string;
  loanAmount: number;
  loanAmountInWords: string;
  loanTerm: number;
  contractNumber: string;
}

interface DebtAcknowledgementTemplateEnProps {
  data: DebtAcknowledgementDataEn;
}

export const DebtAcknowledgementTemplateEn: React.FC<DebtAcknowledgementTemplateEnProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Acknowledgement of Debt for a ${data.loanType || '[Loan Type]'}`}
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Document No:</strong> {data.docNumber || '[Document Number]'}</p>
        <p><strong>Date:</strong> {formatDate(data.docDate)}</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Between the undersigned:</h2>
        <p><strong style={styles.label}>The Creditor:</strong> FLEXFOND, acting as an intermediary for its financial partners, with its registered office at 123 Rue de la Finance, 75001 Paris.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>The Debtor:</strong></p>
            <p><strong>Name:</strong> {data.debtorName || '[Debtor Name]'}</p>
            <p><strong>Address:</strong> {data.debtorAddress || '[Debtor Address]'}</p>
            <p><strong>ID Number:</strong> {data.debtorIdNumber || '[ID Number]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 1: Acknowledgement of Debt</h2>
        <p>
          I, the undersigned, <strong>{data.debtorName || '[Debtor Name]'}</strong>, residing at {data.debtorAddress || '[Debtor Address]'}, hereby acknowledge to owe FLEXFOND, acting on behalf of its financial partners, the sum of:
        </p>
        <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Amount in words]'} euros)
        </p>
        <p>
          This sum corresponds to the principal of a {data.loanType || '[Loan Type]'} that has been granted to me and for which I have received the funds.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 2: Repayment Terms</h2>
        <p>
          I undertake to repay this sum in full, as well as the associated interest and fees, in accordance with the schedule and conditions defined in the {data.loanType || '[Loan Type]'} agreement No. <strong>{data.contractNumber || '[Contract Number]'}</strong> which I have signed separately. The agreed repayment period is {data.loanTerm || '[Loan Term]'} months, except in the case of early repayment or a payment incident modifying the schedule.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 3: Default Clause</h2>
        <p>
          In the event of non-payment of one or more installments, I acknowledge that the Creditor may invoke the clauses provided for in the loan agreement, including the early demand for the entire outstanding principal.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Article 4: Mandatory Handwritten Mention</h2>
        <p>
          Article L. 313-24 of the Consumer Code stipulates the importance of the commitment. The debtor acknowledges having read and understood the entire loan agreement to which this acknowledgement of debt relates.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%'}}>
          <p style={{textAlign: 'right', marginBottom: '20px'}}>Done in Paris, on {formatDate(data.docDate)}</p>
          <div style={styles.signatureLine}></div>
          <p style={{...styles.label, textAlign: 'left'}}>Signature of the Debtor</p>
          <p style={{textAlign: 'left', fontSize: '9pt', color: '#777', fontStyle: 'italic', marginTop: '5px'}}>
            Preceded by the handwritten mention: "Read and approved, good for acknowledgement of debt for the sum of {data.loanAmountInWords || '[amount in full]'} euros."
          </p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
