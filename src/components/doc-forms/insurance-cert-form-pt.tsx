
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
  certNumber: z.string().min(1, 'Obrigatório'),
  certDate: z.string().min(1, 'Obrigatório'),
  insuredName: z.string().min(1, 'Obrigatório'),
  insuredDob: z.string().min(1, 'Obrigatório'),
  insuredAddress: z.string().min(1, 'Obrigatório'),
  insuredIdNumber: z.string().min(1, 'Obrigatório'),
  contractNumber: z.string().min(1, 'Obrigatório'),
  loanType: z.string({ required_error: 'Obrigatório'}),
  loanAmount: z.coerce.number().positive('É necessário um montante positivo'),
  coverageDuration: z.coerce.number().positive('É necessária uma duração positiva'),
  monthlyPremium: z.coerce.number().min(0, 'É necessário um custo positivo'),
  groupPolicyNumber: z.string().min(1, 'Obrigatório'),
});

interface InsuranceCertificateFormPtProps {
    setFormData: (data: any) => void;
}

export function InsuranceCertificateFormPt({ setFormData }: InsuranceCertificateFormPtProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certNumber: `ASSUR-PT-${new Date().getFullYear()}-`,
      certDate: new Date().toISOString().split('T')[0],
      insuredName: '',
      insuredDob: '',
      insuredAddress: '',
      insuredIdNumber: '',
      contractNumber: '',
      loanType: 'Crédito Pessoal',
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
         <h4 className="font-bold text-center">Informações Gerais</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="certNumber" render={({ field }) => ( <FormItem> <FormLabel>N.º do Certificado</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="certDate" render={({ field }) => ( <FormItem> <FormLabel>Data de Emissão</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
         <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>N.º Apólice de Grupo</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <h4 className="font-bold text-center pt-4 border-t">Informações do Segurado</h4>
        <FormField name="insuredName" render={({ field }) => ( <FormItem> <FormLabel>Nome do Segurado</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="insuredDob" render={({ field }) => ( <FormItem> <FormLabel>Data de Nascimento</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="insuredIdNumber" render={({ field }) => ( <FormItem> <FormLabel>N.º de Identificação</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField name="insuredAddress" render={({ field }) => ( <FormItem> <FormLabel>Endereço do Segurado</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Detalhes do Crédito Segurado</h4>
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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Capital Segurado (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="coverageDuration" render={({ field }) => ( <FormItem> <FormLabel>Duração da Cobertura (meses)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Custo do Seguro</h4>
        <FormField name="monthlyPremium" render={({ field }) => ( <FormItem> <FormLabel>Prémio Mensal (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
       
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'A gerar...' : 'Gerar e Baixar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
