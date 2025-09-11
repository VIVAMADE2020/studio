
"use client";
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePDFGenerator } from '@/hooks/use-pdf-generator';
import { GuaranteeAgreementTemplate, GuaranteeAgreementData } from '../doc-templates/guarantee-agreement-template';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  guarantorName: z.string().min(1, 'Requis'),
  guarantorAddress: z.string().min(1, 'Requis'),
  borrowerName: z.string().min(1, 'Requis'),
  loanAmount: z.coerce.number().positive('Montant positif requis'),
  loanPurpose: z.string().min(1, 'Requis'),
  agreementDate: z.string().min(1, 'Requis'),
});

export function GuaranteeAgreementForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guarantorName: '',
      guarantorAddress: '',
      borrowerName: '',
      loanAmount: 10000,
      loanPurpose: 'Prêt personnel',
      agreementDate: new Date().toLocaleDateString('fr-CA'),
    },
  });

  const { isGenerating, generatePDF } = usePDFGenerator();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    generatePDF(
        <GuaranteeAgreementTemplate data={data} />,
        `acte-cautionnement-${data.guarantorName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="guarantorName" render={({ field }) => ( <FormItem> <FormLabel>Nom de la Caution</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="guarantorAddress" render={({ field }) => ( <FormItem> <FormLabel>Adresse de la Caution</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nom de l'Emprunteur</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Montant du Prêt Garanti (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanPurpose" render={({ field }) => ( <FormItem> <FormLabel>Objet du Prêt</FormLabel> <FormControl><Textarea {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="agreementDate" render={({ field }) => ( <FormItem> <FormLabel>Date de l'Acte</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Génération...' : 'Générer et Télécharger PDF'}</Button>
      </form>
    </FormProvider>
  );
}
