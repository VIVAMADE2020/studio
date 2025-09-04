
"use server";

import { z } from "zod";

// Le schéma est simplifié pour ne plus inclure la conversion en Base64.
// Nous nous fions aux noms de fichiers. La logique de script devra gérer le reste.
const formSchema = z.object({
  loanType: z.string(),
  loanReason: z.string(),
  loanAmount: z.number(),
  loanDuration: z.number().min(12).max(360),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  whatsapp: z.string(),
  birthDate: z.string(),
  maritalStatus: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  childrenCount: z.number().min(0),
  employmentStatus: z.string(),
  monthlyIncome: z.number(),
  monthlyExpenses: z.number().min(0),
  housingStatus: z.string(),
  // On ne transmet plus les données Base64, juste les noms
  identityProof: z.string(),
  residenceProof: z.string(),
  incomeProof: z.string(),
  legalConsent: z.boolean(),
});

export async function submitLoanApplication(values: z.infer<typeof formSchema>) {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    console.error("Validation failed:", parsed.error.format());
    return { success: false, error: "Les données fournies sont invalides." };
  }

  // --- Intégration avec Google Apps Script ---
  try {
    const dataToSend = {
      sheet: 'LoanApplications', // Nom utilisé par le script pour identifier le formulaire
      ...parsed.data,
      // Retrait des champs data qui n'existent plus dans le schéma
    };
    
    const response = await fetch(process.env.GOOGLE_SCRIPT_WEB_APP_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Le corps de la requête est maintenant plus léger
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Script Error:", errorText);
      throw new Error('La réponse du serveur n\'est pas OK.');
    }

  } catch (error) {
    console.error("Erreur lors de l'envoi vers Google Script:", error);
    return { success: false, error: "Une erreur est survenue lors de l'envoi de la demande." };
  }
  // --- Fin de l'intégration ---

  return { success: true };
}
