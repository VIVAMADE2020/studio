
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface GuaranteeAgreementDataPt {
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

interface GuaranteeAgreementTemplatePtProps {
  data: GuaranteeAgreementDataPt;
}

export const GuaranteeAgreementTemplatePt: React.FC<GuaranteeAgreementTemplatePtProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Contrato de Fiança Solidária para um ${data.loanType || '[Tipo de Crédito]'}`}
      subHeader="Departamento Jurídico e de Garantias • Departamento de Compromissos • Unidade de Formalização de Garantias"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Ata N.º:</strong> {data.actNumber || '[Número da ata]'}</p>
        <p><strong>Data:</strong> {formatDate(data.actDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Entre os abaixo assinados:</h2>
        <p><strong style={styles.label}>O Credor:</strong> FLEXFOND, atuando como intermediário para os seus parceiros financeiros, com sede em 123 Rue de la Finance, 75001 Paris.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>O Devedor (Mutuário):</strong></p>
            <p><strong>Nome:</strong> {data.borrowerName || '[Nome do mutuário]'}</p>
            <p><strong>Endereço:</strong> {data.borrowerAddress || '[Endereço do mutuário]'}</p>
            <p><strong>N.º de Identificação:</strong> {data.borrowerIdNumber || '[Número de identificação]'}</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 1: Objeto do compromisso</h2>
        <p>
            Pelo presente ato, o Devedor compromete-se a pagar ao Credor as quantias devidas ao abrigo do contrato de {data.loanType || '[Tipo de crédito]'} abaixo referenciado:
        </p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Número do contrato de crédito:</strong> {data.contractNumber || '[Número do contrato]'}</li>
            <li><strong>Montante do capital:</strong> {formatCurrency(data.loanAmount || 0)} (por extenso: {data.loanAmountInWords || '[Montante por extenso]'} euros).</li>
            <li><strong>Duração do crédito:</strong> {data.loanTerm || 0} meses.</li>
        </ul>
        <p style={{marginTop: '10px'}}>O Devedor declara ter pleno conhecimento da natureza e extensão das suas obrigações.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 2: Âmbito da garantia</h2>
        <p>
          O compromisso do Devedor abrange o pagamento do capital, juros, comissões, taxas e acessórios e, de um modo geral, de todas as quantias que possam ser devidas ao abrigo do referido contrato de crédito. O compromisso é assumido pela duração total do crédito.
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 3: Solidariedade e Indivisibilidade</h2>
        <p>
          O Devedor é o único responsável pela dívida. Em caso de incumprimento, o Credor pode reclamar a totalidade da dívida ao Devedor.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 4: Menção Manuscrita Obrigatória</h2>
        <p>
            O Devedor deve escrever à mão a seguinte menção, de acordo com a lei: "Eu, {data.borrowerName || '[Nome do mutuário]'}, comprometo-me a reembolsar ao mutuante as quantias devidas com os meus rendimentos e os meus bens."
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 5: Informações devidas</h2>
        <p>
            O Credor compromete-se a informar o Devedor de qualquer alteração ao contrato.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%', textAlign: 'center'}}>
            <p>Feito em Paris, em {formatDate(data.actDate)}</p>
            <div style={{...styles.signatureLine, marginTop: '40px'}}></div>
            <p style={{...styles.label, textAlign: 'center'}}>Assinatura do Devedor</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
