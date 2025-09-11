
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanContractForm } from './doc-forms/loan-contract-form';
import { FeeInvoiceForm } from './doc-forms/fee-invoice-form';
import { SolvencyCertificateForm } from './doc-forms/solvency-cert-form';
import { GuaranteeAgreementForm } from './doc-forms/guarantee-agreement-form';
import { DebtAcknowledgementForm } from './doc-forms/debt-ack-form';
import { InsuranceCertificateForm } from './doc-forms/insurance-cert-form';

const documentTypes = [
  { value: 'feeInvoice', label: 'Facture Frais' },
  { value: 'solvencyCert', label: 'Certif. Solvabilité' },
  { value: 'loanContract', label: 'Contrat de Prêt' },
  { value: 'guaranteeAgreement', label: 'Acte Cautionnement' },
  { value: 'debtAcknowledgement', label: 'Reconn. de Dette' },
  { value: 'insuranceCert', label: 'Attest. Assurance' },
];

interface DocumentGeneratorProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onFormChange: (data: any) => void;
}

export function DocumentGenerator({ activeTab, setActiveTab, onFormChange }: DocumentGeneratorProps) {
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
        {documentTypes.map(doc => (
          <TabsTrigger key={doc.value} value={doc.value} className="text-xs md:text-sm">{doc.label}</TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="feeInvoice">
        <FeeInvoiceForm onFormChange={onFormChange} />
      </TabsContent>
      <TabsContent value="solvencyCert">
        <SolvencyCertificateForm onFormChange={onFormChange} />
      </TabsContent>
      <TabsContent value="loanContract">
        <LoanContractForm onFormChange={onFormChange} />
      </TabsContent>
      <TabsContent value="guaranteeAgreement">
        <GuaranteeAgreementForm onFormChange={onFormChange} />
      </TabsContent>
       <TabsContent value="debtAcknowledgement">
        <DebtAcknowledgementForm onFormChange={onFormChange} />
      </TabsContent>
      <TabsContent value="insuranceCert">
        <InsuranceCertificateForm onFormChange={onFormChange} />
      </TabsContent>
    </Tabs>
  );
}
