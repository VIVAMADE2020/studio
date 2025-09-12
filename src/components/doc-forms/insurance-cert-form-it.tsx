
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
  certNumber: z.string().min(1, 'Richiesto'),
  certDate: z.string().min(1, 'Richiesto'),
  insuredName: z.string().min(1, 'Richiesto'),
  insuredDob: z.string().min(1, 'Richiesto'),
  insuredAddress: z.string().min(1, 'Richiesto'),
  insuredIdNumber: z.string().min(1, 'Richiesto'),
  contractNumber: z.string().min(1, 'Richiesto'),
  loanType: z.string({ required_error: 'Richiesto'}),
  loanAmount: z.coerce.number().positive('È richiesto un importo positivo'),
  coverageDuration: z.coerce.number().positive('È richiesta una durata positiva'),
  monthlyPremium: z.coerce.number().min(0, 'È richiesto un costo positivo'),
  groupPolicyNumber: z.string().min(1, 'Richiesto'),
});

interface InsuranceCertificateFormItProps {
    setFormData: (data: any) => void;
}

export function InsuranceCertificateFormIt({ setFormData }: InsuranceCertificateFormItProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certNumber: `ASSUR-IT-${new Date().getFullYear()}-`,
      certDate: new Date().toISOString().split('T')[0],
      insuredName: '',
      insuredDob: '',
      insuredAddress: '',
      insuredIdNumber: '',
      contractNumber: '',
      loanType: 'Prestito Personale',
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
        `certificato-assicurazione-${data.insuredName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
         <h4 className="font-bold text-center">Informazioni Generali</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="certNumber" render={({ field }) => ( <FormItem> <FormLabel>N. Certificato</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="certDate" render={({ field }) => ( <FormItem> <FormLabel>Data di Emissione</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
         <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>N. Polizza Collettiva</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <h4 className="font-bold text-center pt-4 border-t">Informazioni sull'Assicurato</h4>
        <FormField name="insuredName" render={({ field }) => ( <FormItem> <FormLabel>Nome dell'Assicurato</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="insuredDob" render={({ field }) => ( <FormItem> <FormLabel>Data di Nascita</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="insuredIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Numero di Identificazione</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField name="insuredAddress" render={({ field }) => ( <FormItem> <FormLabel>Indirizzo dell'Assicurato</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Dettagli del Prestito Assicurato</h4>
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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Capitale Assicurato (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="coverageDuration" render={({ field }) => ( <FormItem> <FormLabel>Durata della Copertura (mesi)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Costo dell'Assicurazione</h4>
        <FormField name="monthlyPremium" render={({ field }) => ( <FormItem> <FormLabel>Premio Mensile (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
       
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generazione...' : 'Genera e Scarica PDF'}</Button>
      </form>
    </FormProvider>
  );
}
