
"use server";

import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  loanAmount: z.coerce.number().min(1000, "Le montant minimum est de 1000€."),
  loanDuration: z.coerce.number().min(12, "La durée minimale est de 12 mois."),
  email: z.string().email("Veuillez entrer une adresse email valide."),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide."),
  country: z.string().min(2, "Le pays de résidence est requis."),
  employmentStatus: z.string().min(2, "La profession est requise."),
  monthlyIncome: z.coerce.number().min(500, "Le revenu minimum est de 500€."),
  loanReason: z.string().min(10, "Veuillez décrire brièvement votre projet."),
  legalConsent: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter la politique de confidentialité."
  }),
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
    
    // Simuler un succès si l'URL n'est pas définie
    if (!process.env.GOOGLE_SCRIPT_WEB_APP_URL) {
      console.log("GOOGLE_SCRIPT_WEB_APP_URL not set. Simulating success.");
      console.log("Data that would be sent:", dataToSend);
      return { success: true };
    }

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
