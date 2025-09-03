
"use server";

import { z } from "zod";
import { auth as clientAuth, db } from "@/lib/firebase/config";
import { auth as adminAuth, db as adminDb } from "@/lib/firebase/admin";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Client } from "@/lib/firebase/firestore";

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signupAction(values: z.infer<typeof formSchema>) {
    const parsed = formSchema.safeParse(values);

    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    try {
        const { email, password, firstName, lastName } = parsed.data;

        // 1. Create user in Firebase Auth
        // NOTE: This uses the client SDK on the server, which is fine for this use case
        // as we are in a trusted server environment (Server Action).
        const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
        const user = userCredential.user;

        // 2. Create client document in Firestore
        const newClient: Omit<Client, 'id'> = {
            uid: user.uid,
            firstName,
            lastName,
            email,
            accountType: 'current', // Default account type
            accountBalance: 0, // Default balance
            accountNumber: `000${Math.floor(10000000 + Math.random() * 90000000)}`,
            iban: `FR76 30002 00550 ${Math.floor(10000000000 + Math.random() * 90000000000)} 97`,
            swiftCode: 'FLXDFRPP',
            transactions: [],
        };

        // Use the UID as the document ID for easy mapping
        await setDoc(doc(db, "clients", user.uid), newClient);

        return { success: true, userId: user.uid };

    } catch (error: any) {
        console.error("Signup Action Error:", error);
        if (error.code === 'auth/email-already-in-use') {
            return { success: false, error: "Un compte avec cet email existe déjà." };
        }
        return { success: false, error: "Une erreur est survenue lors de la création du compte." };
    }
}

export async function getClientDataAction(uid: string): Promise<{ data: Client | null, error: string | null }> {
    if (!uid) {
        return { data: null, error: "Utilisateur non authentifié." };
    }
    try {
        const docSnap = await adminDb.collection('clients').doc(uid).get();
        if (!docSnap.exists) {
            return { data: null, error: "Profil client non trouvé." };
        }
        const clientData = { id: docSnap.id, ...docSnap.data() } as Client;
        return { data: clientData, error: null };
    } catch (error) {
        console.error("Error getting client data (action):", error);
        return { data: null, error: "Impossible de récupérer les données du profil." };
    }
}
