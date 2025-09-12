
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
  actNumber: z.string().min(1, 'Requerido'),
  actDate: z.string().min(1, 'Requerido'),
  borrowerName: z.string().min(1, 'Requerido'),
  borrowerAddress: z.string().min(1, 'Requerido'),
  borrowerIdNumber: z.string().min(1, 'Requerido'),
  loanType: z.string({ required_error: 'Requerido'}),
  loanAmount: z.coerce.number().positive('Se requiere un monto positivo'),
  loanAmountInWords: z.string().min(1, 'Requerido'),
  loanTerm: z.coerce.number().positive('Se requiere una duración positiva (en meses)'),
  contractNumber: z.string().min(1, 'Requerido'),
});

interface GuaranteeAgreementFormEsProps {
    setFormData: (data: any) => void;
}

export function GuaranteeAgreementFormEs({ setFormData }: GuaranteeAgreementFormEsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      actNumber: `CAU-ES-${new Date().getFullYear()}-`,
      actDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      borrowerAddress: '',
      borrowerIdNumber: '',
      loanType: 'Préstamo Personal',
      loanAmount: 10000,
      loanAmountInWords: 'Diez mil',
      loanTerm: 60,
      contractNumber: '',
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
        `acuerdo-garantia-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Información General</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="actNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº de Acta</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="actDate" render={({ field }) => ( <FormItem> <FormLabel>Fecha del Acta</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Información del Prestatario</h4>
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nombre del Prestatario (Deudor)</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº de Identificación</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerAddress" render={({ field }) => ( <FormItem> <FormLabel>Dirección del Prestatario</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <h4 className="font-bold text-center pt-4 border-t">Información del Préstamo</h4>
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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Monto del Préstamo Garantizado (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Monto en letras</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Plazo del Préstamo (meses)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generando...' : 'Generar y Descargar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
