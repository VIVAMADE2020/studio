
import * as React from 'react';

interface EmailTemplateProps {
  data: Record<string, any>;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  data,
}) => (
  <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
    <h1 style={{ color: '#263959' }}>Nouvelle Soumission de Formulaire</h1>
    <p>Vous avez reçu une nouvelle soumission. Voici les détails :</p>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
           <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
             <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2', width: '30%' }}>{key}</th>
             <td style={{ padding: '8px', textAlign: 'left' }}>{String(value)}</td>
           </tr>
        ))}
      </tbody>
    </table>
  </div>
);
