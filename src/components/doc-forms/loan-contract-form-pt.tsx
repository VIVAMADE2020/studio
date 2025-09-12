
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
  contractNumber: z.string().min(1, 'Obrigatório'),
  contractDate: z.string().min(1, 'Obrigatório'),
  borrowerName: z.string().min(1, 'Obrigatório'),
  borrowerAddress: z.string().min(1, 'Obrigatório'),
  borrowerIdNumber: z.string().min(1, 'Obrigatório'),
  loanType: z.string({ required_error: 'Obrigatório'}),
  loanAmount: z.coerce.number().positive('É necessário um montante positivo'),
  loanAmountInWords: z.string().min(1, 'Obrigatório'),
  interestRate: z.coerce.number().min(0, 'É necessária uma taxa positiva'),
  loanTerm: z.coerce.number().positive('É necessária uma duração positiva (em meses)'),
  repaymentStartDate: z.string().min(1, 'Data obrigatória'),
  repaymentEndDate: z.string().min(1, 'Data obrigatória'),
  monthlyPayment: z.coerce.number().positive('É necessária uma prestação positiva'),
  totalCreditCost: z.coerce.number().min(0, 'É necessário um custo positivo'),
  totalAmountDue: z.coerce.number().positive('É necessário um montante positivo'),
});

interface LoanContractFormPtProps {
    setFormData: (data: any) => void;
}

export function LoanContractFormPt({ setFormData }: LoanContractFormPtProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractNumber: `CTR-PT-${new Date().getFullYear()}-`,
      contractDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      borrowerAddress: '',
      borrowerIdNumber: '',
      loanType: 'Crédito Pessoal',
      loanAmount: 10000,
      loanAmountInWords: "Dez mil",
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
        `contrato-credito-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Informações Gerais</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>N.º do Contrato</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="contractDate" render={({ field }) => ( <FormItem> <FormLabel>Data do Contrato</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Informações do Mutuário</h4>
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nome do Mutuário</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerIdNumber" render={({ field }) => ( <FormItem> <FormLabel>N.º de Identificação</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerAddress" render={({ field }) => ( <FormItem> <FormLabel>Endereço do Mutuário</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
       
        <h4 className="font-bold text-center pt-4 border-t">Características do Crédito</h4>
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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Montante do Crédito (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Montante por extenso</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="interestRate" render={({ field }) => ( <FormItem> <FormLabel>TAEG (%)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Prazo do Crédito (meses)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Reembolso</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="repaymentStartDate" render={({ field }) => ( <FormItem> <FormLabel>1ª Prestação</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="repaymentEndDate" render={({ field }) => ( <FormItem> <FormLabel>Última Prestação</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField name="monthlyPayment" render={({ field }) => ( <FormItem> <FormLabel>Prestação Mensal (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="totalCreditCost" render={({ field }) => ( <FormItem> <FormLabel>Custo Total do Crédito (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="totalAmountDue" render={({ field }) => ( <FormItem> <FormLabel>Montante Total em Dívida (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'A gerar...' : 'Gerar e Baixar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
