
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Lock, Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { sendEmailAction } from "@/app/actions/send-email";

const formSchema = z.object({
    Prénom: z.string().min(2, "Le prénom est requis."),
    Nom: z.string().min(2, "Le nom est requis."),
    "Montant du Prêt": z.coerce.number().positive("Le montant doit être positif."),
    "Durée en mois": z.coerce.number().positive("La durée doit être positive."),
    Email: z.string().email("L'adresse email est invalide."),
    Téléphone: z.string().min(10, "Le numéro de téléphone est invalide."),
    "Pays de résidence": z.string({ required_error: "Veuillez sélectionner un pays." }),
    Profession: z.string().min(2, "La profession est requise."),
    "Revenu mensuel net": z.coerce.number().positive("Le revenu doit être positif."),
    "Motif de la demande": z.string().min(10, "Le motif est trop court."),
    Consentement: z.literal(true, {
        errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité." }),
    }),
});

type FormValues = z.infer<typeof formSchema>;


export function LoanApplicationForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { formState, control, handleSubmit } = form;

  const onSubmit = async (data: FormValues) => {
    try {
        const result = await sendEmailAction({
            to: 'contact@vylscapital.com',
            subject: 'Nouvelle Demande de Prêt',
            data: data
        });

        if (result.success) {
            router.push('/demande-pret/merci');
        } else {
             toast({
                variant: "destructive",
                title: "Erreur d'envoi",
                description: result.error || "Une erreur est survenue lors de l'envoi de votre demande.",
            });
        }

    } catch (error) {
        toast({
            variant: "destructive",
            title: "Erreur inattendue",
            description: "Impossible d'envoyer la demande. Veuillez réessayer plus tard.",
        });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField control={control} name="Prénom" render={({ field }) => (<FormItem><Label>Prénom</Label><FormControl><Input placeholder="Jean" {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={control} name="Nom" render={({ field }) => (<FormItem><Label>Nom</Label><FormControl><Input placeholder="Dupont" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
            <FormField control={control} name="Montant du Prêt" render={({ field }) => (<FormItem><Label>Montant du Prêt (€)</Label><FormControl><Input type="number" placeholder="50000" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name="Durée en mois" render={({ field }) => (<FormItem><Label>Durée (mois)</Label><FormControl><Input type="number" placeholder="120" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <FormField control={control} name="Email" render={({ field }) => (<FormItem><Label>Adresse Email</Label><FormControl><Input type="email" placeholder="vous@exemple.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name="Téléphone" render={({ field }) => (<FormItem><Label>Numéro de Téléphone</Label><FormControl><Input type="tel" placeholder="+33 6 12 34 56 78" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        
        <FormField
            control={control}
            name="Pays de résidence"
            render={({ field }) => (
              <FormItem>
                <Label>Pays de résidence</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un pays" />
                    </SelectTrigger>
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
            <FormField control={control} name="Profession" render={({ field }) => (<FormItem><Label>Profession</Label><FormControl><Input placeholder="Développeur" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={control} name="Revenu mensuel net" render={({ field }) => (<FormItem><Label>Revenu mensuel net (€)</Label><FormControl><Input type="number" placeholder="3000" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>

        <FormField control={control} name="Motif de la demande" render={({ field }) => (<FormItem><Label>Motif de la demande</Label><FormControl><Textarea placeholder="Décrivez brièvement votre projet (ex: Achat d'un véhicule, rénovation, etc.)" {...field} /></FormControl><FormMessage /></FormItem>)} />

        <FormField
            control={control}
            name="Consentement"
            render={({ field }) => (
                <FormItem className="flex items-start space-x-3">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="legalConsent" className="font-medium">
                            Je reconnais avoir lu et j'accepte la <Link href="/legal/politique-de-confidentialite" target="_blank" className="text-primary underline hover:text-accent">politique de confidentialité</Link>.
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            En soumettant ce formulaire, je consens à ce que VylsCapital collecte et traite mes données personnelles pour l'étude de ma demande de financement.
                        </p>
                         <FormMessage />
                    </div>
                </FormItem>
            )}
        />

        <div className="space-y-4 pt-4">
          <Button type="submit" className="w-full" size="lg" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {formState.isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
          </Button>
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
            <Lock className="h-3 w-3" /> Vos informations sont chiffrées et sécurisées.
          </p>
          <p className="text-xs text-center text-muted-foreground pt-2">
            Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
