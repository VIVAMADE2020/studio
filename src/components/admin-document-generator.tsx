
"use client";

import React, { useState } from 'react';
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
    children: (activeTab: string, formData: any) => React.ReactNode;
}

export function DocumentGenerator({ children }: DocumentGeneratorProps) {
  const [activeTab, setActiveTab] = useState(documentTypes[0].value);
  const [formData, setFormData] = useState<any>({});
  
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-3 h-auto">
                {documentTypes.map(doc => (
                <TabsTrigger key={doc.value} value={doc.value} className="text-xs md:text-sm">{doc.label}</TabsTrigger>
                ))}
            </TabsList>
            
            <TabsContent value="feeInvoice"><FeeInvoiceForm setFormData={setFormData} /></TabsContent>
            <TabsContent value="solvencyCert"><SolvencyCertificateForm setFormData={setFormData} /></TabsContent>
            <TabsContent value="loanContract"><LoanContractForm setFormData={setFormData} /></TabsContent>
            <TabsContent value="guaranteeAgreement"><GuaranteeAgreementForm setFormData={setFormData} /></TabsContent>
            <TabsContent value="debtAcknowledgement"><DebtAcknowledgementForm setFormData={setFormData} /></TabsContent>
            <TabsContent value="insuranceCert"><InsuranceCertificateForm setFormData={setFormData} /></TabsContent>
            </Tabs>
        </div>
        <div>
            {children(activeTab, formData)}
        </div>
    </div>
  );
}
