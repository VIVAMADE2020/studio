
"use server";

import { z } from "zod";
import { Client, Transaction } from "@/lib/firebase/firestore";
import { auth as adminAuth, db as adminDb } from "@/lib/firebase/admin";
import { arrayUnion, increment } from "firebase/firestore";


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

        // 1. Create user with Firebase Admin SDK
        const userRecord = await adminAuth.createUser({
          email,
          password,
          displayName: `${firstName} ${lastName}`,
        });

        const monthlyRate = interestRate ? (interestRate / 100) / 12 : 0;
        const payment = loanAmount && interestRate && loanDuration && monthlyRate > 0
            ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanDuration)) / (Math.pow(1 + monthlyRate, loanDuration) - 1)
            : 0;

        const newClient: Omit<Client, 'id'> = {
            uid: userRecord.uid,
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
        
        // Explicitly set the document ID to be the user's UID
        await adminDb.collection("clients").doc(userRecord.uid).set(newClient);

        return { success: true, userId: userRecord.uid };

    } catch (error: any) {
        console.error("Add Client Action Error:", error);
        if (error.code === 'auth/email-already-exists') {
            return { success: false, error: "Un compte avec cet email existe déjà." };
        }
        if (error.code === 'auth/weak-password') {
             return { success: false, error: "Le mot de passe est trop faible. Il doit faire au moins 6 caractères." };
        }
        if (error.code === 'auth/invalid-password') {
            return { success: false, error: "Le mot de passe est invalide." };
        }
        if (error.message.includes('FIREBASE_CONFIG')) {
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

        await clientRef.update({
            transactions: arrayUnion(newTransaction),
            accountBalance: increment(amount),
        });

        return { success: true };

    } catch (error: any) {
        console.error("Error adding transaction:", error);
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
        console.error("Error getting clients (action):", error);
        return { data: null, error: 'Impossible de récupérer la liste des clients.' };
    }
}

export async function getClientDataAction(uid: string, idToken: string): Promise<{ data: Client | null, error: string | null }> {
    if (!uid || !idToken) {
        return { data: null, error: "Informations d'authentification manquantes." };
    }
    try {
        // Verify the ID token to ensure the request is authenticated.
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        // Check if the UID from the token matches the requested UID.
        if (decodedToken.uid !== uid) {
            return { data: null, error: "Non autorisé." };
        }

        const docSnap = await adminDb.collection('clients').doc(uid).get();
        if (!docSnap.exists) {
            // This is not an error, it just means the profile doesn't exist.
            return { data: null, error: "Le profil client associé à votre compte est introuvable." };
        }
        const clientData = { id: docSnap.id, ...docSnap.data() } as Client;
        return { data: clientData, error: null };
    } catch (error: any) {
        console.error("Error getting client data (action):", error);
        if (error.code === 'auth/id-token-expired') {
            return { data: null, error: "Votre session a expiré. Veuillez vous reconnecter."};
        }
        return { data: null, error: "Impossible de récupérer les données du profil." };
    }
}
