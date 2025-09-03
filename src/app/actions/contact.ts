
"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export async function sendContactMessage(values: z.infer<typeof formSchema>) {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  // --- Intégration avec Google Apps Script ---
  try {
    const response = await fetch(process.env.GOOGLE_SCRIPT_WEB_APP_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sheet: 'Contacts', // Nom de la feuille de calcul
            ...parsed.data 
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Google Script Error:", errorText);
        throw new Error('La réponse du serveur n\'est pas OK.');
    }
    
    // La réponse de Google Script est souvent du HTML, mais on peut vérifier le succès.
    // Pour une réponse JSON, vous utiliseriez : await response.json();
    
  } catch (error) {
    console.error("Erreur lors de l'envoi vers Google Script:", error);
    return { success: false, error: "Une erreur est survenue lors de l'envoi." };
  }
  // --- Fin de l'intégration ---

  return { success: true };
}
