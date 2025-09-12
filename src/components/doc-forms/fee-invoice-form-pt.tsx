
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

const formSchema = z.object({
  invoiceNumber: z.string().min(1, 'Obrigatório'),
  invoiceDate: z.string().min(1, 'Obrigatório'),
  clientName: z.string().min(1, 'Obrigatório'),
  clientAddress: z.string().min(1, 'Obrigatório'),
  serviceDescription: z.string().min(1, 'Obrigatório'),
  amount: z.coerce.number().positive('É necessário um valor positivo'),
  paymentTerms: z.string().min(1, 'Obrigatório'),
});

interface FeeInvoiceFormPtProps {
    setFormData: (data: any) => void;
}

export function FeeInvoiceFormPt({ setFormData }: FeeInvoiceFormPtProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: `FLEX-PT-${new Date().getFullYear()}-`,
      invoiceDate: new Date().toISOString().split('T')[0],
      clientName: '',
      clientAddress: '',
      serviceDescription: 'Taxa de processamento para empréstimo pessoal',
      amount: 0,
      paymentTerms: 'Pagamento devido no recebimento.\nTransferência para o IBAN: FRXX XXXX XXXX XXXX XXXX XXXX XXX.',
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
        `fatura-taxas-${data.invoiceNumber}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="invoiceNumber" render={({ field }) => ( <FormItem> <FormLabel>Número da Fatura</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="invoiceDate" render={({ field }) => ( <FormItem> <FormLabel>Data da Fatura</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientName" render={({ field }) => ( <FormItem> <FormLabel>Nome do Cliente</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientAddress" render={({ field }) => ( <FormItem> <FormLabel>Endereço do Cliente</FormLabel> <FormControl><Textarea {...field} rows={3} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="serviceDescription" render={({ field }) => ( <FormItem> <FormLabel>Descrição do Serviço</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="amount" render={({ field }) => ( <FormItem> <FormLabel>Valor (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="paymentTerms" render={({ field }) => ( <FormItem> <FormLabel>Condições de Pagamento</FormLabel> <FormControl><Textarea {...field} rows={3} /></FormControl> <FormDescription>Incluir IBAN, prazo de pagamento, etc.</FormDescription> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'A gerar...' : 'Gerar e Baixar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
