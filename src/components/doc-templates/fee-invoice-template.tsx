
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
                    <td style={{ width: '50%' }}>
                        <p><strong>Facturé à :</strong></p>
                        <p>{data.clientName}</p>
                        <p>{data.clientAddress}</p>
                    </td>
                    <td style={{ width: '50%', textAlign: 'right' }}>
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
                    <th style={{...styles.th, textAlign: 'right'}}>Montant</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={styles.td}>{data.serviceDescription}</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(data.amount)}</td>
                </tr>
            </tbody>
        </table>
      </div>

       <div style={{ ...styles.section, textAlign: 'right', marginTop: '30px' }}>
          <p style={{ fontSize: '14pt', fontWeight: 'bold' }}>
            Total à payer : {formatCurrency(data.amount)}
          </p>
        </div>

        <div style={{ ...styles.section, marginTop: '40px' }}>
            <p><strong>Modalités de paiement :</strong></p>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.paymentTerms}</p>
        </div>
    </DocumentWrapper>
  );
};
