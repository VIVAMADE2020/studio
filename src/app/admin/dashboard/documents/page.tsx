
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentGenerator } from "@/components/admin-document-generator";
import { FeeInvoiceTemplate, FeeInvoiceData } from "@/components/doc-templates/fee-invoice-template";
import { SolvencyCertificateTemplate, SolvencyCertificateData } from "@/components/doc-templates/solvency-cert-template";
import { LoanContractTemplate, LoanContractData } from "@/components/doc-templates/loan-contract-template";
import { GuaranteeAgreementTemplate, GuaranteeAgreementData } from "@/components/doc-templates/guarantee-agreement-template";
import { DebtAcknowledgementTemplate, DebtAcknowledgementData } from "@/components/doc-templates/debt-ack-template";
import { InsuranceCertificateTemplate, InsuranceCertificateData } from "@/components/doc-templates/insurance-cert-template";
import { ScrollArea } from "@/components/ui/scroll-area";

const documentTypes = [
  { value: 'feeInvoice', label: 'Facture Frais' },
  { value: 'solvencyCert', label: 'Certif. Solvabilité' },
  { value: 'loanContract', label: 'Contrat de Prêt' },
  { value: 'guaranteeAgreement', label: 'Acte Cautionnement' },
  { value: 'debtAcknowledgement', label: 'Reconn. de Dette' },
  { value: 'insuranceCert', label: 'Attest. Assurance' },
];

export default function AdminDocumentsPage() {
    const [activeTab, setActiveTab] = useState(documentTypes[0].value);
    const [formData, setFormData] = useState<any>({});

    const renderPreview = () => {
        switch(activeTab) {
            case 'feeInvoice':
                return <FeeInvoiceTemplate data={formData as FeeInvoiceData} />;
            case 'solvencyCert':
                return <SolvencyCertificateTemplate data={formData as SolvencyCertificateData} />;
            case 'loanContract':
                return <LoanContractTemplate data={formData as LoanContractData} />;
            case 'guaranteeAgreement':
                return <GuaranteeAgreementTemplate data={formData as GuaranteeAgreementData} />;
            case 'debtAcknowledgement':
                return <DebtAcknowledgementTemplate data={formData as DebtAcknowledgementData} />;
            case 'insuranceCert':
                return <InsuranceCertificateTemplate data={formData as InsuranceCertificateData} />;
            default:
                return <p>Sélectionnez un document pour voir l'aperçu.</p>;
        }
    };
    
    return (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card>
                <CardHeader>
                    <CardTitle>Générateur de Documents</CardTitle>
                    <CardDescription>Sélectionnez un type de document, remplissez les informations et téléchargez le PDF.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DocumentGenerator 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab} 
                        onFormChange={setFormData}
                    />
                </CardContent>
            </Card>
            
            <Card className="sticky top-24">
                 <CardHeader>
                    <CardTitle>Aperçu en direct</CardTitle>
                    <CardDescription>Le document se met à jour en temps réel.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ScrollArea className="h-[70vh] w-full rounded-md border bg-secondary/50 p-2">
                     <div id="pdf-preview" className="bg-white shadow-lg mx-auto">
                        {renderPreview()}
                     </div>
                   </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
