"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AnimatePresence, motion } from 'framer-motion';

const formSchema = z.object({
  loanType: z.string({ required_error: 'Veuillez sélectionner un type de prêt.' }),
  amount: z.coerce.number().min(1000, 'Le montant minimum est de 1000 €.'),
  duration: z.coerce.number().min(12, 'La durée minimum est de 12 mois.').max(360, 'La durée maximum est de 360 mois.'),
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
  phone: z.string().min(10, "Le téléphone est invalide."),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La date de naissance est invalide."),
  address: z.string().min(5, "L'adresse est requise."),
  city: z.string().min(2, "La ville est requise."),
  zipCode: z.string().min(5, "Le code postal est requis."),
  employmentStatus: z.string({ required_error: "La situation professionnelle est requise." }),
  monthlyIncome: z.coerce.number().min(0, "Le revenu doit être positif."),
  housingStatus: z.string({ required_error: "La situation de logement est requise." }),
});

type FormData = z.infer<typeof formSchema>;

const ANNUAL_INTEREST_RATE = 0.02;

export function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanType: undefined,
      amount: 0,
      duration: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      address: '',
      city: '',
      zipCode: '',
      employmentStatus: undefined,
      monthlyIncome: 0,
      housingStatus: undefined,
    },
  });

  const watchedAmount = form.watch('amount');
  const watchedDuration = form.watch('duration');

  useEffect(() => {
    const amount = Number(watchedAmount);
    const durationInMonths = Number(watchedDuration);

    if (amount > 0 && durationInMonths > 0) {
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
  
  const steps = [
    { title: "Détails du prêt", fields: ["loanType", "amount", "duration"] },
    { title: "Informations personnelles", fields: ["firstName", "lastName", "email", "phone", "birthDate", "address", "city", "zipCode"] },
    { title: "Situation financière", fields: ["employmentStatus", "monthlyIncome", "housingStatus"] },
    { title: "Récapitulatif" },
  ];

  const nextStep = async () => {
    const currentFields = steps[currentStep].fields;
    if (currentFields) {
      const result = await form.trigger(currentFields as any);
      if (result) {
        setCurrentStep(s => s + 1);
      }
    } else {
        setCurrentStep(s => s + 1);
    }
  };

  const prevStep = () => setCurrentStep(s => s - 1);

  async function onSubmit(data: FormData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
        title: "Demande envoyée !",
        description: "Votre demande a été soumise avec succès. Nous vous contacterons bientôt.",
    });
    console.log(data);
    form.reset();
    setCurrentStep(0);
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full" />
        
        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
            >
            {currentStep === 0 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-primary">{steps[0].title}</h3>
                    <FormField
                      control={form.control}
                      name="loanType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de prêt</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Sélectionnez un type de prêt..." /></SelectTrigger>
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
                    <FormField control={form.control} name="amount" render={({ field }) => (<FormItem><FormLabel>Montant souhaité (€)</FormLabel><FormControl><Input type="number" placeholder="Ex: 10000" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="duration" render={({ field }) => (<FormItem><FormLabel>Durée de remboursement (mois)</FormLabel><FormControl><Input type="number" placeholder="Ex: 60" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl><FormMessage /></FormItem>)} />

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
            )}

            {currentStep === 1 && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-primary">{steps[1].title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => ( <FormItem> <FormLabel>Prénom</FormLabel> <FormControl> <Input placeholder="John" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name="lastName" render={({ field }) => ( <FormItem> <FormLabel>Nom</FormLabel> <FormControl> <Input placeholder="Doe" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    </div>
                    <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl> <Input type="email" placeholder="john.doe@email.com" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Téléphone</FormLabel> <FormControl> <Input type="tel" placeholder="0612345678" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="birthDate" render={({ field }) => ( <FormItem> <FormLabel>Date de naissance</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="address" render={({ field }) => ( <FormItem> <FormLabel>Adresse</FormLabel> <FormControl> <Input placeholder="123 Rue de la Finance" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                     <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="zipCode" render={({ field }) => ( <FormItem> <FormLabel>Code Postal</FormLabel> <FormControl> <Input placeholder="75001" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name="city" render={({ field }) => ( <FormItem> <FormLabel>Ville</FormLabel> <FormControl> <Input placeholder="Paris" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    </div>
                </div>
            )}
             
            {currentStep === 2 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-primary">{steps[2].title}</h3>
                    <FormField
                      control={form.control}
                      name="employmentStatus"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Situation professionnelle</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="cdi" /></FormControl>
                                <FormLabel className="font-normal">CDI</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="cdd" /></FormControl>
                                <FormLabel className="font-normal">CDD</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="independant" /></FormControl>
                                <FormLabel className="font-normal">Indépendant</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="retraite" /></FormControl>
                                <FormLabel className="font-normal">Retraité</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="autre" /></FormControl>
                                <FormLabel className="font-normal">Autre</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField control={form.control} name="monthlyIncome" render={({ field }) => ( <FormItem> <FormLabel>Revenu mensuel net (€)</FormLabel> <FormControl> <Input type="number" placeholder="Ex: 2500" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /> </FormControl> <FormMessage /> </FormItem> )}/>
                     <FormField
                      control={form.control}
                      name="housingStatus"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Situation de logement</FormLabel>
                           <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="proprietaire" /></FormControl>
                                    <FormLabel className="font-normal">Propriétaire</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="locataire" /></FormControl>
                                    <FormLabel className="font-normal">Locataire</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="gratuit" /></FormControl>
                                    <FormLabel className="font-normal">Hébergé à titre gratuit</FormLabel>
                                </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
            )}

            {currentStep === 3 && (
                <div>
                     <h3 className="text-xl font-semibold text-primary">{steps[3].title}</h3>
                     <Card className="mt-4">
                        <CardContent className="p-6 space-y-4">
                            <p><strong>Type de prêt:</strong> {form.getValues('loanType')}</p>
                            <p><strong>Montant:</strong> {formatCurrency(Number(form.getValues('amount')))}</p>
                            <p><strong>Durée:</strong> {form.getValues('duration')} mois</p>
                            <p><strong>Nom:</strong> {form.getValues('firstName')} {form.getValues('lastName')}</p>
                             <p><strong>Email:</strong> {form.getValues('email')}</p>
                            <p><strong>Mensualité estimée:</strong> {formatCurrency(monthlyPayment)} / mois</p>
                        </CardContent>
                     </Card>
                </div>
            )}
            </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-6 border-t">
          {currentStep > 0 && <Button type="button" variant="secondary" onClick={prevStep}>Précédent</Button>}
          <div/>
          {currentStep < steps.length - 1 && <Button type="button" onClick={nextStep}>Suivant</Button>}
          {currentStep === steps.length - 1 && (
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                {form.formState.isSubmitting ? "Envoi en cours..." : "Soumettre ma demande"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
