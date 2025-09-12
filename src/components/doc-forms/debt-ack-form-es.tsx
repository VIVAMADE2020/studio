
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  docNumber: z.string().min(1, 'Requerido'),
  docDate: z.string().min(1, 'Requerido'),
  debtorName: z.string().min(1, 'Requerido'),
  debtorAddress: z.string().min(1, 'Requerido'),
  debtorIdNumber: z.string().min(1, 'Requerido'),
  loanType: z.string({ required_error: 'Requerido'}),
  loanAmount: z.coerce.number().positive('Se requiere un monto positivo'),
  loanAmountInWords: z.string().min(1, 'Requerido'),
  loanTerm: z.coerce.number().positive('Se requiere una duración positiva (en meses)'),
  contractNumber: z.string().min(1, 'Requerido'),
});

interface DebtAcknowledgementFormEsProps {
    setFormData: (data: any) => void;
}

export function DebtAcknowledgementFormEs({ setFormData }: DebtAcknowledgementFormEsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docNumber: `RDD-ES-${new Date().getFullYear()}-`,
      docDate: new Date().toISOString().split('T')[0],
      debtorName: '',
      debtorAddress: '',
      debtorIdNumber: '',
      loanType: 'Préstamo Personal',
      loanAmount: 10000,
      loanAmountInWords: 'Diez mil',
      loanTerm: 60,
      contractNumber: ''
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
        `reconocimiento-deuda-${data.debtorName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Información General</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="docNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº Documento</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="docDate" render={({ field }) => ( <FormItem> <FormLabel>Fecha</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Información del Deudor</h4>
        <FormField name="debtorName" render={({ field }) => ( <FormItem> <FormLabel>Nombre del Deudor</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="debtorIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº de Identificación</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="debtorAddress" render={({ field }) => ( <FormItem> <FormLabel>Dirección del Deudor</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Información sobre el Préstamo</h4>
        <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº de Contrato de Préstamo</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanType" render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Préstamo</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="Préstamo Personal">Préstamo Personal</SelectItem>
                <SelectItem value="Préstamo Hipotecario">Préstamo Hipotecario</SelectItem>
                <SelectItem value="Préstamo de Automóvil">Préstamo de Automóvil</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Monto de la Deuda (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Monto en letras</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Plazo del Préstamo (meses)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generando...' : 'Generar y Descargar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
