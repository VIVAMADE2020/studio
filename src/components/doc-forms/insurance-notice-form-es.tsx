
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
  noticeDate: z.string().min(1, 'Requerido'),
  borrowerName: z.string().min(1, 'Requerido'),
  contractNumber: z.string().min(1, 'Requerido'),
  groupPolicyNumber: z.string().min(1, 'Requerido'),
  guarantees: z.string().min(1, 'Requerido'),
  exclusions: z.string().min(1, 'Requerido'),
  claimProcedure: z.string().min(1, 'Requerido'),
});

interface InsuranceNoticeFormEsProps {
    setFormData: (data: any) => void;
}

export function InsuranceNoticeFormEs({ setFormData }: InsuranceNoticeFormEsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noticeDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      contractNumber: '',
      groupPolicyNumber: 'FLEX-ASSUR-GR-001',
      guarantees: `- Fallecimiento: cobertura del capital pendiente.\n- Pérdida Total e Irreversible de Autonomía (PTIA): cobertura del capital pendiente.\n- Incapacidad Temporal Total para el Trabajo (ITT): cobertura de las cuotas tras un período de carencia.\n- Invalidez Permanente (Total o Parcial): cobertura parcial o total de las cuotas.`,
      exclusions: `- Actos intencionados del asegurado.\n- Riesgos aéreos (excepto como pasajero en una aerolínea autorizada).\n- Deportes peligrosos practicados profesionalmente.\n- Afecciones no declaradas en la suscripción.`,
      claimProcedure: `En caso de siniestro, contacte inmediatamente con FLEXFOND por teléfono o correo electrónico. Un gestor le indicará los documentos justificativos a presentar (certificado médico, etc.) para el estudio de su expediente.`,
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
        `noticia-seguro-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">Información General</h4>
        <FormField name="noticeDate" render={({ field }) => ( <FormItem> <FormLabel>Fecha de la Noticia</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Nombre del Adherente (Prestatario)</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº Contrato de Préstamo Asociado</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>Nº Póliza Colectiva</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>

        <h4 className="font-bold text-center pt-4 border-t">Contenido de la Noticia</h4>
        <FormField name="guarantees" render={({ field }) => ( <FormItem> <FormLabel>Garantías Incluidas</FormLabel> <FormControl><Textarea rows={6} {...field} /></FormControl> <FormDescription>Use guiones para las listas.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="exclusions" render={({ field }) => ( <FormItem> <FormLabel>Principales Exclusiones</FormLabel> <FormControl><Textarea rows={5} {...field} /></FormControl> <FormDescription>Enumere los casos no cubiertos.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="claimProcedure" render={({ field }) => ( <FormItem> <FormLabel>Procedimiento en Caso de Siniestro</FormLabel> <FormControl><Textarea rows={4} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generando...' : 'Generar y Descargar PDF'}</Button>
      </form>
    </FormProvider>
  );
}
