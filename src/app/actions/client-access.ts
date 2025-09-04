
"use server";

import { Client } from "@/lib/firebase/firestore";
import { db as adminDb } from "@/lib/firebase/admin";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

export async function getClientByAccountNumberAction(accountNumber: string): Promise<{ data: Client | null, error: string | null }> {
    if (!accountNumber) {
        return { data: null, error: "Le numéro de compte est requis." };
    }

    try {
        const clientsRef = adminDb.collection("clients");
        const q = clientsRef.where("accountNumber", "==", accountNumber).limit(1);

        const querySnapshot = await q.get();

        if (querySnapshot.empty) {
            return { data: null, error: "Numéro de compte invalide ou introuvable." };
        }

        const docSnap = querySnapshot.docs[0];
        const clientData = { id: docSnap.id, ...docSnap.data() } as Client;
        
        return { data: clientData, error: null };

    } catch (error: any) {
        console.error("Error getting client data by account number (action):", error.message || error);
        return { data: null, error: "Impossible de vérifier le numéro de compte." };
    }
}
