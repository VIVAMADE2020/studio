
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
import { SolvencyCertificateFormEn } from "@/components/doc-forms/solvency-cert-form-en";
import { SolvencyCertificateFormEs } from "@/components/doc-forms/solvency-cert-form-es";
import { SolvencyCertificateFormDe } from "@/components/doc-forms/solvency-cert-form-de";
import { SolvencyCertificateFormPt } from "@/components/doc-forms/solvency-cert-form-pt";
import { SolvencyCertificateFormIt } from "@/components/doc-forms/solvency-cert-form-it";
import { InsuranceNoticeFormEn } from "@/components/doc-forms/insurance-notice-form-en";
import { InsuranceNoticeFormEs } from "@/components/doc-forms/insurance-notice-form-es";
import { InsuranceNoticeFormDe } from "@/components/doc-forms/insurance-notice-form-de";
import { InsuranceNoticeFormPt } from "@/components/doc-forms/insurance-notice-form-pt";
import { InsuranceNoticeFormIt } from "@/components/doc-forms/insurance-notice-form-it";
import { InsuranceCertificateFormEn } from "@/components/doc-forms/insurance-cert-form-en";
import { InsuranceCertificateFormEs } from "@/components/doc-forms/insurance-cert-form-es";
import { InsuranceCertificateFormDe } from "@/components/doc-forms/insurance-cert-form-de";
import { InsuranceCertificateFormPt } from "@/components/doc-forms/insurance-cert-form-pt";
import { InsuranceCertificateFormIt } from "@/components/doc-forms/insurance-cert-form-it";
import { LoanContractFormEn } from "@/components/doc-forms/loan-contract-form-en";
import { LoanContractFormEs } from "@/components/doc-forms/loan-contract-form-es";
import { LoanContractFormDe } from "@/components/doc-forms/loan-contract-form-de";
import { LoanContractFormPt } from "@/components/doc-forms/loan-contract-form-pt";
import { LoanContractFormIt } from "@/components/doc-forms/loan-contract-form-it";
import { GuaranteeAgreementFormEn } from "@/components/doc-forms/guarantee-agreement-form-en";
import { GuaranteeAgreementFormEs } from "@/components/doc-forms/guarantee-agreement-form-es";
import { GuaranteeAgreementFormDe } from "@/components/doc-forms/guarantee-agreement-form-de";
import { GuaranteeAgreementFormPt } from "@/components/doc-forms/guarantee-agreement-form-pt";
import { GuaranteeAgreementFormIt } from "@/components/doc-forms/guarantee-agreement-form-it";
import { DebtAcknowledgementFormEn } from "@/components/doc-forms/debt-ack-form-en";
import { DebtAcknowledgementFormEs } from "@/components/doc-forms/debt-ack-form-es";
import { DebtAcknowledgementFormDe } from "@/components/doc-forms/debt-ack-form-de";
import { DebtAcknowledgementFormPt } from "@/components/doc-forms/debt-ack-form-pt";
import { DebtAcknowledgementFormIt } from "@/components/doc-forms/debt-ack-form-it";

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
import { SolvencyCertificateTemplateEn } from "@/components/doc-templates/solvency-cert-template-en";
import { SolvencyCertificateTemplateEs } from "@/components/doc-templates/solvency-cert-template-es";
import { SolvencyCertificateTemplateDe } from "@/components/doc-templates/solvency-cert-template-de";
import { SolvencyCertificateTemplatePt } from "@/components/doc-templates/solvency-cert-template-pt";
import { SolvencyCertificateTemplateIt } from "@/components/doc-templates/solvency-cert-template-it";
import { InsuranceNoticeTemplateEn } from "@/components/doc-templates/insurance-notice-template-en";
import { InsuranceNoticeTemplateEs } from "@/components/doc-templates/insurance-notice-template-es";
import { InsuranceNoticeTemplateDe } from "@/components/doc-templates/insurance-notice-template-de";
import { InsuranceNoticeTemplatePt } from "@/components/doc-templates/insurance-notice-template-pt";
import { InsuranceNoticeTemplateIt } from "@/components/doc-templates/insurance-notice-template-it";
import { InsuranceCertificateTemplateEn } from "@/components/doc-templates/insurance-cert-template-en";
import { InsuranceCertificateTemplateEs } from "@/components/doc-templates/insurance-cert-template-es";
import { InsuranceCertificateTemplateDe } from "@/components/doc-templates/insurance-cert-template-de";
import { InsuranceCertificateTemplatePt } from "@/components/doc-templates/insurance-cert-template-pt";
import { InsuranceCertificateTemplateIt } from "@/components/doc-templates/insurance-cert-template-it";
import { LoanContractTemplateEn } from "@/components/doc-templates/loan-contract-template-en";
import { LoanContractTemplateEs } from "@/components/doc-templates/loan-contract-template-es";
import { LoanContractTemplateDe } from "@/components/doc-templates/loan-contract-template-de";
import { LoanContractTemplatePt } from "@/components/doc-templates/loan-contract-template-pt";
import { LoanContractTemplateIt } from "@/components/doc-templates/loan-contract-template-it";
import { GuaranteeAgreementTemplateEn } from "@/components/doc-templates/guarantee-agreement-template-en";
import { GuaranteeAgreementTemplateEs } from "@/components/doc-templates/guarantee-agreement-template-es";
import { GuaranteeAgreementTemplateDe } from "@/components/doc-templates/guarantee-agreement-template-de";
import { GuaranteeAgreementTemplatePt } from "@/components/doc-templates/guarantee-agreement-template-pt";
import { GuaranteeAgreementTemplateIt } from "@/components/doc-templates/guarantee-agreement-template-it";
import { DebtAcknowledgementTemplateEn } from "@/components/doc-templates/debt-ack-template-en";
import { DebtAcknowledgementTemplateEs } from "@/components/doc-templates/debt-ack-template-es";
import { DebtAcknowledgementTemplateDe } from "@/components/doc-templates/debt-ack-template-de";
import { DebtAcknowledgementTemplatePt } from "@/components/doc-templates/debt-ack-template-pt";
import { DebtAcknowledgementTemplateIt } from "@/components/doc-templates/debt-ack-template-it";

const documentGroups = {
  blankDocument: {
    groupLabel: 'Document Vierge',
    versions: { fr: { label: 'FR', FormComponent: BlankDocumentForm, TemplateComponent: BlankDocumentTemplate } },
  },
  feeInvoice: {
    groupLabel: 'Facture de Frais',
    versions: {
      fr: { label: 'FR', FormComponent: FeeInvoiceForm, TemplateComponent: FeeInvoiceTemplate },
      en: { label: 'EN', FormComponent: FeeInvoiceFormEn, TemplateComponent: FeeInvoiceTemplateEn },
      es: { label: 'ES', FormComponent: FeeInvoiceFormEs, TemplateComponent: FeeInvoiceTemplateEs },
      de: { label: 'DE', FormComponent: FeeInvoiceFormDe, TemplateComponent: FeeInvoiceTemplateDe },
      pt: { label: 'PT', FormComponent: FeeInvoiceFormPt, TemplateComponent: FeeInvoiceTemplatePt },
      it: { label: 'IT', FormComponent: FeeInvoiceFormIt, TemplateComponent: FeeInvoiceTemplateIt },
    },
  },
  solvencyCert: {
    groupLabel: 'Certificat de Solvabilité',
    versions: {
      fr: { label: 'FR', FormComponent: SolvencyCertificateForm, TemplateComponent: SolvencyCertificateTemplate },
      en: { label: 'EN', FormComponent: SolvencyCertificateFormEn, TemplateComponent: SolvencyCertificateTemplateEn },
      es: { label: 'ES', FormComponent: SolvencyCertificateFormEs, TemplateComponent: SolvencyCertificateTemplateEs },
      de: { label: 'DE', FormComponent: SolvencyCertificateFormDe, TemplateComponent: SolvencyCertificateTemplateDe },
      pt: { label: 'PT', FormComponent: SolvencyCertificateFormPt, TemplateComponent: SolvencyCertificateTemplatePt },
      it: { label: 'IT', FormComponent: SolvencyCertificateFormIt, TemplateComponent: SolvencyCertificateTemplateIt },
    },
  },
  insuranceNotice: {
    groupLabel: 'Notice d\'Assurance',
    versions: {
      fr: { label: 'FR', FormComponent: InsuranceNoticeForm, TemplateComponent: InsuranceNoticeTemplate },
      en: { label: 'EN', FormComponent: InsuranceNoticeFormEn, TemplateComponent: InsuranceNoticeTemplateEn },
      es: { label: 'ES', FormComponent: InsuranceNoticeFormEs, TemplateComponent: InsuranceNoticeTemplateEs },
      de: { label: 'DE', FormComponent: InsuranceNoticeFormDe, TemplateComponent: InsuranceNoticeTemplateDe },
      pt: { label: 'PT', FormComponent: InsuranceNoticeFormPt, TemplateComponent: InsuranceNoticeTemplatePt },
      it: { label: 'IT', FormComponent: InsuranceNoticeFormIt, TemplateComponent: InsuranceNoticeTemplateIt },
    },
  },
  insuranceCert: {
    groupLabel: 'Attestation d\'Assurance',
    versions: {
      fr: { label: 'FR', FormComponent: InsuranceCertificateForm, TemplateComponent: InsuranceCertificateTemplate },
      en: { label: 'EN', FormComponent: InsuranceCertificateFormEn, TemplateComponent: InsuranceCertificateTemplateEn },
      es: { label: 'ES', FormComponent: InsuranceCertificateFormEs, TemplateComponent: InsuranceCertificateTemplateEs },
      de: { label: 'DE', FormComponent: InsuranceCertificateFormDe, TemplateComponent: InsuranceCertificateTemplateDe },
      pt: { label: 'PT', FormComponent: InsuranceCertificateFormPt, TemplateComponent: InsuranceCertificateTemplatePt },
      it: { label: 'IT', FormComponent: InsuranceCertificateFormIt, TemplateComponent: InsuranceCertificateTemplateIt },
    },
  },
  loanContract: {
    groupLabel: 'Contrat de Prêt',
    versions: {
      fr: { label: 'FR', FormComponent: LoanContractForm, TemplateComponent: LoanContractTemplate },
      en: { label: 'EN', FormComponent: LoanContractFormEn, TemplateComponent: LoanContractTemplateEn },
      es: { label: 'ES', FormComponent: LoanContractFormEs, TemplateComponent: LoanContractTemplateEs },
      de: { label: 'DE', FormComponent: LoanContractFormDe, TemplateComponent: LoanContractTemplateDe },
      pt: { label: 'PT', FormComponent: LoanContractFormPt, TemplateComponent: LoanContractTemplatePt },
      it: { label: 'IT', FormComponent: LoanContractFormIt, TemplateComponent: LoanContractTemplateIt },
    },
  },
  guaranteeAgreement: {
    groupLabel: 'Acte de Cautionnement',
    versions: {
      fr: { label: 'FR', FormComponent: GuaranteeAgreementForm, TemplateComponent: GuaranteeAgreementTemplate },
      en: { label: 'EN', FormComponent: GuaranteeAgreementFormEn, TemplateComponent: GuaranteeAgreementTemplateEn },
      es: { label: 'ES', FormComponent: GuaranteeAgreementFormEs, TemplateComponent: GuaranteeAgreementTemplateEs },
      de: { label: 'DE', FormComponent: GuaranteeAgreementFormDe, TemplateComponent: GuaranteeAgreementTemplateDe },
      pt: { label: 'PT', FormComponent: GuaranteeAgreementFormPt, TemplateComponent: GuaranteeAgreementTemplatePt },
      it: { label: 'IT', FormComponent: GuaranteeAgreementFormIt, TemplateComponent: GuaranteeAgreementTemplateIt },
    },
  },
  debtAcknowledgement: {
    groupLabel: 'Reconnaissance de Dette',
    versions: {
      fr: { label: 'FR', FormComponent: DebtAcknowledgementForm, TemplateComponent: DebtAcknowledgementTemplate },
      en: { label: 'EN', FormComponent: DebtAcknowledgementFormEn, TemplateComponent: DebtAcknowledgementTemplateEn },
      es: { label: 'ES', FormComponent: DebtAcknowledgementFormEs, TemplateComponent: DebtAcknowledgementTemplateEs },
      de: { label: 'DE', FormComponent: DebtAcknowledgementFormDe, TemplateComponent: DebtAcknowledgementTemplateDe },
      pt: { label: 'PT', FormComponent: DebtAcknowledgementFormPt, TemplateComponent: DebtAcknowledgementTemplatePt },
      it: { label: 'IT', FormComponent: DebtAcknowledgementFormIt, TemplateComponent: DebtAcknowledgementTemplateIt },
    },
  },
};

type DocumentGroupKey = keyof typeof documentGroups;
type LanguageKey<T extends DocumentGroupKey> = keyof (typeof documentGroups)[T]['versions'];


export default function AdminDocumentsPage() {
    const [selectedGroupKey, setSelectedGroupKey] = useState<DocumentGroupKey>(Object.keys(documentGroups)[0] as DocumentGroupKey);
    const [selectedLangKey, setSelectedLangKey] = useState<string>('fr');
    const [formData, setFormData] = useState<any>({});

    const handleGroupChange = (value: string) => {
        const key = value as DocumentGroupKey;
        setSelectedGroupKey(key);
        // Reset to default language 'fr' or the first available one
        const availableLangs = Object.keys(documentGroups[key].versions);
        setSelectedLangKey(availableLangs.includes('fr') ? 'fr' : availableLangs[0]);
    };
    
    const { FormComponent, TemplateComponent } = useMemo(() => {
        const group = documentGroups[selectedGroupKey];
        const lang = selectedLangKey as LanguageKey<typeof selectedGroupKey>;
        return group.versions[lang] || group.versions['fr' as LanguageKey<typeof selectedGroupKey>];
    }, [selectedGroupKey, selectedLangKey]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Générateur de Documents</CardTitle>
                <CardDescription>Sélectionnez un type de document, remplissez les informations et téléchargez le PDF.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                        <div className="space-y-4">
                            <Select onValueChange={handleGroupChange} value={selectedGroupKey}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionnez un type de document" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(documentGroups).map(([key, group]) => (
                                        <SelectItem key={key} value={key}>{group.groupLabel}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {selectedGroupKey && (
                                <Tabs value={selectedLangKey} onValueChange={setSelectedLangKey} className="w-full">
                                    <TabsList>
                                        {Object.entries(documentGroups[selectedGroupKey].versions).map(([langKey, version]) => (
                                            <TabsTrigger key={langKey} value={langKey}>{(version as any).label}</TabsTrigger>
                                        ))}
                                    </TabsList>
                                    
                                     {Object.keys(documentGroups[selectedGroupKey].versions).map(langKey => (
                                        <TabsContent key={langKey} value={langKey}>
                                             {selectedLangKey === langKey && <FormComponent setFormData={setFormData} />}
                                        </TabsContent>
                                     ))}
                                </Tabs>
                            )}
                        </div>
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
                                        {TemplateComponent ? <TemplateComponent data={formData as any} /> : <p>Sélectionnez un document pour voir l'aperçu.</p>}
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

