
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';

export interface DebtAcknowledgementDataPt {
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

interface DebtAcknowledgementTemplatePtProps {
  data: DebtAcknowledgementDataPt;
}

export const DebtAcknowledgementTemplatePt: React.FC<DebtAcknowledgementTemplatePtProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title={`Reconhecimento de Dívida por um ${data.loanType || '[Tipo de Crédito]'}`}
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Documento N.º:</strong> {data.docNumber || '[Número do documento]'}</p>
        <p><strong>Data:</strong> {formatDate(data.docDate)}</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Entre os abaixo assinados:</h2>
        <p><strong style={styles.label}>O Credor:</strong> FLEXFOND, atuando como intermediário para os seus parceiros financeiros, com sede em 123 Rue de la Finance, 75001 Paris.</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>O Devedor:</strong></p>
            <p><strong>Nome:</strong> {data.debtorName || '[Nome do devedor]'}</p>
            <p><strong>Endereço:</strong> {data.debtorAddress || '[Endereço do devedor]'}</p>
            <p><strong>N.º do Documento de Identificação:</strong> {data.debtorIdNumber || '[Número do documento de identificação]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 1: Reconhecimento da Dívida</h2>
        <p>
          Eu, o abaixo assinado, <strong>{data.debtorName || '[Nome do devedor]'}</strong>, residente em {data.debtorAddress || '[Endereço do devedor]'}, reconheço por este meio dever à FLEXFOND, atuando em nome dos seus parceiros financeiros, a quantia de:
        </p>
        <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Montante por extenso]'} euros)
        </p>
        <p>
          Esta quantia corresponde ao capital de um {data.loanType || '[Tipo de Crédito]'} que me foi concedido e cujos fundos recebi.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 2: Modalidades de Reembolso</h2>
        <p>
          Comprometo-me a reembolsar esta quantia na íntegra, bem como os juros e taxas associados, de acordo com o cronograma e as condições definidas no contrato de {data.loanType || '[Tipo de Crédito]'} N.º <strong>{data.contractNumber || '[Número do contrato]'}</strong> que assinei separadamente. O período de reembolso acordado é de {data.loanTerm || '[Prazo do crédito]'} meses, exceto em caso de reembolso antecipado ou incidente de pagamento que altere o cronograma.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 3: Cláusula de Incumprimento</h2>
        <p>
          Em caso de falta de pagamento de uma ou mais prestações, reconheço que o Credor poderá invocar as cláusulas previstas no contrato de empréstimo, incluindo a exigibilidade antecipada da totalidade do capital em dívida.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 4: Menção Manuscrita Obrigatória</h2>
        <p>
          O artigo L. 313-24 do Código do Consumidor estipula a importância do compromisso. O devedor reconhece ter lido e compreendido a totalidade do contrato de empréstimo a que se refere este reconhecimento de dívida.
        </p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '80px'}}>
        <div style={{...styles.signatureBox, width: '60%'}}>
          <p style={{textAlign: 'right', marginBottom: '20px'}}>Feito em Paris, em {formatDate(data.docDate)}</p>
          <div style={styles.signatureLine}></div>
          <p style={{...styles.label, textAlign: 'left'}}>Assinatura do Devedor</p>
          <p style={{textAlign: 'left', fontSize: '9pt', color: '#777', fontStyle: 'italic', marginTop: '5px'}}>
            Precedido da menção manuscrita: "Li e aprovei, bom para reconhecimento de dívida no valor de {data.loanAmountInWords || '[montante por extenso]'} euros."
          </p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
