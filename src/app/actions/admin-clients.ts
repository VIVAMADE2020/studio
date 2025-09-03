
"use server";

import { z } from "zod";
import { addClient, Client } from "@/lib/firebase/firestore";

// Schéma pour la validation des données du formulaire
const formSchema = z.object({
  // Personal
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
  
  // Account
  accountType: z.enum(['current', 'loan']),
  initialBalance: z.coerce.number().min(0, "Le solde initial doit être positif."),
  
  // Banking Info (optionnel car on peut les générer)
  accountNumber: z.string().optional(),
  iban: z.string().optional(),
  swiftCode: z.string().optional(),
  
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

    try {
      const data = parsed.data;

      // Construire l'objet client
      const newClient: Omit<Client, 'id'> = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        accountType: data.accountType,
        accountBalance: data.initialBalance,
        // Générer des numéros de compte si non fournis
        accountNumber: data.accountNumber || `FR${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        iban: data.iban || `FR76${Math.floor(10000000000000000000000 + Math.random() * 90000000000000000000000)}`,
        swiftCode: data.swiftCode || 'FLEXFR21XXX',
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

      const result = await addClient(newClient);

      if (result.success) {
          // IMPORTANT: En production, il faudrait aussi créer un utilisateur dans Firebase Auth ici.
          // Pour l'instant, on se concentre sur Firestore.
          return { success: true, id: result.id };
      } else {
          return { success: false, error: result.error };
      }
    } catch(error: any) {
      console.error("Error in addClientAction:", error);
      
      if (error.code === 'permission-denied') {
          return { success: false, error: "Action non autorisée. Seuls les administrateurs peuvent ajouter des clients."};
      }
      return { success: false, error: "Une erreur est survenue côté serveur."};
    }
}
