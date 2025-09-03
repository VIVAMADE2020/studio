
"use server";

import { z } from "zod";
import { addClient } from "@/lib/firebase/firestore";

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
});

// NOTE: La vérification de l'administrateur est maintenant gérée par les règles de sécurité de Firestore.
// L'action échouera si elle n'est pas appelée par un administrateur authentifié.
export async function addClientAction(values: z.infer<typeof formSchema>) {
    const parsed = formSchema.safeParse(values);

    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    try {
      const result = await addClient(parsed.data);

      if (result.success) {
          return { success: true, id: result.id };
      } else {
          return { success: false, error: result.error };
      }
    } catch(error: any) {
      console.error("Error in addClientAction:", error);
      
      // Gérer l'erreur de permission de Firestore
      if (error.code === 'permission-denied') {
          return { success: false, error: "Action non autorisée. Seuls les administrateurs peuvent ajouter des clients."};
      }
      return { success: false, error: "Une erreur est survenue côté serveur."};
    }
}
