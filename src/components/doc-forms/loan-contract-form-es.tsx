
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
  contractNumber: z.string().min(1, 'Requerido'),
  contractDate: z.string().min(1, 'Requerido'),
  borrowerName: z.string().min(1, 'Requerido'),
  borrowerAddress: z.string().min(1, 'Requerido'),
  borrowerIdNumber: z.string().min(1, 'Requerido'),
  loanType: z.string({ required_error: 'Requerido'}),
  loanAmount: z.coerce.number().positive('Se requiere un monto positivo'),
  loanAmountInWords: z.string().min(1, 'Requerido'),
  interestRate: z.coerce.number().min(0, 'Se requiere una tasa positiva'),
  loanTerm: z.coerce.number().positive('Se requiere una duración positiva (en meses)'),
  repaymentStartDate: z.string().min(1, 'Fecha requerida'),
  repaymentEndDate: z.string().min(1, 'Fecha requerida'),
  monthlyPayment: z.coerce.number().positive('Se requiere una cuota positiva'),
  totalCreditCost: z.coerce.number().min(0, 'Se requiere un costo positivo'),
  totalAmountDue: z.coerce.number().positive('Se requiere un monto positivo'),
});

interface LoanContractFormEsProps {
    setFormData: (data: any) => void;
}

export function LoanContractFormEs({ setFormData }: LoanContractFormEsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractNumber: `CTR-ES-${new Date().getFullYear()}-`,
      contractDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      borrowerAddress: '',
      borrowerIdNumber: '',
      loanType: 'Préstamo Personal',
      loanAmount: 10000,
      loanAmountInWords: "Diez mil",
      interestRate: 2.5,
      loanTerm: 60,
      repaymentStartDate: new Date().toISOString().split('T')[0],
      repaymentEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
      monthlyPayment: 177.47,
      totalCreditCost: 648.20,
      totalAmountDue: 10648.20
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
        `contrato-prestamo-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Información General</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº de Contrato</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="contractDate" render={({ field }) => ( <FormItem> <FormLabel>Fecha del Contrato</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Información del Prestatario</h4>
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nombre del Prestatario</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerIdNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº de Identificación</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerAddress" render={({ field }) => ( <FormItem> <FormLabel>Dirección del Prestatario</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
       
        <h4 className="font-bold text-center pt-4 border-t">Características del Préstamo</h4>
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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Monto del Préstamo (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Monto en letras</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="interestRate" render={({ field }) => ( <FormItem> <FormLabel>TAE (%)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Plazo del Préstamo (meses)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Amortización</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="repaymentStartDate" render={({ field }) => ( <FormItem> <FormLabel>1ª Cuota</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="repaymentEndDate" render={({ field }) => ( <FormItem> <FormLabel>Última Cuota</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField name="monthlyPayment" render={({ field }) => ( <FormItem> <FormLabel>Cuota Mensual (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="totalCreditCost" render={({ field }) => ( <FormItem> <FormLabel>Costo Total del Crédito (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="totalAmountDue" render={({ field }) => ( <FormItem> <FormLabel>Importe Total Adeudado (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generando...' : 'Generar y Descargar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
