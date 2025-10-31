
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
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
import { Loader2, Send, Lock, CheckCircle } from "lucide-react";
import { submitLoanApplication } from "@/app/actions/loan-application";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  loanAmount: z.coerce.number().min(1000, "Le montant minimum est de 1000€."),
  loanDuration: z.coerce.number().min(12, "La durée minimale est de 12 mois."),
  email: z.string().email("Veuillez entrer une adresse email valide."),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide."),
  country: z.string({ required_error: "Le pays de résidence est requis." }).min(2, "Le pays de résidence est requis."),
  employmentStatus: z.string().min(2, "La profession est requise."),
  monthlyIncome: z.coerce.number().min(500, "Le revenu minimum est de 500€."),
  loanReason: z.string().min(10, "Veuillez décrire brièvement votre projet."),
  legalConsent: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter la politique de confidentialité pour continuer."
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoanApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      loanAmount: 50000,
      loanDuration: 120,
      email: "",
      phone: "",
      country: undefined,
      employmentStatus: "",
      monthlyIncome: 3000,
      loanReason: "",
      legalConsent: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    const result = await submitLoanApplication(values);
    if (result.success) {
      setIsSuccess(true);
    } else {
      toast({
        variant: "destructive",
        title: "Erreur lors de la soumission",
        description: result.error || "Une erreur est survenue. Veuillez réessayer.",
      });
    }
    setIsSubmitting(false);
  }

  if (isSuccess) {
    return (
        <Alert variant="default" className="border-green-500 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4 !text-green-600" />
            <AlertTitle className="text-green-900 font-bold">Demande envoyée avec succès !</AlertTitle>
            <AlertDescription className="text-green-800">
                Merci de votre confiance. Un conseiller FLEXFOND va examiner votre dossier et vous contactera dans les plus brefs délais. Vous recevrez également un e-mail de confirmation.
            </AlertDescription>
        </Alert>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Jean" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Dupont" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
         <div className="grid md:grid-cols-2 gap-6">
            <FormField control={form.control} name="loanAmount" render={({ field }) => (<FormItem><FormLabel>Montant du Prêt (€)</FormLabel><FormControl><Input type="number" placeholder="50000" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="loanDuration" render={({ field }) => (<FormItem><FormLabel>Durée (mois)</FormLabel><FormControl><Input type="number" placeholder="120" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
         <div className="grid md:grid-cols-2 gap-6">
            <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Adresse Email</FormLabel><FormControl><Input type="email" placeholder="vous@exemple.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Numéro de Téléphone</FormLabel><FormControl><Input type="tel" placeholder="+33 6 12 34 56 78" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Pays de résidence</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger><SelectValue placeholder="Sélectionnez un pays" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Belgium">Belgique</SelectItem>
                        <SelectItem value="Switzerland">Suisse</SelectItem>
                        <SelectItem value="Luxembourg">Luxembourg</SelectItem>
                        <SelectItem value="Germany">Allemagne</SelectItem>
                        <SelectItem value="Spain">Espagne</SelectItem>
                        <SelectItem value="Italy">Italie</SelectItem>
                        <SelectItem value="Other">Autre</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />
        <div className="grid md:grid-cols-2 gap-6">
            <FormField control={form.control} name="employmentStatus" render={({ field }) => (<FormItem><FormLabel>Profession</FormLabel><FormControl><Input placeholder="Développeur" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="monthlyIncome" render={({ field }) => (<FormItem><FormLabel>Revenu mensuel net (€)</FormLabel><FormControl><Input type="number" placeholder="3000" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        <FormField
            control={form.control}
            name="loanReason"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Motif de la demande</FormLabel>
                <FormControl>
                    <Textarea
                    placeholder="Décrivez brièvement votre projet (ex: Achat d'un véhicule, rénovation, etc.)"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="legalConsent"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                        Je reconnais avoir lu et j'accepte la <Link href="/legal/politique-de-confidentialite" target="_blank" className="text-primary underline hover:text-accent">politique de confidentialité</Link>.
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                            En soumettant ce formulaire, je consens à ce que FLEXFOND collecte et traite mes données personnelles pour l'étude de ma demande de financement, conformément à notre Politique de Confidentialité.
                        </p>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />

        <div className="space-y-4 pt-4">
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
            </Button>
            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                <Lock className="h-3 w-3"/> Vos informations sont chiffrées et sécurisées via SSL.
            </p>
            <p className="text-xs text-center text-muted-foreground pt-2">
              Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
            </p>
        </div>
      </form>
    </Form>
  );
}
