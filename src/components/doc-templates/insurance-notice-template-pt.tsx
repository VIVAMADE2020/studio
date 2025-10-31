
import React from 'react';
import { DocumentWrapper, styles, formatDate } from './document-wrapper';

export interface InsuranceNoticeDataPt {
  noticeDate: string;
  borrowerName: string;
  contractNumber: string;
  groupPolicyNumber: string;
  guarantees: string;
  exclusions: string;
  claimProcedure: string;
}

interface InsuranceNoticeTemplatePtProps {
  data: InsuranceNoticeDataPt;
}

const renderList = (text: string) => {
    if (!text) return null;
    return (
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
            {text.split('\n').map((item, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{item.replace(/^- /, '')}</li>
            ))}
        </ul>
    );
}

export const InsuranceNoticeTemplatePt: React.FC<InsuranceNoticeTemplatePtProps> = ({ data }) => {
  return (
    <DocumentWrapper 
      title="Nota Informativa do Seguro de Mutuário"
      subHeader={`Contrato de seguro coletivo de grupo n.º ${data.groupPolicyNumber || '[Número da Apólice]'}`}
    >
      <div style={{...styles.section, textAlign: 'right', marginBottom: '30px' }}>
        <p>Documento emitido em: {formatDate(data.noticeDate)}</p>
        <p>Destinatário: {data.borrowerName || '[Nome do Aderente]'}</p>
        <p>Relativo ao projeto de empréstimo n.º: {data.contractNumber || '[Número do Contrato]'}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>1. Objeto da presente nota</h2>
        <p>
          A presente nota tem por objetivo informá-lo sobre as condições, modalidades, garantias e exclusões do contrato de seguro coletivo subscrito pela VylsCapital junto do seu parceiro segurador, ao qual solicita a sua adesão. <strong>Convidamo-lo a lê-la atentamente antes de assinar a sua proposta de adesão e a conservá-la.</strong> É um elemento essencial da sua proteção financeira.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>2. Garantias do contrato</h2>
        <p>
          Sujeito aos termos e condições definidos no contrato, a sua adesão cobre-o contra os seguintes riscos:
        </p>
        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
          {renderList(data.guarantees)}
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>3. Principais exclusões</h2>
        <p>
          Certas situações não são cobertas pelo contrato. Estão nomeadamente excluídos da garantia:
        </p>
         <div style={{ padding: '15px', border: '1px solid #fee2e2', backgroundColor: '#fff7f7', borderRadius: '4px', marginTop: '15px' }}>
            {renderList(data.exclusions)}
            <p style={{marginTop: '15px', fontSize: '9pt', fontStyle: 'italic', color: '#777'}}>Esta lista não é exaustiva. Para o detalhe completo das exclusões, por favor, consulte as Condições Gerais do contrato de seguro que lhe serão entregues.</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>4. Formalidades de adesão e questionário de saúde</h2>
        <p>
          A sua adesão está sujeita à aceitação da seguradora, que se baseia nomeadamente nas suas respostas ao questionário de saúde. É obrigado(a) a responder de forma exata e completa a todas as questões colocadas. Qualquer declaração falsa intencional pode levar à anulação da sua adesão e à recusa da cobertura de um sinistro.
        </p>
      </div>

       <div style={styles.section}>
        <h2 style={styles.sectionTitle}>5. Procedimento em caso de sinistro</h2>
        <p>
          Se ocorrer um dos eventos garantidos, você ou os seus beneficiários devem declará-lo o mais rapidamente possível.
        </p>
         <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '15px' }}>
            <p style={{whiteSpace: 'pre-wrap'}}>{data.claimProcedure || "Procedimento não especificado."}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>6. Direito de retratação</h2>
        <p>
          Dispõe de um prazo de 30 dias corridos a contar da data de assinatura da sua proposta de adesão para renunciar à mesma, sem custos ou penalizações, por carta registada com aviso de receção.
        </p>
      </div>

      <div style={{...styles.footer, borderTop: 'none', marginTop: '30px', textAlign: 'left', fontStyle: 'italic', color: '#555'}}>
        <p>
            Esta nota informativa не substitui as Condições Gerais e Particulares do contrato de seguro, que prevalecem em caso de litígio e que lhe serão entregues no momento da sua adesão definitiva.
        </p>
      </div>
    </DocumentWrapper>
  );
};
