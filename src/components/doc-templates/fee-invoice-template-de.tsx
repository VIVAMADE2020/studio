
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface FeeInvoiceDataDe {
  invoiceNumber: string;
  invoiceDate: string;
  clientName: string;
  clientAddress: string;
  serviceDescription: string;
  amount: number;
  paymentTerms: string;
}

interface FeeInvoiceTemplateDeProps {
  data: FeeInvoiceDataDe;
}

export const FeeInvoiceTemplateDe: React.FC<FeeInvoiceTemplateDeProps> = ({ data }) => {
  const totalAmount = data.amount || 0;
  return (
    <DocumentWrapper title="Rechnung">
      <div style={styles.section}>
        <table style={{ width: '100%', border: 'none' }}>
            <tbody>
                <tr>
                    <td style={{ width: '50%', verticalAlign: 'top', paddingRight: '20px' }}>
                        <p style={{...styles.sectionTitle, border: 'none', padding: 0, margin: 0, marginBottom: '10px' }}>Rechnung an:</p>
                        <p style={{margin: 0, fontWeight: 'bold'}}>{data.clientName || '[Kundenname]'}</p>
                        <p style={{margin: 0, whiteSpace: 'pre-wrap'}}>{data.clientAddress || '[Kundenadresse]'}</p>
                    </td>
                    <td style={{ width: '50%', textAlign: 'right', verticalAlign: 'top' }}>
                        <p><strong>Rechnungsnr.:</strong> {data.invoiceNumber || '[Rechnungsnummer]'}</p>
                        <p><strong>Datum:</strong> {formatDate(data.invoiceDate)}</p>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Beschreibung</th>
                    <th style={{...styles.th, textAlign: 'right', width: '150px'}}>Zwischensumme</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={styles.td}>{data.serviceDescription || 'Dienstleistung'}</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(totalAmount)}</td>
                </tr>
            </tbody>
            <tfoot>
                 <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '8px'}}>Zwischensumme</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(totalAmount)}</td>
                </tr>
                 <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '8px'}}>MwSt. (0%)</td>
                    <td style={{...styles.td, textAlign: 'right'}}>{formatCurrency(0)}</td>
                </tr>
                <tr>
                    <td style={{...styles.td, border: 'none', textAlign: 'right', fontWeight: 'bold', padding: '15px 8px', fontSize: '12pt'}}>Gesamtbetrag</td>
                    <td style={{...styles.td, textAlign: 'right', fontWeight: 'bold', fontSize: '14pt', backgroundColor: '#f9f9f9'}}>{formatCurrency(totalAmount)}</td>
                </tr>
            </tfoot>
        </table>
      </div>

        <div style={{ ...styles.section, marginTop: '40px' }}>
            <h2 style={styles.sectionTitle}>Zahlungsbedingungen</h2>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.paymentTerms || 'Zahlung bei Erhalt fällig.'}</p>
        </div>

        <div style={{...styles.section, marginTop: '50px', textAlign: 'center', fontSize: '10pt', color: '#718096'}}>
            <p>Bei Zahlungsverzug wird eine pauschale Entschädigung von 40 € für Beitreibungskosten erhoben.
            <br/>Vielen Dank für Ihr Vertrauen.</p>
        </div>
    </DocumentWrapper>
  );
};
