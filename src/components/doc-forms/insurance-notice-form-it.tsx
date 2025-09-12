
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
  noticeDate: z.string().min(1, 'Richiesto'),
  borrowerName: z.string().min(1, 'Richiesto'),
  contractNumber: z.string().min(1, 'Richiesto'),
  groupPolicyNumber: z.string().min(1, 'Richiesto'),
  guarantees: z.string().min(1, 'Richiesto'),
  exclusions: z.string().min(1, 'Richiesto'),
  claimProcedure: z.string().min(1, 'Richiesto'),
});

interface InsuranceNoticeFormItProps {
    setFormData: (data: any) => void;
}

export function InsuranceNoticeFormIt({ setFormData }: InsuranceNoticeFormItProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noticeDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      contractNumber: '',
      groupPolicyNumber: 'FLEX-ASSUR-GR-001',
      guarantees: `- Decesso: pagamento del capitale residuo.\n- Perdita Totale e Irreversibile di Autonomia (PTIA): pagamento del capitale residuo.\n- Invalidità Temporanea Totale al Lavoro (ITT): copertura delle rate dopo un periodo di franchigia.\n- Invalidità Permanente (Totale o Parziale): copertura parziale o totale delle rate.`,
      exclusions: `- Atti intenzionali dell'assicurato.\n- Rischi aeronautici (tranne come passeggero di una compagnia aerea autorizzata).\n- Sport pericolosi praticati a livello professionale.\n- Affezioni non dichiarate al momento della sottoscrizione.`,
      claimProcedure: `In caso di sinistro, contattare immediatamente FLEXFOND per telefono o e-mail. Un responsabile indicherà i documenti giustificativi da fornire (certificato medico, ecc.) per l'esame della pratica.`,
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
        `avviso-assicurazione-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Informazioni Generali</h4>
        <FormField name="noticeDate" render={({ field }) => ( <FormItem> <FormLabel>Data dell'Avviso</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nome dell'Aderente (Mutuatario)</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>N. Contratto di Prestito Associato</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>N. Polizza Collettiva</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>

        <h4 className="font-bold text-center pt-4 border-t">Contenuto dell'Avviso</h4>
        <FormField name="guarantees" render={({ field }) => ( <FormItem> <FormLabel>Garanzie Incluse</FormLabel> <FormControl><Textarea rows={6} {...field} /></FormControl> <FormDescription>Usa i trattini per gli elenchi.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="exclusions" render={({ field }) => ( <FormItem> <FormLabel>Esclusioni Principali</FormLabel> <FormControl><Textarea rows={5} {...field} /></FormControl> <FormDescription>Elenca i casi non coperti.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="claimProcedure" render={({ field }) => ( <FormItem> <FormLabel>Procedura in Caso di Sinistro</FormLabel> <FormControl><Textarea rows={4} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generazione...' : 'Genera e Scarica PDF'}</Button>
      </form>
    </FormProvider>
  );
}
