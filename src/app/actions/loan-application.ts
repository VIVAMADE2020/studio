
"use server";

import { z } from "zod";

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
    };
    
    const response = await fetch(process.env.GOOGLE_SCRIPT_WEB_APP_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
