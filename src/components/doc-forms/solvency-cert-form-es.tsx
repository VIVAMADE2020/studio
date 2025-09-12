
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
  clientName: z.string().min(1, 'Requerido'),
  clientAddress: z.string().min(1, 'Requerido'),
  clientIdNumber: z.string().min(1, 'Requerido'),
  accountNumber: z.string().min(1, 'Requerido'),
  balance: z.coerce.number(),
  certDate: z.string().min(1, 'Requerido'),
});

interface SolvencyCertificateFormEsProps {
    setFormData: (data: any) => void;
}

export function SolvencyCertificateFormEs({ setFormData }: SolvencyCertificateFormEsProps) {
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
        <FormField name="clientName" render={({ field }) => ( <FormItem> <FormLabel>Nombre del Cliente</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientIdNumber" render={({ field }) => ( <FormItem> <FormLabel>N° de Identificación</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="clientAddress" render={({ field }) => ( <FormItem> <FormLabel>Dirección del Cliente</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="accountNumber" render={({ field }) => ( <FormItem> <FormLabel>Número de Cuenta</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="balance" render={({ field }) => ( <FormItem> <FormLabel>Monto de Elegibilidad (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="certDate" render={({ field }) => ( <FormItem> <FormLabel>Fecha del Certificado</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating}>{isGenerating ? 'Generando...' : 'Generar y Descargar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
