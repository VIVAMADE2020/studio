
"use client";

import { useState } from 'react';
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

export function DocumentGenerator() {
  const [activeTab, setActiveTab] = useState(documentTypes[0].value);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
        {documentTypes.map(doc => (
          <TabsTrigger key={doc.value} value={doc.value} className="text-xs md:text-sm">{doc.label}</TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="feeInvoice">
        <FeeInvoiceForm />
      </TabsContent>
      <TabsContent value="solvencyCert">
        <SolvencyCertificateForm />
      </TabsContent>
      <TabsContent value="loanContract">
        <LoanContractForm />
      </TabsContent>
      <TabsContent value="guaranteeAgreement">
        <GuaranteeAgreementForm />
      </TabsContent>
       <TabsContent value="debtAcknowledgement">
        <DebtAcknowledgementForm />
      </TabsContent>
      <TabsContent value="insuranceCert">
        <InsuranceCertificateForm />
      </TabsContent>
    </Tabs>
  );
}
