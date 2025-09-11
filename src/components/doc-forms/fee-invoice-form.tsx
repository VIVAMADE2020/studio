
"use client";
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePDFGenerator } from '@/hooks/use-pdf-generator';
import { FeeInvoiceTemplate, FeeInvoiceData } from '../doc-templates/fee-invoice-template';

const formSchema = z.object({
  invoiceNumber: z.string().min(1, 'Requis'),
  invoiceDate: z.string().min(1, 'Requis'),
  clientName: z.string().min(1, 'Requis'),
  clientAddress: z.string().min(1, 'Requis'),
  serviceDescription: z.string().min(1, 'Requis'),
  amount: z.coerce.number().positive('Montant positif requis'),
});

export function FeeInvoiceForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: `FLEX-${new Date().getFullYear()}-`,
      invoiceDate: new Date().toLocaleDateString('fr-CA'),
      clientName: '',
      clientAddress: '',
      serviceDescription: 'Frais de dossier pour prêt personnel',
      amount: 0,
    },
  });

  const { isGenerating, generatePDF } = usePDFGenerator();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    generatePDF(
        <FeeInvoiceTemplate data={data} />, 
        `facture-frais-${data.invoiceNumber}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="invoiceNumber" render={({ field }) => ( <FormItem> <FormLabel>Numéro de Facture</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="invoiceDate" render={({ field }) => ( <FormItem> <FormLabel>Date</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientName" render={({ field }) => ( <FormItem> <FormLabel>Nom du Client</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientAddress" render={({ field }) => ( <FormItem> <FormLabel>Adresse du Client</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="serviceDescription" render={({ field }) => ( <FormItem> <FormLabel>Description du Service</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="amount" render={({ field }) => ( <FormItem> <FormLabel>Montant (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Génération...' : 'Générer et Télécharger PDF'}</Button>
      </form>
    </FormProvider>
  );
}
