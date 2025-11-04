
"use server";

import { z } from "zod";

const loginSchema = z.object({
  password: z.string().min(1, "Le mot de passe est requis."),
});

// Le mot de passe est maintenant défini dans les variables d'environnement (.env)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password";

export async function verifyAdminPassword(values: z.infer<typeof loginSchema>) {
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Veuillez fournir un mot de passe." };
    }

    if (parsed.data.password === ADMIN_PASSWORD) {
        return { success: true };
    } else {
        return { success: false, error: "Mot de passe incorrect." };
    }
}
