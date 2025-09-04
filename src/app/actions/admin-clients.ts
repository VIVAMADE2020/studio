
"use server";

import { z } from "zod";
import { Client, Transaction } from "@/lib/firebase/firestore";
import { auth as adminAuth, db as adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";


const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
  // Le mot de passe n'est plus nécessaire
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
        const { email, firstName, lastName, accountType, initialBalance, loanAmount, interestRate, loanDuration } = parsed.data;
        
        // On génère un UID factice car il n'y a plus de vrai utilisateur Auth
        const uid = `user_${crypto.randomUUID()}`;

        const monthlyRate = interestRate ? (interestRate / 100) / 12 : 0;
        const payment = loanAmount && interestRate && loanDuration && monthlyRate > 0
            ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanDuration)) / (Math.pow(1 + monthlyRate, loanDuration) - 1)
            : 0;

        const newClient: Omit<Client, 'id'> = {
            uid: uid,
            firstName,
            lastName,
            email,
            accountType,
            accountBalance: initialBalance,
            accountNumber: `FLX${Math.floor(1000000000 + Math.random() * 9000000000)}`,
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
            newClient.loanDetails = {
                loanAmount,
                interestRate,
                loanDuration,
                monthlyPayment: isFinite(payment) ? payment : 0,
            };
        }
        
        // On utilise un ID de document auto-généré par Firestore
        await adminDb.collection("clients").add(newClient);

        return { success: true, userId: uid };

    } catch (error: any) {
        console.error("Add Client Action Error:", error.message || error);
        if (error.message && error.message.includes('FIREBASE_CONFIG')) {
             return { success: false, error: "Erreur de configuration Firebase côté serveur." };
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

        const clientRef = adminDb.collection("clients").doc(clientId);

        const clientSnap = await clientRef.get();
        if (!clientSnap.exists) {
            return { success: false, error: "Client non trouvé." };
        }

        const newTransaction: Transaction = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            description: description,
            amount: amount,
        };

        // Utilisation des fonctions du SDK Admin
        await clientRef.update({
            transactions: FieldValue.arrayUnion(newTransaction),
            accountBalance: FieldValue.increment(amount),
        });

        return { success: true };

    } catch (error: any) {
        console.error("Error adding transaction:", error.message || error);
        return { success: false, error: "Une erreur est survenue lors de l'ajout de la transaction." };
    }
}

export async function getClientsAction(): Promise<{data: Client[] | null, error: string | null}> {
    try {
        const snapshot = await adminDb.collection('clients').get();
        if (snapshot.empty) {
            return { data: [], error: null };
        }
        const clients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
        return { data: clients, error: null };
    } catch (error: any) {
        console.error("Error getting clients (action):", error.message || error);
        return { data: null, error: 'Impossible de récupérer la liste des clients.' };
    }
}
