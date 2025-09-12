
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
  clientName: z.string().min(1, 'Required'),
  clientAddress: z.string().min(1, 'Required'),
  clientIdNumber: z.string().min(1, 'Required'),
  accountNumber: z.string().min(1, 'Required'),
  balance: z.coerce.number(),
  certDate: z.string().min(1, 'Required'),
});

interface SolvencyCertificateFormEnProps {
    setFormData: (data: any) => void;
}

export function SolvencyCertificateFormEn({ setFormData }: SolvencyCertificateFormEnProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: '',
      clientAddress: '',
      clientIdNumber: '',
      accountNumber: '',
      balance: 0,
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
        `solvency-certificate-${data.clientName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="clientName" render={({ field }) => ( <FormItem> <FormLabel>Client Name</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientIdNumber" render={({ field }) => ( <FormItem> <FormLabel>ID Number</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientAddress" render={({ field }) => ( <FormItem> <FormLabel>Client Address</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="accountNumber" render={({ field }) => ( <FormItem> <FormLabel>Account Number</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="balance" render={({ field }) => ( <FormItem> <FormLabel>Eligibility Amount (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="certDate" render={({ field }) => ( <FormItem> <FormLabel>Certificate Date</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Generating...' : 'Generate & Download PDF'}</Button>
      </form>
    </FormProvider>
  );
}
