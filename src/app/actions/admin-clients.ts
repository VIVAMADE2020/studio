
"use server";

import { z } from "zod";
import { Client, Transaction } from "@/lib/firebase/firestore";
import { db } from "@/lib/firebase/config";
import { doc, updateDoc, getDoc, arrayUnion, increment, collection, addDoc, setDoc } from "firebase/firestore";


// Schéma pour la validation du formulaire d'ajout de client (SIMPLIFIÉ)
const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
  accountType: z.enum(['current', 'loan']),
  initialBalance: z.coerce.number().min(0, "Le solde initial doit être positif."),
  loanAmount: z.coerce.number().optional(),
  interestRate: z.coerce.number().optional(),
  loanDuration: z.coerce.number().optional(),
});

// CETTE FONCTION N'EST PLUS UTILISÉE MAIS CONSERVÉE COMME RÉFÉRENCE
export async function addClientAction(values: z.infer<typeof formSchema>) {
    return { success: false, error: "La création de client se fait désormais via la page d'inscription." };
}


// Schéma pour la validation du formulaire de transaction
const transactionSchema = z.object({
  clientId: z.string(),
  description: z.string().min(3, "La description est requise."),
  amount: z.coerce.number(),
});

export async function addTransactionAction(values: z.infer<typeof transactionSchema>) {
    const parsed = transactionSchema.safeParse(values);

    if (!parsed.success) {
        return { success: false, error: "Données de transaction invalides." };
    }

    try {
        const { clientId, description, amount } = parsed.data;

        if (amount === 0) {
            return { success: false, error: "Le montant ne peut pas être zéro." };
        }

        const clientRef = doc(db, "clients", clientId);

        const clientSnap = await getDoc(clientRef);
        if (!clientSnap.exists()) {
            return { success: false, error: "Client non trouvé." };
        }

        const newTransaction: Transaction = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            description: description,
            amount: amount,
        };

        await updateDoc(clientRef, {
            transactions: arrayUnion(newTransaction),
            accountBalance: increment(amount),
        });

        return { success: true };

    } catch (error: any) {
        console.error("Error adding transaction:", error);
        if (error.code === 'permission-denied') {
            return { success: false, error: "Action non autorisée. Seuls les administrateurs peuvent effectuer cette action."};
        }
        return { success: false, error: "Une erreur est survenue lors de l'ajout de la transaction." };
    }
}
