
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Client, Transaction } from "@/lib/firebase/firestore";
import { addTransactionAction } from "@/app/actions/admin-clients";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface AdminManageClientModalProps {
  isOpen: boolean;
  onClose: (wasUpdated: boolean) => void;
  client: Client;
}

const transactionFormSchema = z.object({
  description: z.string().min(3, "La description est requise."),
  amount: z.coerce.number().refine(val => val !== 0, { message: "Le montant ne peut pas être zéro." }),
});

export function AdminManageClientModal({ isOpen, onClose, client }: AdminManageClientModalProps) {
  const { toast } = useToast();
  const [wasUpdated, setWasUpdated] = useState(false);

  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof transactionFormSchema>) {
    if (!client.id) return;

    const result = await addTransactionAction({ ...values, clientId: client.id });

    if (result.success) {
      toast({
        title: "Transaction ajoutée !",
        description: `Le solde de ${client.firstName} a été mis à jour.`,
      });
      form.reset();
      setWasUpdated(true);
      // We will need to re-fetch client data to show the new transaction
      // The parent component will handle this on close.
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: result.error || "Une erreur est survenue.",
      });
    }
  }

  const sortedTransactions = [...(client.transactions || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose(wasUpdated)}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gérer le client : {client.firstName} {client.lastName}</DialogTitle>
          <DialogDescription>
            Ajoutez des transactions (crédit/débit) et consultez l'historique du compte.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Colonne de gauche: Formulaire de transaction */}
            <div className="space-y-4">
                <h4 className="font-semibold text-primary">Nouvelle Transaction</h4>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Virement entrant, Achat par carte..." {...field} />
                                    </FormControl>
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
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <p className="text-xs text-muted-foreground">Positif pour crédit, négatif pour débit.</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Ajout en cours..." : "Ajouter la transaction"}
                        </Button>
                    </form>
                </Form>
            </div>

            {/* Colonne de droite: Historique */}
            <div className="space-y-4">
                 <h4 className="font-semibold text-primary">Historique des transactions</h4>
                 <ScrollArea className="h-72 w-full rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Montant</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedTransactions.length > 0 ? sortedTransactions.map((tx: Transaction) => (
                                <TableRow key={tx.id}>
                                    <TableCell className="text-xs">{new Date(tx.date).toLocaleDateString('fr-FR')}</TableCell>
                                    <TableCell className="text-sm">{tx.description}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={tx.amount > 0 ? "default" : "destructive"} className="font-mono">
                                            {tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                                        Aucune transaction.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Table>
                 </ScrollArea>
            </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onClose(wasUpdated)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
