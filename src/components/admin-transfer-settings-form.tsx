
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
import { updateClientTransferSettingsAction, TransferDurationUnit } from "@/app/actions/clients";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const formSchema = z.object({
  duration: z.coerce.number().min(1, "La durée doit être d'au moins 1."),
  unit: z.enum(['minutes', 'hours', 'days']),
});

type FormValues = z.infer<typeof formSchema>;

interface AdminTransferSettingsFormProps {
  identificationNumber: string;
  currentSettings?: {
    duration: number;
    unit: TransferDurationUnit;
  };
}

export function AdminTransferSettingsForm({ identificationNumber, currentSettings }: AdminTransferSettingsFormProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: currentSettings?.duration || 1,
      unit: currentSettings?.unit || 'days',
    },
  });

  async function onSubmit(values: FormValues) {
    const result = await updateClientTransferSettingsAction({ ...values, identificationNumber });

    if (result.success) {
      toast({
        title: "Configuration mise à jour !",
        description: "Le délai de virement pour ce client a été modifié.",
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
        <div className="flex gap-4">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Durée</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Unité</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Unité" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="minutes">Minutes</SelectItem>
                            <SelectItem value="hours">Heures</SelectItem>
                            <SelectItem value="days">Jours</SelectItem>
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer
        </Button>
      </form>
    </Form>
  );
}
