
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanContractForm } from '@/components/doc-forms/loan-contract-form';
import { FeeInvoiceForm } from '@/components/doc-forms/fee-invoice-form';
import { SolvencyCertificateForm } from '@/components/doc-forms/solvency-cert-form';
import { GuaranteeAgreementForm } from '@/components/doc-forms/guarantee-agreement-form';
import { DebtAcknowledgementForm } from '@/components/doc-forms/debt-ack-form';
import { InsuranceCertificateForm } from '@/components/doc-forms/insurance-cert-form';

import { FeeInvoiceTemplate } from "@/components/doc-templates/fee-invoice-template";
import { SolvencyCertificateTemplate } from "@/components/doc-templates/solvency-cert-template";
import { LoanContractTemplate } from "@/components/doc-templates/loan-contract-template";
import { GuaranteeAgreementTemplate } from "@/components/doc-templates/guarantee-agreement-template";
import { DebtAcknowledgementTemplate } from "@/components/doc-templates/debt-ack-template";
import { InsuranceCertificateTemplate } from "@/components/doc-templates/insurance-cert-template";

const documentTypes = [
  { value: 'feeInvoice', label: 'Facture Frais', FormComponent: FeeInvoiceForm, TemplateComponent: FeeInvoiceTemplate },
  { value: 'solvencyCert', label: 'Certif. Solvabilité', FormComponent: SolvencyCertificateForm, TemplateComponent: SolvencyCertificateTemplate },
  { value: 'insuranceCert', label: 'Attest. Assurance', FormComponent: InsuranceCertificateForm, TemplateComponent: InsuranceCertificateTemplate },
  { value: 'loanContract', label: 'Contrat de Prêt', FormComponent: LoanContractForm, TemplateComponent: LoanContractTemplate },
  { value: 'guaranteeAgreement', label: 'Acte Cautionnement', FormComponent: GuaranteeAgreementForm, TemplateComponent: GuaranteeAgreementTemplate },
  { value: 'debtAcknowledgement', label: 'Reconn. de Dette', FormComponent: DebtAcknowledgementForm, TemplateComponent: DebtAcknowledgementTemplate },
];

export default function AdminDocumentsPage() {
    const [activeTab, setActiveTab] = useState(documentTypes[0].value);
    const [formData, setFormData] = useState<any>({});

    const ActiveTemplate = documentTypes.find(d => d.value === activeTab)?.TemplateComponent;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Générateur de Documents</CardTitle>
                <CardDescription>Sélectionnez un type de document, remplissez les informations et téléchargez le PDF.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-3 h-auto">
                                {documentTypes.map(doc => (
                                    <TabsTrigger key={doc.value} value={doc.value} className="text-xs md:text-sm">{doc.label}</TabsTrigger>
                                ))}
                            </TabsList>
                            
                            {documentTypes.map(doc => (
                                <TabsContent key={doc.value} value={doc.value}>
                                    <doc.FormComponent setFormData={setFormData} />
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                    <div>
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Aperçu en direct</CardTitle>
                                <CardDescription>Le document se met à jour en temps réel.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[70vh] w-full rounded-md border bg-secondary/50 p-2">
                                    <div id="pdf-preview" className="bg-white shadow-lg mx-auto">
                                        {ActiveTemplate ? <ActiveTemplate data={formData as any} /> : <p>Sélectionnez un document pour voir l'aperçu.</p>}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
