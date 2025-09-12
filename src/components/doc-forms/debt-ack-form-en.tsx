
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
  docNumber: z.string().min(1, 'Required'),
  docDate: z.string().min(1, 'Required'),
  debtorName: z.string().min(1, 'Required'),
  debtorAddress: z.string().min(1, 'Required'),
  debtorIdNumber: z.string().min(1, 'Required'),
  loanType: z.string({ required_error: 'Required'}),
  loanAmount: z.coerce.number().positive('Positive amount required'),
  loanAmountInWords: z.string().min(1, 'Required'),
  loanTerm: z.coerce.number().positive('Positive duration required (in months)'),
  contractNumber: z.string().min(1, 'Required'),
});

interface DebtAcknowledgementFormEnProps {
    setFormData: (data: any) => void;
}

export function DebtAcknowledgementFormEn({ setFormData }: DebtAcknowledgementFormEnProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docNumber: `RDD-EN-${new Date().getFullYear()}-`,
      docDate: new Date().toISOString().split('T')[0],
      debtorName: '',
      debtorAddress: '',
      debtorIdNumber: '',
      loanType: 'Personal Loan',
      loanAmount: 10000,
      loanAmountInWords: 'Ten thousand',
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
        `debt-acknowledgement-${data.debtorName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">General Information</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="docNumber" render={({ field }) => ( <FormItem> <FormLabel>Document No.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="docDate" render={({ field }) => ( <FormItem> <FormLabel>Date</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Debtor Information</h4>
        <FormField name="debtorName" render={({ field }) => ( <FormItem> <FormLabel>Debtor's Name</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="debtorIdNumber" render={({ field }) => ( <FormItem> <FormLabel>ID Number</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="debtorAddress" render={({ field }) => ( <FormItem> <FormLabel>Debtor's Address</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Loan Information</h4>
        <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>Loan Contract No.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanType" render={({ field }) => (
          <FormItem>
            <FormLabel>Loan Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                <SelectItem value="Mortgage Loan">Mortgage Loan</SelectItem>
                <SelectItem value="Car Loan">Car Loan</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Debt Amount (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Amount in words</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Loan Term (months)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generating...' : 'Generate & Download PDF'}</Button>
      </form>
    </FormProvider>
  );
}
