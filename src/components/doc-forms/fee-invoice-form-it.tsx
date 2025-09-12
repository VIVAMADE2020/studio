
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
  invoiceNumber: z.string().min(1, 'Richiesto'),
  invoiceDate: z.string().min(1, 'Richiesto'),
  clientName: z.string().min(1, 'Richiesto'),
  clientAddress: z.string().min(1, 'Richiesto'),
  serviceDescription: z.string().min(1, 'Richiesto'),
  amount: z.coerce.number().positive('È richiesto un importo positivo'),
  paymentTerms: z.string().min(1, 'Richiesto'),
});

interface FeeInvoiceFormItProps {
    setFormData: (data: any) => void;
}

export function FeeInvoiceFormIt({ setFormData }: FeeInvoiceFormItProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: `FLEX-IT-${new Date().getFullYear()}-`,
      invoiceDate: new Date().toISOString().split('T')[0],
      clientName: '',
      clientAddress: '',
      serviceDescription: 'Spese di istruttoria per prestito personale',
      amount: 0,
      paymentTerms: 'Pagamento dovuto al ricevimento.\nBonifico su IBAN: FRXX XXXX XXXX XXXX XXXX XXXX XXX.',
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
        `fattura-spese-${data.invoiceNumber}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="invoiceNumber" render={({ field }) => ( <FormItem> <FormLabel>Numero Fattura</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="invoiceDate" render={({ field }) => ( <FormItem> <FormLabel>Data Fattura</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientName" render={({ field }) => ( <FormItem> <FormLabel>Nome Cliente</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientAddress" render={({ field }) => ( <FormItem> <FormLabel>Indirizzo Cliente</FormLabel> <FormControl><Textarea {...field} rows={3} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="serviceDescription" render={({ field }) => ( <FormItem> <FormLabel>Descrizione Servizio</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="amount" render={({ field }) => ( <FormItem> <FormLabel>Importo (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="paymentTerms" render={({ field }) => ( <FormItem> <FormLabel>Termini di Pagamento</FormLabel> <FormControl><Textarea {...field} rows={3} /></FormControl> <FormDescription>Includere IBAN, scadenza pagamento, ecc.</FormDescription> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Generazione...' : 'Genera e Scarica PDF'}</Button>
      </form>
    </FormProvider>
  );
}
