
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface FeeInvoiceDataEn {
  invoiceNumber: string;
  invoiceDate: string;
  clientName: string;
  clientAddress: string;
  serviceDescription: string;
  amount: number;
  paymentTerms: string;
}

interface FeeInvoiceTemplateEnProps {
  data: FeeInvoiceDataEn;
}

export const FeeInvoiceTemplateEn: React.FC<FeeInvoiceTemplateEnProps> = ({ data }) => {
  const totalAmount = data.amount || 0;
  return (
    <DocumentWrapper title="Invoice">
      <div style={styles.section}>
        <table style={{ width: '100%', border: 'none' }}>
            <tbody>
                <tr>
                    <td style={{ width: '50%', verticalAlign: 'top', paddingRight: '20px' }}>
                        <p style={{...styles.sectionTitle, border: 'none', padding: 0, margin: 0, marginBottom: '10px' }}>Billed to:</p>
                        <p style={{margin: 0, fontWeight: 'bold'}}>{data.clientName || '[Client Name]'}</p>
                        <p style={{margin: 0, whiteSpace: 'pre-wrap'}}>{data.clientAddress || '[Client Address]'}</p>
                    </td>
                    <td style={{ width: '50%', textAlign: 'right', verticalAlign: 'top' }}>
                        <p><strong>Invoice No:</strong> {data.invoiceNumber || '[Invoice Number]'}</p>
                        <p><strong>Date:</strong> {formatDate(data.invoiceDate)}</p>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Description</th>
                    <th style={{...styles.th, textAlign: 'right', width: '150px'}}>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={styles.td}>{data.serviceDescription || 'Service provision'}</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(totalAmount)}</td>
                </tr>
            </tbody>
            <tfoot>
                 <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '8px'}}>Subtotal</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(totalAmount)}</td>
                </tr>
                 <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '8px'}}>VAT (0%)</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(0)}</td>
                </tr>
                <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '15px 8px', fontSize: '12pt'}}>Total Due</td>
                    <td style={{...styles.td, textAlign: 'right', fontWeight: 'bold', fontSize: '14pt', backgroundColor: '#f9f9f9'}}>{formatCurrency(totalAmount)}</td>
                </tr>
            </tfoot>
        </table>
      </div>

        <div style={{ ...styles.section, marginTop: '40px' }}>
            <h2 style={styles.sectionTitle}>Payment Terms</h2>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.paymentTerms || 'Payment due upon receipt.'}</p>
        </div>

        <div style={{...styles.section, marginTop: '50px', textAlign: 'center', fontSize: '10pt', color: '#718096'}}>
            <p>In case of late payment, a fixed compensation of €40 for recovery costs will be applied.
            <br/>Thank you for your trust.</p>
        </div>
    </DocumentWrapper>
  );
};
