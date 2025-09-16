
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface FeeInvoiceDataEs {
  invoiceNumber: string;
  invoiceDate: string;
  clientName: string;
  clientAddress: string;
  serviceDescription: string;
  amount: number;
  paymentTerms: string;
}

interface FeeInvoiceTemplateEsProps {
  data: FeeInvoiceDataEs;
}

export const FeeInvoiceTemplateEs: React.FC<FeeInvoiceTemplateEsProps> = ({ data }) => {
  const totalAmount = data.amount || 0;
  return (
    <DocumentWrapper title="Factura">
      <div style={styles.section}>
        <table style={{ width: '100%', border: 'none' }}>
            <tbody>
                <tr>
                    <td style={{ width: '50%', verticalAlign: 'top', paddingRight: '20px' }}>
                        <p style={{...styles.sectionTitle, border: 'none', padding: 0, margin: 0, marginBottom: '10px' }}>Facturado a:</p>
                        <p style={{margin: 0, fontWeight: 'bold'}}>{data.clientName || '[Nombre del Cliente]'}</p>
                        <p style={{margin: 0, whiteSpace: 'pre-wrap'}}>{data.clientAddress || '[Dirección del Cliente]'}</p>
                    </td>
                    <td style={{ width: '50%', textAlign: 'right', verticalAlign: 'top' }}>
                        <p><strong>Nº Factura:</strong> {data.invoiceNumber || '[Número de Factura]'}</p>
                        <p><strong>Fecha:</strong> {formatDate(data.invoiceDate)}</p>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Descripción</th>
                    <th style={{...styles.th, textAlign: 'right', width: '150px'}}>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={styles.td}>{data.serviceDescription || 'Prestación de servicio'}</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(totalAmount)}</td>
                </tr>
            </tbody>
            <tfoot>
                 <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '8px'}}>Subtotal</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(totalAmount)}</td>
                </tr>
                 <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '8px'}}>IVA (0%)</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(0)}</td>
                </tr>
                <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '15px 8px', fontSize: '12pt'}}>Total a Pagar</td>
                    <td style={{...styles.td, textAlign: 'right', fontWeight: 'bold', fontSize: '14pt', backgroundColor: '#f9f9f9'}}>{formatCurrency(totalAmount)}</td>
                </tr>
            </tfoot>
        </table>
      </div>

        <div style={{ ...styles.section, marginTop: '40px' }}>
            <h2 style={styles.sectionTitle}>Condiciones de Pago</h2>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.paymentTerms || 'Pago a la recepción.'}</p>
        </div>
    </DocumentWrapper>
  );
};
