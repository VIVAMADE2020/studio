
"use server";

import { z } from "zod";

const loginSchema = z.object({
  // Le mot de passe n'est plus nécessaire, mais nous gardons le schéma pour la structure
  password: z.string().optional(),
});

export async function verifyAdminPassword(values: z.infer<typeof loginSchema>) {
    // Le contrôle du mot de passe est supprimé pour simplifier l'accès
    return { success: true };
}
