
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateClientBlockSettingsAction } from "@/app/actions/clients";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  isBlocked: z.boolean().default(false),
  blockReason: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AdminBlockSettingsFormProps {
  identificationNumber: string;
  isBlocked: boolean;
  blockReason: string;
}

export function AdminBlockSettingsForm({ identificationNumber, isBlocked, blockReason }: AdminBlockSettingsFormProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isBlocked,
      blockReason: blockReason || "",
    },
  });

  const isBlockedValue = form.watch("isBlocked");

  async function onSubmit(values: FormValues) {
    if (values.isBlocked && (!values.blockReason || values.blockReason.trim() === '')) {
      form.setError("blockReason", { type: "manual", message: "Un motif est requis si le compte est bloqué." });
      return;
    }

    const result = await updateClientBlockSettingsAction({ ...values, identificationNumber });

    if (result.success) {
      toast({
        title: "Configuration mise à jour !",
        description: "Les paramètres de blocage du client ont été modifiés.",
      });
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
          name="isBlocked"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Bloquer les virements</FormLabel>
                <p className="text-xs text-muted-foreground">
                  Empêche les nouveaux virements sortants.
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {isBlockedValue && (
            <FormField
              control={form.control}
              name="blockReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motif du blocage</FormLabel>
                  <FormControl>
                    <Textarea placeholder="ex: Vérification de sécurité requise." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        )}
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer
        </Button>
      </form>
    </Form>
  );
}
