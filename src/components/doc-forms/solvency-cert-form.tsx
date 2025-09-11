
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
  clientName: z.string().min(1, 'Requis'),
  clientAddress: z.string().min(1, 'Requis'),
  accountNumber: z.string().min(1, 'Requis'),
  balance: z.coerce.number(),
  certDate: z.string().min(1, 'Requis'),
});

interface SolvencyCertificateFormProps {
    setFormData: (data: any) => void;
}

export function SolvencyCertificateForm({ setFormData }: SolvencyCertificateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: '',
      clientAddress: '',
      accountNumber: '',
      balance: 0,
      certDate: new Date().toLocaleDateString('fr-CA'),
    },
  });

  const { isGenerating, generatePDF } = usePDFGenerator();
  const formData = form.watch();

  useEffect(() => {
    setFormData(formData);
  }, [formData, setFormData]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    generatePDF(
        `certificat-solvabilite-${data.clientName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="clientName" render={({ field }) => ( <FormItem> <FormLabel>Nom du Client</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientAddress" render={({ field }) => ( <FormItem> <FormLabel>Adresse du Client</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="accountNumber" render={({ field }) => ( <FormItem> <FormLabel>Numéro de Compte</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="balance" render={({ field }) => ( <FormItem> <FormLabel>Solde du compte (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="certDate" render={({ field }) => ( <FormItem> <FormLabel>Date du Certificat</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Génération...' : 'Générer et Télécharger PDF'}</Button>
      </form>
    </FormProvider>
  );
}
