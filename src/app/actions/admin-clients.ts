
"use server";

import { z } from "zod";
import { Client, Transaction } from "@/lib/firebase/firestore";
import { db } from "@/lib/firebase/config";
import { doc, updateDoc, getDoc, arrayUnion, increment, collection, addDoc, setDoc } from "firebase/firestore";
import { authAdmin } from "@/lib/firebase/admin";

// Schéma pour la validation du formulaire d'ajout de client
const formSchema = z.object({
  // Personal
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères."),
  
  // Account
  accountType: z.enum(['current', 'loan']),
  initialBalance: z.coerce.number().min(0, "Le solde initial doit être positif."),
  
  // Loan Details (conditionnel dans le composant)
  loanAmount: z.coerce.number().optional(),
  interestRate: z.coerce.number().optional(),
  loanDuration: z.coerce.number().optional(),
});

export async function addClientAction(values: z.infer<typeof formSchema>) {
    const parsed = formSchema.safeParse(values);

    if (!parsed.success) {
        return { success: false, error: "Données invalides.", details: parsed.error.format() };
    }

    if (!authAdmin) {
        return { success: false, error: "Le service d'administration Firebase n'est pas initialisé. Vérifiez la configuration de la clé de service." };
    }

    try {
      const data = parsed.data;

      // 1. Créer l'utilisateur dans Firebase Authentication
      const userRecord = await authAdmin.createUser({
        email: data.email,
        password: data.password,
        displayName: `${data.firstName} ${data.lastName}`,
        emailVerified: true, // On peut considérer l'email comme vérifié
        disabled: false,
      });

      // 2. Construire l'objet client pour Firestore
      const newClient: Omit<Client, 'id'> = {
        uid: userRecord.uid, // Lier le document Firestore à l'utilisateur Auth
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        accountType: data.accountType,
        accountBalance: data.initialBalance,
        accountNumber: `FR${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        iban: `FR76${Math.floor(10000000000000000000000 + Math.random() * 90000000000000000000000)}`,
        swiftCode: 'FLEXFR21XXX',
        transactions: [],
      };

      // Si c'est un compte de prêt, ajouter les détails du prêt
      if (data.accountType === 'loan' && data.loanAmount && data.interestRate && data.loanDuration) {
          const monthlyRate = data.interestRate / 100 / 12;
          const monthlyPayment = (data.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, data.loanDuration)) / (Math.pow(1 + monthlyRate, data.loanDuration) - 1);
          
          newClient.loanDetails = {
              loanAmount: data.loanAmount,
              interestRate: data.interestRate,
              loanDuration: data.loanDuration,
              monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
          };
      }

      // 3. Créer le document dans Firestore avec l'UID comme ID de document
      await setDoc(doc(db, "clients", userRecord.uid), newClient);

      return { success: true, id: userRecord.uid };

    } catch(error: any) {
      console.error("Error in addClientAction:", error);
      
      if (error.code === 'auth/email-already-exists') {
          return { success: false, error: "Un client avec cet email existe déjà."};
      }
      if (error.code === 'permission-denied' || error.code === 'PERMISSION_DENIED') {
          return { success: false, error: "Action non autorisée. Vérifiez les règles de sécurité et les credentials du service account."};
      }
      return { success: false, error: "Une erreur est survenue côté serveur."};
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

        // Vérifier si le client existe (optionnel mais recommandé)
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

        // Mettre à jour le document client
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
