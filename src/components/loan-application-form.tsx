"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const loanApplicationSchema = z.object({
  loanType: z.string({ required_error: 'Veuillez sélectionner un type de prêt.' }).min(1, 'Veuillez sélectionner un type de prêt.'),
  amount: z.coerce.number().min(1000, 'Le montant minimum est de 1000 €.'),
  duration: z.coerce.number().min(12, 'La durée minimum est de 12 mois.').max(360, 'La durée maximum est de 360 mois (30 ans).'),
  firstName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
});

type FormData = z.infer<typeof loanApplicationSchema>;

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
};

const ANNUAL_INTEREST_RATE = 0.02;

export function LoanApplicationForm() {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(loanApplicationSchema),
    mode: 'onBlur',
    defaultValues: {
      loanType: '',
      amount: undefined,
      duration: undefined,
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const watchedAmount = form.watch('amount');
  const watchedDuration = form.watch('duration');

  useEffect(() => {
    const amount = watchedAmount;
    const durationInMonths = watchedDuration;

    if (amount && amount > 0 && durationInMonths && durationInMonths > 0) {
      const monthlyRate = ANNUAL_INTEREST_RATE / 12;
      if (monthlyRate > 0) {
          const payment =
            (amount * monthlyRate * Math.pow(1 + monthlyRate, durationInMonths)) /
            (Math.pow(1 + monthlyRate, durationInMonths) - 1);
          setMonthlyPayment(payment);
      } else {
          setMonthlyPayment(amount / durationInMonths);
      }
    } else {
        setMonthlyPayment(0);
    }
  }, [watchedAmount, watchedDuration]);


  const onSubmit = async (data: FormData) => {
    console.log('Final data:', data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
        title: "Demande envoyée !",
        description: "Votre demande de prêt a été soumise avec succès. Nous vous contacterons bientôt.",
    });

    form.reset();
    setMonthlyPayment(0);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary">Informations sur le prêt</h3>
                 <FormField
                  control={form.control}
                  name="loanType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de prêt</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type de prêt..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pret-personnel">Prêt Personnel</SelectItem>
                          <SelectItem value="pret-immobilier">Prêt Immobilier</SelectItem>
                          <SelectItem value="pret-auto">Prêt Auto</SelectItem>
                          <SelectItem value="pret-professionnel">Prêt Professionnel</SelectItem>
                          <SelectItem value="rachat-de-credits">Rachat de Crédits</SelectItem>
                          <SelectItem value="pret-etudiant">Prêt Étudiant</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Montant souhaité (€)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ex: 10000" {...field} onChange={e => field.onChange(e.target.valueAsNumber || undefined)} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Durée de remboursement (en mois)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ex: 60" {...field} onChange={e => field.onChange(e.target.valueAsNumber || undefined)} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <div className="space-y-6">
                 <h3 className="text-xl font-semibold text-primary">Informations Personnelles</h3>
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => ( <FormItem> <FormLabel>Prénom</FormLabel> <FormControl> <Input placeholder="John" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="lastName" render={({ field }) => ( <FormItem> <FormLabel>Nom</FormLabel> <FormControl> <Input placeholder="Doe" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                </div>
                 <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl> <Input type="email" placeholder="john.doe@email.com" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>

                 {monthlyPayment > 0 && (
                     <div className="mt-6 pt-6 border-t border-border text-center bg-secondary/20 p-4 rounded-lg">
                        <p className="text-muted-foreground">Votre mensualité estimée</p>
                        <p className="text-3xl font-bold text-accent mt-1">
                        {formatCurrency(monthlyPayment)} / mois
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Basé sur un taux d'intérêt annuel fixe de {ANNUAL_INTEREST_RATE * 100}%. Ceci est une estimation.
                        </p>
                    </div>
                )}
            </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
             <Button type="submit" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Envoi en cours..." : "Soumettre ma demande"}
            </Button>
        </div>
      </form>
    </Form>
  );
}