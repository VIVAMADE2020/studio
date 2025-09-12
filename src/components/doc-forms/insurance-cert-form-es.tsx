
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  certNumber: z.string().min(1, 'Requerido'),
  certDate: z.string().min(1, 'Requerido'),
  insuredName: z.string().min(1, 'Requerido'),
  insuredDob: z.string().min(1, 'Requerido'),
  insuredAddress: z.string().min(1, 'Requerido'),
  insuredIdNumber: z.string().min(1, 'Requerido'),
  contractNumber: z.string().min(1, 'Requerido'),
  loanType: z.string({ required_error: 'Requerido'}),
  loanAmount: z.coerce.number().positive('Se requiere un monto positivo'),
  coverageDuration: z.coerce.number().positive('Se requiere una duración positiva'),
  monthlyPremium: z.coerce.number().min(0, 'Se requiere un costo positivo'),
  groupPolicyNumber: z.string().min(1, 'Requerido'),
});

interface InsuranceCertificateFormEsProps {
    setFormData: (data: any) => void;
}

export function InsuranceCertificateFormEs({ setFormData }: InsuranceCertificateFormEsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certNumber: `ASSUR-ES-${new Date().getFullYear()}-`,
      certDate: new Date().toISOString().split('T')[0],
      insuredName: '',
      insuredDob: '',
      insuredAddress: '',
      insuredIdNumber: '',
      contractNumber: '',
      loanType: 'Préstamo Personal',
      loanAmount: 10000,
      coverageDuration: 60,
      monthlyPremium: 15.50,
      groupPolicyNumber: 'FLEX-ASSUR-GR-001',
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
        `certificado-seguro-${data.insuredName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
         <h4 className="font-bold text-center">Información General</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="certNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº de Certificado</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="certDate" render={({ field }) => ( <FormItem> <FormLabel>Fecha de Emisión</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
         <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº Póliza Colectiva</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <h4 className="font-bold text-center pt-4 border-t">Información del Asegurado</h4>
        <FormField name="insuredName" render={({ field }) => ( <FormItem> <FormLabel>Nombre del Asegurado</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="insuredDob" render={({ field }) => ( <FormItem> <FormLabel>Fecha de Nacimiento</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="insuredIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº de Identificación</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField name="insuredAddress" render={({ field }) => ( <FormItem> <FormLabel>Dirección del Asegurado</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Detalles del Préstamo Asegurado</h4>
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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Capital Asegurado (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="coverageDuration" render={({ field }) => ( <FormItem> <FormLabel>Duración de la Cobertura (meses)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Costo del Seguro</h4>
        <FormField name="monthlyPremium" render={({ field }) => ( <FormItem> <FormLabel>Prima Mensual (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
       
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generando...' : 'Generar y Descargar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
