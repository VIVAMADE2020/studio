
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
  actNumber: z.string().min(1, 'Erforderlich'),
  actDate: z.string().min(1, 'Erforderlich'),
  borrowerName: z.string().min(1, 'Erforderlich'),
  borrowerAddress: z.string().min(1, 'Erforderlich'),
  borrowerIdNumber: z.string().min(1, 'Erforderlich'),
  loanType: z.string({ required_error: 'Erforderlich'}),
  loanAmount: z.coerce.number().positive('Positiver Betrag erforderlich'),
  loanAmountInWords: z.string().min(1, 'Erforderlich'),
  loanTerm: z.coerce.number().positive('Positive Dauer erforderlich (in Monaten)'),
  contractNumber: z.string().min(1, 'Erforderlich'),
});

interface GuaranteeAgreementFormDeProps {
    setFormData: (data: any) => void;
}

export function GuaranteeAgreementFormDe({ setFormData }: GuaranteeAgreementFormDeProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      actNumber: `CAU-DE-${new Date().getFullYear()}-`,
      actDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      borrowerAddress: '',
      borrowerIdNumber: '',
      loanType: 'Privatdarlehen',
      loanAmount: 10000,
      loanAmountInWords: 'Zehntausend',
      loanTerm: 60,
      contractNumber: '',
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
        `buergschaftsvertrag-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Allgemeine Informationen</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="actNumber" render={({ field }) => ( <FormItem> <FormLabel>Urkunden-Nr.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="actDate" render={({ field }) => ( <FormItem> <FormLabel>Datum der Urkunde</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Angaben zum Kreditnehmer</h4>
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Name des Kreditnehmers (Schuldner)</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Ausweisnummer</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerAddress" render={({ field }) => ( <FormItem> <FormLabel>Anschrift des Kreditnehmers</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />

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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Bürgschaftsbetrag (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Betrag in Worten</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Laufzeit (Monate)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Wird generiert...' : 'PDF Generieren & Herunterladen'}</Button>
      </form>
    </FormProvider>
  );
}
