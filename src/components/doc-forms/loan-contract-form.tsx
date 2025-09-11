
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
  contractNumber: z.string().min(1, 'Requis'),
  contractDate: z.string().min(1, 'Requis'),
  borrowerName: z.string().min(1, 'Requis'),
  borrowerAddress: z.string().min(1, 'Requis'),
  borrowerIdNumber: z.string().min(1, 'Requis'),
  loanType: z.string({ required_error: 'Requis'}),
  loanAmount: z.coerce.number().positive('Montant positif requis'),
  loanAmountInWords: z.string().min(1, 'Requis'),
  interestRate: z.coerce.number().min(0, 'Taux positif requis'),
  loanTerm: z.coerce.number().positive('Durée positive requise (en mois)'),
  repaymentStartDate: z.string().min(1, 'Date requise'),
  repaymentEndDate: z.string().min(1, 'Date requise'),
  monthlyPayment: z.coerce.number().positive('Mensualité positive requise'),
  totalCreditCost: z.coerce.number().min(0, 'Coût positif requis'),
  totalAmountDue: z.coerce.number().positive('Montant positif requis'),
});

interface LoanContractFormProps {
    setFormData: (data: any) => void;
}

export function LoanContractForm({ setFormData }: LoanContractFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractNumber: `CTR-${new Date().getFullYear()}-`,
      contractDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      borrowerAddress: '',
      borrowerIdNumber: '',
      loanType: 'Prêt Personnel',
      loanAmount: 10000,
      loanAmountInWords: "Dix mille",
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
        `contrat-pret-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Informations Générales</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>N° de Contrat</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="contractDate" render={({ field }) => ( <FormItem> <FormLabel>Date du Contrat</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Informations Emprunteur</h4>
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nom de l'Emprunteur</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerIdNumber" render={({ field }) => ( <FormItem> <FormLabel>N° Pièce d'Identité</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerAddress" render={({ field }) => ( <FormItem> <FormLabel>Adresse de l'Emprunteur</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
       
        <h4 className="font-bold text-center pt-4 border-t">Caractéristiques du Prêt</h4>
        <FormField name="loanType" render={({ field }) => (
          <FormItem>
            <FormLabel>Type de Prêt</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="Prêt Personnel">Prêt Personnel</SelectItem>
                <SelectItem value="Prêt Immobilier">Prêt Immobilier</SelectItem>
                <SelectItem value="Prêt Auto">Prêt Auto</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Montant du Prêt (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Montant en lettres</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="interestRate" render={({ field }) => ( <FormItem> <FormLabel>TAEG (%)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Durée du Prêt (mois)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Remboursement</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="repaymentStartDate" render={({ field }) => ( <FormItem> <FormLabel>1ère échéance</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="repaymentEndDate" render={({ field }) => ( <FormItem> <FormLabel>Dernière échéance</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField name="monthlyPayment" render={({ field }) => ( <FormItem> <FormLabel>Mensualité (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="totalCreditCost" render={({ field }) => ( <FormItem> <FormLabel>Coût total du crédit (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="totalAmountDue" render={({ field }) => ( <FormItem> <FormLabel>Montant total dû (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Génération...' : 'Générer et Télécharger PDF'}</Button>
      </form>
    </FormProvider>
  );
}
