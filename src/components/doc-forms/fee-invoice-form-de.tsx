
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
  invoiceNumber: z.string().min(1, 'Erforderlich'),
  invoiceDate: z.string().min(1, 'Erforderlich'),
  clientName: z.string().min(1, 'Erforderlich'),
  clientAddress: z.string().min(1, 'Erforderlich'),
  serviceDescription: z.string().min(1, 'Erforderlich'),
  amount: z.coerce.number().positive('Positiver Betrag erforderlich'),
  paymentTerms: z.string().min(1, 'Erforderlich'),
});

interface FeeInvoiceFormDeProps {
    setFormData: (data: any) => void;
}

export function FeeInvoiceFormDe({ setFormData }: FeeInvoiceFormDeProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: `FLEX-DE-${new Date().getFullYear()}-`,
      invoiceDate: new Date().toISOString().split('T')[0],
      clientName: '',
      clientAddress: '',
      serviceDescription: 'Bearbeitungsgebühr für Privatdarlehen',
      amount: 0,
      paymentTerms: 'Zahlung bei Erhalt fällig.\nÜberweisung auf IBAN: FRXX XXXX XXXX XXXX XXXX XXXX XXX.',
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
        `rechnung-${data.invoiceNumber}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="invoiceNumber" render={({ field }) => ( <FormItem> <FormLabel>Rechnungsnummer</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="invoiceDate" render={({ field }) => ( <FormItem> <FormLabel>Rechnungsdatum</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientName" render={({ field }) => ( <FormItem> <FormLabel>Kundenname</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientAddress" render={({ field }) => ( <FormItem> <FormLabel>Kundenadresse</FormLabel> <FormControl><Textarea {...field} rows={3} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="serviceDescription" render={({ field }) => ( <FormItem> <FormLabel>Leistungsbeschreibung</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="amount" render={({ field }) => ( <FormItem> <FormLabel>Betrag (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="paymentTerms" render={({ field }) => ( <FormItem> <FormLabel>Zahlungsbedingungen</FormLabel> <FormControl><Textarea {...field} rows={3} /></FormControl> <FormDescription>IBAN, Zahlungsfrist usw. angeben.</FormDescription> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Generiere...' : 'PDF Generieren & Herunterladen'}</Button>
      </form>
    </FormProvider>
  );
}
