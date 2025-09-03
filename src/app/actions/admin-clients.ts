"use server";

import { z } from "zod";
import { addClient, Client } from "@/lib/firebase/firestore";
import { verifyAdminAuth } from "./admin-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
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

    const result = await addClient(parsed.data);

    if (result.success) {
        revalidatePath("/admin/dashboard"); // Demande à Next.js de rafraîchir les données de la page
        return { success: true, id: result.id };
    } else {
        return { success: false, error: result.error };
    }
}
