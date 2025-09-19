
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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { transferFundsAction } from "@/app/actions/clients";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  beneficiaryName: z.string().min(2, "Le nom du titulaire est requis."),
  beneficiaryAccountNumber: z.string().min(5, "Le numéro de compte est invalide."),
  beneficiaryIban: z.string().min(14, "L'IBAN est invalide.").max(34, "L'IBAN est trop long."),
  beneficiaryBankName: z.string().min(2, "Le nom de la banque est requis."),
  beneficiarySwiftCode: z.string().min(8, "Le code SWIFT/BIC est invalide.").max(11, "Le code SWIFT/BIC est trop long."),
  amount: z.coerce.number().positive("Le montant doit être un nombre positif."),
  description: z.string().min(3, "Veuillez fournir une description pour le virement."),
});

type FormValues = z.infer<typeof formSchema>;

export function ClientTransferForm() {
  const [senderId, setSenderId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const id = sessionStorage.getItem('identificationNumber');
    setSenderId(id);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beneficiaryName: "",
      beneficiaryAccountNumber: "",
      beneficiaryIban: "",
      beneficiaryBankName: "",
      beneficiarySwiftCode: "",
      amount: 0,
      description: "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (!senderId) {
      toast({
        variant: "destructive",
        title: "Erreur d'authentification",
        description: "Impossible de vous identifier. Veuillez vous reconnecter.",
      });
      return;
    }

    const result = await transferFundsAction({ ...values, senderIdentificationNumber: senderId });

    if (result.success) {
      toast({
        title: "Virement initié !",
        description: "Les fonds sont en cours de traitement. Vous pouvez suivre le statut sur votre tableau de bord.",
      });
      router.push('/client/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Échec du virement",
        description: result.error || "Une erreur est survenue.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="beneficiaryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet du titulaire du compte</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="beneficiaryAccountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de compte du bénéficiaire</FormLabel>
              <FormControl><Input placeholder="00123456789" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beneficiaryIban"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IBAN du bénéficiaire</FormLabel>
              <FormControl><Input placeholder="FR76..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="beneficiaryBankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la banque</FormLabel>
                  <FormControl><Input placeholder="Banque Populaire" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="beneficiarySwiftCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code SWIFT/BIC</FormLabel>
                  <FormControl><Input placeholder="CCBPFRPP" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant (€)</FormLabel>
              <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motif du virement</FormLabel>
              <FormControl><Textarea placeholder="Ex: Loyer, Cadeau d'anniversaire..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !senderId}>
           {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Envoyer
        </Button>
        {!senderId && (
            <p className="text-xs text-center text-destructive">Impossible de vous identifier. Le formulaire est désactivé.</p>
        )}
      </form>
    </Form>
  );
}

    