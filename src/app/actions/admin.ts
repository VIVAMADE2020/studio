
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
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (password === adminPassword) {
        return { success: true };
    } else {
        console.log("Admin password from env:", adminPassword);
        return { success: false, error: "Mot de passe incorrect." };
    }
}
