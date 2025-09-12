
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
  docNumber: z.string().min(1, 'Obrigatório'),
  docDate: z.string().min(1, 'Obrigatório'),
  debtorName: z.string().min(1, 'Obrigatório'),
  debtorAddress: z.string().min(1, 'Obrigatório'),
  debtorIdNumber: z.string().min(1, 'Obrigatório'),
  loanType: z.string({ required_error: 'Obrigatório'}),
  loanAmount: z.coerce.number().positive('É necessário um montante positivo'),
  loanAmountInWords: z.string().min(1, 'Obrigatório'),
  loanTerm: z.coerce.number().positive('É necessária uma duração positiva (em meses)'),
  contractNumber: z.string().min(1, 'Obrigatório'),
});

interface DebtAcknowledgementFormPtProps {
    setFormData: (data: any) => void;
}

export function DebtAcknowledgementFormPt({ setFormData }: DebtAcknowledgementFormPtProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docNumber: `RDD-PT-${new Date().getFullYear()}-`,
      docDate: new Date().toISOString().split('T')[0],
      debtorName: '',
      debtorAddress: '',
      debtorIdNumber: '',
      loanType: 'Crédito Pessoal',
      loanAmount: 10000,
      loanAmountInWords: 'Dez mil',
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
        `reconhecimento-divida-${data.debtorName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Informações Gerais</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="docNumber" render={({ field }) => ( <FormItem> <FormLabel>N.º do Documento</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="docDate" render={({ field }) => ( <FormItem> <FormLabel>Data</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Informações do Devedor</h4>
        <FormField name="debtorName" render={({ field }) => ( <FormItem> <FormLabel>Nome do Devedor</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="debtorIdNumber" render={({ field }) => ( <FormItem> <FormLabel>N.º de Identificação</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="debtorAddress" render={({ field }) => ( <FormItem> <FormLabel>Endereço do Devedor</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Informações sobre o Crédito</h4>
        <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>N.º do Contrato de Crédito</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanType" render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Crédito</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="Crédito Pessoal">Crédito Pessoal</SelectItem>
                <SelectItem value="Crédito Habitação">Crédito Habitação</SelectItem>
                <SelectItem value="Crédito Automóvel">Crédito Automóvel</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Montante da Dívida (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Montante por extenso</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Prazo do Crédito (meses)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'A gerar...' : 'Gerar e Baixar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
