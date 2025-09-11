
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
  debtorName: z.string().min(1, 'Requis'),
  debtorAddress: z.string().min(1, 'Requis'),
  creditorName: z.string().min(1, 'Requis'),
  debtAmount: z.coerce.number().positive('Montant positif requis'),
  repaymentTerms: z.string().min(1, 'Requis'),
  ackDate: z.string().min(1, 'Requis'),
});

interface DebtAcknowledgementFormProps {
    setFormData: (data: any) => void;
}

export function DebtAcknowledgementForm({ setFormData }: DebtAcknowledgementFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      debtorName: '',
      debtorAddress: '',
      creditorName: 'FLEXFOND',
      debtAmount: 0,
      repaymentTerms: 'Remboursement en 12 mensualités de X €.',
      ackDate: new Date().toLocaleDateString('fr-CA'),
    },
  });

  const { isGenerating, generatePDF } = usePDFGenerator();
  const formData = form.watch();

  useEffect(() => {
    setFormData(formData);
  }, [formData, setFormData]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    generatePDF(
        `reconnaissance-dette-${data.debtorName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="debtorName" render={({ field }) => ( <FormItem> <FormLabel>Nom du Débiteur</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="debtorAddress" render={({ field }) => ( <FormItem> <FormLabel>Adresse du Débiteur</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="creditorName" render={({ field }) => ( <FormItem> <FormLabel>Nom du Créancier</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="debtAmount" render={({ field }) => ( <FormItem> <FormLabel>Montant de la Dette (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="repaymentTerms" render={({ field }) => ( <FormItem> <FormLabel>Modalités de Remboursement</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="ackDate" render={({ field }) => ( <FormItem> <FormLabel>Date</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Génération...' : 'Générer et Télécharger PDF'}</Button>
      </form>
    </FormProvider>
  );
}
