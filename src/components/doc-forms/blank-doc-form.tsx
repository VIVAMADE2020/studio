
"use client";
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePDFGenerator } from '@/hooks/use-pdf-generator';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  docTitle: z.string().min(1, 'Un titre est requis'),
  docContent: z.string().optional(),
});

interface BlankDocumentFormProps {
    setFormData: (data: any) => void;
}

export function BlankDocumentForm({ setFormData }: BlankDocumentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      docTitle: 'Nouveau Document',
      docContent: 'Contenu de votre document...',
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
        `${data.docTitle.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField name="docTitle" render={({ field }) => ( <FormItem> <FormLabel>Titre du Document</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="docContent" render={({ field }) => ( <FormItem> <FormLabel>Contenu</FormLabel> <FormControl><Textarea rows={15} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Génération...' : 'Générer et Télécharger PDF'}</Button>
      </form>
    </FormProvider>
  );
}
