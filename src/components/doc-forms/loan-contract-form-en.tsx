
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
  contractNumber: z.string().min(1, 'Required'),
  contractDate: z.string().min(1, 'Required'),
  borrowerName: z.string().min(1, 'Required'),
  borrowerAddress: z.string().min(1, 'Required'),
  borrowerIdNumber: z.string().min(1, 'Required'),
  loanType: z.string({ required_error: 'Required'}),
  loanAmount: z.coerce.number().positive('Positive amount required'),
  loanAmountInWords: z.string().min(1, 'Required'),
  interestRate: z.coerce.number().min(0, 'Positive rate required'),
  loanTerm: z.coerce.number().positive('Positive duration required (in months)'),
  repaymentStartDate: z.string().min(1, 'Date required'),
  repaymentEndDate: z.string().min(1, 'Date required'),
  monthlyPayment: z.coerce.number().positive('Positive installment required'),
  totalCreditCost: z.coerce.number().min(0, 'Positive cost required'),
  totalAmountDue: z.coerce.number().positive('Positive amount required'),
});

interface LoanContractFormEnProps {
    setFormData: (data: any) => void;
}

export function LoanContractFormEn({ setFormData }: LoanContractFormEnProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractNumber: `CTR-EN-${new Date().getFullYear()}-`,
      contractDate: new Date().toISOString().split('T')[0],
      borrowerName: '',
      borrowerAddress: '',
      borrowerIdNumber: '',
      loanType: 'Personal Loan',
      loanAmount: 10000,
      loanAmountInWords: "Ten thousand",
      interestRate: 2.5,
      loanTerm: 60,
      repaymentStartDate: new Date().toISOString().split('T')[0],
      repaymentEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
      monthlyPayment: 177.47,
      totalCreditCost: 648.20,
      totalAmountDue: 10648.20
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
        `loan-agreement-${data.borrowerName.replace(/\s/g, '_')}.pdf`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h4 className="font-bold text-center">General Information</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="contractNumber" render={({ field }) => ( <FormItem> <FormLabel>Contract No.</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="contractDate" render={({ field }) => ( <FormItem> <FormLabel>Contract Date</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <h4 className="font-bold text-center pt-4 border-t">Borrower Information</h4>
        <FormField name="borrowerName" render={({ field }) => ( <FormItem> <FormLabel>Borrower's Name</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerIdNumber" render={({ field }) => ( <FormItem> <FormLabel>ID Number</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="borrowerAddress" render={({ field }) => ( <FormItem> <FormLabel>Borrower's Address</FormLabel> <FormControl><Textarea rows={3} {...field} /></FormControl> <FormMessage /> </FormItem> )} />
       
        <h4 className="font-bold text-center pt-4 border-t">Loan Characteristics</h4>
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
        <FormField name="loanAmount" render={({ field }) => ( <FormItem> <FormLabel>Loan Amount (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanAmountInWords" render={({ field }) => ( <FormItem> <FormLabel>Amount in words</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="interestRate" render={({ field }) => ( <FormItem> <FormLabel>APR (%)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <FormField name="loanTerm" render={({ field }) => ( <FormItem> <FormLabel>Loan Term (months)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        
        <h4 className="font-bold text-center pt-4 border-t">Repayment</h4>
        <div className="grid grid-cols-2 gap-4">
            <FormField name="repaymentStartDate" render={({ field }) => ( <FormItem> <FormLabel>1st Installment</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="repaymentEndDate" render={({ field }) => ( <FormItem> <FormLabel>Last Installment</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        <FormField name="monthlyPayment" render={({ field }) => ( <FormItem> <FormLabel>Monthly Payment (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField name="totalCreditCost" render={({ field }) => ( <FormItem> <FormLabel>Total Cost of Credit (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField name="totalAmountDue" render={({ field }) => ( <FormItem> <FormLabel>Total Amount Due (€)</FormLabel> <FormControl><Input type="number" step="0.01" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <Button type="submit" disabled={isGenerating} className="w-full">{isGenerating ? 'Generating...' : 'Generate & Download PDF'}</Button>
      </form>
    </FormProvider>
  );
}
