
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
  clientName: z.string().min(1, 'Obrigatório'),
  clientAddress: z.string().min(1, 'Obrigatório'),
  clientIdNumber: z.string().min(1, 'Obrigatório'),
  accountNumber: z.string().min(1, 'Obrigatório'),
  balance: z.coerce.number(),
  certDate: z.string().min(1, 'Obrigatório'),
});

interface SolvencyCertificateFormPtProps {
    setFormData: (data: any) => void;
}

export function SolvencyCertificateFormPt({ setFormData }: SolvencyCertificateFormPtProps) {
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
        `certificado-solvencia-${data.clientName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="clientName" render={({ field }) => ( <FormItem> <FormLabel>Nome do Cliente</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº de Identificação</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientAddress" render={({ field }) => ( <FormItem> <FormLabel>Endereço do Cliente</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="accountNumber" render={({ field }) => ( <FormItem> <FormLabel>Número da Conta</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="balance" render={({ field }) => ( <FormItem> <FormLabel>Montante de Elegibilidade (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="certDate" render={({ field }) => ( <FormItem> <FormLabel>Data do Certificado</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'A gerar...' : 'Gerar e Baixar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
