
"use server";

import { z } from "zod";

const loginSchema = z.object({
  password: z.string().min(1, "Le mot de passe est requis."),
});

export async function verifyAdminPassword(values: z.infer<typeof loginSchema>) {
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    const { password } = parsed.data;

    // Next.js charge automatiquement les variables depuis .env.local
    if (password === process.env.ADMIN_PASSWORD) {
        return { success: true };
    } else {
        return { success: false, error: "Mot de passe incorrect." };
    }
}
