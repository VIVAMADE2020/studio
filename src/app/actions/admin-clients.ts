
"use server";

import { z } from "zod";
import { Client, Transaction } from "@/lib/firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc, arrayUnion, increment } from "firebase/firestore";


const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères."),
  accountType: z.enum(['current', 'loan']),
  initialBalance: z.coerce.number().min(0, "Le solde initial doit être positif."),
  loanAmount: z.coerce.number().optional(),
  interestRate: z.coerce.number().optional(),
  loanDuration: z.coerce.number().optional(),
});


export async function addClientAction(values: z.infer<typeof formSchema>) {
    const parsed = formSchema.safeParse(values);

    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    try {
        const { email, password, firstName, lastName, accountType, initialBalance, loanAmount, interestRate, loanDuration } = parsed.data;

        // NOTE: This is a temporary auth instance for user creation.
        // It's a trick to use the client SDK on the server, which is fine for this specific purpose
        // but not for general server-side authentication.
        const tempAuth = auth;
        const userCredential = await createUserWithEmailAndPassword(tempAuth, email, password);
        const user = userCredential.user;

        const newClient: Omit<Client, 'id'> = {
            uid: user.uid,
            firstName,
            lastName,
            email,
            accountType,
            accountBalance: initialBalance,
            accountNumber: `000${Math.floor(10000000 + Math.random() * 90000000)}`,
            iban: `FR76 30002 00550 ${Math.floor(10000000000 + Math.random() * 90000000000)} 97`,
            swiftCode: 'FLXDFRPP',
            transactions: [],
        };
        
        if (initialBalance > 0) {
          const initialTransaction: Transaction = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            description: "Dépôt initial",
            amount: initialBalance,
          };
          newClient.transactions!.push(initialTransaction);
        }

        if (accountType === 'loan' && loanAmount && interestRate && loanDuration) {
             const monthlyRate = (interestRate / 100) / 12;
             const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanDuration)) / (Math.pow(1 + monthlyRate, loanDuration) - 1);

            newClient.loanDetails = {
                loanAmount,
                interestRate,
                loanDuration,
                monthlyPayment: monthlyPayment,
            };
        }
        
        await setDoc(doc(db, "clients", user.uid), newClient);

        return { success: true, userId: user.uid };

    } catch (error: any) {
        console.error("Add Client Action Error:", error);
        if (error.code === 'auth/email-already-in-use') {
            return { success: false, error: "Un compte avec cet email existe déjà." };
        }
        if (error.code === 'auth/weak-password') {
            return { success: false, error: "Le mot de passe est trop faible." };
        }
        return { success: false, error: "Une erreur est survenue lors de la création du client." };
    }
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
