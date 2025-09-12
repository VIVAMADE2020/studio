
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
import { InsuranceNoticeForm } from "@/components/doc-forms/insurance-notice-form";
import { BlankDocumentForm } from "@/components/doc-forms/blank-doc-form";
import { FeeInvoiceFormEn } from "@/components/doc-forms/fee-invoice-form-en";
import { FeeInvoiceFormEs } from "@/components/doc-forms/fee-invoice-form-es";
import { FeeInvoiceFormDe } from "@/components/doc-forms/fee-invoice-form-de";
import { FeeInvoiceFormPt } from "@/components/doc-forms/fee-invoice-form-pt";
import { FeeInvoiceFormIt } from "@/components/doc-forms/fee-invoice-form-it";

import { FeeInvoiceTemplate } from "@/components/doc-templates/fee-invoice-template";
import { SolvencyCertificateTemplate } from "@/components/doc-templates/solvency-cert-template";
import { LoanContractTemplate } from "@/components/doc-templates/loan-contract-template";
import { GuaranteeAgreementTemplate } from "@/components/doc-templates/guarantee-agreement-template";
import { DebtAcknowledgementTemplate } from "@/components/doc-templates/debt-ack-template";
import { InsuranceCertificateTemplate } from "@/components/doc-templates/insurance-cert-template";
import { InsuranceNoticeTemplate } from "@/components/doc-templates/insurance-notice-template";
import { BlankDocumentTemplate } from "@/components/doc-templates/blank-doc-template";
import { FeeInvoiceTemplateEn } from "@/components/doc-templates/fee-invoice-template-en";
import { FeeInvoiceTemplateEs } from "@/components/doc-templates/fee-invoice-template-es";
import { FeeInvoiceTemplateDe } from "@/components/doc-templates/fee-invoice-template-de";
import { FeeInvoiceTemplatePt } from "@/components/doc-templates/fee-invoice-template-pt";
import { FeeInvoiceTemplateIt } from "@/components/doc-templates/fee-invoice-template-it";

import { SolvencyCertificateFormEn } from "@/components/doc-forms/solvency-cert-form-en";
import { SolvencyCertificateTemplateEn } from "@/components/doc-templates/solvency-cert-template-en";
import { SolvencyCertificateFormEs } from "@/components/doc-forms/solvency-cert-form-es";
import { SolvencyCertificateTemplateEs } from "@/components/doc-templates/solvency-cert-template-es";
import { SolvencyCertificateFormDe } from "@/components/doc-forms/solvency-cert-form-de";
import { SolvencyCertificateTemplateDe } from "@/components/doc-templates/solvency-cert-template-de";
import { SolvencyCertificateFormPt } from "@/components/doc-forms/solvency-cert-form-pt";
import { SolvencyCertificateTemplatePt } from "@/components/doc-templates/solvency-cert-template-pt";
import { SolvencyCertificateFormIt } from "@/components/doc-forms/solvency-cert-form-it";
import { SolvencyCertificateTemplateIt } from "@/components/doc-templates/solvency-cert-template-it";

import { InsuranceNoticeFormEn } from "@/components/doc-forms/insurance-notice-form-en";
import { InsuranceNoticeTemplateEn } from "@/components/doc-templates/insurance-notice-template-en";
import { InsuranceNoticeFormEs } from "@/components/doc-forms/insurance-notice-form-es";
import { InsuranceNoticeTemplateEs } from "@/components/doc-templates/insurance-notice-template-es";
import { InsuranceNoticeFormDe } from "@/components/doc-forms/insurance-notice-form-de";
import { InsuranceNoticeTemplateDe } from "@/components/doc-templates/insurance-notice-template-de";
import { InsuranceNoticeFormPt } from "@/components/doc-forms/insurance-notice-form-pt";
import { InsuranceNoticeTemplatePt } from "@/components/doc-templates/insurance-notice-template-pt";
import { InsuranceNoticeFormIt } from "@/components/doc-forms/insurance-notice-form-it";
import { InsuranceNoticeTemplateIt } from "@/components/doc-templates/insurance-notice-template-it";

import { InsuranceCertificateFormEn } from "@/components/doc-forms/insurance-cert-form-en";
import { InsuranceCertificateTemplateEn } from "@/components/doc-templates/insurance-cert-template-en";
import { InsuranceCertificateFormEs } from "@/components/doc-forms/insurance-cert-form-es";
import { InsuranceCertificateTemplateEs } from "@/components/doc-templates/insurance-cert-template-es";
import { InsuranceCertificateFormDe } from "@/components/doc-forms/insurance-cert-form-de";
import { InsuranceCertificateTemplateDe } from "@/components/doc-templates/insurance-cert-template-de";
import { InsuranceCertificateFormPt } from "@/components/doc-forms/insurance-cert-form-pt";
import { InsuranceCertificateTemplatePt } from "@/components/doc-templates/insurance-cert-template-pt";
import { InsuranceCertificateFormIt } from "@/components/doc-forms/insurance-cert-form-it";
import { InsuranceCertificateTemplateIt } from "@/components/doc-templates/insurance-cert-template-it";

import { LoanContractFormEn } from "@/components/doc-forms/loan-contract-form-en";
import { LoanContractTemplateEn } from "@/components/doc-templates/loan-contract-template-en";
import { LoanContractFormEs } from "@/components/doc-forms/loan-contract-form-es";
import { LoanContractTemplateEs } from "@/components/doc-templates/loan-contract-template-es";
import { LoanContractFormDe } from "@/components/doc-forms/loan-contract-form-de";
import { LoanContractTemplateDe } from "@/components/doc-templates/loan-contract-template-de";
import { LoanContractFormPt } from "@/components/doc-forms/loan-contract-form-pt";
import { LoanContractTemplatePt } from "@/components/doc-templates/loan-contract-template-pt";
import { LoanContractFormIt } from "@/components/doc-forms/loan-contract-form-it";
import { LoanContractTemplateIt } from "@/components/doc-templates/loan-contract-template-it";

import { GuaranteeAgreementFormEn } from "@/components/doc-forms/guarantee-agreement-form-en";
import { GuaranteeAgreementTemplateEn } from "@/components/doc-templates/guarantee-agreement-template-en";
import { GuaranteeAgreementFormEs } from "@/components/doc-forms/guarantee-agreement-form-es";
import { GuaranteeAgreementTemplateEs } from "@/components/doc-templates/guarantee-agreement-template-es";
import { GuaranteeAgreementFormDe } from "@/components/doc-forms/guarantee-agreement-form-de";
import { GuaranteeAgreementTemplateDe } from "@/components/doc-templates/guarantee-agreement-template-de";
import { GuaranteeAgreementFormPt } from "@/components/doc-forms/guarantee-agreement-form-pt";
import { GuaranteeAgreementTemplatePt } from "@/components/doc-templates/guarantee-agreement-template-pt";
import { GuaranteeAgreementFormIt } from "@/components/doc-forms/guarantee-agreement-form-it";
import { GuaranteeAgreementTemplateIt } from "@/components/doc-templates/guarantee-agreement-template-it";

import { DebtAcknowledgementFormEn } from "@/components/doc-forms/debt-ack-form-en";
import { DebtAcknowledgementTemplateEn } from "@/components/doc-templates/debt-ack-template-en";
import { DebtAcknowledgementFormEs } from "@/components/doc-forms/debt-ack-form-es";
import { DebtAcknowledgementTemplateEs } from "@/components/doc-templates/debt-ack-template-es";
import { DebtAcknowledgementFormDe } from "@/components/doc-forms/debt-ack-form-de";
import { DebtAcknowledgementTemplateDe } from "@/components/doc-templates/debt-ack-template-de";
import { DebtAcknowledgementFormPt } from "@/components/doc-forms/debt-ack-form-pt";
import { DebtAcknowledgementTemplatePt } from "@/components/doc-templates/debt-ack-template-pt";
import { DebtAcknowledgementFormIt } from "@/components/doc-forms/debt-ack-form-it";
import { DebtAcknowledgementTemplateIt } from "@/components/doc-templates/debt-ack-template-it";

const documentTypes = [
  { value: 'blankDocument', label: 'Document Vierge', FormComponent: BlankDocumentForm, TemplateComponent: BlankDocumentTemplate },
  
  { value: 'feeInvoice', label: 'Facture Frais (FR)', FormComponent: FeeInvoiceForm, TemplateComponent: FeeInvoiceTemplate },
  { value: 'feeInvoiceEn', label: 'Fee Invoice (EN)', FormComponent: FeeInvoiceFormEn, TemplateComponent: FeeInvoiceTemplateEn },
  { value: 'feeInvoiceEs', label: 'Factura (ES)', FormComponent: FeeInvoiceFormEs, TemplateComponent: FeeInvoiceTemplateEs },
  { value: 'feeInvoiceDe', label: 'Rechnung (DE)', FormComponent: FeeInvoiceFormDe, TemplateComponent: FeeInvoiceTemplateDe },
  { value: 'feeInvoicePt', label: 'Fatura (PT)', FormComponent: FeeInvoiceFormPt, TemplateComponent: FeeInvoiceTemplatePt },
  { value: 'feeInvoiceIt', label: 'Fattura (IT)', FormComponent: FeeInvoiceFormIt, TemplateComponent: FeeInvoiceTemplateIt },
  
  { value: 'solvencyCert', label: 'Certif. Solvabilité (FR)', FormComponent: SolvencyCertificateForm, TemplateComponent: SolvencyCertificateTemplate },
  { value: 'solvencyCertEn', label: 'Solvency Cert. (EN)', FormComponent: SolvencyCertificateFormEn, TemplateComponent: SolvencyCertificateTemplateEn },
  { value: 'solvencyCertEs', label: 'Cert. Solvencia (ES)', FormComponent: SolvencyCertificateFormEs, TemplateComponent: SolvencyCertificateTemplateEs },
  { value: 'solvencyCertDe', label: 'Bonitätszert. (DE)', FormComponent: SolvencyCertificateFormDe, TemplateComponent: SolvencyCertificateTemplateDe },
  { value: 'solvencyCertPt', label: 'Cert. Solvência (PT)', FormComponent: SolvencyCertificateFormPt, TemplateComponent: SolvencyCertificateTemplatePt },
  { value: 'solvencyCertIt', label: 'Cert. Solvibilità (IT)', FormComponent: SolvencyCertificateFormIt, TemplateComponent: SolvencyCertificateTemplateIt },
  
  { value: 'insuranceNotice', label: 'Notice Assurance (FR)', FormComponent: InsuranceNoticeForm, TemplateComponent: InsuranceNoticeTemplate },
  { value: 'insuranceNoticeEn', label: 'Insurance Notice (EN)', FormComponent: InsuranceNoticeFormEn, TemplateComponent: InsuranceNoticeTemplateEn },
  { value: 'insuranceNoticeEs', label: 'Noticia Seguro (ES)', FormComponent: InsuranceNoticeFormEs, TemplateComponent: InsuranceNoticeTemplateEs },
  { value: 'insuranceNoticeDe', label: 'Vers.-Info (DE)', FormComponent: InsuranceNoticeFormDe, TemplateComponent: InsuranceNoticeTemplateDe },
  { value: 'insuranceNoticePt', label: 'Aviso de Seguro (PT)', FormComponent: InsuranceNoticeFormPt, TemplateComponent: InsuranceNoticeTemplatePt },
  { value: 'insuranceNoticeIt', label: 'Avviso Assic. (IT)', FormComponent: InsuranceNoticeFormIt, TemplateComponent: InsuranceNoticeTemplateIt },

  { value: 'insuranceCert', label: 'Attest. Assurance (FR)', FormComponent: InsuranceCertificateForm, TemplateComponent: InsuranceCertificateTemplate },
  { value: 'insuranceCertEn', label: 'Insurance Cert. (EN)', FormComponent: InsuranceCertificateFormEn, TemplateComponent: InsuranceCertificateTemplateEn },
  { value: 'insuranceCertEs', label: 'Cert. Seguro (ES)', FormComponent: InsuranceCertificateFormEs, TemplateComponent: InsuranceCertificateTemplateEs },
  { value: 'insuranceCertDe', label: 'Vers.-Bestät. (DE)', FormComponent: InsuranceCertificateFormDe, TemplateComponent: InsuranceCertificateTemplateDe },
  { value: 'insuranceCertPt', label: 'Cert. Seguro (PT)', FormComponent: InsuranceCertificateFormPt, TemplateComponent: InsuranceCertificateTemplatePt },
  { value: 'insuranceCertIt', label: 'Cert. Assic. (IT)', FormComponent: InsuranceCertificateFormIt, TemplateComponent: InsuranceCertificateTemplateIt },

  { value: 'loanContract', label: 'Contrat de Prêt (FR)', FormComponent: LoanContractForm, TemplateComponent: LoanContractTemplate },
  { value: 'loanContractEn', label: 'Loan Agreement (EN)', FormComponent: LoanContractFormEn, TemplateComponent: LoanContractTemplateEn },
  { value: 'loanContractEs', label: 'Contrato Préstamo (ES)', FormComponent: LoanContractFormEs, TemplateComponent: LoanContractTemplateEs },
  { value: 'loanContractDe', label: 'Kreditvertrag (DE)', FormComponent: LoanContractFormDe, TemplateComponent: LoanContractTemplateDe },
  { value: 'loanContractPt', label: 'Contrato Crédito (PT)', FormComponent: LoanContractFormPt, TemplateComponent: LoanContractTemplatePt },
  { value: 'loanContractIt', label: 'Contratto Prestito (IT)', FormComponent: LoanContractFormIt, TemplateComponent: LoanContractTemplateIt },

  { value: 'guaranteeAgreement', label: 'Acte Caution (FR)', FormComponent: GuaranteeAgreementForm, TemplateComponent: GuaranteeAgreementTemplate },
  { value:g value: 'guaranteeAgreementEn', label: 'Guarantee Agmt. (EN)', FormComponent: GuaranteeAgreementFormEn, TemplateComponent: GuaranteeAgreementTemplateEn },
  { value: 'guaranteeAgreementEs', label: 'Acuerdo Garantía (ES)', FormComponent: GuaranteeAgreementFormEs, TemplateComponent: GuaranteeAgreementTemplateEs },
  { value: 'guaranteeAgreementDe', label: 'Bürgschaft (DE)', FormComponent: GuaranteeAgreementFormDe, TemplateComponent: GuaranteeAgreementTemplateDe },
  { value: 'guaranteeAgreementPt', label: 'Acordo Garantia (PT)', FormComponent: GuaranteeAgreementFormPt, TemplateComponent: GuaranteeAgreementTemplatePt },
  { value: 'guaranteeAgreementIt', label: 'Atto Fideiussione (IT)', FormComponent: GuaranteeAgreementFormIt, TemplateComponent: GuaranteeAgreementTemplateIt },

  { value: 'debtAcknowledgement', label: 'Reconn. de Dette (FR)', FormComponent: DebtAcknowledgementForm, TemplateComponent: DebtAcknowledgementTemplate },
  { value: 'debtAcknowledgementEn', label: 'Debt Ack. (EN)', FormComponent: DebtAcknowledgementFormEn, TemplateComponent: DebtAcknowledgementTemplateEn },
  { value: 'debtAcknowledgementEs', label: 'Recon. Deuda (ES)', FormComponent: DebtAcknowledgementFormEs, TemplateComponent: DebtAcknowledgementTemplateEs },
  { value: 'debtAcknowledgementDe', label: 'Schuldanerk. (DE)', FormComponent: DebtAcknowledgementFormDe, TemplateComponent: DebtAcknowledgementTemplateDe },
  { value: 'debtAcknowledgementPt', label: 'Recon. Dívida (PT)', FormComponent: DebtAcknowledgementFormPt, TemplateComponent: DebtAcknowledgementTemplatePt },
  { value: 'debtAcknowledgementIt', label: 'Ricon. Debito (IT)', FormComponent: DebtAcknowledgementFormIt, TemplateComponent: DebtAcknowledgementTemplateIt },
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
                            <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-5 h-auto">
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
