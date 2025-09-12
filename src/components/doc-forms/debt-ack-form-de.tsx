
"use client";
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePDFGenerator } from '@/hooks/use-pdf-generator';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  docNumber: z.string().min(1, 'Erforderlich'),
  docDate: z.string().min(1, 'Erforderlich'),
  debtorName: z.string().min(1, 'Erforderlich'),
  debtorAddress: z.string().min(1, 'Erforderlich'),
  debtorIdNumber: z.string().min(1, 'Erforderlich'),
  loanType: z.string({ required_error: 'Erforderlich'}),
  loanAmount: z.coerce.number().positive('Positiver Betrag erforderlich'),
  loanAmountInWords: z.string().min(1, 'Erforderlich'),
  loanTerm: z.coerce.number().positive('Positive Dauer erforderlich (in Monaten)'),
  contractNumber: z.string().min(1, 'Erforderlich'),
});

interface DebtAcknowledgementFormDeProps {
    setFormData: (data: any) => void;
}

export function DebtAcknowledgementFormDe({ setFormData }: DebtAcknowledgementFormDeProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docNumber: `RDD-DE-${new Date().getFullYear()}-`,
      docDate: new Date().toISOString().split('T')[0],
      debtorName: '',
      debtorAddress: '',
      debtorIdNumber: '',
      loanType: 'Privatdarlehen',
      loanAmount: 10000,
      loanAmountInWords: 'Zehntausend',
      loanTerm: 60,
      contractNumber: ''
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
        `schuldanerkenntnis-${data.debtorName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Allgemeine Informationen</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="docNumber" render={({ field }) => ( <FormItem> <FormLabel>Dokument-Nr.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="docDate" render={({ field }) => ( <FormItem> <FormLabel>Datum</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Angaben zum Schuldner</h4>
        <FormField name="debtorName" render={({ field }) => ( <FormItem> <FormLabel>Name des Schuldners</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="debtorIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Ausweisnummer</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="debtorAddress" render={({ field }) => ( <FormItem> <FormLabel>Anschrift des Schuldners</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Angaben zum Kredit</h4>
        <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>Kreditvertrags-Nr.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanType" render={({ field }) => (
          <FormItem>
            <FormLabel>Kreditart</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="Privatdarlehen">Privatdarlehen</SelectItem>
                <SelectItem value="Hypothekendarlehen">Hypothekendarlehen</SelectItem>
                <SelectItem value="Autokredit">Autokredit</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Schuldbetrag (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Betrag in Worten</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Laufzeit (Monate)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Wird generiert...' : 'PDF Generieren & Herunterladen'}</Button>
      </form>
    </FormProvider>
  );
}
