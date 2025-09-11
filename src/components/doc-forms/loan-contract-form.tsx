
"use client";
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePDFGenerator } from '@/hooks/use-pdf-generator';

const formSchema = z.object({
  borrowerName: z.string().min(1, 'Requis'),
  borrowerAddress: z.string().min(1, 'Requis'),
  loanAmount: z.coerce.number().positive('Montant positif requis'),
  interestRate: z.coerce.number().min(0, 'Taux positif requis'),
  loanTerm: z.coerce.number().positive('Durée positive requise (en mois)'),
  monthlyPayment: z.coerce.number().positive('Mensualité positive requise'),
  startDate: z.string().min(1, 'Date requise'),
  contractDate: z.string().min(1, 'Date requise'),
});

interface LoanContractFormProps {
    setFormData: (data: any) => void;
}

export function LoanContractForm({ setFormData }: LoanContractFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      borrowerName: '',
      borrowerAddress: '',
      loanAmount: 10000,
      interestRate: 2.5,
      loanTerm: 60,
      monthlyPayment: 177.47,
      startDate: new Date().toLocaleDateString('fr-CA'),
      contractDate: new Date().toLocaleDateString('fr-CA'),
    },
  });

  const { isGenerating, generatePDF } = usePDFGenerator();
  const formData = form.watch();

  useEffect(() => {
    setFormData(formData);
  }, [formData, setFormData]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    generatePDF(
        `contrat-pret-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nom de l'Emprunteur</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerAddress" render={({ field }) => ( <FormItem> <FormLabel>Adresse de l'Emprunteur</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Montant du Prêt (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="interestRate" render={({ field }) => ( <FormItem> <FormLabel>Taux d'intérêt annuel (%)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Durée du Prêt (mois)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="monthlyPayment" render={({ field }) => ( <FormItem> <FormLabel>Mensualité (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="startDate" render={({ field }) => ( <FormItem> <FormLabel>Date de début du remboursement</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="contractDate" render={({ field }) => ( <FormItem> <FormLabel>Date du Contrat</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Génération...' : 'Générer et Télécharger PDF'}</Button>
      </form>
    </FormProvider>
  );
}
