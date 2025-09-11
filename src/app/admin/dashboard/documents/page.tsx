
"use client";

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
  { value: 'feeInvoice', label: 'Facture Frais', component: FeeInvoiceTemplate },
  { value: 'solvencyCert', label: 'Certif. Solvabilité', component: SolvencyCertificateTemplate },
  { value: 'loanContract', label: 'Contrat de Prêt', component: LoanContractTemplate },
  { value: 'guaranteeAgreement', label: 'Acte Cautionnement', component: GuaranteeAgreementTemplate },
  { value: 'debtAcknowledgement', label: 'Reconn. de Dette', component: DebtAcknowledgementTemplate },
  { value: 'insuranceCert', label: 'Attest. Assurance', component: InsuranceCertificateTemplate },
];

export default function AdminDocumentsPage() {
    return (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card>
                <CardHeader>
                    <CardTitle>Générateur de Documents</CardTitle>
                    <CardDescription>Sélectionnez un type de document, remplissez les informations et téléchargez le PDF.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DocumentGenerator>
                        {(activeTab, formData) => (
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Aperçu en direct</CardTitle>
                                    <CardDescription>Le document se met à jour en temps réel.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[70vh] w-full rounded-md border bg-secondary/50 p-2">
                                        <div id="pdf-preview" className="bg-white shadow-lg mx-auto">
                                            {(() => {
                                                const doc = documentTypes.find(d => d.value === activeTab);
                                                if (!doc) return <p>Sélectionnez un document pour voir l'aperçu.</p>;
                                                
                                                const PreviewComponent = doc.component;
                                                return <PreviewComponent data={formData as any} />;
                                            })()}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        )}
                    </DocumentGenerator>
                </CardContent>
            </Card>
        </div>
    );
}
