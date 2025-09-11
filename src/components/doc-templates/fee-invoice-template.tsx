
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface FeeInvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  clientName: string;
  clientAddress: string;
  serviceDescription: string;
  amount: number;
  paymentTerms: string;
}

interface FeeInvoiceTemplateProps {
  data: FeeInvoiceData;
}

export const FeeInvoiceTemplate: React.FC<FeeInvoiceTemplateProps> = ({ data }) => {
  return (
    <DocumentWrapper title="Facture de Frais">
      <div style={styles.section}>
        <table style={{ width: '100%', border: 'none' }}>
            <tbody>
                <tr>
                    <td style={{ width: '50%', verticalAlign: 'top' }}>
                        <p style={{...styles.sectionTitle, border: 'none', padding: 0, margin: 0, marginBottom: '10px' }}>Facturé à :</p>
                        <p style={{margin: 0}}>{data.clientName}</p>
                        <p style={{margin: 0, whiteSpace: 'pre-wrap'}}>{data.clientAddress}</p>
                    </td>
                    <td style={{ width: '50%', textAlign: 'right', verticalAlign: 'top' }}>
                        <p><strong>Facture N° :</strong> {data.invoiceNumber}</p>
                        <p><strong>Date :</strong> {formatDate(data.invoiceDate)}</p>
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
                    <th style={{...styles.th, textAlign: 'right', width: '150px'}}>Montant</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={styles.td}>{data.serviceDescription}</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(data.amount || 0)}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '15px 8px'}}>Total à payer</td>
                    <td style={{...styles.td, textAlign: 'right', fontWeight: 'bold', fontSize: '12pt'}}>{formatCurrency(data.amount || 0)}</td>
                </tr>
            </tfoot>
        </table>
      </div>

        <div style={{ ...styles.section, marginTop: '40px' }}>
            <h2 style={styles.sectionTitle}>Modalités de paiement</h2>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.paymentTerms}</p>
        </div>

        <div style={{...styles.section, marginTop: '50px', textAlign: 'center', fontSize: '10pt', color: '#718096'}}>
            <p>Nous vous remercions de votre confiance.</p>
        </div>
    </DocumentWrapper>
  );
};
