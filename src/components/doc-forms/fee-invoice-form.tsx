
"use client";
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePDFGenerator } from '@/hooks/use-pdf-generator';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  invoiceNumber: z.string().min(1, 'Requis'),
  invoiceDate: z.string().min(1, 'Requis'),
  clientName: z.string().min(1, 'Requis'),
  clientAddress: z.string().min(1, 'Requis'),
  serviceDescription: z.string().min(1, 'Requis'),
  amount: z.coerce.number().positive('Montant positif requis'),
  paymentTerms: z.string().min(1, 'Requis'),
});

interface FeeInvoiceFormProps {
    setFormData: (data: any) => void;
}

export function FeeInvoiceForm({ setFormData }: FeeInvoiceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: `FLEX-${new Date().getFullYear()}-`,
      invoiceDate: new Date().toISOString().split('T')[0],
      clientName: '',
      clientAddress: '',
      serviceDescription: 'Frais de dossier pour prêt personnel',
      amount: 0,
      paymentTerms: 'Paiement dû à réception.\nVirement sur le compte IBAN : FRXX XXXX XXXX XXXX XXXX XXXX XXX.',
    },
  });

  const { isGenerating, generatePDF } = usePDFGenerator();

  useEffect(() => {
    const subscription = form.watch((value) => {
      setFormData(value);
    });
    setFormData(form.getValues());
    return () => subscription.unsubscribe();
  }, [form, setFormData]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    generatePDF(
        `facture-frais-${data.invoiceNumber}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="invoiceNumber" render={({ field }) => ( <FormItem> <FormLabel>Numéro de Facture</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="invoiceDate" render={({ field }) => ( <FormItem> <FormLabel>Date de Facturation</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientName" render={({ field }) => ( <FormItem> <FormLabel>Nom du Client</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientAddress" render={({ field }) => ( <FormItem> <FormLabel>Adresse du Client</FormLabel> <FormControl><Textarea {...field} rows={3} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="serviceDescription" render={({ field }) => ( <FormItem> <FormLabel>Description du Service</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="amount" render={({ field }) => ( <FormItem> <FormLabel>Montant (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="paymentTerms" render={({ field }) => ( <FormItem> <FormLabel>Modalités de Paiement</FormLabel> <FormControl><Textarea {...field} rows={3} /></FormControl> <FormDescription>Inclure l'IBAN, le délai de paiement, etc.</FormDescription> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Génération...' : 'Générer et Télécharger PDF'}</Button>
      </form>
    </FormProvider>
  );
}
