
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
  noticeDate: z.string().min(1, 'Requis'),
  borrowerName: z.string().min(1, 'Requis'),
  contractNumber: z.string().min(1, 'Requis'),
  groupPolicyNumber: z.string().min(1, 'Requis'),
  guarantees: z.string().min(1, 'Requis'),
  exclusions: z.string().min(1, 'Requis'),
  claimProcedure: z.string().min(1, 'Requis'),
});

interface InsuranceNoticeFormProps {
    setFormData: (data: any) => void;
}

export function InsuranceNoticeForm({ setFormData }: InsuranceNoticeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noticeDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      contractNumber: '',
      groupPolicyNumber: 'FLEX-ASSUR-GR-001',
      guarantees: `- Décès : prise en charge du capital restant dû.\n- Perte Totale et Irréversible d’Autonomie (PTIA) : prise en charge du capital restant dû.\n- Incapacité Temporaire Totale de travail (ITT) : prise en charge des échéances après franchise.\n- Invalidité Permanente (Totale ou Partielle) : prise en charge partielle ou totale des échéances.`,
      exclusions: `- Faits intentionnels de l'assuré.\n- Risques aériens (sauf passager d'une compagnie agréée).\n- Sports dangereux pratiqués à titre professionnel.\n- Affections non déclarées à la souscription.`,
      claimProcedure: `En cas de sinistre, contactez immédiatement FLEXFOND par téléphone ou par email. Un gestionnaire vous indiquera les pièces justificatives à fournir (certificat médical, etc.) pour l'étude de votre dossier.`,
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
        `notice-assurance-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Informations Générales</h4>
        <FormField name="noticeDate" render={({ field }) => ( <FormItem> <FormLabel>Date de la notice</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nom de l'Adhérent (Emprunteur)</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>N° de Contrat de Prêt Associé</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>N° de Police Groupe</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>

        <h4 className="font-bold text-center pt-4 border-t">Contenu de la Notice</h4>
        <FormField name="guarantees" render={({ field }) => ( <FormItem> <FormLabel>Garanties Incluses</FormLabel> <FormControl><Textarea rows={6} {...field} /></FormControl> <FormDescription>Utilisez des tirets pour les listes.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="exclusions" render={({ field }) => ( <FormItem> <FormLabel>Principales Exclusions</FormLabel> <FormControl><Textarea rows={5} {...field} /></FormControl> <FormDescription>Listez les cas non couverts.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="claimProcedure" render={({ field }) => ( <FormItem> <FormLabel>Procédure en Cas de Sinistre</FormLabel> <FormControl><Textarea rows={4} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Génération...' : 'Générer et Télécharger PDF'}</Button>
      </form>
    </FormProvider>
  );
}
