
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface InsuranceCertificateDataPt {
  certNumber: string;
  certDate: string;
  insuredName: string;
  insuredDob: string;
  insuredAddress: string;
  insuredIdNumber: string;
  contractNumber: string;
  loanType: string;
  loanAmount: number;
  coverageDuration: number;
  monthlyPremium: number;
  groupPolicyNumber: string;
}

interface InsuranceCertificateTemplatePtProps {
  data: InsuranceCertificateDataPt;
}

export const InsuranceCertificateTemplatePt: React.FC<InsuranceCertificateTemplatePtProps> = ({ data }) => {
  const signer = teamMembers[3]; // Juliette Lambert

  return (
    <DocumentWrapper 
        title={`Certificado de Seguro de Mutuário para um ${data.loanType || '[Tipo de Crédito]'}`}
        subHeader="Departamento de Seguros • Serviço de Adesões • Unidade de Certificação de Garantias do Mutuário"
    >
      <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
        <p><strong>Certificado N.º:</strong> {data.certNumber || '[Número do Certificado]'}</p>
        <p><strong>Data de Emissão:</strong> {formatDate(data.certDate)}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>O Segurado:</h2>
         <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Nome Completo:</strong> {data.insuredName || '[Nome do Segurado]'}</p>
            <p><strong>Data de Nascimento:</strong> {formatDate(data.insuredDob)}</p>
            <p><strong>Endereço:</strong> {data.insuredAddress || '[Endereço do Segurado]'}</p>
            <p><strong>N.º do Documento de Identificação:</strong> {data.insuredIdNumber || '[Número de Identificação]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>O Beneficiário:</h2>
        <p>A instituição de crédito parceira da FLEXFOND, para o contrato de empréstimo N.º {data.contractNumber || '[Número do Contrato]'}.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Objeto do Certificado</h2>
        <p>Nós, os abaixo assinados, agindo em nome do nosso parceiro segurador, certificamos pelo presente que a pessoa segurada acima mencionada está coberta pelo contrato de seguro de grupo <strong>N.º {data.groupPolicyNumber || '[Número da Apólice]'}</strong>, subscrito pela FLEXFOND, no âmbito do seu empréstimo.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Detalhes do Crédito Segurado</h2>
        <ul style={{listStyleType: 'none', paddingLeft: 0}}>
            <li><strong>Natureza do Crédito:</strong> {data.loanType || '[Tipo de Crédito]'}</li>
            <li><strong>Número do Crédito Associado:</strong> {data.contractNumber || '[Número do Contrato]'}</li>
            <li><strong>Capital Segurado:</strong> {formatCurrency(data.loanAmount || 0)}</li>
            <li><strong>Duração da Cobertura do Seguro:</strong> {data.coverageDuration || 0} meses, coincidindo com a duração do empréstimo.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Garantias Aplicáveis</h2>
        <p>Sujeito aos termos, condições e exclusões estipulados na nota de informação do contrato de seguro que lhe foi entregue, o segurado beneficia das seguintes garantias:</p>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
            <li><strong>Morte:</strong> Pagamento do capital em dívida à instituição de crédito.</li>
            <li><strong>Perda Total e Irreversível de Autonomia (PTIA):</strong> Pagamento do capital em dívida à instituição de crédito.</li>
            <li><strong>Incapacidade Temporária Total para o Trabalho (ITT):</strong> Cobertura das prestações do empréstimo após um período de franquia.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Custo do Seguro</h2>
        <p><strong>Prémio de seguro mensal:</strong> {formatCurrency(data.monthlyPremium || 0)} / mês. Este montante é pago mensalmente, para além da sua prestação do empréstimo.</p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Data de Início e Validade</h2>
        <p>O presente certificado é emitido para os devidos fins. As garantias entrarão em vigor na data da libertação dos fundos do empréstimo e cessarão com o reembolso total do mesmo.</p>
      </div>

      <div style={{...styles.signatureSection, marginTop: '50px'}}>
        <div style={{...styles.signatureBox, width: '50%'}}>
            <p style={{marginBottom: '20px'}}>Emitido em Paris, em {formatDate(data.certDate)}</p>
            <img src={signer.signatureUrl} alt={`Assinatura de ${signer.name}`} style={{ width: '150px', height: 'auto', marginBottom: '-10px' }} />
            <div style={styles.signatureLine}></div>
            <p>Pela FLEXFOND,</p>
            <p>{signer.name},<br/>{signer.role}</p>
        </div>
      </div>
    </DocumentWrapper>
  );
};
