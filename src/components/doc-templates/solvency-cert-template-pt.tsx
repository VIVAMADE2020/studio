
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';
import { formatCurrency } from '@/lib/utils';
import { teamMembers } from '@/data/team-data';

export interface SolvencyCertificateDataPt {
  clientName: string;
  clientAddress: string;
  clientIdNumber: string;
  accountNumber: string;
  balance: number;
  certDate: string;
}

interface SolvencyCertificateTemplatePtProps {
  data: SolvencyCertificateDataPt;
}

export const SolvencyCertificateTemplatePt: React.FC<SolvencyCertificateTemplatePtProps> = ({ data }) => {
    const expirationDate = new Date(data.certDate || new Date());
    expirationDate.setDate(expirationDate.getDate() + 30);
    const signer = teamMembers[4]; // David Moreau
    
  return (
    <DocumentWrapper 
        title="Certificado de Solvência Pré-aprovada"
        subHeader="Departamento de Análise Financeira • Unidade de Certificação de Solvência"
    >
        <div style={{...styles.section, textAlign: 'center', marginBottom: '30px'}}>
            <p><strong>Certificado N.º:</strong> {`CS-${data.accountNumber || 'XXXX'}`}</p>
            <p><strong>Válido até:</strong> {formatDate(expirationDate.toISOString())}</p>
        </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Beneficiário do certificado:</h2>
        <div style={{ margin: '15px 0', paddingLeft: '15px', borderLeft: '2px solid #eee' }}>
            <p><strong>Nome:</strong> {data.clientName || '[Nome do Beneficiário]'}</p>
            <p><strong>N.º de Identificação:</strong> {data.clientIdNumber || '[Número de Identificação]'}</p>
            <p><strong>Endereço:</strong> {data.clientAddress || '[Endereço do Beneficiário]'}</p>
            <p><strong>Titular da conta FLEXFOND N.º:</strong> {data.accountNumber || '[Número da Conta]'}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 1: Objeto do Certificado</h2>
        <p>
          A FLEXFOND, atuando como intermediária financeira, certifica por este meio ter realizado uma análise aprofundada da situação financeira do beneficiário acima mencionado. Com base nos documentos fornecidos e nas verificações efetuadas, o beneficiário é considerado elegível para um financiamento até um montante máximo de:
        </p>
         <p style={{ fontSize: '16pt', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          {formatCurrency(data.balance || 0)}
        </p>
         <p>
          Este montante foi estabelecido para um projeto não especificado e pode ser utilizado como prova de capacidade de financiamento em etapas preliminares (ex: assinatura de um contrato-promessa de compra e venda, negociação comercial).
        </p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 2: Âmbito e Finalização</h2>
        <p>
          Este certificado atesta a pré-aprovação do seu processo de financiamento pela FLEXFOND e constitui um documento essencial no processo de concessão do seu empréstimo. Testemunha o sucesso da análise da sua solvência.
        </p>
        <p>
          O passo final para a libertação dos fundos será a assinatura do <strong>contrato de empréstimo oficial</strong>, que formalizará todas as condições e o plano de reembolso. A FLEXFOND compromete-se a acompanhá-lo neste último passo.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Artigo 3: Validade</h2>
        <p>
          O presente certificado é válido por 30 dias corridos a partir da data de emissão, ou seja, até {formatDate(expirationDate.toISOString())}. Este período garante a relevância das condições analisadas. Após este prazo, será necessária uma simples atualização para confirmar a manutenção da sua elegibilidade.
        </p>
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
