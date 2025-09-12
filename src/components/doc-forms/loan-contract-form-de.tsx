
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  contractNumber: z.string().min(1, 'Erforderlich'),
  contractDate: z.string().min(1, 'Erforderlich'),
  borrowerName: z.string().min(1, 'Erforderlich'),
  borrowerAddress: z.string().min(1, 'Erforderlich'),
  borrowerIdNumber: z.string().min(1, 'Erforderlich'),
  loanType: z.string({ required_error: 'Erforderlich'}),
  loanAmount: z.coerce.number().positive('Positiver Betrag erforderlich'),
  loanAmountInWords: z.string().min(1, 'Erforderlich'),
  interestRate: z.coerce.number().min(0, 'Positiver Zinssatz erforderlich'),
  loanTerm: z.coerce.number().positive('Positive Laufzeit erforderlich (in Monaten)'),
  repaymentStartDate: z.string().min(1, 'Datum erforderlich'),
  repaymentEndDate: z.string().min(1, 'Datum erforderlich'),
  monthlyPayment: z.coerce.number().positive('Positive Rate erforderlich'),
  totalCreditCost: z.coerce.number().min(0, 'Positive Kosten erforderlich'),
  totalAmountDue: z.coerce.number().positive('Positiver Betrag erforderlich'),
});

interface LoanContractFormDeProps {
    setFormData: (data: any) => void;
}

export function LoanContractFormDe({ setFormData }: LoanContractFormDeProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractNumber: `CTR-DE-${new Date().getFullYear()}-`,
      contractDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      borrowerAddress: '',
      borrowerIdNumber: '',
      loanType: 'Privatdarlehen',
      loanAmount: 10000,
      loanAmountInWords: "Zehntausend",
      interestRate: 2.5,
      loanTerm: 60,
      repaymentStartDate: new Date().toISOString().split('T')[0],
      repaymentEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
      monthlyPayment: 177.47,
      totalCreditCost: 648.20,
      totalAmountDue: 10648.20
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
        `kreditvertrag-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Allgemeine Informationen</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>Vertrags-Nr.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="contractDate" render={({ field }) => ( <FormItem> <FormLabel>Vertragsdatum</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Angaben zum Kreditnehmer</h4>
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Name des Kreditnehmers</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Ausweisnummer</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerAddress" render={({ field }) => ( <FormItem> <FormLabel>Anschrift des Kreditnehmers</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
       
        <h4 className="font-bold text-center pt-4 border-t">Kreditmerkmale</h4>
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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Kreditbetrag (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Betrag in Worten</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="interestRate" render={({ field }) => ( <FormItem> <FormLabel>Effektiver Jahreszins (%)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Laufzeit (Monate)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Rückzahlung</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="repaymentStartDate" render={({ field }) => ( <FormItem> <FormLabel>1. Rate</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="repaymentEndDate" render={({ field }) => ( <FormItem> <FormLabel>Letzte Rate</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField name="monthlyPayment" render={({ field }) => ( <FormItem> <FormLabel>Monatliche Rate (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="totalCreditCost" render={({ field }) => ( <FormItem> <FormLabel>Gesamtkreditkosten (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="totalAmountDue" render={({ field }) => ( <FormItem> <FormLabel>Gesamtbetrag (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Wird generiert...' : 'PDF Generieren & Herunterladen'}</Button>
      </form>
    </FormProvider>
  );
}
