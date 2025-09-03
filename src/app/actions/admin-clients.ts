"use server";

import { z } from "zod";
import { addClient } from "@/lib/firebase/firestore";
import { verifyAdminAuth } from "./admin-auth";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
});

export async function addClientAction(values: z.infer<typeof formSchema>) {
    const isAdmin = await verifyAdminAuth();
    if (!isAdmin) {
        return { success: false, error: "Non autorisé" };
    }

    const parsed = formSchema.safeParse(values);

    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    try {
      const result = await addClient(parsed.data);

      if (result.success) {
          revalidatePath("/admin/dashboard");
          return { success: true, id: result.id };
      } else {
          return { success: false, error: result.error };
      }
    } catch(error) {
      console.error("Error in addClientAction:", error);
      return { success: false, error: "Une erreur est survenue côté serveur."};
    }
}
