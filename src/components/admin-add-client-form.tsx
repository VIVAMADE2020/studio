
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
import { addClientAction } from "@/app/actions/admin-clients";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const formSchema = z.object({
  // Personal
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
  
  // Account
  accountType: z.enum(['current', 'loan'], { required_error: "Veuillez sélectionner un type de compte." }),
  initialBalance: z.coerce.number().min(0, "Le solde initial doit être positif ou nul."),
  
  // Loan Details (conditionnel)
  loanAmount: z.coerce.number().optional(),
  interestRate: z.coerce.number().optional(),
  loanDuration: z.coerce.number().optional(),
}).refine(data => {
    if (data.accountType === 'loan') {
        return data.loanAmount && data.loanAmount > 0 && data.interestRate && data.interestRate > 0 && data.loanDuration && data.loanDuration > 0;
    }
    return true;
}, {
    message: "Les détails du prêt (montant, taux, durée) sont requis pour un compte de prêt.",
    path: ["loanAmount"], // On attache l'erreur à un des champs pour l'affichage
});


interface AddClientFormProps {
    onClientAdded: () => void;
}

export function AddClientForm({ onClientAdded }: AddClientFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      accountType: undefined,
      initialBalance: 0,
      loanAmount: undefined,
      interestRate: undefined,
      loanDuration: undefined,
    },
  });

  const accountType = form.watch("accountType");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Note: L'action serveur gère la création d'utilisateur et de compte.
    // L'email sera utilisé comme identifiant et un mot de passe temporaire pourra être généré côté serveur si nécessaire.
    const result = await addClientAction(values);
    
    if (result.success) {
      toast({
        title: "Client ajouté !",
        description: `Le client ${values.firstName} a été créé avec succès.`,
      });
      form.reset();
      onClientAdded();
    } else {
      console.error("Form submission error:", result.error, result.details);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h4 className="text-sm font-medium text-muted-foreground">Informations Personnelles</h4>
            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email (Identifiant de connexion)</FormLabel><FormControl><Input placeholder="john.doe@email.com" {...field} /></FormControl><FormDescription>Le client utilisera cet email pour se connecter.</FormDescription><FormMessage /></FormItem>)} />

            <h4 className="text-sm font-medium text-muted-foreground pt-4 border-t">Détails du Compte</h4>
             <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de compte</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Sélectionnez un type" /></SelectTrigger>
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
            <FormField control={form.control} name="initialBalance" render={({ field }) => (<FormItem><FormLabel>Solde Initial (€)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />

            {accountType === 'loan' && (
                <div className="space-y-4 pt-4 border-t">
                    <h4 className="text-sm font-medium text-muted-foreground">Détails du Prêt</h4>
                    <FormField control={form.control} name="loanAmount" render={({ field }) => (<FormItem><FormLabel>Montant du Prêt (€)</FormLabel><FormControl><Input type="number" placeholder="50000" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Taux d'intérêt annuel (%)</FormLabel><FormControl><Input type="number" step="0.01" placeholder="2.0" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="loanDuration" render={({ field }) => (<FormItem><FormLabel>Durée du prêt (en mois)</FormLabel><FormControl><Input type="number" placeholder="120" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
            )}
            
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Création en cours..." : "Créer le client et son compte"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
