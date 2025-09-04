
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
import { addTransactionAction } from "@/app/actions/clients";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  description: z.string().min(3, "La description doit contenir au moins 3 caractères."),
  amount: z.coerce.number(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddTransactionFormProps {
  accountNumber: string;
}

export function AddTransactionForm({ accountNumber }: AddTransactionFormProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  async function onSubmit(values: FormValues) {
    const result = await addTransactionAction({ ...values, accountNumber });

    if (result.success) {
      toast({
        title: "Transaction ajoutée !",
        description: "Le solde du client a été mis à jour.",
      });
      form.reset();
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Input placeholder="ex: Virement entrant" {...field} /></FormControl>
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
               <p className="text-xs text-muted-foreground pt-1">Utilisez un montant négatif pour un débit (ex: -50).</p>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Ajouter la transaction
        </Button>
      </form>
    </Form>
  );
}
