
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
  certNumber: z.string().min(1, 'Required'),
  certDate: z.string().min(1, 'Required'),
  insuredName: z.string().min(1, 'Required'),
  insuredDob: z.string().min(1, 'Required'),
  insuredAddress: z.string().min(1, 'Required'),
  insuredIdNumber: z.string().min(1, 'Required'),
  contractNumber: z.string().min(1, 'Required'),
  loanType: z.string({ required_error: 'Required'}),
  loanAmount: z.coerce.number().positive('Positive amount required'),
  coverageDuration: z.coerce.number().positive('Positive duration required'),
  monthlyPremium: z.coerce.number().min(0, 'Positive cost required'),
  groupPolicyNumber: z.string().min(1, 'Required'),
});

interface InsuranceCertificateFormEnProps {
    setFormData: (data: any) => void;
}

export function InsuranceCertificateFormEn({ setFormData }: InsuranceCertificateFormEnProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certNumber: `ASSUR-EN-${new Date().getFullYear()}-`,
      certDate: new Date().toISOString().split('T')[0],
      insuredName: '',
      insuredDob: '',
      insuredAddress: '',
      insuredIdNumber: '',
      contractNumber: '',
      loanType: 'Personal Loan',
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
        `insurance-certificate-${data.insuredName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
         <h4 className="font-bold text-center">General Information</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="certNumber" render={({ field }) => ( <FormItem> <FormLabel>Certificate No.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="certDate" render={({ field }) => ( <FormItem> <FormLabel>Issue Date</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
         <FormField name="groupPolicyNumber" render={({ field }) => ( <FormItem> <FormLabel>Group Policy No.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />

        <h4 className="font-bold text-center pt-4 border-t">Insured's Information</h4>
        <FormField name="insuredName" render={({ field }) => ( <FormItem> <FormLabel>Insured's Name</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="insuredDob" render={({ field }) => ( <FormItem> <FormLabel>Date of Birth</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="insuredIdNumber" render={({ field }) => ( <FormItem> <FormLabel>ID Number</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField name="insuredAddress" render={({ field }) => ( <FormItem> <FormLabel>Insured's Address</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Insured Loan Details</h4>
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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Insured Capital (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="coverageDuration" render={({ field }) => ( <FormItem> <FormLabel>Coverage Duration (months)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Insurance Cost</h4>
        <FormField name="monthlyPremium" render={({ field }) => ( <FormItem> <FormLabel>Monthly Premium (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
       
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generating...' : 'Generate & Download PDF'}</Button>
      </form>
    </FormProvider>
  );
}
