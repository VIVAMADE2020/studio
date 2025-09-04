
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
  beneficiaryName: z.string().min(2, "Le nom du bénéficiaire est requis."),
  beneficiaryIban: z.string().min(14, "L'IBAN du bénéficiaire est invalide.").max(34, "L'IBAN du bénéficiaire est invalide."),
  amount: z.coerce.number().positive("Le montant doit être un nombre positif."),
  description: z.string().min(3, "Veuillez fournir une description pour le virement."),
});

type FormValues = z.infer<typeof formSchema>;

export function ClientTransferForm() {
  const [senderId, setSenderId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Côté client uniquement, pour récupérer l'ID depuis la session de stockage
    const id = sessionStorage.getItem('identificationNumber');
    setSenderId(id);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beneficiaryName: "",
      beneficiaryIban: "",
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
        title: "Virement effectué !",
        description: "Les fonds ont été envoyés avec succès.",
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
              <FormLabel>Nom complet du bénéficiaire</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
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
