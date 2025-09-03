
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import { addClientAction } from "@/app/actions/admin-clients";
import { AnimatePresence, motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères."),
  accountType: z.enum(['current', 'loan'], { required_error: "Le type de compte est requis."}),
  initialBalance: z.coerce.number().min(0, "Le solde initial doit être positif ou nul."),
  // Loan details are optional and only validated if the accountType is 'loan'
  loanAmount: z.coerce.number().optional(),
  interestRate: z.coerce.number().optional(),
  loanDuration: z.coerce.number().optional(),
}).refine(data => {
    if (data.accountType === 'loan') {
        return !!data.loanAmount && !!data.interestRate && !!data.loanDuration;
    }
    return true;
}, {
    message: "Les détails du prêt sont requis pour un compte de prêt.",
    path: ["loanAmount"], // You can choose which field to attach the error to
});


interface AddClientFormProps {
    onClientAdded: () => void;
}

export function AddClientForm({ onClientAdded }: AddClientFormProps) {
  const { toast } = useToast();
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      accountType: "current",
      initialBalance: 0,
      loanAmount: 10000,
      interestRate: 2,
      loanDuration: 120,
    },
  });
  
  const accountType = form.watch("accountType");
  const loanAmount = form.watch("loanAmount");
  const interestRate = form.watch("interestRate");
  const loanDuration = form.watch("loanDuration");
  
  useEffect(() => {
    if (accountType === 'loan' && loanAmount && interestRate && loanDuration) {
        if (loanAmount > 0 && interestRate > 0 && loanDuration > 0) {
            const monthlyRate = (interestRate / 100) / 12;
            const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanDuration)) / (Math.pow(1 + monthlyRate, loanDuration) - 1);
            setMonthlyPayment(isFinite(payment) ? payment : 0);
        } else {
            setMonthlyPayment(0);
        }
    }
  }, [accountType, loanAmount, interestRate, loanDuration]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await addClientAction(values);

    if (result.success) {
      toast({
        title: "Client ajouté !",
        description: `${values.firstName} ${values.lastName} a été ajouté et son compte a été créé.`,
      });
      form.reset();
      onClientAdded();
    } else {
      console.error("Form submission error:", result.error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: result.error || "Une erreur est survenue lors de la création du client.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un nouveau client</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Jean" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Dupont" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="jean.dupont@email.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Mot de passe</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="initialBalance" render={({ field }) => (<FormItem><FormLabel>Solde initial (€)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de compte</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="current">Compte Courant</SelectItem>
                      <SelectItem value="loan">Compte de Prêt</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AnimatePresence>
            {accountType === "loan" && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 overflow-hidden pt-4 border-t"
                >
                    <h4 className="font-semibold text-primary">Détails du prêt</h4>
                    <FormField control={form.control} name="loanAmount" render={({ field }) => (<FormItem><FormLabel>Montant du prêt (€)</FormLabel><FormControl><Input type="number" placeholder="50000" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Taux d'intérêt annuel (%)</FormLabel><FormControl><Input type="number" step="0.01" placeholder="2.5" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="loanDuration" render={({ field }) => (<FormItem><FormLabel>Durée du prêt (en mois)</FormLabel><FormControl><Input type="number" placeholder="120" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    
                    {monthlyPayment > 0 && (
                        <div className="mt-4 p-3 rounded-md bg-secondary/50 text-center">
                            <p className="text-sm text-muted-foreground">Mensualité calculée</p>
                            <p className="text-lg font-bold text-primary">{formatCurrency(monthlyPayment)} / mois</p>
                        </div>
                    )}
                </motion.div>
            )}
            </AnimatePresence>

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Création du client..." : "Ajouter le client"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

