
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
  noticeDate: z.string().min(1, 'Required'),
  borrowerName: z.string().min(1, 'Required'),
  contractNumber: z.string().min(1, 'Required'),
  groupPolicyNumber: z.string().min(1, 'Required'),
  guarantees: z.string().min(1, 'Required'),
  exclusions: z.string().min(1, 'Required'),
  claimProcedure: z.string().min(1, 'Required'),
});

interface InsuranceNoticeFormEnProps {
    setFormData: (data: any) => void;
}

export function InsuranceNoticeFormEn({ setFormData }: InsuranceNoticeFormEnProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noticeDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      contractNumber: '',
      groupPolicyNumber: 'FLEX-ASSUR-GR-001',
      guarantees: `- Death: payment of the outstanding capital.\n- Total and Irreversible Loss of Autonomy (TILA): payment of the outstanding capital.\n- Total Temporary Incapacity for Work (TTIW): coverage of installments after a deductible period.\n- Permanent Invalidity (Total or Partial): partial or total coverage of installments.`,
      exclusions: `- Intentional acts of the insured.\n- Aviation risks (except as a passenger on an authorized airline).\n- Dangerous sports practiced professionally.\n- Conditions not declared at the time of subscription.`,
      claimProcedure: `In the event of a claim, contact FLEXFOND immediately by phone or email. A manager will inform you of the supporting documents to provide (medical certificate, etc.) for the assessment of your file.`,
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
        `insurance-notice-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">General Information</h4>
        <FormField name="noticeDate" render={({ field }) => ( <FormItem> <FormLabel>Notice Date</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Member Name (Borrower)</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>Associated Loan Contract No.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>Group Policy No.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>

        <h4 className="font-bold text-center pt-4 border-t">Notice Content</h4>
        <FormField name="guarantees" render={({ field }) => ( <FormItem> <FormLabel>Included Guarantees</FormLabel> <FormControl><Textarea rows={6} {...field} /></FormControl> <FormDescription>Use dashes for lists.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="exclusions" render={({ field }) => ( <FormItem> <FormLabel>Main Exclusions</FormLabel> <FormControl><Textarea rows={5} {...field} /></FormControl> <FormDescription>List the non-covered cases.</FormDescription><FormMessage /> </FormItem> )} />
        <FormField name="claimProcedure" render={({ field }) => ( <FormItem> <FormLabel>Claim Procedure</FormLabel> <FormControl><Textarea rows={4} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generating...' : 'Generate & Download PDF'}</Button>
      </form>
    </FormProvider>
  );
}
