"use client";

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const step1Schema = z.object({
  loanType: z.string({ required_error: 'Veuillez sélectionner un type de prêt.' }),
  amount: z.coerce.number().min(1000, 'Le montant minimum est de 1000 €.'),
  duration: z.coerce.number().min(12, 'La durée minimum est de 12 mois.').max(360, 'La durée maximum est de 360 mois (30 ans).'),
});

const step2Schema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères.'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères.'),
  email: z.string().email('Veuillez entrer une adresse email valide.'),
});

const formSchema = step1Schema.merge(step2Schema);
type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: 'Informations sur le prêt', fields: ['loanType', 'amount', 'duration'] },
  { id: 2, title: 'Informations personnelles', fields: ['firstName', 'lastName', 'email'] },
  { id: 3, title: 'Vérification et envoi' },
];

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
};

// Fixed annual interest rate
const ANNUAL_INTEREST_RATE = 0.02;

export function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const { toast } = useToast();
  
  const { register, handleSubmit, trigger, getValues, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(currentStep === 0 ? step1Schema : step2Schema),
    defaultValues: formData,
    mode: 'onBlur'
  });

  const watchedAmount = useWatch({ control, name: 'amount' });
  const watchedDuration = useWatch({ control, name: 'duration' });

  useEffect(() => {
    const amount = watchedAmount;
    const durationInMonths = watchedDuration;

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


  const processForm: SubmitHandler<FormData> = async (data) => {
    // In a real app, you'd send the data to your backend
    console.log('Final data:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
        title: "Demande envoyée !",
        description: "Votre demande de prêt a été soumise avec succès. Nous vous contacterons bientôt.",
    });

    // Reset form or redirect
    setCurrentStep(0);
    setFormData({});
    setMonthlyPayment(0);
  };

  type FieldName = keyof FormData;

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });
    
    if (!output) return;

    setFormData(prev => ({...prev, ...getValues()}));

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  return (
    <div className="space-y-8">
        <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full" />
        
        <form onSubmit={handleSubmit(processForm)} className="overflow-x-hidden">
            <AnimatePresence mode="wait">
                 {currentStep === 0 && (
                    <motion.div
                        key="step1"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-semibold text-primary">{steps[0].title}</h3>
                        <div>
                            <Label>Type de prêt</Label>
                             <Select onValueChange={(value) => {
                                const currentValues = getValues();
                                setFormData({...currentValues, loanType: value});
                             }} defaultValue={formData.loanType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un type de prêt..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pret-personnel">Prêt Personnel</SelectItem>
                                    <SelectItem value="pret-immobilier">Prêt Immobilier</SelectItem>
                                    <SelectItem value="pret-auto">Prêt Auto</SelectItem>
                                    <SelectItem value="autre">Autre</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.loanType && <p className="text-red-500 text-sm mt-1">{errors.loanType.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="amount">Montant souhaité (€)</Label>
                            <Input id="amount" type="number" {...register('amount')} placeholder="Ex: 10000" />
                            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="duration">Durée de remboursement (en mois)</Label>
                            <Input id="duration" type="number" {...register('duration')} placeholder="Ex: 60" />
                            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
                        </div>

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
                    </motion.div>
                )}

                {currentStep === 1 && (
                     <motion.div
                        key="step2"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-semibold text-primary">{steps[1].title}</h3>
                        <div>
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input id="firstName" {...register('firstName')} placeholder="John" />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="lastName">Nom</Label>
                            <Input id="lastName" {...register('lastName')} placeholder="Doe" />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register('email')} placeholder="john.doe@email.com" />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                    </motion.div>
                )}
                
                {currentStep === 2 && (
                    <motion.div
                        key="step3"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-semibold text-primary">{steps[2].title}</h3>
                        <div className="p-6 bg-secondary/20 rounded-lg space-y-4">
                            <h4 className="font-semibold text-foreground">Récapitulatif de votre demande</h4>
                            <div className="text-sm text-muted-foreground">
                                <p><strong>Type de prêt:</strong> {formData.loanType}</p>
                                <p><strong>Montant:</strong> {formatCurrency(formData.amount || 0)}</p>
                                <p><strong>Durée:</strong> {formData.duration} mois</p>
                                {monthlyPayment > 0 && <p><strong>Mensualité estimée:</strong> {formatCurrency(monthlyPayment)} / mois</p>}
                                <hr className="my-2" />
                                <p><strong>Nom:</strong> {formData.firstName} {formData.lastName}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                            </div>
                            <p className="text-xs text-muted-foreground pt-4">En cliquant sur "Soumettre ma demande", vous confirmez que les informations sont correctes.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t flex justify-between">
                {currentStep > 0 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                        Précédent
                    </Button>
                )}
                
                {currentStep < steps.length - 1 && (
                     <Button type="button" onClick={nextStep} className="ml-auto bg-accent text-accent-foreground hover:bg-accent/90">
                        Suivant
                    </Button>
                )}

                {currentStep === steps.length - 1 && (
                    <Button type="submit" className="ml-auto bg-accent text-accent-foreground hover:bg-accent/90">
                        Soumettre ma demande
                    </Button>
                )}
            </div>
        </form>
    </div>
  );
}

    