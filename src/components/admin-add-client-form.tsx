
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addClientAction } from "@/app/actions/clients";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";

const baseClientSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Email invalide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
  initialBalance: z.coerce.number().min(0, "Le solde initial doit être positif ou nul."),
  accountType: z.enum(['GENERAL', 'LOAN', 'INVESTMENT'], { required_error: "Vous devez sélectionner un type de compte."}),
});

const loanDetailsSchema = z.object({
    loanAmount: z.coerce.number().positive("Le montant du prêt doit être positif."),
    interestRate: z.coerce.number().min(0, "Le taux d'intérêt doit être positif ou nul."),
    loanTerm: z.coerce.number().positive("La durée doit être positive (en mois)."),
    repaymentStartDate: z.string().min(1, "La date de début est requise."),
    monthlyPayment: z.coerce.number().positive("La mensualité doit être positive."),
});

const investmentDetailsSchema = z.object({
    investedAmount: z.coerce.number().positive("Le montant investi doit être positif."),
    returnRate: z.coerce.number().positive("Le taux de rendement doit être positif."),
});


const formSchema = z.discriminatedUnion("accountType", [
    baseClientSchema.extend({ accountType: z.literal("GENERAL") }),
    baseClientSchema.extend({ accountType: z.literal("LOAN"), loanDetails: loanDetailsSchema }),
    baseClientSchema.extend({ accountType: z.literal("INVESTMENT"), investmentDetails: investmentDetailsSchema })
]);


type FormValues = z.infer<typeof formSchema>;

interface AddClientFormProps {
  onClientAdded: () => void;
}

export function AddClientForm({ onClientAdded }: AddClientFormProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      initialBalance: 0,
      accountType: "GENERAL",
    },
  });

  const accountType = form.watch("accountType");

  async function onSubmit(values: FormValues) {
    if (values.accountType === 'INVESTMENT') {
        values.initialBalance = values.investmentDetails.investedAmount;
    }
    
    const result = await addClientAction(values);
    if (result.success && result.data) {
      toast({
        title: "Client ajouté !",
        description: `Le client ${values.firstName} ${values.lastName} a été créé avec le N° d'identification ${result.data.identificationNumber}.`,
      });
      form.reset();
      onClientAdded();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: result.error || "Une erreur est survenue.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type de compte</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="GENERAL" /></FormControl>
                    <FormLabel className="font-normal">Compte Général</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="LOAN" /></FormControl>
                    <FormLabel className="font-normal">Compte de Prêt</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="INVESTMENT" /></FormControl>
                    <FormLabel className="font-normal">Compte d'Investissement</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="john.doe@email.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Mot de passe</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>)} />
        
        <AnimatePresence>
            {accountType !== 'INVESTMENT' && (
                <motion.div
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FormField control={form.control} name="initialBalance" render={({ field }) => (<FormItem><FormLabel>Solde initial d'ouverture (€)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </motion.div>
            )}
        </AnimatePresence>
        
         <AnimatePresence>
          {accountType === 'LOAN' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 overflow-hidden pt-4 border-t"
            >
                <h3 className="font-medium text-center">Détails du Prêt</h3>
                <FormField control={form.control} name="loanDetails.loanAmount" render={({ field }) => (<FormItem><FormLabel>Montant du prêt (€)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="loanDetails.interestRate" render={({ field }) => (<FormItem><FormLabel>Taux d'intérêt (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="loanDetails.loanTerm" render={({ field }) => (<FormItem><FormLabel>Durée (mois)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="loanDetails.monthlyPayment" render={({ field }) => (<FormItem><FormLabel>Mensualité (€)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="loanDetails.repaymentStartDate" render={({ field }) => (<FormItem><FormLabel>Date de début</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </motion.div>
          )}
        </AnimatePresence>
        
         <AnimatePresence>
          {accountType === 'INVESTMENT' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 overflow-hidden pt-4 border-t"
            >
                <h3 className="font-medium text-center">Détails de l'Investissement</h3>
                <FormField control={form.control} name="investmentDetails.investedAmount" render={({ field }) => (<FormItem><FormLabel>Montant investi (€)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormDescription>Ce montant sera le solde initial du compte.</FormDescription><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="investmentDetails.returnRate" defaultValue={6} render={({ field }) => (<FormItem><FormLabel>Taux de rendement annuel (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <p className="text-xs text-muted-foreground pt-1">
            Le numéro d'identification, l'IBAN et le code SWIFT seront générés automatiquement.
        </p>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Créer le client
        </Button>
      </form>
    </Form>
  );
}
