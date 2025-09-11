
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

const formSchema = z.object({
  policyholderName: z.string().min(1, 'Requis'),
  policyholderAddress: z.string().min(1, 'Requis'),
  policyNumber: z.string().min(1, 'Requis'),
  effectiveDate: z.string().min(1, 'Requis'),
  expirationDate: z.string().min(1, 'Requis'),
  coverageDetails: z.string().min(1, 'Requis'),
  certDate: z.string().min(1, 'Requis'),
});

interface InsuranceCertificateFormProps {
    setFormData: (data: any) => void;
}

export function InsuranceCertificateForm({ setFormData }: InsuranceCertificateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyholderName: '',
      policyholderAddress: '',
      policyNumber: '',
      effectiveDate: new Date().toISOString().split('T')[0],
      expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      coverageDetails: "• Décès\n• Perte Totale et Irréversible d'Autonomie (PTIA)\n• Incapacité Temporaire Totale de travail (ITT)",
      certDate: new Date().toISOString().split('T')[0],
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
        `attestation-assurance-${data.policyholderName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="policyholderName" render={({ field }) => ( <FormItem> <FormLabel>Nom de l'Assuré</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="policyholderAddress" render={({ field }) => ( <FormItem> <FormLabel>Adresse de l'Assuré</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="policyNumber" render={({ field }) => ( <FormItem> <FormLabel>Numéro de Police / Adhésion</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="effectiveDate" render={({ field }) => ( <FormItem> <FormLabel>Date d'effet</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="expirationDate" render={({ field }) => ( <FormItem> <FormLabel>Date d'expiration</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="coverageDetails" render={({ field }) => ( <FormItem> <FormLabel>Détails de la Couverture</FormLabel> <FormControl><Textarea rows={4} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="certDate" render={({ field }) => ( <FormItem> <FormLabel>Date de l'attestation</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Génération...' : 'Générer et Télécharger PDF'}</Button>
      </form>
    </FormProvider>
  );
}
