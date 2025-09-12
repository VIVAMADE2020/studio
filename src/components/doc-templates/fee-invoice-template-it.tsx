
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface FeeInvoiceDataIt {
  invoiceNumber: string;
  invoiceDate: string;
  clientName: string;
  clientAddress: string;
  serviceDescription: string;
  amount: number;
  paymentTerms: string;
}

interface FeeInvoiceTemplateItProps {
  data: FeeInvoiceDataIt;
}

export const FeeInvoiceTemplateIt: React.FC<FeeInvoiceTemplateItProps> = ({ data }) => {
  const totalAmount = data.amount || 0;
  return (
    <DocumentWrapper title="Fattura">
      <div style={styles.section}>
        <table style={{ width: '100%', border: 'none' }}>
            <tbody>
                <tr>
                    <td style={{ width: '50%', verticalAlign: 'top', paddingRight: '20px' }}>
                        <p style={{...styles.sectionTitle, border: 'none', padding: 0, margin: 0, marginBottom: '10px' }}>Fatturato a:</p>
                        <p style={{margin: 0, fontWeight: 'bold'}}>{data.clientName || '[Nome Cliente]'}</p>
                        <p style={{margin: 0, whiteSpace: 'pre-wrap'}}>{data.clientAddress || '[Indirizzo Cliente]'}</p>
                    </td>
                    <td style={{ width: '50%', textAlign: 'right', verticalAlign: 'top' }}>
                        <p><strong>Fattura n.:</strong> {data.invoiceNumber || '[Numero Fattura]'}</p>
                        <p><strong>Data:</strong> {formatDate(data.invoiceDate)}</p>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Descrizione</th>
                    <th style={{...styles.th, textAlign: 'right', width: '150px'}}>Subtotale</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={styles.td}>{data.serviceDescription || 'Prestazione di servizio'}</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(totalAmount)}</td>
                </tr>
            </tbody>
            <tfoot>
                 <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '8px'}}>Subtotale</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(totalAmount)}</td>
                </tr>
                 <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '8px'}}>IVA (0%)</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(0)}</td>
                </tr>
                <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '15px 8px', fontSize: '12pt'}}>Totale da Pagare</td>
                    <td style={{...styles.td, textAlign: 'right', fontWeight: 'bold', fontSize: '14pt', backgroundColor: '#f9f9f9'}}>{formatCurrency(totalAmount)}</td>
                </tr>
            </tfoot>
        </table>
      </div>

        <div style={{ ...styles.section, marginTop: '40px' }}>
            <h2 style={styles.sectionTitle}>Termini di Pagamento</h2>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.paymentTerms || 'Pagamento dovuto al ricevimento.'}</p>
        </div>

        <div style={{...styles.section, marginTop: '50px', textAlign: 'center', fontSize: '10pt', color: '#718096'}}>
            <p>In caso di ritardo nel pagamento, verrà applicato un indennizzo forfettario di 40 € per le spese di recupero.
            <br/>Grazie per la vostra fiducia.</p>
        </div>
    </DocumentWrapper>
  );
};
