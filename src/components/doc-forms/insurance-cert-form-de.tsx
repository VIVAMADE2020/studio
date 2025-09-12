
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
  certNumber: z.string().min(1, 'Erforderlich'),
  certDate: z.string().min(1, 'Erforderlich'),
  insuredName: z.string().min(1, 'Erforderlich'),
  insuredDob: z.string().min(1, 'Erforderlich'),
  insuredAddress: z.string().min(1, 'Erforderlich'),
  insuredIdNumber: z.string().min(1, 'Erforderlich'),
  contractNumber: z.string().min(1, 'Erforderlich'),
  loanType: z.string({ required_error: 'Erforderlich'}),
  loanAmount: z.coerce.number().positive('Positiver Betrag erforderlich'),
  coverageDuration: z.coerce.number().positive('Positive Dauer erforderlich'),
  monthlyPremium: z.coerce.number().min(0, 'Positive Kosten erforderlich'),
  groupPolicyNumber: z.string().min(1, 'Erforderlich'),
});

interface InsuranceCertificateFormDeProps {
    setFormData: (data: any) => void;
}

export function InsuranceCertificateFormDe({ setFormData }: InsuranceCertificateFormDeProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certNumber: `ASSUR-DE-${new Date().getFullYear()}-`,
      certDate: new Date().toISOString().split('T')[0],
      insuredName: '',
      insuredDob: '',
      insuredAddress: '',
      insuredIdNumber: '',
      contractNumber: '',
      loanType: 'Privatdarlehen',
      loanAmount: 10000,
      coverageDuration: 60,
      monthlyPremium: 15.50,
      groupPolicyNumber: 'FLEX-ASSUR-GR-001',
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
        `versicherungsbestaetigung-${data.insuredName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
         <h4 className="font-bold text-center">Allgemeine Informationen</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="certNumber" render={({ field }) => ( <FormItem> <FormLabel>Bestätigungs-Nr.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="certDate" render={({ field }) => ( <FormItem> <FormLabel>Ausstellungsdatum</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
         <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>Gruppenpolicen-Nr.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <h4 className="font-bold text-center pt-4 border-t">Angaben zum Versicherten</h4>
        <FormField name="insuredName" render={({ field }) => ( <FormItem> <FormLabel>Name des Versicherten</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="insuredDob" render={({ field }) => ( <FormItem> <FormLabel>Geburtsdatum</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="insuredIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Ausweisnummer</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField name="insuredAddress" render={({ field }) => ( <FormItem> <FormLabel>Anschrift des Versicherten</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Details des versicherten Kredits</h4>
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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Versichertes Kapital (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="coverageDuration" render={({ field }) => ( <FormItem> <FormLabel>Versicherungsdauer (Monate)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Versicherungskosten</h4>
        <FormField name="monthlyPremium" render={({ field }) => ( <FormItem> <FormLabel>Monatliche Prämie (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
       
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Wird generiert...' : 'PDF Generieren & Herunterladen'}</Button>
      </form>
    </FormProvider>
  );
}
