
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface LoanContractDataPt {
  contractNumber: string;
  contractDate: string;
  borrowerName: string;
  borrowerAddress: string;
  borrowerIdNumber: string;
  loanType: string;
  loanAmount: number;
  loanAmountInWords: string;
  interestRate: number;
  loanTerm: number;
  repaymentStartDate: string;
  repaymentEndDate: string;
  monthlyPayment: number;
  totalCreditCost: number;
  totalAmountDue: number;
}

interface LoanContractTemplatePtProps {
  data: LoanContractDataPt;
}

export const LoanContractTemplatePt: React.FC<LoanContractTemplatePtProps> = ({ data }) => {
    const signer = teamMembers[1]; // Isabelle Dubois
  return (
    <DocumentWrapper 
        title={`Contrato de ${data.loanType || '[Tipo de Crédito]'}`}
        subHeader="Serviço Financeiro Europeu • Departamento de Crédito ao Consumo • Gabinete de Acordos de Crédito • Unidade de Verificação de Compromissos"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Contrato N.º:</strong> {data.contractNumber || '[Número do Contrato]'}</p>
            <p><strong>Celebrado em Paris, em</strong> {formatDate(data.contractDate)}</p>
        </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Entre os abaixo assinados:</h2>
        <p><strong style={styles.label}>O Mutuante:</strong> VylsCapital, sociedade intermediária, com sede social em 123 Rue de la Finance, 75001 Paris, doravante designada "O Mutuante".</p>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong style={styles.label}>O Mutuário:</strong> {data.borrowerName || '[Nome do Mutuário]'}</p>
            <p>Residente em {data.borrowerAddress || '[Endereço do Mutuário]'}</p>
            <p>N.º de Identificação: {data.borrowerIdNumber || '[Número de Identificação]'}</p>
            <p>doravante designado "O Mutuário".</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 1: Objeto do Contrato</h2>
        <p>O Mutuante concede ao Mutuário, que aceita, um {data.loanType || '[Tipo de Crédito]'} amortizável para uso não profissional, regido pelas disposições do Código do Consumidor e pelas presentes condições gerais e particulares.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 2: Montante e Características do Crédito</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px'}}>
            <p><strong style={styles.label}>Montante do capital mutuado:</strong><br/>{formatCurrency(data.loanAmount || 0)} ({data.loanAmountInWords || '[Montante por extenso]'} euros).</p>
            <p><strong style={styles.label}>Taxa Anual de Encargos Efetiva Global (TAEG) fixa:</strong><br/>{data.interestRate || 0}%.</p>
            <p><strong style={styles.label}>Prazo total de reembolso:</strong><br/>{data.loanTerm || 0} meses.</p>
            <p><strong style={styles.label}>Data de disponibilização dos fundos:</strong><br/>No máximo, 8 dias após o termo do prazo de retratação.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 3: Modalidades de Reembolso</h2>
        <p>O Mutuário compromete-se a reembolsar o capital e os juros em {data.loanTerm || 0} prestações mensais constantes. A primeira prestação vencer-se-á em {formatDate(data.repaymentStartDate)} e a última em {formatDate(data.repaymentEndDate)}.</p>
        <p style={{marginTop: '10px'}}><strong style={styles.label}>Prestação mensal (excluindo seguro):</strong> {formatCurrency(data.monthlyPayment || 0)}. Este valor será debitado no dia 5 de cada mês.</p>
        <p><strong style={styles.label}>Custo total do crédito (juros):</strong> {formatCurrency(data.totalCreditCost || 0)}</p>
        <p><strong style={styles.label}>Montante total em dívida:</strong> {formatCurrency(data.totalAmountDue || 0)} (Capital mutuado + custo total dos juros).</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 4: Direito de Retratação</h2>
        <p>O Mutuário dispõe de um prazo de retratação de catorze (14) dias de calendário a contar da data de assinatura da oferta de contrato de crédito. Para exercer o direito de retratação, o Mutuário deve enviar o formulário de retratação anexo à oferta por carta registada com aviso de receção.</p>
      </div>
      
       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 5: Incumprimento de Pagamento</h2>
        <p>Em caso de falta de pagamento de uma prestação na data de vencimento, o Mutuante poderá exigir o reembolso imediato do capital em dívida, acrescido dos juros vencidos e não pagos. Poderão ser aplicadas penalidades por atraso, de acordo com a legislação em vigor.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 6: Seguro de Mutuário Obrigatório</h2>
        <p>A concessão deste empréstimo está condicionada à subscrição prévia pelo Mutuário de um seguro que cubra os riscos de Morte, Perda Total e Irreversível de Autonomia (PTIA) e Incapacidade para o Trabalho (IT). O Mutuário reconhece ter recebido, lido e aceite as condições deste seguro, que são objeto de um certificado de seguro separado fornecido pela VylsCapital ou pelos seus parceiros seguradores antes da assinatura deste contrato.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 7: Proteção de Dados Pessoais</h2>
        <p>As informações recolhidas são necessárias para o processamento do pedido de crédito. São tratadas eletronicamente e destinam-se aos serviços do Mutuante e dos seus parceiros. Em conformidade com o RGPD, o Mutuário tem o direito de aceder, retificar e eliminar os seus dados pessoais contactando o Mutuante através do email contact@vylscapital.com.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 8: Lei Aplicável e Litígios</h2>
        <p>O presente contrato está sujeito à lei francesa. Em caso de litígio, as partes comprometem-se a procurar uma solução amigável. Na sua falta, o tribunal competente será o do local de domicílio do Mutuário.</p>
      </div>

      <div style={{ ...styles.section, textAlign: 'center', marginTop: '30px' }}>
          <p>Feito em dois exemplares originais, um para cada parte.</p>
      </div>

      <div style={styles.signatureSection}>
        <div style={styles.signatureBox}>
          <img src={signer.signatureUrl} alt={`Assinatura de ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Assinatura do Mutuante (VylsCapital)</p>
          <p>{signer.name}, {signer.role}</p>
        </div>
        <div style={styles.signatureBox}>
          <div style={styles.signatureLine}></div>
          <p style={styles.label}>Assinatura do Mutuário</p>
          <p style={{fontSize: '9pt', color: '#777', fontStyle: 'italic'}}>(Precedido da menção "Li e aprovo")</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
