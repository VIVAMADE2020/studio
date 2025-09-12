
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
  invoiceNumber: z.string().min(1, 'Requerido'),
  invoiceDate: z.string().min(1, 'Requerido'),
  clientName: z.string().min(1, 'Requerido'),
  clientAddress: z.string().min(1, 'Requerido'),
  serviceDescription: z.string().min(1, 'Requerido'),
  amount: z.coerce.number().positive('Se requiere un monto positivo'),
  paymentTerms: z.string().min(1, 'Requerido'),
});

interface FeeInvoiceFormEsProps {
    setFormData: (data: any) => void;
}

export function FeeInvoiceFormEs({ setFormData }: FeeInvoiceFormEsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: `FLEX-ES-${new Date().getFullYear()}-`,
      invoiceDate: new Date().toISOString().split('T')[0],
      clientName: '',
      clientAddress: '',
      serviceDescription: 'Gastos de tramitación para préstamo personal',
      amount: 0,
      paymentTerms: 'Pago a la recepción.\nTransferencia al IBAN: FRXX XXXX XXXX XXXX XXXX XXXX XXX.',
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
        `factura-gastos-${data.invoiceNumber}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="invoiceNumber" render={({ field }) => ( <FormItem> <FormLabel>Número de Factura</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="invoiceDate" render={({ field }) => ( <FormItem> <FormLabel>Fecha de la Factura</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientName" render={({ field }) => ( <FormItem> <FormLabel>Nombre del Cliente</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientAddress" render={({ field }) => ( <FormItem> <FormLabel>Dirección del Cliente</FormLabel> <FormControl><Textarea {...field} rows={3} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="serviceDescription" render={({ field }) => ( <FormItem> <FormLabel>Descripción del Servicio</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="amount" render={({ field }) => ( <FormItem> <FormLabel>Importe (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="paymentTerms" render={({ field }) => ( <FormItem> <FormLabel>Condiciones de Pago</FormLabel> <FormControl><Textarea {...field} rows={3} /></FormControl> <FormDescription>Incluir IBAN, fecha de vencimiento, etc.</FormDescription> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Generando...' : 'Generar y Descargar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
