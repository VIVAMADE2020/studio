
"use server";

import { z } from "zod";

// Force la lecture du fichier .env à chaque exécution
require('dotenv').config({ path: '.env' });

const loginSchema = z.object({
  password: z.string().min(1, "Le mot de passe est requis."),
});

export async function verifyAdminPassword(values: z.infer<typeof loginSchema>) {
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    const { password } = parsed.data;

    if (password === process.env.ADMIN_PASSWORD) {
        return { success: true };
    } else {
        return { success: false, error: "Mot de passe incorrect." };
    }
}
