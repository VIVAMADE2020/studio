
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
  noticeDate: z.string().min(1, 'Erforderlich'),
  borrowerName: z.string().min(1, 'Erforderlich'),
  contractNumber: z.string().min(1, 'Erforderlich'),
  groupPolicyNumber: z.string().min(1, 'Erforderlich'),
  guarantees: z.string().min(1, 'Erforderlich'),
  exclusions: z.string().min(1, 'Erforderlich'),
  claimProcedure: z.string().min(1, 'Erforderlich'),
});

interface InsuranceNoticeFormDeProps {
    setFormData: (data: any) => void;
}

export function InsuranceNoticeFormDe({ setFormData }: InsuranceNoticeFormDeProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noticeDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      contractNumber: '',
      groupPolicyNumber: 'FLEX-ASSUR-GR-001',
      guarantees: `- Tod: Übernahme des Restkapitals.\n- Totaler und unwiderruflicher Autonomieverlust (PTIA): Übernahme des Restkapitals.\n- Vollständige vorübergehende Arbeitsunfähigkeit (ITT): Übernahme der Raten nach einer Karenzzeit.\n- Dauernde Invalidität (Total oder Partiell): teilweise oder vollständige Übernahme der Raten.`,
      exclusions: `- Vorsätzliche Handlungen des Versicherten.\n- Luftfahrtrisiken (außer als Passagier einer zugelassenen Fluggesellschaft).\n- Beruflich ausgeübte gefährliche Sportarten.\n- Bei Vertragsabschluss nicht angegebene Erkrankungen.`,
      claimProcedure: `Im Schadensfall kontaktieren Sie FLEXFOND unverzüglich per Telefon oder E-Mail. Ein Sachbearbeiter wird Ihnen die zur Prüfung Ihres Dossiers erforderlichen Unterlagen (ärztliches Attest usw.) mitteilen.`,
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
        `versicherungsinformation-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Allgemeine Informationen</h4>
        <FormField name="noticeDate" render={({ field }) => ( <FormItem> <FormLabel>Datum der Mitteilung</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Name des Mitglieds (Kreditnehmer)</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>Zugehörige Kreditvertrags-Nr.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>Gruppenpolicen-Nr.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>

        <h4 className="font-bold text-center pt-4 border-t">Inhalt der Mitteilung</h4>
        <FormField name="guarantees" render={({ field }) => ( <FormItem> <FormLabel>Enthaltene Garantien</FormLabel> <FormControl><Textarea rows={6} {...field} /></FormControl> <FormDescription>Verwenden Sie Bindestriche für Listen.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="exclusions" render={({ field }) => ( <FormItem> <FormLabel>Hauptausschlüsse</FormLabel> <FormControl><Textarea rows={5} {...field} /></FormControl> <FormDescription>Listen Sie die nicht gedeckten Fälle auf.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="claimProcedure" render={({ field }) => ( <FormItem> <FormLabel>Verfahren im Schadensfall</FormLabel> <FormControl><Textarea rows={4} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Wird generiert...' : 'PDF Generieren & Herunterladen'}</Button>
      </form>
    </FormProvider>
  );
}
