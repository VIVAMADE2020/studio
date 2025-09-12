
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
  noticeDate: z.string().min(1, 'Obrigatório'),
  borrowerName: z.string().min(1, 'Obrigatório'),
  contractNumber: z.string().min(1, 'Obrigatório'),
  groupPolicyNumber: z.string().min(1, 'Obrigatório'),
  guarantees: z.string().min(1, 'Obrigatório'),
  exclusions: z.string().min(1, 'Obrigatório'),
  claimProcedure: z.string().min(1, 'Obrigatório'),
});

interface InsuranceNoticeFormPtProps {
    setFormData: (data: any) => void;
}

export function InsuranceNoticeFormPt({ setFormData }: InsuranceNoticeFormPtProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noticeDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      contractNumber: '',
      groupPolicyNumber: 'FLEX-ASSUR-GR-001',
      guarantees: `- Morte: pagamento do capital em dívida.\n- Perda Total e Irreversível de Autonomia (PTIA): pagamento do capital em dívida.\n- Incapacidade Temporária Total para o Trabalho (ITT): cobertura das prestações após um período de franquia.\n- Invalidez Permanente (Total ou Parcial): cobertura parcial ou total das prestações.`,
      exclusions: `- Atos intencionais do segurado.\n- Riscos aéreos (exceto como passageiro de uma companhia aérea autorizada).\n- Desportos perigosos praticados profissionalmente.\n- Doenças não declaradas na subscrição.`,
      claimProcedure: `Em caso de sinistro, contacte imediatamente a FLEXFOND por telefone ou e-mail. Um gestor indicará os documentos de suporte a fornecer (atestado médico, etc.) para a análise do seu processo.`,
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
        `aviso-seguro-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Informações Gerais</h4>
        <FormField name="noticeDate" render={({ field }) => ( <FormItem> <FormLabel>Data do Aviso</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nome do Aderente (Mutuário)</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>N.º Contrato de Crédito Associado</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>N.º Apólice de Grupo</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>

        <h4 className="font-bold text-center pt-4 border-t">Conteúdo do Aviso</h4>
        <FormField name="guarantees" render={({ field }) => ( <FormItem> <FormLabel>Garantias Incluídas</FormLabel> <FormControl><Textarea rows={6} {...field} /></FormControl> <FormDescription>Use hífenes para listas.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="exclusions" render={({ field }) => ( <FormItem> <FormLabel>Principais Exclusões</FormLabel> <FormControl><Textarea rows={5} {...field} /></FormControl> <FormDescription>Liste os casos não cobertos.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="claimProcedure" render={({ field }) => ( <FormItem> <FormLabel>Procedimento em Caso de Sinistro</FormLabel> <FormControl><Textarea rows={4} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'A gerar...' : 'Gerar e Baixar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
