
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
  actNumber: z.string().min(1, 'Richiesto'),
  actDate: z.string().min(1, 'Richiesto'),
  borrowerName: z.string().min(1, 'Richiesto'),
  borrowerAddress: z.string().min(1, 'Richiesto'),
  borrowerIdNumber: z.string().min(1, 'Richiesto'),
  loanType: z.string({ required_error: 'Richiesto'}),
  loanAmount: z.coerce.number().positive('È richiesto un importo positivo'),
  loanAmountInWords: z.string().min(1, 'Richiesto'),
  loanTerm: z.coerce.number().positive('È richiesta una durata positiva (in mesi)'),
  contractNumber: z.string().min(1, 'Richiesto'),
});

interface GuaranteeAgreementFormItProps {
    setFormData: (data: any) => void;
}

export function GuaranteeAgreementFormIt({ setFormData }: GuaranteeAgreementFormItProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      actNumber: `CAU-IT-${new Date().getFullYear()}-`,
      actDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      borrowerAddress: '',
      borrowerIdNumber: '',
      loanType: 'Prestito Personale',
      loanAmount: 10000,
      loanAmountInWords: 'Diecimila',
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
        `atto-fideiussione-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Informazioni Generali</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="actNumber" render={({ field }) => ( <FormItem> <FormLabel>N. Atto</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="actDate" render={({ field }) => ( <FormItem> <FormLabel>Data dell'Atto</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Informazioni sul Mutuatario</h4>
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nome del Mutuatario (Debitore)</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Numero di Identificazione</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerAddress" render={({ field }) => ( <FormItem> <FormLabel>Indirizzo del Mutuatario</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <h4 className="font-bold text-center pt-4 border-t">Informazioni sul Prestito</h4>
        <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>N. Contratto di Prestito</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanType" render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo di Prestito</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="Prestito Personale">Prestito Personale</SelectItem>
                <SelectItem value="Mutuo Ipotecario">Mutuo Ipotecario</SelectItem>
                <SelectItem value="Prestito Auto">Prestito Auto</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Importo del Prestito Garantito (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Importo in lettere</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Durata del Prestito (mesi)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generazione...' : 'Genera e Scarica PDF'}</Button>
      </form>
    </FormProvider>
  );
}
